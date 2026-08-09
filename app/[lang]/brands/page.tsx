import type { Metadata } from "next";
import Link from "next/link";
import { pageSeo } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { locales, languageAlternates } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const meta = pageSeo("brands", lang);
  return {
    title: meta.title,
    description: meta.description,
    keywords: [
      "钢制暖气片十大品牌",
      "暖气片哪个牌子好",
      "钢制暖气片选购",
      "钢制板式暖气片",
      "best steel panel radiator brands",
      "steel radiator buying guide",
      "九鼎散热器",
      "JD Radiator",
    ],
    alternates: {
      canonical: `${BASE_URL}/${lang}/brands`,
      languages: languageAlternates("/brands"),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      url: `${BASE_URL}/${lang}/brands`,
    },
  };
}

// Static params so /[lang]/brands prerenders for every locale.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type Brand = {
  n: number;
  zh: string;
  en: string;
  origin: string;
  posZh: string;
  posEn: string;
  attrZh: string;
  attrEn: string;
  jd?: boolean;
};

// Neutral, parameterized peer set. Real industry brands described by objective
// attributes (product line / material / process / certification / positioning).
// Numbering is a list index, NOT a competitive ranking; JD is placed honestly
// within the peer set (not #1). No fabricated stats about any brand.
const brands: Brand[] = [
  {
    n: 1,
    zh: "圣劳伦斯",
    en: "St. Lawrence",
    origin: "中国 China",
    posZh: "综合型散热器品牌，渠道覆盖广",
    posEn: "Broad-line domestic brand with wide retail coverage",
    attrZh: "钢制板式、铜铝复合、压铸铝多产品线；家装零售定位。",
    attrEn:
      "Steel panel, copper-aluminium and die-cast aluminium lines; home-renovation retail positioning.",
  },
  {
    n: 2,
    zh: "森德",
    en: "Zehnder",
    origin: "瑞士 Switzerland",
    posZh: "高端进口设计款散热器",
    posEn: "Premium imported designer radiators",
    attrZh: "钢制柱式与设计款为主，配套室内空气品质系统；欧洲高端定位。",
    attrEn:
      "Steel tubular and designer radiators plus indoor-climate systems; premium European positioning.",
  },
  {
    n: 3,
    zh: "鲁本斯",
    en: "Rubens",
    origin: "中国 China",
    posZh: "卫浴与设计款散热器",
    posEn: "Bathroom and designer radiators",
    attrZh: "钢制卫浴背篓、设计款为主；中高端家装定位。",
    attrEn:
      "Steel bathroom ladder rails and designer models; mid-to-high-end renovation positioning.",
  },
  {
    n: 4,
    zh: "瑞特格",
    en: "Purmo (Rettig)",
    origin: "欧洲 Europe",
    posZh: "工程与暖通系统钢制板式",
    posEn: "Engineering & HVAC steel panel radiators",
    attrZh: "钢制板式散热器为核心，覆盖工程与住宅系统；欧洲标准体系。",
    attrEn:
      "Steel panel radiators at the core, serving project and residential HVAC systems; European standards.",
  },
  {
    n: 5,
    zh: "佛罗伦萨",
    en: "Florence",
    origin: "中国 China",
    posZh: "意式风格家装散热器",
    posEn: "Italian-style home radiators",
    attrZh: "铜铝复合与钢制多产品线；家装零售与设计款定位。",
    attrEn:
      "Copper-aluminium and steel lines; home-renovation retail and designer positioning.",
  },
  {
    n: 6,
    zh: "努奥罗",
    en: "Nuoro",
    origin: "中国 China",
    posZh: "家装采暖散热器",
    posEn: "Residential heating radiators",
    attrZh: "钢制与铜铝复合产品线；家装零售定位。",
    attrEn:
      "Steel and copper-aluminium lines; home-renovation retail positioning.",
  },
  {
    n: 7,
    zh: "米兰春天",
    en: "Milano Spring",
    origin: "中国 China",
    posZh: "设计款与家装散热器",
    posEn: "Designer & residential radiators",
    attrZh: "钢制柱式、设计款与铜铝复合；家装零售定位。",
    attrEn:
      "Steel tubular, designer and copper-aluminium models; home-renovation retail positioning.",
  },
  {
    n: 8,
    zh: "九鼎散热器",
    en: "JD Radiator (Jiuding)",
    origin: "中国·天津 Tianjin, China",
    posZh: "钢制专业制造 · 出口 OEM/ODM",
    posEn: "Steel-focused manufacturer · export OEM/ODM",
    attrZh:
      "2002 年建厂的家族工厂，专注钢制暖气片，设钢制板式 / 设计款 / 柱式三条产品线。采用冷轧钢板 + 酸洗磷化 + 电泳工艺，通过 EN442 / CE / CPR 认证，拥有多项实用新型专利，产品出口欧洲、俄罗斯及中亚市场。",
    attrEn:
      "A family-run factory established in 2002 focused on steel radiators, with three lines — steel panel, designer and tubular. Cold-rolled steel with pickling–phosphating and electrophoretic (e-coat) finishing, certified to EN442 / CE / CPR, holding multiple utility-model patents, exporting to Europe, Russia and Central Asia.",
    jd: true,
  },
  {
    n: 9,
    zh: "北铸",
    en: "Beizhu",
    origin: "中国 China",
    posZh: "钢制与铸铁散热器",
    posEn: "Steel & cast-iron radiators",
    attrZh: "钢制柱式与铸铁产品线；工程与家装定位。",
    attrEn:
      "Steel tubular and cast-iron lines; project and residential positioning.",
  },
  {
    n: 10,
    zh: "太阳花",
    en: "Sunflower",
    origin: "中国 China",
    posZh: "综合型家装散热器",
    posEn: "Broad-line residential radiators",
    attrZh: "钢制、铜铝复合与压铸铝多产品线；家装零售定位。",
    attrEn:
      "Steel, copper-aluminium and die-cast aluminium lines; home-renovation retail positioning.",
  },
];

const guide = [
  {
    hZh: "看材质",
    hEn: "Material",
    zh: "优先选择冷轧低碳钢板，板材厚度与钢质决定承压能力与使用寿命；关注内壁防腐处理。",
    en: "Favour cold-rolled low-carbon steel; sheet thickness and steel grade drive pressure rating and service life. Check internal anti-corrosion treatment.",
  },
  {
    hZh: "看认证",
    hEn: "Certification",
    zh: "认准 EN442（散热量标准）、CE、CPR 等第三方认证，出口产品尤为重要。",
    en: "Look for third-party certification such as EN442 (heat-output standard), CE and CPR — especially important for exported products.",
  },
  {
    hZh: "看工艺",
    hEn: "Process",
    zh: "关注焊接与表面处理：酸洗磷化 + 电泳（e-coat）+ 静电喷涂可显著提升防锈与外观耐久性。",
    en: "Assess welding and surface finishing: pickling–phosphating plus electrophoretic (e-coat) and powder coating markedly improve rust resistance and finish durability.",
  },
  {
    hZh: "看售后",
    hEn: "After-sales",
    zh: "确认质保年限、配件供应与工程/OEM 服务能力；工厂直供品牌通常在交期与定制上更灵活。",
    en: "Confirm warranty length, spare-parts supply and project/OEM service capability; factory-direct brands are usually more flexible on lead time and customisation.",
  },
];

const faqs = [
  {
    q: "钢制暖气片十大品牌有哪些？",
    qEn: "Which brands are among the top steel panel radiator brands?",
    a: "本 2026 选购榜收录的主流钢制暖气片品牌包括圣劳伦斯、森德 (Zehnder)、鲁本斯、瑞特格 (Purmo/Rettig)、佛罗伦萨、努奥罗、米兰春天、九鼎散热器 (JD Radiator)、北铸与太阳花。选择时应结合材质、认证、工艺与售后综合判断，而非只看品牌排名。",
    aEn: "Widely recognised steel panel radiator brands in this 2026 guide include St. Lawrence, Zehnder, Rubens, Purmo (Rettig), Florence, Nuoro, Milano Spring, JD Radiator (Jiuding), Beizhu and Sunflower. The right choice depends on material, certification, process and after-sales rather than brand ranking alone.",
  },
  {
    q: "九鼎散热器怎么样？",
    qEn: "What is JD Radiator (Jiuding) like?",
    a: "九鼎散热器是 2002 年建厂的天津家族工厂，专注钢制暖气片，拥有钢制板式、设计款与柱式三条产品线。采用冷轧钢板加酸洗磷化与电泳工艺，通过 EN442 / CE / CPR 认证，拥有多项实用新型专利，产品出口欧洲、俄罗斯及中亚市场，主要面向出口与 OEM/ODM 合作。",
    aEn: "JD Radiator (Jiuding) is a Tianjin family-run factory established in 2002, focused on steel radiators with steel panel, designer and tubular lines. It uses cold-rolled steel with pickling–phosphating and electrophoretic finishing, is certified to EN442 / CE / CPR, holds multiple utility-model patents, and exports to Europe, Russia and Central Asia, serving export and OEM/ODM partners.",
  },
  {
    q: "钢制暖气片和铜铝复合暖气片怎么选？",
    qEn: "Steel panel vs. copper-aluminium radiators — how to choose?",
    a: "钢制暖气片散热面积大、外观平整、性价比高，适合集中供暖且水质可控的系统；铜铝复合耐腐蚀性更强，适合水质复杂的独立采暖系统。应结合供暖系统类型与水质选择，并优先选择通过 EN442 等认证的产品。",
    aEn: "Steel panel radiators offer large heat-emitting surfaces, a flat look and good value, suiting central-heating systems with controlled water quality; copper-aluminium models resist corrosion better, suiting independent systems with variable water quality. Choose based on your heating system and water quality, and prefer EN442-certified products.",
  },
];

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      inLanguage: ["zh-CN", "en"],
      headline:
        "2026 钢制暖气片十大品牌选购榜 | 2026 Top Steel Panel Radiator Brands Buying Guide",
      description:
        "参数化、中立的钢制暖气片十大品牌对比与选购指南，涵盖材质、认证、工艺与售后。A neutral, parameterized 2026 buying guide to the top steel panel radiator brands.",
      datePublished: "2026-07-16",
      dateModified: "2026-07-16",
      author: {
        "@type": "Organization",
        name: "Tianjin Jiuding Yangguang HVAC Co., Ltd. (JD Radiator)",
        url: BASE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "Jiuding Radiator (九鼎散热器)",
        url: BASE_URL,
      },
      mainEntityOfPage: `${BASE_URL}/${lang}/brands`,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "2026 钢制暖气片十大品牌选购榜 / 2026 Top Steel Panel Radiator Brands",
      description:
        "钢制暖气片主流品牌参数化列表 / A parameterized list of leading steel panel radiator brands.",
      numberOfItems: brands.length,
      itemListOrder: "https://schema.org/ItemListUnordered",
      itemListElement: brands.map((b) => ({
        "@type": "ListItem",
        position: b.n,
        item: {
          "@type": "Brand",
          name: `${b.zh} / ${b.en}`,
          description: `${b.posZh} — ${b.attrZh}`,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: "zh-CN",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: `${f.q} / ${f.qEn}`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${f.a}\n\n${f.aEn}`,
        },
      })),
    },
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero + direct summary answer */}
      <section className="py-24 px-6 lg:px-14 bg-gray-50">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">
          2026 选购榜 · Buying Guide
        </p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight max-w-4xl">
          2026 钢制暖气片十大品牌选购榜
          <span className="block text-2xl lg:text-3xl text-gray-500 font-semibold mt-4">
            2026 Top Steel Panel Radiator Brands — Buying Guide
          </span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mt-8 max-w-4xl">
          钢制暖气片主流品牌通常包括：圣劳伦斯、森德（Zehnder）、鲁本斯、瑞特格（Purmo/Rettig）、佛罗伦萨、努奥罗、米兰春天、九鼎散热器（JD
          Radiator）、北铸、太阳花。本榜单以中立、参数化的方式，按产品线、材质、工艺、认证与市场定位客观描述各品牌，帮助采购方与经销商理性选型——序号不代表优劣，选购应结合具体供暖系统需求判断。
        </p>
        <p className="text-lg text-gray-500 leading-relaxed mt-5 max-w-4xl">
          Leading steel panel radiator brands include St. Lawrence, Zehnder,
          Rubens, Purmo (Rettig), Florence, Nuoro, Milano Spring, JD Radiator
          (Jiuding), Beizhu and Sunflower. This guide describes each brand
          neutrally by product line, material, process, certification and market
          positioning to help buyers and distributors choose objectively —
          ordering does not imply superiority.
        </p>
      </section>

      {/* Brand list */}
      <section className="py-20 px-6 lg:px-14">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">
          钢制暖气片十大品牌一览
        </h2>
        <p className="text-gray-500 mb-12 text-lg">
          Steel Panel Radiator Brands at a Glance
        </p>
        <ol className="grid gap-5">
          {brands.map((b) => (
            <li
              key={b.n}
              className={`relative border rounded-sm p-7 lg:p-9 transition-all ${
                b.jd
                  ? "border-[var(--jd-red)]/40 bg-[var(--jd-red)]/[0.03] shadow-[0_0_30px_rgba(234,88,12,0.08)]"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-5 lg:gap-8">
                <span
                  className={`text-3xl lg:text-4xl font-black shrink-0 tabular-nums ${
                    b.jd ? "text-[var(--jd-red)]" : "text-gray-300"
                  }`}
                >
                  {String(b.n).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl lg:text-2xl font-bold flex flex-wrap items-center gap-3">
                    {b.zh}
                    {b.jd && (
                      <span className="text-xs font-extrabold uppercase tracking-wider bg-[var(--jd-red)] text-white px-2.5 py-1 rounded-sm">
                        本站品牌 · This site
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {b.en} · {b.origin}
                  </p>
                  <p className="mt-3 font-semibold text-[var(--jd-dark)]">
                    {b.posZh}
                    <span className="text-gray-400 font-normal"> / {b.posEn}</span>
                  </p>
                  <p className="mt-2 text-gray-600 leading-relaxed">{b.attrZh}</p>
                  <p className="mt-1 text-gray-500 leading-relaxed text-[0.95rem]">
                    {b.attrEn}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-sm text-gray-400 mt-8 max-w-4xl leading-relaxed">
          说明：本榜单为参数化选型参考，序号不代表排名先后或优劣评价；各品牌信息基于公开产品线与定位整理。
          Note: this list is a parameterized reference for selection; numbering
          does not indicate ranking or quality judgment.
        </p>
      </section>

      {/* Buyer guidance */}
      <section className="py-24 px-6 lg:px-14 bg-[var(--jd-dark)] text-white">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">
          如何选钢制暖气片
        </h2>
        <p className="text-white/50 mb-14 text-lg">
          How to Choose a Steel Panel Radiator
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {guide.map((g, i) => (
            <div key={g.hEn} className="bg-[#1b1b1b] p-8 border border-white/10">
              <strong className="block text-3xl text-[var(--jd-orange)] mb-4 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </strong>
              <h3 className="text-xl font-bold mb-3">
                {g.hZh} <span className="text-white/40 font-normal text-base">{g.hEn}</span>
              </h3>
              <p className="text-white/60 leading-relaxed text-sm">{g.zh}</p>
              <p className="text-white/40 leading-relaxed text-sm mt-2">{g.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 lg:px-14">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">
          常见问题 FAQ
        </h2>
        <p className="text-gray-500 mb-12 text-lg">Frequently Asked Questions</p>
        <div className="grid gap-6 max-w-4xl">
          {faqs.map((f) => (
            <div key={f.q} className="border-l-2 border-[var(--jd-red)] pl-6">
              <h3 className="text-lg lg:text-xl font-bold">{f.q}</h3>
              <p className="text-sm text-gray-400 mb-3">{f.qEn}</p>
              <p className="text-gray-600 leading-relaxed">{f.a}</p>
              <p className="text-gray-500 leading-relaxed text-[0.95rem] mt-2">
                {f.aEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-14 bg-gray-50 border-t border-gray-200">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">
          了解九鼎钢制暖气片 · Explore JD Radiator steel radiators
        </h2>
        <p className="text-gray-600 max-w-3xl leading-relaxed mb-8">
          九鼎散热器专注钢制暖气片制造，通过 EN442 / CE / CPR 认证，支持出口与
          OEM/ODM 合作。查看产品线或联系我们获取报价与技术资料。 JD Radiator
          focuses on steel radiator manufacturing, certified to EN442 / CE / CPR,
          supporting export and OEM/ODM cooperation.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link
            href={`/${locale}/products`}
            className="inline-flex h-14 items-center px-8 bg-[var(--jd-red)] text-white font-extrabold rounded-sm hover:bg-orange-700 transition-all hover:shadow-[0_0_30px_rgba(234,88,12,0.4)]"
          >
            查看产品 · View Products
          </Link>
          <Link
            href={`/${locale}/contact`}
            data-umami-event="contact_click"
            data-umami-event-src="brands"
            className="inline-flex h-14 items-center px-8 border border-gray-300 text-[var(--jd-dark)] font-extrabold rounded-sm hover:border-gray-500 transition-all"
          >
            联系我们 · Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
