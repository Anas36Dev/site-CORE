import type { ComponentType } from "react";
import {
  Home,
  HelpCircle,
  Users,
  IdCard,
  FolderKanban,
  ShieldCheck,
  Skull,
  Images,
  Gamepad2,
  Tablet,
  UserCircle,
  LayoutDashboard,
  FileText,
} from "lucide-react";

import { SiDiscord, SiTiktok } from "@/components/icons";

type BrandIcon = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

export type NavLeaf = {
  label: string;
  href: string;
  icon: BrandIcon;
  external?: boolean;
};

export type NavGroup = {
  label: string;
  icon: BrandIcon;
  children: NavLeaf[];
};

export type NavEntry = NavLeaf | NavGroup;

export function isGroup(e: NavEntry): e is NavGroup {
  return "children" in e;
}

/** Navigation publique (toujours visible). */
export const PRIMARY_NAV: NavEntry[] = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Qui sommes-nous ?", href: "/qui-sommes-nous", icon: HelpCircle },
  { label: "Notre équipe", href: "/equipe", icon: Users },
  { label: "Nos membres", href: "/membres", icon: IdCard },
  {
    label: "Nos projets",
    icon: FolderKanban,
    children: [
      { label: "Projets légaux", href: "/projets/legaux", icon: ShieldCheck },
      { label: "Projets illégaux", href: "/projets/illegaux", icon: Skull },
    ],
  },
  { label: "Nos réalisations", href: "/realisations", icon: Images },
];

/** Liens externes (réseaux). Les URLs viennent des variables NEXT_PUBLIC_*. */
export const EXTERNAL_NAV: { label: string; url: string; icon: BrandIcon }[] = [
  {
    label: "Notre TikTok",
    url: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@corefranceproject",
    icon: SiTiktok,
  },
  {
    label: "Notre Discord",
    url: process.env.NEXT_PUBLIC_DISCORD_URL || "https://discord.gg/h693prnx85",
    icon: SiDiscord,
  },
];

/** Onglets débloqués une fois connecté. */
export const AUTH_NAV: NavLeaf[] = [
  { label: "Mon compte", href: "/mon-compte", icon: UserCircle },
  {
    label: "Se connecter",
    href: process.env.NEXT_PUBLIC_FIVEM_CONNECT_URL || "#",
    icon: Gamepad2,
    external: true,
  },
  {
    label: "Accès MDT",
    href: process.env.NEXT_PUBLIC_MDT_URL || "#",
    icon: Tablet,
    external: true,
  },
];

/** Entrée back-office (visible si le membre a ≥ 1 permission). */
export const ADMIN_NAV: NavLeaf = {
  label: "Administration",
  href: "/admin",
  icon: LayoutDashboard,
};

/** Sous-sections du back-office (sous-menu « Administration »), filtrées par permission. */
export const ADMIN_SECTIONS: {
  label: string;
  href: string;
  icon: BrandIcon;
  perm: string | null;
}[] = [
  { label: "Tableau de bord", href: "/admin", icon: LayoutDashboard, perm: null },
  { label: "Membres", href: "/admin/membres", icon: Users, perm: "GESTION_MEMBRES" },
  { label: "Projets", href: "/admin/projets", icon: FolderKanban, perm: "GESTION_PROJETS" },
  { label: "Réalisations", href: "/admin/realisations", icon: Images, perm: "GESTION_REALISATIONS" },
  { label: "Contenu", href: "/admin/contenu", icon: FileText, perm: "GESTION_CONTENU" },
  { label: "Permissions", href: "/admin/permissions", icon: ShieldCheck, perm: "GESTION_PERMISSIONS" },
];
