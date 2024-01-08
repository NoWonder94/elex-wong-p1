import { BLACKJACKPattern } from '../../../../games/pokblackjack/BLACKJACKConst';
import { PointArrayStruct } from './impl/game.blackjack';

/**
 * 发送庄家最后的牌组
 */
export interface game_pokblackjackHandler_s_sendDealLastCards_Res {
    /** 扑克 */
    cards: number[]
    /** 点数 */
    point: number
    /** 牌型 */
    pattern: BLACKJACKPattern
    /** 点数 */
    points: PointArrayStruct[]
    /** 牌型 */
    patterns: BLACKJACKPattern[]
}