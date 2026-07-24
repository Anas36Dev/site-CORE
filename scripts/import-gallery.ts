// Importe la galerie d'accueil depuis public/images/galerie/ :
// - extrait la légende du nom de fichier (« Légende - Serveur, Année »)
// - classe par année décroissante
// - renomme proprement en galerie-NN.ext
// - génère prisma/gallery-data.ts
// - remplit la table GalleryImage
// Usage : npx tsx scripts/import-gallery.ts

import "dotenv/config";
import { readdirSync, renameSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma";

const db = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL!) });
const DIR = join("public", "images", "galerie");

type Item = { orig: string; caption: string; year: number };

function main() {
  const files = readdirSync(DIR).filter(
    (f) => ![".gitkeep", "README.md"].includes(f) && !/^galerie-\d+\./.test(f),
  );

  const items: Item[] = files.map((f) => {
    const base = f.slice(0, f.length - extname(f).length);
    const yearMatch = base.match(/(20\d\d)/g);
    const year = yearMatch ? Number(yearMatch[yearMatch.length - 1]) : 0;
    // « Légende - Serveur, Année » → « Légende — Serveur, Année »
    // + retire le suffixe de doublon après l'année (ex. « 2026-2 » → « 2026 »).
    const caption = base.replace(/\s-\s/, " — ").replace(/(20\d\d)-\d+/g, "$1");
    return { orig: f, caption, year };
  });

  // Récent → ancien, puis alphabétique pour stabilité.
  items.sort((a, b) => b.year - a.year || a.caption.localeCompare(b.caption, "fr"));

  const rows = items.map((it, i) => {
    const ext = extname(it.orig).toLowerCase();
    const newName = `galerie-${String(i + 1).padStart(2, "0")}${ext}`;
    renameSync(join(DIR, it.orig), join(DIR, newName));
    return { file: `/images/galerie/${newName}`, caption: it.caption };
  });

  // Génère le fichier de données partagé.
  const dataFile =
    "// Galerie d'accueil (généré par scripts/import-gallery.ts).\n" +
    "// Légendes issues des noms de fichiers d'origine, classées du plus récent au plus ancien.\n\n" +
    "export type GalleryRow = { file: string; caption: string };\n\n" +
    "export const GALLERY: GalleryRow[] = [\n" +
    rows.map((r) => `  ${JSON.stringify(r)},`).join("\n") +
    "\n];\n";
  writeFileSync(join("prisma", "gallery-data.ts"), dataFile, "utf8");

  return rows;
}

async function run() {
  const rows = main();
  await db.galleryImage.deleteMany();
  await db.galleryImage.createMany({
    data: rows.map((r, i) => ({ imageUrl: r.file, caption: r.caption, order: i })),
  });
  console.log(`Galerie importée : ${rows.length} images.`);
}

run()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
