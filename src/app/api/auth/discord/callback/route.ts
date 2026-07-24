import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

import { db } from "@/lib/db";
import { createSession } from "@/lib/session";
import {
  exchangeCode,
  fetchDiscordUser,
  discordAvatarUrl,
  isDiscordConfigured,
} from "@/lib/discord";
import { PERMISSIONS } from "@/lib/permissions";

export const dynamic = "force-dynamic";

function refuse(req: NextRequest, reason: string) {
  return NextResponse.redirect(
    new URL(`/connexion-refusee?reason=${reason}`, req.url),
  );
}

export async function GET(req: NextRequest) {
  if (!isDiscordConfigured()) return refuse(req, "config");

  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const jar = await cookies();
  const savedState = jar.get("discord_oauth_state")?.value;
  jar.delete("discord_oauth_state");

  // Protection CSRF : le state doit correspondre au cookie posé au login.
  if (!code || !state || !savedState || state !== savedState) {
    return refuse(req, "state");
  }

  // Échange du code + récupération de l'utilisateur Discord.
  let discordId: string;
  let avatar: string | null;
  let username: string;
  let globalName: string | null;
  try {
    const token = await exchangeCode(code);
    const user = await fetchDiscordUser(token.access_token);
    discordId = user.id;
    avatar = discordAvatarUrl(user.id, user.avatar);
    username = user.username;
    globalName = user.global_name;
  } catch {
    return refuse(req, "discord");
  }

  // Rattachement : le Discord ID doit correspondre à une fiche membre.
  let member = await db.member.findUnique({ where: { discordId } });

  // Données à écrire (avatar toujours rafraîchi).
  const data: {
    discordAvatarUrl: string | null;
    discordUsername: string;
    discordGlobalName: string | null;
    discordId?: string;
    permissions?: string[];
  } = { discordAvatarUrl: avatar, discordUsername: username, discordGlobalName: globalName };

  // Bootstrap : premier admin défini par variable d'environnement.
  if (!member) {
    const bootstrap = (process.env.CORE_BOOTSTRAP_DISCORD_IDS ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (bootstrap.includes(discordId)) {
      const slug = process.env.CORE_BOOTSTRAP_MEMBER_SLUG || "anas36";
      const target = await db.member.findFirst({
        where: { slug, discordId: null },
      });
      if (target) {
        member = target;
        data.discordId = discordId;
        data.permissions = [...PERMISSIONS];
      }
    }
  }

  // Connexion refusée si aucun rattachement.
  if (!member) return refuse(req, "membre");

  // Une seule requête : rattachement éventuel + avatar Discord.
  await db.member.update({ where: { id: member.id }, data });

  await createSession(member.id);
  return NextResponse.redirect(new URL("/mon-compte", req.url));
}
