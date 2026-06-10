const UMAMI_HOST =
  process.env.UMAMI_HOST ||
  "https://nut-tender-smallest-void.trycloudflare.com";

export async function POST(request: Request) {
  const body = await request.text();
  const res = await fetch(`${UMAMI_HOST}/api/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": request.headers.get("user-agent") || "",
      "X-Forwarded-For": request.headers.get("x-forwarded-for") || "",
      "X-Real-IP": request.headers.get("x-real-ip") || "",
      Accept: request.headers.get("accept") || "",
      "Accept-Language": request.headers.get("accept-language") || "",
      Referer: request.headers.get("referer") || "",
    },
    body,
  });
  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
