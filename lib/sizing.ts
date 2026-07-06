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
// Default flow temperature per heating method.
export const SUPPLY_DEFAULT: Record<Heating, number> = { central: 60, independent: 70 };

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
