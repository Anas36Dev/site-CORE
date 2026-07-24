// Met à jour le contenu « Qui sommes-nous ? » (clé about.body) en base.
// Usage : npx tsx scripts/reseed-about.ts

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma";

const db = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL!),
});

const VALUE = {
  title: "Qui sommes-nous ?",
  subtitle: "CORE — California Operational Roleplay Entity",
  paragraphs: [
    "Nous sommes une équipe de joueurs animés par la volonté d'offrir une expérience RolePlay la plus **réaliste** et **immersive** possible, centrée sur la représentation des forces de l'ordre de Californie, telles que le **LAPD**, le **LASD** ou encore la **CHP**.\nNotre objectif demeure constant : proposer au serveur et à l'ensemble de ses joueurs une **immersion fidèle** au fonctionnement, aux valeurs et aux exigences des services que nous incarnons.",
    "Nous sommes conscients que la reproduction parfaite de certaines structures ou procédures peut comporter des imprécisions ; c'est pourquoi nous faisons preuve d'une **démarche d'amélioration continue**.\nToute aide, tout retour constructif ou toute information fondée sur des éléments réels sont accueillis avec ouverture et considération, dans le but de renforcer la **crédibilité** et la **qualité** de notre projet.",
    "Initialement constitué d'un cercle restreint d'amis, notre collectif s'est progressivement développé pour rassembler aujourd'hui **plus de 75 membres** impliqués dans les projets. En raison de cet effectif conséquent, des exigences administratives propres à chaque serveur et des difficultés parfois rencontrées par les projets indépendants ou encore peu connus, il nous est apparu nécessaire, dans l'intérêt de notre **pérennité**, de **structurer** et d'**officialiser** notre organisation.",
    "À ce jour, nous avons contribué à la mise en place et à la gestion de plusieurs structures institutionnelles comme **S.A Gov**, **U.S. Secret Service**, **FIB**, **IRS**, **SASP Nord**, **SASP Sud**, **BCSO** et **LSPD**, au sein de différents serveurs parmi lesquels figurent **iFive**, **Anesya**, **ViceLand WL**, **UltraRoleplay** et bien d'autres.",
    "Cette expérience nous permet aujourd'hui d'aborder chaque nouveau projet avec **sérieux** et une **vision à long terme**, à condition que cette vision soit partagée.",
  ],
};

async function main() {
  await db.content.upsert({
    where: { key: "about.body" },
    update: { value: VALUE },
    create: { key: "about.body", value: VALUE },
  });
  console.log("✔ Contenu « about.body » mis à jour.");
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
