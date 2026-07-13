import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { pageSeo } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { locales, languageAlternates } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";
import CertMarquee from "../CertMarquee";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const meta = pageSeo("credentials", lang);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/credentials`,
      languages: languageAlternates("/credentials"),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${lang}/credentials`,
    },
  };
}

// --- Inline stroke icons (server-rendered SVG, currentColor) ---
const iconBase = "w-6 h-6";
function ShieldIcon() {
  return (<svg className={iconBase} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>);
}
function MedalIcon() {
  return (<svg className={iconBase} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6"/><path d="M9 14.5L7 22l5-3 5 3-2-7.5"/></svg>);
}
function TrademarkIcon() {
  return (<svg className={iconBase} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 9h4M10 9v6M14 15V9l2 3 2-3v6"/></svg>);
}
function BeakerIcon() {
  return (<svg className={iconBase} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6M10 3v6l-5 9a2 2 0 001.8 3h10.4a2 2 0 001.8-3l-5-9V3"/><path d="M7.5 15h9"/></svg>);
}
function LeafIcon() {
  return (<svg className={iconBase} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 019 6c3-2 8-3 11-3 0 4-1 9-3 11a7 7 0 01-6 2"/><path d="M8 21c1-4 4-8 8-10"/></svg>);
}
function FlameIcon() {
  return (<svg className={iconBase} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3s5 4 5 9a5 5 0 01-10 0c0-1.5.7-2.8 1.5-3.5C9 10 9 12 10 12c0-2 1-4 2-5 0-1.3 0-3-1-4z"/></svg>);
}
function DocIcon() {
  return (<svg className={iconBase} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>);
}

function SectionHead({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="shrink-0 w-12 h-12 rounded-xl bg-[var(--jd-red)]/10 text-[var(--jd-red)] flex items-center justify-center">{icon}</span>
      <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}

const CE_CERTS = [
  { img: "/assets/certs/img/cpr-certificate-2693-0023-jdwy-ch-22y-1.jpg", pdf: "/assets/certs/cpr-certificate-2693-0023-jdwy-ch-22y.pdf", label: "CPR · EN 442 — JDWY-CH 22Y" },
  { img: "/assets/certs/img/cpr-certificate-2693-0019-jddh-d-5025-1.jpg", pdf: "/assets/certs/cpr-certificate-2693-0019-jddh-d-5025.pdf", label: "CPR · EN 442 — JDDH-D 5025" },
  { img: "/assets/certs/img/cpr-certificate-2693-0020-jddh-s-5025-1.jpg", pdf: "/assets/certs/cpr-certificate-2693-0020-jddh-s-5025.pdf", label: "CPR · EN 442 — JDDH-S 5025" },
  { img: "/assets/certs/img/cpr-certificate-2693-0021-jddh-d-7015-1.jpg", pdf: "/assets/certs/cpr-certificate-2693-0021-jddh-d-7015.pdf", label: "CPR · EN 442 — JDDH-D 7015" },
  { img: "/assets/certs/img/cpr-certificate-2693-0022-jddh-s-7015-1.jpg", pdf: "/assets/certs/cpr-certificate-2693-0022-jddh-s-7015.pdf", label: "CPR · EN 442 — JDDH-S 7015" },
  { img: "/assets/certs/img/cpr-certificate-2693-0024-jdwy-dhe-6015-1.jpg", pdf: "/assets/certs/cpr-certificate-2693-0024-jdwy-dhe-6015.pdf", label: "CPR · EN 442 — JDWY-DHE 6015" },
];

const TRADEMARK_IMAGES = [
  { src: "/assets/certs/trademark-jiuding.jpg", key: "tm1" as const },
  { src: "/assets/certs/trademark-sunshine.jpg", key: "tm2" as const },
  { src: "/assets/certs/trademark-montreal.jpg", key: "tm3" as const },
];

const TRUST_BADGES = ["CE", "EN 442", "ISO 9001", "ISO 14001", "UKCA", "REACH", "Fire A1"];

export default async function CredentialsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);
  const c = d.credentials;

  const trademarks = [c.tm1, c.tm2, c.tm3, c.tm4, c.tm5, c.tm6, c.tm7, c.tm8];
  const standards = [c.standard1, c.standard2, c.standard3, c.standard4, c.standard5];
  const tmImageLabel: Record<string, string> = { tm1: c.tm1, tm2: c.tm2, tm3: c.tm3 };
  const sceneTagline = (d.products && d.products.marketLine1) || c.intro;

  const stats = [
    { num: "42", label: c.patentsLabel, href: "#patents" },
    { num: "12", label: c.tmLabel, href: "#trademarks" },
    { num: d.stats.years, label: d.stats.yearsLabel, href: undefined },
    { num: d.stats.markets, label: d.stats.marketsLabel, href: undefined },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What certifications do Jiuding radiators hold?", acceptedAnswer: { "@type": "Answer", text: "Jiuding radiators are CE-certified under EN 442 (EU CPR 305/2011), tested by HEATEST s.r.o. (NB 2693). Both steel panel and column radiators are covered. UKCA compliance is validated by BSRIA (UK). Jiuding also holds ISO 9001 (quality management) and ISO 14001 (environmental management) certifications." } },
      { "@type": "Question", name: "How many patents does Jiuding hold?", acceptedAnswer: { "@type": "Answer", text: "Jiuding holds 42 national patents granted by CNIPA: 2 invention patents, 30 utility model patents, and 10 design patents covering radiator structures, manufacturing processes, and product designs." } },
      { "@type": "Question", name: "Does Jiuding have UKCA certification for the UK market?", acceptedAnswer: { "@type": "Answer", text: "Yes. Thermal performance has been validated by BSRIA (Building Services Research and Information Association, UK) with reports covering 7 multi-column radiator models." } },
      { "@type": "Question", name: "What testing standards do Jiuding radiators comply with?", acceptedAnswer: { "@type": "Answer", text: "Jiuding radiators comply with EN 442-1:2014, EN 442-2, EN 2808, ISO 2409:2013, and EU Regulation No 305/2011 (Construction Products Regulation)." } },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero — text + image */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-gray-50">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">{c.kicker}</p>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">{c.title}</h1>
            <p className="text-xl text-gray-500 leading-relaxed mt-7">{c.intro}</p>
            <div className="flex flex-wrap gap-2.5 mt-8">
              {TRUST_BADGES.map((b) => (
                <span key={b} className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-[var(--jd-red)] font-black text-xs shadow-sm">{b}</span>
              ))}
            </div>
          </div>
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(30,41,59,0.15)] ring-1 ring-black/5">
            <Image src="/assets/ai-images/article-certifications.png" alt={c.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
          </div>
        </div>
      </section>

      {/* Big-number stats band — bold color pop */}
      <section className="px-6 lg:px-14 py-14 lg:py-16 bg-gradient-to-br from-[var(--jd-red)] to-[#c2410c]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 max-w-6xl mx-auto">
          {stats.map((s, i) => {
            const inner = (
              <>
                <div className="text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">{s.num}</div>
                <div className="text-white/85 font-semibold mt-3 text-sm lg:text-base leading-snug">{s.label}</div>
              </>
            );
            return s.href ? (
              <a key={i} href={s.href} className="text-center transition-transform hover:-translate-y-1">{inner}</a>
            ) : (
              <div key={i} className="text-center">{inner}</div>
            );
          })}
        </div>
      </section>

      {/* CE Certifications + real certificate marquee */}
      <section id="ce" className="scroll-mt-24 py-20 lg:py-24 px-6 lg:px-14 bg-white">
        <SectionHead icon={<ShieldIcon />} title={c.ceTitle} />
        <p className="text-gray-600 text-lg max-w-3xl mb-12">{c.ceIntro}</p>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="border border-gray-200 p-8 rounded-lg">
            <div className="w-12 h-12 bg-[var(--jd-red)] text-white rounded-lg flex items-center justify-center font-bold text-lg mb-5">CE</div>
            <p className="text-gray-600 text-lg">{c.cePanel}</p>
          </div>
          <div className="border border-gray-200 p-8 rounded-lg">
            <div className="w-12 h-12 bg-[var(--jd-red)] text-white rounded-lg flex items-center justify-center font-bold text-lg mb-5">CE</div>
            <p className="text-gray-600 text-lg">{c.ceColumn}</p>
          </div>
        </div>
        <div className="rounded-2xl bg-[#FFF7ED] border border-[#F1E7DC] py-10 overflow-hidden">
          <CertMarquee certs={CE_CERTS} viewAllLabel={c.kicker} viewAllHref={`/${locale}/downloads`} />
        </div>
      </section>

      {/* Scene image band — certified quality in real projects */}
      <section className="relative h-[380px] lg:h-[460px] overflow-hidden">
        <Image src="/assets/ai-images/scene-hotel-lobby.png" alt={c.title} fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/85 via-[#0B1220]/55 to-transparent" />
        <div className="relative h-full flex items-center px-6 lg:px-14">
          <div className="max-w-xl">
            <p className="text-white/70 uppercase tracking-[0.25em] font-extrabold text-xs mb-4">{c.kicker}</p>
            <p className="text-white text-2xl lg:text-4xl font-bold leading-snug">{sceneTagline}</p>
          </div>
        </div>
      </section>

      {/* UKCA */}
      <section id="ukca" className="scroll-mt-24 py-20 lg:py-24 px-6 lg:px-14 bg-gray-50">
        <SectionHead icon={<BeakerIcon />} title={c.ukcaTitle} />
        <p className="text-gray-600 text-lg max-w-3xl mb-12">{c.ukcaIntro}</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-gray-200 bg-white p-8 rounded-lg">
            <span className="text-[var(--jd-red)] font-extrabold text-sm uppercase tracking-[0.2em] block mb-3">BSRIA</span>
            <p className="text-gray-600 text-lg">{c.ukcaReport1}</p>
          </div>
          <div className="border border-gray-200 bg-white p-8 rounded-lg">
            <span className="text-[var(--jd-red)] font-extrabold text-sm uppercase tracking-[0.2em] block mb-3">BSRIA</span>
            <p className="text-gray-600 text-lg">{c.ukcaReport2}</p>
          </div>
        </div>
      </section>

      {/* Patents */}
      <section id="patents" className="scroll-mt-24 py-20 lg:py-24 px-6 lg:px-14 bg-white">
        <SectionHead icon={<MedalIcon />} title={c.patentTitle} />
        <p className="text-gray-600 text-lg max-w-3xl mb-12">{c.patentIntro}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[c.patentDesign, c.patentUtility, c.patentPending, c.patentInvention].map((item, i) => (
            <div key={i} className="border border-gray-200 p-6 rounded-lg hover:border-[var(--jd-red)]/40 hover:shadow-[0_10px_30px_rgba(30,41,59,0.08)] transition-all">
              <div className="w-10 h-10 bg-gray-100 text-[var(--jd-red)] rounded-full flex items-center justify-center font-bold text-sm mb-4">{i + 1}</div>
              <p className="text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trademarks — real trademark image gallery + full list */}
      <section id="trademarks" className="scroll-mt-24 py-20 lg:py-24 px-6 lg:px-14 bg-gray-50">
        <SectionHead icon={<TrademarkIcon />} title={c.tmTitle} />
        <p className="text-gray-600 text-lg max-w-3xl mb-12">{c.tmIntro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {TRADEMARK_IMAGES.map((tm) => (
            <div key={tm.key} className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_8px_24px_rgba(30,41,59,0.06)]">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-50 mb-4">
                <Image src={tm.src} alt={tmImageLabel[tm.key]} fill className="object-contain p-3" sizes="(max-width: 640px) 100vw, 33vw" />
              </div>
              <p className="text-gray-700 text-sm font-medium leading-snug">{tmImageLabel[tm.key]}</p>
            </div>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trademarks.map((tm, i) => (
            <div key={i} className="bg-white border border-gray-200 p-6 rounded-lg">
              <span className="text-[var(--jd-red)] font-extrabold text-xs uppercase tracking-[0.15em] block mb-2">TM {i + 1}</span>
              <p className="text-gray-600 text-sm">{tm}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dark trust-badge band — high-contrast break */}
      <section className="py-16 lg:py-20 px-6 lg:px-14 bg-[#0B1220]">
        <p className="text-center text-white/50 uppercase tracking-[0.3em] font-extrabold text-xs mb-8">{c.kicker}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4 max-w-4xl mx-auto">
          {TRUST_BADGES.map((b) => (
            <span key={b} className="inline-flex items-center px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-white font-black text-base lg:text-lg backdrop-blur-sm">{b}</span>
          ))}
        </div>
      </section>

      {/* Compliance highlights — ISO / REACH / Fire as icon cards */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-white">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-xl p-8 hover:shadow-[0_12px_36px_rgba(30,41,59,0.08)] transition-shadow">
            <span className="w-12 h-12 rounded-xl bg-[var(--jd-red)]/10 text-[var(--jd-red)] flex items-center justify-center mb-5"><LeafIcon /></span>
            <h3 className="text-xl font-bold tracking-tight mb-3">{c.isoTitle}</h3>
            <p className="text-gray-600 leading-relaxed">{c.isoText}</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-8 hover:shadow-[0_12px_36px_rgba(30,41,59,0.08)] transition-shadow">
            <span className="w-12 h-12 rounded-xl bg-[var(--jd-red)]/10 text-[var(--jd-red)] flex items-center justify-center mb-5"><DocIcon /></span>
            <h3 className="text-xl font-bold tracking-tight mb-3">{c.reachTitle}</h3>
            <p className="text-gray-600 leading-relaxed">{c.reachText}</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-8 hover:shadow-[0_12px_36px_rgba(30,41,59,0.08)] transition-shadow">
            <span className="w-12 h-12 rounded-xl bg-[var(--jd-red)]/10 text-[var(--jd-red)] flex items-center justify-center mb-5"><FlameIcon /></span>
            <h3 className="text-xl font-bold tracking-tight mb-3">{c.fireClassTitle}</h3>
            <p className="text-gray-600 leading-relaxed">{c.fireClassText}</p>
          </div>
        </div>
      </section>

      {/* Testing Standards */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-gray-50">
        <SectionHead icon={<DocIcon />} title={c.standardsTitle} />
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl">
          {standards.map((std, i) => (
            <div key={i} className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-lg">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[var(--jd-red)]/10 text-[var(--jd-red)] font-bold flex items-center justify-center text-sm mt-0.5">{i + 1}</span>
              <p className="text-gray-600 text-lg">{std}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed background — legal narrative as reference panel */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-white">
        <div className="max-w-4xl border-l-4 border-[var(--jd-red)]/30 pl-6 lg:pl-10 space-y-10">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">{c.narrativeTitle}</h2>
            <p className="text-gray-500 leading-relaxed">{c.narrativeText}</p>
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">{c.ukConformityTitle}</h2>
            <p className="text-gray-500 leading-relaxed">{c.ukConformityText}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
