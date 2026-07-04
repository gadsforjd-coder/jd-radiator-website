"use client";

import { useState } from "react";
import { geoEqualEarth, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";

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
  "GE", "AM", "AZ", "TR", "SY",
  // Africa
  "DZ", "LY",
  // Other
  "AR", "MN",
];

const REGION_GROUPS: { key: string; label: string; codes: string[] }[] = [
  { key: "europe", label: "Europe", codes: ["GB", "DE", "FR", "BE", "ES", "PL", "RO", "SE"] },
  { key: "cis", label: "CIS / Central Asia", codes: ["RU", "BY", "UA", "KZ", "UZ", "KG", "TM", "TJ"] },
  { key: "mideast", label: "Caucasus & Middle East", codes: ["GE", "AM", "AZ", "TR", "SY"] },
  { key: "africa", label: "Africa", codes: ["DZ", "LY"] },
  { key: "other", label: "Americas & Asia", codes: ["AR", "MN"] },
];

const CODE_TO_REGION: Record<string, string> = REGION_GROUPS.reduce(
  (acc, rg) => {
    rg.codes.forEach((c) => (acc[c] = rg.key));
    return acc;
  },
  {} as Record<string, string>
);

// Approximate [longitude, latitude] for each market
const COORDS: Record<string, [number, number]> = {
  GB: [-1.5, 52.5], DE: [10.4, 51.1], FR: [2.3, 46.6], BE: [4.5, 50.6],
  ES: [-3.7, 40.3], PL: [19.1, 52.1], RO: [24.9, 45.9], SE: [15.5, 62.0],
  RU: [50.0, 57.0], BY: [27.9, 53.7], UA: [31.2, 49.0], KZ: [66.9, 48.0],
  UZ: [64.6, 41.4], KG: [74.8, 41.4], TM: [59.6, 39.1], TJ: [71.3, 38.9],
  GE: [43.4, 42.3], AM: [45.0, 40.3], AZ: [47.6, 40.4], TR: [35.2, 39.0],
  SY: [38.5, 35.0], DZ: [2.6, 28.2], LY: [17.2, 27.0], AR: [-64.0, -38.4],
  MN: [103.8, 46.9],
};

// ISO 3166-1 numeric id (matches world-atlas feature ids) -> our alpha-2 code
const NUMERIC_TO_CODE: Record<number, string> = {
  826: "GB", 276: "DE", 250: "FR", 56: "BE", 724: "ES", 616: "PL", 642: "RO", 752: "SE",
  643: "RU", 112: "BY", 804: "UA", 398: "KZ", 860: "UZ", 417: "KG", 795: "TM", 762: "TJ",
  268: "GE", 51: "AM", 31: "AZ", 792: "TR", 760: "SY", 12: "DZ", 434: "LY", 32: "AR", 496: "MN",
};

// Export hub (JIUDING, China) — origin for the trade-route arcs
const HUB: [number, number] = [114.5, 34.5];

// --- Map geometry (computed once, at module load) ---
const MAP_W = 900;
const MAP_H = 470;
const projection = geoEqualEarth()
  .scale(178)
  .center([25, 18])
  .translate([MAP_W / 2, MAP_H / 2]);
const pathGen = geoPath(projection);
const WORLD_FEATURES = (
  feature(worldData as any, (worldData as any).objects.countries) as any
).features as any[];
const LAND_PATHS: string[] = WORLD_FEATURES.map((f) => pathGen(f) || "").filter(Boolean);
const GRATICULE_PATH: string = pathGen(geoGraticule10()) || "";

// Per-market country outline (for region highlight fills)
const COUNTRY_SHAPES: { code: string; region: string; d: string }[] = WORLD_FEATURES.flatMap(
  (f) => {
    const code = NUMERIC_TO_CODE[Number(f.id)];
    if (!code) return [];
    const d = pathGen(f);
    if (!d) return [];
    return [{ code, region: CODE_TO_REGION[code], d }];
  }
);

// Build a gently-curved trade-route arc from HUB to a destination point
function arcPath(from: [number, number], to: [number, number]): string {
  const [x0, y0] = from;
  const [x1, y1] = to;
  const mx = (x0 + x1) / 2;
  const my = (y0 + y1) / 2;
  const dx = x1 - x0;
  const dy = y1 - y0;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  // lift the control point perpendicular to the chord for a smooth curve
  const lift = Math.min(dist * 0.22, 90);
  const cx = mx - (dy / dist) * lift;
  const cy = my - (dx / dist) * lift;
  return `M ${x0} ${y0} Q ${cx} ${cy} ${x1} ${y1}`;
}

const HUB_PT = projection(HUB) as [number, number];
const ARCS: { code: string; region: string; d: string }[] = COUNTRY_CODES.flatMap((code) => {
  const c = COORDS[code];
  if (!c) return [];
  const p = projection(c);
  if (!p) return [];
  return [{ code, region: CODE_TO_REGION[code], d: arcPath(HUB_PT, p as [number, number]) }];
});

export default function CustomerMap({ kicker, title, subtitle, countries }: CustomerMapProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  const hasFocus = activeRegion !== null || hoveredCode !== null;

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
          <span className="text-7xl lg:text-8xl font-black text-[var(--jd-red)] leading-none select-none">
            {COUNTRY_CODES.length}
          </span>
          <span className="text-2xl font-black text-[#1E293B]/40 leading-none">+</span>
          <span className="ml-3 text-[#1E293B]/60 text-sm font-semibold uppercase tracking-widest">Export<br />Markets</span>
        </div>
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

      {/* World map — real geography, ocean + graticule, trade-route arcs, per-market markers */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-[#DCE6F0] shadow-[0_8px_40px_rgba(30,41,59,0.10)]">
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} style={{ width: "100%", height: "auto", display: "block" }}>
          <defs>
            {/* Ocean gradient */}
            <radialGradient id="ocean" cx="46%" cy="40%" r="75%">
              <stop offset="0%" stopColor="#EAF3FB" />
              <stop offset="55%" stopColor="#D6E6F5" />
              <stop offset="100%" stopColor="#BFD6EC" />
            </radialGradient>
            {/* Land gradient (warm neutral, classic-map feel) */}
            <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F2ECDD" />
              <stop offset="100%" stopColor="#E4DAC4" />
            </linearGradient>
            {/* Soft glow for active markers */}
            <filter id="glow" x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="3.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ocean */}
          <rect x={0} y={0} width={MAP_W} height={MAP_H} fill="url(#ocean)" />

          {/* Graticule (lat/long grid) */}
          <path d={GRATICULE_PATH} fill="none" stroke="#9FBFDD" strokeWidth={0.5} strokeOpacity={0.4} />

          {/* Land */}
          <g>
            {LAND_PATHS.map((d, i) => (
              <path key={i} d={d} fill="url(#land)" stroke="#C7B79A" strokeWidth={0.5} strokeLinejoin="round" />
            ))}
          </g>

          {/* Highlighted country fills (active region or hovered market) */}
          <g>
            {COUNTRY_SHAPES.map((s) => {
              const on = (activeRegion !== null && s.region === activeRegion) || hoveredCode === s.code;
              if (!on) return null;
              return (
                <path
                  key={`hl-${s.code}`}
                  d={s.d}
                  fill="var(--jd-red)"
                  fillOpacity={hoveredCode === s.code ? 0.32 : 0.22}
                  stroke="var(--jd-red)"
                  strokeWidth={0.9}
                  strokeOpacity={0.7}
                  style={{ transition: "fill-opacity 0.2s ease" }}
                />
              );
            })}
          </g>

          {/* Trade-route arcs from the export hub */}
          <g fill="none" strokeLinecap="round">
            {ARCS.map((a) => {
              const on = (activeRegion !== null && a.region === activeRegion) || hoveredCode === a.code;
              return (
                <path
                  key={`arc-${a.code}`}
                  d={a.d}
                  stroke="var(--jd-red)"
                  strokeWidth={on ? 1.6 : 0.7}
                  strokeOpacity={on ? 0.75 : hasFocus ? 0.06 : 0.16}
                  strokeDasharray={on ? "5 5" : undefined}
                  style={{ transition: "stroke-opacity 0.25s ease, stroke-width 0.25s ease" }}
                >
                  {on && (
                    <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.9s" repeatCount="indefinite" />
                  )}
                </path>
              );
            })}
          </g>

          {/* Hub marker */}
          <g transform={`translate(${HUB_PT[0]},${HUB_PT[1]})`}>
            <circle r={5} fill="#B45309" stroke="#fff" strokeWidth={1.4} />
            <circle r={9} fill="none" stroke="#B45309" strokeOpacity={0.35} strokeWidth={1}>
              <animate attributeName="r" values="6;13;6" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Market markers */}
          {COUNTRY_CODES.map((code) => {
            const coords = COORDS[code];
            if (!coords) return null;
            const p = projection(coords);
            if (!p) return null;
            const [x, y] = p;
            const isHover = hoveredCode === code;
            const inRegion = activeRegion !== null && CODE_TO_REGION[code] === activeRegion;
            const dimmed = hasFocus && !inRegion && !isHover;
            const lit = inRegion || isHover;
            const r = isHover ? 6.5 : inRegion ? 5.5 : 3.6;
            return (
              <g
                key={code}
                transform={`translate(${x},${y})`}
                opacity={dimmed ? 0.4 : 1}
                style={{ transition: "opacity 0.2s ease", cursor: "pointer" }}
                onMouseEnter={() => setHoveredCode(code)}
                onMouseLeave={() => setHoveredCode((prev) => (prev === code ? null : prev))}
              >
                {lit && (
                  <circle r={12} fill="var(--jd-red)" opacity={0.16}>
                    <animate attributeName="r" values="8;15;8" dur="1.6s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  r={r}
                  fill={dimmed ? "#B9A78E" : "var(--jd-red)"}
                  stroke="#fff"
                  strokeWidth={lit ? 1.8 : 0.9}
                  filter={lit ? "url(#glow)" : undefined}
                  style={{ transition: "r 0.15s ease" }}
                />
                {/* invisible larger hit-area for easier hovering */}
                <circle r={11} fill="transparent" />
              </g>
            );
          })}

          {/* Single hovered tooltip (rendered last → always on top, never crowded) */}
          {hoveredCode &&
            (() => {
              const p = projection(COORDS[hoveredCode]);
              if (!p) return null;
              const [x, y] = p;
              const name = countries[hoveredCode] ?? hoveredCode;
              const w = Math.max(40, name.length * 7.2 + 20);
              const h = 22;
              return (
                <g transform={`translate(${x},${y})`} style={{ pointerEvents: "none" }}>
                  <rect
                    x={-w / 2}
                    y={-h - 14}
                    width={w}
                    height={h}
                    rx={11}
                    fill="#1E293B"
                    opacity={0.94}
                  />
                  <path d={`M -5 ${-14} L 0 ${-8} L 5 ${-14} Z`} fill="#1E293B" opacity={0.94} />
                  <text
                    x={0}
                    y={-h - 14 + h / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{ fontFamily: "inherit", fontSize: 12, fontWeight: 700, fill: "#fff" }}
                  >
                    {name}
                  </text>
                </g>
              );
            })()}
        </svg>
        <p className="absolute bottom-3 right-4 text-xs text-[#1E293B]/45 font-medium pointer-events-none">
          {hasFocus ? "" : "↑ Hover a region, or point at any marker"}
        </p>
      </div>
    </section>
  );
}
