import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { BASE_URL, SITE_NAME } from "@/lib/constants";

// viewport-fit=cover is required for env(safe-area-inset-*) to resolve to real
// values on notched iOS devices — the hero uses the bottom inset so the mobile
// AquaTherm booth-number badge is never hidden behind the Safari toolbar /
// home indicator.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} | Global Heating Solutions`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Jiuding Radiator — CE-certified manufacturer of steel panel radiators, designer radiators, column radiators and heated towel rails. OEM/ODM partner exporting to 80+ countries since 2002.",
  keywords: [
    "radiator manufacturer",
    "steel panel radiator",
    "designer radiator",
    "column radiator",
    "heated towel rail",
    "OEM radiator",
    "CE EN442 radiator",
    "China radiator factory",
    "Jiuding Radiator",
  ],
  authors: [{ name: "Tianjin Jiuding Yangguang HVAC Co., Ltd." }],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    images: [{ url: "/assets/logo.png", width: 400, height: 400, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* Yandex.Metrica — site-wide across all locales */}
      <Script id="yandex-metrica" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
ym(110104115,"init",{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",accurateTrackBounce:true,trackLinks:true});`}
      </Script>
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/110104115"
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
