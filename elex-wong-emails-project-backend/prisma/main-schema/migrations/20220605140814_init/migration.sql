-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `address` VARCHAR(191) NOT NULL,
    `forwarding_email` VARCHAR(191) NULL,
    `forwarding_email_verified` BOOLEAN NOT NULL DEFAULT false,
    `creation_ip_Address` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `twitter_id` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `accountUid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ERC20Token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `contract_address` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `decimals` INTEGER NOT NULL,
    `chain_id` INTEGER NOT NULL,
    `projectPid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Campaign` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `referral_code` VARCHAR(191) NOT NULL,
    `token_amount` INTEGER NOT NULL,
    `initial_amount` DOUBLE NOT NULL DEFAULT 0,
    `l1_token_amount` DOUBLE NOT NULL DEFAULT 0,
    `l2_token_amount` DOUBLE NOT NULL DEFAULT 0,
    `l3_token_amount` DOUBLE NOT NULL DEFAULT 0,
    `projectPid` INTEGER NOT NULL,
    `eRC20TokenTid` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReferralCode` (
    `code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `purpose` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ReferralCode_code_key`(`code`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JoinedCampaign` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `referral_code` VARCHAR(191) NOT NULL,
    `l1_referral_code` VARCHAR(191) NULL,
    `l2_referral_code` VARCHAR(191) NULL,
    `l3_referral_code` VARCHAR(191) NULL,
    `l1_user_count` INTEGER NOT NULL DEFAULT 0,
    `l2_user_count` INTEGER NOT NULL DEFAULT 0,
    `l3_user_count` INTEGER NOT NULL DEFAULT 0,
    `accountUid` INTEGER NOT NULL,
    `campaignCid` INTEGER NOT NULL,

    UNIQUE INDEX `JoinedCampaign_referral_code_key`(`referral_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountTokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `balance` DOUBLE NOT NULL,
    `accountUid` INTEGER NOT NULL,
    `eRC20TokenTid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Claim` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountWalletEvent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `token_amount` VARCHAR(191) NOT NULL,
    `accountUid` INTEGER NOT NULL,
    `eRC20TokenTid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectWalletEvent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `token_amount` VARCHAR(191) NOT NULL,
    `projectPid` INTEGER NOT NULL,
    `eRC20TokenTid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OutgoingEmail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `campaignCid` INTEGER NOT NULL,
    `accountUid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_accountUid_fkey` FOREIGN KEY (`accountUid`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ERC20Token` ADD CONSTRAINT `ERC20Token_projectPid_fkey` FOREIGN KEY (`projectPid`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Campaign` ADD CONSTRAINT `Campaign_projectPid_fkey` FOREIGN KEY (`projectPid`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Campaign` ADD CONSTRAINT `Campaign_eRC20TokenTid_fkey` FOREIGN KEY (`eRC20TokenTid`) REFERENCES `ERC20Token`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JoinedCampaign` ADD CONSTRAINT `JoinedCampaign_accountUid_fkey` FOREIGN KEY (`accountUid`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JoinedCampaign` ADD CONSTRAINT `JoinedCampaign_campaignCid_fkey` FOREIGN KEY (`campaignCid`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccountTokens` ADD CONSTRAINT `AccountTokens_accountUid_fkey` FOREIGN KEY (`accountUid`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccountTokens` ADD CONSTRAINT `AccountTokens_eRC20TokenTid_fkey` FOREIGN KEY (`eRC20TokenTid`) REFERENCES `ERC20Token`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccountWalletEvent` ADD CONSTRAINT `AccountWalletEvent_accountUid_fkey` FOREIGN KEY (`accountUid`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccountWalletEvent` ADD CONSTRAINT `AccountWalletEvent_eRC20TokenTid_fkey` FOREIGN KEY (`eRC20TokenTid`) REFERENCES `ERC20Token`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectWalletEvent` ADD CONSTRAINT `ProjectWalletEvent_projectPid_fkey` FOREIGN KEY (`projectPid`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectWalletEvent` ADD CONSTRAINT `ProjectWalletEvent_eRC20TokenTid_fkey` FOREIGN KEY (`eRC20TokenTid`) REFERENCES `ERC20Token`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OutgoingEmail` ADD CONSTRAINT `OutgoingEmail_accountUid_fkey` FOREIGN KEY (`accountUid`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OutgoingEmail` ADD CONSTRAINT `OutgoingEmail_campaignCid_fkey` FOREIGN KEY (`campaignCid`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
