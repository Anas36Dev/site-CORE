// Permissions back-office (données pures, client-safe).

export const PERMISSIONS = [
  "GESTION_MEMBRES",
  "GESTION_PROJETS",
  "GESTION_REALISATIONS",
  "GESTION_CONTENU",
  "GESTION_PERMISSIONS",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export const PERMISSION_LABEL: Record<Permission, string> = {
  GESTION_MEMBRES: "Gestion des membres",
  GESTION_PROJETS: "Gestion des projets",
  GESTION_REALISATIONS: "Gestion des réalisations",
  GESTION_CONTENU: "Gestion du contenu",
  GESTION_PERMISSIONS: "Gestion des permissions",
};

export const PERMISSION_DESC: Record<Permission, string> = {
  GESTION_MEMBRES: "Créer, éditer, supprimer les fiches membres et rattacher les Discord ID.",
  GESTION_PROJETS: "Gérer les projets légaux et illégaux.",
  GESTION_REALISATIONS: "Gérer la galerie de réalisations.",
  GESTION_CONTENU: "Éditer le contenu des pages (accueil, qui-sommes-nous, serveurs…).",
  GESTION_PERMISSIONS: "Attribuer les rôles et permissions aux autres membres.",
};
