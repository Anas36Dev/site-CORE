import type { NextRequest } from "next/server";

/**
 * Construit une URL absolue vers le site **public**.
 *
 * Priorités (comme le MDT, qui repose sur APP_URL) :
 *   1. `APP_URL` (.env) — l'URL publique explicite (ex. https://core-franceproject.fr).
 *      À privilégier en prod : c'est la source la plus fiable.
 *   2. En-têtes `X-Forwarded-Proto` / `X-Forwarded-Host` — ajoutés par un reverse
 *      proxy (Dokploy/Traefik) ; utile si APP_URL n'est pas renseignée.
 *   3. `req.url` — repli en dev local (pas de proxy, pas d'APP_URL).
 *
 * Pourquoi ne PAS utiliser `req.url` directement : derrière un proxy, il pointe
 * vers l'hôte *interne* du conteneur (http://localhost:3000), ce qui renvoie
 * l'utilisateur sur « localhost:3000 » après connexion/déconnexion.
 */
export function siteUrl(req: NextRequest, path: string): URL {
  const configured = process.env.APP_URL?.trim();
  if (configured) return new URL(path, configured);

  const fwdHost = req.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  if (fwdHost) {
    const fwdProto =
      req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || "https";
    return new URL(path, `${fwdProto}://${fwdHost}`);
  }

  return new URL(path, req.url);
}
