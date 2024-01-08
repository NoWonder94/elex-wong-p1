/*
  Warnings:

  - You are about to drop the column `completetion_date` on the `ProjectEmailing` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `ProjectEmailing` table. All the data in the column will be lost.
  - You are about to drop the column `permanent_mode` on the `ProjectEmailing` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `ProjectEmailing` table. All the data in the column will be lost.
  - You are about to drop the column `triggerring_events` on the `ProjectEmailing` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ScheduledEmail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Account` ADD COLUMN `is_admin` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `EmailTemplate` ADD COLUMN `html` MEDIUMTEXT NULL;

-- AlterTable
ALTER TABLE `ProjectEmailing` DROP COLUMN `completetion_date`,
    DROP COLUMN `end_date`,
    DROP COLUMN `permanent_mode`,
    DROP COLUMN `start_date`,
    DROP COLUMN `triggerring_events`,
    ADD COLUMN `speed` INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE `ScheduledEmail` DROP COLUMN `status`;
