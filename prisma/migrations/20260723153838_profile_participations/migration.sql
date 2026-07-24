/*
  Warnings:

  - You are about to drop the `_memberprojects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_memberprojects` DROP FOREIGN KEY `_MemberProjects_A_fkey`;

-- DropForeignKey
ALTER TABLE `_memberprojects` DROP FOREIGN KEY `_MemberProjects_B_fkey`;

-- AlterTable
ALTER TABLE `member` ADD COLUMN `discordGlobalName` VARCHAR(191) NULL,
    ADD COLUMN `discordUsername` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `serverLogoUrl` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_memberprojects`;

-- CreateTable
CREATE TABLE `Participation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `projectId` INTEGER NOT NULL,
    `grade` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    INDEX `Participation_memberId_idx`(`memberId`),
    INDEX `Participation_projectId_idx`(`projectId`),
    UNIQUE INDEX `Participation_memberId_projectId_key`(`memberId`, `projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Participation` ADD CONSTRAINT `Participation_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participation` ADD CONSTRAINT `Participation_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
