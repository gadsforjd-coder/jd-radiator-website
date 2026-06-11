import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { getDocumentsByType, formatDocTitle, type SiteDocument } from "@/lib/documents";
import type { Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = await getDictionary(lang as Locale);
  return {
    title: d.documents.metaTitle,
    description: d.documents.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/${lang}/documents`,
      languages: languageAlternates("/documents"),
    },
  };
}

export default async function DocumentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);

  const docTitle = (doc: SiteDocument) =>
    doc.type === "catalog"
      ? d.documents.catalogTitle
      : formatDocTitle(doc.type === "en442" ? d.documents.en442Title : d.documents.cprTitle, doc.model);

  const sections: { heading: string; docs: SiteDocument[] }[] = [
    { heading: d.documents.sectionCatalog, docs: getDocumentsByType("catalog") },
    { heading: d.documents.sectionEn442, docs: getDocumentsByType("en442") },
    { heading: d.documents.sectionCpr, docs: getDocumentsByType("cpr") },
  ];

  return (
    <div className="py-24 px-6 lg:px-14">
      <div className="max-w-4xl mb-14">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">{d.documents.kicker}</p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">{d.documents.title}</h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7">{d.documents.intro}</p>
      </div>

      <div className="space-y-14">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-bold mb-6 border-b pb-3">{section.heading}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {section.docs.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.href}
                  target="_blank"
                  rel="noopener"
                  className="group border border-gray-200 p-6 flex items-start gap-4 hover:border-[var(--jd-orange)] transition-colors"
                >
                  <span className="shrink-0 w-12 h-12 bg-[var(--jd-red)]/10 text-[var(--jd-red)] rounded flex items-center justify-center font-extrabold text-sm">{d.documents.pdfLabel}</span>
                  <span className="font-bold leading-snug group-hover:text-[var(--jd-red)] transition-colors">{docTitle(doc)}</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
