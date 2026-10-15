"use client";

// ============================================================================
// Canton Fair 2026 site-wide announcement bar — all 5 locales, per owner 珊
// (2026-10-15). Copy lives in dictionaries/<locale>.json under
// announcement.cantonFair; booth numbers are owner-confirmed — never edit
// them here. The whole bar links to that locale's Canton Fair blog post.
//
// Date gating (through 2026-10-27 inclusive, China time):
//  - layout.tsx skips rendering entirely once a build happens after expiry;
//  - the effect below also hides it client-side on stale static HTML built
//    before the cutoff, so the bar disappears without needing a redeploy.
// ============================================================================

import { useEffect, useState } from "react";
import Link from "next/link";
import { CANTON_FAIR_EXPIRY_MS } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

export default function CantonFairBar({ locale, text }: { locale: Locale; text: string }) {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (Date.now() >= CANTON_FAIR_EXPIRY_MS) setExpired(true);
  }, []);

  if (expired) return null;

  return (
    // relative z-30 so the bar paints above the homepage Hero (which pulls
    // itself up over this slot via -mt-[96px]) while staying below the fixed
    // header (z-50) — same stacking pattern as BrandProtectionBar.
    <Link
      href={`/${locale}/blog/meet-jd-radiator-140th-canton-fair-2026`}
      className="relative z-30 block bg-[var(--jd-red)] hover:bg-[var(--jd-orange-dark)] transition-colors text-white text-center text-[12px] sm:text-[13px] font-semibold leading-snug px-4 py-2"
    >
      {text}
      <span aria-hidden className="ml-1.5">→</span>
    </Link>
  );
}
