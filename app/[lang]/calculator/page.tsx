"use client";

import { useState, useEffect } from "react";
import { locales, type Locale } from "@/lib/i18n";
import { products, categoryLabels, type Product } from "@/lib/products";
import { OTHER_FACTOR, countryName, type Country } from "@/lib/countries";
import {
  INSULATION_COEFF,
  ROOM_FACTOR,
  SUPPLY_PRESETS,
  SUPPLY_DEFAULT,
  computeSizing,
  parseRange,
  parseHeights,
  primaryCategory,
  type RoomType,
  type Insulation,
  type Heating,
  type Category,
} from "@/lib/sizing";
import CountryPicker from "@/components/CountryPicker";

const dicts: Record<string, Promise<Record<string, Record<string, string>>>> = {
  en: import("@/dictionaries/en.json").then((m) => m.default as never),
  ru: import("@/dictionaries/ru.json").then((m) => m.default as never),
  mn: import("@/dictionaries/mn.json").then((m) => m.default as never),
  es: import("@/dictionaries/es.json").then((m) => m.default as never),
  zh: import("@/dictionaries/zh.json").then((m) => m.default as never),
};

// Climate factor comes from the selected country object (lib/countries.ts);
// no country selected or "Other" → OTHER_FACTOR (1.00).
// Sizing constants, presets and the core formula live in lib/sizing.ts so the
// standalone calculator and the per-product widget stay in lockstep.

type Ranked = Product & { min: number; max: number; perSection: boolean; heightMin: number };
const RANKED: Ranked[] = products.map((p) => {
  const heightList = parseHeights(p.specs.heights);
  return { ...p, ...parseRange(p.specs.heatRange), heightMin: heightList[0] ?? 0 };
});

// A model physically fits an install slot when its shortest listed height is no
// taller than the slot (mm). installH ≤ 0 means "no constraint given".
const fitsSlot = (p: Ranked, installH: number) => installH <= 0 || p.heightMin === 0 || p.heightMin <= installH;

// Pick the smallest-capacity model in a category whose single unit still covers
// Q (best fit, avoids oversizing); fall back to the largest if none reaches Q.
// Only considers models that fit the install height.
function bestFit(category: Category, q: number, installH: number): Ranked | undefined {
  const pool = RANKED.filter((p) => p.category === category && !p.perSection && fitsSlot(p, installH)).sort((a, b) => a.max - b.max);
  return pool.find((p) => p.max >= q) ?? pool[pool.length - 1];
}

function recommend(q: number, room: RoomType, heating: Heating, installH: number) {
  // Primary family follows heating method + room (see lib/sizing primaryCategory):
  // central → column, independent → panel, bathroom → towel.
  const primaryCat = primaryCategory(heating, room);
  const sectioned = primaryCat === "column" || primaryCat === "bimetal";
  const primary = sectioned
    ? RANKED.filter((p) => p.category === primaryCat && fitsSlot(p, installH)).sort((a, b) => b.max - a.max)[0]
    : bestFit(primaryCat, q, installH);

  const alts: Ranked[] = [];
  // Offer sensible cross-family options: panel & column/bimetal & designer.
  const panelAlt = bestFit("panel", q, installH);
  const columnAlt = RANKED.filter((p) => p.category === "column" && fitsSlot(p, installH)).sort((a, b) => b.max - a.max)[0];
  const bimetalAlt = RANKED.filter((p) => p.category === "bimetal" && fitsSlot(p, installH)).sort((a, b) => b.max - a.max)[0];
  const designer = bestFit("designer", q, installH); // premium look, whole unit
  for (const c of [panelAlt, columnAlt, bimetalAlt, designer]) {
    if (c && c.slug !== primary?.slug && !alts.some((a) => a.slug === c.slug)) alts.push(c);
  }
  return { primary, primaryCat, alts: alts.slice(0, 3) };
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
  // Install-position clearance (mm) — required; constrains which heights fit.
  const [installH, setInstallH] = useState("");
  const [installW, setInstallW] = useState("");
  const [room, setRoom] = useState<RoomType>("living");
  const [insulation, setInsulation] = useState<Insulation>("average");
  // Heating method is required with no default → force an explicit choice.
  const [heating, setHeating] = useState<Heating | "">("");
  // Selected country object (null = "Other" / none). The searchable combobox
  // lives in the shared CountryPicker component.
  const [country, setCountry] = useState<Country | null>(null);
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

  if (!d) return null;
  const t = d.calculator;
  const cat = categoryLabels[locale] ?? categoryLabels.en;

  // Switching heating method resets the flow temperature to its default.
  function changeHeating(h: Heating | "") {
    setHeating(h);
    if (h) setSupplyPreset(String(SUPPLY_DEFAULT[h]));
    setSupplyCustom("");
  }

  function reset() {
    setLength("");
    setWidth("");
    setHeight("");
    setInstallH("");
    setInstallW("");
    setRoom("living");
    setInsulation("average");
    setHeating("");
    setCountry(null);
    setSupplyPreset(String(SUPPLY_DEFAULT.central));
    setSupplyCustom("");
    setResult(null);
  }

  // The climate factor in force (selected country, or fallback).
  const climateFactor = country ? country.factor : OTHER_FACTOR;

  const isCustomSupply = supplyPreset === "custom";
  const posNum = (s: string) => {
    const n = parseFloat(s);
    return Number.isFinite(n) && n > 0;
  };
  // Required: room dimensions + install clearance (H×W) + heating method.
  const dimsValid = [length, width, height].every(posNum);
  const installValid = [installH, installW].every(posNum);
  const inputsValid = dimsValid && installValid && heating !== "";

  function calculate() {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const H = parseFloat(height);
    if (!inputsValid) return;
    const method = heating as Heating;

    const supplyRaw = isCustomSupply ? parseFloat(supplyCustom) : parseFloat(supplyPreset);
    const supplyTemp = Number.isFinite(supplyRaw) ? supplyRaw : SUPPLY_DEFAULT[method];

    const s = computeSizing({ length: L, width: W, height: H, room, insulation, climateFactor, supplyTemp });
    setResult({ volume: s.volume, roomLoad: s.qRoom, ratedNeed: s.qRatedNeed, supply: s.supply, deltaT: s.deltaT, factor: s.F });
  }

  const rec = result !== null && heating !== "" ? recommend(result.ratedNeed, room, heating as Heating, parseFloat(installH) || 0) : null;
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
          <div className="grid grid-cols-2 gap-5 mb-2">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.installHeight}</span>
              <input type="number" min="100" max="3000" step="10" value={installH} onChange={(e) => setInstallH(e.target.value)} className={inputCls} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.installWidth}</span>
              <input type="number" min="100" max="6000" step="10" value={installW} onChange={(e) => setInstallW(e.target.value)} className={inputCls} />
            </label>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed mb-5">{t.installHint}</p>
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
            <select value={heating} onChange={(e) => changeHeating(e.target.value as Heating | "")} className={selectCls}>
              <option value="" disabled>{t.heatingSelect}</option>
              <option value="central">{t.heatingCentral}</option>
              <option value="independent">{t.heatingIndependent}</option>
            </select>
          </label>
          <p className="text-xs text-gray-500 leading-relaxed mb-5">
            {heating === "central" ? t.heatingCentralDesc : heating === "independent" ? t.heatingIndependentDesc : t.heatingSelectHint}
          </p>

          <div className="block mb-2">
            <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.country}</span>
            <CountryPicker value={country} onChange={setCountry} locale={locale} dict={t} className={selectCls} />
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
              disabled={!inputsValid}
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
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed border-t border-gray-100 pt-2">
                      💡 {room === "bathroom" ? t.whyBathroom : heating === "central" ? t.whyCentral : t.whyIndependent}
                    </p>
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
