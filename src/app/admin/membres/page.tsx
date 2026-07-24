import { Plus } from "lucide-react";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/guard";
import { AdminHeader, LinkButton } from "@/components/admin/ui";
import { AdminMemberList } from "@/components/admin/AdminMemberList";

export const dynamic = "force-dynamic";

export default async function AdminMembresPage() {
  await requirePermission("GESTION_MEMBRES");
  const members = await db.member.findMany();

  // Ordre d'arrivée dans CORE (plus ancien → plus récent), sans-date à la fin.
  members.sort((a, b) => {
    const ta = a.joinedAt ? new Date(a.joinedAt).getTime() : Infinity;
    const tb = b.joinedAt ? new Date(b.joinedAt).getTime() : Infinity;
    return ta - tb;
  });

  const rows = members.map((m) => ({
    id: m.id,
    slug: m.slug,
    pseudo: m.pseudo,
    avatarUrl: m.avatarUrl,
    discordAvatarUrl: m.discordAvatarUrl,
    title: m.title,
    role: m.role,
    status: m.status,
    discordId: m.discordId,
  }));

  return (
    <div>
      <AdminHeader
        title="Membres"
        description={`${members.length} membres`}
        action={
          <LinkButton href="/admin/membres/nouveau" variant="primary">
            <Plus size={16} />
            Nouveau membre
          </LinkButton>
        }
      />

      <AdminMemberList members={rows} />
    </div>
  );
}
