-- AlterTable
ALTER TABLE `Campaign` ADD COLUMN `distribution` VARCHAR(191) NOT NULL DEFAULT 'all_users',
    ADD COLUMN `erc20_airdrop_contract_address` VARCHAR(191) NULL,
    ADD COLUMN `erc20_airdrop_contract_discovered_at` DATETIME(3) NULL,
    ADD COLUMN `erc20_airdrop_contract_tx_hash` VARCHAR(191) NULL,
    ADD COLUMN `erc20_airdrop_deposit_discovered_at` DATETIME(3) NULL,
    ADD COLUMN `erc20_airdrop_ready` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `erc20_expected_tokens_count` VARCHAR(191) NULL,
    ADD COLUMN `medium` VARCHAR(191) NOT NULL DEFAULT 'link_sharing',
    ADD COLUMN `reward_type` VARCHAR(191) NOT NULL DEFAULT 'erc20_tokens',
    MODIFY `initial_amount` DOUBLE NULL,
    MODIFY `l1_token_amount` DOUBLE NULL,
    MODIFY `l2_token_amount` DOUBLE NULL,
    MODIFY `l3_token_amount` DOUBLE NULL;
