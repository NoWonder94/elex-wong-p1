import { BOOLEAN } from '../../../../../sharing.base/consts';

/**
 * 玩家准备
 */
export interface game_chessRankHandler_c_playerReady_Req {
    /** 是否是托管操作 */
    isTrustee?: BOOLEAN;
}