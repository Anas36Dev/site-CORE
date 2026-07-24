"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Search } from "lucide-react";

import { Badge } from "@/components/Badge";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { deleteProject } from "@/app/admin/projets/actions";

export type ProjectRow = {
  id: number;
  name: string;
  year: number;
  duration: string | null;
  category: string;
};

export function AdminProjectList({ projects }: { projects: ProjectRow[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const filtered = query
    ? projects.filter(
        (p) => p.name.toLowerCase().includes(query) || String(p.year).includes(query),
      )
    : projects;

  return (
    <div>
      <div className="relative mb-4">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel-500" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher un projet…"
          className="w-full rounded-lg border border-navy-600 bg-navy-900 py-2 pl-9 pr-3 text-sm text-steel-100 placeholder:text-steel-500 focus:border-gold-500/60 focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="py-6 text-center text-sm text-steel-500">Aucun projet trouvé.</p>
        )}
        {filtered.map((p) => (
          <div key={p.id} className="panel flex items-center gap-3 px-3 py-2.5">
            <span className="font-mono text-sm text-gold-400">{p.year}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-steel-100">{p.name}</p>
              <p className="truncate text-xs text-steel-500">{p.duration}</p>
            </div>
            <Badge tone={p.category === "ILLEGAL" ? "crimson" : "federal"}>
              {p.category === "ILLEGAL" ? "Illégal" : "Légal"}
            </Badge>
            <Link
              href={`/admin/projets/${p.id}`}
              className="grid size-8 place-items-center rounded-lg text-steel-300 hover:bg-navy-800 hover:text-gold-400"
              title="Éditer"
            >
              <Pencil size={15} />
            </Link>
            <form action={deleteProject}>
              <input type="hidden" name="id" value={p.id} />
              <ConfirmButton message={`Supprimer le projet ${p.name} (${p.year}) ?`} className="!px-2">
                <Trash2 size={15} />
              </ConfirmButton>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
