import type { Locale } from "./i18n";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((m) => m.default),
  ru: () => import("../dictionaries/ru.json").then((m) => m.default),
  mn: () => import("../dictionaries/mn.json").then((m) => m.default),
  es: () => import("../dictionaries/es.json").then((m) => m.default),
  zh: () => import("../dictionaries/zh.json").then((m) => m.default),
};

// The English dictionary is the canonical shape. `heroSlides` is optional so
// locales that have not yet been given the extra hero-carousel slides (e.g. zh)
// still satisfy the type; the homepage guards against its absence at runtime.
type EnDictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;
export type Dictionary = Omit<EnDictionary, "heroSlides"> &
  Partial<Pick<EnDictionary, "heroSlides">>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
