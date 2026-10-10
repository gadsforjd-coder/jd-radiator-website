// Anti-scraping layer for the public site.
//
// Goal: make it harder for competitors to bulk-scrape our product pages and
// content, WITHOUT ever hurting SEO or GEO. Design constraints (Vercel Hobby /
// free tier, no Pro challenge pages, no external KV store):
//   1. Block obvious scraping tools by User-Agent (curl / scrapy / python / …)
//      and competitor SEO-intel crawlers (Ahrefs / Semrush / …).
//   2. Best-effort per-IP rate limit (in-memory) on page routes -> 429.
//   3. NEVER touch legitimate crawlers — this covers BOTH:
//        (a) search engines (Googlebot / Bingbot / YandexBot / Baiduspider …)
//            so classic SEO indexing is never harmed; and
//        (b) AI answer / retrieval crawlers (ChatGPT / Perplexity / Claude /
//            Doubao-Bytespider / Qwen …) — these are our GEO distribution
//            channel (being cited in AI answers). Blocking them would sabotage
//            the company's GEO strategy, so they are explicitly ALLOWED.
//
// Honest limitation: the rate-limit counter lives in per-instance memory, so
// on serverless it resets when an instance recycles and is not shared across
// instances. It still stops a single aggressive scraper hammering one
// instance, but it is NOT a hard distributed quota. A hard quota would need
// Vercel KV / Upstash (paid) — intentionally out of scope for the free tier.

import { NextRequest, NextResponse } from "next/server";

// --- Tunables (overridable via env, with safe defaults) ---------------------
const RATE_MAX = Number(process.env.ANTIBOT_RATE_MAX ?? 60); // requests...
const RATE_WINDOW_MS = Number(process.env.ANTIBOT_RATE_WINDOW_MS ?? 60_000); // ...per 60s
// Master switch: set ANTIBOT_DISABLED=1 to turn the whole layer off instantly
// (escape hatch if anything ever goes wrong in production).
const DISABLED = process.env.ANTIBOT_DISABLED === "1";
// Pure AI *training* crawlers (GPTBot / CCBot / ClaudeBot). Default = ALLOW
// (feeds our content into AI corpora, which tends to increase citation odds =
// good for GEO). Set ANTIBOT_BLOCK_AI_TRAINING=1 to block them instead — this
// is the one strategy knob left for 珊 to flip; it does NOT affect the AI
// answer/retrieval crawlers below, which are always allowed.
const BLOCK_AI_TRAINING = process.env.ANTIBOT_BLOCK_AI_TRAINING === "1";

// --- (a) Search engines: ALWAYS allowed, never rate-limited -----------------
// Matched case-insensitively against the UA. Keep this list permissive — a
// false positive here only means "we let a real search bot in", which is what
// we want. SEO safety lives in this list.
const SEARCH_ENGINE_UA = [
  "googlebot",
  "google-inspectiontool",
  "storebot-google",
  "bingbot",
  "adidxbot",
  "yandex", // yandexbot, yandeximages, …
  "baiduspider",
  "duckduckbot",
  "applebot", // also powers Siri/Spotlight suggestions
  "petalbot", // Huawei / Petal search
  "sogou",
  "slurp", // Yahoo
  "ia_archiver",
  "facebookexternalhit", // link unfurls (FB/IG/WhatsApp previews)
  "twitterbot",
  "linkedinbot",
  "telegrambot",
  "whatsapp",
  "slackbot",
  "discordbot",
];

// --- (b) AI answer / retrieval crawlers: ALWAYS allowed (GEO channel) --------
// These fetch pages to ANSWER / CITE in AI products — i.e. our GEO reach.
// Tokens are specific so they never collide with the *training* list below
// (e.g. "claude-user" / "claude-searchbot" are retrieval; "claudebot" is
// training and lives in AI_TRAINING_UA).
const AI_ANSWER_UA = [
  "oai-searchbot", // OpenAI search index
  "chatgpt-user", // ChatGPT live browse on user request
  "perplexitybot", // Perplexity index
  "perplexity-user", // Perplexity live fetch
  "claude-searchbot", // Anthropic search index
  "claude-user", // Claude live fetch on user request
  "anthropic-ai", // Anthropic user-initiated fetch (legacy token)
  "bytespider", // ByteDance / Doubao (豆包) — Chinese AI, GEO-critical
  "qwenbot", // Alibaba Tongyi Qianwen (通义千问)
  "amazonbot", // Alexa / Amazon answer fetches
  "youbot", // You.com
  "cohere-ai",
  "diffbot",
];

// --- Pure AI training crawlers (env-toggleable, default allow) ---------------
const AI_TRAINING_UA = [
  "gptbot", // OpenAI training
  "ccbot", // CommonCrawl (feeds many LLMs)
  "claudebot", // Anthropic training (NOT claude-user/claude-searchbot)
  "google-extended", // Gemini training opt-in token
];

// --- Known scraping tools + competitor SEO-intel crawlers: 403 --------------
// HTTP clients / scraping frameworks that no real browser sends (near-zero
// false positives), plus SEO-intel crawlers that competitors use to mine our
// backlinks / content. Search engines and AI crawlers above are checked FIRST,
// so nothing here can ever touch them.
const BAD_UA = [
  // automation / HTTP libraries
  "scrapy",
  "python-requests",
  "python-urllib",
  "aiohttp",
  "httpx",
  "go-http-client",
  "okhttp",
  "java/",
  "jakarta",
  "apache-httpclient",
  "libwww-perl",
  "curl/",
  "wget/",
  "node-fetch",
  "axios/",
  "got (",
  "guzzlehttp",
  "phantomjs",
  "selenium",
  "puppeteer",
  "playwright",
  "httrack",
  // offensive security scanners
  "wpscan",
  "nikto",
  "sqlmap",
  "masscan",
  "zgrab",
  // competitor SEO-intel crawlers (mine our backlinks/content for rivals).
  // NOTE: if we ourselves run Ahrefs/Semrush site audits, allowlist our egress
  // IP out-of-band — our own audits would otherwise be blocked here.
  "ahrefsbot",
  "semrushbot",
  "mj12bot",
  "dotbot",
  "dataforseo",
  "serpstatbot",
  "blexbot",
  "megaindex",
];

function uaMatches(ua: string, list: string[]): boolean {
  const lower = ua.toLowerCase();
  return list.some((needle) => lower.includes(needle));
}

/** Legitimate crawlers we must never block: search engines + AI answer/
 *  retrieval, plus AI training unless 珊 has flipped BLOCK_AI_TRAINING. */
export function isAllowedCrawler(ua: string): boolean {
  if (uaMatches(ua, SEARCH_ENGINE_UA)) return true;
  if (uaMatches(ua, AI_ANSWER_UA)) return true;
  if (!BLOCK_AI_TRAINING && uaMatches(ua, AI_TRAINING_UA)) return true;
  return false;
}

export function isBadBot(ua: string): boolean {
  // Empty / missing UA is a strong scraper signal for a public marketing site.
  if (!ua.trim()) return true;
  if (uaMatches(ua, BAD_UA)) return true;
  // Only blocks training crawlers when the strategy knob is turned on.
  if (BLOCK_AI_TRAINING && uaMatches(ua, AI_TRAINING_UA)) return true;
  return false;
}

// --- Best-effort per-IP rate limiter (in-memory sliding window) -------------
const hits = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const recent = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the Map can't grow unbounded on a long-lived
  // instance: if it gets large, drop IPs with no recent activity.
  if (hits.size > 10_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => t <= windowStart)) hits.delete(key);
    }
  }

  if (recent.length > RATE_MAX) {
    return { limited: true, retryAfter: Math.ceil(RATE_WINDOW_MS / 1000) };
  }
  return { limited: false, retryAfter: 0 };
}

/**
 * Run the anti-bot checks for a page request.
 * Returns a Response to short-circuit (403 / 429), or null to let the request
 * proceed to the normal i18n handling.
 *
 * Call this ONLY for real page routes — never for /api, static assets, or the
 * tracker. Legitimate crawlers (search + AI) are returned null FIRST so neither
 * indexing nor GEO is ever affected.
 */
export function antiBot(request: NextRequest): NextResponse | null {
  if (DISABLED) return null;

  const ua = request.headers.get("user-agent") ?? "";

  // 1) Legitimate crawlers (search engines + AI answer/retrieval): let them
  //    through untouched. This runs BEFORE every block, so we can never
  //    403/429 a real search bot or an AI answer crawler. SEO + GEO gate.
  if (isAllowedCrawler(ua)) return null;

  // 2) Known scraping tools / competitor crawlers / empty UA -> 403.
  if (isBadBot(ua)) {
    return new NextResponse("Forbidden", {
      status: 403,
      headers: { "cache-control": "no-store" },
    });
  }

  // 3) Best-effort per-IP rate limit -> 429.
  const ip = getClientIp(request);
  const { limited, retryAfter } = rateLimited(ip);
  if (limited) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "retry-after": String(retryAfter),
        "cache-control": "no-store",
      },
    });
  }

  return null;
}
