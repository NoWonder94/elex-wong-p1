-- AlterTable
ALTER TABLE `JoinedCampaign` ADD COLUMN `all_actions_completed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `all_actions_completed_at` DATETIME(3) NULL;
