import { notFound } from "next/navigation";
import { Trash2, Plus, Check } from "lucide-react";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/guard";
import { hasPermission } from "@/lib/auth";
import { asStringArray } from "@/lib/labels";
import { AdminHeader, Field, Input, Select, PrimaryButton } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { MemberForm } from "@/components/admin/MemberForm";
import {
  updateMember,
  deleteMember,
  addParticipation,
  removeParticipation,
  updateParticipationGrade,
} from "../actions";

export const dynamic = "force-dynamic";

export default async function EditMembrePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const me = await requirePermission("GESTION_MEMBRES");
  const { id } = await params;
  const memberId = Number(id);

  const [member, projects] = await Promise.all([
    db.member.findUnique({
      where: { id: memberId },
      include: {
        participations: { orderBy: [{ order: "asc" }], include: { project: true } },
      },
    }),
    db.project.findMany({ orderBy: [{ name: "asc" }, { category: "asc" }, { year: "desc" }] }),
  ]);
  if (!member) notFound();

  return (
    <div>
      <AdminHeader
        title={`Éditer — ${member.pseudo}`}
        action={
          <form action={deleteMember}>
            <input type="hidden" name="id" value={member.id} />
            <ConfirmButton message={`Supprimer la fiche de ${member.pseudo} ?`}>
              <Trash2 size={15} />
              Supprimer
            </ConfirmButton>
          </form>
        }
      />

      <MemberForm
        action={updateMember}
        member={member}
        canEditPermissions={hasPermission(me, "GESTION_PERMISSIONS")}
      />

      {/* Participations aux projets */}
      <section className="panel mt-8 px-5 py-5">
        <h2 className="mb-4 text-base font-semibold text-steel-100">
          Projets du membre
        </h2>

        {member.participations.length > 0 ? (
          <div className="mb-5 space-y-2">
            {member.participations.map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-center gap-2 rounded-lg bg-navy-900 px-3 py-2 ring-1 ring-navy-700"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-steel-100">
                    {p.project.name}
                    <span className="text-steel-500"> · {p.project.year}</span>
                  </p>
                  {p.structure && (
                    <p className="truncate text-xs text-steel-300">{p.structure}</p>
                  )}
                </div>
                {/* Grade éditable */}
                <form action={updateParticipationGrade} className="flex items-center gap-1">
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="memberId" value={member.id} />
                  <Input
                    name="grade"
                    defaultValue={p.grade ?? ""}
                    placeholder="Grade"
                    className="w-32 !py-1 text-xs"
                  />
                  <PrimaryButton type="submit" className="!px-2 !py-1" title="Enregistrer le grade">
                    <Check size={14} />
                  </PrimaryButton>
                </form>
                <form action={removeParticipation}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="memberId" value={member.id} />
                  <ConfirmButton
                    message={`Retirer ${p.project.name}${p.structure ? ` (${p.structure})` : ""} ?`}
                    className="!px-2 !py-1"
                  >
                    <Trash2 size={14} />
                  </ConfirmButton>
                </form>
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-5 text-sm text-steel-500">Aucun projet rattaché.</p>
        )}

        {/* Ajout / mise à jour d'une participation */}
        <form action={addParticipation} className="flex flex-wrap items-end gap-3">
          <input type="hidden" name="memberId" value={member.id} />
          <Field label="Projet · structure" htmlFor="target">
            <Select id="target" name="target" required className="min-w-64">
              {projects.map((pr) => {
                const structs = asStringArray(pr.structures);
                const cat = pr.category === "ILLEGAL" ? "Illégal" : "Légal";
                if (structs.length === 0) {
                  return (
                    <option key={pr.id} value={`${pr.id}|`}>
                      {pr.name} · {pr.year} ({cat})
                    </option>
                  );
                }
                return structs.map((s) => (
                  <option key={`${pr.id}-${s}`} value={`${pr.id}|${s}`}>
                    {pr.name} · {s} ({cat})
                  </option>
                ));
              })}
            </Select>
          </Field>
          <Field label="Grade (optionnel)" htmlFor="grade">
            <Input id="grade" name="grade" placeholder="Sheriff, Chief…" />
          </Field>
          <PrimaryButton type="submit">
            <Plus size={16} /> Ajouter
          </PrimaryButton>
        </form>
      </section>
    </div>
  );
}
