"use client";

import { useState, useEffect, useRef } from "react";
import { locales, type Locale } from "@/lib/i18n";
import { products, categoryLabels, type Product } from "@/lib/products";
import { COUNTRIES, OTHER_FACTOR, countryName, matchesCountry, type Country } from "@/lib/countries";

const dicts: Record<string, Promise<Record<string, Record<string, string>>>> = {
  en: import("@/dictionaries/en.json").then((m) => m.default as never),
  ru: import("@/dictionaries/ru.json").then((m) => m.default as never),
  mn: import("@/dictionaries/mn.json").then((m) => m.default as never),
  es: import("@/dictionaries/es.json").then((m) => m.default as never),
  zh: import("@/dictionaries/zh.json").then((m) => m.default as never),
};

type RoomType = "living" | "bedroom" | "bathroom" | "kitchen" | "office";
type Insulation = "good" | "average" | "poor";
type Heating = "central" | "independent";

// W per m³ by insulation quality (hydronic radiator rule of thumb; the room-type
// factor and pessimistic rounding fold in a small safety margin).
const INSULATION_COEFF: Record<Insulation, number> = { good: 35, average: 45, poor: 55 };
const ROOM_FACTOR: Record<RoomType, number> = { living: 1.0, bedroom: 0.9, bathroom: 1.3, kitchen: 0.85, office: 1.0 };
// Climate factor comes from the selected country object (lib/countries.ts);
// no country selected or "Other" → OTHER_FACTOR (1.00).

// Preset flow temperatures (°C); "custom" reveals a clamped numeric input.
const SUPPLY_PRESETS = [95, 80, 75, 70, 60, 55] as const;
// Default flow temperature per heating method.
const SUPPLY_DEFAULT: Record<Heating, number> = { central: 60, independent: 70 };

const round10 = (n: number) => Math.round(n / 10) * 10;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

// Parse a spec heatRange string into { min, max, perSection }.
// Whole-unit: "449–1476 W"; per-section: "Per section: 50–120 W".
function parseRange(heatRange: string): { min: number; max: number; perSection: boolean } {
  const perSection = /per section/i.test(heatRange);
  const m = heatRange.match(/(\d+)\D+?(\d+)/);
  const min = m ? +m[1] : 0;
  const max = m ? +m[2] : 0;
  return { min, max, perSection };
}

type Ranked = Product & { min: number; max: number; perSection: boolean };
const RANKED: Ranked[] = products.map((p) => ({ ...p, ...parseRange(p.specs.heatRange) }));

// Pick the smallest-capacity model in a category whose single unit still covers
// Q (best fit, avoids oversizing); fall back to the largest if none reaches Q.
function bestFit(category: Product["category"], q: number): Ranked | undefined {
  const pool = RANKED.filter((p) => p.category === category && !p.perSection).sort((a, b) => a.max - b.max);
  return pool.find((p) => p.max >= q) ?? pool[pool.length - 1];
}

function recommend(q: number, room: RoomType) {
  // Primary: bathrooms → towel radiator; everything else → mainstream panel.
  const primary = room === "bathroom" ? bestFit("towel", q) : bestFit("panel", q);

  const alts: Ranked[] = [];
  const designer = bestFit("designer", q); // premium look, whole unit
  const panelAlt = RANKED.filter((p) => p.category === "panel" && p.max >= q && p.slug !== primary?.slug).sort((a, b) => a.max - b.max)[0];
  const column = RANKED.filter((p) => p.category === "column").sort((a, b) => b.max - a.max)[0]; // sectioned option
  for (const c of [designer, panelAlt, column]) {
    if (c && c.slug !== primary?.slug && !alts.some((a) => a.slug === c.slug)) alts.push(c);
  }
  return { primary, alts: alts.slice(0, 3) };
}

type CalcResult = {
  volume: number;
  roomLoad: number; // Q_room, W
  ratedNeed: number; // Q_ratedNeed, W (used to match products rated at ΔT50)
  supply: number; // clamped flow temperature, °C
  deltaT: number; // operating ΔT, K
  factor: number; // sizing factor F
};

export default function CalculatorPage({ params }: { params: Promise<{ lang: string }> }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [d, setD] = useState<Record<string, Record<string, string>> | null>(null);
  // Dimensions stored as raw strings so inputs can be cleared / free of leading zeros.
  const [length, setLength] = useState("5");
  const [width, setWidth] = useState("4");
  const [height, setHeight] = useState("2.7");
  const [room, setRoom] = useState<RoomType>("living");
  const [insulation, setInsulation] = useState<Insulation>("average");
  const [heating, setHeating] = useState<Heating>("central");
  // Country combobox: selected country object (null = "Other" / none), the raw
  // search text, whether the dropdown is open, and the keyboard-highlighted row.
  const [country, setCountry] = useState<Country | null>(null);
  const [countryQuery, setCountryQuery] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryActive, setCountryActive] = useState(0);
  const countryBoxRef = useRef<HTMLDivElement | null>(null);
  const [supplyPreset, setSupplyPreset] = useState<string>(String(SUPPLY_DEFAULT.central));
  const [supplyCustom, setSupplyCustom] = useState("");
  const [result, setResult] = useState<CalcResult | null>(null);

  useEffect(() => {
    params.then(({ lang }) => {
      const l = (locales.includes(lang as Locale) ? lang : "en") as Locale;
      setLocale(l);
      dicts[l].then(setD);
    });
  }, [params]);

  // Close the country dropdown when clicking outside the combobox.
  useEffect(() => {
    if (!countryOpen) return;
    function onDown(e: MouseEvent) {
      if (countryBoxRef.current && !countryBoxRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [countryOpen]);

  if (!d) return null;
  const t = d.calculator;
  const cat = categoryLabels[locale] ?? categoryLabels.en;

  // Switching heating method resets the flow temperature to its default.
  function changeHeating(h: Heating) {
    setHeating(h);
    setSupplyPreset(String(SUPPLY_DEFAULT[h]));
    setSupplyCustom("");
  }

  function reset() {
    setLength("");
    setWidth("");
    setHeight("");
    setRoom("living");
    setInsulation("average");
    setHeating("central");
    setCountry(null);
    setCountryQuery("");
    setCountryOpen(false);
    setSupplyPreset(String(SUPPLY_DEFAULT.central));
    setSupplyCustom("");
    setResult(null);
  }

  // Countries matching the current search text (empty query → full list).
  const filteredCountries = COUNTRIES.filter((c) => matchesCountry(c, countryQuery));

  // The climate factor in force (selected country, or fallback).
  const climateFactor = country ? country.factor : OTHER_FACTOR;

  function selectCountry(c: Country | null) {
    setCountry(c);
    setCountryQuery("");
    setCountryOpen(false);
    setCountryActive(0);
  }

  function onCountryKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // Total rows = filtered countries + the trailing "Other" option.
    const total = filteredCountries.length + 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCountryOpen(true);
      setCountryActive((i) => (i + 1) % total);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCountryOpen(true);
      setCountryActive((i) => (i - 1 + total) % total);
    } else if (e.key === "Enter") {
      if (!countryOpen) return;
      e.preventDefault();
      if (countryActive < filteredCountries.length) selectCountry(filteredCountries[countryActive]);
      else selectCountry(null); // "Other"
    } else if (e.key === "Escape") {
      setCountryOpen(false);
    }
  }

  const isCustomSupply = supplyPreset === "custom";
  const dimsValid = [length, width, height].every((s) => {
    const n = parseFloat(s);
    return Number.isFinite(n) && n > 0;
  });

  function calculate() {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const H = parseFloat(height);
    if (![L, W, H].every((n) => Number.isFinite(n) && n > 0)) return;

    const supplyRaw = isCustomSupply ? parseFloat(supplyCustom) : parseFloat(supplyPreset);
    const supply = clamp(Number.isFinite(supplyRaw) ? supplyRaw : SUPPLY_DEFAULT[heating], 45, 95);

    const volume = L * W * H;
    const roomLoad = round10(volume * INSULATION_COEFF[insulation] * ROOM_FACTOR[room] * climateFactor);

    // ΔT correction: return assumed 10°C below flow, room 20°C → mean water − room.
    const deltaT = supply - 25;
    const factor = Math.pow(50 / deltaT, 1.3);
    const ratedNeed = round10(roomLoad * factor);

    setResult({ volume, roomLoad, ratedNeed, supply, deltaT, factor });
  }

  const rec = result !== null ? recommend(result.ratedNeed, room) : null;
  const fmt = (tpl: string, vars: Record<string, string | number>) =>
    tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
  const displayName = (p: Ranked) => `${p.model} · ${cat[p.category]}`;
  const outputText = (p: Ranked) =>
    p.perSection && result
      ? fmt(t.sectionsEst, { n: Math.max(1, Math.ceil(result.ratedNeed / p.max)) })
      : `${p.min.toLocaleString()}–${p.max.toLocaleString()} ${t.watts}`;

  const roomLabel: Record<RoomType, string> = {
    living: t.roomTypeLiving,
    bedroom: t.roomTypeBedroom,
    bathroom: t.roomTypeBathroom,
    kitchen: t.roomTypeKitchen,
    office: t.roomTypeOffice,
  };
  const insulationLabel: Record<Insulation, string> = {
    good: t.insulationGood,
    average: t.insulationAverage,
    poor: t.insulationPoor,
  };
  // Readable climate label for the "how it's calculated" block: selected
  // country name in the page language, or the localized "Other" label.
  const climateLabel = country ? countryName(country, locale) : t.countryOther;

  const inputCls = "w-full p-3 border border-gray-300 rounded";
  const selectCls = "w-full p-3 border border-gray-300 rounded bg-white";

  return (
    <div className="py-24 px-6 lg:px-14">
      <div className="max-w-4xl mb-14">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">{t.kicker}</p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">{t.title}</h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7">{t.intro}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-gray-50 p-8 lg:p-12 rounded-lg">
          <div className="grid grid-cols-2 gap-5 mb-5">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.roomLength}</span>
              <input type="number" min="1" max="50" step="0.1" value={length} onChange={(e) => setLength(e.target.value)} className={inputCls} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.roomWidth}</span>
              <input type="number" min="1" max="50" step="0.1" value={width} onChange={(e) => setWidth(e.target.value)} className={inputCls} />
            </label>
          </div>
          <label className="block mb-5">
            <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.roomHeight}</span>
            <input type="number" min="2" max="6" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} className={inputCls} />
          </label>
          <label className="block mb-5">
            <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.roomType}</span>
            <select value={room} onChange={(e) => setRoom(e.target.value as RoomType)} className={selectCls}>
              <option value="living">{t.roomTypeLiving}</option>
              <option value="bedroom">{t.roomTypeBedroom}</option>
              <option value="bathroom">{t.roomTypeBathroom}</option>
              <option value="kitchen">{t.roomTypeKitchen}</option>
              <option value="office">{t.roomTypeOffice}</option>
            </select>
          </label>
          <label className="block mb-5">
            <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.insulation}</span>
            <select value={insulation} onChange={(e) => setInsulation(e.target.value as Insulation)} className={selectCls}>
              <option value="good">{t.insulationGood}</option>
              <option value="average">{t.insulationAverage}</option>
              <option value="poor">{t.insulationPoor}</option>
            </select>
          </label>

          <label className="block mb-2">
            <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.heatingMethod}</span>
            <select value={heating} onChange={(e) => changeHeating(e.target.value as Heating)} className={selectCls}>
              <option value="central">{t.heatingCentral}</option>
              <option value="independent">{t.heatingIndependent}</option>
            </select>
          </label>
          <p className="text-xs text-gray-500 leading-relaxed mb-5">
            {heating === "central" ? t.heatingCentralDesc : t.heatingIndependentDesc}
          </p>

          <div className="block mb-2">
            <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.country}</span>
            <div className="relative" ref={countryBoxRef}>
              <input
                type="text"
                role="combobox"
                aria-expanded={countryOpen}
                aria-autocomplete="list"
                autoComplete="off"
                value={countryOpen ? countryQuery : country ? countryName(country, locale) : ""}
                placeholder={t.countrySearchPlaceholder}
                onFocus={() => {
                  setCountryOpen(true);
                  setCountryActive(0);
                }}
                onChange={(e) => {
                  setCountryQuery(e.target.value);
                  setCountryOpen(true);
                  setCountryActive(0);
                }}
                onKeyDown={onCountryKeyDown}
                className={selectCls}
              />
              {countryOpen && (
                <ul
                  role="listbox"
                  className="absolute z-20 left-0 right-0 mt-1 max-h-64 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg"
                >
                  {filteredCountries.map((c, i) => (
                    <li
                      key={c.code}
                      role="option"
                      aria-selected={country?.code === c.code}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        selectCountry(c);
                      }}
                      onMouseEnter={() => setCountryActive(i)}
                      className={`flex justify-between items-center gap-3 px-3 py-2 cursor-pointer text-sm ${
                        i === countryActive ? "bg-[#FFF7ED]" : ""
                      } ${country?.code === c.code ? "font-semibold" : ""}`}
                    >
                      <span>{countryName(c, locale)}</span>
                      <span className="text-gray-400 text-xs whitespace-nowrap">×{c.factor.toFixed(2)}</span>
                    </li>
                  ))}
                  <li
                    role="option"
                    aria-selected={country === null}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      selectCountry(null);
                    }}
                    onMouseEnter={() => setCountryActive(filteredCountries.length)}
                    className={`flex justify-between items-center gap-3 px-3 py-2 cursor-pointer text-sm border-t border-gray-100 ${
                      countryActive === filteredCountries.length ? "bg-[#FFF7ED]" : ""
                    } ${country === null ? "font-semibold" : ""}`}
                  >
                    <span>{t.countryOther}</span>
                    <span className="text-gray-400 text-xs whitespace-nowrap">×{OTHER_FACTOR.toFixed(2)}</span>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed mb-5">{t.countryHint}</p>

          <label className="block mb-2">
            <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.waterTemp}</span>
            <select value={supplyPreset} onChange={(e) => setSupplyPreset(e.target.value)} className={selectCls}>
              {SUPPLY_PRESETS.map((s) => (
                <option key={s} value={String(s)}>{s} °C</option>
              ))}
              <option value="custom">{t.waterTempCustom}</option>
            </select>
          </label>
          {isCustomSupply && (
            <input
              type="number"
              min="45"
              max="95"
              step="1"
              value={supplyCustom}
              onChange={(e) => setSupplyCustom(e.target.value)}
              placeholder="45–95 °C"
              className={`${inputCls} mb-2`}
            />
          )}
          <p className="text-xs text-gray-500 leading-relaxed mb-8">{t.waterTempHint}</p>

          <div className="flex gap-3">
            <button
              onClick={calculate}
              disabled={!dimsValid}
              className="flex-1 h-12 bg-[var(--jd-red)] text-white font-extrabold rounded hover:bg-orange-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t.calculate}
            </button>
            <button
              onClick={reset}
              className="h-12 px-6 border border-gray-300 text-gray-700 font-bold rounded hover:bg-gray-100 transition-colors"
            >
              {t.reset}
            </button>
          </div>
        </div>

        <div>
          {result !== null && rec && (
            <div className="animate-in">
              <div className="bg-gradient-to-br from-[#F97316] to-[var(--jd-orange-dark)] text-white p-8 mb-8 rounded-lg">
                <p className="text-sm text-white/80 mb-2">{t.resultRoomLoad}</p>
                <p className="text-5xl font-black text-white">{result.roomLoad.toLocaleString()} <span className="text-xl">{t.watts}</span></p>
                <p className="text-sm text-white/90 mt-4">{fmt(t.resultRatedNeed, { watts: result.ratedNeed.toLocaleString() })}</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-bold mb-4">{t.howTitle}</h3>
                <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                  <li>{fmt(t.howVolume, { v: result.volume.toFixed(2) })}</li>
                  <li>{t.howFormula}</li>
                  <li>{fmt(t.howInsulation, { level: insulationLabel[insulation], q: INSULATION_COEFF[insulation] })}</li>
                  <li>{fmt(t.howRoom, { room: roomLabel[room], f: ROOM_FACTOR[room] })}</li>
                  <li>{fmt(t.howClimate, { country: climateLabel, f: climateFactor })}</li>
                  <li className="font-semibold text-gray-800">{fmt(t.howRoomLoad, { watts: result.roomLoad.toLocaleString() })}</li>
                  <li className="pt-2 border-t border-gray-100">{fmt(t.howDeltaT, { supply: result.supply, dt: result.deltaT })}</li>
                  <li>{fmt(t.howFactor, { f: result.factor.toFixed(2) })}</li>
                  <li className="font-semibold text-gray-800">{fmt(t.howRatedNeed, { watts: result.ratedNeed.toLocaleString() })}</li>
                  <li className="pt-2 border-t border-gray-100 text-gray-400 text-xs">{t.howNote}</li>
                </ul>
              </div>

              {rec.primary && (
                <>
                  <h3 className="text-xl font-bold mb-4">{t.primaryTitle}</h3>
                  <a href={`/${locale}/products/${rec.primary.slug}`} className="block p-5 mb-8 rounded-lg border-2 border-[var(--jd-orange)] bg-[#FFF7ED] hover:shadow-[0_0_24px_rgba(234,88,12,0.18)] transition-all">
                    <div className="flex justify-between items-center gap-4">
                      <span className="font-extrabold text-lg text-[#1E293B]">{displayName(rec.primary)}</span>
                      <span className="text-[var(--jd-red)] font-bold whitespace-nowrap">{outputText(rec.primary)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{fmt(t.primaryReason, { watts: result.ratedNeed.toLocaleString() })}</p>
                    <span className="inline-block mt-3 text-[var(--jd-red)] font-bold text-sm">{t.viewProduct} →</span>
                  </a>
                </>
              )}

              {rec.alts.length > 0 && (
                <>
                  <h3 className="text-xl font-bold mb-4">{t.otherTitle}</h3>
                  <div className="grid gap-3">
                    {rec.alts.map((p) => (
                      <a key={p.slug} href={`/${locale}/products/${p.slug}`} className="flex justify-between items-center gap-4 p-4 border border-gray-200 rounded hover:border-[var(--jd-orange)] transition-colors">
                        <span className="font-semibold">{displayName(p)}</span>
                        <span className="text-[var(--jd-red)] font-bold whitespace-nowrap">{outputText(p)}</span>
                      </a>
                    ))}
                  </div>
                </>
              )}

              <p className="text-gray-400 text-sm mt-6">{t.disclaimer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
