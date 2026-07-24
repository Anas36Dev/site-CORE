"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/guard";
import { slugify } from "@/lib/slug";

async function uniqueServerSlug(base: string, excludeId?: number) {
  let slug = base;
  let i = 2;
  while (true) {
    const existing = await db.partnerServer.findFirst({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${i++}`;
  }
}

async function upsertContent(key: string, value: unknown) {
  await db.content.upsert({
    where: { key },
    create: { key, value: value as never },
    update: { value: value as never },
  });
}

export async function saveHomeIntro(formData: FormData) {
  await requirePermission("GESTION_CONTENU");
  await upsertContent("home.intro", {
    badge: String(formData.get("badge") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    subtitle: String(formData.get("subtitle") ?? "").trim(),
  });
  revalidatePath("/admin/contenu");
  redirect("/admin/contenu");
}

export async function saveAbout(formData: FormData) {
  await requirePermission("GESTION_CONTENU");
  const paragraphs = String(formData.get("paragraphs") ?? "")
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  await upsertContent("about.body", {
    title: String(formData.get("title") ?? "").trim(),
    subtitle: String(formData.get("subtitle") ?? "").trim(),
    paragraphs,
  });
  revalidatePath("/admin/contenu");
  redirect("/admin/contenu");
}

export async function saveFooter(formData: FormData) {
  await requirePermission("GESTION_CONTENU");
  await upsertContent("footer.legal", {
    copyright: String(formData.get("copyright") ?? "").trim(),
    legal: String(formData.get("legal") ?? "").trim(),
  });
  revalidatePath("/admin/contenu");
  redirect("/admin/contenu");
}

export async function addServer(formData: FormData) {
  await requirePermission("GESTION_CONTENU");
  const name = String(formData.get("name") ?? "").trim();
  if (name) {
    const logoUrl = String(formData.get("logoUrl") ?? "").trim() || null;
    const slug = await uniqueServerSlug(slugify(name));
    const max = await db.partnerServer.aggregate({ _max: { order: true } });
    await db.partnerServer.create({
      data: { name, slug, logoUrl, order: (max._max.order ?? 0) + 1 },
    });
  }
  revalidatePath("/admin/contenu");
  redirect("/admin/contenu");
}

export async function updateServer(formData: FormData) {
  await requirePermission("GESTION_CONTENU");
  const id = Number(formData.get("id"));
  const str = (k: string) => String(formData.get(k) ?? "").trim() || null;
  await db.partnerServer.update({
    where: { id },
    data: {
      name: String(formData.get("name") ?? "").trim(),
      logoUrl: str("logoUrl"),
      founders: str("founders"),
      playersRange: str("playersRange"),
      discordUrl: str("discordUrl"),
      fivemUrl: str("fivemUrl"),
      isClosed: formData.get("isClosed") !== null,
    },
  });
  revalidatePath("/admin/contenu");
  redirect("/admin/contenu");
}

export async function deleteServer(formData: FormData) {
  await requirePermission("GESTION_CONTENU");
  await db.partnerServer.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePath("/admin/contenu");
  redirect("/admin/contenu");
}

export async function addGallery(formData: FormData) {
  await requirePermission("GESTION_CONTENU");
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  if (imageUrl) {
    const caption = String(formData.get("caption") ?? "").trim() || null;
    const max = await db.galleryImage.aggregate({ _max: { order: true } });
    await db.galleryImage.create({
      data: { imageUrl, caption, order: (max._max.order ?? 0) + 1 },
    });
  }
  revalidatePath("/admin/contenu");
  redirect("/admin/contenu");
}

export async function updateGallery(formData: FormData) {
  await requirePermission("GESTION_CONTENU");
  const id = Number(formData.get("id"));
  await db.galleryImage.update({
    where: { id },
    data: {
      imageUrl: String(formData.get("imageUrl") ?? "").trim(),
      caption: String(formData.get("caption") ?? "").trim() || null,
    },
  });
  revalidatePath("/admin/contenu");
  redirect("/admin/contenu");
}

export async function deleteGallery(formData: FormData) {
  await requirePermission("GESTION_CONTENU");
  await db.galleryImage.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePath("/admin/contenu");
  redirect("/admin/contenu");
}
