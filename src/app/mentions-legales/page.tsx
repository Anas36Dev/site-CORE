import { ScrollText } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "Mentions légales" };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gold-400">
        {title}
      </h2>
      <div className="space-y-2 text-sm leading-relaxed text-steel-300">{children}</div>
    </section>
  );
}

export default function MentionsLegalesPage() {
  const discord =
    process.env.NEXT_PUBLIC_DISCORD_URL || "https://discord.gg/h693prnx85";

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <PageHeader
        icon={ScrollText}
        title="Mentions légales"
        subtitle="Informations légales"
      />

      <div className="panel mt-8 space-y-8 px-6 py-6">
        <Section title="Nature du projet">
          <p>
            <strong className="text-steel-100">CORE France Project</strong> (California
            Operational Roleplay Entity) est un collectif amateur de{" "}
            <strong className="text-steel-100">jeu de rôle (RolePlay)</strong> sur{" "}
            <em>Grand Theft Auto V</em>, joué via la plateforme{" "}
            <strong className="text-steel-100">FiveM</strong>. Ce site est une simple{" "}
            vitrine qui présente le collectif, ses membres, ses projets et ses réalisations,
            dans un cadre <strong className="text-steel-100">100&nbsp;% fictif et ludique</strong>,
            sans aucun but lucratif.
          </p>
        </Section>

        <Section title="Caractère fictif">
          <p>
            L'ensemble des institutions, structures, forces de l'ordre, agences, organisations,
            grades, documents, dossiers et personnages présentés sont{" "}
            <strong className="text-steel-100">entièrement fictifs</strong> et s'inscrivent dans
            un univers de roleplay. Toute ressemblance avec des personnes, organismes,
            administrations ou institutions réels ne serait que{" "}
            <strong className="text-steel-100">purement fortuite et involontaire</strong>.
          </p>
        </Section>

        <Section title="Propriété intellectuelle">
          <p>
            <em>Grand Theft Auto V</em> est une marque déposée de{" "}
            <strong className="text-steel-100">Rockstar Games</strong> / Take-Two Interactive.{" "}
            <strong className="text-steel-100">FiveM</strong> est un projet de Cfx.re. CORE France
            Project n'est ni affilié, ni sponsorisé, ni approuvé par ces sociétés.
          </p>
          <p>
            Les logos, affiches, documents et autres visuels présentés sur ce site sont des
            créations réalisées par les membres du collectif à des fins de roleplay.
          </p>
        </Section>

        <Section title="Données personnelles">
          <p>
            <strong className="text-steel-100">Aucune donnée personnelle réelle</strong> n'est
            collectée, vendue ou transmise à des tiers. La connexion via Discord sert uniquement à
            identifier les membres du collectif (pseudo et avatar Discord) et à débloquer leur
            espace membre — ces informations ne sont utilisées qu'en interne, pour le
            fonctionnement du site vitrine.
          </p>
        </Section>

        <Section title="Éditeur & contact">
          <p>
            Ce site et son contenu appartiennent au collectif CORE. Pour toute question, remarque
            ou demande de retrait, contacte-nous via le{" "}
            <a
              href={discord}
              target="_blank"
              rel="noopener noreferrer"
              className="text-federal-300 hover:text-federal-400"
            >
              Discord officiel
            </a>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}
