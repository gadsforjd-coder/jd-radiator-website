import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

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
        <form className="bg-gray-50 p-8 lg:p-12">
          <div className="grid grid-cols-2 gap-5 mb-5">
            <input name="name" placeholder={d.contact.formName} required className="p-3 border border-gray-300 rounded w-full" />
            <input name="email" type="email" placeholder={d.contact.formEmail} required className="p-3 border border-gray-300 rounded w-full" />
          </div>
          <div className="grid grid-cols-2 gap-5 mb-5">
            <input name="company" placeholder={d.contact.formCompany} className="p-3 border border-gray-300 rounded w-full" />
            <input name="country" placeholder={d.contact.formCountry} className="p-3 border border-gray-300 rounded w-full" />
          </div>
          <textarea name="message" placeholder={d.contact.formMessage} rows={5} className="w-full p-3 border border-gray-300 rounded mb-5" />
          <button type="submit" className="w-full h-12 bg-[var(--jd-red)] text-white font-extrabold rounded hover:bg-red-700 transition-colors">{d.contact.formSubmit}</button>
        </form>

        <div className="bg-[var(--jd-dark)] text-white p-8 lg:p-12">
          <img src="/assets/logo.png" alt="Jiuding" className="w-32 mb-8" />
          <h3 className="text-2xl font-bold mb-6">Jiuding Radiator</h3>
          <div className="space-y-4 text-gray-400">
            <p><strong className="text-white">Email:</strong> jd@jlsdsrq.com</p>
            <p><strong className="text-white">Location:</strong> Tianjin, China</p>
            <p><strong className="text-white">LinkedIn:</strong>{" "}
              <a href="https://www.linkedin.com/company/tianjin-jiuding-sunshine-radiator-co-ltd/posts/?feedView=all" target="_blank" rel="noopener" className="text-[var(--jd-orange)] hover:underline">Jiuding Radiator</a>
            </p>
            <p><strong className="text-white">Instagram:</strong>{" "}
              <a href="https://www.instagram.com/jiudingradiator/" target="_blank" rel="noopener" className="text-[var(--jd-orange)] hover:underline">@jiudingradiator</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
