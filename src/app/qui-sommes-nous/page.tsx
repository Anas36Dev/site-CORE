import { HelpCircle, Server } from "lucide-react";

import { db } from "@/lib/db";
import { PageHeader } from "@/components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "Qui sommes-nous ?" };

type AboutContent = {
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
};

/** Transforme les segments **gras** d'un paragraphe en <strong>. */
function renderRich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-steel-100">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

export default async function QuiSommesNousPage() {
  const [content, servers] = await Promise.all([
    db.content.findUnique({ where: { key: "about.body" } }),
    db.partnerServer.findMany({ orderBy: [{ name: "asc" }] }),
  ]);
  const about = (content?.value ?? {}) as AboutContent;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <PageHeader
        icon={HelpCircle}
        badge={about.subtitle ?? "California Operational Roleplay Entity"}
        title={about.title ?? "Qui sommes-nous ?"}
      />

      {/* Manifeste */}
      <div className="mt-8 space-y-5">
        {(about.paragraphs ?? []).map((p, i) => (
          <p
            key={i}
            className="indent-8 whitespace-pre-line leading-relaxed text-steel-300"
          >
            {renderRich(p)}
          </p>
        ))}
      </div>

      {/* Serveurs hôtes */}
      {servers.length > 0 && (
        <section className="mt-12">
          <div className="mb-4 flex items-center gap-3">
            <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-steel-100">
              <Server size={18} className="text-gold-400" />
              Serveurs qui nous ont accueillis
            </h2>
            <span className="h-px flex-1 bg-navy-700" />
            <span className="label-tag">{servers.length}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {servers.map((s) => (
              <div
                key={s.id}
                className="panel flex flex-none items-center gap-3 px-4 py-3 w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] lg:w-[calc(25%-0.5625rem)]"
              >
                {s.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.logoUrl}
                    alt={s.name}
                    className="size-9 shrink-0 rounded object-contain"
                  />
                ) : (
                  <span className="grid size-9 shrink-0 place-items-center rounded bg-navy-800 text-gold-400 ring-1 ring-gold-500/30">
                    <Server size={16} />
                  </span>
                )}
                <span className="truncate text-sm font-medium text-steel-100">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
