-- CreateTable
CREATE TABLE `CampaignAction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` VARCHAR(191) NOT NULL,
    `configuration` JSON NOT NULL,
    `campaignCid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RealizedCampaignAction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_checked_at` DATETIME(3) NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `accountUid` INTEGER NOT NULL,
    `campaignActionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CampaignAction` ADD CONSTRAINT `CampaignAction_campaignCid_fkey` FOREIGN KEY (`campaignCid`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RealizedCampaignAction` ADD CONSTRAINT `RealizedCampaignAction_accountUid_fkey` FOREIGN KEY (`accountUid`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RealizedCampaignAction` ADD CONSTRAINT `RealizedCampaignAction_campaignActionId_fkey` FOREIGN KEY (`campaignActionId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
