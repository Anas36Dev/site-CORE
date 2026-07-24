# Déploiement Docker — CORE France Project (`core-site`)

Le site est livré comme une image Docker autonome (Next.js 16 + Prisma 7), orchestrée
avec une base **MariaDB 11** via Docker Compose.

> ⚠ **Indépendance totale du MDT.** Base de données `core_site` **distincte**, port
> exposé **3001** par défaut (le MDT utilise 3080) : les deux peuvent tourner côte à côte.

## Démarrage rapide (machine / VPS)

```bash
cp .env.docker.example .env      # puis renseigner les vraies valeurs
docker compose up -d --build     # build + démarrage (db + app)
docker compose logs -f app       # suivre le démarrage (migrations, seed, Next)
```

Le site est ensuite disponible sur `http://localhost:3001` (ou `APP_PORT`).

Au démarrage, le conteneur applique automatiquement :
1. `prisma migrate deploy` — création / mise à jour du schéma (avec ré-essais tant
   que la base n'accepte pas encore les connexions) ;
2. `prisma db seed` — seed **idempotent** (désactivable via `SEED_ON_START=false`
   une fois le site installé) ;
3. `next start` — le serveur web.

## Variables d'environnement

Tout est décrit dans [`.env.docker.example`](.env.docker.example). Les essentielles :

| Variable | Rôle |
|---|---|
| `DB_PASSWORD` / `DB_NAME` | MariaDB (le compose construit `DATABASE_URL` vers le service `db`). |
| `APP_PORT` | Port exposé sur l'hôte (défaut `3001`). |
| `APP_URL` | URL publique du site. |
| `SEED_ON_START` | `true` (défaut) rejoue le seed idempotent à chaque démarrage. |
| `DISCORD_CLIENT_ID/SECRET`, `DISCORD_REDIRECT_URI`, `DISCORD_BOT_TOKEN` | Auth Discord. |
| `CORE_BOOTSTRAP_DISCORD_IDS`, `CORE_BOOTSTRAP_MEMBER_SLUG` | 1ᵉʳ admin (toutes permissions). |
| `NEXT_PUBLIC_*` | Liens externes — **figés au build** (voir ci-dessous). |

### ⚠ Variables `NEXT_PUBLIC_*` (figées au build)

Next.js **inline** ces variables dans le bundle client au moment du `next build`.
Le compose les transmet en *build-args*. Si tu les modifies, il faut **reconstruire** :

```bash
docker compose up -d --build
```

## Opérations courantes

```bash
docker compose ps                       # état des conteneurs
docker compose logs -f app              # logs applicatifs
docker compose restart app              # redémarrer l'app seule
docker compose down                     # arrêt (volumes conservés)
docker compose down -v                  # arrêt + SUPPRESSION des données (⚠)
```

### Sauvegarde / restauration de la base

```bash
# Sauvegarde
docker compose exec db sh -c 'mariadb-dump -uroot -p"$MARIADB_ROOT_PASSWORD" core_site' > backup.sql
# Restauration
docker compose exec -T db sh -c 'mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" core_site' < backup.sql
```

## Déploiement Dokploy / hébergeur

- Base de données **séparée** : soit le service `db` de ce compose, soit une MariaDB
  managée. Dans ce cas, renseigner `DATABASE_URL` directement (hôte interne fourni
  par l'hébergeur — **pas** `localhost`, qui désigne le conteneur lui-même).
- Mettre à jour `DISCORD_REDIRECT_URI` et `APP_URL` vers le domaine public.
- Après première installation, passer `SEED_ON_START=false`.
