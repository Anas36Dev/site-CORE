import { db } from "@/lib/db";
import { requirePermission } from "@/lib/guard";
import { AdminHeader } from "@/components/admin/ui";
import { PermissionsManager } from "@/components/admin/PermissionsManager";
import { asStringArray } from "@/lib/labels";

export const dynamic = "force-dynamic";

export default async function AdminPermissionsPage() {
  await requirePermission("GESTION_PERMISSIONS");
  const members = await db.member.findMany();

  // Ordre d'arrivée dans CORE (plus ancien → plus récent), sans-date à la fin.
  members.sort((a, b) => {
    const ta = a.joinedAt ? new Date(a.joinedAt).getTime() : Infinity;
    const tb = b.joinedAt ? new Date(b.joinedAt).getTime() : Infinity;
    return ta - tb;
  });

  const rows = members.map((m) => ({
    id: m.id,
    pseudo: m.pseudo,
    avatarUrl: m.avatarUrl,
    discordAvatarUrl: m.discordAvatarUrl,
    role: m.role,
    permissions: asStringArray(m.permissions),
    discordId: m.discordId,
  }));

  return (
    <div>
      <AdminHeader
        title="Permissions"
      />
      <PermissionsManager members={rows} />
    </div>
  );
}
