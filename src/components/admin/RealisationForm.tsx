import { Field, Input, Textarea, Select, PrimaryButton, LinkButton } from "@/components/admin/ui";
import { REALISATION_LABEL, REALISATION_ORDER } from "@/lib/labels";

type RealisationLike = {
  id: number;
  title: string;
  category: string;
  imageUrl: string | null;
  author: string | null;
  externalUrl: string | null;
  description: string | null;
  order: number;
};

export function RealisationForm({
  action,
  realisation,
}: {
  action: (formData: FormData) => Promise<void>;
  realisation?: RealisationLike | null;
}) {
  return (
    <form action={action} className="space-y-6">
      {realisation && <input type="hidden" name="id" value={realisation.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Titre" htmlFor="title">
          <Input id="title" name="title" defaultValue={realisation?.title ?? ""} required />
        </Field>

        <Field label="Catégorie" htmlFor="category">
          <Select id="category" name="category" defaultValue={realisation?.category ?? "AFFICHE"}>
            {REALISATION_ORDER.map((c) => (
              <option key={c} value={c}>
                {REALISATION_LABEL[c]}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Auteur" htmlFor="author">
          <Input id="author" name="author" defaultValue={realisation?.author ?? ""} placeholder="anas36" />
        </Field>

        <Field label="Ordre d'affichage" htmlFor="order">
          <Input id="order" name="order" type="number" defaultValue={realisation?.order ?? 0} />
        </Field>

        <Field label="Image" htmlFor="imageUrl" hint="Chemin dans public/images/realisations/ ou URL.">
          <Input id="imageUrl" name="imageUrl" defaultValue={realisation?.imageUrl ?? ""} placeholder="/images/realisations/defcon-1.png" />
        </Field>

        <Field label="Lien externe" htmlFor="externalUrl" hint="Pour la catégorie « Sites externes ».">
          <Input id="externalUrl" name="externalUrl" defaultValue={realisation?.externalUrl ?? ""} />
        </Field>
      </div>

      <Field label="Description" htmlFor="description">
        <Textarea id="description" name="description" defaultValue={realisation?.description ?? ""} />
      </Field>

      <div className="flex items-center gap-3 border-t border-navy-700 pt-5">
        <PrimaryButton type="submit">{realisation ? "Enregistrer" : "Créer la réalisation"}</PrimaryButton>
        <LinkButton href="/admin/realisations">Annuler</LinkButton>
      </div>
    </form>
  );
}
