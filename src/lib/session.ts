// Sessions en base + cookie (serveur uniquement).
// Session en base = révocation immédiate : supprimer une fiche invalide ses sessions.

import { cookies } from "next/headers";
import { randomBytes } from "node:crypto";

import { db } from "@/lib/db";

const COOKIE = "core_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 jours

export async function createSession(memberId: number): Promise<void> {
  const id = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + MAX_AGE * 1000);
  await db.session.create({ data: { id, memberId, expiresAt } });

  const jar = await cookies();
  jar.set(COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  const id = jar.get(COOKIE)?.value;
  if (id) {
    await db.session.deleteMany({ where: { id } });
    jar.delete(COOKIE);
  }
}

/** Renvoie la fiche membre liée à la session courante (ou null). */
export async function getSessionMember() {
  const jar = await cookies();
  const id = jar.get(COOKIE)?.value;
  if (!id) return null;

  const session = await db.session.findUnique({
    where: { id },
    include: { member: true },
  });
  if (!session) return null;

  if (session.expiresAt.getTime() < Date.now()) {
    await db.session.deleteMany({ where: { id } });
    return null;
  }
  return session.member;
}
