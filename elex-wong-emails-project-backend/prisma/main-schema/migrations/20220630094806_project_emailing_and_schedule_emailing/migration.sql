-- CreateTable
CREATE TABLE `ProjectEmailing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completetion_date` INTEGER NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `permanent_mode` INTEGER NULL,
    `triggerring_events` VARCHAR(191) NULL,
    `total_sent` INTEGER NOT NULL DEFAULT 0,
    `total_mail` INTEGER NOT NULL DEFAULT 0,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `projectPid` INTEGER NOT NULL,
    `emailTemplateEid` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScheduledEmail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sentdate` DATETIME(3) NULL,
    `status` INTEGER NOT NULL,
    `email` VARCHAR(191) NULL,
    `projectEmailPId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProjectEmailing` ADD CONSTRAINT `ProjectEmailing_projectPid_fkey` FOREIGN KEY (`projectPid`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectEmailing` ADD CONSTRAINT `ProjectEmailing_emailTemplateEid_fkey` FOREIGN KEY (`emailTemplateEid`) REFERENCES `EmailTemplate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduledEmail` ADD CONSTRAINT `ScheduledEmail_projectEmailPId_fkey` FOREIGN KEY (`projectEmailPId`) REFERENCES `ProjectEmailing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
