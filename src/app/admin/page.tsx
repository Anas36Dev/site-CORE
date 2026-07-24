import Link from "next/link";
import {
  Users,
  FolderKanban,
  Images,
  FileText,
  ShieldCheck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/guard";
import { AdminHeader } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

type Tile = {
  href: string;
  label: string;
  icon: LucideIcon;
  perm: string;
  count: number;
  /** Terme au singulier ; le « s » du pluriel est ajouté automatiquement. */
  noun: string;
};

function countLabel(count: number, noun: string) {
  return `${count} ${noun}${count > 1 ? "s" : ""}`;
}

export default async function AdminDashboard() {
  const member = await requireAdmin();

  const [membres, projets, realisations, serveurs] = await Promise.all([
    db.member.count(),
    db.project.count(),
    db.realisation.count(),
    db.partnerServer.count(),
  ]);

  const tiles: Tile[] = [
    { href: "/admin/membres", label: "Membres", icon: Users, perm: "GESTION_MEMBRES", count: membres, noun: "membre" },
    { href: "/admin/projets", label: "Projets", icon: FolderKanban, perm: "GESTION_PROJETS", count: projets, noun: "projet" },
    { href: "/admin/realisations", label: "Réalisations", icon: Images, perm: "GESTION_REALISATIONS", count: realisations, noun: "réalisation" },
    { href: "/admin/contenu", label: "Contenu & serveurs", icon: FileText, perm: "GESTION_CONTENU", count: serveurs, noun: "serveur" },
    { href: "/admin/permissions", label: "Permissions", icon: ShieldCheck, perm: "GESTION_PERMISSIONS", count: membres, noun: "membre" },
  ];
  const visible = tiles.filter((t) => member.permissions.includes(t.perm));

  return (
    <div>
      <AdminHeader
        title={`Bienvenue, ${member.pseudo}`}
        description="Administration du site CORE France Project."
      />

      {visible.length === 0 ? (
        <p className="text-steel-400">
          Tu n'as aucune section accessible pour le moment.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {visible.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.href}
                href={t.href}
                className="panel group flex items-center gap-4 px-5 py-4 transition-colors hover:border-gold-500/40 hover:bg-navy-800/60"
              >
                <span className="gold-hairline grid size-11 place-items-center rounded-lg bg-navy-800 text-gold-400">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-steel-100">{t.label}</p>
                  <p className="text-sm text-steel-500">{countLabel(t.count, t.noun)}</p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-steel-500 transition-transform group-hover:translate-x-0.5 group-hover:text-gold-400"
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
