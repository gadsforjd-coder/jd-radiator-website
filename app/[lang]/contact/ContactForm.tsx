"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionary";

// Web3Forms access key — submissions (incl. image attachment) are delivered to
// the sales inbox configured on the key (lunan@jdradiator.com). Set via the
// NEXT_PUBLIC_WEB3FORMS_KEY env var on Vercel; the key is public by design.
// Until a key is configured the form gracefully falls back to a mailto link.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "aab15b9b-845a-4bc0-9dff-351868dc34c2";
const FALLBACK_EMAIL = "lunan@jdradiator.com";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ t }: { t: Dictionary["contact"] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // No backend key configured yet → open the visitor's mail client
    // pre-filled (text only; attachments need the form backend).
    if (!WEB3FORMS_ACCESS_KEY) {
      const g = (k: string) => (fd.get(k) as string) || "";
      const body =
        `Name: ${g("name")}\nEmail: ${g("email")}\nPhone: ${g("phone")}\n` +
        `Company: ${g("company")}\nCountry: ${g("country")}\n\n${g("message")}`;
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(
        "Website inquiry — " + g("name"),
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    // Web3Forms' free plan does NOT support file attachments — including a
    // file makes the request fail. So send text fields only; file upload
    // (5 images + 3 docs) is handled via Blob storage once configured.
    const payload = new FormData();
    (["name", "email", "phone", "company", "country", "message"] as const).forEach(
      (k) => payload.append(k, (fd.get(k) as string) || ""),
    );
    payload.append("access_key", WEB3FORMS_ACCESS_KEY);
    payload.append("subject", "New inquiry from jdradiator.com");
    payload.append("from_name", "Jiuding Radiator Website");

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-gray-50 p-8 lg:p-12 flex items-center justify-center min-h-[300px]">
        <p className="text-lg font-semibold text-[var(--jd-dark)] text-center">{t.formSuccess}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-gray-50 p-8 lg:p-12">
      <div className="grid grid-cols-2 gap-5 mb-5">
        <input name="name" placeholder={t.formName} required className="p-3 border border-gray-300 rounded w-full" />
        <input name="email" type="email" placeholder={t.formEmail} required className="p-3 border border-gray-300 rounded w-full" />
      </div>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <input name="phone" placeholder={t.formPhone} className="p-3 border border-gray-300 rounded w-full" />
        <input name="company" placeholder={t.formCompany} className="p-3 border border-gray-300 rounded w-full" />
      </div>
      <input name="country" placeholder={t.formCountry} className="p-3 border border-gray-300 rounded w-full mb-5" />
      <textarea name="message" placeholder={t.formMessage} rows={5} className="w-full p-3 border border-gray-300 rounded mb-5" />

      <label className="block mb-5">
        <span className="block text-sm text-gray-500 mb-2">{t.formImage}</span>
        <input
          name="image"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-[var(--jd-red)]/10 file:text-[var(--jd-red)] hover:file:bg-[var(--jd-red)]/20 cursor-pointer"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full h-12 bg-[var(--jd-red)] text-white font-extrabold rounded hover:bg-orange-700 transition-colors disabled:opacity-60"
      >
        {status === "sending" ? t.formSending : t.formSubmit}
      </button>
      {status === "error" && <p className="text-red-600 text-sm mt-3 text-center">{t.formError}</p>}
    </form>
  );
}
