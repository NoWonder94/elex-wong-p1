-- CreateTable
CREATE TABLE `EmailTemplate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `template_json` MEDIUMTEXT NOT NULL,
    `projectPid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmailTemplate` ADD CONSTRAINT `EmailTemplate_projectPid_fkey` FOREIGN KEY (`projectPid`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
