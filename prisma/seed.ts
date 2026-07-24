import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma";
import { REALISATIONS } from "./realisations-data";
import { SERVERS } from "./servers-data";
import { GALLERY } from "./gallery-data";
import { slugify } from "../src/lib/slug";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL absent (voir .env)");
const db = new PrismaClient({ adapter: new PrismaMariaDb(url) });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Parse une date « JJ/MM/AAAA » en Date UTC (null si absente). */
function parseDate(s: string | null): Date | null {
  if (!s) return null;
  const [d, m, y] = s.split("/").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/** Slug lisible et unique pour l'URL /membres/<slug>. */
function makeSlugger() {
  const used = new Set<string>();
  return (pseudo: string) => {
    const base =
      pseudo
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "membre";
    let slug = base;
    let i = 2;
    while (used.has(slug)) slug = `${base}-${i++}`;
    used.add(slug);
    return slug;
  };
}

// ---------------------------------------------------------------------------
// Données membres (roster complet du Google Site)
// [pseudo, dateArrivée, vétéran, description]
// ---------------------------------------------------------------------------

type Row = [string, string | null, boolean, string | null];

const ROSTER: Row[] = [
  ["anas36", "12/11/2019", false, "L'homme aux milles et un projets"],
  ["Tom Los", "14/03/2020", false, "L'homme le plus adaptable qui pourrais exister"],
  ["Purple", "15/05/2020", false, "Purple prime c'était quelque chose"],
  ["TheDarkWolf", "15/05/2020", false, "Grand fan du RP Motorcycle Club"],
  ["LDR", "15/07/2020", false, "Icône de l'illégal de notre projet"],
  ["Flyzz", "18/07/2020", false, "Le retardataire"],
  ["Kaizz", "20/08/2020", false, "La personne la plus iconique du projet"],
  ["Lukasz_Sad", "15/07/2020", true, null],
  ["Mrk", "01/09/2020", false, null],
  ["Wosko", "15/10/2020", true, "L'époque du « Ah batard du fumes »"],
  ["Latouffe", "01/01/2021", true, null],
  ["Idriss.Brk", "09/01/2021", false, "L'éternel duo de LDR"],
  ["Charliie", "15/03/2021", false, "Icône de nos débuts en police"],
  ["Flox", "20/03/2021", false, "Légal ou illégal, il répond présent"],
  ["AydenBzz", "20/03/2021", true, null],
  ["TriLow", "18/03/2021", true, "Ly Pong, notre deuxième chinois préféré"],
  ["Kanh", "20/03/2021", false, "44"],
  ["Aky", "21/03/2021", false, "Présent, discret et sérieux, que peut-on lui reprocher"],
  ["VeeKooN", "21/03/2021", false, "Un joueur intéressant"],
  ["Alvaro", "24/04/2021", true, "Le seul Fondateur qui a réussis à sortir de la matrixe GTA"],
  ["Florian", "27/06/2021", false, "Développeur, mais il faut payer"],
  ["Babah_Au_Rhum", "28/06/2021", false, null],
  ["ReKzY", "28/06/2021", true, null],
  ["Diablo", "30/06/2021", false, null],
  ["MATADOR", "17/08/2021", false, "Finalement, l'un des plus matrixé"],
  ["Soky", "24/08/2021", false, null],
  ["Flozioo", "26/08/2021", true, null],
  ["Parabellum", "07/10/2021", false, "L'aîné du projet"],
  ["Dragon", "05/01/2022", true, null],
  ["NalymU", "15/01/2022", false, "Insupportable au quotidien, mais heureusement qu'elle est là"],
  ["HeraCross", "26/01/2022", false, null],
  ["Linaa_G", "07/10/2022", true, null],
  ["Louisvrt", "05/05/2023", false, "Représentant de la fierté Portuguaise"],
  ["Myoww", "26/06/2023", false, "L'éternelle absente"],
  ["Silexion", "29/06/2023", false, null],
  ["Okana", "02/04/2023", false, "Celuis que nous n'oublions jamais"],
  ["Wife", "14/07/2023", true, null],
  ["Snow", "15/07/2023", false, "Grand fan des Marshals, jusqu'à payé des packs de véhicules"],
  ["Mowgli", "17/08/2023", true, "L'éternel banni"],
  ["Slight", "29/11/2023", false, null],
  ["Nexode", "29/11/2023", true, "Gunfighteur confirmé"],
  ["Enzz_1313", "10/05/2024", false, "Marseille ou rien"],
  ["Rom1", "10/05/2024", true, null],
  ["ITD_Leus", "10/07/2024", false, "Je peux pas j'ai basket"],
  ["JamSheed", "17/07/2024", false, "Euh, dans la vraie vie"],
  ["Itzuno", "17/07/2024", false, "Le RP n'est qu'un GTA Online avec des limites"],
  ["M.", "17/07/2024", false, null],
  ["Nexley", "12/11/2024", false, "Lui, tu ne lui parles pas d'autre chose que le PSG"],
  ["Jupipi", "12/11/2024", false, "Le trolleur originel"],
  ["Killcot", "18/12/2024", false, "Le concepteur de projet sans fin"],
  ["Faily", "19/12/2024", true, null],
  ["Lukas44320", "29/03/2025", false, "Toujours le même personnage malgré les projets différents"],
  ["Léa", "05/04/2025", false, null],
  ["Pantoufle", "05/04/2025", false, "Notre Procureur Général fictif préféré"],
  ["YNS78", "25/06/2025", false, null],
  ["Zyrox_Delta", "15/07/2025", false, null],
  ["Nadhino", "26/07/2025", false, "Sterling..."],
  ["LOUMAH", "27/07/2025", false, null],
  ["Poqovitch", "05/08/2025", false, "L'expert comptable du projet"],
  ["3THAN94", "05/08/2025", false, "CvC ou rien"],
  ["REAPER", "14/08/2025", false, "L'ancêtre, à 24 ans"],
  ["Titine", "30/08/2025", false, null],
  ["100rancune", "21/11/2025", false, "Le turque-belge"],
  ["Enixo", "25/11/2025", false, null],
  ["MTDZ", "01/02/2026", false, null],
  ["VicO", "03/02/2026", false, null],
  ["Alix31", "13/02/2026", false, null],
  ["Termiflux", "13/02/2026", false, null],
  ["Shin", "19/02/2026", false, null],
  ["JeanFilou", "15/02/2026", false, null],
  ["Sirius", "11/06/2026", false, null],
  ["Chaixou", "11/06/2026", false, null],
  ["Le K Ethan", "12/06/2026", false, null],
  ["TDOUI05", "25/06/2026", false, null],
  // Équipe technique/design absente du roster public
  ["Unishadow", null, false, null],
  ["Soren", null, false, null],
];

// Enrichissement (page « Notre équipe ») : orientation, rôle, titre, groupes, permissions
const ALL = [
  "GESTION_MEMBRES",
  "GESTION_PROJETS",
  "GESTION_REALISATIONS",
  "GESTION_CONTENU",
  "GESTION_PERMISSIONS",
];
const STAFF = ["GESTION_MEMBRES", "GESTION_PROJETS", "GESTION_REALISATIONS", "GESTION_CONTENU"];

type Extra = {
  orientation?: "POLICE" | "GOUVERNEMENT" | "JUSTICE" | "ILLEGAL";
  role?: "FONDATEUR";
  title?: string;
  groups?: string[];
  permissions?: string[];
  inDirectory?: boolean;
};

const EXTRA: Record<string, Extra> = {
  anas36: { orientation: "POLICE", role: "FONDATEUR", title: "Père Fondateur", groups: ["FONDATEURS", "DEVS", "DESIGNERS"], permissions: ALL },
  "Tom Los": { orientation: "GOUVERNEMENT", role: "FONDATEUR", title: "Père Fondateur", groups: ["FONDATEURS"], permissions: STAFF },
  LDR: { orientation: "ILLEGAL", role: "FONDATEUR", title: "Père Fondateur · Lead illégal", groups: ["FONDATEURS", "DOYENS"], permissions: STAFF },
  Kaizz: { orientation: "ILLEGAL", role: "FONDATEUR", title: "Fondateur", groups: ["FONDATEURS"], permissions: STAFF },
  Alvaro: { orientation: "ILLEGAL", role: "FONDATEUR", title: "Fondateur", groups: ["FONDATEURS"] },
  JamSheed: { orientation: "JUSTICE", role: "FONDATEUR", title: "Fondateur", groups: ["FONDATEURS"], permissions: STAFF },
  Pantoufle: { orientation: "POLICE", role: "FONDATEUR", title: "Fondateur", groups: ["FONDATEURS"], permissions: STAFF },
  Purple: { orientation: "ILLEGAL", title: "Lead illégal", groups: ["DOYENS"] },
  Charliie: { orientation: "POLICE", title: "Lead police", groups: ["DOYENS"] },
  MATADOR: { orientation: "POLICE", title: "Lead police" },
  Unishadow: { title: "Sys.Admin", groups: ["DEVS"], inDirectory: false },
  Soren: { title: "Designer · logos & bannières", groups: ["DESIGNERS"], inDirectory: false },
  Snow: { groups: ["DESIGNERS"] },
  JeanFilou: { groups: ["DESIGNERS"] },
  Poqovitch: { groups: ["DESIGNERS"] },
  VeeKooN: { groups: ["DESIGNERS", "DOYENS"] },
  Flox: { groups: ["DOYENS"] },
  AydenBzz: { groups: ["DOYENS"] },
  Aky: { groups: ["DOYENS"] },
  Florian: { groups: ["DOYENS"] },
  Kanh: { groups: ["DOYENS"] },
  Flyzz: { groups: ["DOYENS"] },
  TheDarkWolf: { groups: ["DOYENS"] },
  TriLow: { groups: ["DOYENS"] },
};

// ---------------------------------------------------------------------------
// Projets
// ---------------------------------------------------------------------------

type ProjRow = { name: string; year: number; duration: string; structures: string[] };

const PROJETS_LEGAUX: ProjRow[] = [
  { name: "iFive", year: 2021, duration: "5 mois", structures: ["iFive Police Department"] },
  { name: "Initiale", year: 2021, duration: "2 mois", structures: ["Los Santos Police Department"] },
  { name: "SLife", year: 2021, duration: "6 mois", structures: ["Los Santos Police Department"] },
  { name: "MetaRP Whitelist", year: 2022, duration: "4 mois", structures: ["Los Santos Police Department"] },
  { name: "Anesya", year: 2023, duration: "2 mois", structures: ["Blaine County Sheriff Office"] },
  { name: "AMI RP", year: 2023, duration: "1 mois", structures: ["San Andreas Government", "United States Marshals Service"] },
  { name: "American Dream", year: 2023, duration: "3 mois", structures: ["San Andreas State Police"] },
  { name: "ViceLand", year: 2024, duration: "1 mois", structures: ["San Andreas State Police"] },
  { name: "Wise", year: 2024, duration: "1 mois", structures: ["San Andreas Government"] },
  { name: "GreenTown", year: 2024, duration: "7 mois", structures: ["Los Santos Police Department", "Cayo Perico"] },
  { name: "Projet X", year: 2025, duration: "2 semaines", structures: ["Federal Bureau of Investigation"] },
  { name: "UltraRoleplay", year: 2025, duration: "2 mois", structures: ["San Andreas Government", "IRS", "Secret Service", "DOJ", "DSS"] },
  { name: "OnlyRP", year: 2025, duration: "3 semaines", structures: ["San Andreas State Police"] },
  { name: "Arkane", year: 2025, duration: "2 mois", structures: ["Blaine County Sheriff Office", "FBI"] },
  { name: "AriaLife V2", year: 2026, duration: "1 mois", structures: ["IRS", "DOJ"] },
  { name: "Ultraze", year: 2026, duration: "2 semaines", structures: ["DEA", "FBI"] },
  { name: "LegacyWorld", year: 2026, duration: "2 semaines", structures: ["Milicia de Cayo Perico"] },
  { name: "NoLimit", year: 2026, duration: "1 mois", structures: ["Blaine County Sheriff Office", "San Andreas State Police"] },
];

const PROJETS_ILLEGAUX: ProjRow[] = [
  { name: "Aria Life V1", year: 2021, duration: "4 mois", structures: ["Famille Italienne De Luca"] },
  { name: "SLife", year: 2021, duration: "4 mois", structures: ["Mafia Russe"] },
  { name: "MetaRP Whitelist", year: 2022, duration: "1 mois", structures: ["Sons of Anarchy MC"] },
  { name: "SunLight", year: 2023, duration: "1 mois", structures: ["Indépendants"] },
  { name: "Anesya", year: 2023, duration: "2 mois", structures: ["Groupe Rokossovski"] },
  { name: "AMI RP", year: 2023, duration: "1 mois", structures: ["Mafia Slave"] },
  { name: "American Dream", year: 2023, duration: "3 mois", structures: ["Solntsevskaya"] },
  { name: "Origin RP", year: 2024, duration: "2 semaines", structures: ["Famille Texane Duggan"] },
  { name: "New Hill's V2", year: 2024, duration: "2 mois", structures: ["Cartel Madrazo"] },
  { name: "GreenTown", year: 2024, duration: "7 mois", structures: ["Organisations multiples (à préciser)"] },
  { name: "Hurricane", year: 2025, duration: "1 mois", structures: ["Clan des Kazakh"] },
  { name: "Arkane", year: 2025, duration: "4 mois", structures: ["3 organisations (à préciser)"] },
  { name: "FRAME", year: 2025, duration: "2 mois", structures: ["2 organisations (à préciser)"] },
  { name: "AriaLife V2", year: 2026, duration: "2 semaines", structures: ["Famille Texane Ross"] },
];

// Les serveurs hôtes (avec logos) vivent dans prisma/servers-data.ts.

// ---------------------------------------------------------------------------
// Réalisations
// ---------------------------------------------------------------------------

// Les réalisations vivent dans prisma/realisations-data.ts (partagées avec le
// script de re-seed ciblé scripts/reseed-realisations.ts).

// ---------------------------------------------------------------------------
// Contenu éditable des pages
// ---------------------------------------------------------------------------

const CONTENT: { key: string; value: unknown }[] = [
  {
    key: "home.intro",
    value: {
      badge: "California Operational Roleplay Entity",
      title: "CORE France Project",
      subtitle:
        "Collectif RolePlay FiveM depuis 2019.",
    },
  },
  {
    key: "about.body",
    value: {
      title: "Qui sommes-nous ?",
      subtitle: "CORE — California Operational Roleplay Entity",
      paragraphs: [
        "Nous sommes une équipe de joueurs animés par la volonté d'offrir une expérience RolePlay la plus **réaliste** et **immersive** possible, centrée sur la représentation des forces de l'ordre de Californie, telles que le **LAPD**, le **LASD** ou encore la **CHP**.\nNotre objectif demeure constant : proposer au serveur et à l'ensemble de ses joueurs une **immersion fidèle** au fonctionnement, aux valeurs et aux exigences des services que nous incarnons.",
        "Nous sommes conscients que la reproduction parfaite de certaines structures ou procédures peut comporter des imprécisions ; c'est pourquoi nous faisons preuve d'une **démarche d'amélioration continue**.\nToute aide, tout retour constructif ou toute information fondée sur des éléments réels sont accueillis avec ouverture et considération, dans le but de renforcer la **crédibilité** et la **qualité** de notre projet.",
        "Initialement constitué d'un cercle restreint d'amis, notre collectif s'est progressivement développé pour rassembler aujourd'hui **plus de 75 membres** impliqués dans les projets. En raison de cet effectif conséquent, des exigences administratives propres à chaque serveur et des difficultés parfois rencontrées par les projets indépendants ou encore peu connus, il nous est apparu nécessaire, dans l'intérêt de notre **pérennité**, de **structurer** et d'**officialiser** notre organisation.",
        "À ce jour, nous avons contribué à la mise en place et à la gestion de plusieurs structures institutionnelles comme **S.A Gov**, **U.S. Secret Service**, **FIB**, **IRS**, **SASP Nord**, **SASP Sud**, **BCSO** et **LSPD**, au sein de différents serveurs parmi lesquels figurent **iFive**, **Anesya**, **ViceLand WL**, **UltraRoleplay** et bien d'autres.",
        "Cette expérience nous permet aujourd'hui d'aborder chaque nouveau projet avec **sérieux** et une **vision à long terme**, à condition que cette vision soit partagée.",
      ],
    },
  },
  {
    key: "footer.legal",
    value: {
      copyright: "© 2019–2026 CORE France Project",
      legal:
        "Création fictive réalisée dans le cadre d'un jeu de rôle (roleplay) sur Grand Theft Auto V via FiveM, sous licence Rockstar Games. Aucune donnée réelle n'est collectée. Toute ressemblance avec des personnes ou organismes existants est purement fortuite.",
    },
  },
];

// ---------------------------------------------------------------------------
// Exécution
// ---------------------------------------------------------------------------

async function main() {
  console.log("Nettoyage…");
  await db.session.deleteMany();
  await db.realisation.deleteMany();
  await db.partnerServer.deleteMany();
  await db.galleryImage.deleteMany();
  await db.content.deleteMany();
  // Relation many-to-many membres↔projets purgée automatiquement à la suppression.
  await db.project.deleteMany();
  await db.member.deleteMany();

  console.log("Membres…");
  const slugFor = makeSlugger();
  const members = ROSTER.map(([pseudo, joined, veteran, description], i) => {
    const extra = EXTRA[pseudo] ?? {};
    return {
      slug: slugFor(pseudo),
      pseudo,
      orientation: extra.orientation ?? ("AUCUNE" as const),
      role: extra.role ?? ("MEMBRE" as const),
      status: veteran ? ("VETERAN" as const) : ("ACTIF" as const),
      inDirectory: extra.inDirectory ?? true,
      title: extra.title ?? null,
      groups: extra.groups ?? [],
      permissions: extra.permissions ?? [],
      joinedAt: parseDate(joined),
      description,
      order: i,
    };
  });
  await db.member.createMany({ data: members });

  console.log("Projets…");
  const projets = [
    ...PROJETS_LEGAUX.map((p, i) => ({ ...p, category: "LEGAL" as const, order: i })),
    ...PROJETS_ILLEGAUX.map((p, i) => ({ ...p, category: "ILLEGAL" as const, order: i })),
  ];
  await db.project.createMany({ data: projets });

  console.log("Serveurs hôtes…");
  const usedServerSlugs = new Set<string>();
  await db.partnerServer.createMany({
    data: SERVERS.map((s, i) => {
      const base = slugify(s.name);
      let slug = base;
      let k = 2;
      while (usedServerSlugs.has(slug)) slug = `${base}-${k++}`;
      usedServerSlugs.add(slug);
      return { name: s.name, slug, logoUrl: s.logo ?? null, order: i };
    }),
  });

  console.log("Réalisations…");
  await db.realisation.createMany({
    data: REALISATIONS.map((r, i) => ({
      title: r.title,
      category: r.category as never,
      author: r.author ?? null,
      imageUrl: r.imageUrl ?? null,
      externalUrl: r.externalUrl ?? null,
      order: i,
    })),
  });

  console.log("Galerie…");
  await db.galleryImage.createMany({
    data: GALLERY.map((g, i) => ({ imageUrl: g.file, caption: g.caption, order: i })),
  });

  console.log("Contenu…");
  await db.content.createMany({
    data: CONTENT.map((c) => ({ key: c.key, value: c.value as never })),
  });

  const counts = {
    membres: await db.member.count(),
    projets: await db.project.count(),
    serveurs: await db.partnerServer.count(),
    realisations: await db.realisation.count(),
    contenu: await db.content.count(),
  };
  console.log("Seed terminé :", counts);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
