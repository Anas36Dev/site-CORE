import { requirePermission } from "@/lib/guard";
import { AdminHeader } from "@/components/admin/ui";
import { RealisationForm } from "@/components/admin/RealisationForm";
import { createRealisation } from "../actions";

export const dynamic = "force-dynamic";

export default async function NouvelleRealisationPage() {
  await requirePermission("GESTION_REALISATIONS");
  return (
    <div>
      <AdminHeader title="Nouvelle réalisation" description="Ajouter une affiche, un logo, un document…" />
      <RealisationForm action={createRealisation} />
    </div>
  );
}
