import {SEAT_ID} from '../../../../../sharing.base/consts';
import {TEXASPOKERRole} from '../../../../games/poktexaspoker/TEXASPOKERConst';

/**
 * 推送玩家下注信息
 */
export interface game_poktexaspokerHandler_s_pushPlayerBaseBet {
    /** 玩家座位号 */
    playerSeatId: SEAT_ID;
    /** 当前下注额 */
    bet: number;
    /** 角色 */
    role: TEXASPOKERRole;
    /** 房间总下注 */
    totalBet: number;
    /** 当前轮玩家下注 */
    curTurnGold: number;
}