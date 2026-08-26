import {
  knowledgeArticles,
  articleLocales,
  localesWithArticles,
} from "@/lib/knowledge";
import type { Locale } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";

// Dynamic sitemap for the Knowledge Base. Generated from the article data so
// it never goes stale: adding an article (or a new locale on an existing one)
// automatically extends this sitemap. Only locales with real published copy
// are emitted, each with hreflang alternates limited to its available locales.
//
// This file is the crawl entry point for the "unlisted but indexable" hub —
// the pages carry no nav link, so search/AI crawlers discover them here.

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function urlEntry(path: string, alternates: Locale[], lastmod: string): string {
  const loc = `${BASE_URL}${path}`;
  const alts = alternates
    .map((l) => {
      // Swap the locale segment at the start of the path.
      const localized = path.replace(/^\/[a-z]{2}(\/|$)/, `/${l}$1`);
      return `    <xhtml:link rel="alternate" hreflang="${l}" href="${xmlEscape(`${BASE_URL}${localized}`)}"/>`;
    })
    .join("\n");
  const xDefault = alternates.includes("en" as Locale)
    ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(`${BASE_URL}${path.replace(/^\/[a-z]{2}(\/|$)/, "/en$1")}`)}"/>`
    : "";
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
${alts}${xDefault}
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
}

export function GET() {
  const hubLocales = localesWithArticles();
  const entries: string[] = [];

  // Latest article date drives the hub's lastmod.
  const hubLastmod =
    knowledgeArticles.map((a) => a.date).sort().slice(-1)[0] ?? "2026-08-26";

  // Hub URLs (one per locale that has at least one article).
  for (const l of hubLocales) {
    entries.push(urlEntry(`/${l}/knowledge`, hubLocales, hubLastmod));
  }

  // Article URLs (only the locales each article is published in).
  for (const article of knowledgeArticles) {
    const langs = articleLocales(article);
    for (const l of langs) {
      entries.push(urlEntry(`/${l}/knowledge/${article.slug}`, langs, article.date));
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
