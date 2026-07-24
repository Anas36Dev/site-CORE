import { notFound } from "next/navigation";
import { Trash2, Plus, UserPlus, Check } from "lucide-react";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/guard";
import { AdminHeader, Field, Input, Select, PrimaryButton } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { Avatar } from "@/components/Avatar";
import { asStringArray } from "@/lib/labels";
import {
  updateProject,
  deleteProject,
  addProjectParticipant,
  removeProjectParticipant,
  updateProjectParticipantGrade,
} from "../actions";

export const dynamic = "force-dynamic";

export default async function EditProjetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("GESTION_PROJETS");
  const { id } = await params;
  const projectId = Number(id);

  const [project, members] = await Promise.all([
    db.project.findUnique({
      where: { id: projectId },
      include: {
        participations: {
          orderBy: [{ order: "asc" }],
          include: { member: true },
        },
      },
    }),
    db.member.findMany({ orderBy: [{ pseudo: "asc" }] }),
  ]);
  if (!project) notFound();

  // Structures à afficher : celles du projet + toute structure déjà utilisée.
  const declared = asStringArray(project.structures);
  const used = Array.from(new Set(project.participations.map((p) => p.structure)));
  const structures = Array.from(new Set([...declared, ...used]));
  if (structures.length === 0) structures.push(""); // projet sans structure

  return (
    <div>
      <AdminHeader
        title={`Éditer — ${project.name}`}
        action={
          <form action={deleteProject}>
            <input type="hidden" name="id" value={project.id} />
            <ConfirmButton message={`Supprimer le projet ${project.name} ?`}>
              <Trash2 size={15} />
              Supprimer
            </ConfirmButton>
          </form>
        }
      />

      <ProjectForm action={updateProject} project={project} />

      {/* Membres par structure */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-steel-100">
          <UserPlus size={18} className="text-gold-400" />
          Membres par structure
        </h2>

        <div className="grid gap-4 lg:grid-cols-2">
          {structures.map((structure) => {
            const parts = project.participations.filter((p) => p.structure === structure);
            return (
              <div key={structure || "__general__"} className="panel px-4 py-4">
                <h3 className="mb-3 text-sm font-semibold text-gold-400">
                  {structure || "Général"}{" "}
                  <span className="text-steel-500">({parts.length})</span>
                </h3>

                <div className="mb-4 space-y-2">
                  {parts.length === 0 && (
                    <p className="text-xs text-steel-500">Aucun membre.</p>
                  )}
                  {parts.map((p) => (
                    <div
                      key={p.id}
                      className="flex flex-wrap items-center gap-2 rounded-lg bg-navy-900 px-2.5 py-2 ring-1 ring-navy-700"
                    >
                      <Avatar
                        src={p.member.avatarUrl}
                        discordSrc={p.member.discordAvatarUrl}
                        name={p.member.pseudo}
                        size={28}
                      />
                      <p className="min-w-0 flex-1 truncate text-sm font-medium text-steel-100">
                        {p.member.pseudo}
                      </p>
                      <form action={updateProjectParticipantGrade} className="flex items-center gap-1">
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="projectId" value={project.id} />
                        <Input
                          name="grade"
                          defaultValue={p.grade ?? ""}
                          placeholder="Grade"
                          className="w-24 !py-1 text-xs"
                        />
                        <PrimaryButton type="submit" className="!px-2 !py-1" title="Enregistrer">
                          <Check size={13} />
                        </PrimaryButton>
                      </form>
                      <form action={removeProjectParticipant}>
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="projectId" value={project.id} />
                        <ConfirmButton
                          message={`Retirer ${p.member.pseudo} de ${structure || "ce projet"} ?`}
                          className="!px-2 !py-1"
                        >
                          <Trash2 size={13} />
                        </ConfirmButton>
                      </form>
                    </div>
                  ))}
                </div>

                {/* Ajout à cette structure */}
                <form
                  action={addProjectParticipant}
                  className="flex flex-wrap items-end gap-2 border-t border-navy-700 pt-3"
                >
                  <input type="hidden" name="projectId" value={project.id} />
                  <input type="hidden" name="structure" value={structure} />
                  <Field label="Membre" htmlFor={`m-${structure}`}>
                    <Select id={`m-${structure}`} name="memberId" required className="min-w-40">
                      {members.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.pseudo}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Grade" htmlFor={`g-${structure}`}>
                    <Input id={`g-${structure}`} name="grade" placeholder="Sheriff…" className="w-32" />
                  </Field>
                  <PrimaryButton type="submit" className="!px-3">
                    <Plus size={16} />
                  </PrimaryButton>
                </form>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
