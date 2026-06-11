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
    title: "About Jiuding — Engineering Warmth Since 2002",
    description:
      "Founded in 2002 in Tianjin, China. 45,000㎡ factory, 4 million sections/year, 42 patents, CE/EN442/UKCA certified. Trusted OEM partner for radiator distributors in 80+ countries.",
    alternates: {
      canonical: `${BASE_URL}/${lang}/about`,
      languages: languageAlternates("/about"),
    },
    openGraph: {
      title: "About Jiuding Radiator — Factory & History",
      description: "45,000㎡ factory, 4 million sections/year, CE/EN442/UKCA certified. OEM radiator manufacturing since 2002.",
      url: `${BASE_URL}/${lang}/about`,
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);

  const milestones = [
    { year: "2002", text: d.about.h2002 },
    { year: "2005", text: d.about.h2005 },
    { year: "2010", text: d.about.h2010 },
    { year: "2015", text: d.about.h2015 },
    { year: "2020", text: d.about.h2020 },
    { year: "2024", text: d.about.h2024 },
  ];

  const capabilities = [
    { label: d.about.capArea, value: d.about.capAreaVal },
    { label: d.about.capLines, value: d.about.capLinesVal },
    { label: d.about.capOutput, value: d.about.capOutputVal },
    { label: d.about.capWorkers, value: d.about.capWorkersVal },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="py-24 px-6 lg:px-14 bg-gray-50">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">{d.about.kicker}</p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl">{d.about.title}</h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7 max-w-3xl">{d.about.intro}</p>
      </section>

      {/* Capabilities */}
      <section className="grid grid-cols-2 lg:grid-cols-4 border-b border-gray-200">
        {capabilities.map((c) => (
          <div key={c.label} className="py-10 px-9 border-r border-gray-200 last:border-r-0">
            <strong className="block text-3xl text-[var(--jd-red)] mb-2">{c.value}</strong>
            <span className="text-gray-500">{c.label}</span>
          </div>
        ))}
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 lg:px-14">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-14">{d.about.historyTitle}</h2>
        <div className="grid gap-0 border-l-2 border-[var(--jd-red)] ml-4 lg:ml-8">
          {milestones.map((m) => (
            <div key={m.year} className="pl-8 pb-10 relative">
              <div className="absolute left-[-9px] top-1 w-4 h-4 bg-[var(--jd-red)] rounded-full" />
              <span className="text-[var(--jd-red)] font-extrabold text-lg">{m.year}</span>
              <p className="text-gray-600 mt-1 text-lg">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Landmark Projects */}
      <section className="py-24 px-6 lg:px-14 bg-gray-50">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">{d.about.landmarkTitle}</h2>
        <p className="text-gray-600 text-lg max-w-3xl mb-12">{d.about.landmarkIntro}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[d.about.landmark1, d.about.landmark2, d.about.landmark3, d.about.landmark4, d.about.landmark5, d.about.landmark6].map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 p-7 rounded-lg">
              <span className="text-[var(--jd-red)] font-extrabold text-sm block mb-3">0{i + 1}</span>
              <p className="text-gray-700 font-medium">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Factory placeholder */}
      <section className="py-24 px-6 lg:px-14 bg-[var(--jd-dark)] text-white">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-8">{d.about.capTitle}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((c) => (
            <div key={c.label} className="bg-[#1b1b1b] p-8 border border-white/10">
              <strong className="block text-4xl text-[var(--jd-orange)] mb-3">{c.value}</strong>
              <span className="text-gray-400">{c.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
