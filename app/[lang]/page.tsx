import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";
import TechBreakdown from "./TechBreakdown";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);

  return (
    <>
      {/* Hero — full-bleed dark */}
      <section className="relative min-h-screen -mt-[96px] pt-[96px] flex items-center overflow-hidden bg-black">
        <Image
          src="/assets/ai-images/hero-banner.png"
          alt=""
          fill
          className="object-cover opacity-35"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--jd-dark)] to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--jd-red)]/8 rounded-full blur-[140px]" />

        <div className="relative z-10 px-6 lg:px-14 w-full pb-40">
          <div className="animate-in max-w-3xl">
            <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-6">{d.hero.kicker}</p>
            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight text-white">{d.hero.title}</h1>
            <p className="text-xl text-white/55 leading-relaxed mt-7 max-w-2xl">{d.hero.lead}</p>
            <div className="flex gap-4 mt-10 flex-wrap">
              <Link href={`/${locale}/products`} className="inline-flex h-14 items-center px-8 bg-[var(--jd-red)] text-white font-extrabold rounded-sm hover:bg-red-700 transition-all hover:shadow-[0_0_30px_rgba(230,0,18,0.4)]">{d.hero.cta1}</Link>
              <Link href={`/${locale}/contact`} className="inline-flex h-14 items-center px-8 border border-white/25 text-white font-extrabold rounded-sm hover:border-white/50 transition-all">{d.hero.cta2}</Link>
            </div>
          </div>
        </div>

        {/* Stats strip at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10 bg-black/50 backdrop-blur-xl">
            {[
              { num: d.stats.years, label: d.stats.yearsLabel },
              { num: d.stats.markets, label: d.stats.marketsLabel },
              { num: d.stats.oem, label: d.stats.oemLabel },
              { num: d.stats.quality, label: d.stats.qualityLabel },
            ].map((s) => (
              <div key={s.num} className="py-7 px-9 border-r border-white/10 last:border-r-0">
                <strong className="block text-3xl lg:text-4xl text-[var(--jd-red)] font-black mb-1">{s.num}</strong>
                <span className="text-white/45 text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products — with numbering, hover glow, featured card */}
      <section className="bg-[var(--jd-dark)] text-white py-24 px-6 lg:px-14">
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
              className={`group relative min-h-[420px] overflow-hidden rounded-sm product-card-hover transition-all duration-500 ${p.featured ? "ring-1 ring-[var(--jd-red)]/40 shadow-[0_0_30px_rgba(230,0,18,0.15)]" : ""}`}
            >
              <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute top-5 left-6">
                <span className="text-[var(--jd-red)] font-black text-3xl opacity-40">{p.num}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-[var(--jd-orange)] transition-colors">{p.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
              </div>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--jd-red)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <Link href={`/${locale}/products`} className="inline-flex h-14 items-center px-8 bg-[var(--jd-red)] text-white font-extrabold rounded-sm hover:bg-red-700 transition-all hover:shadow-[0_0_30px_rgba(230,0,18,0.4)]">{d.products.viewAll}</Link>
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
      <section className="bg-[var(--jd-dark)] text-white py-24 px-6 lg:px-14">
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
            <Link key={a.title} href={`/${locale}/cases`} className="relative rounded-lg overflow-hidden group h-[240px] block">
              <Image
                src={a.img}
                alt={a.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:from-[var(--jd-red)]/80 group-hover:via-black/60 transition-all duration-500" />
              <div className="absolute inset-0 ring-1 ring-white/[0.06] rounded-lg group-hover:ring-[var(--jd-red)]/40 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="text-xl font-bold text-white mb-1.5">{a.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">{a.desc}</p>
              </div>
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white/80 text-sm font-medium bg-[var(--jd-red)]/80 px-3 py-1 rounded-full">View Gallery →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Manufacturing — full-width factory background */}
      <section className="relative min-h-[620px] flex items-end overflow-hidden">
        <Image
          src="/assets/ai-images/hero-manufacturing.png"
          alt="Jiuding factory"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

        <div className="relative z-10 w-full px-6 lg:px-14 pb-16 pt-40">
          <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{d.manufacturing.kicker}</p>
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-12">{d.manufacturing.title}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[d.manufacturing.welding, d.manufacturing.surface, d.manufacturing.inspection, d.manufacturing.packaging].map((m, i) => (
              <div key={i} className="glass-card p-8 lg:p-10 rounded-sm">
                <b className="text-[var(--jd-red)] block mb-6 text-lg font-black">0{i + 1}</b>
                <span className="text-white text-xl lg:text-2xl font-semibold">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OEM/ODM Support — Interactive process flow */}
      <section className="relative py-28 px-6 lg:px-14 bg-black overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--jd-orange)]/5 rounded-full blur-[160px]" />
        <div className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{d.oemSupport.kicker}</p>
            <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight">{d.oemSupport.title}</h2>
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
                    <div className="absolute inset-0 rounded-full border-2 border-[var(--jd-red)]/30 group-hover:border-[var(--jd-red)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(230,0,18,0.3)]" />
                    <div className="absolute inset-[6px] rounded-full bg-[var(--jd-dark)] group-hover:bg-[var(--jd-red)]/10 transition-all duration-500 flex items-center justify-center">
                      <span className="text-[var(--jd-red)] text-2xl font-black group-hover:scale-125 transition-transform duration-300">{o.num}</span>
                    </div>
                    <div className="absolute -inset-2 rounded-full border border-[var(--jd-red)]/0 group-hover:border-[var(--jd-red)]/20 transition-all duration-500 scale-100 group-hover:scale-110" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[var(--jd-red)] transition-colors duration-300">{o.title}</h3>
                  <p className="text-white/35 text-xs leading-relaxed max-w-[160px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden">{o.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications — Badge showcase with glowing rings */}
      <section className="py-28 px-6 lg:px-14 bg-[var(--jd-dark)] overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{d.certs.kicker}</p>
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight">{d.certs.title}</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16 max-w-5xl mx-auto">
          {[
            { title: d.certs.ce, desc: d.certs.ceDesc, icon: "CE", color: "from-red-500/20 to-orange-500/10" },
            { title: d.certs.en442, desc: d.certs.en442Desc, icon: "EN 442", color: "from-red-600/20 to-red-400/10" },
            { title: d.certs.iso, desc: d.certs.isoDesc, icon: "ISO", color: "from-orange-500/20 to-red-500/10" },
            { title: d.certs.pressure, desc: d.certs.pressureDesc, icon: "1.5×", color: "from-red-400/20 to-orange-600/10" },
          ].map((c) => (
            <div key={c.icon} className="group flex flex-col items-center text-center w-[180px]">
              <div className="relative w-32 h-32 mb-6">
                {/* Outer spinning ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--jd-red)]/20 group-hover:border-[var(--jd-red)]/50 animate-spin-slow transition-colors duration-500" />
                {/* Inner ring */}
                <div className="absolute inset-2 rounded-full border border-white/10 group-hover:border-[var(--jd-red)]/40 transition-all duration-500" />
                {/* Glow background */}
                <div className={`absolute inset-3 rounded-full bg-gradient-radial ${c.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                {/* Badge content */}
                <div className="absolute inset-3 rounded-full bg-[var(--jd-dark)] flex items-center justify-center group-hover:shadow-[0_0_40px_rgba(230,0,18,0.15)]">
                  <span className="text-[var(--jd-red)] text-2xl font-black tracking-tight">{c.icon}</span>
                </div>
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-[var(--jd-red)] transition-colors">{c.title}</h3>
              <p className="text-white/35 text-xs leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Jiuding — Bold numbered reasons */}
      <section className="relative py-28 px-6 lg:px-14 bg-black overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[var(--jd-red)]/5 rounded-full blur-[160px]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{d.whyChoose.kicker}</p>
            <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight">{d.whyChoose.title}</h2>
          </div>
          <div className="space-y-0">
            {[
              { title: d.whyChoose.experience, desc: d.whyChoose.experienceDesc },
              { title: d.whyChoose.export, desc: d.whyChoose.exportDesc },
              { title: d.whyChoose.quality, desc: d.whyChoose.qualityDesc },
              { title: d.whyChoose.customization, desc: d.whyChoose.customizationDesc },
              { title: d.whyChoose.service, desc: d.whyChoose.serviceDesc },
            ].map((w, i) => (
              <div key={w.title} className="group flex items-center gap-6 lg:gap-10 py-6 border-b border-white/[0.06] hover:border-[var(--jd-red)]/30 transition-all duration-300 cursor-pointer hover:pl-4">
                <span className="text-5xl lg:text-7xl font-black text-white/[0.06] group-hover:text-[var(--jd-red)]/30 transition-colors duration-300 select-none w-[80px] lg:w-[120px] shrink-0 text-right">0{i + 1}</span>
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-[var(--jd-red)] transition-colors duration-300">{w.title}</h3>
                  <p className="text-white/30 text-sm mt-1 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 group-hover:text-white/50">{w.desc}</p>
                </div>
                <span className="text-white/10 group-hover:text-[var(--jd-red)]/50 transition-colors duration-300 text-2xl shrink-0">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA — enhanced with dual buttons */}
      <section className="py-24 px-6 lg:px-14 bg-[var(--jd-dark)]">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#1a0000] via-[var(--jd-dark)] to-[#1a0000] p-12 lg:p-20">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--jd-red)]/8 rounded-full blur-[120px]" />
          <div className="grid lg:grid-cols-[200px_1fr] gap-12 items-center relative z-10">
            <img src="/assets/logo.png" alt="Jiuding" className="w-full max-w-[200px]" />
            <div>
              <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{d.contact.kicker}</p>
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">{d.contact.title}</h2>
              <p className="text-white/45 leading-relaxed mt-4 mb-8">{d.contact.lead}</p>
              <div className="flex gap-4 flex-wrap">
                <Link href={`/${locale}/contact`} className="inline-flex h-14 items-center px-8 bg-[var(--jd-red)] text-white font-extrabold rounded-sm hover:bg-red-700 transition-all hover:shadow-[0_0_30px_rgba(230,0,18,0.4)]">{d.contact.email}</Link>
                <Link href={`/${locale}/contact`} className="inline-flex h-14 items-center px-8 border border-white/25 text-white font-extrabold rounded-sm hover:border-white/50 transition-all">{d.contact.cta2}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
