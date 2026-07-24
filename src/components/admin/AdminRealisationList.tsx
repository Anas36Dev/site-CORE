"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Search } from "lucide-react";

import { Badge } from "@/components/Badge";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { REALISATION_LABEL } from "@/lib/labels";
import { deleteRealisation } from "@/app/admin/realisations/actions";

export type RealisationRow = {
  id: number;
  title: string;
  author: string | null;
  category: string;
};

export function AdminRealisationList({ items }: { items: RealisationRow[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const filtered = query
    ? items.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          (r.author ?? "").toLowerCase().includes(query),
      )
    : items;

  return (
    <div>
      <div className="relative mb-4">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel-500" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher une réalisation…"
          className="w-full rounded-lg border border-navy-600 bg-navy-900 py-2 pl-9 pr-3 text-sm text-steel-100 placeholder:text-steel-500 focus:border-gold-500/60 focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="py-6 text-center text-sm text-steel-500">Aucune réalisation trouvée.</p>
        )}
        {filtered.map((r) => (
          <div key={r.id} className="panel flex items-center gap-3 px-3 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-steel-100">{r.title}</p>
              {r.author && <p className="truncate text-xs text-steel-500">par {r.author}</p>}
            </div>
            <Badge tone="steel">{REALISATION_LABEL[r.category] ?? r.category}</Badge>
            <Link
              href={`/admin/realisations/${r.id}`}
              className="grid size-8 place-items-center rounded-lg text-steel-300 hover:bg-navy-800 hover:text-gold-400"
              title="Éditer"
            >
              <Pencil size={15} />
            </Link>
            <form action={deleteRealisation}>
              <input type="hidden" name="id" value={r.id} />
              <ConfirmButton message={`Supprimer « ${r.title} » ?`} className="!px-2">
                <Trash2 size={15} />
              </ConfirmButton>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
