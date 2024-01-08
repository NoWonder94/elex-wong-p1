-- AlterTable
ALTER TABLE `Campaign` ADD COLUMN `bannerId` INTEGER NULL,
    ADD COLUMN `presentation` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `File` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `filename` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `original_name` VARCHAR(191) NOT NULL,
    `storage_folder` VARCHAR(191) NOT NULL,
    `mime_type` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `projectPid` INTEGER NOT NULL,

    UNIQUE INDEX `File_filename_key`(`filename`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Campaign` ADD CONSTRAINT `Campaign_bannerId_fkey` FOREIGN KEY (`bannerId`) REFERENCES `File`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_projectPid_fkey` FOREIGN KEY (`projectPid`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
