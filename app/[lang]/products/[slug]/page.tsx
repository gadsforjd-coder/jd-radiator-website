import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { products, getProductBySlug, getProductImages, categoryLabels, getLocalizedSubtitle, approxCenterDistance, testPressureFrom, localizeSpecValue, heatedAreaFrom, heatOutputAtDt30 } from "@/lib/products";
import { getDocumentsForProduct, formatDocTitle, type SiteDocument } from "@/lib/documents";
import type { Locale } from "@/lib/i18n";
import { locales, languageAlternates } from "@/lib/i18n";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductGallery from "./ProductGallery";

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    for (const p of products) {
      params.push({ lang, slug: p.slug });
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
  const product = getProductBySlug(slug);
  if (!product) return {};
  const labels = categoryLabels[lang] || categoryLabels.en;
  const categoryName = labels[product.category] || product.category;
  const localizedSubtitle = getLocalizedSubtitle(slug, lang);
  const title = `${product.model} ${localizedSubtitle} — ${categoryName}`;
  const description = `${product.model} ${localizedSubtitle}. Heat output ${product.specs.heatRange}, heights ${product.specs.heights}. CE/EN442-certified ${categoryName.toLowerCase()} by ${SITE_NAME}. Custom colors and OEM available.`;
  const images = getProductImages(slug);

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/products/${slug}`,
      languages: languageAlternates(`/products/${slug}`),
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/products/${slug}`,
      images: images.length > 0 ? [{ url: images[0], alt: `${product.model} ${categoryName}` }] : undefined,
    },
  };
}

function ProductJsonLd({ product, lang }: { product: NonNullable<ReturnType<typeof getProductBySlug>>; lang: string }) {
  const labels = categoryLabels[lang] || categoryLabels.en;
  const images = getProductImages(product.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.model} ${getLocalizedSubtitle(product.slug, lang)}`,
    description: `${labels[product.category]} by ${SITE_NAME}. Heat output ${product.specs.heatRange}, pressure rating ${product.specs.pressure}. Available in ${product.specs.colors}.`,
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: {
      "@type": "Organization",
      name: "Tianjin Jiuding Yangguang HVAC Co., Ltd.",
    },
    image: images.length > 0 ? images.map((i) => `${BASE_URL}${i}`) : undefined,
    material: product.specs.material,
    url: `${BASE_URL}/${lang}/products/${product.slug}`,
    inLanguage: lang,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BreadcrumbJsonLd({ lang, model, slug, homeName, productsName }: { lang: string; model: string; slug: string; homeName: string; productsName: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: lang,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeName, item: `${BASE_URL}/${lang}` },
      { "@type": "ListItem", position: 2, name: productsName, item: `${BASE_URL}/${lang}/products` },
      { "@type": "ListItem", position: 3, name: model, item: `${BASE_URL}/${lang}/products/${slug}` },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProductDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const labels = categoryLabels[locale] || categoryLabels.en;
  const images = getProductImages(slug);

  // RU market expects technical parameters first: center distance,
  // working/test pressure and heat output near the top of the page.
  const centerDistance = approxCenterDistance(product.specs.heights);
  const testPressure = testPressureFrom(product.specs.pressure);
  const keySpecRows = [
    centerDistance ? { label: d.products.centerDistance, value: centerDistance } : null,
    { label: d.products.pressure, value: product.specs.pressure },
    testPressure ? { label: d.products.testPressure, value: testPressure } : null,
    { label: d.products.heatOutput + " (EN442 ΔT=50°)", value: product.specs.heatRange },
  ].filter((r): r is { label: string; value: string } => r !== null);

  // ES/EN markets (EN 442 convention, see Baxi): low-temperature ΔT=30
  // output alongside ΔT=50. MN market (see Aqua Therm): heated area at
  // the local 150 W/m² design basis — the buyer's decision language.
  const heatOutputDt30 = locale === "en" || locale === "es" ? heatOutputAtDt30(product.specs.heatRange) : null;
  const heatedArea = locale === "mn" ? heatedAreaFrom(product.specs.heatRange) : null;

  const productDocs = getDocumentsForProduct(slug);
  const docTitle = (doc: SiteDocument) =>
    doc.type === "catalog"
      ? d.documents.catalogTitle
      : formatDocTitle(doc.type === "en442" ? d.documents.en442Title : d.documents.cprTitle, doc.model);

  const specRows = [
    { label: d.products.profile, value: product.specs.profile },
    { label: d.products.dimensions, value: product.specs.heights },
    { label: d.products.heatOutput + " (EN442 ΔT=50°)", value: product.specs.heatRange },
    heatOutputDt30 ? { label: d.products.heatOutput + " (EN442 ΔT=30°)", value: heatOutputDt30 } : null,
    heatedArea ? { label: d.products.heatedArea, value: heatedArea } : null,
    { label: d.products.pressure, value: product.specs.pressure },
    { label: d.products.material, value: product.specs.material },
    { label: d.products.colors, value: product.specs.colors },
    { label: d.products.finish, value: product.specs.finish },
  ].filter((r): r is { label: string; value: string } => r !== null);

  return (
    <>
    <ProductJsonLd product={product} lang={locale} />
    <BreadcrumbJsonLd lang={locale} model={product.model} slug={product.slug} homeName={d.nav.home} productsName={d.nav.products} />
    <div className="py-24 px-6 lg:px-14">
      <Link href={`/${locale}/products`} className="text-[var(--jd-red)] font-bold text-sm hover:underline">{d.products.backToProducts}</Link>

      <div className="grid lg:grid-cols-2 gap-12 mt-8">
        {images.length > 0 ? (
          <ProductGallery images={images} model={product.model} />
        ) : (
          <div className="min-h-[400px] bg-gray-100 flex items-center justify-center rounded-lg">
            <span className="text-6xl font-black text-gray-200">{product.model}</span>
          </div>
        )}

        <div>
          <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-1">{labels[product.category]}</p>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight mb-2">{product.model}</h1>
          <p className="text-gray-500 text-lg mb-8">{getLocalizedSubtitle(product.slug, locale)}</p>

          {/* RU market: technical parameters first — key spec table near the top */}
          {locale === "ru" && keySpecRows.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">{d.products.keySpecs}</h2>
              <table className="w-full text-left">
                <tbody>
                  {keySpecRows.map((row) => (
                    <tr key={row.label} className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-semibold text-gray-700 w-1/3">{row.label}</td>
                      <td className="py-3 text-gray-500">{localizeSpecValue(row.value, locale)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Market-specific trust block (MN: market presence; ES: compliance/design/ESG; RU: durability) */}
          <div className={`border-l-4 border-[var(--jd-red)] bg-gray-50 px-5 py-4 rounded-r ${locale === "ru" ? "mb-8" : "mb-8 -mt-2"}`}>
            <p className="font-bold text-gray-900 mb-1">{d.products.marketTitle}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{d.products.marketLine1}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{d.products.marketLine2}</p>
          </div>

          <h2 className="text-xl font-bold mb-4 border-b pb-2">{d.products.specifications}</h2>
          <table className="w-full text-left">
            <tbody>
              {specRows.map((row) => (
                <tr key={row.label} className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-semibold text-gray-700 w-1/3">{row.label}</td>
                  <td className="py-3 text-gray-500">{localizeSpecValue(row.value, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Downloads: catalog + CE/EN442 + CPR documents matching this model */}
          {productDocs.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">{d.documents.blockTitle}</h2>
              <ul className="space-y-3">
                {productDocs.map((doc) => (
                  <li key={doc.id}>
                    <a href={doc.href} target="_blank" rel="noopener" className="group flex items-center gap-3 text-gray-700 hover:text-[var(--jd-red)] transition-colors">
                      <span className="shrink-0 w-10 h-10 bg-[var(--jd-red)]/10 text-[var(--jd-red)] rounded flex items-center justify-center font-extrabold text-xs">{d.documents.pdfLabel}</span>
                      <span className="font-semibold group-hover:underline">{docTitle(doc)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-4 mt-8 flex-wrap">
            <Link href={`/${locale}/contact`} className="inline-flex h-12 items-center px-6 bg-[var(--jd-red)] text-white font-extrabold rounded hover:bg-orange-700 transition-colors">{d.products.inquiry}</Link>
            <Link href={`/${locale}/downloads`} className="inline-flex h-12 items-center px-6 bg-white border border-gray-300 font-extrabold rounded hover:border-gray-500 transition-colors">{d.products.download}</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
