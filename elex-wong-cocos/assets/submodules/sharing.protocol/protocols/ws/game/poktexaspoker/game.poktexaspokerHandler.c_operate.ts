/**
 * 玩家操作
 */
export interface game_poktexaspokerHandler_c_operate_Req {
    /** 操作类型 (1、弃牌  2、跟注  3、加注  4、过牌) */
    type: number;
    /** 加注金额 */
    gold: number
}