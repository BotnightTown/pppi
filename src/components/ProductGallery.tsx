"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-linear-to-b from-[#f1e8da] to-[#e3d2b6]">
        {current ? (
          <Image
            src={current}
            alt={alt}
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          // Заглушка, якщо в БД немає зображень
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-1/2 w-1/3 flex-col items-center">
              <span className="h-3 w-5 rounded-t bg-[#9a7b4f]" />
              <span className="h-2 w-8 bg-[#7d6240]" />
              <span className="w-full flex-1 rounded-xl border border-white/70 bg-white/60 shadow-md" />
            </span>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <ul className="grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Показати зображення ${i + 1}`}
                aria-current={i === active}
                className={`relative block aspect-square w-full overflow-hidden rounded-xl border-2 transition-colors ${
                  i === active
                    ? "border-[#9a7b4f]"
                    : "border-transparent hover:border-stone-300"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  unoptimized
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
