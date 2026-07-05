"use client";

import { useState, useEffect } from "react";
import { locales, type Locale } from "@/lib/i18n";
import { products, categoryLabels, type Product } from "@/lib/products";

const dicts: Record<string, Promise<Record<string, Record<string, string>>>> = {
  en: import("@/dictionaries/en.json").then((m) => m.default as never),
  ru: import("@/dictionaries/ru.json").then((m) => m.default as never),
  mn: import("@/dictionaries/mn.json").then((m) => m.default as never),
  es: import("@/dictionaries/es.json").then((m) => m.default as never),
  zh: import("@/dictionaries/zh.json").then((m) => m.default as never),
};

type RoomType = "living" | "bedroom" | "bathroom" | "kitchen" | "office";
type Insulation = "good" | "average" | "poor";

// W per m³ by insulation quality (hydronic radiator rule of thumb; the room-type
// factor and pessimistic rounding fold in a small safety margin).
const INSULATION_COEFF: Record<Insulation, number> = { good: 35, average: 45, poor: 55 };
const ROOM_FACTOR: Record<RoomType, number> = { living: 1.0, bedroom: 0.9, bathroom: 1.3, kitchen: 0.85, office: 1.0 };

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

export default function CalculatorPage({ params }: { params: Promise<{ lang: string }> }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [d, setD] = useState<Record<string, Record<string, string>> | null>(null);
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(2.7);
  const [room, setRoom] = useState<RoomType>("living");
  const [insulation, setInsulation] = useState<Insulation>("average");
  const [result, setResult] = useState<number | null>(null);

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

  function calculate() {
    const volume = length * width * height;
    const watts = Math.round((volume * INSULATION_COEFF[insulation] * ROOM_FACTOR[room]) / 10) * 10;
    setResult(watts);
  }

  const rec = result !== null ? recommend(result, room) : null;
  const fmt = (tpl: string, vars: Record<string, string | number>) =>
    tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
  const displayName = (p: Ranked) => `${p.model} · ${cat[p.category]}`;
  const outputText = (p: Ranked) =>
    p.perSection && result
      ? fmt(t.sectionsEst, { n: Math.max(1, Math.ceil(result / p.max)) })
      : `${p.min.toLocaleString()}–${p.max.toLocaleString()} ${t.watts}`;

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
              <input type="number" min="1" max="50" step="0.1" value={length} onChange={(e) => setLength(+e.target.value)} className="w-full p-3 border border-gray-300 rounded" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.roomWidth}</span>
              <input type="number" min="1" max="50" step="0.1" value={width} onChange={(e) => setWidth(+e.target.value)} className="w-full p-3 border border-gray-300 rounded" />
            </label>
          </div>
          <label className="block mb-5">
            <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.roomHeight}</span>
            <input type="number" min="2" max="6" step="0.1" value={height} onChange={(e) => setHeight(+e.target.value)} className="w-full p-3 border border-gray-300 rounded" />
          </label>
          <label className="block mb-5">
            <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.roomType}</span>
            <select value={room} onChange={(e) => setRoom(e.target.value as RoomType)} className="w-full p-3 border border-gray-300 rounded bg-white">
              <option value="living">{t.roomTypeLiving}</option>
              <option value="bedroom">{t.roomTypeBedroom}</option>
              <option value="bathroom">{t.roomTypeBathroom}</option>
              <option value="kitchen">{t.roomTypeKitchen}</option>
              <option value="office">{t.roomTypeOffice}</option>
            </select>
          </label>
          <label className="block mb-8">
            <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.insulation}</span>
            <select value={insulation} onChange={(e) => setInsulation(e.target.value as Insulation)} className="w-full p-3 border border-gray-300 rounded bg-white">
              <option value="good">{t.insulationGood}</option>
              <option value="average">{t.insulationAverage}</option>
              <option value="poor">{t.insulationPoor}</option>
            </select>
          </label>
          <button onClick={calculate} className="w-full h-12 bg-[var(--jd-red)] text-white font-extrabold rounded hover:bg-orange-700 transition-colors">{t.calculate}</button>
        </div>

        <div>
          {result !== null && rec && (
            <div className="animate-in">
              <div className="bg-gradient-to-br from-[#F97316] to-[var(--jd-orange-dark)] text-white p-8 mb-8 rounded-lg">
                <p className="text-sm text-white/80 mb-2">{t.result}</p>
                <p className="text-5xl font-black text-white">{result.toLocaleString()} <span className="text-xl">{t.watts}</span></p>
              </div>

              {rec.primary && (
                <>
                  <h3 className="text-xl font-bold mb-4">{t.primaryTitle}</h3>
                  <a href={`/${locale}/products/${rec.primary.slug}`} className="block p-5 mb-8 rounded-lg border-2 border-[var(--jd-orange)] bg-[#FFF7ED] hover:shadow-[0_0_24px_rgba(234,88,12,0.18)] transition-all">
                    <div className="flex justify-between items-center gap-4">
                      <span className="font-extrabold text-lg text-[#1E293B]">{displayName(rec.primary)}</span>
                      <span className="text-[var(--jd-red)] font-bold whitespace-nowrap">{outputText(rec.primary)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{fmt(t.primaryReason, { watts: result.toLocaleString() })}</p>
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
