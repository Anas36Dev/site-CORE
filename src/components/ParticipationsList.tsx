import Link from "next/link";
import { Server } from "lucide-react";

import { serverRank } from "@/lib/server-order";

export type ParticipationData = {
  id: number;
  grade: string | null;
  structure: string;
  project: {
    name: string;
    year: number;
    category: string;
    logoUrl: string | null;
    serverLogoUrl: string | null;
  };
};

export function ParticipationsList({
  participations,
  serverLogos,
  serverSlugs,
}: {
  participations: ParticipationData[];
  /** Logos serveurs, indexés par nom de serveur en minuscules. */
  serverLogos?: Record<string, string | null>;
  /** Slugs serveurs, indexés par nom de serveur en minuscules. */
  serverSlugs?: Record<string, string>;
}) {
  if (participations.length === 0) {
    return (
      <p className="text-sm text-steel-500">Aucun projet renseigné pour le moment.</p>
    );
  }

  // Du plus récent (en tête) au plus ancien (en bas).
  const sorted = [...participations].sort((a, b) => {
    const ra = serverRank(a.project.name);
    const rb = serverRank(b.project.name);
    if (ra !== rb) return rb - ra;
    return b.project.year - a.project.year;
  });

  return (
    <div className="space-y-2">
      {sorted.map((p) => {
        const key = p.project.name.toLowerCase();
        const serverLogo = p.project.serverLogoUrl || serverLogos?.[key] || null;
        const slug = serverSlugs?.[key];

        const inner = (
          <>
            {/* Logo du serveur */}
            {serverLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={serverLogo}
                alt={p.project.name}
                className="size-10 shrink-0 rounded-md object-contain ring-1 ring-navy-600"
              />
            ) : (
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-navy-800 text-steel-500 ring-1 ring-navy-600">
                <Server size={18} strokeWidth={1.75} />
              </span>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-steel-100">
                {p.project.name}
                <span className="text-steel-500"> · {p.project.year}</span>
              </p>
              <p className="truncate text-xs">
                {p.structure && <span className="text-steel-300">{p.structure}</span>}
                {p.structure && p.grade && <span className="text-steel-500"> · </span>}
                {p.grade ? (
                  <span className="font-medium text-gold-400">{p.grade}</span>
                ) : (
                  !p.structure && (
                    <span className="text-steel-500">
                      {p.project.category === "ILLEGAL" ? "Illégal" : "Légal"}
                    </span>
                  )
                )}
              </p>
            </div>
          </>
        );

        const className =
          "flex items-center gap-3 rounded-lg bg-navy-900 px-3 py-2.5 ring-1 ring-navy-700";

        return slug ? (
          <Link
            key={p.id}
            href={`/serveurs/${slug}`}
            className={`${className} transition-colors hover:bg-navy-800 hover:ring-gold-500/40`}
          >
            {inner}
          </Link>
        ) : (
          <div key={p.id} className={className}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
