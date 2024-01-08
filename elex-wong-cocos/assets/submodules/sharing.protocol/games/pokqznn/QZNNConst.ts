/** 牛牛游戏状态 */
export enum QZNNRoomGameState {
    /** 空闲 */
    NONE = 'NONE',
    /** 开始 */
    START = 'START',

    /** 抢庄 */
    ROB_BANKER = 'ROB_BANKER',
    /** 加注 */
    ADD_BET = 'ADD_BET',
    /** 发牌 */
    INIT_CARD = 'INIT_CARD',
    /** 选牛牌 */
    SELECT_CARD = 'SELECT_CARD',

    /** 结束 */
    FINISH = 'FINISH',
}

export enum QZNNPattern {
    /** 无牛 */
    NN0 = 0,
    /** 牛一 */
    NN1 = 1,
    /** 牛二 */
    NN2 = 2,
    /** 牛三 */
    NN3 = 3,
    /** 牛四 */
    NN4 = 4,
    /** 牛五 */
    NN5 = 5,
    /** 牛六 */
    NN6 = 6,
    /** 牛七 */
    NN7 = 7,
    /** 牛八 */
    NN8 = 8,
    /** 牛九 */
    NN9 = 9,
    /** 牛牛 */
    NN_NIU = 10,
    /** 4花牛 */
    NN_FOUR_FLOWER = 11,
    /** 5花牛 */
    NN_FIVE_FLOWER = 12,
    /** 炸弹牛 */
    NN_BOOM = 13,
    /** 五小牛 */
    NN_FIVE_SMALL = 14
};

/** 手牌数量 */
export const QZNNHandCardNum: number = 5;

/** 牛牛玩家游戏状态 */
export enum QZNNPlayerGameState {
    /** 空闲 */
    NONE = 0,
    /** 是否抢庄 */
    ROB_BANKER = 1,
    /** 是否加注 */
    ADD_BET = 2,
    /** 是否选牌 */
    SELECT_CARD = 4,
}
