// Ré-applique UNIQUEMENT les réalisations (sans toucher aux membres, projets,
// sessions ni rattachements Discord). Usage : npx tsx scripts/reseed-realisations.ts

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma";
import { REALISATIONS } from "../prisma/realisations-data";

const db = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL!),
});

async function main() {
  await db.realisation.deleteMany();
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

  const withImg = await db.realisation.count({ where: { imageUrl: { not: null } } });
  const total = await db.realisation.count();
  console.log(`Réalisations ré-appliquées : ${total} (dont ${withImg} avec image).`);
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
