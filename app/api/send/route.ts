// Umami collector behind an ephemeral Cloudflare quick-tunnel. The trycloudflare
// URL rotates every time cloudflared restarts, so it is kept in source (not a
// Vercel env var) and auto-reconciled by ~/zylos/umami/reconcile-umami-host.sh,
// which rewrites this line and pushes when the tunnel URL changes. Hardcoded so a
// stale Vercel UMAMI_HOST env var can't silently override it (that caused the
// 2026-06-12 analytics outage). Keep the assignment on a single line for the script.
const UMAMI_HOST = "https://block-allocated-witch-flights.trycloudflare.com";

export async function POST(request: Request) {
  const body = await request.text();
  // Real visitor IP: first entry of Vercel's x-forwarded-for. Sent in a custom
  // header because Cloudflare (tunnel) rewrites x-forwarded-for/x-real-ip with
  // Vercel's egress IP; Umami reads it via CLIENT_IP_HEADER=x-umami-client-ip.
  const clientIp =
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "";
  const res = await fetch(`${UMAMI_HOST}/api/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": request.headers.get("user-agent") || "",
      "X-Umami-Client-IP": clientIp,
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
