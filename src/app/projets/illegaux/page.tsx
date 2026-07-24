import { Skull } from "lucide-react";

import { db } from "@/lib/db";
import { PageHeader } from "@/components/PageHeader";
import { ProjectsView } from "@/components/ProjectsView";

export const dynamic = "force-dynamic";
export const metadata = { title: "Projets illégaux" };

export default async function ProjetsIllegauxPage() {
  const [projects, servers] = await Promise.all([
    db.project.findMany({
      where: { category: "ILLEGAL" },
      orderBy: [{ year: "desc" }, { order: "asc" }],
    }),
    db.partnerServer.findMany({ select: { name: true, slug: true, logoUrl: true } }),
  ]);
  const serverSlugs = Object.fromEntries(
    servers.filter((s) => s.slug).map((s) => [s.name.toLowerCase(), s.slug!]),
  );
  const serverLogos = Object.fromEntries(
    servers.map((s) => [s.name.toLowerCase(), s.logoUrl]),
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <PageHeader
        icon={Skull}
        badge="Nos projets"
        title="Projets illégaux"
      />
      <ProjectsView
        projects={projects}
        tone="crimson"
        serverSlugs={serverSlugs}
        serverLogos={serverLogos}
      />
    </div>
  );
}
