import { ProtoRankRoomInfo } from '../impl/game.rank';
import { game_pokzjhHandler_s_operation } from './game.pokzjhHandler.s_operation';
import { ProtoPlayerZJHInfo } from './impl/game.zjh';


export interface game_pokzjhHandler_s_roomInfo extends ProtoRankRoomInfo {
    addBetMulti: number[],
    roundMaxTurn: number,
    curGameTurn: number,
    curSeatId: number,
    roomTotalBet: number,
    playerOperation?: game_pokzjhHandler_s_operation,
    players: ProtoPlayerZJHInfo[],
}