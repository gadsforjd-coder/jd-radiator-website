"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Feature {
  title: string;
  desc: string;
  num: string;
}

interface StatItem {
  value: string;
  label: string;
}

interface TechBreakdownProps {
  kicker: string;
  title: string;
  subtitle: string;
  features: Feature[];
  stats?: StatItem[];
}

const featureIcons = [
  // Water Channels — droplet
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z" /></svg>,
  // Steel Body — shield
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  // Surface Coating — layers
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  // Custom Spec — cog
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
];

export default function TechBreakdown({ kicker, title, subtitle, features, stats }: TechBreakdownProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 lg:py-36 px-6 lg:px-14 bg-[#080808] overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[var(--jd-red)]/[0.04] rounded-full blur-[200px]" />

      {/* Header */}
      <div className="relative z-10 text-center mb-20">
        <p className={`text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>{kicker}</p>
        <h2 className={`text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>{title}</h2>
        <p className={`text-white/40 text-xl mt-4 max-w-2xl mx-auto transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>{subtitle}</p>
      </div>

      {/* Main layout: product image center + feature cards */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-6 items-center">
          {/* Left features */}
          <div className="flex flex-col gap-5">
            {features.slice(0, 2).map((f, i) => (
              <div
                key={f.num}
                className={`group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                  hovered === i
                    ? "border-[var(--jd-red)]/40 bg-[var(--jd-red)]/[0.06]"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
                } ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                style={{ transitionDelay: visible ? `${400 + i * 150}ms` : "0ms" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-start gap-4 lg:flex-row-reverse lg:text-right">
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    hovered === i ? "bg-[var(--jd-red)] text-white" : "bg-white/[0.06] text-white/40"
                  }`}>
                    {featureIcons[i]}
                  </div>
                  <div className="flex-1">
                    <span className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block transition-colors duration-300 ${
                      hovered === i ? "text-[var(--jd-red)]" : "text-white/25"
                    }`}>{f.num}</span>
                    <h3 className="text-white font-bold text-lg mb-1.5">{f.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
                {/* Active indicator line */}
                <div className={`absolute top-1/2 -translate-y-1/2 right-0 w-0.5 h-8 rounded-full transition-all duration-300 ${
                  hovered === i ? "bg-[var(--jd-red)] opacity-100" : "bg-transparent opacity-0"
                }`} />
              </div>
            ))}
          </div>

          {/* Center product image */}
          <div className={`relative order-first lg:order-none transition-all duration-1000 delay-300 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            {/* Glow behind product */}
            <div className={`absolute -inset-12 rounded-full transition-opacity duration-1000 ${
              hovered !== null ? "opacity-100" : "opacity-60"
            }`} style={{
              background: "radial-gradient(ellipse at center, rgba(230,0,18,0.12) 0%, rgba(230,0,18,0.04) 40%, transparent 70%)"
            }} />

            {/* Product container */}
            <div className="relative w-[280px] h-[400px] lg:w-[340px] lg:h-[480px] mx-auto">
              {/* Subtle ring */}
              <div className="absolute -inset-3 rounded-2xl border border-white/[0.04]" />

              {/* The actual product photo */}
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/assets/products/jdgz3/hero.jpg"
                  alt="JD Column Radiator"
                  fill
                  className={`object-cover transition-all duration-700 ${
                    hovered !== null ? "scale-105 brightness-110" : "scale-100 brightness-100"
                  }`}
                  sizes="340px"
                  priority
                />
                {/* Very subtle bottom fade for blending */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080808] to-transparent" />
                <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#080808]/60 to-transparent" />
              </div>

              {/* Floating hotspot indicators on the image */}
              {[
                { top: "18%", x: "20%", side: "left" as const, idx: 0 },
                { top: "18%", x: "15%", side: "right" as const, idx: 1 },
                { top: "65%", x: "22%", side: "left" as const, idx: 2 },
                { top: "65%", x: "18%", side: "right" as const, idx: 3 },
              ].map((pos) => (
                <div
                  key={pos.idx}
                  className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${
                    hovered === pos.idx
                      ? "bg-white scale-150 shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                      : "bg-[var(--jd-red)]/60 scale-100 animate-pulse"
                  }`}
                  style={{ top: pos.top, [pos.side]: pos.x }}
                />
              ))}
            </div>
          </div>

          {/* Right features */}
          <div className="flex flex-col gap-5">
            {features.slice(2, 4).map((f, i) => (
              <div
                key={f.num}
                className={`group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                  hovered === i + 2
                    ? "border-[var(--jd-red)]/40 bg-[var(--jd-red)]/[0.06]"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
                } ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                style={{ transitionDelay: visible ? `${400 + (i + 2) * 150}ms` : "0ms" }}
                onMouseEnter={() => setHovered(i + 2)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    hovered === i + 2 ? "bg-[var(--jd-red)] text-white" : "bg-white/[0.06] text-white/40"
                  }`}>
                    {featureIcons[i + 2]}
                  </div>
                  <div className="flex-1">
                    <span className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block transition-colors duration-300 ${
                      hovered === i + 2 ? "text-[var(--jd-red)]" : "text-white/25"
                    }`}>{f.num}</span>
                    <h3 className="text-white font-bold text-lg mb-1.5">{f.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
                {/* Active indicator line */}
                <div className={`absolute top-1/2 -translate-y-1/2 left-0 w-0.5 h-8 rounded-full transition-all duration-300 ${
                  hovered === i + 2 ? "bg-[var(--jd-red)] opacity-100" : "bg-transparent opacity-0"
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      {stats && stats.length > 0 && (
        <div className={`relative z-10 max-w-5xl mx-auto mt-24 transition-all duration-700 delay-[800ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/[0.06] rounded-2xl bg-white/[0.02] backdrop-blur-sm">
            {stats.map((s, i) => (
              <div key={i} className={`py-7 px-8 text-center ${i < stats.length - 1 ? "lg:border-r border-white/[0.06]" : ""} ${i < 2 ? "border-b lg:border-b-0 border-white/[0.06]" : ""}`}>
                <strong className="block text-2xl lg:text-3xl text-[var(--jd-red)] font-black">{s.value}</strong>
                <span className="text-white/40 text-xs mt-1.5 block tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
