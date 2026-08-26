import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/i18n";
import {
  knowledgeArticles,
  getArticleBySlug,
  articleLocales,
  KNOWLEDGE_UI,
} from "@/lib/knowledge";
import { formatPostDate } from "@/lib/blog";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * Body paragraphs support two lightweight conventions (same as the blog):
 *  - a paragraph starting with "## " is rendered as an <h2> subheading;
 *  - inline markdown-style links "[text](/lang/path)" become <Link>s.
 */
function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)\s]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (m) {
          return (
            <Link key={i} href={m[2]} className="text-[var(--jd-red)] font-semibold hover:underline">
              {m[1]}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// Only emit (lang, slug) pairs that actually have published content, so we
// never pre-render thin English-fallback pages at localized URLs.
export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const article of knowledgeArticles) {
    for (const lang of articleLocales(article)) {
      params.push({ lang, slug: article.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const article = getArticleBySlug(slug);
  const c = article?.content[locale];
  if (!article || !c) return {};

  // hreflang only for the locales this article is actually published in.
  const available = articleLocales(article);
  const allAlternates = languageAlternates(`/knowledge/${slug}`);
  const languages: Record<string, string> = {};
  for (const l of available) languages[l] = allAlternates[l];
  if (available.includes("en" as Locale)) languages["x-default"] = allAlternates["x-default"];

  return {
    title: c.title,
    description: c.excerpt,
    alternates: {
      canonical: `${BASE_URL}/${locale}/knowledge/${slug}`,
      languages,
    },
    openGraph: {
      title: c.title,
      description: c.excerpt,
      url: `${BASE_URL}/${locale}/knowledge/${slug}`,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function KnowledgeArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const ui = KNOWLEDGE_UI[locale] ?? KNOWLEDGE_UI.en;
  const article = getArticleBySlug(slug);
  const c = article?.content[locale];
  // No English fallback: if this locale has no real copy, it is a 404 (avoids
  // thin/duplicate pages at localized URLs while other locales are pending).
  if (!article || !c) notFound();

  const articleUrl = `${BASE_URL}/${locale}/knowledge/${article.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.excerpt,
    inLanguage: locale,
    datePublished: article.date,
    dateModified: article.date,
    image: `${BASE_URL}/assets/logo.png`,
    author: {
      "@type": "Organization",
      name: "Tianjin Jiuding Yangguang HVAC Co., Ltd.",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/assets/logo.png` },
    },
    mainEntityOfPage: articleUrl,
    url: articleUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: ui.title, item: `${BASE_URL}/${locale}/knowledge` },
      { "@type": "ListItem", position: 2, name: c.title, item: articleUrl },
    ],
  };

  const faqJsonLd =
    c.faq && c.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: locale,
          mainEntity: c.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <article className="py-24 px-6 lg:px-14">
        <div className="max-w-3xl mx-auto">
          <Link href={`/${locale}/knowledge`} className="text-[var(--jd-red)] font-bold text-sm hover:underline">
            {ui.back}
          </Link>
          <time dateTime={article.date} className="block text-sm text-gray-400 font-semibold mt-8">
            {ui.updated} {formatPostDate(article.date, locale)}
          </time>
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight tracking-tight mt-3">{c.title}</h1>

          <div className="mt-10">
            {c.body.map((paragraph, i) =>
              paragraph.startsWith("## ") ? (
                <h2 key={i} className="text-2xl font-bold tracking-tight mt-12 mb-5">
                  {paragraph.slice(3)}
                </h2>
              ) : (
                <p key={i} className="text-lg text-gray-600 leading-relaxed mb-6">
                  <InlineText text={paragraph} />
                </p>
              )
            )}
          </div>

          {c.faq && c.faq.length > 0 && (
            <section className="mt-16 border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold tracking-tight mb-8">{ui.faqTitle}</h2>
              <dl>
                {c.faq.map((f, i) => (
                  <div key={i} className="mb-8">
                    <dt className="text-lg font-bold text-[#1E293B]">{f.q}</dt>
                    <dd className="text-lg text-gray-600 leading-relaxed mt-2">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </article>
    </div>
  );
}
