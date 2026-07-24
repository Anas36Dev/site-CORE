"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type GalleryItem = {
  id: number;
  imageUrl: string;
  caption: string | null;
};

function splitCaption(caption: string | null) {
  if (!caption) return { main: "", source: "" };
  const [main, ...rest] = caption.split(" — ");
  return { main, source: rest.join(" — ") };
}

export function HomeGallery({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  const current = index !== null ? items[index] : null;
  const cur = splitCaption(current?.caption ?? null);

  return (
    <section className="mt-20">
      <p className="label-tag mb-4 text-center">En images</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((g, i) => {
          const { main, source } = splitCaption(g.caption);
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => setIndex(i)}
              className="panel group overflow-hidden !p-0 text-left transition-colors hover:border-gold-500/40"
            >
              <div className="relative aspect-video overflow-hidden bg-navy-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.imageUrl}
                  alt={main || "CORE France Project"}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {g.caption && (
                <div className="px-3 py-2 text-center">
                  <p className="line-clamp-2 text-xs font-medium text-steel-200">{main}</p>
                  {source && (
                    <p className="mt-0.5 truncate text-[0.68rem] italic text-gold-400">{source}</p>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-navy-950/92 p-4 backdrop-blur-sm"
          onClick={() => setIndex(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-lg text-steel-200 hover:bg-navy-800 hover:text-steel-100"
            aria-label="Fermer"
            onClick={() => setIndex(null)}
          >
            <X size={22} />
          </button>

          {/* Précédent / suivant */}
          <button
            type="button"
            aria-label="Précédent"
            onClick={(e) => { e.stopPropagation(); setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)); }}
            className="absolute left-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-lg text-steel-200 hover:bg-navy-800 hover:text-steel-100 sm:left-6"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            type="button"
            aria-label="Suivant"
            onClick={(e) => { e.stopPropagation(); setIndex((i) => (i === null ? i : (i + 1) % items.length)); }}
            className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-lg text-steel-200 hover:bg-navy-800 hover:text-steel-100 sm:right-6"
          >
            <ChevronRight size={26} />
          </button>

          <figure className="flex max-h-full max-w-5xl flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.imageUrl}
              alt={cur.main || "CORE France Project"}
              className="max-h-[78vh] w-auto rounded-lg object-contain ring-1 ring-navy-600"
            />
            {current.caption && (
              <figcaption className="max-w-2xl text-center">
                <p className="text-sm font-medium text-steel-100">{cur.main}</p>
                {cur.source && <p className="text-xs italic text-gold-400">{cur.source}</p>}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </section>
  );
}
