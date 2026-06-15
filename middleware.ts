import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "./lib/i18n";

const LOCALE_COOKIE = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

// Visitor country (ISO 3166-1 alpha-2, from Vercel's `x-vercel-ip-country`
// header) -> site locale. Anything not listed falls back to English.
const COUNTRY_LOCALE: Record<string, Locale> = {
  // Chinese
  CN: "zh", HK: "zh", MO: "zh", TW: "zh",
  // Russian-speaking
  RU: "ru", BY: "ru", KZ: "ru", KG: "ru",
  // Mongolian
  MN: "mn",
  // Spanish-speaking
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es",
  EC: "es", GT: "es", CU: "es", BO: "es", DO: "es", HN: "es", PY: "es",
  SV: "es", NI: "es", CR: "es", PA: "es", UY: "es", GQ: "es", PR: "es",
};

function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

// Pick the best locale for a first-time (locale-less) visitor:
// 1) their previously chosen language (cookie), 2) their region by IP,
// 3) English default.
function pickLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  if (country && COUNTRY_LOCALE[country]) return COUNTRY_LOCALE[country];

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api/") ||
    pathname === "/tracker.js"
  ) {
    return;
  }

  // Already on a localed path: remember that locale so geo-detection never
  // overrides a manual language choice on later visits to the root.
  const currentLocale = locales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (currentLocale) {
    const res = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== currentLocale) {
      res.cookies.set(LOCALE_COOKIE, currentLocale, { maxAge: COOKIE_MAX_AGE, path: "/" });
    }
    return res;
  }

  // Locale-less path -> redirect to the region/cookie-appropriate locale.
  const locale = pickLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  const res = NextResponse.redirect(request.nextUrl);
  res.cookies.set(LOCALE_COOKIE, locale, { maxAge: COOKIE_MAX_AGE, path: "/" });
  return res;
}

export const config = {
  matcher: ["/((?!_next|assets|favicon.ico|.*\\..*).*)"],
};
