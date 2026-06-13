"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";

const labels: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  mn: "Монгол",
  es: "Español",
  zh: "中文",
};

export function LangSwitcher({ current }: { current: Locale }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchTo(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold border border-[var(--jd-red)] text-[var(--jd-red)] hover:bg-[var(--jd-red)]/5 transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current opacity-70"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
        {current.toUpperCase()}
        <svg viewBox="0 0 12 12" className={`w-3 h-3 fill-current transition-transform ${open ? "rotate-180" : ""}`}><path d="M2 4l4 4 4-4"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden min-w-[160px] z-50">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchTo(l)}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between ${
                l === current
                  ? "bg-[var(--jd-red)]/5 text-[var(--jd-red)]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>{labels[l]}</span>
              <span className="text-xs text-gray-400 font-bold">{l.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
