"use client";

import { useState, useEffect, useMemo } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Graticule,
  Line,
  Marker,
} from "react-simple-maps";
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
  "AR", "MN", "AU",
];

const REGION_GROUPS: { key: string; label: string; codes: string[] }[] = [
  { key: "europe", label: "Europe", codes: ["GB", "DE", "FR", "BE", "ES", "PL", "RO", "SE"] },
  { key: "cis", label: "CIS / Central Asia", codes: ["RU", "BY", "UA", "KZ", "UZ", "KG", "TM", "TJ"] },
  { key: "mideast", label: "Caucasus & Middle East", codes: ["GE", "AM", "AZ", "TR", "SY"] },
  { key: "africa", label: "Africa", codes: ["DZ", "LY"] },
  { key: "other", label: "Americas, Asia & Oceania", codes: ["AR", "MN", "AU"] },
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
  MN: [103.8, 46.9], AU: [133.0, -25.0],
};

// IANA timezone per market (DST handled automatically by Intl)
const TIMEZONES: Record<string, string> = {
  GB: "Europe/London", DE: "Europe/Berlin", FR: "Europe/Paris", BE: "Europe/Brussels",
  ES: "Europe/Madrid", PL: "Europe/Warsaw", RO: "Europe/Bucharest", SE: "Europe/Stockholm",
  RU: "Europe/Moscow", BY: "Europe/Minsk", UA: "Europe/Kyiv", KZ: "Asia/Almaty",
  UZ: "Asia/Tashkent", KG: "Asia/Bishkek", TM: "Asia/Ashgabat", TJ: "Asia/Dushanbe",
  GE: "Asia/Tbilisi", AM: "Asia/Yerevan", AZ: "Asia/Baku", TR: "Europe/Istanbul",
  SY: "Asia/Damascus", DZ: "Africa/Algiers", LY: "Africa/Tripoli",
  AR: "America/Argentina/Buenos_Aires", MN: "Asia/Ulaanbaatar", AU: "Australia/Sydney",
};

const BEIJING_OFFSET = 8; // UTC+8, no DST

// i18n for the info-card labels
const I18N: Record<string, { time: string; diff: string; temp: string; loading: string; sync: string; hint: string; pan: string; ahead: (n: number) => string; behind: (n: number) => string }> = {
  zh: {
    time: "当地时间", diff: "距北京", temp: "当地气温", loading: "获取中…", sync: "与北京同步",
    hint: "点按或悬停任一国家板块，查看当地时间与气温", pan: "🖱 滚轮缩放 · 拖动平移",
    ahead: (n) => `早 ${n} 小时`, behind: (n) => `晚 ${n} 小时`,
  },
  en: {
    time: "Local time", diff: "vs Beijing", temp: "Temperature", loading: "loading…", sync: "same as Beijing",
    hint: "Tap or hover any country block for local time & weather", pan: "🖱 Scroll to zoom · drag to pan",
    ahead: (n) => `+${n}h ahead`, behind: (n) => `−${n}h behind`,
  },
  ru: {
    time: "Местное время", diff: "к Пекину", temp: "Температура", loading: "загрузка…", sync: "как в Пекине",
    hint: "Нажмите или наведите на страну — местное время и погода", pan: "🖱 Колёсико — масштаб · перетащите — сдвиг",
    ahead: (n) => `+${n} ч`, behind: (n) => `−${n} ч`,
  },
  es: {
    time: "Hora local", diff: "vs Pekín", temp: "Temperatura", loading: "cargando…", sync: "igual que Pekín",
    hint: "Toca o pasa el cursor sobre un país para ver la hora y el clima", pan: "🖱 Rueda para ampliar · arrastra para desplazar",
    ahead: (n) => `+${n} h`, behind: (n) => `−${n} h`,
  },
  mn: {
    time: "Орон нутгийн цаг", diff: "Бээжингээс", temp: "Агаарын темп.", loading: "ачааллаж байна…", sync: "Бээжинтэй ижил",
    hint: "Улс дээр дарж эсвэл хулгана аваачиж цаг, цаг агаарыг харна уу", pan: "🖱 Дугуйгаар томруулж · чирж зөөнө",
    ahead: (n) => `+${n} ц`, behind: (n) => `−${n} ц`,
  },
};

// Factory (headquarters) i18n — company name + localized address for the star card
const FACTORY_I18N: Record<string, { name: string; addr: string }> = {
  zh: {
    name: "天津市九鼎阳光暖通有限公司",
    addr: "天津市宁河区经济开发区五纬路9号",
  },
  en: {
    name: "Tianjin Jiuding Yangguang HVAC Co., Ltd.",
    addr: "No. 9 Wuwei Road, Economic Development Zone, Ninghe District, Tianjin, China",
  },
  ru: {
    name: "Tianjin Jiuding Yangguang HVAC Co., Ltd.",
    addr: "Китай, г. Тяньцзинь, район Нинхэ, Зона экономического развития, ул. Увэй, 9",
  },
  es: {
    name: "Tianjin Jiuding Yangguang HVAC Co., Ltd.",
    addr: "N.º 9, Calle Wuwei, Zona de Desarrollo Económico, Distrito de Ninghe, Tianjín, China",
  },
  mn: {
    name: "Tianjin Jiuding Yangguang HVAC Co., Ltd.",
    addr: "Хятад, Тяньжинь хот, Нинхэ дүүрэг, Эдийн засгийн хөгжлийн бүс, Үвэй гудамж 9",
  },
};

const INTL_LOCALE: Record<string, string> = { zh: "zh-CN", en: "en-US", ru: "ru-RU", de: "de-DE", tr: "tr-TR", es: "es-ES", mn: "mn-MN" };

// ISO 3166-1 numeric id (matches world-atlas feature ids) -> our alpha-2 code
const NUMERIC_TO_CODE: Record<number, string> = {
  826: "GB", 276: "DE", 250: "FR", 56: "BE", 724: "ES", 616: "PL", 642: "RO", 752: "SE",
  643: "RU", 112: "BY", 804: "UA", 398: "KZ", 860: "UZ", 417: "KG", 795: "TM", 762: "TJ",
  268: "GE", 51: "AM", 31: "AZ", 792: "TR", 760: "SY", 12: "DZ", 434: "LY", 32: "AR", 496: "MN", 36: "AU",
};

// Export hub (JIUDING, China) — origin for the trade-route arcs.
// Aligned to the real factory location: Tianjin, Ninghe District.
const HUB: [number, number] = [117.83, 39.33];
// Factory marker coordinate (same real point as the export hub)
const FACTORY: [number, number] = [117.83, 39.33];

// --- Flat map geometry ---
// Bigger canvas + higher projection scale so the map fills its section while
// still fitting all 26 markets (incl. Argentina & Australia) at zoom=1.
const MAP_W = 900;
const MAP_H = 600;
// Projection config passed to <ComposableMap>. We also rebuild the same
// projection locally (matching react-simple-maps' internal construction:
// geoEqualEarth().translate([W/2,H/2]).center(...).scale(...)) so that the
// HTML overlay cards can be positioned in projected screen space.
const PROJECTION_CENTER: [number, number] = [22, 20];
const PROJECTION_SCALE = 218;

// Zoom / pan ("微调") range for the flat map.
// minZoom < 1 lets users zoom OUT to reveal the whole world (incl. the two
// outlier markets Argentina & Australia, which sit OUTSIDE the default belt
// view). At the base projection the full world is ~1180px wide; at zoom 0.6
// that shrinks to ~708px, well inside the 900px frame, so nothing is clipped
// when zoomed all the way out.
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 8;
// DEFAULT view: framed TIGHTLY onto the Eurasia–Africa export belt so it fills
// the frame horizontally with minimal blank side bands (this is the fix for the
// "too much empty space on both sides" report). Spain/UK (lon ~-8) sit near the
// LEFT edge; the China factory star (lon 117.83) sits with comfortable room from
// the RIGHT & TOP edges (its nameplate card extends ~124px left / ~134px up, so
// the star must stay ~140px clear of those edges). At center=[60,36] zoom=1.9
// the star lands at ~[764,275] in the 900x600 frame (rightGap ~136, topGap ~275)
// and Spain at x~90 — balanced, minimal blank margins.
// TRADEOFF (accepted): the two southern outliers Argentina (lon -64) & Australia
// (lon 133) fall OUTSIDE this default view. Users can zoom OUT (minZoom 0.6) to
// see them, and the region pills still highlight their arcs from the hub.
const INITIAL_CENTER: [number, number] = [60, 36];
const INITIAL_ZOOM = 1.9;

// world-atlas topojson -> GeoJSON FeatureCollection (parsed once).
const GEO_FEATURES = feature(
  worldData as any,
  (worldData as any).objects.countries
) as any;

// Local projection matching the ComposableMap config, used ONLY to compute
// base (un-zoomed) screen coordinates for the HTML overlay cards.
const baseProjection = geoEqualEarth()
  .translate([MAP_W / 2, MAP_H / 2])
  .center(PROJECTION_CENTER)
  .scale(PROJECTION_SCALE);

// geoPath for the SAME projection react-simple-maps builds internally. Used to
// precompute the `svgPath` (d attribute) for the coloured market blocks below.
// react-simple-maps only fills in `svgPath` for features that pass through its
// <Geographies> render-prop; when we render a <Geography> directly from a raw
// GeoJSON feature it has NO svgPath, so its <path d> comes out EMPTY — the block
// is invisible AND has zero hit area (so the hover info-card never fires). We
// must attach svgPath ourselves, matching the projection exactly.
const basePath = geoPath(baseProjection);

// Base (un-zoomed) projected point of the factory star — used to decide whether
// the hover card has room above the star or must flip below (near the top edge).
const FACTORY_BASE = baseProjection(FACTORY) as [number, number];

// Base projected anchor points for each market (before zoom/pan transform).
const BASE_PT: Record<string, [number, number]> = {};
COUNTRY_CODES.forEach((code) => {
  const p = baseProjection(COORDS[code]);
  if (p) BASE_PT[code] = p as [number, number];
});

// Label positions — nudged into surrounding sea/space for the dense European
// cluster so names don't pile up; other markets label on their anchor point.
const LABEL_COORDS: Record<string, [number, number]> = {
  GB: [-8, 57.5], FR: [-4.5, 45.0], BE: [1.5, 53.5], DE: [11.5, 53.8],
  ES: [-7.5, 39.0], PL: [22.5, 54.0], RO: [28.0, 44.5], SE: [16.5, 64.5],
  UA: [33.5, 49.5], BY: [28.5, 55.5],
};

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

// A star marker path (shared shape) sized for the flat map.
const STAR_PATH = "M0,-8 L2.35,-2.47 L8.4,-2.47 L3.4,1.4 L5.3,7.6 L0,3.8 L-5.3,7.6 L-3.4,1.4 L-8.4,-2.47 L-2.35,-2.47 Z";

interface Transform {
  x: number;
  y: number;
  k: number;
}

interface OverlayProps {
  lang: string;
  countries: Record<string, string>;
  hoveredCode: string | null;
  now: Date | null;
  weather: Record<string, { t: number | null; loading: boolean }>;
  transform: Transform;
}

// HTML overlay card for the live country info (local time / temperature).
// Rendered as an absolutely positioned sibling of the SVG (outside it), synced
// to the live zoom/pan transform lifted up from <ZoomableGroup> via onMove.
// The SVG uses viewBox 0 0 W H, so SVG px map 1:1 onto container percentages.
// NOTE: the factory star card is intentionally NOT here — it is drawn as an
// in-SVG <foreignObject> inside the star <Marker> so it tracks the star
// perfectly and its hover/tap fires reliably even while ZoomableGroup pans.
function MapOverlays({ lang, countries, hoveredCode, now, weather, transform }: OverlayProps) {
  const { x, y, k } = transform;
  const t = I18N[lang] ?? I18N.en;
  const intlLocale = INTL_LOCALE[lang] ?? "en-US";

  // Map a base (un-zoomed) screen point through the current zoom/pan transform,
  // then to a percentage of the frame so overlays track the map.
  const toPct = (base: [number, number]) => {
    const sx = base[0] * k + x;
    const sy = base[1] * k + y;
    return { leftPct: (sx / MAP_W) * 100, topPct: (sy / MAP_H) * 100, sx, sy };
  };

  return (
    <>
      {/* Live info card — single card, never crowded */}
      {hoveredCode &&
        BASE_PT[hoveredCode] &&
        (() => {
          const { leftPct, topPct, sy } = toPct(BASE_PT[hoveredCode]);
          // Flip the card UNDER the block when the anchor sits high in the frame
          // (no room for the ~128px-tall card above it, else it clips the top edge
          // of the overflow-hidden map). At the belt framing the top-most market
          // (Sweden, sy~130) must flip; sy<140 covers it with margin.
          const below = sy < 140; // flip under the block when near the top edge
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
    </>
  );
}

// Factory star hover/tap card, drawn INSIDE the SVG as a <foreignObject> that
// lives in the star <Marker>. Because it is a child of the marker's own <g>,
// it is anchored exactly to the star at every zoom/pan state. We counter-scale
// by 1/k so the card keeps a constant on-screen size regardless of map zoom.
function FactoryCard({ lang, zoom, below }: { lang: string; zoom: number; below: boolean }) {
  const factory = FACTORY_I18N[lang] ?? FACTORY_I18N.en;
  const inv = 1 / (zoom || 1);
  const CARD_W = 248;
  const CARD_H = 118;
  return (
    <foreignObject
      // Horizontally centred, then counter-scale. Positioned ABOVE the star by
      // default, but flipped BELOW when the star is near the top of the map so
      // the card never spills past the SVG viewport and gets clipped.
      x={-CARD_W / 2}
      y={below ? 18 : -CARD_H - 16}
      width={CARD_W}
      height={CARD_H}
      transform={`scale(${inv})`}
      style={{ overflow: "visible", pointerEvents: "none" }}
    >
      <div className="relative rounded-xl bg-[#1E293B]/96 text-white shadow-[0_12px_34px_rgba(15,23,42,0.4)] px-4 py-3 w-[248px]">
        <div className="flex items-center gap-2.5 mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo.png"
            alt="Jiuding"
            width={40}
            height={40}
            className="w-10 h-10 object-contain rounded-md bg-white/95 p-1 shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[#DC2626] text-sm leading-none">★</span>
              <span className="font-bold text-[12.5px] leading-snug">{factory.name}</span>
            </div>
          </div>
        </div>
        <p className="text-[11.5px] leading-snug text-white/80 flex items-start gap-1.5">
          <span className="text-[var(--jd-red)] mt-0.5 shrink-0">📍</span>
          <span>{factory.addr}</span>
        </p>
        <div className={`absolute left-1/2 -translate-x-1/2 ${below ? "-top-[5px]" : "-bottom-[5px]"} w-2.5 h-2.5 bg-[#1E293B]/96 rotate-45`} />
      </div>
    </foreignObject>
  );
}

export default function CustomerMap({ lang = "en", kicker, title, subtitle, countries }: CustomerMapProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [factoryHover, setFactoryHover] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const [weather, setWeather] = useState<Record<string, { t: number | null; loading: boolean }>>({});

  // Live zoom/pan transform, lifted from <ZoomableGroup> so the HTML overlay
  // cards (rendered outside the SVG) can track the map. Initial value matches
  // the ComposableMap+ZoomableGroup starting position (INITIAL_ZOOM, INITIAL_CENTER).
  const [transform, setTransform] = useState<Transform>(() => {
    const c = baseProjection(INITIAL_CENTER) as [number, number];
    // Must match ZoomableGroup's actual transform at zoom k: the geographic
    // center maps to the viewport center AT scale k, i.e. translate =
    // viewportCenter − k·centerPoint. (The earlier formula omitted ·k, so on
    // initial load — before any pan fires onMove — the overlay cards and the
    // factory-card flip decision used a wrong star position.)
    return { x: MAP_W / 2 - c[0] * INITIAL_ZOOM, y: MAP_H / 2 - c[1] * INITIAL_ZOOM, k: INITIAL_ZOOM };
  });

  const hasFocus = activeRegion !== null || hoveredCode !== null;
  const t = I18N[lang] ?? I18N.en;

  // Per-market outline features (only the highlighted export markets), each with
  // a precomputed `svgPath` so <Geography> renders a real (visible + hoverable)
  // path. Without svgPath the block's <path d> is empty -> invisible & no hover.
  const marketFeatures = useMemo(() => {
    const byCode: Record<string, any> = {};
    (GEO_FEATURES.features as any[]).forEach((f) => {
      const code = NUMERIC_TO_CODE[Number(f.id)];
      if (code) byCode[code] = { ...f, svgPath: basePath(f) };
    });
    return byCode;
  }, []);

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

      {/* Flat world map — zoom/pan enabled ("微调") + market blocks + arcs + info card */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-[#DCE6F0] shadow-[0_8px_40px_rgba(30,41,59,0.10)] bg-gradient-to-b from-[#EAF3FB] via-[#D6E6F5] to-[#BFD6EC]">
        <div className="relative mx-auto" style={{ maxWidth: MAP_W }}>
          <ComposableMap
            width={MAP_W}
            height={MAP_H}
            projection="geoEqualEarth"
            projectionConfig={{ center: PROJECTION_CENTER, scale: PROJECTION_SCALE }}
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <defs>
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

            <ZoomableGroup
              center={INITIAL_CENTER}
              zoom={INITIAL_ZOOM}
              minZoom={MIN_ZOOM}
              maxZoom={MAX_ZOOM}
              onMove={(pos) => setTransform({ x: pos.x, y: pos.y, k: pos.zoom })}
            >
              {/* Graticule (lat/long grid) */}
              <Graticule stroke="#8FB2D6" strokeWidth={0.55} strokeOpacity={0.5} />

              {/* Base land */}
              <Geographies geography={GEO_FEATURES}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="url(#land)"
                      stroke="#C7B79A"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none", strokeLinejoin: "round" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                      tabIndex={-1}
                    />
                  ))
                }
              </Geographies>

              {/* Trade-route arcs (geodesic, dashed) from the factory hub */}
              <g fill="none" strokeLinecap="round" style={{ pointerEvents: "none" }}>
                {COUNTRY_CODES.map((code) => {
                  const region = CODE_TO_REGION[code];
                  const on = (activeRegion !== null && region === activeRegion) || hoveredCode === code;
                  return (
                    <Line
                      key={`arc-${code}`}
                      from={HUB}
                      to={COORDS[code]}
                      stroke="var(--jd-red)"
                      strokeWidth={on ? 1.7 : 0.8}
                      strokeOpacity={on ? 0.85 : hasFocus ? 0.12 : 0.3}
                      strokeDasharray="4 4"
                      style={{ transition: "stroke-opacity 0.25s ease, stroke-width 0.25s ease" } as any}
                    />
                  );
                })}
              </g>

              {/* Market country blocks — coloured, hover to highlight + card */}
              {COUNTRY_CODES.map((code) => {
                const geo = marketFeatures[code];
                if (!geo) return null;
                const region = CODE_TO_REGION[code];
                const isHover = hoveredCode === code;
                const inRegion = activeRegion !== null && region === activeRegion;
                const active = isHover || inRegion;
                const dim = hasFocus && !active;
                const fillOpacity = active ? 0.85 : dim ? 0.18 : 0.5;
                return (
                  <Geography
                    key={`blk-${code}`}
                    geography={geo}
                    fill="url(#market)"
                    fillOpacity={fillOpacity}
                    stroke={active ? "#B45309" : "#EA580C"}
                    strokeWidth={active ? 1.4 : 0.7}
                    strokeOpacity={dim ? 0.3 : 0.9}
                    filter={isHover ? "url(#softshadow)" : undefined}
                    style={{
                      default: { outline: "none", cursor: "pointer", transition: "fill-opacity 0.2s ease, stroke-width 0.2s ease" },
                      hover: { outline: "none", cursor: "pointer" },
                      pressed: { outline: "none", cursor: "pointer" },
                    }}
                    // NOTE: React's onMouseEnter/Leave (non-bubbling, simulated
                    // via relatedTarget) do not fire reliably for these SVG
                    // nodes inside ZoomableGroup's d3-zoom under React 19. The
                    // bubbling onMouseOver/onMouseOut events do reach React's
                    // root listener, so we drive hover with those (+ onClick for
                    // touch). See git history for the headless-repro details.
                    onMouseOver={() => setHoveredCode(code)}
                    onMouseOut={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node))
                        setHoveredCode((prev) => (prev === code ? null : prev));
                    }}
                    onClick={() => setHoveredCode((prev) => (prev === code ? null : code))}
                  />
                );
              })}

              {/* Country name labels — on every block (nudged for dense EU cluster) */}
              <g style={{ pointerEvents: "none" }}>
                {COUNTRY_CODES.map((code) => {
                  const isHover = hoveredCode === code;
                  const inRegion = activeRegion !== null && CODE_TO_REGION[code] === activeRegion;
                  const dim = hasFocus && !isHover && !inRegion;
                  const name = countries[code] ?? code;
                  const labelCoord = LABEL_COORDS[code] ?? COORDS[code];
                  return (
                    <Marker key={`lbl-${code}`} coordinates={labelCoord}>
                      <text
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
                    </Marker>
                  );
                })}
              </g>

              {/* Factory red-star marker — Tianjin, Ninghe.
                  Hover/tap card is an in-marker <foreignObject> so it tracks
                  the star at every zoom/pan and its hover fires reliably. */}
              <Marker
                coordinates={FACTORY}
                // Bubbling onMouseOver/onMouseOut (+ onClick for touch) — see
                // the country-block note above; onMouseEnter is unreliable here.
                // Marker spreads unknown props onto its <g>, so these attach.
                onMouseOver={() => setFactoryHover(true)}
                onMouseOut={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node))
                    setFactoryHover(false);
                }}
                onClick={() => setFactoryHover((v) => !v)}
                onFocus={() => setFactoryHover(true)}
                onBlur={() => setFactoryHover(false)}
                style={{ default: { cursor: "pointer" }, hover: { cursor: "pointer" }, pressed: { cursor: "pointer" } }}
              >
                {/* generous transparent hit area — keeps hover stable */}
                <circle r={14} fill="transparent" style={{ pointerEvents: "all" }} />
                <circle r={10} fill="none" stroke="#DC2626" strokeOpacity={0.4} strokeWidth={1} style={{ pointerEvents: "none" }}>
                  <animate attributeName="r" values="7;15;7" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.55;0;0.55" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <path
                  d={STAR_PATH}
                  fill="#DC2626"
                  stroke="#fff"
                  strokeWidth={1}
                  strokeLinejoin="round"
                  filter="url(#softshadow)"
                  style={{ pointerEvents: "all" }}
                />
                {factoryHover && (
                  <FactoryCard
                    lang={lang}
                    zoom={transform.k}
                    // flip below when the star sits high in the frame (no room above)
                    below={FACTORY_BASE[1] * transform.k + transform.y < 150}
                  />
                )}
              </Marker>
            </ZoomableGroup>
          </ComposableMap>

          {/* HTML overlay cards, synced to the live zoom/pan transform */}
          <div className="absolute inset-0 pointer-events-none">
            <MapOverlays
              lang={lang}
              countries={countries}
              hoveredCode={hoveredCode}
              now={now}
              weather={weather}
              transform={transform}
            />
          </div>

          <p className="absolute bottom-3 right-4 text-xs text-[#1E293B]/45 font-medium pointer-events-none">
            {hasFocus ? "" : t.hint}
          </p>

          {/* Zoom / pan hint */}
          <p className="absolute top-3 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded-full bg-[#1E293B]/65 text-white text-[11px] font-semibold px-3 py-1 pointer-events-none">
            {t.pan}
          </p>
        </div>
      </div>
    </section>
  );
}
