import { AdType, ERROR_BASE } from '../../sharing.base/protocols/CommonBase';
import { BOOLEAN } from '../../sharing.base/consts';

export interface ERROR extends ERROR_BASE {
}

/** 物品id */
export enum ItemsId {
    /** 金币 */
    gold = 1,
    /** 钻石 */
    diamond = 2,
    /** 特殊道具 */
    special = 10000,
}

export const SpecialItemsId: Set<ItemsId> = new Set<ItemsId>([
    ItemsId.gold,
    ItemsId.diamond
])

/** 物品 */
export interface Item {
    /** 物品id */
    id: ItemsId;
    /** 物品数量 */
    num: number;
}

export enum RedDotPos {
    /** 邮件 */
    Mail = 1,
    /** 好友 */
    Friend = 2,
    /** 7日签到 */
    SignXDay = 3,
    /** 每日转盘 */
    TurntableDaily = 4,
    /** 排行奖励 */
    RankingReward = 5,
    /** 成就任务 */
    AchievementTask = 6,
}

/** 物品消耗类型定义 */
export enum ItemCostType {
    /** 购买 */
    Buy = 10,
    /** 购买赠送 */
    BuyGive = 11,
    /** 消耗【游戏】 */
    CostGame = 20,
    /** 消耗【转盘】 */
    CostTurntable = 21,
    /** 奖励 */
    Reward = 30,
    /** 奖励【签到】 */
    RewardSign = 31,
    /** 奖励【转盘】 */
    RewardTurntable = 32,
    /** 奖励【排行】 */
    RewardRanking = 33,
    /** 奖励【任务】 */
    RewardTask = 34,
    /** 奖励【广告】 */
    RewardAd = 35,
    /** 邮件领取 */
    MailReceive = 41,
}

/** 广告单元类型 */
export enum AdUnitPosType {
    /** 大厅广告 */
    Lobby = 1,
    /** 转盘广告 */
    Turntable = 2,
}

export interface AdUnitConfig {
    /** 是否启用 */
    enable: BOOLEAN;
    /** 广告单元位置类型 */
    pos_type: AdUnitPosType;
    /** 广告类型 */
    ad_type: AdType;
    /** 广告ID */
    ad_id_android: string;
    /** 广告ID */
    ad_id_ios: string;
    /** 奖励物品 */
    items: Item[];
    /** 广告观看奖励次数限制 */
    ad_max_count: number;
}

/** 广告单元自定义数据 */
export interface AdUnitCustomInfo {
    /** 广告单元位置类型 */
    pos_type: AdUnitPosType;
}

// 头像ID定义
export const IMG_IDS_MALE = [
    '1',
    '2',
    '3',
    '4',
]

// 头像id定义
export const IMG_IDS_FEMALE = [
    '1',
    '2',
    '3',
    '4',
]