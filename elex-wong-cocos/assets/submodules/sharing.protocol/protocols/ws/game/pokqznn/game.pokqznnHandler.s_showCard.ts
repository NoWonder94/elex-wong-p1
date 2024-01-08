import {SEAT_ID} from '../../../../../sharing.base/consts';

export interface ProtoShowCardInfo {
    /** 座位号 */
    seatId: SEAT_ID;
    /** 手牌 */
    handCards: number[];
    /** 选牌 */
    selectCards: number[];
    /** 牌型 */
    pattern: number;
}

/**
 * 亮牌
 */
export interface game_pokqznnHandler_s_showCard {
    cardInfos: ProtoShowCardInfo[];
}