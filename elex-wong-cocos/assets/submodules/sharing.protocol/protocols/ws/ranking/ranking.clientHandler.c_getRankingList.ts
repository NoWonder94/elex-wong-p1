import { UID, BOOLEAN } from '../../../../sharing.base/consts';
import { ERROR, Item, } from '../../common';

// 排行榜类型ID
export enum RankingTypeId {
    /** 携带金币排行 */
    OwnGold = 1,
    /** 赢取金币排行 */
    WinGold = 2,
    /** 游戏局数排行 */
    GameCount = 3,
}

// 排行奖励类型
export enum RankingRewardType {
    /** 每日奖励 */
    Daily = 1,
    /** 每周奖励 */
    Weekly = 2,
    /** 每月奖励 */
    Monthly = 3
}

export interface RankingPlayer {
    /** 用户ID */
    id: UID;
    /** 分数 */
    score: string;
    /** 名次 */
    rank: number;
    /** 玩家扩展信息(对象Account字符串) */
    ext: string;
}

export interface RankingMyRewardInfo {
    /** 奖励类型 */
    reward_type: RankingRewardType;
    /** 奖励 */
    reward: Item[]
    /** 奖励排名 */
    reward_rank: number;
    /** 是否领取 */
    received: BOOLEAN;
}

/** 我的排行信息 */
export interface RankingMyInfo {
    /** 当前名次 */
    rank?: number;
    /** 当前分数 */
    score: number;
    /** 奖励 */
    rewards: RankingMyRewardInfo[];
}

export interface ProtoRankingInfo {
    /** 玩家信息 */
    players: RankingPlayer[];
    /** 名次信息（对象{uid:rank}字符串） */
    my: RankingMyInfo;
}

/**
 * 获取排行列表信息
 */
export interface ranking_clientHandler_c_getRankingList_Req {
    /** 排行类型 */
    type: RankingTypeId
    /** 开始位置 */
    skip: number;
    /** 最大限制 */
    limit: number;
}

/**
 * 返回排行列表信息
 */
export interface ranking_clientHandler_c_getRankingList_Res {
    error: ERROR;
    data?: ProtoRankingInfo;
}