"use client";

import { useState } from "react";
import { ComposableMap, Geography, Marker } from "react-simple-maps";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";

// Pre-convert topojson -> geojson features at module scope so the base map
// renders on the server too (no client-only flash, no runtime fetch).
const WORLD_FEATURES = (
  feature(worldData as any, (worldData as any).objects.countries) as any
).features as any[];

interface CustomerMapProps {
  kicker: string;
  title: string;
  subtitle: string;
  countries: Record<string, string>;
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

// code -> region key lookup
const CODE_TO_REGION: Record<string, string> = REGION_GROUPS.reduce(
  (acc, rg) => {
    rg.codes.forEach((c) => (acc[c] = rg.key));
    return acc;
  },
  {} as Record<string, string>
);

// Approximate [longitude, latitude] for each market — used to place map markers
const COORDS: Record<string, [number, number]> = {
  GB: [-1.5, 52.5],
  DE: [10.4, 51.1],
  FR: [2.3, 46.6],
  BE: [4.5, 50.6],
  ES: [-3.7, 40.3],
  PL: [19.1, 52.1],
  RO: [24.9, 45.9],
  SE: [15.5, 62.0],
  RU: [50.0, 57.0],
  BY: [27.9, 53.7],
  UA: [31.2, 49.0],
  KZ: [66.9, 48.0],
  UZ: [64.6, 41.4],
  KG: [74.8, 41.4],
  TM: [59.6, 39.1],
  TJ: [71.3, 38.9],
  GE: [43.4, 42.3],
  AM: [45.0, 40.3],
  AZ: [47.6, 40.4],
  TR: [35.2, 39.0],
  DZ: [2.6, 28.2],
  LY: [17.2, 27.0],
  AR: [-64.0, -38.4],
  MN: [103.8, 46.9],
};

export default function CustomerMap({ kicker, title, subtitle, countries }: CustomerMapProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <section className="bg-[#FFF7ED] text-[#1E293B] py-24 px-6 lg:px-14 overflow-hidden">
      {/* Header */}
      <div className="max-w-4xl mb-10">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.3em] font-extrabold text-sm mb-5">{kicker}</p>
        <h2 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight">{title}</h2>
        <p className="mt-5 text-[#64748B] text-lg leading-relaxed max-w-2xl">{subtitle}</p>
      </div>

      {/* Stat + interactive region pills */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 mb-8">
        <div className="flex items-baseline gap-3 shrink-0">
          <span className="text-7xl lg:text-8xl font-black text-[var(--jd-red)] leading-none select-none">24</span>
          <span className="text-2xl font-black text-[#1E293B]/40 leading-none">+</span>
          <span className="ml-3 text-[#1E293B]/60 text-sm font-semibold uppercase tracking-widest">Export<br />Markets</span>
        </div>
        {/* Region pills — hover/tap to light up that region's countries on the map */}
        <div className="flex flex-wrap gap-3">
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
                <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? "bg-white" : "bg-[var(--jd-red)]"}`} />
                {rg.label}
                <span className={`ml-1 font-black ${isActive ? "text-white" : "text-[var(--jd-red)]"}`}>
                  {rg.codes.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* World map — markers light up per hovered region */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-[#F1E7DC] bg-white shadow-[0_8px_40px_rgba(30,41,59,0.07)]">
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 175, center: [25, 18] }}
          width={900}
          height={440}
          style={{ width: "100%", height: "auto" }}
        >
          {WORLD_FEATURES.map((geo, i) => (
            <Geography
              key={i}
              geography={geo}
              fill="#FBEFE2"
              stroke="#F1E7DC"
              strokeWidth={0.5}
              style={{
                default: { outline: "none" },
                hover: { outline: "none", fill: "#FBEFE2" },
                pressed: { outline: "none" },
              }}
            />
          ))}

          {COUNTRY_CODES.map((code) => {
            const coords = COORDS[code];
            if (!coords) return null;
            const inActiveRegion = activeRegion !== null && CODE_TO_REGION[code] === activeRegion;
            const dimmed = activeRegion !== null && !inActiveRegion;
            const r = inActiveRegion ? 6 : 3.2;
            const fill = dimmed ? "#F0C9A8" : "var(--jd-red)";
            const name = countries[code] ?? code;
            return (
              <Marker key={code} coordinates={coords}>
                {inActiveRegion && (
                  <circle r={12} fill="var(--jd-red)" opacity={0.18}>
                    <animate attributeName="r" values="8;14;8" dur="1.6s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  r={r}
                  fill={fill}
                  stroke="#fff"
                  strokeWidth={inActiveRegion ? 1.5 : 0.8}
                  style={{ transition: "all 0.2s ease" }}
                />
                {inActiveRegion && (
                  <text
                    textAnchor="middle"
                    y={-12}
                    style={{
                      fontFamily: "inherit",
                      fontSize: 11,
                      fontWeight: 800,
                      fill: "#1E293B",
                      paintOrder: "stroke",
                      stroke: "#fff",
                      strokeWidth: 3,
                    }}
                  >
                    {name}
                  </text>
                )}
              </Marker>
            );
          })}
        </ComposableMap>

        {/* Hint */}
        <p className="absolute bottom-3 right-4 text-xs text-[#1E293B]/40 font-medium pointer-events-none">
          {activeRegion ? "" : "↑ Hover a region to light up its markets"}
        </p>
      </div>
    </section>
  );
}
