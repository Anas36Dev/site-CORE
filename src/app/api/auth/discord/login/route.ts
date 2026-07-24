import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { randomBytes } from "node:crypto";

import { buildAuthorizeUrl, isDiscordConfigured } from "@/lib/discord";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isDiscordConfigured()) {
    return NextResponse.redirect(
      new URL("/connexion-refusee?reason=config", req.url),
    );
  }

  const state = randomBytes(16).toString("hex");
  const jar = await cookies();
  jar.set("discord_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 600,
  });

  return NextResponse.redirect(buildAuthorizeUrl(state));
}
