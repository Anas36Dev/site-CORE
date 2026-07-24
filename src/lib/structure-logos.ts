// Base de correspondance logo ↔ structure/organisation jouée dans les projets.
// Clé = nom de la structure normalisé (minuscules, sans espaces/ponctuation).
// Logos dans public/images/structures/. Une structure absente = fallback par
// catégorie (mallette pour le légal, cagoule pour l'illégal), géré dans ProjectsView.

const s = (f: string) => `/images/structures/${f}`;

const STRUCTURE_LOGOS: Record<string, string> = {
  blainecountysheriffoffice: s("bcso.png"),
  sanandreasstatepolice: s("sasp.png"),
  lossantospolicedepartment: s("police.png"),
  ifivepolicedepartment: s("police.png"),
  federalbureauofinvestigation: s("fbi.png"),
  drugenforcementadministration: s("dea.png"),
  internalrevenueservices: s("irs.png"),
  departmentofjustice: s("doj.png"),
  unitedstatesecretservice: s("usss.png"),
  unitedstatesmarshalsservice: s("us-marshals.png"),
  diplomaticsecurityservice: s("diplomatic-security-service.png"),
  sanandreasgovernment: s("gouv.png"),
  cayoperico: s("cayoperico.png"),
  carteldecayoperico: s("cayoperico.png"),
  miliciadecayoperico: s("milicia-cayo-perico.png"),
  cartelmadrazo: s("cartel-madrazo.png"),
  familletexaneduggan: s("duggan.png"),
  familletexaneross: s("duggan.png"),
};

// Marques spéciales (icônes) quand il n'y a pas de logo image.
const STRUCTURE_MARKS: Record<string, string> = {
  sonsofanarchymc: "moto",
  leconseilgm: "meeting",
  familleitaliennedeluca: "flag-it",
  clangenna: "flag-it",
  bloods: "red",
  mafiarusse: "flag-ru",
  mafiaslave: "flag-ru",
  solntsevskaya: "flag-ru",
  grouperokossovski: "flag-ru",
  clandeskazakh: "flag-kz",
};

function normalize(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Renvoie soit un chemin d'image (« /images/… »), soit une marque spéciale
 * (« moto », « meeting », « flag-it/ru/kz »), soit null (→ fallback catégorie).
 */
export function structureLogo(name: string): string | null {
  const n = normalize(name);
  return STRUCTURE_LOGOS[n] ?? STRUCTURE_MARKS[n] ?? null;
}
