// Projets (légaux & illégaux) — source de vérité : export DB (backup_site_vitrine_28-07-2026.sql).
// Régénéré le 2026-07-28. Clé naturelle utilisée par le seed idempotent :
// (name, year, category). Ne pas dupliquer un même triplet.

export type ProjectRow = {
  name: string;
  year: number;
  duration: string | null;
  category: "LEGAL" | "ILLEGAL";
  structures: string[];
  logoUrl: string | null;
  serverLogoUrl: string | null;
  description: string | null;
  order: number;
};

export const PROJECTS: ProjectRow[] = [
  { name: "iFive", year: 2021, duration: "5 mois", category: "LEGAL", structures: ["iFive Police Department"], logoUrl: null, serverLogoUrl: null, description: null, order: 0 },
  { name: "Initiale", year: 2021, duration: "2 mois", category: "LEGAL", structures: ["Los Santos Police Department"], logoUrl: null, serverLogoUrl: null, description: null, order: 1 },
  { name: "SLife", year: 2021, duration: "6 mois", category: "LEGAL", structures: ["Los Santos Police Department"], logoUrl: null, serverLogoUrl: null, description: null, order: 2 },
  { name: "MetaRP Whitelist", year: 2022, duration: "4 mois", category: "LEGAL", structures: ["Los Santos Police Department"], logoUrl: null, serverLogoUrl: null, description: null, order: 3 },
  { name: "Anesya", year: 2023, duration: "2 mois", category: "LEGAL", structures: ["Blaine County Sheriff Office"], logoUrl: null, serverLogoUrl: null, description: null, order: 4 },
  { name: "AMI RP", year: 2023, duration: "1 mois", category: "LEGAL", structures: ["San Andreas Government","United States Marshals Service"], logoUrl: null, serverLogoUrl: null, description: null, order: 5 },
  { name: "American Dream", year: 2023, duration: "3 mois", category: "LEGAL", structures: ["San Andreas State Police"], logoUrl: null, serverLogoUrl: null, description: null, order: 6 },
  { name: "ViceLand", year: 2024, duration: "1 mois", category: "LEGAL", structures: ["San Andreas State Police"], logoUrl: null, serverLogoUrl: null, description: null, order: 7 },
  { name: "Wise", year: 2024, duration: "1 mois", category: "LEGAL", structures: ["San Andreas Government","United State Secret Service"], logoUrl: null, serverLogoUrl: null, description: null, order: 8 },
  { name: "GreenTown", year: 2024, duration: "7 mois", category: "LEGAL", structures: ["Los Santos Police Department","Cayo Perico"], logoUrl: null, serverLogoUrl: null, description: null, order: 9 },
  { name: "Projet X", year: 2025, duration: "2 semaines", category: "LEGAL", structures: ["Federal Bureau of Investigation"], logoUrl: null, serverLogoUrl: null, description: null, order: 10 },
  { name: "UltraRoleplay", year: 2025, duration: "2 mois", category: "LEGAL", structures: ["San Andreas Government","Internal Revenue Services","United State Secret Service","Department of Justice","Diplomatic Security Service"], logoUrl: null, serverLogoUrl: null, description: null, order: 11 },
  { name: "OnlyRP", year: 2025, duration: "3 semaines", category: "LEGAL", structures: ["San Andreas State Police"], logoUrl: null, serverLogoUrl: null, description: null, order: 12 },
  { name: "Arkane", year: 2025, duration: "2 mois", category: "LEGAL", structures: ["Blaine County Sheriff Office","Federal Bureau of Investigation"], logoUrl: null, serverLogoUrl: null, description: null, order: 13 },
  { name: "AriaLife V2", year: 2026, duration: "1 mois", category: "LEGAL", structures: ["Internal Revenue Services","Department of Justice"], logoUrl: null, serverLogoUrl: null, description: null, order: 14 },
  { name: "Ultraze", year: 2026, duration: "2 semaines", category: "LEGAL", structures: ["Drug Enforcement Administration","Federal Bureau of Investigation"], logoUrl: null, serverLogoUrl: null, description: null, order: 15 },
  { name: "LegacyWorld", year: 2026, duration: "2 semaines", category: "LEGAL", structures: ["Milicia de Cayo Perico"], logoUrl: null, serverLogoUrl: null, description: null, order: 16 },
  { name: "NoLimit", year: 2026, duration: "1 mois", category: "LEGAL", structures: ["Blaine County Sheriff Office","San Andreas State Police"], logoUrl: null, serverLogoUrl: null, description: null, order: 17 },
  { name: "Aria Life V1", year: 2021, duration: "4 mois", category: "ILLEGAL", structures: ["Famille Italienne De Luca"], logoUrl: null, serverLogoUrl: null, description: null, order: 0 },
  { name: "SLife", year: 2021, duration: "4 mois", category: "ILLEGAL", structures: ["Mafia Russe"], logoUrl: null, serverLogoUrl: null, description: null, order: 1 },
  { name: "MetaRP Whitelist", year: 2022, duration: "1 mois", category: "ILLEGAL", structures: ["Sons of Anarchy MC"], logoUrl: null, serverLogoUrl: null, description: null, order: 2 },
  { name: "SunLight", year: 2023, duration: "1 mois", category: "ILLEGAL", structures: ["Indépendants"], logoUrl: null, serverLogoUrl: null, description: null, order: 3 },
  { name: "Anesya", year: 2023, duration: "2 mois", category: "ILLEGAL", structures: ["Groupe Rokossovski"], logoUrl: null, serverLogoUrl: null, description: null, order: 4 },
  { name: "AMI RP", year: 2023, duration: "1 mois", category: "ILLEGAL", structures: ["Mafia Slave"], logoUrl: null, serverLogoUrl: null, description: null, order: 5 },
  { name: "American Dream", year: 2023, duration: "3 mois", category: "ILLEGAL", structures: ["Solntsevskaya"], logoUrl: null, serverLogoUrl: null, description: null, order: 6 },
  { name: "Origin RP", year: 2024, duration: "2 semaines", category: "ILLEGAL", structures: ["Famille Texane Duggan"], logoUrl: null, serverLogoUrl: null, description: null, order: 7 },
  { name: "New Hill's V2", year: 2024, duration: "2 mois", category: "ILLEGAL", structures: ["Cartel Madrazo"], logoUrl: null, serverLogoUrl: null, description: null, order: 8 },
  { name: "GreenTown", year: 2024, duration: "7 mois", category: "ILLEGAL", structures: ["Mafia Slave","Cartel de Cayo Perico"], logoUrl: null, serverLogoUrl: null, description: null, order: 9 },
  { name: "Hurricane", year: 2025, duration: "1 mois", category: "ILLEGAL", structures: ["Clan des Kazakh"], logoUrl: null, serverLogoUrl: null, description: null, order: 10 },
  { name: "Arkane", year: 2025, duration: "4 mois", category: "ILLEGAL", structures: ["Bloods","Le Conseil (G-M)","Clan Genna"], logoUrl: null, serverLogoUrl: null, description: null, order: 11 },
  { name: "FRAME", year: 2025, duration: "2 mois", category: "ILLEGAL", structures: ["Hustle Nation 74","Famille Ramirez"], logoUrl: null, serverLogoUrl: null, description: null, order: 12 },
  { name: "AriaLife V2", year: 2026, duration: "2 semaines", category: "ILLEGAL", structures: ["Famille Texane Ross"], logoUrl: null, serverLogoUrl: null, description: null, order: 13 },
  { name: "San Andreas Stories", year: 2026, duration: "2 semaines", category: "LEGAL", structures: ["Federal Bureau of Investigation"], logoUrl: null, serverLogoUrl: "/images/serveurs/sanandreasstories.png", description: null, order: 20 },
  { name: "Dekay", year: 2026, duration: "Prochainement", category: "LEGAL", structures: ["Los Santos Police Department"], logoUrl: null, serverLogoUrl: null, description: null, order: 0 },
];
