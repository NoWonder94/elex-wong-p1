import { ValidMulti } from '../../../../../../sharing.base/consts';
import { ProtoPlayerRankInfo, RankSettlementDetailItem } from '../../impl/game.rank';
import { BillItem, SettlementCtrlItem } from '../../impl/game.struct';
import { QZNNPattern } from '../../../../../games/pokqznn/QZNNConst';

export interface ProtoPlayerQZNNInfo extends ProtoPlayerRankInfo {
    cards: number[],
    pattern?: QZNNPattern,
}

export interface POKQZNNBillItem extends BillItem {
}

export interface POKQZNNSettlementDetailItem extends RankSettlementDetailItem {
    /** 选择牛牌 */
    select_cards: number[];
    /** 可抢庄倍数 */
    can_rob_banker_multis: ValidMulti[];
    /** 可押注倍数 */
    can_add_bet_multis: ValidMulti[]
    /** 实际押注倍数 */
    bet_multi: number;
    /** 抢庄倍数 */
    rob_banker_multi: number;
    /** 流水 */
    bills: POKQZNNBillItem[];
}

export interface POKQZNNSettlementDetailField {
    /** 座位号 */
    players: POKQZNNSettlementDetailItem[];
}

export interface POKQZNNSettlementCtrlItem extends SettlementCtrlItem {
    /** 发牌位置 */
    send_card_index: number
}