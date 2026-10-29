import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionary";
import { products, categoryLabels, productImages, getLocalizedSubtitle, localizeSpecValue } from "@/lib/products";
import { getPostBySlug } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";
import { locales, languageAlternates } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import QuickInquiry from "./[slug]/QuickInquiry";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const meta = pageSeo("products", lang);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/products`,
      languages: languageAlternates("/products"),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${lang}/products`,
    },
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);
  const labels = categoryLabels[locale] || categoryLabels.en;
  const categories = ["designer", "column", "towel", "bimetal", "panel"] as const;
  // Localized "related guide" link — points each locale at its own cold-bottom
  // guide (post exists in all 5 locales). Anchor = the post's localized title,
  // feeding internal-link equity to the guide from a high-authority page.
  const coldBottomGuide = getPostBySlug("radiator-cold-at-bottom");
  const coldBottomTitle = coldBottomGuide?.content[locale]?.title ?? coldBottomGuide?.content.en.title;

  return (
    <div>
      <div className="relative h-[240px] lg:h-[400px] overflow-hidden bg-[#1C1310]">
        <Image src="/assets/ai-images/stock-panel-radiator.jpg" alt="Panel radiator" fill className="object-cover opacity-40" sizes="100vw" priority />
        <div className="absolute inset-0 flex items-end px-6 lg:px-14 pb-8 lg:pb-12">
          <div className="max-w-4xl w-full">
            <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-4">{d.products.kicker}</p>
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight tracking-tight text-white mb-6">{d.products.title}</h1>
            {/* Above-the-fold inquiry CTA — visible immediately on cold mobile.
                Reuses existing contact dict strings so no new translation keys.
                WhatsApp number matches ContactWidget SALES[0].wa. */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contact`}
                data-umami-event="contact_click"
                data-umami-event-src="products_hero"
                className="inline-flex items-center gap-2 h-11 px-5 bg-[var(--jd-red)] text-white font-extrabold text-sm rounded hover:bg-orange-700 transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                {d.contact.email}
              </Link>
              <a
                href="https://wa.me/8617742252991"
                target="_blank"
                rel="noopener"
                data-umami-event="wa_click"
                data-umami-event-src="products_hero"
                className="inline-flex items-center gap-2 h-11 px-5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-extrabold text-sm rounded transition-colors shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8 pb-16 px-6 lg:px-14">

      {/* First-screen quick inquiry — the products LISTING page is where paid
          traffic actually lands (/ru/products accounts for ~100% of ad
          sessions), yet the lead form previously lived only on detail pages, so
          paid visitors never saw a form (inquiries stuck at 0). Generic model
          (no single product here); location="list" splits attribution from the
          detail-page form (Umami form_location=list + source=products_list_quick). */}
      <div id="quick-inquiry" className="scroll-mt-24 max-w-3xl mx-auto mb-14">
        <QuickInquiry locale={locale} model="products-listing" t={d.contact.quickInquiry} location="list" />
      </div>

      {coldBottomTitle && (
        <Link href={`/${locale}/blog/radiator-cold-at-bottom`} className="inline-flex items-center gap-2 text-sm text-[var(--jd-red)] font-semibold hover:underline mb-10">
          <span aria-hidden="true">📘</span>{coldBottomTitle} →
        </Link>
      )}

      {categories.map((cat) => {
        const catProducts = products.filter((p) => p.category === cat);
        if (catProducts.length === 0) return null;
        return (
          <div key={cat} id={cat} className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-[var(--jd-red)] pb-3 inline-block">{labels[cat]} <span className="text-gray-400 text-base font-normal ml-2">{catProducts.length} models</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {catProducts.map((p) => {
                const images = productImages[p.slug];
                const heroSrc = images?.[0];
                return (
                  <Link key={p.slug} href={`/${locale}/products/${p.slug}`} className="border border-gray-200 hover:border-[var(--jd-orange)] transition-colors group rounded-lg overflow-hidden">
                    <div className="relative aspect-[3/4] bg-gray-50">
                      {heroSrc ? (
                        <Image src={heroSrc} alt={p.model} fill className="object-cover" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl font-black text-gray-300">{p.model}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold group-hover:text-[var(--jd-orange)] transition-colors">{p.model}</h3>
                      <p className="text-gray-500 text-xs mt-1">{getLocalizedSubtitle(p.slug, locale)}</p>
                      <p className="text-[var(--jd-red)] text-xs mt-1 font-semibold">{localizeSpecValue(p.specs.heatRange, locale)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}
