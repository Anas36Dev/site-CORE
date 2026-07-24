// Ré-applique UNIQUEMENT les serveurs hôtes (sans toucher au reste).
// Usage : npx tsx scripts/reseed-servers.ts

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma";
import { SERVERS } from "../prisma/servers-data";
import { slugify } from "../src/lib/slug";

const db = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL!),
});

async function main() {
  await db.partnerServer.deleteMany();
  const used = new Set<string>();
  await db.partnerServer.createMany({
    data: SERVERS.map((s, i) => {
      let slug = slugify(s.name);
      let k = 2;
      while (used.has(slug)) slug = `${slugify(s.name)}-${k++}`;
      used.add(slug);
      return { name: s.name, slug, logoUrl: s.logo ?? null, order: i };
    }),
  });
  const withLogo = await db.partnerServer.count({ where: { logoUrl: { not: null } } });
  const total = await db.partnerServer.count();
  console.log(`Serveurs ré-appliqués : ${total} (dont ${withLogo} avec logo).`);
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
