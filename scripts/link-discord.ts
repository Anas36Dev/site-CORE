// Rattache manuellement un Discord ID à une fiche membre (secours / bootstrap).
// Usage : npx tsx scripts/link-discord.ts <slug> <discordId>
// Exemple : npx tsx scripts/link-discord.ts anas36 123456789012345678

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma";
import { PERMISSIONS } from "../src/lib/permissions";

const db = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL!),
});

async function main() {
  const [slug, discordId] = process.argv.slice(2);
  if (!slug || !discordId) {
    console.error("Usage : npx tsx scripts/link-discord.ts <slug> <discordId>");
    process.exit(1);
  }

  const member = await db.member.findUnique({ where: { slug } });
  if (!member) {
    console.error(`Aucun membre avec le slug « ${slug} ».`);
    process.exit(1);
  }

  // Si on rattache anas36 (ou un membre sans permission), on lui donne toutes
  // les permissions pour permettre le tout premier accès admin.
  const grantAll = slug === "anas36";
  const updated = await db.member.update({
    where: { slug },
    data: {
      discordId,
      ...(grantAll ? { permissions: [...PERMISSIONS] } : {}),
    },
  });

  console.log(
    `✔ ${updated.pseudo} rattaché au Discord ID ${discordId}` +
      (grantAll ? " (toutes permissions accordées)" : ""),
  );
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
