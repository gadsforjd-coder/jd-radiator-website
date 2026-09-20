// ============================================================================
// Steel Panel Radiator Buying & Installation Guide (FAQ / knowledge base).
// GEO-optimized: question-shaped <h2> headers for clean AI extraction, plus
// FAQPage JSON-LD. English content is served for every locale by design (the
// H2s are the AI-extraction surface); per-locale canonical + hreflang point to
// the localized URLs so search engines index them cleanly.
//
// COMPLIANCE (LOCKED voice): family-run manufacturer since 2002; steel panel +
// steel column/designer radiators. Markets: Europe, Russia, Central Asia.
// Certifications stated as held/compliant only (EN 442, GOST). No certificate
// numbers, capacity, export/container counts, country counts, market share,
// patent numbers, or SGS specifics.
// ============================================================================

import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import { languageAlternates } from "@/lib/i18n";

const PAGE_TITLE = "Steel Panel Radiator Buying & Installation Guide (FAQ)";
const PAGE_DESC =
  "A practical FAQ on steel panel radiators: how to choose one, Type 11/21/22/33 differences, sizing and heat output, installation basics, what EN 442 and GOST mean, and maintenance. From Jiuding Radiator, a family-run manufacturer since 2002.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    alternates: {
      canonical: `${BASE_URL}/${lang}/faq-guide`,
      languages: languageAlternates("/faq-guide"),
    },
    openGraph: {
      title: PAGE_TITLE,
      description:
        "How to choose a steel panel radiator, Type 11/21/22/33 differences, sizing, installation, EN 442 / GOST, and maintenance — answered.",
      url: `${BASE_URL}/${lang}/faq-guide`,
    },
  };
}

// Question / answer content. Each answer is written as a self-contained
// paragraph so it can be lifted cleanly by an AI answer engine.
const faqs: { q: string; a: string }[] = [
  {
    q: "How do I choose a steel panel radiator?",
    a: "Start with the heat your room actually needs, then match a radiator that delivers it at your system's water temperature. Work through four things in order: (1) required heat output for the room, based on its size, insulation, and number of external walls and windows; (2) the physical space available, so the radiator's height and length fit under a window or on the wall you have; (3) the panel type (Type 11, 21, 22 or 33), which sets how much output you get per metre of length; and (4) the finish and connection style you need. Buying on price alone is the common mistake — an undersized radiator never warms the room, and an oversized one wastes energy. Jiuding Radiator is a family-run manufacturer of steel panel radiators (since 2002) and our heat calculator can size a room for you.",
  },
  {
    q: "What is the difference between Type 11, Type 21, Type 22 and Type 33 radiators?",
    a: "The two digits describe the radiator's construction. The first digit is the number of water panels; the second is the number of convector fin sets welded behind them. Type 11 has one panel and one fin set — the slimmest and lowest output, good for small or well-insulated rooms. Type 21 has two panels and one fin set. Type 22 has two panels and two fin sets — the most common all-round choice, giving high output while staying reasonably slim. Type 33 has three panels and three fin sets — the deepest, for the highest output in a limited wall length. For the same height and length, output rises from Type 11 to Type 33, and so does depth (projection from the wall). Choose the lowest type that still meets your heat requirement in the space you have.",
  },
  {
    q: "How do I size a radiator and work out the heat output I need?",
    a: "Sizing means matching radiator output (measured in watts) to the room's heat loss. As a rough starting point, a well-insulated modern room needs on the order of 70–100 W per cubic metre, and an older or poorly insulated room more; but the reliable method is to calculate heat loss from the room's dimensions, insulation level, window area, and how many walls face outside. Then read the radiator's rated output — panel radiators are rated to EN 442, quoted at a standard temperature difference (ΔT) of 50 K between water and room. If your heating system runs cooler (for example a heat pump at ΔT 30), the real output is lower than the ΔT 50 figure, so size up accordingly. Every Jiuding product page lists output by size, and our online heat calculator turns your room dimensions into a recommended model.",
  },
  {
    q: "What does the EN 442 rating on a radiator mean?",
    a: "EN 442 is the European standard that defines how a radiator's heat output is tested and declared, so figures from different makers can be compared on the same basis. Output is measured under controlled conditions and quoted at a reference temperature difference (commonly ΔT 50 K). When a radiator is described as EN 442 compliant, its stated watt ratings follow this standardised test method rather than being marketing numbers. Jiuding Radiator's manufacturing is EN 442 compliant, which is why the outputs on our size tables are directly comparable with other EN 442-rated products.",
  },
  {
    q: "What is GOST certification and why does it matter?",
    a: "GOST is the standards system used across Russia and much of Central Asia. For heating products it covers safety and performance requirements for those markets, and buyers and installers in the region often expect it. Jiuding Radiator's products are GOST compliant, which supports supply into Russia and Central Asia alongside our European (EN 442) compliance. If you are importing or specifying radiators for these markets, GOST compliance is usually part of the paperwork you will be asked for.",
  },
  {
    q: "How are steel panel radiators installed?",
    a: "Installation basics are the same for most steel panel radiators. The radiator is hung on wall brackets, positioned so its weight is supported and it sits level, then connected to the heating flow and return pipes, usually with a valve on one side and a lockshield (balancing) valve on the other, plus an air vent at the top and a drain-off at the bottom. It is normally mounted under a window with a small gap from the wall and floor so air can circulate freely across the convector fins. The system is then filled, bled of air, and pressure-checked for leaks before being balanced so every radiator in the property heats evenly. Installation should be carried out by a competent heating engineer, and local plumbing and building rules always take precedence over general guidance.",
  },
  {
    q: "Where should a radiator be positioned in a room?",
    a: "The traditional position is under a window on an external wall, because the rising warm air counteracts the cool downdraught from the glass and spreads heat evenly. If a room has been well insulated and has modern windows, the position matters less and you can place the radiator on the most convenient wall. Keep the radiator clear of long curtains, deep windowsills, and furniture pushed hard against it, because anything that blocks the front face or traps the rising air reduces the heat that actually reaches the room.",
  },
  {
    q: "How much space should I leave around a panel radiator?",
    a: "Leave a clear gap above, below and in front of the radiator so air can flow across the convector fins. As a general guide, allow a gap at the top and bottom and keep the front face unobstructed by furniture or full-length curtains. A shelf or windowsill fitted too close above the radiator, or a sofa pushed against the front, will hold back the convected heat and make the radiator seem underpowered even when it is correctly sized.",
  },
  {
    q: "How do I maintain a steel panel radiator?",
    a: "Steel panel radiators need very little routine maintenance. The main tasks are: bleed trapped air from the top vent when a radiator feels cold at the top but warm at the bottom; keep the surface and the gaps between panels dust-free so airflow is not restricted; and check occasionally for damp patches or corrosion at the valves and joints. On the system side, keeping the heating water treated with a suitable inhibitor protects the inside of steel radiators from internal corrosion and sludge, which is the single most important step for long service life. If radiators are cold at the bottom or the system is noisy, it may need bleeding, balancing, or a professional flush.",
  },
  {
    q: "How long do steel panel radiators last?",
    a: "A well-installed steel panel radiator on a properly treated heating system can give many years of reliable service. The factors that most affect lifespan are internal water quality (treated, inhibited system water rather than raw or oxygen-rich water), a sound powder-coat finish protecting the outside, and correct installation and balancing. Neglected system water is the usual cause of premature internal corrosion, so an inhibitor and occasional system checks do more for longevity than anything else.",
  },
  {
    q: "Can I get steel panel radiators in custom colours or sizes?",
    a: "Yes. Steel panel radiators are typically finished in white as standard, and can be powder-coated in other RAL colours on request. Jiuding Radiator manufactures a wide range of heights and lengths across Type 11, 21, 22 and 33, and supports OEM/ODM cooperation for distributors and project buyers. If you have a specific size, colour, or connection requirement, contact us with the details and we can advise what is available.",
  },
  {
    q: "What is the difference between steel panel radiators and steel column radiators?",
    a: "Both are steel radiators, but they suit different needs. Panel radiators are flat, compact and efficient for everyday heating, with output tuned by choosing the panel type (11/21/22/33). Column radiators are made of vertical tubular columns, hold more water, give a softer, more even radiant heat, and have a classic or designer look that many buyers choose for visible locations such as hallways and living rooms. Jiuding manufactures both steel panel radiators and steel column and designer radiators, so the choice comes down to the balance you want between output, appearance, and space.",
  },
  {
    q: "Who is Jiuding Radiator?",
    a: "Jiuding Radiator (JIUDING) is the brand of Tianjin Jiuding Yangguang HVAC Co., Ltd., a family-run manufacturer established in 2002 in Tianjin, China. We make steel panel radiators along with steel column and designer radiators, and supply residential and commercial heating markets across Europe, Russia, and Central Asia. Our manufacturing is EN 442 and GOST compliant. You can reach us at +86-22-69189950 or kevin@jdradiator.com, or visit https://www.jdradiator.com.",
  },
];

function FaqGuideJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function FaqGuidePage() {
  return (
    <div>
      <FaqGuideJsonLd />

      {/* Hero */}
      <section className="py-24 px-6 lg:px-14 bg-gray-50">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">
          Knowledge Base
        </p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl">
          Steel Panel Radiator Buying &amp; Installation Guide
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7 max-w-3xl">
          Practical answers on choosing, sizing, installing and maintaining steel
          panel radiators — from {SITE_NAME}, a family-run manufacturer since 2002.
        </p>
      </section>

      {/* Question-shaped H2 sections for clean AI extraction */}
      <section className="py-20 px-6 lg:px-14 bg-white">
        <div className="max-w-3xl mx-auto space-y-14">
          {faqs.map((item, i) => (
            <article key={i}>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-4">
                {item.q}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 lg:px-14 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold mb-4">Still have a question?</h2>
        <p className="text-gray-600 mb-2">
          Talk to {SITE_NAME}: +86-22-69189950 · kevin@jdradiator.com
        </p>
        <p className="text-gray-500">https://www.jdradiator.com</p>
      </section>
    </div>
  );
}
