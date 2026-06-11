import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { products, getProductBySlug, getProductImages, categoryLabels, getLocalizedSubtitle } from "@/lib/products";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
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
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}/products/${slug}`])
      ),
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

  return (
    <>
    <ProductJsonLd product={product} lang={locale} />
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

          <h2 className="text-xl font-bold mb-4 border-b pb-2">{d.products.specifications}</h2>
          <table className="w-full text-left">
            <tbody>
              {[
                { label: "Profile", value: product.specs.profile },
                { label: d.products.dimensions, value: product.specs.heights },
                { label: d.products.heatOutput + " (EN442 ΔT=50°)", value: product.specs.heatRange },
                { label: d.products.pressure, value: product.specs.pressure },
                { label: d.products.material, value: product.specs.material },
                { label: d.products.colors, value: product.specs.colors },
                { label: "Finish", value: product.specs.finish },
              ].map((row) => (
                <tr key={row.label} className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-semibold text-gray-700 w-1/3">{row.label}</td>
                  <td className="py-3 text-gray-500">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-4 mt-8 flex-wrap">
            <Link href={`/${locale}/contact`} className="inline-flex h-12 items-center px-6 bg-[var(--jd-red)] text-white font-extrabold rounded hover:bg-red-700 transition-colors">{d.products.inquiry}</Link>
            <Link href={`/${locale}/downloads`} className="inline-flex h-12 items-center px-6 bg-white border border-gray-300 font-extrabold rounded hover:border-gray-500 transition-colors">{d.products.download}</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
