"use client";

import { useState, useEffect } from "react";
import { geoEqualEarth, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";

interface CustomerMapProps {
  lang?: string;
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

// Approximate [longitude, latitude] for each market (label / card / arc anchor)
const COORDS: Record<string, [number, number]> = {
  GB: [-1.5, 52.5], DE: [10.4, 51.1], FR: [2.3, 46.6], BE: [4.5, 50.6],
  ES: [-3.7, 40.3], PL: [19.1, 52.1], RO: [24.9, 45.9], SE: [15.5, 62.0],
  RU: [50.0, 57.0], BY: [27.9, 53.7], UA: [31.2, 49.0], KZ: [66.9, 48.0],
  UZ: [64.6, 41.4], KG: [74.8, 41.4], TM: [59.6, 39.1], TJ: [71.3, 38.9],
  GE: [43.4, 42.3], AM: [45.0, 40.3], AZ: [47.6, 40.4], TR: [35.2, 39.0],
  SY: [38.5, 35.0], DZ: [2.6, 28.2], LY: [17.2, 27.0], AR: [-64.0, -38.4],
  MN: [103.8, 46.9],
};

// IANA timezone per market (DST handled automatically by Intl)
const TIMEZONES: Record<string, string> = {
  GB: "Europe/London", DE: "Europe/Berlin", FR: "Europe/Paris", BE: "Europe/Brussels",
  ES: "Europe/Madrid", PL: "Europe/Warsaw", RO: "Europe/Bucharest", SE: "Europe/Stockholm",
  RU: "Europe/Moscow", BY: "Europe/Minsk", UA: "Europe/Kyiv", KZ: "Asia/Almaty",
  UZ: "Asia/Tashkent", KG: "Asia/Bishkek", TM: "Asia/Ashgabat", TJ: "Asia/Dushanbe",
  GE: "Asia/Tbilisi", AM: "Asia/Yerevan", AZ: "Asia/Baku", TR: "Europe/Istanbul",
  SY: "Asia/Damascus", DZ: "Africa/Algiers", LY: "Africa/Tripoli",
  AR: "America/Argentina/Buenos_Aires", MN: "Asia/Ulaanbaatar",
};

const BEIJING_OFFSET = 8; // UTC+8, no DST

// i18n for the info-card labels
const I18N: Record<string, { time: string; diff: string; temp: string; loading: string; sync: string; hint: string; swipe: string; ahead: (n: number) => string; behind: (n: number) => string }> = {
  zh: {
    time: "当地时间", diff: "距北京", temp: "当地气温", loading: "获取中…", sync: "与北京同步",
    hint: "点按或悬停任一国家板块，查看当地时间与气温", swipe: "← 左右滑动查看完整地图 →",
    ahead: (n) => `早 ${n} 小时`, behind: (n) => `晚 ${n} 小时`,
  },
  en: {
    time: "Local time", diff: "vs Beijing", temp: "Temperature", loading: "loading…", sync: "same as Beijing",
    hint: "Tap or hover any country block for local time & weather", swipe: "← Swipe to see the full map →",
    ahead: (n) => `+${n}h ahead`, behind: (n) => `−${n}h behind`,
  },
  ru: {
    time: "Местное время", diff: "к Пекину", temp: "Температура", loading: "загрузка…", sync: "как в Пекине",
    hint: "Нажмите или наведите на страну — местное время и погода", swipe: "← Проведите, чтобы увидеть всю карту →",
    ahead: (n) => `+${n} ч`, behind: (n) => `−${n} ч`,
  },
};

const INTL_LOCALE: Record<string, string> = { zh: "zh-CN", en: "en-US", ru: "ru-RU", de: "de-DE", tr: "tr-TR" };

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
const MAP_H = 476;
const projection = geoEqualEarth()
  .scale(196)
  .center([12, 32])
  .translate([MAP_W / 2, MAP_H / 2]);
const pathGen = geoPath(projection);
const WORLD_FEATURES = (
  feature(worldData as any, (worldData as any).objects.countries) as any
).features as any[];
const LAND_PATHS: string[] = WORLD_FEATURES.map((f) => pathGen(f) || "").filter(Boolean);
const GRATICULE_PATH: string = pathGen(geoGraticule10()) || "";

// Per-market country outline path (for the coloured "blocks")
const CODE_TO_PATH: Record<string, string> = {};
WORLD_FEATURES.forEach((f) => {
  const code = NUMERIC_TO_CODE[Number(f.id)];
  if (!code) return;
  const d = pathGen(f);
  if (d) CODE_TO_PATH[code] = d;
});

// Build a gently-curved trade-route arc from HUB to a destination point
function arcPath(from: [number, number], to: [number, number]): string {
  const [x0, y0] = from;
  const [x1, y1] = to;
  const mx = (x0 + x1) / 2;
  const my = (y0 + y1) / 2;
  const dx = x1 - x0;
  const dy = y1 - y0;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const lift = Math.min(dist * 0.22, 90);
  const cx = mx - (dy / dist) * lift;
  const cy = my - (dx / dist) * lift;
  return `M ${x0} ${y0} Q ${cx} ${cy} ${x1} ${y1}`;
}

const HUB_PT = projection(HUB) as [number, number];
const PT: Record<string, [number, number]> = {}; // projected market anchor points
COUNTRY_CODES.forEach((code) => {
  const p = projection(COORDS[code]);
  if (p) PT[code] = p as [number, number];
});

// Label positions — nudged into surrounding sea/space for the dense European
// cluster so names don't pile up; other markets label on their anchor point.
const LABEL_COORDS: Record<string, [number, number]> = {
  GB: [-8, 57.5], FR: [-4.5, 45.0], BE: [1.5, 53.5], DE: [11.5, 53.8],
  ES: [-7.5, 39.0], PL: [22.5, 54.0], RO: [28.0, 44.5], SE: [16.5, 64.5],
  UA: [33.5, 49.5], BY: [28.5, 55.5],
};
const LABEL_PT: Record<string, [number, number]> = {};
COUNTRY_CODES.forEach((code) => {
  const p = projection(LABEL_COORDS[code] ?? COORDS[code]);
  if (p) LABEL_PT[code] = p as [number, number];
});
const ARCS: { code: string; region: string; d: string }[] = COUNTRY_CODES.flatMap((code) => {
  if (!PT[code]) return [];
  return [{ code, region: CODE_TO_REGION[code], d: arcPath(HUB_PT, PT[code]) }];
});

// Coordinate labels (degrees) — over open ocean so they don't clutter land
const LAT_LABELS = [60, 30, 0, -30].flatMap((lat) => {
  const p = projection([-30, lat]);
  if (!p) return [];
  const txt = lat === 0 ? "0°" : `${Math.abs(lat)}°${lat > 0 ? "N" : "S"}`;
  return [{ x: p[0], y: p[1], txt }];
});
const LON_LABELS = [-90, -30, 30, 90, 150].flatMap((lon) => {
  const p = projection([lon, -18]);
  if (!p) return [];
  const txt = lon === 0 ? "0°" : `${Math.abs(lon)}°${lon > 0 ? "E" : "W"}`;
  return [{ x: p[0], y: p[1], txt }];
});

// UTC offset (hours) for an IANA tz at a given instant, DST-aware
function offsetHours(tz: string, at: Date): number {
  try {
    const name = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset" })
      .formatToParts(at)
      .find((p) => p.type === "timeZoneName")?.value;
    if (!name) return 0;
    const m = name.match(/GMT([+-]?\d{1,2})(?::(\d{2}))?/);
    if (!m) return 0;
    const h = parseInt(m[1], 10);
    const min = m[2] ? parseInt(m[2], 10) / 60 : 0;
    return h + (h < 0 ? -min : min);
  } catch {
    return 0;
  }
}

export default function CustomerMap({ lang = "en", kicker, title, subtitle, countries }: CustomerMapProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [weather, setWeather] = useState<Record<string, { t: number | null; loading: boolean }>>({});

  const hasFocus = activeRegion !== null || hoveredCode !== null;
  const t = I18N[lang] ?? I18N.en;
  const intlLocale = INTL_LOCALE[lang] ?? "en-US";

  // Tick the clock every second while a block is hovered
  useEffect(() => {
    if (!hoveredCode) return;
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [hoveredCode]);

  // Fetch live temperature (Open-Meteo, no key) on first hover of each market; cache it
  useEffect(() => {
    if (!hoveredCode || weather[hoveredCode]) return;
    const c = COORDS[hoveredCode];
    if (!c) return;
    const code = hoveredCode;
    setWeather((w) => ({ ...w, [code]: { t: null, loading: true } }));
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c[1]}&longitude=${c[0]}&current=temperature_2m`)
      .then((r) => r.json())
      .then((j) => {
        const temp = j?.current?.temperature_2m;
        setWeather((w) => ({ ...w, [code]: { t: typeof temp === "number" ? temp : null, loading: false } }));
      })
      .catch(() => setWeather((w) => ({ ...w, [code]: { t: null, loading: false } })));
  }, [hoveredCode]); // eslint-disable-line react-hooks/exhaustive-deps

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

      {/* World map — coloured market blocks + trade-route arcs + hover info card */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-[#DCE6F0] shadow-[0_8px_40px_rgba(30,41,59,0.10)]">
        {/* Small screens: keep the map at a legible width and scroll horizontally.
            Desktop (lg+): fill the container as before. */}
        <div className="overflow-x-auto overflow-y-hidden lg:overflow-visible [-webkit-overflow-scrolling:touch]">
        <div className="relative min-w-[720px] lg:min-w-0">
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} style={{ width: "100%", height: "auto", display: "block" }}>
          <defs>
            <radialGradient id="ocean" cx="46%" cy="42%" r="78%">
              <stop offset="0%" stopColor="#EAF3FB" />
              <stop offset="55%" stopColor="#D6E6F5" />
              <stop offset="100%" stopColor="#BFD6EC" />
            </radialGradient>
            <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F2ECDD" />
              <stop offset="100%" stopColor="#E4DAC4" />
            </linearGradient>
            <linearGradient id="market" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
            <filter id="softshadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#B45309" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Ocean */}
          <rect x={0} y={0} width={MAP_W} height={MAP_H} fill="url(#ocean)" />

          {/* Graticule (lat/long grid) */}
          <path d={GRATICULE_PATH} fill="none" stroke="#8FB2D6" strokeWidth={0.55} strokeOpacity={0.5} />

          {/* Coordinate degree labels */}
          <g style={{ pointerEvents: "none" }} fill="#6E93B8" fontSize={8.5} fontWeight={600} fontFamily="inherit">
            {LAT_LABELS.map((l, i) => (
              <text key={`lat-${i}`} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="central">{l.txt}</text>
            ))}
            {LON_LABELS.map((l, i) => (
              <text key={`lon-${i}`} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="central">{l.txt}</text>
            ))}
          </g>

          {/* Base land */}
          <g style={{ pointerEvents: "none" }}>
            {LAND_PATHS.map((d, i) => (
              <path key={i} d={d} fill="url(#land)" stroke="#C7B79A" strokeWidth={0.5} strokeLinejoin="round" />
            ))}
          </g>

          {/* Trade-route arcs (kept, dashed) */}
          <g fill="none" strokeLinecap="round" style={{ pointerEvents: "none" }}>
            {ARCS.map((a) => {
              const on = (activeRegion !== null && a.region === activeRegion) || hoveredCode === a.code;
              return (
                <path
                  key={`arc-${a.code}`}
                  d={a.d}
                  stroke="var(--jd-red)"
                  strokeWidth={on ? 1.7 : 0.8}
                  strokeOpacity={on ? 0.85 : hasFocus ? 0.12 : 0.3}
                  strokeDasharray="4 4"
                  style={{ transition: "stroke-opacity 0.25s ease, stroke-width 0.25s ease" }}
                >
                  {on && (
                    <animate attributeName="stroke-dashoffset" from="16" to="0" dur="0.8s" repeatCount="indefinite" />
                  )}
                </path>
              );
            })}
          </g>

          {/* Market country blocks — coloured, always labelled, hover to highlight + card */}
          {COUNTRY_CODES.map((code) => {
            const d = CODE_TO_PATH[code];
            if (!d) return null;
            const region = CODE_TO_REGION[code];
            const isHover = hoveredCode === code;
            const inRegion = activeRegion !== null && region === activeRegion;
            const active = isHover || inRegion;
            const dim = hasFocus && !active;
            const fillOpacity = active ? 0.85 : dim ? 0.18 : 0.5;
            return (
              <path
                key={`blk-${code}`}
                d={d}
                fill="url(#market)"
                fillOpacity={fillOpacity}
                stroke={active ? "#B45309" : "#EA580C"}
                strokeWidth={active ? 1.4 : 0.7}
                strokeOpacity={dim ? 0.3 : 0.9}
                filter={isHover ? "url(#softshadow)" : undefined}
                style={{ cursor: "pointer", transition: "fill-opacity 0.2s ease, stroke-width 0.2s ease" }}
                onMouseEnter={() => setHoveredCode(code)}
                onMouseLeave={() => setHoveredCode((prev) => (prev === code ? null : prev))}
                onClick={() => setHoveredCode((prev) => (prev === code ? null : code))}
              />
            );
          })}

          {/* Hub marker (export origin — anchors the arcs) */}
          <g transform={`translate(${HUB_PT[0]},${HUB_PT[1]})`} style={{ pointerEvents: "none" }}>
            <circle r={9} fill="none" stroke="#B45309" strokeOpacity={0.35} strokeWidth={1}>
              <animate attributeName="r" values="6;13;6" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <path d="M0,-5 L1.5,-1.5 L5,-1.5 L2,1 L3,5 L0,2.5 L-3,5 L-2,1 L-5,-1.5 L-1.5,-1.5 Z" fill="#B45309" stroke="#fff" strokeWidth={0.6} />
          </g>

          {/* Thin leaders for nudged (European) labels */}
          <g style={{ pointerEvents: "none" }}>
            {COUNTRY_CODES.map((code) => {
              if (!LABEL_COORDS[code] || !PT[code] || !LABEL_PT[code]) return null;
              const isHover = hoveredCode === code;
              const inRegion = activeRegion !== null && CODE_TO_REGION[code] === activeRegion;
              const dim = hasFocus && !isHover && !inRegion;
              return (
                <line
                  key={`ld-${code}`}
                  x1={LABEL_PT[code][0]} y1={LABEL_PT[code][1]}
                  x2={PT[code][0]} y2={PT[code][1]}
                  stroke="#C2410C"
                  strokeWidth={0.5}
                  strokeOpacity={dim ? 0.15 : 0.45}
                />
              );
            })}
          </g>

          {/* Country name labels — on every block */}
          <g style={{ pointerEvents: "none" }}>
            {COUNTRY_CODES.map((code) => {
              const p = LABEL_PT[code];
              if (!p) return null;
              const isHover = hoveredCode === code;
              const inRegion = activeRegion !== null && CODE_TO_REGION[code] === activeRegion;
              const dim = hasFocus && !isHover && !inRegion;
              const name = countries[code] ?? code;
              return (
                <text
                  key={`lbl-${code}`}
                  x={p[0]}
                  y={p[1]}
                  textAnchor="middle"
                  dominantBaseline="central"
                  opacity={dim ? 0.35 : 1}
                  style={{
                    fontFamily: "inherit",
                    fontSize: isHover || inRegion ? 9.5 : 8,
                    fontWeight: 800,
                    fill: "#7C2D12",
                    paintOrder: "stroke",
                    stroke: "#FFF7ED",
                    strokeWidth: 2.4,
                    strokeLinejoin: "round",
                    transition: "opacity 0.2s ease",
                  }}
                >
                  {name}
                </text>
              );
            })}
          </g>
        </svg>

        {/* Live info card (HTML overlay) — single card, never crowded */}
        {hoveredCode &&
          PT[hoveredCode] &&
          (() => {
            const [x, y] = PT[hoveredCode];
            const leftPct = (x / MAP_W) * 100;
            const topPct = (y / MAP_H) * 100;
            const below = y < 116; // flip under the block when near the top edge
            const name = countries[hoveredCode] ?? hoveredCode;
            const tz = TIMEZONES[hoveredCode];

            let timeStr = "--:--";
            let diffStr = "";
            if (now && tz) {
              try {
                timeStr = new Intl.DateTimeFormat(intlLocale, {
                  timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false,
                }).format(now);
              } catch { /* keep placeholder */ }
              const diff = Math.round((offsetHours(tz, now) - BEIJING_OFFSET) * 10) / 10;
              diffStr = diff === 0 ? t.sync : diff > 0 ? t.ahead(diff) : t.behind(Math.abs(diff));
            }

            const wx = weather[hoveredCode];
            const tempStr = !wx || wx.loading ? t.loading : wx.t === null ? "—" : `${Math.round(wx.t)}°C`;

            return (
              <div
                className="absolute z-20 pointer-events-none"
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  transform: `translate(-50%, ${below ? "18px" : "calc(-100% - 18px)"})`,
                }}
              >
                <div className="relative rounded-xl bg-[#1E293B]/95 backdrop-blur-sm text-white shadow-[0_10px_30px_rgba(15,23,42,0.35)] px-3.5 py-2.5 min-w-[172px]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--jd-red)]" />
                    <span className="font-bold text-[13px] leading-tight">{name}</span>
                  </div>
                  <div className="space-y-0.5 text-[11.5px] leading-snug text-white/85">
                    <div className="flex justify-between gap-4">
                      <span className="text-white/55">🕐 {t.time}</span>
                      <span className="font-semibold tabular-nums">{timeStr}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-white/55">⏱ {t.diff}</span>
                      <span className="font-semibold">{diffStr}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-white/55">🌡 {t.temp}</span>
                      <span className="font-semibold tabular-nums">{tempStr}</span>
                    </div>
                  </div>
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#1E293B]/95 rotate-45"
                    style={below ? { top: -5 } : { bottom: -5 }}
                  />
                </div>
              </div>
            );
          })()}

        <p className="absolute bottom-3 right-4 text-xs text-[#1E293B]/45 font-medium pointer-events-none">
          {hasFocus ? "" : t.hint}
        </p>
        </div>
        </div>
        {/* Mobile-only swipe hint (hidden on desktop where the map fits) */}
        <p className="lg:hidden absolute top-3 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded-full bg-[#1E293B]/70 text-white text-[11px] font-semibold px-3 py-1 pointer-events-none">
          {t.swipe}
        </p>
      </div>
    </section>
  );
}
