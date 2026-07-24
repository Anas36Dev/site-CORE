// Chronologie officielle des serveurs par lesquels CORE est passé (du plus ancien
// au plus récent). Sert à ordonner les participations sur les profils.

const CHRONOLOGY = [
  "ifive",
  "slife",
  "initiale",
  "arialifev1", // Aria Life V1
  "metarpwhitelist", // MetaRP WL
  "anesya",
  "amirp",
  "sunlight",
  "americandream",
  "originrp",
  "newhillsv2",
  "viceland",
  "wise",
  "greentown",
  "projetx",
  "ultraroleplay",
  "hurricane",
  "onlyrp",
  "arkane",
  "frame",
  "arialifev2",
  "ultraze",
  "sanandreasstories",
  "legacyworld",
  "nolimit",
  "dekay",
];

function normalize(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Rang chronologique d'un serveur (0 = plus ancien). -1 si inconnu. */
export function serverRank(name: string): number {
  return CHRONOLOGY.indexOf(normalize(name));
}
