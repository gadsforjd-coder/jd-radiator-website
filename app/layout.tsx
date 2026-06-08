import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jiuding Radiator | Global Heating Solutions",
  description:
    "Jiuding Radiator manufactures designer radiators, steel radiators, heated towel rails and OEM heating solutions for global residential and commercial projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
