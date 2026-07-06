// Shared radiator-sizing algorithm (pure functions, no React).
// Used by both the standalone calculator (app/[lang]/calculator) and the
// per-product room-sizing widget (ProductSizer). Keep the formula here only —
// duplicating it would let the two surfaces drift apart.

export type RoomType = "living" | "bedroom" | "bathroom" | "kitchen" | "office";
export type Insulation = "good" | "average" | "poor";
export type Heating = "central" | "independent";

// W per m³ by insulation quality (hydronic radiator rule of thumb; the room-type
// factor and pessimistic rounding fold in a small safety margin).
export const INSULATION_COEFF: Record<Insulation, number> = { good: 35, average: 45, poor: 55 };
export const ROOM_FACTOR: Record<RoomType, number> = { living: 1.0, bedroom: 0.9, bathroom: 1.3, kitchen: 0.85, office: 1.0 };

// EN442 rated ΔT and the emitter exponent used in the ΔT correction.
export const DELTA_RATED = 50;
export const EMITTER_EXPONENT = 1.3;

// Preset flow temperatures (°C); "custom" reveals a clamped numeric input.
export const SUPPLY_PRESETS = [95, 80, 75, 70, 60, 55] as const;
// Default flow temperature when the user leaves it blank: supply 75 / return 60
// (the standard 75/60 design condition). The ΔT correction below models return
// as supply−10, so at 75 °C this lands on the EN442 rating basis (ΔT50, F≈1.0).
export const SUPPLY_DEFAULT: Record<Heating, number> = { central: 75, independent: 75 };

export const round10 = (n: number) => Math.round(n / 10) * 10;
export const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export interface SizingInput {
  length: number;
  width: number;
  height: number;
  room: RoomType;
  insulation: Insulation;
  climateFactor: number; // caller passes the selected country's factor (or 1.00)
  supplyTemp: number; // raw flow temperature, °C (clamped inside)
}

export interface SizingResult {
  volume: number; // m³
  qRoom: number; // room heat load, W (rounded to 10)
  supply: number; // clamped flow temperature, °C
  deltaT: number; // operating ΔT, K
  F: number; // sizing factor
  qRatedNeed: number; // required rated output at EN442 ΔT50, W (rounded to 10)
}

// Core sizing computation. All rounding/clamping matches the calculator v2.
export function computeSizing(input: SizingInput): SizingResult {
  const { length, width, height, room, insulation, climateFactor, supplyTemp } = input;

  const volume = length * width * height;
  const qRoom = round10(volume * INSULATION_COEFF[insulation] * ROOM_FACTOR[room] * climateFactor);

  // ΔT correction: return assumed 10°C below flow, room 20°C → mean water − room.
  const supply = clamp(supplyTemp, 45, 95);
  const deltaT = supply - 25;
  const F = Math.pow(DELTA_RATED / deltaT, EMITTER_EXPONENT);
  const qRatedNeed = round10(qRoom * F);

  return { volume, qRoom, supply, deltaT, F, qRatedNeed };
}

// Parse a spec heatRange string into { min, max, perSection }.
// Whole-unit: "449–1476 W"; per-section: "Per section: 50–120 W".
export function parseRange(heatRange: string): { min: number; max: number; perSection: boolean } {
  const perSection = /per section/i.test(heatRange);
  const m = heatRange.match(/(\d+)\D+?(\d+)/);
  const min = m ? +m[1] : 0;
  const max = m ? +m[2] : 0;
  return { min, max, perSection };
}

// Parse "300 / 500 / 600 mm" → [300, 500, 600] (ascending, mm).
export function parseHeights(heights: string): number[] {
  return (heights.match(/\d+/g) || []).map(Number).sort((a, b) => a - b);
}

// Linear interpolation of output across a product's height range: min output at
// the shortest listed height, max at the tallest. For column / bimetal this is
// per-section watts; for designer / towel it is whole-unit watts.
export function outputAtHeight(h: number, heightList: number[], min: number, max: number): number {
  if (heightList.length === 0) return max;
  const hMin = heightList[0];
  const hMax = heightList[heightList.length - 1];
  if (hMax === hMin) return max;
  return clamp(min + ((h - hMin) / (hMax - hMin)) * (max - min), min, max);
}

// ── Butt-welded designer picks (real SD / DD data) ───────────────────────────
// Welded designer radiators ship as SD (single row of tubes = "one rod") or DD
// (double row = "two rods counted as one unit"). Each concrete SKU — config ×
// height × 柱数(pipes) → rated watts — comes straight from the official catalog
// (lib/heatTable.ts), so we recommend a real orderable size, never an estimate.
export type DesignerConfig = "SD" | "DD";
export interface DesignerHeatRow {
  cfg: DesignerConfig;
  h: number; // height, mm
  w: number; // unit width, mm
  d: number; // depth, mm
  pipes: number; // 柱数
  watt: number; // rated output @ EN442 ΔT50, W
}
export interface DesignerPick extends DesignerHeatRow {
  units: number; // how many units in parallel
  total: number; // combined output, W
  fits: boolean; // false → nothing in the install slot; showing tallest as fallback
}

// Pick the best concrete designer SKU for a required output, honouring the
// install-slot clearance (mm; ≤0 = no limit). Best-fit = the single unit with
// the smallest rated output that still covers demand (least oversizing); SD wins
// ties over DD (slimmer / cheaper). If no single unit reaches demand, parallel N
// of the highest-output fitting SKU. If nothing fits the slot, flag it and fall
// back to the physically smallest unit so the caller can warn the buyer.
export function designerRec(rows: DesignerHeatRow[], qNeed: number, installH: number, installW: number): DesignerPick | null {
  if (rows.length === 0) return null;
  const fits = (r: DesignerHeatRow) => (installH <= 0 || r.h <= installH) && (installW <= 0 || r.w <= installW);
  const pool = rows.filter(fits);
  if (pool.length === 0) {
    const smallest = rows.slice().sort((a, b) => a.h - b.h || a.w - b.w)[0];
    return { ...smallest, units: 1, total: smallest.watt, fits: false };
  }
  const singles = pool
    .filter((r) => r.watt >= qNeed)
    .sort((a, b) => a.watt - b.watt || (a.cfg === b.cfg ? a.w - b.w : a.cfg === "SD" ? -1 : 1));
  if (singles.length) return { ...singles[0], units: 1, total: singles[0].watt, fits: true };
  const best = pool.slice().sort((a, b) => b.watt - a.watt || a.w - b.w)[0];
  const units = Math.max(2, Math.ceil(qNeed / best.watt));
  return { ...best, units, total: best.watt * units, fits: true };
}

// Primary radiator family to push, per heating method + room. Central heating
// runs open/semi-open with dirtier water → column / bimetal resist corrosion and
// clean up easily; independent (closed, clean) systems suit fast, cost-effective
// panels; bathrooms always get a towel rail. Returns the ordered categories.
export type Category = "designer" | "column" | "towel" | "bimetal" | "panel";
export function primaryCategory(heating: Heating, room: RoomType): Category {
  if (room === "bathroom") return "towel";
  return heating === "central" ? "column" : "panel";
}
