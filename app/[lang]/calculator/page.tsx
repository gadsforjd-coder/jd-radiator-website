"use client";

import { useState, useEffect } from "react";
import { locales, type Locale } from "@/lib/i18n";

const dicts: Record<string, Promise<Record<string, Record<string, string>>>> = {
  en: import("@/dictionaries/en.json").then((m) => m.default as never),
  ru: import("@/dictionaries/ru.json").then((m) => m.default as never),
  mn: import("@/dictionaries/mn.json").then((m) => m.default as never),
  es: import("@/dictionaries/es.json").then((m) => m.default as never),
};

const recommendedProducts = [
  { name: "Designer Vertical Radiator", output: 2400, slug: "designer-vertical-radiator" },
  { name: "Steel Column Radiator", output: 2000, slug: "steel-column-radiator" },
  { name: "Steel Plate Radiator (Type 22)", output: 3000, slug: "steel-plate-radiator" },
  { name: "Steel Plate Radiator (Type 11)", output: 1500, slug: "steel-plate-radiator" },
  { name: "Heated Towel Rail", output: 800, slug: "heated-towel-rail" },
  { name: "Bathroom Backbasket Radiator", output: 900, slug: "bathroom-backbasket-radiator" },
];

export default function CalculatorPage({ params }: { params: Promise<{ lang: string }> }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [d, setD] = useState<Record<string, Record<string, string>> | null>(null);
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(2.7);
  const [insulation, setInsulation] = useState<"good" | "average" | "poor">("average");
  const [windows, setWindows] = useState(2);
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

  function calculate() {
    const volume = length * width * height;
    const insulationFactor = { good: 30, average: 40, poor: 50 }[insulation];
    const windowHeat = windows * 100;
    const watts = Math.round(volume * insulationFactor + windowHeat);
    setResult(watts);
  }

  const matches = result ? recommendedProducts.filter((p) => p.output >= result * 0.5) : [];

  return (
    <div className="py-24 px-6 lg:px-14">
      <div className="max-w-4xl mb-14">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">{t.kicker}</p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">{t.title}</h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7">{t.intro}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-gray-50 p-8 lg:p-12">
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
          <div className="grid grid-cols-2 gap-5 mb-5">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.roomHeight}</span>
              <input type="number" min="2" max="6" step="0.1" value={height} onChange={(e) => setHeight(+e.target.value)} className="w-full p-3 border border-gray-300 rounded" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.windows}</span>
              <input type="number" min="0" max="20" value={windows} onChange={(e) => setWindows(+e.target.value)} className="w-full p-3 border border-gray-300 rounded" />
            </label>
          </div>
          <label className="block mb-8">
            <span className="text-sm font-semibold text-gray-700 mb-1 block">{t.insulation}</span>
            <select value={insulation} onChange={(e) => setInsulation(e.target.value as "good" | "average" | "poor")} className="w-full p-3 border border-gray-300 rounded bg-white">
              <option value="good">{t.insulationGood}</option>
              <option value="average">{t.insulationAverage}</option>
              <option value="poor">{t.insulationPoor}</option>
            </select>
          </label>
          <button onClick={calculate} className="w-full h-12 bg-[var(--jd-red)] text-white font-extrabold rounded hover:bg-red-700 transition-colors">{t.calculate}</button>
        </div>

        <div>
          {result !== null && (
            <div className="animate-in">
              <div className="bg-[var(--jd-dark)] text-white p-8 mb-8">
                <p className="text-sm text-gray-400 mb-2">{t.result}</p>
                <p className="text-5xl font-black text-[var(--jd-orange)]">{result.toLocaleString()} <span className="text-xl">{t.watts}</span></p>
              </div>
              <h3 className="text-xl font-bold mb-4">{t.recommended}</h3>
              <div className="grid gap-3">
                {matches.map((p) => (
                  <a key={p.slug + p.output} href={`/${locale}/products/${p.slug}`} className="flex justify-between items-center p-4 border border-gray-200 hover:border-[var(--jd-orange)] transition-colors">
                    <span className="font-semibold">{p.name}</span>
                    <span className="text-[var(--jd-red)] font-bold">{p.output} W</span>
                  </a>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-6">{t.disclaimer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
