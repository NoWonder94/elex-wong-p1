import { ERROR, } from '../../common';
import { RankingRewardType, RankingTypeId } from './ranking.clientHandler.c_getRankingList';

/**
 * 获取排行列表信息
 */
export interface ranking_clientHandler_c_receiveRankingReward_Req {
    /** 排行类型 */
    type: RankingTypeId;
    /** 排行奖励类型 */
    reward_type: RankingRewardType;
}

/**
 * 返回排行列表信息
 */
export interface ranking_clientHandler_c_receiveRankingReward_Res {
    error: ERROR;
    /**
     * 选项定制
     * @TJS-type message
     */
    data?: any;
}