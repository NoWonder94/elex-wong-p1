import { ProtoPlayerRankInfo, RankSettlementDetailItem } from '../../impl/game.rank';
import { BOOLEAN, SEAT_ID, UID } from '../../../../../../sharing.base/consts';
import { TEXASPOKERPattern, TEXASPOKERRole } from '../../../../../games/poktexaspoker/TEXASPOKERConst';
import { BillItem } from '../../impl/game.struct';
import { ProtoSettlementPlayerBaseInfo } from '../../impl/game.base';


/** 玩家信息 */
export interface ProtoPlayerTEXASPOKERInfo extends ProtoPlayerRankInfo {
    /** 牌桌上金币 */
    tableGold: number,
    /** 玩家总投注 */
    playerTotalBet: number,
    /** 手牌 */
    handCards: number[]
    /** 操作 */
    operate: number
    /** 角色 */
    role: TEXASPOKERRole,
    /** 牌组合 */
    composeCards: number[],
    /** 牌型 */
    roundPattern: TEXASPOKERPattern,
}


export interface POKTEXASPOKERBillItem extends BillItem {
}


export interface POKTEXASPOKERSettlementDetailItem extends RankSettlementDetailItem {
    /** 流水 */
    bills: POKTEXASPOKERBillItem[];
}


/**
 * 初始牌信息
 */
export interface InitCardsInfo {
    /** 玩家坐位 */
    playerSeatId: SEAT_ID,
    /** 开始发牌座位号 */
    startSendCardSeatId: SEAT_ID,
    /** 牌长度 */
    cardLength: number,
    /** 牌组 */
    cards: number[]
}


/**
 * 牌组合
 */
export interface ComposeInfo {
    /** 牌型 */
    roundPattern: TEXASPOKERPattern,
    /** 牌 */
    composeCard: number[],
    /** 玩家座位号 */
    playerSeatId: SEAT_ID,
}

/** 结算玩家信息 */
export interface ProtoPushTEXASPOKERSettlementPlayer extends ProtoSettlementPlayerBaseInfo {
    /** 牌组合 */
    composeCards: number[],
    /** 牌型 */
    roundPattern: TEXASPOKERPattern,
    /** 初始牌 */
    initCard: number[]
    /** 牌桌上金币 */
    tableGold: number,
}

/** 最后结算玩家信息 */
export interface ProtoPushTEXASPOKERFinalSettlementPlayer {
    /** 胜利次数 */
    winNum: number,
    /** 牌桌上金币 */
    tableGold: number,
    /** 用户Id */
    uid: UID;
    /** 是否离开 (0:否   1:是) */
    isLeave: number
}
