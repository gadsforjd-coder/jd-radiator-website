import type { Locale } from "./i18n";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((m) => m.default),
  ru: () => import("../dictionaries/ru.json").then((m) => m.default),
  mn: () => import("../dictionaries/mn.json").then((m) => m.default),
  es: () => import("../dictionaries/es.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
