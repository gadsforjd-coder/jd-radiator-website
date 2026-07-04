"use client";

import { useState } from "react";

interface Country {
  code: string;
  name: string;
  flag: string;
  region: string;
}

interface CustomerMapProps {
  kicker: string;
  title: string;
  subtitle: string;
  countries: Record<string, string>;
}

// Country flag emojis derived from ISO-3166-1 alpha-2 codes
function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

const COUNTRY_CODES = [
  // Europe
  "GB", "DE", "FR", "BE", "ES", "PL", "RO", "SE",
  // CIS / Central Asia
  "RU", "BY", "UA", "KZ", "UZ", "KG", "TM", "TJ",
  // Caucasus / Mideast
  "GE", "AM", "AZ", "TR",
  // Africa
  "DZ", "LY",
  // Other
  "AR", "MN",
];

const REGION_GROUPS: { key: string; label: string; codes: string[] }[] = [
  { key: "europe", label: "Europe", codes: ["GB", "DE", "FR", "BE", "ES", "PL", "RO", "SE"] },
  { key: "cis", label: "CIS / Central Asia", codes: ["RU", "BY", "UA", "KZ", "UZ", "KG", "TM", "TJ"] },
  { key: "mideast", label: "Caucasus & Middle East", codes: ["GE", "AM", "AZ", "TR"] },
  { key: "africa", label: "Africa", codes: ["DZ", "LY"] },
  { key: "other", label: "Americas & Asia", codes: ["AR", "MN"] },
];

// code -> region key lookup, so hovering a region can highlight its flags
const CODE_TO_REGION: Record<string, string> = REGION_GROUPS.reduce(
  (acc, rg) => {
    rg.codes.forEach((c) => (acc[c] = rg.key));
    return acc;
  },
  {} as Record<string, string>
);

export default function CustomerMap({ kicker, title, subtitle, countries }: CustomerMapProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <section className="bg-[#FFF7ED] text-[#1E293B] py-24 px-6 lg:px-14 overflow-hidden">
      {/* Header */}
      <div className="max-w-4xl mb-14">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{kicker}</p>
        <h2 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight">{title}</h2>
        <p className="mt-5 text-[#64748B] text-lg leading-relaxed max-w-2xl">{subtitle}</p>
      </div>

      {/* Stylised world-map dot grid — pure CSS, no library */}
      <div
        className="relative w-full rounded-2xl overflow-hidden border border-[#F1E7DC] shadow-[0_8px_40px_rgba(30,41,59,0.07)] mb-12"
        style={{ minHeight: 220 }}
      >
        {/* Dot-grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #EA580C22 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            backgroundPosition: "0 0",
          }}
        />
        {/* Warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-[#FFF7ED]/60 to-[#FFF7ED]/80" />

        {/* Central stat + region labels */}
        <div className="relative z-10 flex flex-col items-center justify-center py-16 px-6 text-center gap-6">
          {/* Big number */}
          <div className="flex items-baseline gap-3">
            <span className="text-8xl lg:text-9xl font-black text-[var(--jd-red)] leading-none select-none">24</span>
            <span className="text-2xl lg:text-3xl font-black text-[#1E293B]/40 leading-none">+</span>
          </div>
          <p className="text-[#1E293B]/60 text-lg font-semibold uppercase tracking-widest">
            Export Markets
          </p>

          {/* Region pills — hover/tap to highlight that region's countries below */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {REGION_GROUPS.map((rg) => {
              const isActive = activeRegion === rg.key;
              return (
                <button
                  type="button"
                  key={rg.key}
                  onMouseEnter={() => setActiveRegion(rg.key)}
                  onMouseLeave={() => setActiveRegion(null)}
                  onFocus={() => setActiveRegion(rg.key)}
                  onBlur={() => setActiveRegion(null)}
                  onClick={() => setActiveRegion((prev) => (prev === rg.key ? null : rg.key))}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold shadow-sm cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--jd-red)] border-[var(--jd-red)] text-white shadow-[0_4px_16px_rgba(234,88,12,0.28)]"
                      : "bg-white border-[#F1E7DC] text-[#1E293B]/70 hover:border-[var(--jd-red)]/50"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${isActive ? "bg-white" : "bg-[var(--jd-red)]"}`}
                  />
                  {rg.label}
                  <span className={`ml-1 font-black ${isActive ? "text-white" : "text-[var(--jd-red)]"}`}>
                    {rg.codes.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Flag grid — all 24 countries */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {COUNTRY_CODES.map((code) => {
          const inActiveRegion = activeRegion !== null && CODE_TO_REGION[code] === activeRegion;
          const dimmed = activeRegion !== null && !inActiveRegion;
          return (
            <div
              key={code}
              className={`group flex flex-col items-center gap-2 p-3 rounded-xl bg-white border shadow-[0_2px_8px_rgba(30,41,59,0.04)] transition-all duration-200 cursor-default ${
                inActiveRegion
                  ? "border-[var(--jd-red)] shadow-[0_6px_24px_rgba(234,88,12,0.22)] -translate-y-0.5 scale-[1.03]"
                  : "border-[#F1E7DC] hover:border-[var(--jd-red)]/40 hover:shadow-[0_4px_20px_rgba(234,88,12,0.12)]"
              } ${dimmed ? "opacity-40" : "opacity-100"}`}
            >
              <span className="text-3xl leading-none select-none">{flagEmoji(code)}</span>
              <span
                className={`text-xs font-semibold text-center leading-tight transition-colors line-clamp-2 ${
                  inActiveRegion ? "text-[var(--jd-red)]" : "text-[#64748B] group-hover:text-[var(--jd-red)]"
                }`}
              >
                {countries[code] ?? code}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
