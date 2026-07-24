import { NextResponse, type NextRequest } from "next/server";

import { destroySession } from "@/lib/session";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

/** Déconnecte et renvoie toujours vers l'accueil. */
async function logout(req: NextRequest) {
  await destroySession();
  return NextResponse.redirect(siteUrl(req, "/"), { status: 303 });
}

// Le bouton de déconnexion envoie un POST ; on gère aussi le GET (lien direct)
// pour ne jamais aboutir sur une page vide.
export const POST = logout;
export const GET = logout;
