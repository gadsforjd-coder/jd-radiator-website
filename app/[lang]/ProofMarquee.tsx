"use client";

import Image from "next/image";

type Item = { src: string; label: string };

// Continuously scrolling strip of production / capability / certification
// photos. Replaces the old static stats bar (whose numbers duplicated the hero
// strip) with rolling visual proof. Hover pauses the scroll.
export default function ProofMarquee({ items }: { items: Item[] }) {
  const row = [...items, ...items]; // doubled for a seamless loop
  return (
    <section className="bg-[#FFF7ED] pb-24 lg:pb-32 -mt-4 overflow-hidden">
      <div className="relative max-w-[1600px] mx-auto">
        <div className="pointer-events-none absolute left-0 inset-y-0 w-16 lg:w-28 z-10 bg-gradient-to-r from-[#FFF7ED] to-transparent" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-16 lg:w-28 z-10 bg-gradient-to-l from-[#FFF7ED] to-transparent" />
        <div className="flex gap-5 w-max animate-marquee hover:[animation-play-state:paused]">
          {row.map((im, i) => (
            <figure
              key={i}
              className="relative w-[280px] lg:w-[360px] aspect-[16/10] shrink-0 rounded-xl overflow-hidden border border-[#F1E7DC] shadow-[0_6px_20px_rgba(30,41,59,0.07)]"
            >
              <Image src={im.src} alt={im.label} fill className="object-cover" sizes="360px" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1220]/85 to-transparent text-white text-sm font-semibold px-4 py-3">
                {im.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
