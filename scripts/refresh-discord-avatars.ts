// Rafraîchit photo + nom Discord de tous les membres ayant un Discord ID
// (via le token de bot). Usage : npx tsx scripts/refresh-discord-avatars.ts

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma";
import { fetchDiscordUserById, discordAvatarUrl } from "../src/lib/discord";

const db = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL!),
});

async function main() {
  if (!process.env.DISCORD_BOT_TOKEN) {
    console.error("DISCORD_BOT_TOKEN absent — impossible de récupérer les photos.");
    process.exit(1);
  }
  const members = await db.member.findMany({ where: { discordId: { not: null } } });
  let ok = 0;
  let fail = 0;
  for (const m of members) {
    const user = await fetchDiscordUserById(m.discordId!);
    if (user) {
      await db.member.update({
        where: { id: m.id },
        data: {
          discordAvatarUrl: discordAvatarUrl(user.id, user.avatar),
          discordUsername: user.username,
          discordGlobalName: user.global_name,
        },
      });
      ok++;
      console.log(`✔ ${m.pseudo} → ${user.global_name ?? user.username}`);
    } else {
      fail++;
      console.log(`✗ ${m.pseudo} (${m.discordId}) : échec`);
    }
  }
  console.log(`Terminé : ${ok} mis à jour, ${fail} échec(s).`);
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
