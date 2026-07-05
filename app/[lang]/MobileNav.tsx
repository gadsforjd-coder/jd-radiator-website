"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

// Mobile-only navigation. The desktop <nav> in layout.tsx is `hidden lg:flex`,
// so below the lg breakpoint there was no way to reach the nav links from the
// top bar (only the footer had them). This renders a hamburger button (shown
// only below lg) that opens a full-width dropdown panel with the same links.
type NavLabels = {
  products: string;
  about: string;
  credentials: string;
  cases: string;
  documents: string;
  faq: string;
  blog: string;
  contact: string;
  calculator: string;
};

export function MobileNav({ locale, nav }: { locale: Locale; nav: NavLabels }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close the menu whenever the route changes (after a link tap).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on outside click.
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links: { href: string; label: string }[] = [
    { href: `/${locale}/products`, label: nav.products },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/credentials`, label: nav.credentials },
    { href: `/${locale}/cases`, label: nav.cases },
    { href: `/${locale}/documents`, label: nav.documents },
    { href: `/${locale}/faq`, label: nav.faq },
    { href: `/${locale}/blog`, label: nav.blog },
    { href: `/${locale}/contact`, label: nav.contact },
    { href: `/${locale}/calculator`, label: nav.calculator },
  ];

  return (
    <div ref={ref} className="lg:hidden relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        aria-expanded={open}
        className="w-11 h-11 flex items-center justify-center rounded-full border border-[var(--jd-red)] text-[var(--jd-red)] hover:bg-[var(--jd-red)]/5 transition-colors"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        )}
      </button>
      {open && (
        <div className="fixed left-0 right-0 top-[96px] bg-white border-b border-[#F1E7DC] shadow-[0_12px_24px_rgba(30,41,59,0.08)] z-50 max-h-[calc(100vh-96px)] overflow-y-auto">
          <nav className="flex flex-col py-2 px-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3.5 border-b border-[#F1E7DC] last:border-b-0 font-semibold text-base text-[#1E293B]/80 hover:text-[var(--jd-red)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
