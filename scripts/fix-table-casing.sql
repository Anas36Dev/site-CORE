-- =============================================================================
-- Corrige la casse des tables en prod (MariaDB Linux = sensible à la casse).
-- Un dump fait sous XAMPP Windows crée les tables en minuscules (galleryimage…)
-- alors que Prisma attend du PascalCase (GalleryImage…) → « table does not exist ».
--
-- Ce script renomme les tables SUR PLACE : les données et les clés étrangères
-- sont conservées (InnoDB met à jour les références automatiquement).
--
-- À exécuter UNE fois sur la base de prod (ex. base « site ») :
--   mariadb -h <hote-db> -u root -p <nom_base> < scripts/fix-table-casing.sql
-- (La table interne `_prisma_migrations` reste en minuscules : c'est normal.)
-- =============================================================================

RENAME TABLE
  `content`        TO `Content`,
  `galleryimage`   TO `GalleryImage`,
  `member`         TO `Member`,
  `participation`  TO `Participation`,
  `partnerserver`  TO `PartnerServer`,
  `project`        TO `Project`,
  `realisation`    TO `Realisation`,
  `session`        TO `Session`;
