import { getDictionary } from "@/lib/dictionary";
import { products, getProductBySlug, getProductImages, categoryLabels } from "@/lib/products";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
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

export default async function ProductDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const labels = categoryLabels[locale] || categoryLabels.en;
  const images = getProductImages(slug);

  return (
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
          <p className="text-gray-500 text-lg mb-8">{product.subtitle}</p>

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
  );
}
