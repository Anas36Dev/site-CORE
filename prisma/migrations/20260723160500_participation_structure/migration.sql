-- Ajoute la structure interne à la participation (chaque structure d'un projet a ses propres membres/grades).
ALTER TABLE `Participation` ADD COLUMN `structure` VARCHAR(191) NOT NULL DEFAULT '';

-- Remplace la contrainte unique (member, project) par (member, project, structure).
DROP INDEX `Participation_memberId_projectId_key` ON `Participation`;
CREATE UNIQUE INDEX `Participation_memberId_projectId_structure_key` ON `Participation`(`memberId`, `projectId`, `structure`);
