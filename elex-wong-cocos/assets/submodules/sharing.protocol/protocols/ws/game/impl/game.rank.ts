// 请求协议 START
import { ProtoPlayerBaseInfo, ProtoPushCountdown, ProtoRoomInfo } from './game.base';
import { SettlementDetailItem, SettlementExtItem } from './game.struct';
import { SEAT_ID } from '../../../../../sharing.base/consts';

/** 结算详情字段定义 */
export interface RankSettlementDetailItem extends SettlementDetailItem {
    /** 手牌 */
    hand_cards: number[];
    /** 牌型 */
    pattern: number;
    /** 牌型分数 */
    pattern_score: number;
}

export interface RankSettlementExtItem extends SettlementExtItem {
    /** 庄家座位号 */
    banker_seat_id: number;
}

// 请求协议 START



// 请求协议 END


// 推送协议定义 START

/** 玩家进入游戏 */
export interface ProtoPlayerRankInfo extends ProtoPlayerBaseInfo {

}

export interface ProtoRankRoomInfo extends ProtoRoomInfo {
    /** 倒计时信息 */
    countdown?: ProtoPushCountdown;
    /** 庄家座位号 */
    bankerSeatId: SEAT_ID;
    /** 底分 */
    betBase: number;
    /** 观战玩家 */
    onlookers?: SEAT_ID[];
}

// 推送协议定义 END