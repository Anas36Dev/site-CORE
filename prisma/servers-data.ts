// Serveurs hôtes (« qui nous ont accueillis ») + leurs logos.
// Partagé entre le seed complet et le re-seed ciblé scripts/reseed-servers.ts.
// Logos dans public/images/serveurs/.
// Ordre : du projet LE PLUS RÉCENT au plus ancien.

export type ServerRow = { name: string; logo?: string };

const img = (f: string) => `/images/serveurs/${f}`;

export const SERVERS: ServerRow[] = [
  // 2026
  { name: "AriaLife V2", logo: img("arialife-v2.png") },
  { name: "Ultraze", logo: img("ultraze.png") },
  { name: "LegacyWorld", logo: img("legacyworld.png") },
  { name: "NoLimit", logo: img("nolimit.png") },
  // 2025
  { name: "FRAME", logo: img("frame.png") },
  { name: "Hurricane", logo: img("hurricane.png") },
  { name: "Arkane", logo: img("arkane.png") },
  { name: "OnlyRP", logo: img("onlyrp.png") },
  { name: "UltraRoleplay", logo: img("ultraroleplay.png") },
  { name: "Projet X" },
  // 2024
  { name: "New Hill's V2" },
  { name: "Origin RP", logo: img("originrp.png") },
  { name: "GreenTown", logo: img("greentown.jpg") },
  { name: "Wise", logo: img("wise.png") },
  { name: "ViceLand", logo: img("viceland.png") },
  // 2023
  { name: "SunLight" },
  { name: "American Dream", logo: img("americandream.png") },
  { name: "AMI RP", logo: img("amirp.png") },
  { name: "Anesya", logo: img("anesya.png") },
  // 2022
  { name: "MetaRP Whitelist", logo: img("metarp.jpg") },
  // 2021
  { name: "SLife", logo: img("slife.png") },
  { name: "Aria Life V1", logo: img("arialife-v2.png") },
  { name: "Initiale" },
  { name: "iFive" }, // logo à re-déposer (perdu lors d'une conversion — voir consigne)
  // Période à confirmer (logos ajoutés récemment)
  { name: "NorthPoint", logo: img("northpoint.png") },
  { name: "Rewind", logo: img("rewind.png") },
  { name: "San Andreas Stories", logo: img("sanandreasstories.png") },
  { name: "SteelFive", logo: img("steelfive.png") },
  { name: "FlashLand", logo: img("flashland.png") },
  { name: "GLife", logo: img("glife.png") },
  { name: "Offline", logo: img("offline.png") },
  { name: "Stark", logo: img("stark.png") },
  { name: "StoryLife FA", logo: img("storylife-fa.png") },
  { name: "StoryLife WL", logo: img("storylife-wl.png") },
  { name: "RedStart", logo: img("redstart.png") },
  { name: "NoFace", logo: img("noface.png") },
];
