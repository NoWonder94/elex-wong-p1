import { ProtoPlayerRankInfo, RankSettlementDetailItem } from '../../impl/game.rank';
import { ZJHPattern } from '../../../../../games/pokzjh/ZJHConst';
import { BOOLEAN } from '../../../../../../sharing.base/consts';
import { ProtoPlayerBaseInfo } from '../../impl/game.base';
import { BillItem } from '../../impl/game.struct';

export interface BetInfoStruct {
    playerGameTurn?: number,
    bet?: number,
    /**
     * 序号
     * @TJS-type int32
     */
    addIndex?: number,
}

export interface ProtoPlayerZJHInfo extends ProtoPlayerRankInfo {
    cards: number[],
    pattern: ZJHPattern,
    isLookCards: BOOLEAN,
    gameState: number,
    lastOperate: number,
    playerTotalBet: number,
    playerGameTurn: number,
    playerTurnBet: BetInfoStruct[],
    timeoutProject: number,
}

export interface POKZJHBillItem extends BillItem {
}

export interface POKZJHSettlementDetailItem extends RankSettlementDetailItem {
    /** 流水 */
    bills: POKZJHBillItem[];
}

export interface POKZJHSettlementDetailField {
    /** 座位号 */
    players: POKZJHSettlementDetailItem[];
}