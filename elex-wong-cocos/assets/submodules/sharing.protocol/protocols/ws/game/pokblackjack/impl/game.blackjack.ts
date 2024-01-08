import { BOOLEAN, SEAT_ID } from '../../../../../../sharing.base/consts';
import { BLACKJACKPattern } from '../../../../../games/pokblackjack/BLACKJACKConst';
import { ProtoPlayerRankInfo } from '../../impl/game.rank';
import { BillItem } from '../../impl/game.struct';


/** 代理牌信息 */
export interface CardInfo {
    // 代理座位号id
    proxySeatId: SEAT_ID,
    // 玩家座位号id
    playerSeatId: SEAT_ID,
    // 牌
    cards: number[],
    // 牌型
    pattern: BLACKJACKPattern,
    // 点数
    point: number[]
}

export interface PointArrayStruct {
    pointArray: number[]
}


export interface POKBLACKJACKBillItem extends BillItem {
    proxySeatId: number
}


/**
 * 玩家信息
 */
export interface ProtoPlayerBLACKJACKInfo extends ProtoPlayerRankInfo {
    /** 最大投注 */
    max_bet: number;
    // 代理信息
    ProxyInfos: ProxyInfo[]
}

/**
 * 代理信息
 */
export interface ProxyInfo {
    // 代理座位号
    proxySeatId: SEAT_ID
    // 玩家座位号
    playerSeatId: SEAT_ID
    // 总下注
    totalBet: number,
    // 代理牌组信息
    cardGroupInfo: ProxyCardInfo[]
    // 完成下注
    finishBet: BOOLEAN
    // 操作
    actions: BOOLEAN[]
}

/**
 * 牌组牌信息
 */
export interface ProxyCardInfo {
    // 总下注
    totalBet: number
    // 牌
    cards: number[]
    // 牌型
    pattern: BLACKJACKPattern
    // 点数
    point: number[]
    // 双倍的牌
    doubleCard?: number
}


export interface BankerCardInfo {
    cards: number[]
    pattern: number
    dealPoint: number[]
}


export interface ProxySettlementInfo {
    proxySeatId: SEAT_ID,
    cardGroupInfo: ProxyCardInfo[],
    finishBet: boolean,
    win: boolean,
}