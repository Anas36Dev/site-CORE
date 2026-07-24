"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { ChevronDown, Check, Search, ShieldCheck } from "lucide-react";

import { Avatar } from "@/components/Avatar";
import { Select, PrimaryButton } from "@/components/admin/ui";
import { PERMISSIONS, PERMISSION_LABEL, type Permission } from "@/lib/permissions";
import { updateMemberAccess } from "@/app/admin/permissions/actions";

export type PermMember = {
  id: number;
  pseudo: string;
  avatarUrl: string | null;
  discordAvatarUrl: string | null;
  role: string;
  permissions: string[];
  discordId: string | null;
};

export function PermissionsManager({ members }: { members: PermMember[] }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  const query = q.trim().toLowerCase();
  const filtered = query
    ? members.filter((m) => m.pseudo.toLowerCase().includes(query))
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
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="py-6 text-center text-sm text-steel-500">Aucun membre trouvé.</p>
        )}
        {filtered.map((m) => {
          const isOpen = open === m.id;
          const count = m.permissions.length;
          return (
            <div key={m.id} className="panel overflow-hidden !p-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : m.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-navy-800/60"
              >
                <Avatar
                  src={m.avatarUrl}
                  discordSrc={m.discordAvatarUrl}
                  name={m.pseudo}
                  size={36}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-steel-100">{m.pseudo}</p>
                  <p className="truncate text-xs text-steel-500">
                    {m.role === "FONDATEUR" ? "Fondateur" : "Membre"}
                    {count > 0
                      ? ` · ${count} permission${count > 1 ? "s" : ""}`
                      : " · aucune permission"}
                  </p>
                </div>
                {count > 0 && <ShieldCheck size={15} className="shrink-0 text-gold-400" />}
                <ChevronDown
                  size={16}
                  className={clsx("shrink-0 text-steel-500 transition-transform", isOpen && "rotate-180")}
                />
              </button>

              {isOpen && (
                <form
                  action={updateMemberAccess}
                  className="space-y-3 border-t border-navy-700 px-4 py-4"
                >
                  <input type="hidden" name="id" value={m.id} />
                  <div className="flex flex-wrap items-center gap-3">
                    <Select name="role" defaultValue={m.role} className="w-auto">
                      <option value="MEMBRE">Membre</option>
                      <option value="FONDATEUR">Fondateur</option>
                    </Select>
                    <PrimaryButton type="submit" className="!px-3">
                      <Check size={15} /> Enregistrer
                    </PrimaryButton>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {PERMISSIONS.map((p) => (
                      <label
                        key={p}
                        className="flex items-center gap-2 rounded-lg bg-navy-900 px-2.5 py-1.5 text-xs text-steel-300 ring-1 ring-navy-600"
                      >
                        <input
                          type="checkbox"
                          name="permissions"
                          value={p}
                          defaultChecked={m.permissions.includes(p)}
                          className="accent-gold-500"
                        />
                        {PERMISSION_LABEL[p as Permission]}
                      </label>
                    ))}
                  </div>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
