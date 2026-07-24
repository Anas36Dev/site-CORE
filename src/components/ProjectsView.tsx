import Link from "next/link";

import { Badge, type Tone } from "@/components/Badge";
import { StructureMark } from "@/components/StructureMark";
import { asStringArray } from "@/lib/labels";
import { serverRank } from "@/lib/server-order";
import { structureLogo } from "@/lib/structure-logos";

export type ProjectData = {
  id: number;
  name: string;
  year: number;
  duration: string | null;
  category: string;
  structures: unknown;
  logoUrl: string | null;
  description: string | null;
};

export function ProjectsView({
  projects,
  tone = "federal",
  serverSlugs,
  serverLogos,
}: {
  projects: ProjectData[];
  tone?: Tone;
  /** Slugs serveurs indexés par nom en minuscules (pour lier vers /serveurs/<slug>). */
  serverSlugs?: Record<string, string>;
  /** Logos serveurs indexés par nom en minuscules. */
  serverLogos?: Record<string, string | null>;
}) {
  if (projects.length === 0) {
    return (
      <div className="panel mt-8 px-5 py-8 text-center text-steel-500">
        Aucun projet pour le moment.
      </div>
    );
  }

  const years = Array.from(new Set(projects.map((p) => p.year))).sort(
    (a, b) => b - a,
  );

  return (
    <div className="mt-8 space-y-10">
      {years.map((year) => {
        // Dans chaque année, ordre chronologique des serveurs (plus récent en tête).
        const items = projects
          .filter((p) => p.year === year)
          .sort((a, b) => serverRank(b.name) - serverRank(a.name));
        return (
          <section key={year} className="relative">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-lg font-semibold text-gold-400">
                {year}
              </span>
              <span className="h-px flex-1 bg-navy-700" />
              <span className="label-tag">
                {items.length} projet{items.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((p) => {
                const structures = asStringArray(p.structures);
                const slug = serverSlugs?.[p.name.toLowerCase()];
                const serverLogo = serverLogos?.[p.name.toLowerCase()] ?? null;

                const inner = (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="flex items-center gap-2 font-semibold text-steel-100">
                        {serverLogo && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={serverLogo}
                            alt=""
                            className="size-6 shrink-0 rounded object-contain"
                          />
                        )}
                        <span className={slug ? "transition-colors group-hover:text-gold-400" : ""}>
                          {p.name}
                        </span>
                      </h3>
                      {p.duration && <Badge tone={tone}>{p.duration}</Badge>}
                    </div>
                    {structures.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
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
                    {p.description && (
                      <p className="mt-3 text-sm text-steel-300">{p.description}</p>
                    )}
                  </>
                );

                const base = "panel block px-4 py-4";
                return slug ? (
                  <Link
                    key={p.id}
                    href={`/serveurs/${slug}`}
                    className={`${base} group transition-colors hover:border-gold-500/40 hover:bg-navy-800/60`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={p.id} className={base}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
