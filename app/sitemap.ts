import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/lib/i18n";
import { products } from "@/lib/products";
import { BASE_URL } from "@/lib/constants";

const pages = [
  "",
  "/about",
  "/products",
  "/cases",
  "/downloads",
  "/calculator",
  "/collaborate",
  "/contact",
];

function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${BASE_URL}/${locale}${path}`;
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    entries.push({
      url: `${BASE_URL}/${defaultLocale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? "weekly" : "monthly",
      priority: page === "" ? 1 : 0.8,
      alternates: buildAlternates(page),
    });
  }

  for (const product of products) {
    entries.push({
      url: `${BASE_URL}/${defaultLocale}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: buildAlternates(`/products/${product.slug}`),
    });
  }

  return entries;
}
