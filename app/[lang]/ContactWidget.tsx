"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

const POPPED_KEY = "jd_contact_popped";

// Sales contacts. `wa` is the WhatsApp number in wa.me format (digits only,
// incl. country code); `tel` is the dial string.
const SALES = [
  {
    name: "Lu Nan",
    email: "lunan@jdradiator.com",
    tel: "+8618612430813",
    telLabel: "+86 186 1243 0813",
    wa: "8617742252991",
    waLabel: "+86 177 4225 2991",
  },
  {
    name: "Jason",
    email: "wubao160808@foxmail.com",
    tel: "+8613311319595",
    telLabel: "+86 133 1131 9595",
    wa: "8613311319595",
    waLabel: "+86 133 1131 9595",
  },
] as const;

const OFFICE_TEL = "+862269189950";
const OFFICE_TEL_LABEL = "022-6918 9950";

// Factory coordinates in each provider's required datum (WGS84 → GCJ02 → BD09
// converted from the GPS point). Using coordinate markers via each provider's
// official URI service — these have proper mobile/H5 fallback, unlike the plain
// web-search URLs which stall on "open app" / blank pages on phones.
const NAME_ZH = encodeURIComponent("九鼎散热器");
const ADDR_TXT = encodeURIComponent("天津市宁河区经济开发区五纬路9号");
const MAP_LINKS = [
  // Google — WGS84 lat,lng
  { label: "Google", href: `https://www.google.com/maps/search/?api=1&query=39.299700,117.808800` },
  // 高德 — GCJ02 position lng,lat (callnative=0 keeps it in the browser)
  { label: "高德", href: `https://uri.amap.com/marker?position=117.815042,39.300743&name=${NAME_ZH}&src=jdradiator&coordinate=gaode&callnative=0` },
  // 百度 — BD09 location lat,lng, html output
  { label: "百度", href: `https://api.map.baidu.com/marker?location=39.306835,117.821511&title=${NAME_ZH}&content=${ADDR_TXT}&output=html&coord_type=bd09ll&src=jdradiator` },
  // 腾讯 — GCJ02 coord lat,lng marker
  { label: "腾讯", href: `https://apis.map.qq.com/uri/v1/marker?marker=coord:39.300743,117.815042;title:${NAME_ZH};addr:${ADDR_TXT}&referer=jdradiator` },
];

export type ContactWidgetStrings = {
  tab: string;
  title: string;
  emailLabel: string; // section header — "Sales team"
  phoneLabel: string;
  whatsappLabel: string;
  officeLabel: string;
  quoteButton: string;
  note: string;
  address: string;
};

const iconCls = "w-4 h-4 shrink-0 text-[var(--jd-orange)]";

// Fire a custom Umami event (safe no-op if the tracker script hasn't loaded).
// Distinct event names per channel so each shows up separately in the Umami
// Events list even if event-data isn't enabled — lets us verify track()
// end-to-end from a click, without waiting for a form submit.
function track(event: string, data?: Record<string, string>) {
  try {
    (
      window as unknown as {
        umami?: { track: (n: string, d?: Record<string, string>) => void };
      }
    ).umami?.track(event, data);
  } catch {}
}

export function ContactWidget({ locale, t }: { locale: Locale; t: ContactWidgetStrings }) {
  const [open, setOpen] = useState(false);
  const interacted = useRef(false);

  // Auto-popup once per browser session, 3s after load — unless the user
  // already toggled the widget manually before the timer fires.
  // Desktop only: on phones/tablets the panel (max-w-[88vw]) would cover almost
  // the whole screen and block taps on the calculator/product form, so we never
  // auto-pop below the lg breakpoint — the collapsed tab stays tap-to-open.
  useEffect(() => {
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    let alreadyPopped = false;
    try {
      alreadyPopped = sessionStorage.getItem(POPPED_KEY) === "1";
    } catch {
      /* sessionStorage unavailable — never auto-pop */
      alreadyPopped = true;
    }
    if (alreadyPopped) return;

    const timer = setTimeout(() => {
      if (interacted.current) return;
      try {
        sessionStorage.setItem(POPPED_KEY, "1");
      } catch {}
      setOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  function toggle(next: boolean) {
    interacted.current = true;
    try {
      sessionStorage.setItem(POPPED_KEY, "1");
    } catch {}
    setOpen(next);
  }

  return (
    <>
      {/* Collapsed tab */}
      <button
        type="button"
        onClick={() => toggle(!open)}
        aria-expanded={open}
        aria-label={t.tab}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center gap-2.5 bg-[var(--jd-orange)] text-white px-2.5 py-5 rounded-l-xl shadow-[0_4px_20px_rgba(234,88,12,0.35)] hover:bg-[var(--jd-orange-dark)] transition-all duration-300 ${
          open ? "translate-x-full opacity-0 pointer-events-none" : ""
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
        <span className="[writing-mode:vertical-rl] text-sm font-bold tracking-[0.2em] whitespace-nowrap">
          {t.tab}
        </span>
      </button>

      {/* Expanded panel */}
      <div
        role="dialog"
        aria-label={t.title}
        aria-hidden={!open}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-[60] w-[340px] max-w-[88vw] max-h-[88vh] overflow-y-auto bg-white rounded-l-2xl shadow-2xl border border-r-0 border-[#F1E7DC] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-[110%] pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between gap-3 bg-[var(--jd-orange)] text-white px-5 py-3.5 sticky top-0">
          <h3 className="font-bold text-base">{t.title}</h3>
          <button
            type="button"
            onClick={() => toggle(false)}
            aria-label="Close"
            className="text-2xl leading-none px-1 hover:opacity-70 transition-opacity"
          >
            &times;
          </button>
        </div>

        <div className="p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--jd-muted)] mb-3">
            {t.emailLabel}
          </p>

          <div className="space-y-4">
            {SALES.map((p) => (
              <div key={p.email} className="rounded-xl border border-[#F1E7DC] bg-[#FFFBF6] p-3.5">
                <p className="font-bold text-[var(--jd-dark)] text-sm mb-2">{p.name}</p>

                <a
                  href={`mailto:${p.email}`}
                  onClick={() => track("email_click", { who: p.name })}
                  className="flex items-center gap-2.5 py-1 text-[13px] font-medium text-[var(--jd-dark)] hover:text-[var(--jd-orange)] transition-colors break-all"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  {p.email}
                </a>

                <a
                  href={`tel:${p.tel}`}
                  onClick={() => track("tel_click", { who: p.name })}
                  className="flex items-center gap-2.5 py-1 text-[13px] font-medium text-[var(--jd-dark)] hover:text-[var(--jd-orange)] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{p.telLabel}</span>
                  <span className="text-[11px] text-[var(--jd-muted)]">· {t.phoneLabel}</span>
                </a>

                <a
                  href={`https://wa.me/${p.wa}`}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track("wa_click", { who: p.name })}
                  className="mt-2 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-[13px] rounded-lg px-3 py-2 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  WhatsApp {p.waLabel}
                </a>
              </div>
            ))}
          </div>

          {/* Office line */}
          <a
            href={`tel:${OFFICE_TEL}`}
            onClick={() => track("tel_click", { who: "office" })}
            className="flex items-center gap-2.5 mt-4 py-1 text-[13px] font-medium text-[var(--jd-dark)] hover:text-[var(--jd-orange)] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
              <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
            </svg>
            <span className="text-[11px] text-[var(--jd-muted)] uppercase tracking-wide">{t.officeLabel}:</span>
            <span>{OFFICE_TEL_LABEL}</span>
          </a>

          {/* Factory address + open in the visitor's preferred map app */}
          <div className="flex items-start gap-2.5 mt-3 py-1 text-[13px] font-medium text-[var(--jd-dark)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{t.address}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {MAP_LINKS.map((m) => (
              <a
                key={m.label}
                href={m.href}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-1.5 border border-[#F1E7DC] rounded-lg px-2 py-1.5 text-[12px] font-bold text-[var(--jd-dark)] hover:border-[var(--jd-orange)] hover:text-[var(--jd-orange)] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {m.label}
              </a>
            ))}
          </div>

          <Link
            href={`/${locale}/contact`}
            onClick={() => {
              track("quote_click");
              toggle(false);
            }}
            className="block w-full text-center bg-[var(--jd-orange)] hover:bg-[var(--jd-orange-dark)] text-white font-bold text-sm rounded-xl px-4 py-3 mt-4 transition-colors"
          >
            {t.quoteButton}
          </Link>
          <p className="text-xs text-[var(--jd-muted)] text-center mt-3">{t.note}</p>
        </div>
      </div>
    </>
  );
}
