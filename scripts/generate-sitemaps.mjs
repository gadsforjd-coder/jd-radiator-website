#!/usr/bin/env node
/**
 * Generates static per-language sitemaps in public/:
 *   sitemap-en.xml / sitemap-ru.xml / sitemap-mn.xml / sitemap-es.xml
 * plus a sitemap.xml index referencing them.
 *
 * The project deliberately uses static sitemap files (no app/sitemap.ts)
 * because of a Vercel 500 issue — keep it that way. Re-run this script
 * whenever pages or products are added:
 *   node scripts/generate-sitemaps.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE_URL = "https://jdradiator.com";
const LOCALES = ["en", "ru", "mn", "es"];

// Product slugs come straight from lib/products.ts (single source of truth).
const productsSrc = readFileSync(join(ROOT, "lib/products.ts"), "utf8");
const productsArr = productsSrc.split("export const products")[1].split("];")[0];
const productSlugs = [...productsArr.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

// Blog post slugs from lib/blog.ts (if present).
let blogSlugs = [];
try {
  const blogSrc = readFileSync(join(ROOT, "lib/blog.ts"), "utf8");
  blogSlugs = [...blogSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
} catch {
  // no blog yet
}

/** path (without locale prefix), changefreq, priority */
const pages = [
  ["", "weekly", "1"],
  ["/about", "monthly", "0.8"],
  ["/products", "monthly", "0.8"],
  ["/cases", "monthly", "0.8"],
  ["/downloads", "monthly", "0.8"],
  ["/calculator", "monthly", "0.8"],
  ["/collaborate", "monthly", "0.8"],
  ["/contact", "monthly", "0.8"],
  ["/credentials", "monthly", "0.8"],
  ["/faq", "monthly", "0.8"],
  ...(blogSlugs.length > 0 ? [["/blog", "weekly", "0.8"]] : []),
  ...productSlugs.map((slug) => [`/products/${slug}`, "monthly", "0.7"]),
  ...blogSlugs.map((slug) => [`/blog/${slug}`, "monthly", "0.6"]),
];

function urlEntry(lang, path, changefreq, priority) {
  const links = LOCALES.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}${path}"/>`
  ).join("\n");
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${path}"/>`;
  return `  <url>
    <loc>${BASE_URL}/${lang}${path}</loc>
${links}
${xDefault}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const today = new Date().toISOString().slice(0, 10);

for (const lang of LOCALES) {
  const body = pages.map(([p, cf, pr]) => urlEntry(lang, p, cf, pr)).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;
  writeFileSync(join(ROOT, `public/sitemap-${lang}.xml`), xml);
  console.log(`public/sitemap-${lang}.xml: ${pages.length} URLs`);
}

const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${LOCALES.map(
  (l) => `  <sitemap>
    <loc>${BASE_URL}/sitemap-${l}.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
).join("\n")}
</sitemapindex>
`;
writeFileSync(join(ROOT, "public/sitemap.xml"), index);
console.log(`public/sitemap.xml: index of ${LOCALES.length} sitemaps`);
