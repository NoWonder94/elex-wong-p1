import { SOLANA_SCHEMA } from '@solana/web3.js';
import * as borsh from 'borsh';

export class Assignable {
  constructor(properties) {
    Object.keys(properties).map((key) => {
      this[key] = properties[key];
    });
  }

  encode() {
    return Buffer.from(borsh.serialize(SOLANA_SCHEMA, this), 'hex');
  }

  static decode(data) {
    return borsh.deserializeUnchecked(SOLANA_SCHEMA, this, data);
  }
}

export class DiceConfig extends Assignable {}
SOLANA_SCHEMA.set(DiceConfig, {
  kind: 'struct',
  fields: [['dividend_rate', 'u32'], ['payout_base', 'u32'], ['min_payout', 'u32'], ['max_payout', 'u32'], ['min_bets', ['u64']], ['max_bets', ['u64']], ['total_times', 'u64']],
});

export class SlotConfig extends Assignable {}
SOLANA_SCHEMA.set(SlotConfig, {
  kind: 'struct',
  fields: [['dividend_rate', 'u32'], ['payout1', 'u32'], ['payout2', 'u32'], ['payout3', 'u32'], ['payout4', 'u32'], ['payout5', 'u32'], ['payout6', 'u32'], ['payout7', 'u32'], ['min_bets', ['u64']], ['max_bets', ['u64']], ['total_times', 'u64']],
});

export class DividendDay extends Assignable {}
SOLANA_SCHEMA.set(DividendDay, {
  kind: 'struct',
  fields: [['timestamp', 'u64'], ['lamports', 'u64'], ['frozen', 'u128'], ['unfrozen', 'u128'], ['frozens', 'u128']]
});

export class DividendToken extends Assignable {}
SOLANA_SCHEMA.set(DividendToken, {
  kind: 'struct',
  fields: [['price', 'u128'], ['current_bet', 'u128'], ['total_frozen', 'u128'], ['total_dev', 'u64'], ['today', DividendDay], ['before1_day', DividendDay], ['list', [DividendDay]]]
});

export class Dividend extends Assignable {}
SOLANA_SCHEMA.set(Dividend, {
  kind: 'struct',
  fields: [['dev_rate', 'u32'], ['current_timestamp', 'u64'], ['tokens', [DividendToken]]]
});

export class DividendV1 extends Assignable {}
SOLANA_SCHEMA.set(DividendV1, {
  kind: 'struct',
  fields: [['price', 'u128'], ['dev_rate', 'u32'], ['current_timestamp', 'u64'], ['current_bet', 'u128'], 
    ['total_frozen', 'u128'], ['total_dev', 'u64'], ['today', DividendDay], ['before1_day', DividendDay], ['list', [DividendDay]]
  ]
});

export class WalletDividend extends Assignable {}
SOLANA_SCHEMA.set(WalletDividend, {
  kind: 'struct',
  fields: [['timestamp', 'u64'], ['amount', 'u64'], ['frozen', 'u64'], ['claimer_timestamp', 'u64']]
});

export class WalletData extends Assignable {}
SOLANA_SCHEMA.set(WalletData, {
  kind: 'struct',
  fields: [['upline', {kind: 'option', type: [32]}], ['version', 'u32'], ['referral_count', 'u32'], ['referral_rewards', ['u64']], ['dividends', [WalletDividend]]]
});

export class WalletDataV1 extends Assignable {}
SOLANA_SCHEMA.set(WalletDataV1, {
  kind: 'struct',
  fields: [['upline', {kind: 'option', type: [32]}], ['dividend', WalletDividend], ['referral_reward', 'u64'], ['referral_count', 'u32']]
});

export class RiskyToken extends Assignable {}
SOLANA_SCHEMA.set(RiskyToken, {
  kind: 'struct',
  fields: [['total_deposit', 'u128'], ['total_withdraw', 'u128'], ['total_income', 'u128'], ['total_outlay', 'u128']],
});

export class Risky extends Assignable {}
SOLANA_SCHEMA.set(Risky, {
  kind: 'struct',
  fields: [['dev_rate', 'u32'], ['tokens', [RiskyToken]]],
});

export class RiskyV1 extends Assignable {}
SOLANA_SCHEMA.set(RiskyV1, {
  kind: 'struct',
  fields: [['dev_rate', 'u32'], ['total_deposit', 'u128'], ['total_withdraw', 'u128'], ['total_income', 'u128'], ['total_outlay', 'u128']],
});

export class ServiceAccountInitInstruction extends Assignable {}
SOLANA_SCHEMA.set(ServiceAccountInitInstruction, {
  kind: 'struct',
  fields: [['action', 'u8'], ['token_type', 'string'], ['is_upline', 'u8']],
});

export class ServiceTypeInstruction extends Assignable {}
SOLANA_SCHEMA.set(ServiceTypeInstruction, {
  kind: 'struct',
  fields: [['action', 'u8'], ['token_type', 'string']],
});

export class ServiceTokenInstruction extends Assignable {}
SOLANA_SCHEMA.set(ServiceTokenInstruction, {
  kind: 'struct',
  fields: [['action', 'u8'], ['instruction', 'u8'], ['token_type', 'string']],
});

export class DiceBetInstruction extends Assignable {}
SOLANA_SCHEMA.set(DiceBetInstruction, {
  kind: 'struct',
  fields: [['action', 'u8'], ['token_type', 'string'], ['amount', 'u64'], ['predict', 'u32'], ['condition', 'u8']],
});

export class SlotBetInstruction extends Assignable {}
SOLANA_SCHEMA.set(SlotBetInstruction, {
  kind: 'struct',
  fields: [['action', 'u8'], ['token_type', 'string'], ['amount', 'u64']],
});

export class RiskyActionInstruction extends Assignable {}
SOLANA_SCHEMA.set(RiskyActionInstruction, {
  kind: 'struct',
  fields: [['action', 'u8'], ['instruction', 'u8'], ['amount', 'u64'], ['token_type', 'string']],
});

export class PlatformLoginInstruction extends Assignable {}
SOLANA_SCHEMA.set(PlatformLoginInstruction, {
  kind: 'struct',
  fields: [['action', 'u8'], ['token', 'string']],
});

export class PlatformFundsInstruction extends Assignable {}
SOLANA_SCHEMA.set(PlatformFundsInstruction, {
  kind: 'struct',
  fields: [['action', 'u8'], ['token_type', 'string'], ['amount', 'u64']],
});

