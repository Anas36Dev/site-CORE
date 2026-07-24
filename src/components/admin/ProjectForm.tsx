import { Field, Input, Textarea, Select, PrimaryButton, LinkButton } from "@/components/admin/ui";
import { asStringArray } from "@/lib/labels";

type ProjectLike = {
  id: number;
  name: string;
  year: number;
  duration: string | null;
  category: string;
  logoUrl: string | null;
  serverLogoUrl: string | null;
  description: string | null;
  order: number;
  structures: unknown;
};

export function ProjectForm({
  action,
  project,
}: {
  action: (formData: FormData) => Promise<void>;
  project?: ProjectLike | null;
}) {
  const structures = project ? asStringArray(project.structures) : [];

  return (
    <form action={action} className="space-y-6">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom du serveur / projet" htmlFor="name">
          <Input id="name" name="name" defaultValue={project?.name ?? ""} required />
        </Field>

        <Field label="Catégorie" htmlFor="category">
          <Select id="category" name="category" defaultValue={project?.category ?? "LEGAL"}>
            <option value="LEGAL">Légal</option>
            <option value="ILLEGAL">Illégal</option>
          </Select>
        </Field>

        <Field label="Année" htmlFor="year">
          <Input id="year" name="year" type="number" defaultValue={project?.year ?? new Date().getFullYear()} required />
        </Field>

        <Field label="Durée" htmlFor="duration" hint="Ex. « 5 mois », « 2 semaines »">
          <Input id="duration" name="duration" defaultValue={project?.duration ?? ""} />
        </Field>

        <Field label="Logo de la structure" htmlFor="logoUrl" hint="Chemin dans public/images/projets/ ou URL.">
          <Input id="logoUrl" name="logoUrl" defaultValue={project?.logoUrl ?? ""} placeholder="/images/projets/fbi.png" />
        </Field>

        <Field label="Logo du serveur hôte" htmlFor="serverLogoUrl" hint="Chemin dans public/images/serveurs/ ou URL.">
          <Input id="serverLogoUrl" name="serverLogoUrl" defaultValue={project?.serverLogoUrl ?? ""} placeholder="/images/serveurs/anesya.png" />
        </Field>

        <Field label="Ordre d'affichage" htmlFor="order">
          <Input id="order" name="order" type="number" defaultValue={project?.order ?? 0} />
        </Field>
      </div>

      <Field label="Structures / organisations" htmlFor="structures" hint="Une par ligne.">
        <Textarea id="structures" name="structures" defaultValue={structures.join("\n")} placeholder={"Los Santos Police Department\nCayo Perico"} />
      </Field>

      <Field label="Description" htmlFor="description">
        <Textarea id="description" name="description" defaultValue={project?.description ?? ""} />
      </Field>

      <div className="flex items-center gap-3 border-t border-navy-700 pt-5">
        <PrimaryButton type="submit">{project ? "Enregistrer" : "Créer le projet"}</PrimaryButton>
        <LinkButton href="/admin/projets">Annuler</LinkButton>
      </div>
    </form>
  );
}
