"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Search } from "lucide-react";

import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { deleteGallery } from "@/app/admin/contenu/actions";

export type GalleryRow = {
  id: number;
  imageUrl: string;
  caption: string | null;
};

export function AdminGalleryList({ items }: { items: GalleryRow[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const filtered = query
    ? items.filter((g) => (g.caption ?? "").toLowerCase().includes(query))
    : items;

  return (
    <div className="mb-4">
      <div className="relative mb-3">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel-500" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher une image (légende)…"
          className="w-full rounded-lg border border-navy-600 bg-navy-900 py-2 pl-9 pr-3 text-sm text-steel-100 placeholder:text-steel-500 focus:border-gold-500/60 focus:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-6 text-center text-sm text-steel-500">Aucune image trouvée.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {filtered.map((g) => (
            <div key={g.id} className="panel overflow-hidden !p-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.imageUrl} alt={g.caption ?? ""} className="aspect-video w-full object-cover" />
              <div className="flex items-center gap-2 p-2">
                <Link
                  href={`/admin/galerie/${g.id}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-navy-800 px-2 py-1 text-xs text-steel-100 ring-1 ring-navy-600 hover:text-gold-400"
                >
                  <Pencil size={12} /> Éditer
                </Link>
                <form action={deleteGallery}>
                  <input type="hidden" name="id" value={g.id} />
                  <ConfirmButton message="Supprimer cette image ?" className="!px-2 !py-1 text-xs">
                    <Trash2 size={12} />
                  </ConfirmButton>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
