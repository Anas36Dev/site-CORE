"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/guard";

const schema = z.object({
  title: z.string().trim().min(1, "Titre requis"),
  category: z.enum(["AFFICHE", "LOGO", "DOCUMENT", "FORMULAIRE", "DOSSIER", "SITE_EXTERNE"]),
  imageUrl: z.string().trim().optional(),
  author: z.string().trim().optional(),
  externalUrl: z.string().trim().optional(),
  description: z.string().trim().optional(),
  order: z.coerce.number().int().optional(),
});

function buildData(formData: FormData) {
  const p = schema.parse({
    title: formData.get("title"),
    category: formData.get("category"),
    imageUrl: formData.get("imageUrl"),
    author: formData.get("author"),
    externalUrl: formData.get("externalUrl"),
    description: formData.get("description"),
    order: formData.get("order") || 0,
  });
  return {
    title: p.title,
    category: p.category,
    imageUrl: p.imageUrl || null,
    author: p.author || null,
    externalUrl: p.externalUrl || null,
    description: p.description || null,
    order: p.order ?? 0,
  };
}

export async function createRealisation(formData: FormData) {
  await requirePermission("GESTION_REALISATIONS");
  await db.realisation.create({ data: buildData(formData) as never });
  revalidatePath("/admin/realisations");
  redirect("/admin/realisations");
}

export async function updateRealisation(formData: FormData) {
  await requirePermission("GESTION_REALISATIONS");
  const id = Number(formData.get("id"));
  await db.realisation.update({ where: { id }, data: buildData(formData) as never });
  revalidatePath("/admin/realisations");
  redirect("/admin/realisations");
}

export async function deleteRealisation(formData: FormData) {
  await requirePermission("GESTION_REALISATIONS");
  const id = Number(formData.get("id"));
  await db.realisation.delete({ where: { id } });
  revalidatePath("/admin/realisations");
  redirect("/admin/realisations");
}
