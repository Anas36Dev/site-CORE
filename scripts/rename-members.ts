// Renomme des membres (champ pseudo) par correspondance de pseudo actuel.
// Le slug (URL) est laissé inchangé pour ne pas casser les liens existants.
// Usage : npx tsx scripts/rename-members.ts

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma";

const db = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL!),
});

// [ pseudo actuel, nouveau pseudo ]
const RENAMES: [string, string][] = [
  ["JeanFilou", "JeanFi"],
  ["Reaper", "Le Saint Reaper"],
  ["3THAN94", "3than94"],
  ["Idriss.Brk", "idriss.brk"],
];

async function main() {
  for (const [from, to] of RENAMES) {
    const member = await db.member.findFirst({ where: { pseudo: from } });
    if (!member) {
      console.warn(`⚠ Aucun membre nommé « ${from} » — ignoré.`);
      continue;
    }
    await db.member.update({ where: { id: member.id }, data: { pseudo: to } });
    console.log(`✔ « ${from} » → « ${to} »`);
  }
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
