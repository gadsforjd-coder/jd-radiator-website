import Image from "next/image";
import Link from "next/link";

// AquaTherm Almaty 2026 homepage banner (approved 2026-08-30).
// Baked bilingual artwork — text is part of the image, do NOT add copy here.
// Desktop art is a wide 1920x720; mobile art is a portrait 1080x1350 with
// larger text for small-screen legibility. Art direction swaps the two by
// viewport so mobile always gets the legible variant.
//
// Only zh/en/ru/mn have approved artwork. Any other locale (es, …) renders
// nothing. Exported so the hero carousel can reuse the exact same locale gate
// and alt text when it shows this banner as its lead slide.
export const AQUATHERM_SUPPORTED = ["zh", "en", "ru", "mn"] as const;
type Supported = (typeof AQUATHERM_SUPPORTED)[number];

export function isAquaThermSupported(lang: string): lang is Supported {
  return (AQUATHERM_SUPPORTED as readonly string[]).includes(lang);
}

// Per-language descriptive alt text (accessibility / SEO). Mirrors the baked
// artwork; not rendered copy.
export const AQUATHERM_ALT: Record<Supported, string> = {
  zh: "AquaTherm Almaty 2026 · 诚邀莅临九鼎展位 11-957，9月2–4日 哈萨克斯坦阿拉木图",
  en: "Meet Jiuding at AquaTherm Almaty 2026 · Booth 11-957 · September 2–4 · Almaty, Kazakhstan",
  ru: "Встречаемся на AquaTherm Almaty 2026 · Стенд 11-957 · 2–4 сентября · Алматы",
  mn: "AquaTherm Almaty 2026-д уулзъя · Стенд 11-957 · 9-р сарын 2–4 · Алмати",
};

// Code-rendered hero copy for the AquaTherm carousel slide. Owner feedback
// 2026-08-30: the baked-artwork "floating card" slide looked inconsistent with
// the other full-bleed photo+text slides — so this slide now uses the standard
// hero template with the booth number / dates rendered as real text (never
// cropped). kicker is the event name (kept uppercase in all locales).
export const AQUATHERM_HERO: Record<Supported, { kicker: string; title: string; lead: string }> = {
  zh: { kicker: "AQUATHERM ALMATY 2026", title: "诚邀莅临九鼎展位", lead: "展位 11-957 · 9月2–4日 · 哈萨克斯坦阿拉木图" },
  en: { kicker: "AQUATHERM ALMATY 2026", title: "Meet Jiuding at the Show", lead: "Booth 11-957 · September 2–4 · Almaty, Kazakhstan" },
  ru: { kicker: "AQUATHERM ALMATY 2026", title: "Ждём вас на нашем стенде", lead: "Стенд 11-957 · 2–4 сентября · Алматы, Казахстан" },
  mn: { kicker: "AQUATHERM ALMATY 2026", title: "Манай стендэд урьж байна", lead: "Стенд 11-957 · 9-р сарын 2–4 · Алмати, Казахстан" },
};

export default function AquaThermBanner({ lang }: { lang: string }) {
  if (!isAquaThermSupported(lang)) return null;

  const alt = AQUATHERM_ALT[lang];
  const desktopSrc = `/assets/aquatherm/banner-${lang}-V1.png`;
  const mobileSrc = `/assets/aquatherm/banner-${lang}-mobile-V1.png`;

  return (
    <section id="aquatherm" className="scroll-mt-24 bg-[#FFF7ED]">
      <Link
        href={`/${lang}/contact`}
        aria-label={alt}
        className="group block w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--jd-red)]/40"
      >
        {/* Mobile: portrait, larger-text variant. Hidden on lg+. */}
        <Image
          src={mobileSrc}
          alt={alt}
          width={1080}
          height={1350}
          sizes="100vw"
          preload
          className="block lg:hidden w-full h-auto"
        />
        {/* Desktop/tablet: wide variant. Hidden below lg. */}
        <Image
          src={desktopSrc}
          alt={alt}
          width={1920}
          height={720}
          sizes="100vw"
          preload
          className="hidden lg:block w-full h-auto"
        />
      </Link>
    </section>
  );
}
