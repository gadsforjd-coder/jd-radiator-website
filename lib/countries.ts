// Heating-market country dataset for the radiator sizing calculator.
// Scope: northern-hemisphere cold/temperate countries that use hydronic
// radiators — Jiuding's main export markets. Not a global list.
//
// `factor` is the climate sizing factor (colder → larger margin). The six
// anchor bands agreed with the client:
//   1.20 extreme cold · 1.10 cold · 1.05 cooler · 1.00 temperate · 0.90 milder
//   "Other" fallback = 1.00
//
// Names carry zh/en/ru. For mn/es page rendering the English name is used as a
// fallback (handled in the UI), so those locales are intentionally not listed.

export type Country = {
  code: string; // ISO-ish short code, also used as React key / stored value
  zh: string;
  en: string;
  ru: string;
  factor: number;
};

export const COUNTRIES: Country[] = [
  // 1.20 — extreme cold
  { code: "mn", zh: "蒙古", en: "Mongolia", ru: "Монголия", factor: 1.2 },

  // 1.10 — cold
  { code: "ru", zh: "俄罗斯", en: "Russia", ru: "Россия", factor: 1.1 },
  { code: "kz", zh: "哈萨克斯坦", en: "Kazakhstan", ru: "Казахстан", factor: 1.1 },
  { code: "by", zh: "白俄罗斯", en: "Belarus", ru: "Беларусь", factor: 1.1 },
  { code: "ua", zh: "乌克兰", en: "Ukraine", ru: "Украина", factor: 1.1 },
  { code: "kg", zh: "吉尔吉斯斯坦", en: "Kyrgyzstan", ru: "Киргизия", factor: 1.1 },
  { code: "uz", zh: "乌兹别克斯坦", en: "Uzbekistan", ru: "Узбекистан", factor: 1.1 },
  { code: "tj", zh: "塔吉克斯坦", en: "Tajikistan", ru: "Таджикистан", factor: 1.1 },
  { code: "tm", zh: "土库曼斯坦", en: "Turkmenistan", ru: "Туркмения", factor: 1.1 },
  { code: "fi", zh: "芬兰", en: "Finland", ru: "Финляндия", factor: 1.1 },
  { code: "no", zh: "挪威", en: "Norway", ru: "Норвегия", factor: 1.1 },
  { code: "se", zh: "瑞典", en: "Sweden", ru: "Швеция", factor: 1.1 },
  { code: "is", zh: "冰岛", en: "Iceland", ru: "Исландия", factor: 1.1 },
  { code: "ca", zh: "加拿大", en: "Canada", ru: "Канада", factor: 1.1 },
  { code: "ee", zh: "爱沙尼亚", en: "Estonia", ru: "Эстония", factor: 1.1 },
  { code: "lv", zh: "拉脱维亚", en: "Latvia", ru: "Латвия", factor: 1.1 },
  { code: "lt", zh: "立陶宛", en: "Lithuania", ru: "Литва", factor: 1.1 },

  // 1.05 — cooler
  { code: "cnNorth", zh: "中国北方", en: "Northern China", ru: "Северный Китай", factor: 1.05 },
  { code: "pl", zh: "波兰", en: "Poland", ru: "Польша", factor: 1.05 },
  { code: "cz", zh: "捷克", en: "Czechia", ru: "Чехия", factor: 1.05 },
  { code: "sk", zh: "斯洛伐克", en: "Slovakia", ru: "Словакия", factor: 1.05 },
  { code: "ro", zh: "罗马尼亚", en: "Romania", ru: "Румыния", factor: 1.05 },
  { code: "hu", zh: "匈牙利", en: "Hungary", ru: "Венгрия", factor: 1.05 },
  { code: "bg", zh: "保加利亚", en: "Bulgaria", ru: "Болгария", factor: 1.05 },
  { code: "ge", zh: "格鲁吉亚", en: "Georgia", ru: "Грузия", factor: 1.05 },
  { code: "am", zh: "亚美尼亚", en: "Armenia", ru: "Армения", factor: 1.05 },
  { code: "az", zh: "阿塞拜疆", en: "Azerbaijan", ru: "Азербайджан", factor: 1.05 },
  { code: "md", zh: "摩尔多瓦", en: "Moldova", ru: "Молдавия", factor: 1.05 },

  // 1.00 — temperate
  { code: "de", zh: "德国", en: "Germany", ru: "Германия", factor: 1.0 },
  { code: "gb", zh: "英国", en: "United Kingdom", ru: "Великобритания", factor: 1.0 },
  { code: "fr", zh: "法国", en: "France", ru: "Франция", factor: 1.0 },
  { code: "nl", zh: "荷兰", en: "Netherlands", ru: "Нидерланды", factor: 1.0 },
  { code: "be", zh: "比利时", en: "Belgium", ru: "Бельгия", factor: 1.0 },
  { code: "at", zh: "奥地利", en: "Austria", ru: "Австрия", factor: 1.0 },
  { code: "ch", zh: "瑞士", en: "Switzerland", ru: "Швейцария", factor: 1.0 },
  { code: "dk", zh: "丹麦", en: "Denmark", ru: "Дания", factor: 1.0 },
  { code: "us", zh: "美国", en: "United States", ru: "США", factor: 1.0 },
  { code: "jp", zh: "日本", en: "Japan", ru: "Япония", factor: 1.0 },
  { code: "kr", zh: "韩国", en: "South Korea", ru: "Южная Корея", factor: 1.0 },
  { code: "tr", zh: "土耳其", en: "Turkey", ru: "Турция", factor: 1.0 },
  { code: "rs", zh: "塞尔维亚", en: "Serbia", ru: "Сербия", factor: 1.0 },
  { code: "hr", zh: "克罗地亚", en: "Croatia", ru: "Хорватия", factor: 1.0 },
  { code: "si", zh: "斯洛文尼亚", en: "Slovenia", ru: "Словения", factor: 1.0 },
  { code: "lu", zh: "卢森堡", en: "Luxembourg", ru: "Люксембург", factor: 1.0 },
  { code: "ie", zh: "爱尔兰", en: "Ireland", ru: "Ирландия", factor: 1.0 },

  // 0.90 — milder
  { code: "it", zh: "意大利", en: "Italy", ru: "Италия", factor: 0.9 },
  { code: "es", zh: "西班牙", en: "Spain", ru: "Испания", factor: 0.9 },
  { code: "pt", zh: "葡萄牙", en: "Portugal", ru: "Португалия", factor: 0.9 },
  { code: "gr", zh: "希腊", en: "Greece", ru: "Греция", factor: 0.9 },
  { code: "ir", zh: "伊朗", en: "Iran", ru: "Иран", factor: 0.9 },
  { code: "iq", zh: "伊拉克", en: "Iraq", ru: "Ирак", factor: 0.9 },
];

// Fallback bucket — used when nothing is selected or "Other" is chosen.
export const OTHER_FACTOR = 1.0;

const DISPLAY_LOCALES = new Set(["zh", "en", "ru"]);

// Readable name for a country in the current page language. mn/es fall back to
// the English name (their country names are not maintained separately).
export function countryName(c: Country, locale: string): string {
  if (locale === "zh") return c.zh;
  if (locale === "ru") return c.ru;
  return c.en; // en, mn, es
}

// Case-insensitive substring match across zh / en / ru names, so a user can
// type in any of the three languages regardless of the current page language.
export function matchesCountry(c: Country, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return c.zh.toLowerCase().includes(q) || c.en.toLowerCase().includes(q) || c.ru.toLowerCase().includes(q);
}

export { DISPLAY_LOCALES };
