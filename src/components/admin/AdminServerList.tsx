"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Search, Server } from "lucide-react";

import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { deleteServer } from "@/app/admin/contenu/actions";

export type ServerRow = {
  id: number;
  name: string;
  logoUrl: string | null;
  isClosed: boolean;
};

export function AdminServerList({ servers }: { servers: ServerRow[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const filtered = query
    ? servers.filter((s) => s.name.toLowerCase().includes(query))
    : servers;

  return (
    <div className="mb-4">
      <div className="relative mb-3">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel-500" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher un serveur…"
          className="w-full rounded-lg border border-navy-600 bg-navy-900 py-2 pl-9 pr-3 text-sm text-steel-100 placeholder:text-steel-500 focus:border-gold-500/60 focus:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-6 text-center text-sm text-steel-500">Aucun serveur trouvé.</p>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 rounded-lg bg-navy-900 px-2.5 py-1.5 ring-1 ring-navy-600"
            >
              {s.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.logoUrl}
                  alt={s.name}
                  className="size-7 shrink-0 rounded object-contain"
                />
              ) : (
                <span className="grid size-7 shrink-0 place-items-center rounded bg-navy-800 text-steel-500">
                  <Server size={13} />
                </span>
              )}
              <span className="min-w-0 flex-1 truncate text-sm text-steel-100">{s.name}</span>
              {s.isClosed && <span className="text-[0.6rem] font-medium text-crimson-400">FERMÉ</span>}
              <Link
                href={`/admin/serveurs/${s.id}`}
                className="grid size-7 place-items-center rounded text-steel-300 hover:bg-navy-800 hover:text-gold-400"
                title="Éditer"
              >
                <Pencil size={13} />
              </Link>
              <form action={deleteServer}>
                <input type="hidden" name="id" value={s.id} />
                <ConfirmButton message={`Supprimer ${s.name} ?`} className="!bg-transparent !px-0 !py-0 !ring-0">
                  <Trash2 size={13} />
                </ConfirmButton>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
