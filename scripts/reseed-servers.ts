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
  const used = new Set<string>();
  for (const s of SERVERS) {
    let slug = s.slug ?? slugify(s.name);
    let k = 2;
    while (used.has(slug)) slug = `${s.slug ?? slugify(s.name)}-${k++}`;
    used.add(slug);
    const data = {
      name: s.name,
      logoUrl: s.logoUrl,
      founders: s.founders,
      playersRange: s.playersRange,
      discordUrl: s.discordUrl,
      fivemUrl: s.fivemUrl,
      isClosed: s.isClosed,
      order: s.order,
    };
    const existing = await db.partnerServer.findFirst({ where: { slug } });
    if (existing) await db.partnerServer.update({ where: { id: existing.id }, data });
    else await db.partnerServer.create({ data: { slug, ...data } });
  }
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
