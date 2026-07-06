"use client";

import { useState } from "react";
import { OTHER_FACTOR, countryName, type Country } from "@/lib/countries";
import {
  INSULATION_COEFF,
  ROOM_FACTOR,
  SUPPLY_PRESETS,
  SUPPLY_DEFAULT,
  computeSizing,
  parseRange,
  type RoomType,
  type Insulation,
  type Heating,
  type SizingResult,
} from "@/lib/sizing";
import type { PanelSize } from "@/lib/panelSizes";
import type { Product } from "@/lib/products";
import type { Dictionary } from "@/lib/dictionary";
import CountryPicker from "@/components/CountryPicker";

// Recommendation shapes per product family.
type Rec =
  | { kind: "size"; size: PanelSize; groups: number } // panel: concrete size (+ N groups if one is not enough)
  | { kind: "sections"; sections: number; per: number } // column / bimetal: N sections/columns
  | { kind: "units"; units: number; min: number; max: number }; // designer / towel: N whole units

// Per-product room-sizing widget. Replaces the "download spec sheet" button:
// the buyer describes their room and gets a concrete spec for THIS product.
export default function ProductSizer({
  slug,
  category,
  heatRange,
  panelSizes,
  locale,
  dict,
}: {
  slug: string;
  category: Product["category"];
  heatRange: string;
  panelSizes: PanelSize[];
  locale: string;
  dict: Dictionary;
}) {
  const t = dict.calculator;
  const p = dict.products;

  const [open, setOpen] = useState(false);
  // Dimensions as raw strings so inputs can be cleared / typed freely.
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("2.7");
  const [room, setRoom] = useState<RoomType>("living");
  const [insulation, setInsulation] = useState<Insulation>("average");
  const [heating, setHeating] = useState<Heating>("central");
  const [country, setCountry] = useState<Country | null>(null);
  const [supplyPreset, setSupplyPreset] = useState<string>(String(SUPPLY_DEFAULT.central));
  const [supplyCustom, setSupplyCustom] = useState("");
  const [result, setResult] = useState<SizingResult | null>(null);
  const [rec, setRec] = useState<Rec | null>(null);

  const climateFactor = country ? country.factor : OTHER_FACTOR;
  const isCustomSupply = supplyPreset === "custom";
  const dimsValid = [length, width, height].every((s) => {
    const n = parseFloat(s);
    return Number.isFinite(n) && n > 0;
  });

  function changeHeating(h: Heating) {
    setHeating(h);
    setSupplyPreset(String(SUPPLY_DEFAULT[h]));
    setSupplyCustom("");
  }

  function reset() {
    setLength("");
    setWidth("");
    setHeight("2.7");
    setRoom("living");
    setInsulation("average");
    setHeating("central");
    setCountry(null);
    setSupplyPreset(String(SUPPLY_DEFAULT.central));
    setSupplyCustom("");
    setResult(null);
    setRec(null);
  }

  // Given required rated output, recommend a concrete spec for THIS product.
  function buildRec(qNeed: number): Rec | null {
    if (category === "panel" && panelSizes.length > 0) {
      const sorted = [...panelSizes].sort((a, b) => a.q - b.q);
      const fit = sorted.find((s) => s.q >= qNeed);
      if (fit) return { kind: "size", size: fit, groups: 1 };
      // Nothing single reaches Q → largest size, N groups.
      const largest = sorted[sorted.length - 1];
      return { kind: "size", size: largest, groups: Math.max(1, Math.ceil(qNeed / largest.q)) };
    }
    if (category === "column" || category === "bimetal") {
      const { max } = parseRange(heatRange); // W per section (upper bound)
      if (max > 0) return { kind: "sections", sections: Math.max(1, Math.ceil(qNeed / max)), per: max };
      return null;
    }
    // designer / towel: whole-unit range a–b W.
    const { min, max } = parseRange(heatRange);
    if (max > 0) return { kind: "units", units: Math.max(1, Math.ceil(qNeed / max)), min, max };
    return null;
  }

  function calculate() {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const H = parseFloat(height);
    if (![L, W, H].every((n) => Number.isFinite(n) && n > 0)) return;

    const supplyRaw = isCustomSupply ? parseFloat(supplyCustom) : parseFloat(supplyPreset);
    const supplyTemp = Number.isFinite(supplyRaw) ? supplyRaw : SUPPLY_DEFAULT[heating];

    const s = computeSizing({ length: L, width: W, height: H, room, insulation, climateFactor, supplyTemp });
    setResult(s);
    setRec(buildRec(s.qRatedNeed));
  }

  const fmt = (tpl: string, vars: Record<string, string | number>) =>
    tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

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
  const climateLabel = country ? countryName(country, locale) : t.countryOther;

  const inputCls = "w-full p-3 border border-gray-300 rounded";
  const selectCls = "w-full p-3 border border-gray-300 rounded bg-white";

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex h-12 items-center px-6 bg-white border border-gray-300 font-extrabold rounded hover:border-gray-500 transition-colors"
      >
        {p.sizeThisProduct} {open ? "▲" : "▾"}
      </button>

      {open && (
        <div className="mt-6 border border-gray-200 rounded-lg bg-gray-50 p-6 lg:p-8 animate-in">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.roomLength}</span>
              <input type="number" min="1" max="50" step="0.1" value={length} onChange={(e) => setLength(e.target.value)} className={inputCls} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.roomWidth}</span>
              <input type="number" min="1" max="50" step="0.1" value={width} onChange={(e) => setWidth(e.target.value)} className={inputCls} />
            </label>
          </div>
          <label className="block mb-4">
            <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.roomHeight}</span>
            <input type="number" min="2" max="6" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} className={inputCls} />
          </label>
          <label className="block mb-4">
            <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.roomType}</span>
            <select value={room} onChange={(e) => setRoom(e.target.value as RoomType)} className={selectCls}>
              <option value="living">{t.roomTypeLiving}</option>
              <option value="bedroom">{t.roomTypeBedroom}</option>
              <option value="bathroom">{t.roomTypeBathroom}</option>
              <option value="kitchen">{t.roomTypeKitchen}</option>
              <option value="office">{t.roomTypeOffice}</option>
            </select>
          </label>
          <label className="block mb-4">
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
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            {heating === "central" ? t.heatingCentralDesc : t.heatingIndependentDesc}
          </p>

          <div className="block mb-2">
            <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.country}</span>
            <CountryPicker value={country} onChange={setCountry} locale={locale} dict={t} className={selectCls} />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">{t.countryHint}</p>

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
          <p className="text-xs text-gray-500 leading-relaxed mb-6">{t.waterTempHint}</p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={calculate}
              disabled={!dimsValid}
              className="flex-1 h-12 bg-[var(--jd-red)] text-white font-extrabold rounded hover:bg-orange-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t.calculate}
            </button>
            <button
              type="button"
              onClick={reset}
              className="h-12 px-6 border border-gray-300 text-gray-700 font-bold rounded hover:bg-gray-100 transition-colors"
            >
              {t.reset}
            </button>
          </div>

          {result && (
            <div className="mt-6 animate-in">
              {rec && (
                <div className="bg-gradient-to-br from-[#F97316] to-[var(--jd-orange-dark)] text-white p-6 rounded-lg mb-6">
                  {rec.kind === "size" && (
                    <>
                      <p className="text-lg font-black leading-snug">
                        {fmt(p.recSize, {
                          h: rec.size.h,
                          l: rec.size.l,
                          d: rec.size.d,
                          q: rec.size.q.toLocaleString(),
                          w: rec.size.w,
                        })}
                      </p>
                      {rec.groups > 1 && (
                        <p className="text-sm text-white/90 mt-2">{fmt(p.recGroups, { n: rec.groups })}</p>
                      )}
                      <p className="text-sm text-white/90 mt-2">{fmt(t.resultRatedNeed, { watts: result.qRatedNeed.toLocaleString() })}</p>
                    </>
                  )}
                  {rec.kind === "sections" && (
                    <>
                      <p className="text-lg font-black leading-snug">{fmt(p.recSections, { n: rec.sections, per: rec.per })}</p>
                      <p className="text-sm text-white/90 mt-2">{fmt(t.resultRatedNeed, { watts: result.qRatedNeed.toLocaleString() })}</p>
                    </>
                  )}
                  {rec.kind === "units" && (
                    <p className="text-lg font-black leading-snug">
                      {fmt(p.recUnits, { min: rec.min.toLocaleString(), max: rec.max.toLocaleString(), need: result.qRatedNeed.toLocaleString(), n: rec.units })}
                    </p>
                  )}
                </div>
              )}

              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h4 className="text-base font-bold mb-3">{t.howTitle}</h4>
                <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                  <li>{fmt(t.howVolume, { v: result.volume.toFixed(2) })}</li>
                  <li>{t.howFormula}</li>
                  <li>{fmt(t.howInsulation, { level: insulationLabel[insulation], q: INSULATION_COEFF[insulation] })}</li>
                  <li>{fmt(t.howRoom, { room: roomLabel[room], f: ROOM_FACTOR[room] })}</li>
                  <li>{fmt(t.howClimate, { country: climateLabel, f: climateFactor })}</li>
                  <li className="font-semibold text-gray-800">{fmt(t.howRoomLoad, { watts: result.qRoom.toLocaleString() })}</li>
                  <li className="pt-2 border-t border-gray-100">{fmt(t.howDeltaT, { supply: result.supply, dt: result.deltaT })}</li>
                  <li>{fmt(t.howFactor, { f: result.F.toFixed(2) })}</li>
                  <li className="font-semibold text-gray-800">{fmt(t.howRatedNeed, { watts: result.qRatedNeed.toLocaleString() })}</li>
                  <li className="pt-2 border-t border-gray-100 text-gray-400 text-xs">{t.howNote}</li>
                </ul>
              </div>
              <p className="text-gray-400 text-sm mt-4">{t.disclaimer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
