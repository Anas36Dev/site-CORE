import { requirePermission } from "@/lib/guard";
import { AdminHeader } from "@/components/admin/ui";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { createProject } from "../actions";

export const dynamic = "force-dynamic";

export default async function NouveauProjetPage() {
  await requirePermission("GESTION_PROJETS");
  return (
    <div>
      <AdminHeader title="Nouveau projet" description="Ajouter un projet légal ou illégal." />
      <ProjectForm action={createProject} />
    </div>
  );
}
