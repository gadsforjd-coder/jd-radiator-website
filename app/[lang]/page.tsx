import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { locales, languageAlternates } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import TechBreakdown from "./TechBreakdown";
import { VRTour } from "./VRTour";
import { vrTourUrl } from "@/lib/vr";

const metaByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: "Jiuding Radiator | Steel Radiator Manufacturer & OEM Partner",
    description:
      "CE/EN442-certified steel radiator manufacturer since 2002. Designer, column, panel radiators and heated towel rails. OEM/ODM for 80+ countries. Get a quote today.",
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

  return (
    <>
      {/* Hero — full-bleed photo with warm scrim behind the text only */}
      <section className="relative min-h-screen -mt-[96px] pt-[96px] flex items-center overflow-hidden bg-[#FFF7ED]">
        <Image
          src="/assets/ai-images/hero-banner.png"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Warm scrim concentrated on the left text column, fading to a clear photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#431407]/80 via-[#431407]/35 to-transparent" />
        {/* Blend the hero bottom into the light page instead of black */}
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#FFF7ED] to-transparent" />

        <div className="relative z-10 px-6 lg:px-14 w-full pb-40">
          <div className="animate-in max-w-3xl">
            <p className="text-orange-300 uppercase tracking-[0.3em] font-extrabold text-sm mb-6">{d.hero.kicker}</p>
            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight text-white [text-shadow:0_2px_24px_rgba(67,20,7,0.45)]">{d.hero.title}</h1>
            <p className="text-xl text-white/90 leading-relaxed mt-7 max-w-2xl [text-shadow:0_1px_12px_rgba(67,20,7,0.5)]">{d.hero.lead}</p>
            <div className="flex gap-4 mt-10 flex-wrap">
              <Link href={`/${locale}/products`} className="inline-flex h-14 items-center px-8 bg-[var(--jd-red)] text-white font-extrabold rounded-sm hover:bg-orange-700 transition-all hover:shadow-[0_0_30px_rgba(234,88,12,0.4)]">{d.hero.cta1}</Link>
              <Link href={`/${locale}/contact`} className="inline-flex h-14 items-center px-8 border border-white/60 bg-white/10 backdrop-blur-sm text-white font-extrabold rounded-sm hover:border-white hover:bg-white/20 transition-all">{d.hero.cta2}</Link>
            </div>
          </div>
        </div>

        {/* Stats strip at bottom — light bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-[#F1E7DC] bg-white/90 backdrop-blur-xl">
            {[
              { num: d.stats.years, label: d.stats.yearsLabel },
              { num: d.stats.markets, label: d.stats.marketsLabel },
              { num: d.stats.oem, label: d.stats.oemLabel },
              { num: d.stats.quality, label: d.stats.qualityLabel },
            ].map((s) => (
              <div key={s.num} className="py-7 px-9 border-r border-[#F1E7DC] last:border-r-0">
                <strong className="block text-3xl lg:text-4xl text-[var(--jd-red)] font-black mb-1">{s.num}</strong>
                <span className="text-[#64748B] text-sm">{s.label}</span>
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
            { title: d.products.designer, desc: d.products.designerDesc, slug: "jd25y", img: "/assets/ai-images/category-designer.png", num: "01", featured: true },
            { title: d.products.steel, desc: d.products.steelDesc, slug: "jdgz2", img: "/assets/ai-images/category-column.png", num: "02", featured: false },
            { title: d.products.towel, desc: d.products.towelDesc, slug: "jd30slf", img: "/assets/ai-images/category-towel.png", num: "03", featured: false },
            { title: d.products.oem, desc: d.products.oemDesc, slug: "jd-22k", img: "/assets/ai-images/category-panel.png", num: "04", featured: false },
          ].map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/products/${p.slug}`}
              className={`group relative flex flex-col overflow-hidden rounded-lg bg-white border border-[#F1E7DC] shadow-[0_4px_16px_rgba(30,41,59,0.05)] product-card-hover transition-all duration-500 ${p.featured ? "ring-1 ring-[var(--jd-red)]/40 shadow-[0_0_30px_rgba(234,88,12,0.15)]" : ""}`}
            >
              <div className="relative h-[260px] overflow-hidden">
                <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                <span className="absolute top-4 left-5 text-white font-black text-3xl opacity-80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">{p.num}</span>
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
        stats={[
          { value: d.stats.years, label: d.stats.yearsLabel },
          { value: d.stats.markets, label: d.stats.marketsLabel },
          { value: "ISO 9001", label: d.stats.qualityLabel },
          { value: "24/7", label: "Global Support" },
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
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-stretch">
          {/* Factory photos in white frames */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-[#F1E7DC] rounded-xl shadow-[0_8px_30px_rgba(30,41,59,0.08)] p-3 flex-1">
              <div className="relative h-[320px] lg:h-full lg:min-h-[340px] rounded-lg overflow-hidden">
                <Image
                  src="/assets/ai-images/hero-manufacturing.png"
                  alt="Jiuding factory — automated production line"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </div>
            <div className="bg-white border border-[#F1E7DC] rounded-xl shadow-[0_8px_30px_rgba(30,41,59,0.08)] p-3">
              <div className="relative h-[200px] rounded-lg overflow-hidden">
                <Image
                  src="/assets/ai-images/about-quality-testing.png"
                  alt="Jiuding quality testing"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </div>
          </div>
          {/* Process steps */}
          <div className="grid grid-cols-2 gap-4 content-stretch">
            {[d.manufacturing.welding, d.manufacturing.surface, d.manufacturing.inspection, d.manufacturing.packaging].map((m, i) => (
              <div key={i} className="bg-[#FFF7ED] border border-[#F1E7DC] rounded-xl p-8 lg:p-10 flex flex-col justify-between hover:border-[var(--jd-red)]/40 hover:shadow-[0_8px_24px_rgba(234,88,12,0.1)] transition-all duration-300">
                <b className="text-[var(--jd-red)] block mb-6 text-lg font-black">0{i + 1}</b>
                <span className="text-[#1E293B] text-xl lg:text-2xl font-semibold">{m}</span>
              </div>
            ))}
          </div>
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

      {/* Certifications — Badge showcase with glowing rings */}
      <section className="py-28 px-6 lg:px-14 bg-[#FFF7ED] overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{d.certs.kicker}</p>
          <h2 className="text-4xl lg:text-6xl font-black text-[#1E293B] leading-tight tracking-tight">{d.certs.title}</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16 max-w-5xl mx-auto">
          {[
            { title: d.certs.ce, desc: d.certs.ceDesc, icon: "CE", color: "from-orange-500/20 to-amber-500/10" },
            { title: d.certs.en442, desc: d.certs.en442Desc, icon: "EN 442", color: "from-orange-600/20 to-orange-400/10" },
            { title: d.certs.iso, desc: d.certs.isoDesc, icon: "ISO", color: "from-amber-500/20 to-orange-500/10" },
            { title: d.certs.pressure, desc: d.certs.pressureDesc, icon: "1.5×", color: "from-orange-400/20 to-amber-600/10" },
          ].map((c) => (
            <div key={c.icon} className="group flex flex-col items-center text-center w-[180px]">
              <div className="relative w-32 h-32 mb-6">
                {/* Outer spinning ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--jd-red)]/20 group-hover:border-[var(--jd-red)]/50 animate-spin-slow transition-colors duration-500" />
                {/* Inner ring */}
                <div className="absolute inset-2 rounded-full border border-[#F1E7DC] group-hover:border-[var(--jd-red)]/40 transition-all duration-500" />
                {/* Glow background */}
                <div className={`absolute inset-3 rounded-full bg-gradient-radial ${c.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                {/* Badge content */}
                <div className="absolute inset-3 rounded-full bg-white shadow-[0_4px_16px_rgba(30,41,59,0.06)] flex items-center justify-center group-hover:shadow-[0_0_40px_rgba(234,88,12,0.2)]">
                  <span className="text-[var(--jd-red)] text-2xl font-black tracking-tight">{c.icon}</span>
                </div>
              </div>
              <h3 className="text-base font-bold text-[#1E293B] mb-2 group-hover:text-[var(--jd-red)] transition-colors">{c.title}</h3>
              <p className="text-[#64748B] text-xs leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
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
