import { notFound } from "next/navigation";
import { Server, Users, Gamepad2, TriangleAlert } from "lucide-react";

import { db } from "@/lib/db";
import { BackLink } from "@/components/BackLink";
import { Badge } from "@/components/Badge";
import { StructureMark } from "@/components/StructureMark";
import { SiDiscord } from "@/components/icons";
import { asStringArray } from "@/lib/labels";
import { structureLogo } from "@/lib/structure-logos";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const server = await db.partnerServer.findFirst({
    where: { slug },
    select: { name: true },
  });
  return { title: server ? server.name : "Serveur introuvable" };
}

export default async function ServeurPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const server = await db.partnerServer.findFirst({ where: { slug } });
  if (!server) notFound();

  const projects = await db.project.findMany({
    where: { name: server.name },
    orderBy: [{ year: "desc" }, { category: "asc" }],
  });

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <BackLink label="Retour" fallback="/projets/legaux" />

      {/* Bandeau serveur fermé */}
      {server.isClosed && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-crimson-500/40 bg-crimson-500/10 px-4 py-3 text-sm font-medium text-crimson-400">
          <TriangleAlert size={16} />
          Ce serveur est actuellement fermé ou n'existe plus.
        </div>
      )}

      {/* En-tête */}
      <header className="panel flex flex-col items-center gap-5 px-6 py-8 text-center sm:flex-row sm:items-center sm:text-left">
        {server.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={server.logoUrl}
            alt={server.name}
            className="size-24 shrink-0 rounded-xl bg-navy-800 object-contain ring-1 ring-navy-600"
          />
        ) : (
          <span className="grid size-24 shrink-0 place-items-center rounded-xl bg-navy-800 text-steel-500 ring-1 ring-navy-600">
            <Server size={36} />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-steel-100">
            {server.name}
          </h1>
          {server.founders && (
            <p className="mt-1 text-sm text-steel-300">
              Fondé par <span className="text-gold-400">{server.founders}</span>
            </p>
          )}
          {server.playersRange && (
            <div className="mt-3 flex justify-center sm:justify-start">
              <Badge tone="federal">
                <Users size={12} /> {server.playersRange} joueurs / jour
              </Badge>
            </div>
          )}
        </div>
      </header>

      {/* Redirections */}
      {(server.discordUrl || (server.fivemUrl && !server.isClosed)) && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {server.discordUrl && (
            <a
              href={server.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="panel flex items-center gap-3 px-4 py-3 transition-colors hover:border-gold-500/40 hover:bg-navy-800/60"
            >
              <SiDiscord size={18} className="text-federal-300" />
              <span className="text-sm font-medium text-steel-100">Discord du serveur</span>
            </a>
          )}
          {server.fivemUrl && !server.isClosed && (
            <a
              href={server.fivemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="panel flex items-center gap-3 px-4 py-3 transition-colors hover:border-gold-500/40 hover:bg-navy-800/60"
            >
              <Gamepad2 size={18} className="text-gold-400" />
              <span className="text-sm font-medium text-steel-100">Se connecter (FiveM)</span>
            </a>
          )}
        </div>
      )}

      {/* Projets CORE sur ce serveur */}
      {projects.length > 0 && (
        <section className="panel mt-4 px-6 py-5">
          <p className="label-tag mb-3">Nos projets sur ce serveur</p>
          <div className="space-y-2">
            {projects.map((p) => {
              const structures = asStringArray(p.structures);
              return (
                <div key={p.id} className="rounded-lg bg-navy-900 px-3 py-2.5 ring-1 ring-navy-700">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-steel-100">
                      {p.year} · {p.duration}
                    </span>
                    <Badge tone={p.category === "ILLEGAL" ? "crimson" : "federal"}>
                      {p.category === "ILLEGAL" ? "Illégal" : "Légal"}
                    </Badge>
                  </div>
                  {structures.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {structures.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center gap-1.5 rounded-md bg-navy-800 px-2 py-0.5 text-xs text-steel-300 ring-1 ring-navy-600"
                        >
                          <StructureMark mark={structureLogo(s)} category={p.category} />
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
