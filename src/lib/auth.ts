// Helpers d'autorisation — DONNÉES PURES, importables côté client.
// La logique serveur (session, cookies, DB) vit dans session.ts / current-member.ts.

import type { Permission } from "@/lib/permissions";

export type CurrentMember = {
  id: number;
  slug: string;
  pseudo: string;
  avatarUrl: string | null;
  discordAvatarUrl: string | null;
  permissions: string[];
};

/** Un membre a-t-il au moins une permission (→ accès back-office) ? */
export function isAdmin(member: CurrentMember | null): boolean {
  return !!member && member.permissions.length > 0;
}

/** Un membre possède-t-il une permission précise ? */
export function hasPermission(
  member: CurrentMember | null,
  permission: Permission,
): boolean {
  return !!member && member.permissions.includes(permission);
}
