import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { locales, languageAlternates } from "@/lib/i18n";
import { KNOWLEDGE_UI, getArticlesForLocale } from "@/lib/knowledge";
import { formatPostDate } from "@/lib/blog";
import { BASE_URL } from "@/lib/constants";
import Link from "next/link";

// The hub exists in every locale (localized chrome); article rows are only
// shown for the locales that actually have published copy.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const ui = KNOWLEDGE_UI[lang as Locale] ?? KNOWLEDGE_UI.en;
  return {
    title: ui.title,
    description: ui.intro,
    alternates: {
      canonical: `${BASE_URL}/${lang}/knowledge`,
      languages: languageAlternates("/knowledge"),
    },
    openGraph: {
      title: ui.title,
      description: ui.intro,
      url: `${BASE_URL}/${lang}/knowledge`,
    },
  };
}

export default async function KnowledgeHubPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const ui = KNOWLEDGE_UI[locale] ?? KNOWLEDGE_UI.en;
  const articles = getArticlesForLocale(locale);

  return (
    <div>
      {/* Hero */}
      <section className="py-24 px-6 lg:px-14 bg-gray-50">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">{ui.kicker}</p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl">{ui.title}</h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7 max-w-3xl">{ui.intro}</p>
      </section>

      {/* Article list */}
      <section className="py-24 px-6 lg:px-14 bg-white">
        <div className="max-w-3xl mx-auto">
          {articles.length === 0 ? (
            <p className="text-gray-400 text-lg">{ui.empty}</p>
          ) : (
            articles.map((article) => {
              const c = article.content[locale]!;
              return (
                <article key={article.slug} className="border-b border-gray-200 pb-10 mb-10">
                  <time dateTime={article.date} className="text-sm text-gray-400 font-semibold">
                    {formatPostDate(article.date, locale)}
                  </time>
                  <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mt-2">
                    <Link href={`/${locale}/knowledge/${article.slug}`} className="hover:text-[var(--jd-red)] transition-colors">
                      {c.title}
                    </Link>
                  </h2>
                  <p className="text-gray-500 leading-relaxed mt-4">{c.excerpt}</p>
                  <Link
                    href={`/${locale}/knowledge/${article.slug}`}
                    className="inline-block mt-4 text-[var(--jd-red)] font-bold text-sm hover:underline"
                  >
                    {ui.readMore} →
                  </Link>
                </article>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
