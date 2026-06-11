import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { locales, languageAlternates } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "FAQ — Jiuding Radiator | Certifications, OEM, Export & More",
    description:
      "Frequently asked questions about Jiuding radiators: certifications, production capacity, OEM/ODM services, MOQ, export markets, lead times, and distributor partnerships.",
    alternates: {
      canonical: `${BASE_URL}/${lang}/faq`,
      languages: languageAlternates("/faq"),
    },
    openGraph: {
      title: "FAQ — Jiuding Radiator",
      description: "Answers to common questions about Jiuding radiators: certifications, OEM services, production capacity, and global export.",
      url: `${BASE_URL}/${lang}/faq`,
    },
  };
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);

  const faqs = [
    { q: d.faq.q1, a: d.faq.a1 },
    { q: d.faq.q2, a: d.faq.a2 },
    { q: d.faq.q3, a: d.faq.a3 },
    { q: d.faq.q4, a: d.faq.a4 },
    { q: d.faq.q5, a: d.faq.a5 },
    { q: d.faq.q6, a: d.faq.a6 },
    { q: d.faq.q7, a: d.faq.a7 },
    { q: d.faq.q8, a: d.faq.a8 },
    { q: d.faq.q9, a: d.faq.a9 },
    { q: d.faq.q10, a: d.faq.a10 },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="py-24 px-6 lg:px-14 bg-gray-50">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">{d.faq.kicker}</p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl">{d.faq.title}</h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7 max-w-3xl">{d.faq.intro}</p>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 px-6 lg:px-14 bg-white">
        <div className="max-w-3xl mx-auto">
          {faqs.map((item, i) => (
            <details key={i} className="group border-b border-gray-200">
              <summary className="flex items-center justify-between cursor-pointer py-6 text-lg font-bold text-gray-900 hover:text-[var(--jd-red)] transition-colors list-none [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span className="ml-4 text-2xl text-gray-400 group-open:rotate-45 transition-transform select-none">+</span>
              </summary>
              <div className="pb-6 pr-10">
                <p className="text-gray-600 text-lg leading-relaxed">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
