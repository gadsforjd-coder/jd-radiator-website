import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Credentials — CE, UKCA, Patents & Trademarks | Jiuding Radiator",
    description:
      "Jiuding radiators hold CE EN 442, UKCA (BSRIA-tested) certifications, 42 national patents, and 12 registered trademarks. Verified quality credentials for global partners.",
    alternates: {
      canonical: `${BASE_URL}/${lang}/credentials`,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/credentials`])),
    },
    openGraph: {
      title: "Credentials — CE, UKCA, Patents & Trademarks | Jiuding Radiator",
      description: "CE EN 442, UKCA BSRIA-tested certifications, 42 national patents, 12 registered trademarks. Verified quality from Tianjin Jiuding.",
      url: `${BASE_URL}/${lang}/credentials`,
    },
  };
}

export default async function CredentialsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);

  const trademarks = [
    d.credentials.tm1,
    d.credentials.tm2,
    d.credentials.tm3,
    d.credentials.tm4,
    d.credentials.tm5,
    d.credentials.tm6,
    d.credentials.tm7,
    d.credentials.tm8,
  ];

  const standards = [
    d.credentials.standard1,
    d.credentials.standard2,
    d.credentials.standard3,
    d.credentials.standard4,
    d.credentials.standard5,
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What certifications do Jiuding radiators hold?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jiuding radiators are CE-certified under EN 442 (EU CPR 305/2011), tested by HEATEST s.r.o. (NB 2693). Both steel panel and column radiators are covered. UKCA compliance is validated by BSRIA (UK).",
        },
      },
      {
        "@type": "Question",
        name: "How many patents does Jiuding hold?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jiuding holds 42 national patents granted by CNIPA: 2 invention patents, 30 utility model patents, and 10 design patents covering radiator structures, manufacturing processes, and product designs.",
        },
      },
      {
        "@type": "Question",
        name: "Does Jiuding have UKCA certification for the UK market?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Thermal performance has been validated by BSRIA (Building Services Research and Information Association, UK) with reports covering 7 multi-column radiator models.",
        },
      },
      {
        "@type": "Question",
        name: "What testing standards do Jiuding radiators comply with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Jiuding radiators comply with EN 442-1:2014, EN 442-2, EN 2808, ISO 2409:2013, and EU Regulation No 305/2011 (Construction Products Regulation).",
        },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="py-24 px-6 lg:px-14 bg-gray-50">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">{d.credentials.kicker}</p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl">{d.credentials.title}</h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7 max-w-3xl">{d.credentials.intro}</p>
      </section>

      {/* CE Certifications */}
      <section className="py-24 px-6 lg:px-14 bg-white">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">{d.credentials.ceTitle}</h2>
        <p className="text-gray-600 text-lg max-w-3xl mb-12">{d.credentials.ceIntro}</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-gray-200 p-8 rounded-lg">
            <div className="w-12 h-12 bg-[var(--jd-red)] text-white rounded-lg flex items-center justify-center font-bold text-lg mb-5">CE</div>
            <p className="text-gray-600 text-lg">{d.credentials.cePanel}</p>
          </div>
          <div className="border border-gray-200 p-8 rounded-lg">
            <div className="w-12 h-12 bg-[var(--jd-red)] text-white rounded-lg flex items-center justify-center font-bold text-lg mb-5">CE</div>
            <p className="text-gray-600 text-lg">{d.credentials.ceColumn}</p>
          </div>
        </div>
      </section>

      {/* UKCA */}
      <section className="py-24 px-6 lg:px-14 bg-gray-50">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">{d.credentials.ukcaTitle}</h2>
        <p className="text-gray-600 text-lg max-w-3xl mb-12">{d.credentials.ukcaIntro}</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-gray-200 bg-white p-8 rounded-lg">
            <span className="text-[var(--jd-red)] font-extrabold text-sm uppercase tracking-[0.2em] block mb-3">BSRIA</span>
            <p className="text-gray-600 text-lg">{d.credentials.ukcaReport1}</p>
          </div>
          <div className="border border-gray-200 bg-white p-8 rounded-lg">
            <span className="text-[var(--jd-red)] font-extrabold text-sm uppercase tracking-[0.2em] block mb-3">BSRIA</span>
            <p className="text-gray-600 text-lg">{d.credentials.ukcaReport2}</p>
          </div>
        </div>
      </section>

      {/* Patents */}
      <section className="py-24 px-6 lg:px-14 bg-white">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">{d.credentials.patentTitle}</h2>
        <p className="text-gray-600 text-lg max-w-3xl mb-12">{d.credentials.patentIntro}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[d.credentials.patentDesign, d.credentials.patentUtility, d.credentials.patentPending, d.credentials.patentInvention].map((item, i) => (
            <div key={i} className="border border-gray-200 p-6 rounded-lg">
              <div className="w-10 h-10 bg-gray-100 text-[var(--jd-red)] rounded-full flex items-center justify-center font-bold text-sm mb-4">{i + 1}</div>
              <p className="text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trademarks */}
      <section className="py-24 px-6 lg:px-14 bg-gray-50">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">{d.credentials.tmTitle}</h2>
        <p className="text-gray-600 text-lg max-w-3xl mb-12">{d.credentials.tmIntro}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trademarks.map((tm, i) => (
            <div key={i} className="bg-white border border-gray-200 p-6 rounded-lg">
              <span className="text-[var(--jd-red)] font-extrabold text-xs uppercase tracking-[0.15em] block mb-2">TM {i + 1}</span>
              <p className="text-gray-600 text-sm">{tm}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testing Standards */}
      <section className="py-24 px-6 lg:px-14 bg-white">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">{d.credentials.standardsTitle}</h2>
        <div className="max-w-3xl space-y-4">
          {standards.map((std, i) => (
            <div key={i} className="flex items-start gap-4 p-5 border border-gray-200 rounded-lg">
              <span className="text-[var(--jd-red)] font-bold text-lg mt-0.5">{i + 1}</span>
              <p className="text-gray-600 text-lg">{std}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
