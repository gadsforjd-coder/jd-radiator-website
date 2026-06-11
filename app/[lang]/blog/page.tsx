import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/i18n";
import { blogPosts, formatPostDate } from "@/lib/blog";
import { BASE_URL } from "@/lib/constants";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = await getDictionary(lang as Locale);
  return {
    title: d.blog.title,
    description: d.blog.intro,
    alternates: {
      canonical: `${BASE_URL}/${lang}/blog`,
      languages: languageAlternates("/blog"),
    },
    openGraph: {
      title: d.blog.title,
      description: d.blog.intro,
      url: `${BASE_URL}/${lang}/blog`,
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);

  const posts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div>
      {/* Hero */}
      <section className="py-24 px-6 lg:px-14 bg-gray-50">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">{d.blog.kicker}</p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl">{d.blog.title}</h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7 max-w-3xl">{d.blog.intro}</p>
      </section>

      {/* Post list */}
      <section className="py-24 px-6 lg:px-14 bg-white">
        <div className="max-w-3xl mx-auto">
          {posts.map((post) => {
            const c = post.content[locale] ?? post.content.en;
            return (
              <article key={post.slug} className="border-b border-gray-200 pb-10 mb-10">
                <time dateTime={post.date} className="text-sm text-gray-400 font-semibold">{formatPostDate(post.date, locale)}</time>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mt-2">
                  <Link href={`/${locale}/blog/${post.slug}`} className="hover:text-[var(--jd-red)] transition-colors">{c.title}</Link>
                </h2>
                <p className="text-gray-500 leading-relaxed mt-4">{c.excerpt}</p>
                <Link href={`/${locale}/blog/${post.slug}`} className="inline-block mt-4 text-[var(--jd-red)] font-bold text-sm hover:underline">
                  {d.blog.readMore} →
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
