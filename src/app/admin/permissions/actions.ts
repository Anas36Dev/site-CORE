"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/guard";
import { PERMISSIONS } from "@/lib/permissions";

export async function updateMemberAccess(formData: FormData) {
  await requirePermission("GESTION_PERMISSIONS");
  const id = Number(formData.get("id"));
  const role = String(formData.get("role")) === "FONDATEUR" ? "FONDATEUR" : "MEMBRE";
  const permissions = formData
    .getAll("permissions")
    .map(String)
    .filter((p) => (PERMISSIONS as readonly string[]).includes(p));

  await db.member.update({
    where: { id },
    data: { role, permissions },
  });
  revalidatePath("/admin/permissions");
  redirect("/admin/permissions");
}
