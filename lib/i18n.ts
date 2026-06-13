export const locales = ["en", "ru", "mn", "es", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}

/**
 * hreflang alternates for Next metadata: en/ru/mn/es plus x-default
 * (x-default points at the English version).
 * `path` is the locale-less path, e.g. "" or "/products/jd50f".
 */
export function languageAlternates(path: string): Record<string, string> {
  const BASE_URL = "https://jdradiator.com";
  return {
    ...Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}${path}`])),
    "x-default": `${BASE_URL}/en${path}`,
  };
}
