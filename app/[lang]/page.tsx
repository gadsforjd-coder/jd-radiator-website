import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { locales, languageAlternates } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import TechBreakdown from "./TechBreakdown";
import CertMarquee from "./CertMarquee";
import HeroCarousel, { type HeroSlide } from "./HeroCarousel";
import { VRTour } from "./VRTour";
import { vrTourUrl } from "@/lib/vr";
import CustomerMap from "./CustomerMap";

// Small line icons paired with the homepage stat metrics.
const ICON = "w-5 h-5";
const STAT_ICONS = {
  experience: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON}><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
  ),
  markets: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
  ),
  oem: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON}><path d="m12 2 9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5" /></svg>
  ),
  quality: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
  ),
};

const metaByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: "Jiuding Radiator | Steel Radiator Manufacturer & OEM Partner",
    description:
      "CE/EN442-certified steel radiator manufacturer since 2002. Designer, column, panel radiators and heated towel rails. OEM/ODM for 80+ countries. Get a quote today.",
  },
  zh: {
    title: "Jiuding Radiator | 钢制散热器制造商与OEM合作伙伴",
    description:
      "2002年成立的CE/EN442认证钢制散热器制造商。设计款、柱式、板式散热器及电热毛巾架，面向80多个国家提供OEM/ODM，立即获取报价。",
  },
  ru: {
    title: "Jiuding Radiator | Производитель стальных радиаторов и OEM-партнёр",
    description:
      "Сертифицированный CE/EN442 производитель стальных радиаторов с 2002 года. Дизайнерские, колончатые, панельные радиаторы и полотенцесушители. OEM/ODM в 80+ стран.",
  },
  mn: {
    title: "Jiuding Radiator | Ган радиатор үйлдвэрлэгч ба OEM түнш",
    description:
      "2002 оноос хойш CE/EN442 гэрчилгээтэй ган радиатор үйлдвэрлэгч. Дизайнер, баганат, хавтгай радиатор, алчуур хатаагч. 80+ оронд OEM/ODM.",
  },
  es: {
    title: "Jiuding Radiator | Fabricante de Radiadores de Acero y Socio OEM",
    description:
      "Fabricante de radiadores de acero certificado CE/EN442 desde 2002. Radiadores de diseño, columna, panel y toalleros calefactados. OEM/ODM para más de 80 países.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const meta = metaByLocale[lang] || metaByLocale.en;
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: languageAlternates(""),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${lang}`,
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);

  // Hero carousel slides. Slide 1 reproduces the original static hero exactly.
  // Additional slides come from the optional `heroSlides` dictionary key — each
  // is only added when its translation exists, so locales without the key (and
  // any future ones) gracefully fall back to a single-slide hero.
  const slides: HeroSlide[] = [
    {
      image: "/assets/ai-images/hero-banner.png",
      kicker: d.hero.kicker,
      title: d.hero.title,
      lead: d.hero.lead,
      cta1: { label: d.hero.cta1, href: `/${locale}/products` },
      focal: "left center", // product on the left — keep it from being cropped on narrow viewports
    },
  ];

  const steelColumn = d.heroSlides?.steelColumn;
  if (steelColumn) {
    slides.push({
      image: "/assets/ai-images/hero-steel-column.png",
      kicker: steelColumn.kicker,
      title: steelColumn.title,
      lead: steelColumn.lead,
      cta1: { label: steelColumn.cta1, href: `/${locale}/products` },
      focal: "left center", // radiator on the left — keep it from being cropped on narrow viewports
    });
  }

  const panel = d.heroSlides?.panel;
  if (panel) {
    slides.push({
      image: "/assets/ai-images/hero-panel.png",
      kicker: panel.kicker,
      title: panel.title,
      lead: panel.lead,
      advantages: panel.advantages,
      cta1: { label: panel.cta1, href: `/${locale}/products` },
    });
  }

  return (
    <>
      {/* Hero — rotating full-bleed carousel with warm scrim behind the text only */}
      <section className="relative min-h-[88vh] lg:min-h-[70vh] lg:aspect-[7/4] lg:max-h-screen -mt-[96px] pt-[96px] flex items-center overflow-hidden bg-[#FFF7ED]">
        <HeroCarousel slides={slides} />

        {/* Stats strip at bottom — light bar, each metric paired with an icon */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-[#F1E7DC] bg-white/90 backdrop-blur-xl">
            {[
              { num: d.stats.years, label: d.stats.yearsLabel, icon: STAT_ICONS.experience },
              { num: d.stats.markets, label: d.stats.marketsLabel, icon: STAT_ICONS.markets },
              { num: d.stats.oem, label: d.stats.oemLabel, icon: STAT_ICONS.oem },
              { num: d.stats.quality, label: d.stats.qualityLabel, icon: STAT_ICONS.quality },
            ].map((s) => (
              <div key={s.num} className="py-6 px-7 lg:px-9 border-r border-[#F1E7DC] last:border-r-0 flex items-center gap-3.5">
                <span className="shrink-0 w-11 h-11 rounded-xl bg-[var(--jd-red)]/10 text-[var(--jd-red)] flex items-center justify-center">{s.icon}</span>
                <div>
                  <strong className="block text-2xl lg:text-3xl text-[var(--jd-red)] font-black leading-none mb-1">{s.num}</strong>
                  <span className="text-[#64748B] text-xs lg:text-sm">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products — with numbering, hover glow, featured card */}
      <section className="bg-white text-[#1E293B] py-24 px-6 lg:px-14">
        <div className="max-w-4xl mb-14">
          <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{d.products.kicker}</p>
          <h2 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight">{d.products.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { title: d.products.designer, desc: d.products.designerDesc, href: `/${locale}/products#designer`, img: "/assets/ai-images/cat-designer.png", num: "01", featured: true },
            { title: d.products.steel, desc: d.products.steelDesc, href: `/${locale}/products#panel`, img: "/assets/ai-images/cat-panel.png", num: "02", featured: false },
            { title: d.products.towel, desc: d.products.towelDesc, href: `/${locale}/products#towel`, img: "/assets/products/jdwy-s/scene-1.jpg", num: "03", featured: false },
            { title: d.products.oem, desc: d.products.oemDesc, href: `/${locale}/contact`, img: "/assets/ai-images/cat-column.png", num: "04", featured: false },
          ].map((p) => (
            <Link
              key={p.num}
              href={p.href}
              className={`group relative flex flex-col overflow-hidden rounded-lg bg-white border border-[#F1E7DC] shadow-[0_4px_16px_rgba(30,41,59,0.05)] product-card-hover transition-all duration-500 ${p.featured ? "ring-1 ring-[var(--jd-red)]/40 shadow-[0_0_30px_rgba(234,88,12,0.15)]" : ""}`}
            >
              <div className="relative h-[260px] overflow-hidden bg-gradient-to-b from-[#FFF7ED] to-white">
                <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                <span className="absolute top-4 left-5 text-[var(--jd-red)]/80 font-black text-3xl">{p.num}</span>
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-xl font-bold mb-2 text-[#1E293B] group-hover:text-[var(--jd-red)] transition-colors">{p.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{p.desc}</p>
              </div>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--jd-red)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <Link href={`/${locale}/products`} className="inline-flex h-14 items-center px-8 bg-[var(--jd-red)] text-white font-extrabold rounded-sm hover:bg-orange-700 transition-all hover:shadow-[0_0_30px_rgba(234,88,12,0.4)]">{d.products.viewAll}</Link>
        </div>
        <Link
          href={`/${locale}/calculator`}
          className="group mt-8 flex items-center justify-between gap-4 rounded-lg border border-[var(--jd-orange)]/40 bg-[#FFF7ED] px-6 py-5 hover:border-[var(--jd-orange)] hover:shadow-[0_0_24px_rgba(234,88,12,0.15)] transition-all"
        >
          <span className="inline-flex items-center gap-3 font-bold text-base lg:text-lg text-[#1E293B]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[var(--jd-red)] shrink-0" aria-hidden="true">
              <rect x="5" y="3" width="14" height="18" rx="2" />
              <path d="M8 7h8" />
              <path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" />
            </svg>
            {d.calculator.homeCta}
          </span>
          <span className="text-[var(--jd-red)] font-black text-xl shrink-0 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </section>

      {/* Technology Breakdown — Nanfu-style interactive hotspot layout */}
      <TechBreakdown
        kicker={d.tech.kicker}
        title={d.tech.title}
        subtitle={d.tech.subtitle}
        features={[
          { title: d.tech.feature1, desc: d.tech.feature1Desc, num: "01" },
          { title: d.tech.feature2, desc: d.tech.feature2Desc, num: "02" },
          { title: d.tech.feature3, desc: d.tech.feature3Desc, num: "03" },
          { title: d.tech.feature4, desc: d.tech.feature4Desc, num: "04" },
        ]}
      />

      {/* Applications — use cases */}
      <section className="bg-[#FFF7ED] text-[#1E293B] py-24 px-6 lg:px-14">
        <div className="max-w-4xl mb-14">
          <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{d.applications.kicker}</p>
          <h2 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight">{d.applications.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: d.applications.apartments, desc: d.applications.apartmentsDesc, img: "/assets/ai-images/scene-living-room.png" },
            { title: d.applications.hotels, desc: d.applications.hotelsDesc, img: "/assets/ai-images/scene-hotel-lobby.png" },
            { title: d.applications.villas, desc: d.applications.villasDesc, img: "/assets/ai-images/scene-designer-bedroom.png" },
            { title: d.applications.bathrooms, desc: d.applications.bathroomsDesc, img: "/assets/ai-images/scene-bathroom.png" },
            { title: d.applications.commercial, desc: d.applications.commercialDesc, img: "/assets/ai-images/scene-office.png" },
            { title: d.applications.construction, desc: d.applications.constructionDesc, img: "/assets/ai-images/scene-panel-kitchen.png" },
          ].map((a) => (
            <Link key={a.title} href={`/${locale}/cases`} className="group flex flex-col rounded-lg overflow-hidden bg-white border border-[#F1E7DC] shadow-[0_4px_16px_rgba(30,41,59,0.05)] hover:shadow-[0_10px_30px_rgba(234,88,12,0.14)] hover:border-[var(--jd-red)]/35 transition-all duration-300">
              <div className="relative h-[190px] overflow-hidden">
                <Image
                  src={a.img}
                  alt={a.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium bg-[var(--jd-red)]/90 px-3 py-1 rounded-full">View Gallery →</span>
                </div>
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-xl font-bold text-[#1E293B] mb-1.5 group-hover:text-[var(--jd-red)] transition-colors">{a.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Manufacturing — light section with white-framed factory photo cards */}
      <section className="bg-white text-[#1E293B] py-24 px-6 lg:px-14 overflow-hidden">
        <div className="max-w-4xl mb-14">
          <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{d.manufacturing.kicker}</p>
          <h2 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight">{d.manufacturing.title}</h2>
        </div>
        {/* Each manufacturing step shown with its own photo */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {[
            { label: d.manufacturing.welding, img: "/assets/ai-images/hero-manufacturing.png" },
            { label: d.manufacturing.surface, img: "/assets/ai-images/article-surface-treatment.png" },
            { label: d.manufacturing.inspection, img: "/assets/ai-images/about-quality-testing.png" },
            { label: d.manufacturing.packaging, img: "/assets/ai-images/about-factory-aerial.png" },
          ].map((m, i) => (
            <div key={i} className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-[#F1E7DC] shadow-[0_4px_16px_rgba(30,41,59,0.06)] hover:shadow-[0_12px_30px_rgba(234,88,12,0.16)] transition-all duration-300">
              <Image
                src={m.img}
                alt={m.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/85 via-[#0B1220]/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <b className="block text-white/60 text-sm font-black mb-1">0{i + 1}</b>
                <span className="text-white text-lg lg:text-xl font-semibold leading-tight">{m.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VR Factory Tour — immersive 360° walkthrough */}
      <VRTour url={vrTourUrl(locale)} t={d.vr} />

      {/* OEM/ODM Support — Interactive process flow */}
      <section className="relative py-28 px-6 lg:px-14 bg-white overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--jd-orange)]/5 rounded-full blur-[160px]" />
        <div className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{d.oemSupport.kicker}</p>
            <h2 className="text-4xl lg:text-6xl font-black text-[#1E293B] leading-tight tracking-tight">{d.oemSupport.title}</h2>
          </div>
          {/* Horizontal process pipeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Animated connecting line */}
            <div className="hidden lg:block absolute top-[48px] left-[8%] right-[8%] h-[2px]">
              <div className="w-full h-full bg-gradient-to-r from-[var(--jd-red)]/20 via-[var(--jd-red)]/40 to-[var(--jd-red)]/20" />
              <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-[var(--jd-red)]/60 to-transparent animate-flow-line" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-3">
              {[
                { title: d.oemSupport.customSize, desc: d.oemSupport.customSizeDesc, num: "01", icon: "⬡" },
                { title: d.oemSupport.customColor, desc: d.oemSupport.customColorDesc, num: "02", icon: "◈" },
                { title: d.oemSupport.privateLabel, desc: d.oemSupport.privateLabelDesc, num: "03", icon: "◎" },
                { title: d.oemSupport.customPackaging, desc: d.oemSupport.customPackagingDesc, num: "04", icon: "▣" },
                { title: d.oemSupport.bulkProduction, desc: d.oemSupport.bulkProductionDesc, num: "05", icon: "⬢" },
                { title: d.oemSupport.projectSupply, desc: d.oemSupport.projectSupplyDesc, num: "06", icon: "◉" },
              ].map((o) => (
                <div key={o.num} className="group flex flex-col items-center text-center">
                  {/* Node circle */}
                  <div className="relative w-24 h-24 mb-5">
                    <div className="absolute inset-0 rounded-full border-2 border-[var(--jd-red)]/30 group-hover:border-[var(--jd-red)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(234,88,12,0.3)]" />
                    <div className="absolute inset-[6px] rounded-full bg-[#FFF7ED] group-hover:bg-[var(--jd-red)]/10 transition-all duration-500 flex items-center justify-center">
                      <span className="text-[var(--jd-red)] text-2xl font-black group-hover:scale-125 transition-transform duration-300">{o.num}</span>
                    </div>
                    <div className="absolute -inset-2 rounded-full border border-[var(--jd-red)]/0 group-hover:border-[var(--jd-red)]/20 transition-all duration-500 scale-100 group-hover:scale-110" />
                  </div>
                  <h3 className="text-base font-bold text-[#1E293B] mb-2 group-hover:text-[var(--jd-red)] transition-colors duration-300">{o.title}</h3>
                  <p className="text-[#64748B] text-xs leading-relaxed max-w-[160px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden">{o.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications — scrolling strip of real certificate scans (CE / CPR · EN 442) */}
      <section className="py-12 lg:py-16 bg-[#FFF7ED] border-y border-[#F1E7DC] overflow-hidden">
        <div className="text-center mb-8 px-6">
          <p className="text-[var(--jd-red)] uppercase tracking-[0.25em] font-extrabold text-xs mb-2">{d.certs.kicker}</p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {["CE", "EN 442", "ISO 9001", "ISO 14001", "UKCA", `1.5× ${d.certs.pressure}`].map((c) => (
              <span key={c} className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-[#F1E7DC] text-[var(--jd-red)] font-black text-xs">{c}</span>
            ))}
          </div>
        </div>
        <CertMarquee
          viewAllLabel={d.certs.kicker}
          viewAllHref={`/${locale}/credentials`}
          certs={[
            { img: "/assets/certs/img/cpr-certificate-2693-0023-jdwy-ch-22y-1.jpg", pdf: "/assets/certs/cpr-certificate-2693-0023-jdwy-ch-22y.pdf", label: "CPR · EN 442 — JDWY-CH 22Y" },
            { img: "/assets/certs/img/cpr-certificate-2693-0019-jddh-d-5025-1.jpg", pdf: "/assets/certs/cpr-certificate-2693-0019-jddh-d-5025.pdf", label: "CPR · EN 442 — JDDH-D 5025" },
            { img: "/assets/certs/img/cpr-certificate-2693-0020-jddh-s-5025-1.jpg", pdf: "/assets/certs/cpr-certificate-2693-0020-jddh-s-5025.pdf", label: "CPR · EN 442 — JDDH-S 5025" },
            { img: "/assets/certs/img/cpr-certificate-2693-0021-jddh-d-7015-1.jpg", pdf: "/assets/certs/cpr-certificate-2693-0021-jddh-d-7015.pdf", label: "CPR · EN 442 — JDDH-D 7015" },
            { img: "/assets/certs/img/cpr-certificate-2693-0022-jddh-s-7015-1.jpg", pdf: "/assets/certs/cpr-certificate-2693-0022-jddh-s-7015.pdf", label: "CPR · EN 442 — JDDH-S 7015" },
            { img: "/assets/certs/img/cpr-certificate-2693-0024-jdwy-dhe-6015-1.jpg", pdf: "/assets/certs/cpr-certificate-2693-0024-jdwy-dhe-6015.pdf", label: "CPR · EN 442 — JDWY-DHE 6015" },
          ]}
        />
      </section>

      {/* Why Choose Jiuding — Bold numbered reasons */}
      <section className="relative py-28 px-6 lg:px-14 bg-white overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[var(--jd-red)]/5 rounded-full blur-[160px]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{d.whyChoose.kicker}</p>
            <h2 className="text-4xl lg:text-6xl font-black text-[#1E293B] leading-tight tracking-tight">{d.whyChoose.title}</h2>
          </div>
          <div className="space-y-0">
            {[
              { title: d.whyChoose.experience, desc: d.whyChoose.experienceDesc },
              { title: d.whyChoose.export, desc: d.whyChoose.exportDesc },
              { title: d.whyChoose.quality, desc: d.whyChoose.qualityDesc },
              { title: d.whyChoose.customization, desc: d.whyChoose.customizationDesc },
              { title: d.whyChoose.service, desc: d.whyChoose.serviceDesc },
            ].map((w, i) => (
              <div key={w.title} className="group flex items-center gap-6 lg:gap-10 py-6 border-b border-[#F1E7DC] hover:border-[var(--jd-red)]/30 transition-all duration-300 cursor-pointer hover:pl-4">
                <span className="text-5xl lg:text-7xl font-black text-[#1E293B]/[0.08] group-hover:text-[var(--jd-red)]/30 transition-colors duration-300 select-none w-[80px] lg:w-[120px] shrink-0 text-right">0{i + 1}</span>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-bold text-[#1E293B] group-hover:text-[var(--jd-red)] transition-colors duration-300">{w.title}</h3>
                  <p className="text-[#64748B]/70 text-sm mt-1 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 group-hover:text-[#64748B]">{w.desc}</p>
                </div>
                <span className="text-[#1E293B]/15 group-hover:text-[var(--jd-red)]/50 transition-colors duration-300 text-2xl shrink-0">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Map — global export presence */}
      <CustomerMap
        lang={locale}
        kicker={d.customerMap.kicker}
        title={d.customerMap.title}
        subtitle={d.customerMap.subtitle}
        countries={d.customerMap.countries}
      />

      {/* Contact CTA — signature orange block with white text */}
      <section className="py-24 px-6 lg:px-14 bg-[#FFF7ED]">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#F97316] via-[var(--jd-orange)] to-[var(--jd-orange-dark)] p-12 lg:p-20">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[120px]" />
          <div className="grid lg:grid-cols-[200px_1fr] gap-12 items-center relative z-10">
            <img src="/assets/logo.png" alt="Jiuding" className="w-full max-w-[200px] brightness-0 invert" />
            <div>
              <p className="text-white/80 uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{d.contact.kicker}</p>
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">{d.contact.title}</h2>
              <p className="text-white/80 leading-relaxed mt-4 mb-8">{d.contact.lead}</p>
              <div className="flex gap-4 flex-wrap">
                <Link href={`/${locale}/contact`} className="inline-flex h-14 items-center px-8 bg-white text-[var(--jd-orange)] font-extrabold rounded-sm hover:bg-orange-50 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]">{d.contact.email}</Link>
                <Link href={`/${locale}/contact`} className="inline-flex h-14 items-center px-8 border border-white/60 text-white font-extrabold rounded-sm hover:border-white hover:bg-white/10 transition-all">{d.contact.cta2}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
