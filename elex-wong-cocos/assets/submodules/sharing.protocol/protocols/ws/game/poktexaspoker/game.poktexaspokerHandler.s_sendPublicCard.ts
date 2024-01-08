import {SEAT_ID} from '../../../../../sharing.base/consts';
import {ComposeInfo} from './impl/game.texaspoker';

export interface game_poktexaspokerHandler_s_sendPublicCard {
    /** 公共牌 */
    publicCards: number[];
    /** 组合牌信息 */
    composeCard: ComposeInfo
}