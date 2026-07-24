import { notFound } from "next/navigation";
import { Trash2 } from "lucide-react";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/guard";
import { AdminHeader, Field, Input, PrimaryButton, LinkButton } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { LogoInput } from "@/components/admin/LogoInput";
import { updateGallery, deleteGallery } from "@/app/admin/contenu/actions";

export const dynamic = "force-dynamic";

export default async function EditGaleriePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("GESTION_CONTENU");
  const { id } = await params;
  const image = await db.galleryImage.findUnique({ where: { id: Number(id) } });
  if (!image) notFound();

  return (
    <div>
      <AdminHeader
        title="Image de la galerie"
        action={
          <form action={deleteGallery}>
            <input type="hidden" name="id" value={image.id} />
            <ConfirmButton message="Supprimer cette image ?">
              <Trash2 size={15} />
              Supprimer
            </ConfirmButton>
          </form>
        }
      />

      <form action={updateGallery} className="max-w-2xl space-y-5">
        <input type="hidden" name="id" value={image.id} />

        <Field label="Image" hint="Chemin dans public/images/galerie/ ou URL. Aperçu à droite.">
          <LogoInput name="imageUrl" defaultValue={image.imageUrl} placeholder="/images/galerie/scene1.jpg" />
        </Field>

        <Field label="Légende" htmlFor="caption" hint="Format : « Description — Serveur, Année ».">
          <Input id="caption" name="caption" defaultValue={image.caption ?? ""} />
        </Field>

        <div className="flex items-center gap-3 border-t border-navy-700 pt-5">
          <PrimaryButton type="submit">Enregistrer</PrimaryButton>
          <LinkButton href="/admin/contenu">Annuler</LinkButton>
        </div>
      </form>
    </div>
  );
}
