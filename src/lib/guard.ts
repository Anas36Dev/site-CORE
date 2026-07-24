// Gardes serveur pour le back-office.

import { redirect } from "next/navigation";

import { getCurrentMember } from "@/lib/current-member";
import { isAdmin, hasPermission, type CurrentMember } from "@/lib/auth";
import type { Permission } from "@/lib/permissions";

/** Exige un membre avec au moins une permission d'administration. */
export async function requireAdmin(): Promise<CurrentMember> {
  const member = await getCurrentMember();
  if (!isAdmin(member)) redirect("/");
  return member!;
}

/** Exige une permission précise (sinon retour au tableau de bord admin). */
export async function requirePermission(
  permission: Permission,
): Promise<CurrentMember> {
  const member = await getCurrentMember();
  if (!isAdmin(member)) redirect("/");
  if (!hasPermission(member, permission)) redirect("/admin");
  return member!;
}
