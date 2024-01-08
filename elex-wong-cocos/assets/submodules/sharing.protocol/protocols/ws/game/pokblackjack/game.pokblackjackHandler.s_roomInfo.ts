import { SEAT_ID } from '../../../../../sharing.base/consts';
import { BLACKJACKRoomGameState } from '../../../../games/pokblackjack/BLACKJACKConst';
import { ProtoRankRoomInfo } from '../impl/game.rank';
import { BankerCardInfo, ProtoPlayerBLACKJACKInfo } from './impl/game.blackjack'


export interface game_pokblackjackHandler_s_roomInfo extends ProtoRankRoomInfo {
    /** 游戏状态 */
    gameState: BLACKJACKRoomGameState;
    /** 玩家信息 */
    players: ProtoPlayerBLACKJACKInfo[]
    /** 加注百分比 */
    addBetMulti: number[]
    /** 庄家牌信息 */
    bankerCardInfo?: BankerCardInfo
    /** 当前玩家 */
    currentPlayerSeatId: SEAT_ID
    /** 当前代理 */
    currentProxySeatId: SEAT_ID
    /** 当前牌型序号 */
    currentCardGroupIndex: number
}