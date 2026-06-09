import type { Metadata } from "next";
import { locales } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Heat Calculator — Find the Right Radiator for Your Room",
    description:
      "Calculate the required heat output for your room based on dimensions, insulation, and window count. Get matched with the right Jiuding radiator model.",
    alternates: {
      canonical: `${BASE_URL}/${lang}/calculator`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}/calculator`])
      ),
    },
  };
}

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
