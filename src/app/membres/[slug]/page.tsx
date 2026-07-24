import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { MemberProfile } from "@/components/MemberProfile";
import { BackLink } from "@/components/BackLink";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = await db.member.findUnique({ where: { slug }, select: { pseudo: true } });
  return { title: member ? member.pseudo : "Membre introuvable" };
}

export default async function FicheMembrePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [member, servers] = await Promise.all([
    db.member.findUnique({
      where: { slug },
      include: {
        participations: { orderBy: [{ order: "asc" }], include: { project: true } },
      },
    }),
    db.partnerServer.findMany({ select: { name: true, logoUrl: true, slug: true } }),
  ]);
  if (!member) notFound();

  const serverLogos = Object.fromEntries(
    servers.map((s) => [s.name.toLowerCase(), s.logoUrl]),
  );
  const serverSlugs = Object.fromEntries(
    servers.filter((s) => s.slug).map((s) => [s.name.toLowerCase(), s.slug!]),
  );

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <BackLink label="Retour" />

      <MemberProfile member={member} serverLogos={serverLogos} serverSlugs={serverSlugs} />
    </div>
  );
}
