import { Plus } from "lucide-react";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/guard";
import { AdminHeader, LinkButton } from "@/components/admin/ui";
import { AdminProjectList } from "@/components/admin/AdminProjectList";

export const dynamic = "force-dynamic";

export default async function AdminProjetsPage() {
  await requirePermission("GESTION_PROJETS");
  const projects = await db.project.findMany({
    orderBy: [{ year: "desc" }, { order: "asc" }],
  });

  const rows = projects.map((p) => ({
    id: p.id,
    name: p.name,
    year: p.year,
    duration: p.duration,
    category: p.category,
  }));

  return (
    <div>
      <AdminHeader
        title="Projets"
        description={`${projects.length} projets`}
        action={
          <LinkButton href="/admin/projets/nouveau" variant="primary">
            <Plus size={16} />
            Nouveau projet
          </LinkButton>
        }
      />

      <AdminProjectList projects={rows} />
    </div>
  );
}
