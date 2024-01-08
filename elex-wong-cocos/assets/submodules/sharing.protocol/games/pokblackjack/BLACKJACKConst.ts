/**
 * 21点游戏状态
 */
export enum BLACKJACKRoomGameState {
    /** 等待 */
    WAITING = 'WAITING',
    /** 开始游戏 */
    START = 'START',
    /** 下注 */
    ADD_BET = 'ADD_BET',
    /** 发牌 */
    NEW_CARD = 'NEW_CARD',
    /** 玩家操作 */
    PLAYER_ACTION = 'PLAYER_ACTION',
    /** 庄家操作 */
    DEAL_ACTION = 'DEAL_ACTION',
    /** 结算 */
    FINISH = 'FINISH',
}

export enum BLACKJACKPattern {
    // 爆炸
    BURST_CARD = 1,
    // 普通牌
    GENERAL_CARD = 2,
    // 五小龙
    FIVE_LITTLE_DRAGONS = 3,
    // 黑夹克
    BLACKJACK = 4,
};

/** 手牌数量 */
export const BLACKJACKHandCardNum: number = 2;


/** 玩家操作类型 */
export enum PLAYER_ACTION_TYPE {
    NONE = 0,
    // 要牌
    ADD_CARD = 1,
    // 分牌
    SPLIT_CARD = 2,
    // 双倍下注
    DOUBLE_BET = 3,
    // 停牌
    STOP_CARD = 4,
};

