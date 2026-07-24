"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Link2, Link2Off, Search } from "lucide-react";

import { Avatar } from "@/components/Avatar";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { deleteMember } from "@/app/admin/membres/actions";

export type MemberRow = {
  id: number;
  slug: string;
  pseudo: string;
  avatarUrl: string | null;
  discordAvatarUrl: string | null;
  title: string | null;
  role: string;
  status: string;
  discordId: string | null;
};

export function AdminMemberList({ members }: { members: MemberRow[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const filtered = query
    ? members.filter(
        (m) =>
          m.pseudo.toLowerCase().includes(query) ||
          (m.title ?? "").toLowerCase().includes(query),
      )
    : members;

  return (
    <div>
      {/* Recherche */}
      <div className="relative mb-4">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel-500"
        />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher un membre…"
          className="w-full rounded-lg border border-navy-600 bg-navy-900 py-2 pl-9 pr-3 text-sm text-steel-100 placeholder:text-steel-500 focus:border-gold-500/60 focus:outline-none"
        />
        {query && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-steel-500">
            {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="py-6 text-center text-sm text-steel-500">Aucun membre trouvé.</p>
        )}
        {filtered.map((m) => (
          <div key={m.id} className="panel flex items-center gap-3 px-3 py-2.5">
            <Avatar src={m.avatarUrl} discordSrc={m.discordAvatarUrl} name={m.pseudo} size={38} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-steel-100">{m.pseudo}</p>
              <p className="truncate text-xs text-steel-500">
                {m.title ?? (m.role === "FONDATEUR" ? "Fondateur" : "Membre")}
                {m.status === "VETERAN" && " · Vétéran"}
              </p>
            </div>

            <span
              className={
                m.discordId
                  ? "hidden items-center gap-1 text-xs text-ok-500 sm:inline-flex"
                  : "hidden items-center gap-1 text-xs text-steel-500 sm:inline-flex"
              }
              title={m.discordId ? `Discord ID : ${m.discordId}` : "Non rattaché"}
            >
              {m.discordId ? <Link2 size={13} /> : <Link2Off size={13} />}
              {m.discordId ? "Rattaché" : "Non rattaché"}
            </span>

            <Link
              href={`/admin/membres/${m.id}`}
              className="grid size-8 place-items-center rounded-lg text-steel-300 hover:bg-navy-800 hover:text-gold-400"
              title="Éditer"
            >
              <Pencil size={15} />
            </Link>

            <form action={deleteMember}>
              <input type="hidden" name="id" value={m.id} />
              <ConfirmButton message={`Supprimer la fiche de ${m.pseudo} ?`} className="!px-2">
                <Trash2 size={15} />
              </ConfirmButton>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
