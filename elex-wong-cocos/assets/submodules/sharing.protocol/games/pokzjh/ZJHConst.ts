/**
 * 扎金花游戏状态
 */
export enum ZJHRoomGameState {
    /** 空闲 */
    NONE = 'NONE',
    /** 开始 */
    START = 'START',

    /** 游戏中 */
    GAMING = 'GAMING',

    /** 结束 */
    FINISH = 'FINISH',
}

export enum ZJHPattern {
    NONE,
    // 散牌 单张
    SCATTERED = 0,
    // 对子
    PAIR = 1,
    // 顺子
    STRAIGHT = 2,
    // 金花
    GOLD_FLOWER = 3,
    // 顺金、同花顺
    STRAIGHT_GOLD = 4,
    // 豹子
    LEOPARD = 5,
};

/** 手牌数量 */
export const ZJHHandCardNum: number = 3;

/** 扎金花玩家游戏状态 */
export enum ZJHPlayerGameState {
    // 正常
    NORMAL = 1,
    // 弃牌
    ABANDON = 2,
    // 比牌失败
    FAIL = 4,
    // 跟
    GEN = 8,
    // 加
    ADD = 16,
    // 比牌
    COMPARE = 32,
}

/** 扎金花加注type */
export enum ZJHAddBetType {
    // 跟注
    GEN = 1,
    // 加注
    ADD = 2,
    // 比牌
    COMPARE = 3,
    // 低分
    BETBASE = 4
}

/** 孤注一掷结果 */
export enum GuZhuYiZhiResult {
    // 跟注
    FAIL = 0,
    // 成功
    SUCCESS = 1,
}
