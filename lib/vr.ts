import type { Locale } from "./i18n";

/**
 * Language-matched wasee.com 360° VR factory tours.
 * Locales without a dedicated tour (mn, es) fall back to the English tour.
 */
const VR_TOURS: Partial<Record<Locale, string>> = {
  en: "https://f41avpysb.wasee.com/wt/f41avpysb",
  ru: "https://f41gimf0b.wasee.com/wt/f41gimf0b",
  zh: "https://958ifclss.wasee.com/wt/958ifclss",
};

export function vrTourUrl(locale: Locale): string {
  return VR_TOURS[locale] ?? VR_TOURS.en!;
}
