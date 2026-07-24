import { Plus } from "lucide-react";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/guard";
import { AdminHeader, LinkButton } from "@/components/admin/ui";
import { AdminRealisationList } from "@/components/admin/AdminRealisationList";

export const dynamic = "force-dynamic";

export default async function AdminRealisationsPage() {
  await requirePermission("GESTION_REALISATIONS");
  const items = await db.realisation.findMany({ orderBy: [{ order: "asc" }] });

  const rows = items.map((r) => ({
    id: r.id,
    title: r.title,
    author: r.author,
    category: r.category,
  }));

  return (
    <div>
      <AdminHeader
        title="Réalisations"
        description={`${items.length} réalisations`}
        action={
          <LinkButton href="/admin/realisations/nouveau" variant="primary">
            <Plus size={16} />
            Nouvelle réalisation
          </LinkButton>
        }
      />

      <AdminRealisationList items={rows} />
    </div>
  );
}
