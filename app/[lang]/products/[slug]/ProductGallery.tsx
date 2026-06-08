"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, model }: { images: string[]; model: string }) {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={images[selected]}
          alt={`${model} product photo`}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={selected === 0}
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setSelected(i)}
              className={`relative w-16 h-16 flex-shrink-0 rounded border-2 overflow-hidden transition-colors ${
                i === selected ? "border-[var(--jd-red)]" : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image src={src} alt={`${model} view ${i + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
