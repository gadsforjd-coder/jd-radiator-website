import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Business Partnerships — OEM, Distribution & Export Cooperation",
    description:
      "Partner with Jiuding Radiator: OEM/ODM radiator manufacturing, regional distribution, project supply, and export cooperation for distributors and contractors worldwide.",
    alternates: {
      canonical: `${BASE_URL}/${lang}/collaborate`,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/collaborate`])),
    },
  };
}

const cards = [
  { key: "export", icon: "🌍" },
  { key: "oem", icon: "🏭" },
  { key: "distributor", icon: "🤝" },
  { key: "accessories", icon: "🔧" },
] as const;

export default async function CollaboratePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const d = await getDictionary(locale);
  const c = d.collaborate;

  return (
    <div className="py-24 px-6 lg:px-14">
      <div className="relative h-[280px] lg:h-[360px] rounded-2xl overflow-hidden mb-16">
        <Image src="/assets/ai-images/collaborate-handshake.png" alt="Partnership" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-3xl lg:text-5xl font-bold tracking-tight text-center px-6">{c.title}</h2>
        </div>
      </div>

      <div className="max-w-4xl mb-16">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">{c.kicker}</p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">{c.title}</h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7 max-w-3xl">{c.lead}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-20">
        {cards.map(({ key, icon }) => (
          <div key={key} className="border border-gray-200 rounded-2xl p-8 hover:border-[var(--jd-orange)] hover:shadow-lg transition-all group">
            <span className="text-4xl mb-5 block">{icon}</span>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-[var(--jd-red)] transition-colors">
              {c[`${key}Title` as keyof typeof c]}
            </h3>
            <p className="text-gray-500 leading-relaxed">
              {c[`${key}Desc` as keyof typeof c]}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold">{c.formTitle}</h2>
          <p className="text-gray-500 mt-4 text-lg">{c.formLead}</p>
        </div>

        <form className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <input name="name" placeholder={c.formName} required className="p-3 border border-gray-300 rounded-lg w-full focus:border-[var(--jd-orange)] focus:outline-none transition-colors" />
            <input name="email" type="email" placeholder={c.formEmail} required className="p-3 border border-gray-300 rounded-lg w-full focus:border-[var(--jd-orange)] focus:outline-none transition-colors" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <input name="company" placeholder={c.formCompany} className="p-3 border border-gray-300 rounded-lg w-full focus:border-[var(--jd-orange)] focus:outline-none transition-colors" />
            <input name="country" placeholder={c.formCountry} className="p-3 border border-gray-300 rounded-lg w-full focus:border-[var(--jd-orange)] focus:outline-none transition-colors" />
          </div>
          <select name="interest" className="w-full p-3 border border-gray-300 rounded-lg mb-5 text-gray-500 focus:border-[var(--jd-orange)] focus:outline-none transition-colors">
            <option value="">{c.formInterest}</option>
            <option value="export">{c.formInterestExport}</option>
            <option value="oem">{c.formInterestOem}</option>
            <option value="distributor">{c.formInterestDistributor}</option>
            <option value="accessories">{c.formInterestAccessories}</option>
            <option value="other">{c.formInterestOther}</option>
          </select>
          <textarea name="message" placeholder={c.formMessage} rows={5} className="w-full p-3 border border-gray-300 rounded-lg mb-5 focus:border-[var(--jd-orange)] focus:outline-none transition-colors" />
          <button type="submit" className="w-full h-12 bg-[var(--jd-red)] text-white font-extrabold rounded-lg hover:bg-red-700 transition-colors">{c.formSubmit}</button>
        </form>
      </div>
    </div>
  );
}
