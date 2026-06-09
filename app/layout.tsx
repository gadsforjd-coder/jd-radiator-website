import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";

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
  return children;
}
