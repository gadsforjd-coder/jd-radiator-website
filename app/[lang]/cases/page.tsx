import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Project References — Residential, Hotel & Commercial Installations",
    description:
      "Jiuding radiators installed in projects across Europe, Central Asia, and the Middle East. Apartments, hotels, offices, and large-scale construction references.",
    alternates: {
      canonical: `${BASE_URL}/${lang}/cases`,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/cases`])),
    },
  };
}

const categoryImages = [
  { key: "residential", src: "/assets/ai-images/scene-living-room.png" },
  { key: "hotel", src: "/assets/ai-images/scene-hotel-lobby.png" },
  { key: "commercial", src: "/assets/ai-images/scene-office.png" },
];

export default async function CasesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);

  const categories = [d.cases.residential, d.cases.hotel, d.cases.commercial];

  return (
    <div className="py-24 px-6 lg:px-14">
      <div className="max-w-4xl mb-14">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">{d.cases.kicker}</p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">{d.cases.title}</h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7">{d.cases.intro}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {categories.map((cat, i) => (
          <div key={cat} className="min-h-[300px] flex flex-col justify-end p-8 relative overflow-hidden rounded-xl">
            <Image src={categoryImages[i].src} alt={cat} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="relative z-10 text-white font-extrabold text-2xl">{cat}</span>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-12 text-center">
        <p className="text-gray-500 text-lg mb-6">{d.cases.placeholder}</p>
        <Link href={`/${locale}/contact`} className="inline-flex h-12 items-center px-6 bg-[var(--jd-red)] text-white font-extrabold rounded hover:bg-red-700 transition-colors">{d.contact.email}</Link>
      </div>
    </div>
  );
}
