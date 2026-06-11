import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { products, categoryLabels, productImages, getLocalizedSubtitle, localizeSpecValue } from "@/lib/products";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Products — Steel Radiators, Designer Radiators & Towel Rails",
    description:
      "Browse 30+ models across 5 categories: designer radiators, steel column radiators, panel radiators, copper-aluminium bimetal radiators, and heated towel rails. CE/EN442 certified, custom RAL colors.",
    alternates: {
      canonical: `${BASE_URL}/${lang}/products`,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/products`])),
    },
    openGraph: {
      title: "Jiuding Radiator Product Range",
      description: "30+ models, 5 categories. Designer, column, panel, bimetal radiators and towel rails. Custom colors & OEM.",
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

  return (
    <div>
      <div className="relative h-[280px] lg:h-[360px] overflow-hidden bg-[var(--jd-dark)]">
        <Image src="/assets/ai-images/stock-panel-radiator.jpg" alt="Panel radiator" fill className="object-cover opacity-40" sizes="100vw" priority />
        <div className="absolute inset-0 flex items-center px-6 lg:px-14">
          <div className="max-w-4xl">
            <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">{d.products.kicker}</p>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-white">{d.products.title}</h1>
          </div>
        </div>
      </div>
      <div className="py-16 px-6 lg:px-14">

      {categories.map((cat) => {
        const catProducts = products.filter((p) => p.category === cat);
        if (catProducts.length === 0) return null;
        return (
          <div key={cat} className="mb-16">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-[var(--jd-red)] pb-3 inline-block">{labels[cat]} <span className="text-gray-400 text-base font-normal ml-2">{catProducts.length} models</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {catProducts.map((p) => {
                const images = productImages[p.slug];
                const heroSrc = images?.[0];
                return (
                  <Link key={p.slug} href={`/${locale}/products/${p.slug}`} className="border border-gray-200 hover:border-[var(--jd-orange)] transition-colors group rounded-lg overflow-hidden">
                    <div className="relative h-[180px] bg-gray-50">
                      {heroSrc ? (
                        <Image src={heroSrc} alt={p.model} fill className="object-contain p-2" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
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
