"use client";

import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { ExternalLink, ImageOff, X, ZoomIn, FileText, FolderOpen, Globe, ClipboardList } from "lucide-react";

import { REALISATION_LABEL, REALISATION_ORDER } from "@/lib/labels";

export type RealisationData = {
  id: number;
  title: string;
  category: string;
  imageUrl: string | null;
  author: string | null;
  externalUrl: string | null;
};

const LINK_CATEGORIES = ["DOCUMENT", "FORMULAIRE", "DOSSIER", "SITE_EXTERNE"];
const isLinkType = (c: string) => LINK_CATEGORIES.includes(c);

export function RealisationsGallery({ items }: { items: RealisationData[] }) {
  const categories = REALISATION_ORDER.filter((c) => items.some((i) => i.category === c));
  const [active, setActive] = useState<string>("ALL");
  const [zoom, setZoom] = useState<RealisationData | null>(null);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  const visible = active === "ALL" ? items : items.filter((i) => i.category === active);
  const shownCategories = REALISATION_ORDER.filter((c) => visible.some((i) => i.category === c));

  return (
    <div className="mt-8">
      {/* Onglets de filtre */}
      <div className="flex flex-wrap gap-2">
        <Tab label={`Tout (${items.length})`} on={active === "ALL"} onClick={() => setActive("ALL")} />
        {categories.map((c) => (
          <Tab
            key={c}
            label={`${REALISATION_LABEL[c]} (${items.filter((i) => i.category === c).length})`}
            on={active === c}
            onClick={() => setActive(c)}
          />
        ))}
      </div>

      {/* Sections par catégorie */}
      <div className="mt-8 space-y-10">
        {shownCategories.map((cat) => {
          const catItems = visible.filter((i) => i.category === cat);
          return (
            <section key={cat}>
              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-base font-semibold text-steel-100">
                  {REALISATION_LABEL[cat]}
                </h3>
                <span className="h-px flex-1 bg-navy-700" />
                <span className="label-tag">{catItems.length}</span>
              </div>

              {isLinkType(cat) ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {catItems.map((r) => (
                    <DocCard key={r.id} item={r} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {catItems.map((r) => (
                    <Tile key={r.id} item={r} onZoom={() => setZoom(r)} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Lightbox */}
      {zoom?.imageUrl && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/90 p-4 backdrop-blur-sm"
          onClick={() => setZoom(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-lg text-steel-200 hover:bg-navy-800 hover:text-steel-100"
            aria-label="Fermer"
            onClick={() => setZoom(null)}
          >
            <X size={22} />
          </button>
          <figure className="flex max-h-full max-w-4xl flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={zoom.imageUrl}
              alt={zoom.title}
              className="max-h-[80vh] w-auto rounded-lg object-contain ring-1 ring-navy-600"
            />
            <figcaption className="text-center">
              <p className="font-medium text-steel-100">{zoom.title}</p>
              {zoom.author && <p className="text-sm text-steel-500">par {zoom.author}</p>}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

function Tab({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
        on
          ? "bg-gold-500 text-navy-950"
          : "bg-navy-800 text-steel-300 ring-1 ring-navy-600 hover:text-steel-100",
      )}
    >
      {label}
    </button>
  );
}

/** Grande vignette pour affiches / logos (avec agrandissement). */
function Tile({ item, onZoom }: { item: RealisationData; onZoom: () => void }) {
  const canZoom = Boolean(item.imageUrl);
  return (
    <button
      type="button"
      onClick={canZoom ? onZoom : undefined}
      className={clsx(
        "panel group overflow-hidden !p-0 text-left transition-colors hover:border-gold-500/40",
        canZoom && "cursor-zoom-in",
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-navy-800">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.title}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center text-navy-500">
            <ImageOff size={28} strokeWidth={1.5} />
          </div>
        )}
        {canZoom && (
          <span className="absolute right-2 top-2 grid size-6 place-items-center rounded bg-navy-950/80 text-steel-300 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            <ZoomIn size={13} />
          </span>
        )}
      </div>
      <div className="px-3 py-2.5">
        <p className="line-clamp-2 text-sm font-medium text-steel-100">{item.title}</p>
        {item.author && <p className="mt-0.5 truncate text-xs text-steel-500">par {item.author}</p>}
      </div>
    </button>
  );
}

/** Case compacte pour documents / dossiers / sites externes. */
function DocCard({ item }: { item: RealisationData }) {
  const Icon =
    item.category === "DOCUMENT"
      ? FileText
      : item.category === "FORMULAIRE"
        ? ClipboardList
        : item.category === "DOSSIER"
          ? FolderOpen
          : Globe;

  const subtitle =
    item.category === "SITE_EXTERNE" && item.externalUrl
      ? item.externalUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : `${REALISATION_LABEL[item.category]}${item.author ? ` · par ${item.author}` : ""}`;

  const content = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-navy-800 text-gold-400 ring-1 ring-navy-600">
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-steel-100">{item.title}</p>
        <p className="truncate text-xs text-steel-500">{subtitle}</p>
      </div>
      {item.externalUrl && <ExternalLink size={15} className="shrink-0 text-steel-500" />}
    </>
  );

  const className =
    "panel flex items-center gap-3 px-4 py-3 transition-colors hover:border-gold-500/40 hover:bg-navy-800/60";

  if (item.externalUrl) {
    return (
      <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return <div className={className}>{content}</div>;
}
