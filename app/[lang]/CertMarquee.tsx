"use client";

import Image from "next/image";

type Cert = { img: string; pdf: string; label: string };

// Horizontally scrolling strip of real certificate scans (CE / CPR · EN 442).
// Each card links to the full PDF. Hover pauses the scroll. Replaces the old
// static text-badge row with rolling visual proof of genuine certification.
export default function CertMarquee({ certs, viewAllLabel, viewAllHref }: {
  certs: Cert[];
  viewAllLabel: string;
  viewAllHref: string;
}) {
  const row = [...certs, ...certs]; // doubled for a seamless loop
  return (
    <div className="relative max-w-[1600px] mx-auto">
      <div className="pointer-events-none absolute left-0 inset-y-0 w-12 lg:w-24 z-10 bg-gradient-to-r from-[#FFF7ED] to-transparent" />
      <div className="pointer-events-none absolute right-0 inset-y-0 w-12 lg:w-24 z-10 bg-gradient-to-l from-[#FFF7ED] to-transparent" />
      <div className="flex gap-5 w-max animate-marquee hover:[animation-play-state:paused] py-2">
        {row.map((c, i) => (
          <a
            key={i}
            href={c.pdf}
            target="_blank"
            rel="noopener noreferrer"
            title={c.label}
            className="group relative w-[170px] lg:w-[210px] aspect-[1/1.414] shrink-0 rounded-lg overflow-hidden bg-white border border-[#F1E7DC] shadow-[0_6px_20px_rgba(30,41,59,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(234,88,12,0.18)]"
          >
            <Image
              src={c.img}
              alt={c.label}
              fill
              className="object-contain p-1.5"
              sizes="210px"
            />
            {/* Hover overlay with label + view hint */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-[#0B1220]/90 to-transparent px-3 py-2.5">
              <span className="block text-white text-xs font-semibold leading-tight">{c.label}</span>
            </div>
          </a>
        ))}
      </div>
      <div className="text-center mt-6">
        <a href={viewAllHref} className="inline-flex items-center gap-1.5 text-[#1E293B] font-bold text-sm hover:text-[var(--jd-red)] transition-colors">
          {viewAllLabel} <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
