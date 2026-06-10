import "../globals.css";
import { locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import { LangSwitcher } from "./LangSwitcher";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tianjin Jiuding Yangguang HVAC Co., Ltd.",
  alternateName: [SITE_NAME, "九鼎散热器", "JIUDING"],
  url: BASE_URL,
  logo: `${BASE_URL}/assets/logo.png`,
  foundingDate: "2002",
  description:
    "CE/EN442-certified manufacturer of steel panel radiators, designer radiators, column radiators and heated towel rails. 45,000㎡ factory, 4 million sections/year capacity, exporting to 80+ countries.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No.9, Wuwei Road, Economic Development Zone",
    addressLocality: "Ninghe District, Tianjin",
    addressCountry: "CN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "kevin@jdradiator.com",
      contactType: "sales",
      availableLanguage: ["English", "Chinese", "Russian"],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/tianjin-jiuding-sunshine-radiator-co-ltd/",
    "https://www.instagram.com/jiudingradiator/",
  ],
};

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          defer
          src="/tracker.js"
          data-website-id="f0fab079-cec6-4102-967d-f2ab1efe8745"
        />
      </head>
      <body className="text-[var(--jd-dark)] bg-white overflow-x-hidden">
        {/* Header */}
        <header className="h-[96px] fixed top-0 left-0 right-0 bg-black/70 backdrop-blur-xl flex items-center justify-between px-6 lg:px-14 z-50 border-b border-white/10">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image src="/assets/logo.png" alt="Jiuding" width={120} height={120} className="object-contain" />
            <div>
              <b className="text-xl tracking-wider text-white">JIUDING</b>
              <span className="block text-[var(--jd-orange)] text-xs tracking-[0.35em] mt-1">RADIATOR</span>
            </div>
          </Link>
          <nav className="hidden lg:flex gap-8 font-semibold text-white/70">
            <Link href={`/${locale}`} className="hover:text-[var(--jd-red)] transition-colors">{d.nav.home}</Link>
            <Link href={`/${locale}/products`} className="hover:text-[var(--jd-red)] transition-colors">{d.nav.products}</Link>
            <Link href={`/${locale}/about`} className="hover:text-[var(--jd-red)] transition-colors">{d.nav.about}</Link>
            <Link href={`/${locale}/credentials`} className="hover:text-[var(--jd-red)] transition-colors">{d.nav.credentials}</Link>
            <Link href={`/${locale}/cases`} className="hover:text-[var(--jd-red)] transition-colors">{d.nav.cases}</Link>
            <Link href={`/${locale}/downloads`} className="hover:text-[var(--jd-red)] transition-colors">{d.nav.downloads}</Link>
            <Link href={`/${locale}/faq`} className="hover:text-[var(--jd-red)] transition-colors">{d.nav.faq}</Link>
            <Link href={`/${locale}/calculator`} className="hover:text-[var(--jd-red)] transition-colors">{d.nav.calculator}</Link>
            <Link href={`/${locale}/collaborate`} className="hover:text-[var(--jd-red)] transition-colors">{d.nav.collaborate}</Link>
            <Link href={`/${locale}/contact`} className="hover:text-[var(--jd-red)] transition-colors">{d.nav.contact}</Link>
          </nav>
          <LangSwitcher current={locale} />
        </header>

        <main className="pt-[96px]">{children}</main>

        {/* Footer */}
        <footer className="bg-[#191919] text-gray-300 pt-18 pb-7 px-[4vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 items-start">
            <div>
              <h3 className="text-white font-black text-lg mb-6">{d.footer.support}</h3>
              <Link href={`/${locale}/contact`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.quote}</Link>
              <Link href={`/${locale}/products`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.productCenter}</Link>
              <Link href={`/${locale}/calculator`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.thermalTech}</Link>
              <Link href={`/${locale}/downloads`} className="block mb-4 text-white/55 hover:text-[var(--jd-orange)] hover:translate-x-1 transition-all">{d.footer.mfg}</Link>
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
                <a href="https://www.linkedin.com/company/tianjin-jiuding-sunshine-radiator-co-ltd/posts/?feedView=all" target="_blank" rel="noopener" className="w-[42px] h-[42px] border border-white/25 bg-white/10 text-white rounded-full inline-grid place-items-center hover:bg-[var(--jd-orange)] hover:border-[var(--jd-orange)] hover:text-[var(--jd-dark)] hover:-translate-y-1 transition-all" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.32 8.03h4.36V23H.32V8.03zM8.1 8.03h4.18v2.04h.06c.58-1.1 2-2.26 4.12-2.26 4.4 0 5.22 2.9 5.22 6.67V23h-4.36v-7.56c0-1.8-.03-4.12-2.51-4.12-2.52 0-2.91 1.97-2.91 4V23H8.1V8.03z"/></svg>
                </a>
                <a href="https://www.instagram.com/jiudingradiator/" target="_blank" rel="noopener" className="w-[42px] h-[42px] border border-white/25 bg-white/10 text-white rounded-full inline-grid place-items-center hover:bg-[var(--jd-orange)] hover:border-[var(--jd-orange)] hover:text-[var(--jd-dark)] hover:-translate-y-1 transition-all" aria-label="Instagram">
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
      </body>
    </html>
  );
}
