import { notFound } from "next/navigation";
import { Trash2 } from "lucide-react";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/guard";
import { AdminHeader } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { RealisationForm } from "@/components/admin/RealisationForm";
import { updateRealisation, deleteRealisation } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditRealisationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("GESTION_REALISATIONS");
  const { id } = await params;
  const realisation = await db.realisation.findUnique({ where: { id: Number(id) } });
  if (!realisation) notFound();

  return (
    <div>
      <AdminHeader
        title={`Éditer — ${realisation.title}`}
        action={
          <form action={deleteRealisation}>
            <input type="hidden" name="id" value={realisation.id} />
            <ConfirmButton message={`Supprimer « ${realisation.title} » ?`}>
              <Trash2 size={15} />
              Supprimer
            </ConfirmButton>
          </form>
        }
      />
      <RealisationForm action={updateRealisation} realisation={realisation} />
    </div>
  );
}
