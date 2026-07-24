@AGENTS.md

# CORE France Project — `core-site`

Site vitrine dynamique du collectif RolePlay **CORE** (California Operational Roleplay Entity), FiveM / GTA V.

## ⚠️ Règle absolue : indépendance totale du MDT
- Ce projet est **strictement séparé** de `../lspd-mdt`. Aucune dépendance de code, aucune BDD partagée.
- On peut **s'inspirer** du MDT (copier un composant) mais **jamais** l'importer ni le modifier.
- Base de données **`core_site`** distincte de celle du MDT. Déploiement séparé.

## Stack
Next.js 16.2 · React 19 · TypeScript · Prisma 7.8 (adapter MariaDB) · Tailwind v4 · Discord OAuth2 · session en base · `jose` · `zod` · `lucide-react`.

## Charte visuelle
« Agence fédérale » — bleu nuit / acier / **accent doré** (anneau du logo) / rouge. Tokens dans `src/app/globals.css`.

## Auth
Connexion **Discord uniquement**. Un Discord ID doit être rattaché à une fiche membre (par un Fondateur) sinon connexion **refusée**. Permissions granulaires par membre.

## Plan de développement
Voir `../tasks/core-site-todo.md`.
