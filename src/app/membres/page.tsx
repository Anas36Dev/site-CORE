import { IdCard } from "lucide-react";

import { db } from "@/lib/db";
import { PageHeader } from "@/components/PageHeader";
import { MemberCard } from "@/components/MemberCard";
import { Badge } from "@/components/Badge";

export const dynamic = "force-dynamic";
export const metadata = { title: "Nos membres" };

export default async function MembresPage() {
  const members = await db.member.findMany({ where: { inDirectory: true } });

  // Ordre d'arrivée dans CORE (plus ancien → plus récent), sans-date à la fin.
  members.sort((a, b) => {
    const ta = a.joinedAt ? new Date(a.joinedAt).getTime() : Infinity;
    const tb = b.joinedAt ? new Date(b.joinedAt).getTime() : Infinity;
    return ta - tb;
  });

  const actifs = members.filter((m) => m.status === "ACTIF");
  const veterans = members.filter((m) => m.status === "VETERAN");

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <PageHeader
        icon={IdCard}
        title="Nos membres"
        subtitle={`Notre collectif compte actuellement ${members.length} membre${members.length > 1 ? "s" : ""}.`}
      />

      <MembersSection title="Membres actifs" members={actifs} />
      {veterans.length > 0 && (
        <p className="label-tag mt-14 text-center">Sans oublier nos vétérans</p>
      )}
      <MembersSection title="Vétérans" members={veterans} topClass="mt-4" />

      {/* Légende des badges */}
      <div className="mt-14 border-t border-navy-700 pt-6">
        <p className="label-tag mb-4 text-center">Légende</p>
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          <div className="flex items-start gap-3">
            <Badge tone="ok">Benjamin</Badge>
            <p className="text-sm text-steel-400">
              Membre ayant rejoint CORE il y a moins de 6 mois.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Badge tone="steel">Vétéran</Badge>
            <p className="text-sm text-steel-400">
              Membre ayant officiellement quitté le collectif, mais qui a participé à
              plusieurs de nos projets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MembersSection({
  title,
  members,
  topClass = "mt-10",
}: {
  title: string;
  members: React.ComponentProps<typeof MemberCard>["member"][];
  topClass?: string;
}) {
  if (members.length === 0) return null;
  return (
    <section className={topClass}>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-lg font-semibold text-steel-100">{title}</h2>
        <span className="h-px flex-1 bg-navy-700" />
        <span className="label-tag">{members.length}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <MemberCard key={m.slug} member={m} showOrientation={false} />
        ))}
      </div>
    </section>
  );
}
