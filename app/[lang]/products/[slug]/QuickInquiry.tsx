"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionary";

// First-screen, one-step quick inquiry for product pages. Minimal friction:
// name + (email OR WhatsApp) + a one-line requirement, submitted in place with
// NO page jump. It POSTs to the SAME server route as the full contact form
// (/api/inquiry), so capture is identical — the lead is pushed to Feishu
// (app-token push AND/OR group webhook) with best-effort email backup, and the
// Umami "inquiry" event fires only on a real, server-confirmed capture (so the
// daily report still counts genuine leads). The detailed form with file
// attachments remains available via the "full quote request" link below.
const INQUIRY_ENDPOINT = "/api/inquiry";
const FALLBACK_EMAILS = ["lunan@jdradiator.com", "kevin@jdradiator.com"];

type Status = "idle" | "sending" | "error" | "success";

export default function QuickInquiry({
  locale,
  model,
  t,
  location = "detail",
}: {
  locale: Locale;
  model: string;
  t: Dictionary["contact"]["quickInquiry"];
  // Where this form instance is rendered. Drives attribution so the two
  // placements never merge: the products LISTING page (first screen, where paid
  // traffic actually lands) vs. a product DETAIL page. Store二 needs per-page
  // conversion, so we tag the Umami "inquiry" event with form_location AND split
  // the server-side payload source. Defaults to "detail" to keep the existing
  // detail-page usage byte-for-byte unchanged.
  location?: "list" | "detail";
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = new FormData(form);

    // Honeypot: bots fill hidden fields, humans never do. Silently "succeed".
    if (raw.get("_gotcha")) {
      setStatus("success");
      return;
    }

    const contact = ((raw.get("contact") as string) || "").trim();
    // One field accepts either an email or a WhatsApp/phone number. Route it to
    // the right server field by a simple shape check so attribution stays clean.
    const isEmail = contact.includes("@");

    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const payload = {
      name: ((raw.get("name") as string) || "").trim(),
      email: isEmail ? contact : "",
      phone: isEmail ? "" : contact,
      message: ((raw.get("requirement") as string) || "").trim(),
      page: path,
      locale: path.split("/")[1] || locale,
      source:
        location === "list" ? "products_list_quick" : `product_quick:${model}`,
    };

    setStatus("sending");

    let captured = false;
    try {
      const res = await fetch(INQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      captured = res.ok && ((await res.json()) as { ok?: boolean }).ok === true;
    } catch {
      captured = false;
    }

    if (captured) {
      try {
        (
          window as unknown as {
            umami?: {
              track: (n: string, data?: Record<string, unknown>) => void;
            };
          }
        ).umami?.track("inquiry", { form_location: location });
      } catch {}
      try {
        (
          window as unknown as { ym?: (id: number, m: string, g: string) => void }
        ).ym?.(110104115, "reachGoal", "inquiry");
      } catch {}
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-[#F1E7DC] bg-[#FFFBF6] p-6">
        <p className="text-base font-semibold text-[var(--jd-dark)]">
          {t.success}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-[#F1E7DC] bg-[#FFFBF6] p-5 lg:p-6"
    >
      <p className="font-bold text-[var(--jd-dark)] mb-1">{t.title}</p>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t.lead}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <input
          name="name"
          placeholder={t.name}
          required
          className="p-3 border border-gray-300 rounded w-full bg-white"
        />
        <input
          name="contact"
          placeholder={t.contact}
          required
          className="p-3 border border-gray-300 rounded w-full bg-white"
        />
      </div>
      <input
        name="requirement"
        placeholder={t.requirement}
        className="p-3 border border-gray-300 rounded w-full bg-white mb-3"
      />

      {/* Honeypot — hidden from humans, catches bots. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        data-umami-event="quick_inquiry_submit"
        data-umami-event-src={location === "list" ? "products_list" : "product"}
        className="w-full h-12 bg-[var(--jd-red)] text-white font-extrabold rounded hover:bg-orange-700 transition-colors disabled:opacity-60"
      >
        {status === "sending" ? t.sending : t.submit}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm mt-3">
          {t.error}{" "}
          {FALLBACK_EMAILS.map((em, i) => (
            <span key={em}>
              {i > 0 && " / "}
              <a href={`mailto:${em}`} className="underline font-semibold">
                {em}
              </a>
            </span>
          ))}
        </p>
      )}

      <Link
        href={`/${locale}/contact`}
        data-umami-event="contact_click"
        data-umami-event-src="product_quick_full"
        className="block text-sm text-[var(--jd-red)] font-semibold hover:underline mt-4"
      >
        {t.full}
      </Link>
    </form>
  );
}
