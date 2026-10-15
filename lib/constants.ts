export const BASE_URL = "https://jdradiator.com";
export const SITE_NAME = "Jiuding Radiator";

// Canton Fair 2026 announcement bar expiry: end of 2026-10-27 (last Phase 2
// day, inclusive) in China time (UTC+8). Used by the server layout (build-time
// gate) and CantonFairBar (client-side gate for stale static HTML).
export const CANTON_FAIR_EXPIRY_MS = Date.UTC(2026, 9, 27, 16, 0, 0);
