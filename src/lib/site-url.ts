import type { NextRequest } from "next/server";

/**
 * Construit une URL absolue vers le site **public**, en tenant compte d'un
 * éventuel reverse proxy (Dokploy/Traefik).
 *
 * Derrière un proxy, `req.url` pointe vers l'hôte *interne* du conteneur
 * (ex. http://localhost:3000), pas le domaine public : rediriger avec cette
 * valeur envoie l'utilisateur sur « localhost:3000 ». Le proxy ajoute des
 * en-têtes `X-Forwarded-Proto` / `X-Forwarded-Host` avec le vrai schéma et
 * domaine ; on les utilise en priorité. En dev (pas de proxy), on retombe sur
 * l'origine de `req.url`, qui est correcte.
 */
export function siteUrl(req: NextRequest, path: string): URL {
  const fwdHost = req.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  if (fwdHost) {
    const fwdProto =
      req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || "https";
    return new URL(path, `${fwdProto}://${fwdHost}`);
  }
  return new URL(path, req.url);
}
