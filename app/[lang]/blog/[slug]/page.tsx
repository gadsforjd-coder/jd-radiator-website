import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { locales, languageAlternates } from "@/lib/i18n";
import { blogPosts, getPostBySlug, formatPostDate } from "@/lib/blog";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * Body paragraphs support two lightweight conventions:
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

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    for (const post of blogPosts) {
      params.push({ lang, slug: post.slug });
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
  const post = getPostBySlug(slug);
  if (!post) return {};
  const c = post.content[lang as Locale] ?? post.content.en;
  return {
    title: c.title,
    description: c.excerpt,
    alternates: {
      canonical: `${BASE_URL}/${lang}/blog/${slug}`,
      languages: languageAlternates(`/blog/${slug}`),
    },
    openGraph: {
      title: c.title,
      description: c.excerpt,
      url: `${BASE_URL}/${lang}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const c = post.content[locale] ?? post.content.en;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.excerpt,
    inLanguage: locale,
    datePublished: post.date,
    dateModified: post.date,
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
    mainEntityOfPage: `${BASE_URL}/${locale}/blog/${post.slug}`,
    url: `${BASE_URL}/${locale}/blog/${post.slug}`,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="py-24 px-6 lg:px-14">
        <div className="max-w-3xl mx-auto">
          <Link href={`/${locale}/blog`} className="text-[var(--jd-red)] font-bold text-sm hover:underline">{d.blog.back}</Link>
          <time dateTime={post.date} className="block text-sm text-gray-400 font-semibold mt-8">{formatPostDate(post.date, locale)}</time>
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight tracking-tight mt-3">{c.title}</h1>
          <div className="mt-10">
            {c.body.map((paragraph, i) =>
              paragraph.startsWith("## ") ? (
                <h2 key={i} className="text-2xl font-bold tracking-tight mt-12 mb-5">{paragraph.slice(3)}</h2>
              ) : (
                <p key={i} className="text-lg text-gray-600 leading-relaxed mb-6"><InlineText text={paragraph} /></p>
              )
            )}
          </div>
          <div className="flex gap-4 mt-12 flex-wrap">
            <Link href={`/${locale}/credentials`} className="inline-flex h-12 items-center px-6 bg-[var(--jd-red)] text-white font-extrabold rounded hover:bg-orange-700 transition-colors">{d.nav.credentials}</Link>
            <Link href={`/${locale}/faq`} className="inline-flex h-12 items-center px-6 bg-white border border-gray-300 font-extrabold rounded hover:border-gray-500 transition-colors">{d.nav.faq}</Link>
          </div>
        </div>
      </article>
    </div>
  );
}
