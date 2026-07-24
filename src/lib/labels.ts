import type { Tone } from "@/components/Badge";

export const ORIENTATION: Record<string, { label: string; tone: Tone }> = {
  POLICE: { label: "Police", tone: "federal" },
  GOUVERNEMENT: { label: "Gouvernement", tone: "gold" },
  JUSTICE: { label: "Justice", tone: "steel" },
  ILLEGAL: { label: "Illégal", tone: "crimson" },
  AUCUNE: { label: "", tone: "steel" },
};

export const GROUP_LABEL: Record<string, string> = {
  FONDATEURS: "Fondateurs",
  DEVS: "Développeurs & Techniciens",
  DESIGNERS: "Designers",
  DOYENS: "Doyens · +5 ans de service",
};

export const GROUP_ORDER = ["FONDATEURS", "DEVS", "DESIGNERS", "DOYENS"] as const;

export const REALISATION_LABEL: Record<string, string> = {
  AFFICHE: "Affiches",
  LOGO: "Logos",
  DOCUMENT: "Documents",
  FORMULAIRE: "Formulaires",
  DOSSIER: "Dossiers",
  SITE_EXTERNE: "Sites externes",
};

export const REALISATION_ORDER = [
  "AFFICHE",
  "LOGO",
  "DOCUMENT",
  "FORMULAIRE",
  "DOSSIER",
  "SITE_EXTERNE",
] as const;

/** Formate une date en français long (ex. « 12 novembre 2019 »). */
export function formatDate(d: Date | string | null | undefined): string | null {
  if (!d) return null;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(d));
}

/** Année seule (ex. « 2019 »). */
export function formatYear(d: Date | string | null | undefined): string | null {
  if (!d) return null;
  return String(new Date(d).getUTCFullYear());
}

/** Convertit un champ JSON en tableau de chaînes propre. */
export function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? (v.filter((x) => typeof x === "string") as string[]) : [];
}

// ── Ancienneté ────────────────────────────────────────────────────────────
// Vétéran = a quitté le projet (status). Doyen = +5 ans. Benjamin = −6 mois.

const YEAR_MS = 365.25 * 24 * 3600 * 1000;
const MONTH_MS = 30.44 * 24 * 3600 * 1000;

/** Nombre d'années entières d'ancienneté (0 si date inconnue). */
export function serviceYears(joinedAt: Date | string | null | undefined): number {
  if (!joinedAt) return 0;
  return Math.max(0, Math.floor((Date.now() - new Date(joinedAt).getTime()) / YEAR_MS));
}

/** Ancienneté en mois (null si date inconnue). */
export function serviceMonths(joinedAt: Date | string | null | undefined): number | null {
  if (!joinedAt) return null;
  return (Date.now() - new Date(joinedAt).getTime()) / MONTH_MS;
}

/** Doyen : membre actif de plus de 5 ans dans le projet. */
export function isDoyen(joinedAt: Date | string | null | undefined, status: string): boolean {
  return status !== "VETERAN" && serviceYears(joinedAt) >= 5;
}

/** Benjamin : membre actif de moins de 6 mois dans le projet. */
export function isBenjamin(joinedAt: Date | string | null | undefined, status: string): boolean {
  if (status === "VETERAN") return false;
  const m = serviceMonths(joinedAt);
  return m !== null && m < 6;
}
