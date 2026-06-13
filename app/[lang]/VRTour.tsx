"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type VRStrings = {
  kicker: string;
  title: string;
  subtitle: string;
  enter: string;
  openNew: string;
  close: string;
};

export function VRTour({ url, t }: { url: string; t: VRStrings }) {
  const [open, setOpen] = useState(false);

  // Lock body scroll + close on Escape while the tour is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section className="py-24 px-6 lg:px-14 bg-[#FFF7ED]">
      <div className="max-w-3xl mb-12">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{t.kicker}</p>
        <h2 className="text-4xl lg:text-6xl font-black text-[#1E293B] leading-tight tracking-tight">{t.title}</h2>
        <p className="text-[#64748B] leading-relaxed mt-5 text-lg">{t.subtitle}</p>
      </div>

      {/* Cover card — click to open the immersive tour */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.enter}
        className="group relative block w-full overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(30,41,59,0.12)] border border-[#F1E7DC]"
      >
        <div className="relative h-[340px] lg:h-[460px]">
          <Image
            src="/assets/ai-images/about-factory-aerial.png"
            alt={t.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/70 via-[#1E293B]/20 to-transparent" />
        </div>
        {/* Centered play / 360 badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          <span className="flex items-center justify-center w-20 h-20 rounded-full bg-[var(--jd-orange)] text-white shadow-[0_8px_30px_rgba(234,88,12,0.5)] transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="inline-flex items-center gap-2 px-7 h-14 bg-white/95 text-[var(--jd-orange)] font-extrabold rounded-full text-base shadow-lg group-hover:bg-white transition-colors">
            <span className="text-xl font-black tracking-tight">360°</span>
            {t.enter}
          </span>
        </div>
      </button>

      {/* Immersive modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.title}
          className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex flex-col"
        >
          <div className="flex items-center justify-between px-5 py-3 shrink-0">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
              {t.openNew}
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="flex items-center gap-2 text-white/90 hover:text-white font-semibold text-sm transition-colors"
            >
              {t.close}
              <span className="text-2xl leading-none">&times;</span>
            </button>
          </div>
          <div className="flex-1 px-3 pb-3 lg:px-5 lg:pb-5 min-h-0">
            <iframe
              src={url}
              title={t.title}
              className="w-full h-full rounded-xl border-0 bg-black"
              allow="fullscreen; accelerometer; gyroscope; magnetometer; xr-spatial-tracking; vr"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
