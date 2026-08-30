"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionary";

// AquaTherm Almaty 2026 展会-week campaign block (ru locale only). Banner +
// inquiry form. The form reuses the SAME delivery mechanism as the main contact
// form (FormSubmit → sales inbox, no new backend): we POST multipart/form-data
// with mode:"no-cors" so the visitor never leaves the page, then show an inline
// success message. The response is opaque cross-origin, so success is optimistic
// once the request is sent. See app/[lang]/contact/ContactForm.tsx for the
// original pattern this follows.
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/lunan@jdradiator.com";

type Status = "idle" | "sending" | "error" | "success";

export default function AquaThermLanding({
  t,
}: {
  t: NonNullable<Dictionary["aquatherm"]>;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = new FormData(form);

    const fd = new FormData();
    (["name", "company", "location", "email", "whatsapp", "request"] as const).forEach((k) =>
      fd.append(k, (raw.get(k) as string) || ""),
    );
    fd.append("_subject", "AquaTherm Almaty 2026 询盘 / inquiry — " + ((raw.get("name") as string) || ""));
    fd.append("_template", "table");
    fd.append("_captcha", "false");

    setStatus("sending");
    try {
      await fetch(FORMSUBMIT_ENDPOINT, { method: "POST", mode: "no-cors", body: fd });
      // Track a custom event in Umami for the campaign report count.
      try {
        (window as unknown as { umami?: { track: (n: string) => void } }).umami?.track("aquatherm_inquiry");
      } catch {}
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="aquatherm" className="scroll-mt-[96px]">
      {/* Banner — signature orange campaign band */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#F97316] via-[var(--jd-orange)] to-[var(--jd-orange-dark)] px-6 lg:px-14 py-14 lg:py-20">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-white/10 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 text-white bg-white/15 border border-white/30 rounded-full px-4 py-1.5 uppercase tracking-[0.25em] font-extrabold text-xs mb-6">
            {t.kicker}
          </p>
          <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            {t.bannerTitle}
          </h2>
          <p className="text-white/85 leading-relaxed mt-5 text-base lg:text-lg max-w-3xl mx-auto">
            {t.bannerSubhead}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href="#aquatherm-form"
              data-umami-event="aquatherm_cta_click"
              data-umami-event-src="banner"
              className="inline-flex h-14 items-center px-8 bg-white text-[var(--jd-orange)] font-extrabold rounded-sm hover:bg-orange-50 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]"
            >
              {t.ctaTitle}
            </a>
            <a
              href="mailto:kevin@jdradiator.com"
              data-umami-event="aquatherm_email_click"
              data-umami-event-src="banner"
              className="inline-flex h-14 items-center px-8 border border-white/60 text-white font-extrabold rounded-sm hover:border-white hover:bg-white/10 transition-all"
            >
              {t.emailFallback}
            </a>
          </div>
        </div>
      </div>

      {/* Inquiry section */}
      <div className="bg-[#FFF7ED] px-6 lg:px-14 py-16 lg:py-20 border-b border-[#F1E7DC]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-black text-[#1E293B] tracking-tight">{t.ctaTitle}</h3>
            <p className="text-[#64748B] mt-3">{t.ctaSubhead}</p>
          </div>

          {status === "success" ? (
            <div className="bg-white border border-[#F1E7DC] rounded-lg p-10 flex items-center justify-center min-h-[220px]">
              <p className="text-lg font-semibold text-[var(--jd-dark)] text-center">{t.success}</p>
            </div>
          ) : (
            <form
              id="aquatherm-form"
              onSubmit={onSubmit}
              className="bg-white border border-[#F1E7DC] rounded-lg p-6 lg:p-10 shadow-[0_4px_16px_rgba(30,41,59,0.05)] scroll-mt-[96px]"
            >
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <input name="name" placeholder={`${t.formName} *`} required className="p-3 border border-gray-300 rounded w-full" />
                <input name="company" placeholder={t.formCompany} className="p-3 border border-gray-300 rounded w-full" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <input name="location" placeholder={`${t.formLocation} *`} required className="p-3 border border-gray-300 rounded w-full" />
                <input name="email" type="email" placeholder={`${t.formEmail} *`} required className="p-3 border border-gray-300 rounded w-full" />
              </div>
              <input name="whatsapp" placeholder={t.formWhatsapp} className="p-3 border border-gray-300 rounded w-full mb-5" />
              <textarea name="request" placeholder={t.formRequest} rows={5} className="w-full p-3 border border-gray-300 rounded mb-5" />

              <button
                type="submit"
                disabled={status === "sending"}
                data-umami-event="aquatherm_submit"
                data-umami-event-src="form"
                className="w-full h-12 bg-[var(--jd-red)] text-white font-extrabold rounded hover:bg-orange-700 transition-colors disabled:opacity-60"
              >
                {status === "sending" ? t.sending : t.submit}
              </button>

              <p className="text-xs text-[#94A3B8] mt-4 text-center leading-relaxed">{t.consent}</p>
              {status === "error" && <p className="text-red-600 text-sm mt-3 text-center">{t.error}</p>}

              <p className="text-sm text-[#64748B] mt-5 text-center">
                <a
                  href="mailto:kevin@jdradiator.com"
                  data-umami-event="aquatherm_email_click"
                  data-umami-event-src="form"
                  className="font-semibold text-[var(--jd-red)] hover:underline"
                >
                  {t.emailFallback}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
