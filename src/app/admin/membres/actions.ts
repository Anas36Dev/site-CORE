"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/guard";
import { hasPermission } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { PERMISSIONS } from "@/lib/permissions";
import { GROUP_ORDER } from "@/lib/labels";
import { fetchDiscordUserById, discordAvatarUrl } from "@/lib/discord";

/**
 * Complète les champs Discord (photo, nom) selon le Discord ID :
 * - ID présent + token bot configuré → récupère photo/nom auto.
 * - ID absent → efface les champs Discord.
 */
async function enrichDiscord(data: Record<string, unknown>) {
  const id = (data.discordId as string | null) ?? null;
  if (!id) {
    data.discordAvatarUrl = null;
    data.discordUsername = null;
    data.discordGlobalName = null;
    return;
  }
  const user = await fetchDiscordUserById(id);
  if (user) {
    data.discordAvatarUrl = discordAvatarUrl(user.id, user.avatar);
    data.discordUsername = user.username;
    data.discordGlobalName = user.global_name;
  }
}

const GROUPS = GROUP_ORDER as readonly string[];

const schema = z.object({
  pseudo: z.string().trim().min(1, "Pseudo requis"),
  avatarUrl: z.string().trim().optional(),
  orientation: z.enum(["POLICE", "GOUVERNEMENT", "JUSTICE", "ILLEGAL", "AUCUNE"]),
  role: z.enum(["FONDATEUR", "MEMBRE"]),
  status: z.enum(["ACTIF", "VETERAN"]),
  title: z.string().trim().optional(),
  joinedAt: z.string().trim().optional(),
  description: z.string().trim().optional(),
  discordId: z.string().trim().optional(),
});

/** Garantit un slug unique (ajoute un suffixe si besoin). */
async function ensureUniqueSlug(base: string, excludeId?: number) {
  let slug = base;
  let i = 2;
  while (true) {
    const existing = await db.member.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${i++}`;
  }
}

/** Construit l'objet de données commun (hors slug). */
function buildData(formData: FormData, canEditPermissions: boolean) {
  const parsed = schema.parse({
    pseudo: formData.get("pseudo"),
    avatarUrl: formData.get("avatarUrl"),
    orientation: formData.get("orientation"),
    role: formData.get("role"),
    status: formData.get("status"),
    title: formData.get("title"),
    joinedAt: formData.get("joinedAt"),
    description: formData.get("description"),
    discordId: formData.get("discordId"),
  });

  const groups = formData
    .getAll("groups")
    .map(String)
    .filter((g) => GROUPS.includes(g));

  const data: Record<string, unknown> = {
    pseudo: parsed.pseudo,
    avatarUrl: parsed.avatarUrl || null,
    orientation: parsed.orientation,
    role: parsed.role,
    status: parsed.status,
    title: parsed.title || null,
    joinedAt: parsed.joinedAt ? new Date(parsed.joinedAt) : null,
    description: parsed.description || null,
    discordId: parsed.discordId || null,
    inDirectory: formData.get("inDirectory") !== null,
    groups,
  };

  // Les permissions ne sont modifiables qu'avec GESTION_PERMISSIONS.
  if (canEditPermissions) {
    data.permissions = formData
      .getAll("permissions")
      .map(String)
      .filter((p) => (PERMISSIONS as readonly string[]).includes(p));
  }

  return data;
}

export async function createMember(formData: FormData) {
  const me = await requirePermission("GESTION_MEMBRES");
  const canPerms = hasPermission(me, "GESTION_PERMISSIONS");
  const data = buildData(formData, canPerms);
  await enrichDiscord(data);
  const slug = await ensureUniqueSlug(slugify(String(data.pseudo)));
  await db.member.create({ data: { ...data, slug } as never });
  revalidatePath("/admin/membres");
  redirect("/admin/membres");
}

export async function updateMember(formData: FormData) {
  const me = await requirePermission("GESTION_MEMBRES");
  const id = Number(formData.get("id"));
  const canPerms = hasPermission(me, "GESTION_PERMISSIONS");
  const data = buildData(formData, canPerms);
  await enrichDiscord(data);
  await db.member.update({ where: { id }, data: data as never });
  revalidatePath("/admin/membres");
  redirect("/admin/membres");
}

export async function deleteMember(formData: FormData) {
  await requirePermission("GESTION_MEMBRES");
  const id = Number(formData.get("id"));
  await db.member.delete({ where: { id } });
  revalidatePath("/admin/membres");
  redirect("/admin/membres");
}

// ── Participations (projets du membre) ──────────────────────────────────────

export async function addParticipation(formData: FormData) {
  await requirePermission("GESTION_MEMBRES");
  const memberId = Number(formData.get("memberId"));
  // target = "projectId|structure"
  const target = String(formData.get("target") ?? "");
  const sep = target.indexOf("|");
  const projectId = Number(sep >= 0 ? target.slice(0, sep) : target);
  const structure = sep >= 0 ? target.slice(sep + 1) : "";
  const grade = String(formData.get("grade") ?? "").trim() || null;
  if (memberId && projectId) {
    await db.participation.upsert({
      where: { memberId_projectId_structure: { memberId, projectId, structure } },
      create: { memberId, projectId, structure, grade },
      update: { grade },
    });
  }
  revalidatePath(`/admin/membres/${memberId}`);
  redirect(`/admin/membres/${memberId}`);
}

export async function removeParticipation(formData: FormData) {
  await requirePermission("GESTION_MEMBRES");
  const id = Number(formData.get("id"));
  const memberId = Number(formData.get("memberId"));
  await db.participation.delete({ where: { id } });
  revalidatePath(`/admin/membres/${memberId}`);
  redirect(`/admin/membres/${memberId}`);
}

export async function updateParticipationGrade(formData: FormData) {
  await requirePermission("GESTION_MEMBRES");
  const id = Number(formData.get("id"));
  const memberId = Number(formData.get("memberId"));
  const grade = String(formData.get("grade") ?? "").trim() || null;
  await db.participation.update({ where: { id }, data: { grade } });
  revalidatePath(`/admin/membres/${memberId}`);
  redirect(`/admin/membres/${memberId}`);
}
