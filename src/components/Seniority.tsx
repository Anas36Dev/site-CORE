import { Award, Crown, Code2, Paintbrush, type LucideIcon } from "lucide-react";
import { clsx } from "clsx";

import { Badge } from "@/components/Badge";
import { isDoyen, isBenjamin, asStringArray } from "@/lib/labels";

type Mark = { Icon: LucideIcon; label: string; text: string; hover: string };

/**
 * Icônes de rôle/statut à côté du pseudo. Au survol, chaque icône déploie une
 * étiquette colorée avec le nom du rôle (Fondateur, Développeur, Designer, Doyen).
 */
export function MemberMarks({
  role,
  groups,
  joinedAt,
  status,
  size = 14,
  expand = false,
}: {
  role: string;
  groups: unknown;
  joinedAt: Date | string | null;
  status: string;
  size?: number;
  /** true = déploie l'étiquette au survol (profils). false = icône + infobulle (listes). */
  expand?: boolean;
}) {
  const g = asStringArray(groups);
  const marks: Mark[] = [];

  if (role === "FONDATEUR") {
    marks.push({
      Icon: Crown,
      label: "Fondateur CORE",
      text: "text-gold-400",
      hover: "hover:bg-gold-500/12 hover:ring-gold-500/30",
    });
  }
  if (g.includes("DEVS")) {
    marks.push({
      Icon: Code2,
      label: "Développeur / Technicien CORE",
      text: "text-federal-300",
      hover: "hover:bg-federal-500/15 hover:ring-federal-500/30",
    });
  }
  if (g.includes("DESIGNERS")) {
    marks.push({
      Icon: Paintbrush,
      label: "Designer CORE",
      text: "text-crimson-400",
      hover: "hover:bg-crimson-500/12 hover:ring-crimson-500/30",
    });
  }
  if (isDoyen(joinedAt, status)) {
    marks.push({
      Icon: Award,
      label: "Doyen CORE — +5 années chez CORE",
      text: "text-gold-400",
      hover: "hover:bg-gold-500/12 hover:ring-gold-500/30",
    });
  }

  if (marks.length === 0) return null;

  // Mode listes : icônes simples, sans infobulle (le détail est sur la fiche membre).
  if (!expand) {
    return (
      <span className="inline-flex items-center gap-1">
        {marks.map(({ Icon, text }, i) => (
          <span key={i} className={clsx("inline-flex", text)}>
            <Icon size={size} strokeWidth={2} />
          </span>
        ))}
      </span>
    );
  }

  // Mode profil : l'étiquette se déploie au survol.
  return (
    <span className="inline-flex items-center gap-1">
      {marks.map(({ Icon, label, text, hover }, i) => (
        <span
          key={i}
          className={clsx(
            "group/mark inline-flex items-center rounded-md align-middle transition-all hover:px-1.5 hover:py-0.5 hover:ring-1",
            text,
            hover,
          )}
        >
          <Icon size={size} strokeWidth={2} className="shrink-0" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.68rem] font-medium opacity-0 transition-all duration-200 group-hover/mark:ml-1 group-hover/mark:max-w-[16rem] group-hover/mark:opacity-100">
            {label}
          </span>
        </span>
      ))}
    </span>
  );
}

/** Badge d'ancienneté : Vétéran (a quitté) ou Benjamin (−6 mois, vert). */
export function StatusBadge({
  joinedAt,
  status,
}: {
  joinedAt: Date | string | null;
  status: string;
}) {
  if (status === "VETERAN") return <Badge tone="steel">Vétéran</Badge>;
  if (isBenjamin(joinedAt, status)) return <Badge tone="ok">Benjamin</Badge>;
  return null;
}
