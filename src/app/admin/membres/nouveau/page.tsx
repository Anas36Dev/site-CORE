import { requirePermission } from "@/lib/guard";
import { hasPermission } from "@/lib/auth";
import { AdminHeader } from "@/components/admin/ui";
import { MemberForm } from "@/components/admin/MemberForm";
import { createMember } from "../actions";

export const dynamic = "force-dynamic";

export default async function NouveauMembrePage() {
  const me = await requirePermission("GESTION_MEMBRES");
  return (
    <div>
      <AdminHeader title="Nouveau membre" description="Créer une fiche membre." />
      <MemberForm
        action={createMember}
        canEditPermissions={hasPermission(me, "GESTION_PERMISSIONS")}
      />
    </div>
  );
}
