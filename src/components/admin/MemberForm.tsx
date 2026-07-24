import { Field, Input, Textarea, Select, PrimaryButton, LinkButton } from "@/components/admin/ui";
import { GROUP_LABEL, GROUP_ORDER, ORIENTATION, asStringArray } from "@/lib/labels";
import { PERMISSIONS, PERMISSION_LABEL, type Permission } from "@/lib/permissions";

type MemberLike = {
  id: number;
  pseudo: string;
  avatarUrl: string | null;
  orientation: string;
  role: string;
  status: string;
  title: string | null;
  joinedAt: Date | null;
  description: string | null;
  discordId: string | null;
  inDirectory: boolean;
  groups: unknown;
  permissions: unknown;
};

function dateValue(d: Date | null) {
  return d ? new Date(d).toISOString().slice(0, 10) : "";
}

export function MemberForm({
  action,
  member,
  canEditPermissions,
}: {
  action: (formData: FormData) => Promise<void>;
  member?: MemberLike | null;
  canEditPermissions: boolean;
}) {
  const groups = member ? asStringArray(member.groups) : [];
  const perms = member ? asStringArray(member.permissions) : [];

  return (
    <form action={action} className="space-y-6">
      {member && <input type="hidden" name="id" value={member.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Pseudo" htmlFor="pseudo">
          <Input id="pseudo" name="pseudo" defaultValue={member?.pseudo ?? ""} required />
        </Field>

        <Field label="Titre / fonction" htmlFor="title" hint="Ex. « Père Fondateur », « Lead illégal »">
          <Input id="title" name="title" defaultValue={member?.title ?? ""} />
        </Field>

        <Field label="Rôle" htmlFor="role">
          <Select id="role" name="role" defaultValue={member?.role ?? "MEMBRE"}>
            <option value="MEMBRE">Membre</option>
            <option value="FONDATEUR">Fondateur</option>
          </Select>
        </Field>

        <Field label="Statut" htmlFor="status">
          <Select id="status" name="status" defaultValue={member?.status ?? "ACTIF"}>
            <option value="ACTIF">Actif</option>
            <option value="VETERAN">Vétéran</option>
          </Select>
        </Field>

        <Field label="Orientation" htmlFor="orientation">
          <Select id="orientation" name="orientation" defaultValue={member?.orientation ?? "AUCUNE"}>
            <option value="AUCUNE">Aucune</option>
            {Object.entries(ORIENTATION)
              .filter(([k]) => k !== "AUCUNE")
              .map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
          </Select>
        </Field>

        <Field label="Date d'arrivée" htmlFor="joinedAt">
          <Input id="joinedAt" name="joinedAt" type="date" defaultValue={dateValue(member?.joinedAt ?? null)} />
        </Field>

        <Field
          label="Discord ID"
          htmlFor="discordId"
          hint="Relie le membre à son compte Discord (obligatoire pour qu'il puisse se connecter)."
        >
          <Input id="discordId" name="discordId" defaultValue={member?.discordId ?? ""} placeholder="285824752709533696" />
        </Field>

        <Field
          label="Avatar"
          htmlFor="avatarUrl"
          hint="Chemin d'une image déposée dans public/images/membres/ (.png, .jpg, .gif) ou URL. Sinon : photo Discord ou monogramme."
        >
          <Input id="avatarUrl" name="avatarUrl" defaultValue={member?.avatarUrl ?? ""} placeholder="/images/membres/veekoon.gif" />
        </Field>
      </div>

      <Field label="Description / citation" htmlFor="description">
        <Textarea id="description" name="description" defaultValue={member?.description ?? ""} />
      </Field>

      <label className="flex items-center gap-2 rounded-lg bg-navy-900 px-3 py-2 text-sm text-steel-300 ring-1 ring-navy-600">
        <input
          type="checkbox"
          name="inDirectory"
          defaultChecked={member ? member.inDirectory : true}
          className="accent-gold-500"
        />
        Afficher dans l'annuaire « Nos membres » (décocher pour le staff design/technique)
      </label>

      {/* Groupes de la page « Notre équipe » */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-steel-100">Sections « Notre équipe »</p>
        <div className="flex flex-wrap gap-3">
          {GROUP_ORDER.map((g) => (
            <label key={g} className="flex items-center gap-2 rounded-lg bg-navy-900 px-3 py-2 text-sm text-steel-300 ring-1 ring-navy-600">
              <input type="checkbox" name="groups" value={g} defaultChecked={groups.includes(g)} className="accent-gold-500" />
              {GROUP_LABEL[g]}
            </label>
          ))}
        </div>
      </div>

      {/* Permissions (gated) */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-steel-100">Permissions back-office</p>
        {canEditPermissions ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {PERMISSIONS.map((p) => (
              <label key={p} className="flex items-center gap-2 rounded-lg bg-navy-900 px-3 py-2 text-sm text-steel-300 ring-1 ring-navy-600">
                <input type="checkbox" name="permissions" value={p} defaultChecked={perms.includes(p)} className="accent-gold-500" />
                {PERMISSION_LABEL[p as Permission]}
              </label>
            ))}
          </div>
        ) : (
          <p className="text-xs text-steel-500">
            Réservé aux membres disposant de la permission « Gestion des permissions ».
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-navy-700 pt-5">
        <PrimaryButton type="submit">
          {member ? "Enregistrer" : "Créer le membre"}
        </PrimaryButton>
        <LinkButton href="/admin/membres">Annuler</LinkButton>
      </div>
    </form>
  );
}
