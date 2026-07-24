// Récupération du membre connecté (serveur uniquement).

import { getSessionMember } from "@/lib/session";
import { asStringArray } from "@/lib/labels";
import type { CurrentMember } from "@/lib/auth";

export async function getCurrentMember(): Promise<CurrentMember | null> {
  const m = await getSessionMember();
  if (!m) return null;
  return {
    id: m.id,
    slug: m.slug,
    pseudo: m.pseudo,
    avatarUrl: m.avatarUrl,
    discordAvatarUrl: m.discordAvatarUrl,
    permissions: asStringArray(m.permissions),
  };
}
