"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Images,
  FileText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type Section = {
  href: string;
  label: string;
  icon: LucideIcon;
  perm: string | null;
};

const SECTIONS: Section[] = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, perm: null },
  { href: "/admin/membres", label: "Membres", icon: Users, perm: "GESTION_MEMBRES" },
  { href: "/admin/projets", label: "Projets", icon: FolderKanban, perm: "GESTION_PROJETS" },
  { href: "/admin/realisations", label: "Réalisations", icon: Images, perm: "GESTION_REALISATIONS" },
  { href: "/admin/contenu", label: "Contenu", icon: FileText, perm: "GESTION_CONTENU" },
  { href: "/admin/permissions", label: "Permissions", icon: ShieldCheck, perm: "GESTION_PERMISSIONS" },
];

export function AdminNav({ permissions }: { permissions: string[] }) {
  const pathname = usePathname();
  const visible = SECTIONS.filter(
    (s) => s.perm === null || permissions.includes(s.perm),
  );

  return (
    <nav className="flex gap-2 overflow-x-auto lg:w-56 lg:shrink-0 lg:flex-col lg:overflow-visible">
      {visible.map((s) => {
        const active =
          s.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(s.href);
        const Icon = s.icon;
        return (
          <Link
            key={s.href}
            href={s.href}
            className={clsx(
              "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-navy-800 text-gold-400 ring-1 ring-gold-500/30"
                : "text-steel-300 hover:bg-navy-800/60 hover:text-steel-100",
            )}
          >
            <Icon size={17} strokeWidth={1.75} />
            {s.label}
          </Link>
        );
      })}
    </nav>
  );
}
