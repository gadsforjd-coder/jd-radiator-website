"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

const POPPED_KEY = "jd_contact_popped";

const SALES_EMAILS = ["kevin@jdradiator.com", "lunan@jdradiator.com"];

export type ContactWidgetStrings = {
  tab: string;
  title: string;
  emailLabel: string;
  quoteButton: string;
  note: string;
};

export function ContactWidget({ locale, t }: { locale: Locale; t: ContactWidgetStrings }) {
  const [open, setOpen] = useState(false);
  const interacted = useRef(false);

  // Auto-popup once per browser session, 3s after load — unless the user
  // already toggled the widget manually before the timer fires.
  useEffect(() => {
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
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2.5 bg-[var(--jd-orange)] text-white px-2.5 py-5 rounded-l-xl shadow-[0_4px_20px_rgba(234,88,12,0.35)] hover:bg-[var(--jd-orange-dark)] transition-all duration-300 ${
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
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 w-[320px] max-w-[85vw] bg-white rounded-l-2xl shadow-2xl border border-r-0 border-[#F1E7DC] overflow-hidden transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-[110%] pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between gap-3 bg-[var(--jd-orange)] text-white px-5 py-3.5">
          <h3 className="font-bold text-base">{t.title}</h3>
          <button
            type="button"
            onClick={() => toggle(false)}
            aria-label="Close"
            className="text-2xl leading-none -mr-1 px-1 hover:opacity-70 transition-opacity"
          >
            &times;
          </button>
        </div>
        <div className="p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--jd-muted)] mb-2">
            {t.emailLabel}
          </p>
          {SALES_EMAILS.map((email) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="flex items-center gap-3 py-2 text-sm font-semibold text-[var(--jd-dark)] hover:text-[var(--jd-orange)] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0 text-[var(--jd-orange)]">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {email}
            </a>
          ))}
          <Link
            href={`/${locale}/contact`}
            onClick={() => toggle(false)}
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
