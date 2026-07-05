import "../globals.css";
import { locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { categoryLabels } from "@/lib/products";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import { LangSwitcher } from "./LangSwitcher";
import { MobileNav } from "./MobileNav";
import { ContactWidget } from "./ContactWidget";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Product categories for the "产品" nav dropdown; anchors match the id on each
// category section in app/[lang]/products/page.tsx.
const PRODUCT_CATS = ["designer", "panel", "column", "towel", "bimetal"] as const;

const organizationJsonLd = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  inLanguage: locale,
  name: "Tianjin Jiuding Yangguang HVAC Co., Ltd.",
  alternateName: [SITE_NAME, "九鼎散热器", "JIUDING"],
  url: BASE_URL,
  logo: `${BASE_URL}/assets/logo.png`,
  foundingDate: "2002",
  description:
    "Tianjin Jiuding Yangguang HVAC Co., Ltd. (est. 2002) manufactures steel panel and column radiators in Tianjin, China. Holds 10 CE Declarations of Performance under EU CPR No. 305/2011 (cert. nos. 2693-CPR-0010 to 0013-2024 and 2693-CPR-0019 to 0024-2023), assessed by HEATEST s.r.o. (NB 2693) to EN 442-1:2014. ISO 9001:2015 and ISO 14001:2015 certified (valid to 2027). Exports approximately 300 containers/year to 20+ countries across Europe, Russia, and Central Asia. 6 product series, 600+ specifications. All CE-certified products: reaction-to-fire class A1; REACH SVHC-compliant (SGS No. TSNEC2000446701).",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No.9, Wuwei Road, Economic Development Zone",
    addressLocality: "Ninghe District, Tianjin",
    addressCountry: "CN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "lunan@jdradiator.com",
      telephone: "+86-22-69189950",
      contactType: "sales",
      availableLanguage: ["English", "Chinese", "Russian"],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/tianjin-jiuding-sunshine-radiator-co-ltd/",
    "https://www.instagram.com/jiudingradiator/",
    "https://www.facebook.com/profile.php?id=61551859532584",
  ],
  award: [
    "Best Stand Design Award, Aquatherm Tashkent 2024",
    "Official exhibitor: ISH Frankfurt 2025 (Hall 4.2, K15E) and MCE Expocomfort Milan 2026 (Stand 18 F04)",
  ],
  slogan: "Warm Homes, One Winter at a Time",
});

const websiteJsonLd = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: `${BASE_URL}/${locale}`,
  inLanguage: locale,
  publisher: {
    "@type": "Organization",
    name: "Tianjin Jiuding Yangguang HVAC Co., Ltd.",
  },
});

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd(locale)) }}
        />
        <script
          defer
          src="/tracker.js"
          data-website-id="f0fab079-cec6-4102-967d-f2ab1efe8745"
        />
      </head>
      <body className="text-[var(--jd-dark)] bg-white overflow-x-hidden">
        {/* Header */}
        <header className="h-[96px] fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl flex items-center justify-between px-6 lg:px-14 z-50 border-b border-[#F1E7DC] shadow-[0_1px_12px_rgba(30,41,59,0.05)]">
          <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
            <Image src="/assets/logo-mark.png" alt="Jiuding" width={75} height={56} className="object-contain" />
            <div>
              <b className="text-xl tracking-wider text-[#1E293B] whitespace-nowrap">JIUDING</b>
              <span className="block text-[var(--jd-orange)] text-[11px] tracking-[0.35em] mt-0.5 whitespace-nowrap">RADIATOR</span>
            </div>
          </Link>
          <nav className="hidden lg:flex gap-5 xl:gap-7 font-semibold text-sm xl:text-base text-[#1E293B]/75">
            <div className="relative group">
              <Link href={`/${locale}/products`} className="whitespace-nowrap hover:text-[var(--jd-red)] transition-colors inline-flex items-center gap-1">
                {d.nav.products}
                <svg className="w-3 h-3 opacity-60 transition-transform group-hover:rotate-180" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <div className="absolute left-0 top-full pt-3 w-56 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150">
                <div className="bg-white rounded-lg shadow-xl border border-[#F1E7DC] py-2">
                  {PRODUCT_CATS.map((cat) => (
                    <Link key={cat} href={`/${locale}/products#${cat}`} className="block px-4 py-2.5 text-sm text-[#1E293B]/80 hover:text-[var(--jd-red)] hover:bg-[#FFF7ED] transition-colors">
                      {(categoryLabels[locale] ?? categoryLabels.en)[cat]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href={`/${locale}/about`} className="whitespace-nowrap hover:text-[var(--jd-red)] transition-colors">{d.nav.about}</Link>
            <Link href={`/${locale}/credentials`} className="whitespace-nowrap hover:text-[var(--jd-red)] transition-colors">{d.nav.credentials}</Link>
            <Link href={`/${locale}/cases`} className="whitespace-nowrap hover:text-[var(--jd-red)] transition-colors">{d.nav.cases}</Link>
            <Link href={`/${locale}/documents`} className="whitespace-nowrap hover:text-[var(--jd-red)] transition-colors">{d.nav.documents}</Link>
            <Link href={`/${locale}/faq`} className="whitespace-nowrap hover:text-[var(--jd-red)] transition-colors">{d.nav.faq}</Link>
            <Link href={`/${locale}/blog`} className="whitespace-nowrap hover:text-[var(--jd-red)] transition-colors">{d.nav.blog}</Link>
            <Link href={`/${locale}/contact`} className="whitespace-nowrap hover:text-[var(--jd-red)] transition-colors">{d.nav.contact}</Link>
            <Link
              href={`/${locale}/calculator`}
              aria-label={d.nav.calculator}
              title={d.nav.calculator}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--jd-red)] text-white font-semibold whitespace-nowrap hover:bg-orange-700 transition-colors shadow-[0_2px_10px_rgba(234,88,12,0.35)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                <rect x="5" y="3" width="14" height="18" rx="2" />
                <path d="M8 7h8" />
                <path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" />
              </svg>
              <span className="hidden xl:inline text-sm">{d.nav.calculator}</span>
            </Link>
          </nav>
          <div className="flex items-center gap-2.5 shrink-0">
            <LangSwitcher current={locale} />
            <MobileNav locale={locale} nav={d.nav} />
          </div>
        </header>

        <main className="pt-[96px]">{children}</main>

        {/* Footer */}
        <footer className="bg-[#1C1310] text-gray-300 pt-18 pb-7 px-[4vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 items-start">
            <div>
              <h3 className="text-white font-black text-lg mb-6">{d.footer.support}</h3>
              <Link href={`/${locale}/contact`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.quote}</Link>
              <Link href={`/${locale}/products`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.productCenter}</Link>
              <Link href={`/${locale}/calculator`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.thermalTech}</Link>
              <Link href={`/${locale}/documents`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.mfg}</Link>
              <Link href={`/${locale}/collaborate`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.nav.collaborate}</Link>
            </div>
            <div>
              <h3 className="text-white font-black text-lg mb-6">{d.footer.aboutJiuding}</h3>
              <Link href={`/${locale}/about`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.factory}</Link>
              <Link href={`/${locale}/cases`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.projects}</Link>
              <Link href={`/${locale}/credentials`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.nav.credentials}</Link>
              <Link href={`/${locale}/contact`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.contactUs}</Link>
              <Link href={`/${locale}/products`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.oemOrders}</Link>
            </div>
            <div>
              <h3 className="text-white font-black text-lg mb-6">{d.footer.productsTitle}</h3>
              <Link href={`/${locale}/products/jd25y`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.designerRad}</Link>
              <Link href={`/${locale}/products/jdgz2`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.steelColumn}</Link>
              <Link href={`/${locale}/products/jd-22k`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.steelPlate}</Link>
              <Link href={`/${locale}/products/jd30slf`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.electricTowel}</Link>
              <Link href={`/${locale}/products/jdwy-c`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.bathroomRad}</Link>
            </div>
            <div>
              <h3 className="text-white font-black text-lg mb-6">{d.footer.follow}</h3>
              <div className="flex gap-4 mb-8">
                <a href="https://www.linkedin.com/company/tianjin-jiuding-sunshine-radiator-co-ltd/posts/?feedView=all" target="_blank" rel="noopener" className="w-[42px] h-[42px] border border-white/25 bg-white/10 text-white rounded-full inline-grid place-items-center hover:bg-[var(--jd-orange)] hover:border-[var(--jd-orange)] hover:text-white hover:-translate-y-1 transition-all" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.32 8.03h4.36V23H.32V8.03zM8.1 8.03h4.18v2.04h.06c.58-1.1 2-2.26 4.12-2.26 4.4 0 5.22 2.9 5.22 6.67V23h-4.36v-7.56c0-1.8-.03-4.12-2.51-4.12-2.52 0-2.91 1.97-2.91 4V23H8.1V8.03z"/></svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61551859532584" target="_blank" rel="noopener" className="w-[42px] h-[42px] border border-white/25 bg-white/10 text-white rounded-full inline-grid place-items-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white hover:-translate-y-1 transition-all" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                </a>
                <a href="https://www.instagram.com/jiudingradiator/" target="_blank" rel="noopener" className="w-[42px] h-[42px] border border-white/25 bg-white/10 text-white rounded-full inline-grid place-items-center hover:bg-[var(--jd-orange)] hover:border-[var(--jd-orange)] hover:text-white hover:-translate-y-1 transition-all" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.8A4.2 4.2 0 1 1 12 16.2 4.2 4.2 0 0 1 12 7.8zm0 2A2.2 2.2 0 1 0 12 14.2 2.2 2.2 0 0 0 12 9.8zM17.6 6.4a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/></svg>
                </a>
                <a href="https://wa.me/8617742252991" target="_blank" rel="noopener" className="w-[42px] h-[42px] border border-white/25 bg-white/10 text-white rounded-full inline-grid place-items-center hover:bg-[#25D366] hover:border-[#25D366] hover:text-white hover:-translate-y-1 transition-all" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
              <h4 className="text-white text-lg mb-4">{d.footer.subscribe}</h4>
              <form className="max-w-[420px] h-[54px] border border-white/35 rounded-2xl flex overflow-hidden">
                <input type="email" placeholder={d.footer.emailPlaceholder} className="flex-1 min-w-0 bg-transparent text-white border-0 outline-none px-4 text-sm placeholder:text-white/55" />
                <button type="submit" className="w-14 bg-transparent text-white text-3xl hover:text-[var(--jd-orange)] transition-colors">&rarr;</button>
              </form>
            </div>
          </div>
          <div className="flex justify-between gap-6 text-white/45 border-t border-white/10 mt-14 pt-6 text-sm flex-col sm:flex-row">
            <span>{d.footer.copyright}</span>
            <span>{d.footer.social}</span>
          </div>
        </footer>

        <ContactWidget locale={locale} t={d.contactWidget} />
      </body>
    </html>
  );
}
