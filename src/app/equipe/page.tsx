import { Users } from "lucide-react";

import { db } from "@/lib/db";
import { PageHeader } from "@/components/PageHeader";
import { MemberCard } from "@/components/MemberCard";
import { GROUP_LABEL, GROUP_ORDER, asStringArray } from "@/lib/labels";

export const dynamic = "force-dynamic";
export const metadata = { title: "Notre équipe" };

export default async function EquipePage() {
  const members = await db.member.findMany({ orderBy: [{ order: "asc" }] });

  const sections = GROUP_ORDER.map((group) => ({
    group,
    members: members.filter((m) => asStringArray(m.groups).includes(group)),
  })).filter((s) => s.members.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <PageHeader
        icon={Users}
        title="Notre équipe"
        subtitle="Ceux qui donnent vie à CORE, jour après jour."
      />

      <div className="mt-8 space-y-10">
        {sections.map(({ group, members }) => (
          <section key={group}>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-lg font-semibold text-steel-100">
                {GROUP_LABEL[group]}
              </h2>
              <span className="h-px flex-1 bg-navy-700" />
              <span className="label-tag">{members.length}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
