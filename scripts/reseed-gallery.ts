// Ré-applique UNIQUEMENT la galerie d'accueil depuis prisma/gallery-data.ts
// (utile après avoir édité les légendes). Usage : npx tsx scripts/reseed-gallery.ts

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma";
import { GALLERY } from "../prisma/gallery-data";

const db = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL!),
});

async function main() {
  await db.galleryImage.deleteMany();
  await db.galleryImage.createMany({
    data: GALLERY.map((g, i) => ({ imageUrl: g.file, caption: g.caption, order: i })),
  });
  console.log(`Galerie ré-appliquée : ${await db.galleryImage.count()} images.`);
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
