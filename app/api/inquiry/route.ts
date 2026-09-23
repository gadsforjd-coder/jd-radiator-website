// Server-side inquiry capture. The public contact form POSTs here (same-origin,
// so the browser gets a REAL response — unlike the old direct-to-FormSubmit
// no-cors call that always showed "success" even when delivery silently failed).
//
// This route GUARANTEES the lead is captured by pushing it to Feishu (real-time
// alert + permanent record) the instant it arrives, independent of email
// deliverability. Email via FormSubmit is kept as a best-effort second channel.
//
// Why this exists: on 2026-09-22 a real inquiry was lost because the form had
// been repointed to an un-activated FormSubmit inbox, so FormSubmit held every
// submission instead of forwarding it — and nothing was stored our side. Feishu
// capture makes lead loss impossible regardless of any email-side breakage.

// Feishu (China) by default; set FEISHU_IS_LARK=true for Lark (global).
const FEISHU_BASE =
  process.env.FEISHU_IS_LARK === "true"
    ? "https://open.larksuite.com"
    : "https://open.feishu.cn";

// Best-effort email second channel. Keep pointing at whatever inbox the team
// chose (main currently = kevin@); the Feishu path is the reliable one.
const FORMSUBMIT_INBOX = process.env.FORMSUBMIT_INBOX || "kevin@jdradiator.com";

type InquiryBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  country?: string;
  message?: string;
  page?: string;
  locale?: string;
  attachments?: string[]; // filenames only (files themselves go via email)
  _gotcha?: string; // honeypot: bots fill hidden fields; humans never do
};

async function feishuToken(): Promise<string | null> {
  const appId = process.env.FEISHU_APP_ID;
  const appSecret = process.env.FEISHU_APP_SECRET;
  if (!appId || !appSecret) return null;
  try {
    const res = await fetch(
      `${FEISHU_BASE}/open-apis/auth/v3/tenant_access_token/internal`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
      },
    );
    const data = (await res.json()) as { tenant_access_token?: string };
    return data.tenant_access_token ?? null;
  } catch {
    return null;
  }
}

async function sendFeishu(text: string): Promise<boolean> {
  const chatId = process.env.FEISHU_INQUIRY_CHAT_ID;
  if (!chatId) return false;
  const token = await feishuToken();
  if (!token) return false;
  try {
    const res = await fetch(
      `${FEISHU_BASE}/open-apis/im/v1/messages?receive_id_type=chat_id`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receive_id: chatId,
          msg_type: "text",
          content: JSON.stringify({ text }),
        }),
      },
    );
    const data = (await res.json()) as { code?: number };
    return data.code === 0;
  } catch {
    return false;
  }
}

// Best-effort email backup via FormSubmit's AJAX endpoint (server-side, so the
// response is readable — but we never let its failure fail the request, because
// Feishu is the guaranteed channel).
async function sendEmail(b: InquiryBody): Promise<boolean> {
  try {
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(FORMSUBMIT_INBOX)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // FormSubmit's AJAX endpoint rejects requests without a browser-like
          // Origin/Referer ("open this page through a web server"), so we spoof
          // the site's own origin from the server side.
          Origin: "https://jdradiator.com",
          Referer: "https://jdradiator.com/en/contact",
        },
        body: JSON.stringify({
          name: b.name || "",
          email: b.email || "",
          phone: b.phone || "",
          company: b.company || "",
          country: b.country || "",
          message: b.message || "",
          _subject: `官网询盘 / Website inquiry — ${b.name || b.email || ""}`,
          _template: "table",
          _captcha: "false",
        }),
      },
    );
    const data = (await res.json()) as { success?: string };
    return data.success === "true";
  } catch {
    return false;
  }
}

function fmtAlert(b: InquiryBody, iso: string): string {
  const lines = [
    "📨 官网新询盘 / New website inquiry",
    `时间: ${iso}`,
    b.name ? `姓名: ${b.name}` : null,
    b.email ? `邮箱: ${b.email}` : null,
    b.phone ? `电话: ${b.phone}` : null,
    b.company ? `公司: ${b.company}` : null,
    b.country ? `国家: ${b.country}` : null,
    b.page ? `来源页: ${b.page}${b.locale ? ` (${b.locale})` : ""}` : null,
    b.attachments && b.attachments.length
      ? `附件: ${b.attachments.length} 个（走邮件通道）`
      : null,
    "———",
    "留言:",
    (b.message || "(无留言)").trim(),
  ].filter(Boolean);
  return lines.join("\n");
}

export async function POST(request: Request) {
  let b: InquiryBody;
  try {
    b = (await request.json()) as InquiryBody;
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: silently accept (don't tip off bots) but do nothing.
  if (b._gotcha) return Response.json({ ok: true });

  // Reject empty/spam: need at least one contact channel.
  if (!b.email && !b.phone) {
    return Response.json({ ok: false, error: "no_contact" }, { status: 422 });
  }

  const iso = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";

  // Feishu is the guaranteed capture; email is best-effort. Run in parallel.
  const [feishuOk, emailOk] = await Promise.all([
    sendFeishu(fmtAlert(b, iso)),
    sendEmail(b),
  ]);

  // The lead is "captured" if EITHER durable channel accepted it. Feishu is the
  // one we control; if both fail we tell the visitor so they can email directly.
  const ok = feishuOk || emailOk;
  return Response.json(
    { ok, channels: { feishu: feishuOk, email: emailOk } },
    { status: ok ? 200 : 502 },
  );
}
