// 请求协议 START

import { RankSettlementDetailItem } from './game.rank';

/** 结算详情字段定义 */
export interface MJSettlementDetailRankItem extends RankSettlementDetailItem {
    /** 吃牌 */
    chi_cards: number[];
    /** 碰牌 */
    peng_cards: number[];
    /** 杠牌 */
    gang_cards: number[];
    /** 胡牌 */
    hu_cards: number[]
}
