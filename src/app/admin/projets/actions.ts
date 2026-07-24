"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { existsSync } from "node:fs";
import { join } from "node:path";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/guard";
import { slugify } from "@/lib/slug";

/** Cherche un logo public/images/serveurs/<slug>.(png|jpg|…) et renvoie son chemin. */
function findServerLogo(slug: string): string | null {
  for (const ext of ["png", "jpg", "jpeg", "gif", "webp"]) {
    if (existsSync(join("public", "images", "serveurs", `${slug}.${ext}`))) {
      return `/images/serveurs/${slug}.${ext}`;
    }
  }
  return null;
}

/** Garantit qu'un serveur hôte existe pour ce nom (créé sinon), pour la page /serveurs/<slug>. */
async function ensureServerHost(name: string) {
  const existing = await db.partnerServer.findFirst({ where: { name } });
  if (existing) return;
  const base = slugify(name);
  let slug = base;
  let k = 2;
  while (await db.partnerServer.findFirst({ where: { slug } })) slug = `${base}-${k++}`;
  const max = await db.partnerServer.aggregate({ _max: { order: true } });
  await db.partnerServer.create({
    data: { name, slug, logoUrl: findServerLogo(slug), order: (max._max.order ?? 0) + 1 },
  });
}

const schema = z.object({
  name: z.string().trim().min(1, "Nom requis"),
  year: z.coerce.number().int().min(2000).max(2100),
  duration: z.string().trim().optional(),
  category: z.enum(["LEGAL", "ILLEGAL"]),
  logoUrl: z.string().trim().optional(),
  serverLogoUrl: z.string().trim().optional(),
  description: z.string().trim().optional(),
  order: z.coerce.number().int().optional(),
});

function buildData(formData: FormData) {
  const p = schema.parse({
    name: formData.get("name"),
    year: formData.get("year"),
    duration: formData.get("duration"),
    category: formData.get("category"),
    logoUrl: formData.get("logoUrl"),
    serverLogoUrl: formData.get("serverLogoUrl"),
    description: formData.get("description"),
    order: formData.get("order") || 0,
  });

  const structures = String(formData.get("structures") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    name: p.name,
    year: p.year,
    duration: p.duration || null,
    category: p.category,
    logoUrl: p.logoUrl || null,
    serverLogoUrl: p.serverLogoUrl || null,
    description: p.description || null,
    order: p.order ?? 0,
    structures,
  };
}

export async function createProject(formData: FormData) {
  await requirePermission("GESTION_PROJETS");
  const data = buildData(formData);
  await db.project.create({ data: data as never });
  await ensureServerHost(data.name);
  revalidatePath("/admin/projets");
  redirect("/admin/projets");
}

export async function updateProject(formData: FormData) {
  await requirePermission("GESTION_PROJETS");
  const id = Number(formData.get("id"));
  const data = buildData(formData);
  await db.project.update({ where: { id }, data: data as never });
  await ensureServerHost(data.name);
  revalidatePath("/admin/projets");
  redirect("/admin/projets");
}

export async function deleteProject(formData: FormData) {
  await requirePermission("GESTION_PROJETS");
  const id = Number(formData.get("id"));
  await db.project.delete({ where: { id } });
  revalidatePath("/admin/projets");
  redirect("/admin/projets");
}

// ── Participants (membres du projet) ────────────────────────────────────────

export async function addProjectParticipant(formData: FormData) {
  await requirePermission("GESTION_PROJETS");
  const projectId = Number(formData.get("projectId"));
  const memberId = Number(formData.get("memberId"));
  const structure = String(formData.get("structure") ?? "").trim();
  const grade = String(formData.get("grade") ?? "").trim() || null;
  if (projectId && memberId) {
    await db.participation.upsert({
      where: { memberId_projectId_structure: { memberId, projectId, structure } },
      create: { memberId, projectId, structure, grade },
      update: { grade },
    });
  }
  revalidatePath(`/admin/projets/${projectId}`);
  redirect(`/admin/projets/${projectId}`);
}

export async function removeProjectParticipant(formData: FormData) {
  await requirePermission("GESTION_PROJETS");
  const id = Number(formData.get("id"));
  const projectId = Number(formData.get("projectId"));
  await db.participation.delete({ where: { id } });
  revalidatePath(`/admin/projets/${projectId}`);
  redirect(`/admin/projets/${projectId}`);
}

export async function updateProjectParticipantGrade(formData: FormData) {
  await requirePermission("GESTION_PROJETS");
  const id = Number(formData.get("id"));
  const projectId = Number(formData.get("projectId"));
  const grade = String(formData.get("grade") ?? "").trim() || null;
  await db.participation.update({ where: { id }, data: { grade } });
  revalidatePath(`/admin/projets/${projectId}`);
  redirect(`/admin/projets/${projectId}`);
}
