import type { Metadata } from "next";
import Image from "next/image";
import { pageSeo } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { locales, languageAlternates } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";
import { VRTour } from "../VRTour";
import { vrTourUrl } from "@/lib/vr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const meta = pageSeo("about", lang);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/about`,
      languages: languageAlternates("/about"),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
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

  const storyParts = [
    { h: d.about.brandStory.h1, p: d.about.brandStory.p1 },
    { h: d.about.brandStory.h2, p: d.about.brandStory.p2 },
    { h: d.about.brandStory.h3, p: d.about.brandStory.p3 },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="py-24 px-6 lg:px-14 bg-[#FFF7ED]">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">{d.about.kicker}</p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl">{d.about.title}</h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7 max-w-3xl">{d.about.intro}</p>
      </section>

      {/* Brand Story · 九鼎由来 */}
      <section className="py-20 lg:py-28 px-6 lg:px-14">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-4">{d.about.brandStory.kicker}</p>
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight max-w-3xl mb-12 lg:mb-16">{d.about.brandStory.title}</h2>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Text column */}
          <div className="lg:col-span-7 space-y-10 lg:space-y-12">
            {storyParts.map((s, i) => (
              <div key={i} className="border-l-2 border-[var(--jd-orange)]/30 pl-5 lg:pl-7">
                <h3 className="flex items-baseline gap-3 text-xl lg:text-2xl font-bold text-[var(--jd-dark)] mb-3">
                  <span className="text-[var(--jd-orange)] font-extrabold text-sm tabular-nums shrink-0 translate-y-[-1px]">0{i + 1}</span>
                  <span>{s.h}</span>
                </h3>
                <p className="text-[var(--jd-muted)] leading-[1.95] text-base lg:text-lg">{s.p}</p>
              </div>
            ))}
          </div>

          {/* Image column */}
          <figure className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-[#111]">
              <Image
                src="/assets/da-ke-ding-bright.jpg"
                alt={d.about.brandStory.title}
                width={1040}
                height={1300}
                className="w-full h-auto object-cover"
              />
            </div>
            <figcaption className="text-xs text-gray-400 mt-3 leading-relaxed">{d.about.brandStory.caption}</figcaption>
          </figure>
        </div>

        {/* Brand promise */}
        <div className="mt-16 lg:mt-20 max-w-5xl">
          <div className="bg-[var(--jd-cream)] border border-[#F1E7DC] rounded-2xl p-8 lg:p-12">
            <div className="lg:flex lg:items-start lg:gap-10">
              <div className="shrink-0 mb-5 lg:mb-0 lg:w-56">
                <span className="inline-block w-10 h-1 bg-[var(--jd-orange)] mb-4" />
                <p className="text-[var(--jd-orange)] uppercase tracking-[0.18em] font-extrabold text-xs mb-2">{d.about.brandStory.promiseLabel}</p>
                <p className="text-2xl lg:text-3xl font-bold tracking-tight text-[var(--jd-dark)]">{d.about.brandStory.promiseTitle}</p>
              </div>
              <p className="text-[var(--jd-muted)] leading-[1.9] text-base lg:text-lg lg:flex-1">{d.about.brandStory.promiseText}</p>
            </div>
            <p className="text-sm text-[var(--jd-muted)] mt-7 pt-6 border-t border-[#F1E7DC]">{d.about.brandStory.bridgeText}</p>
          </div>
        </div>
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

      {/* VR Factory Tour */}
      <VRTour url={vrTourUrl(locale)} t={d.vr} />

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
      <section className="py-24 px-6 lg:px-14 bg-[#FFF7ED]">
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
      <section className="py-24 px-6 lg:px-14 bg-[#FFF7ED] text-[#1E293B]">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-8">{d.about.capTitle}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((c) => (
            <div key={c.label} className="bg-white p-8 border border-[#F1E7DC] shadow-[0_4px_16px_rgba(30,41,59,0.05)]">
              <strong className="block text-4xl text-[var(--jd-orange)] mb-3">{c.value}</strong>
              <span className="text-[#64748B]">{c.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
