import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { locales, languageAlternates } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";
import { ContactForm } from "./ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Contact Jiuding — Get a Radiator Quote",
    description:
      "Contact Jiuding Radiator for OEM/ODM inquiries, product quotes, and export cooperation. Email lunan@jdradiator.com or fill in the contact form.",
    alternates: {
      canonical: `${BASE_URL}/${lang}/contact`,
      languages: languageAlternates("/contact"),
    },
    openGraph: {
      title: "Contact Jiuding Radiator",
      description: "Get a quote for steel radiators, OEM production, and export cooperation.",
      url: `${BASE_URL}/${lang}/contact`,
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);

  return (
    <div className="py-24 px-6 lg:px-14">
      <div className="max-w-4xl mb-14">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">{d.contact.kicker}</p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">{d.contact.title}</h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7">{d.contact.lead}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <ContactForm t={d.contact} locale={locale} />

        <div className="relative overflow-hidden bg-gradient-to-br from-[#F97316] via-[var(--jd-orange)] to-[var(--jd-orange-dark)] text-white p-8 lg:p-12 rounded-lg">
          {/* Oversized semi-transparent logo watermark */}
          <img
            src="/assets/logo-mark.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute -bottom-10 -right-10 w-80 lg:w-[26rem] opacity-[0.08] brightness-0 invert"
          />

          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-6">Jiuding Radiator</h3>
            <div className="space-y-4 text-white/85">
            <p><strong className="text-white">Email:</strong>{" "}
              <a href="mailto:lunan@jdradiator.com" className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity">lunan@jdradiator.com</a>
            </p>
            <p><strong className="text-white">Phone:</strong>{" "}
              <a href="tel:+862269189950" className="font-semibold hover:opacity-80 transition-opacity">022-6918 9950</a>
            </p>
            <p><strong className="text-white">Address:</strong> No. 9, Wuwei Road, Economic Development Zone, Ninghe District, Tianjin, China</p>
            <p><strong className="text-white">LinkedIn:</strong>{" "}
              <a href="https://www.linkedin.com/company/tianjin-jiuding-sunshine-radiator-co-ltd/posts/?feedView=all" target="_blank" rel="noopener" className="text-white font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity">Jiuding Radiator</a>
            </p>
            <p><strong className="text-white">Instagram:</strong>{" "}
              <a href="https://www.instagram.com/jiudingradiator/" target="_blank" rel="noopener" className="text-white font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity">@jiudingradiator</a>
            </p>
          </div>
          <a
            href="https://wa.me/8617742252991"
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2.5 bg-white text-[#128C7E] font-bold rounded-xl px-6 py-3.5 shadow-lg hover:opacity-90 transition-opacity"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            WhatsApp: +86 177 4225 2991
          </a>
          </div>
        </div>
      </div>
    </div>
  );
}
