"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type CTA = { label: string; href: string };

export type HeroSlide = {
  image: string;
  kicker: string;
  title: string;
  lead: string;
  cta1: CTA;
  cta2: CTA;
  // CSS object-position for the full-bleed photo. The hero is full-screen and the
  // slide images are 16:9, so object-cover crops on narrower (e.g. 16:10 laptop)
  // viewports. Anchoring the focal point (e.g. "left center" when the product sits
  // on the left) keeps the product fully visible instead of cropped off the edge.
  // Defaults to "center".
  focal?: string;
};

const AUTO_ADVANCE_MS = 6000;

// Rotating, full-bleed hero carousel. Each slide reproduces the original static
// hero exactly (background photo + warm right-side scrim + right-aligned text
// block with two CTAs). The bottom stats strip is intentionally NOT part of this
// component — it stays pinned in page.tsx so the layout matches the old hero.
//
// Behaviour: auto-advances every 6s, pauses on hover/focus, exposes prev/next
// arrows and clickable dots, crossfades between slides, and honours
// prefers-reduced-motion (auto-advance disabled, crossfade still instant-safe).
export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const count = slides.length;

  const goTo = useCallback(
    (index: number) => setCurrent(((index % count) + count) % count),
    [count]
  );
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Respect the user's reduced-motion preference for auto-advance.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Auto-advance timer — disabled when paused, reduced-motion, or single slide.
  const currentRef = useRef(current);
  currentRef.current = current;
  useEffect(() => {
    if (paused || reducedMotion || count <= 1) return;
    const id = window.setInterval(() => {
      goTo(currentRef.current + 1);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, count, goTo]);

  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);

  return (
    <div
      className="absolute inset-0 z-0"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero highlights"
    >
      {slides.map((slide, i) => {
        const active = i === current;
        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              active ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={!active}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              // natural orientation: radiator sits on the left, clear of the right-aligned headline.
              // focal anchors the crop so the product is never cut off on narrow viewports.
              className="object-cover"
              style={{ objectPosition: slide.focal ?? "center" }}
              {...(i === 0 ? { preload: true } : {})}
              sizes="100vw"
            />
            {/* Warm scrim concentrated on the right text column, fading to a clear photo */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#431407]/80 via-[#431407]/35 to-transparent" />
            {/* Blend the hero bottom into the light page instead of black */}
            <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#FFF7ED] to-transparent" />

            <div className="relative z-10 px-6 lg:px-14 w-full pb-40 flex justify-end h-full items-center">
              <div className="animate-in max-w-3xl text-right">
                <p className="text-orange-300 uppercase tracking-[0.3em] font-extrabold text-sm mb-6">{slide.kicker}</p>
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight text-white whitespace-pre-line [text-shadow:0_2px_24px_rgba(67,20,7,0.45)]">{slide.title}</h1>
                <p className="text-xl text-white/90 leading-relaxed mt-7 max-w-2xl ml-auto [text-shadow:0_1px_12px_rgba(67,20,7,0.5)]">{slide.lead}</p>
                <div className="flex gap-4 mt-10 flex-wrap justify-end">
                  <Link href={slide.cta1.href} tabIndex={active ? 0 : -1} className="inline-flex h-14 items-center px-8 bg-[var(--jd-red)] text-white font-extrabold rounded-sm hover:bg-orange-700 transition-all hover:shadow-[0_0_30px_rgba(234,88,12,0.4)]">{slide.cta1.label}</Link>
                  <Link href={slide.cta2.href} tabIndex={active ? 0 : -1} className="inline-flex h-14 items-center px-8 border border-white/60 bg-white/10 backdrop-blur-sm text-white font-extrabold rounded-sm hover:border-white hover:bg-white/20 transition-all">{slide.cta2.label}</Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {count > 1 && (
        <>
          {/* Prev / next arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="group absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm hover:bg-black/40 hover:border-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="group absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm hover:bg-black/40 hover:border-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden><path d="m9 18 6-6-6-6" /></svg>
          </button>

          {/* Dot indicators — sit just above the stats strip */}
          <div className="absolute bottom-[120px] lg:bottom-[124px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current}
                className={`h-2.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  i === current ? "w-7 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
