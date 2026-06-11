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
    title: "Downloads — Product Catalogs & Technical Specifications",
    description:
      "Download Jiuding Radiator product catalogs, technical datasheets, installation guides, and CE/EN442 certification documents.",
    alternates: {
      canonical: `${BASE_URL}/${lang}/downloads`,
      languages: languageAlternates("/downloads"),
    },
  };
}

export default async function DownloadsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);

  const docs = [
    { title: d.downloads.catalog, desc: d.downloads.catalogDesc },
    { title: d.downloads.designerSpec, desc: d.downloads.designerSpecDesc },
    { title: d.downloads.steelSpec, desc: d.downloads.steelSpecDesc },
    { title: d.downloads.towelSpec, desc: d.downloads.towelSpecDesc },
    { title: d.downloads.installGuide, desc: d.downloads.installGuideDesc },
    { title: d.downloads.certDoc, desc: d.downloads.certDocDesc },
  ];

  return (
    <div className="py-24 px-6 lg:px-14">
      <div className="max-w-4xl mb-14">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">{d.downloads.kicker}</p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">{d.downloads.title}</h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7">{d.downloads.intro}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {docs.map((doc) => (
          <div key={doc.title} className="border border-gray-200 p-8 hover:border-[var(--jd-orange)] transition-colors">
            <div className="w-12 h-12 bg-[var(--jd-red)]/10 text-[var(--jd-red)] rounded flex items-center justify-center font-extrabold text-sm mb-5">PDF</div>
            <h3 className="text-xl font-bold mb-2">{doc.title}</h3>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">{doc.desc}</p>
            <p className="text-gray-400 text-sm italic">{d.downloads.comingSoon}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
