import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getCurrentMember } from "@/lib/current-member";
import { MemberProfile } from "@/components/MemberProfile";
import { PageHeader } from "@/components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "Mon compte" };

export default async function MonComptePage() {
  const current = await getCurrentMember();
  if (!current) redirect("/api/auth/discord/login");

  const [member, servers] = await Promise.all([
    db.member.findUnique({
      where: { id: current.id },
      include: {
        participations: { orderBy: [{ order: "asc" }], include: { project: true } },
      },
    }),
    db.partnerServer.findMany({ select: { name: true, logoUrl: true, slug: true } }),
  ]);
  if (!member) redirect("/api/auth/discord/login");

  const serverLogos = Object.fromEntries(
    servers.map((s) => [s.name.toLowerCase(), s.logoUrl]),
  );
  const serverSlugs = Object.fromEntries(
    servers.filter((s) => s.slug).map((s) => [s.name.toLowerCase(), s.slug!]),
  );

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <PageHeader title="Mon compte" />

      <div className="mt-8">
        <MemberProfile member={member} serverLogos={serverLogos} serverSlugs={serverSlugs} />
      </div>
    </div>
  );
}
