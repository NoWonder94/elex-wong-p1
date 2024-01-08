-- AlterTable
ALTER TABLE `Project` ADD COLUMN `logoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_logoId_fkey` FOREIGN KEY (`logoId`) REFERENCES `File`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
