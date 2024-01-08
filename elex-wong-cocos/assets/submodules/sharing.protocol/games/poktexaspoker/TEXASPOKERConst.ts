import { NONE } from '../../../sharing.base/consts';
/** 手牌数量 */
export const TEXASPOKERHandCardNum: number = 2;

/** 德州扑克游戏状态 */
export enum TEXASPOKERRoomGameState {
    NONE = 'NONE',   // 空闲
    INIT_CARD = 'INIT_CARD',   // 发底牌
    BASE_BET = 'BASE_BET', // 大小盲下底注
    OPERATE = 'OPERATE',   // 加注/弃牌
    COMMON_CARD = 'COMMON_CARD', // 发公共牌
    COMPARE_CARD = 'COMPARE_CARD', // 比牌
    FINISH = 'FINISH', // 结束
    STEP_WAIT = 'STEP_WAIT', // 步骤等待
}

// 角色
export enum TEXASPOKERRole {
    NONE,  // 普通
    SB,    // 小盲位
    BB,    // 大盲位
};

/** 皇家同花顺>同花顺>四条>葫芦>同花>顺子>三条>两队>一对>高牌(2<3<4<5<…<J<Q<K<A) */
export enum TEXASPOKERPattern {
    NONE = 0,
    /** 高牌 */
    TEXAS_CARD_TYPE_GAOPAI = 1,
    /** 对子 */
    TEXAS_CARD_TYPE_DUIZI = 2,
    /** 两对 */
    TEXAS_CARD_TYPE_LIANGDUI = 3,
    /** 三条 */
    TEXAS_CARD_TYPE_SANTIAO = 4,
    /** 顺子 */
    TEXAS_CARD_TYPE_SHUNZI = 5,
    /** 同花 */
    TEXAS_CARD_TYPE_TONGHUA = 6,
    /** 葫芦 */
    TEXAS_CARD_TYPE_HULU = 7,
    /** 四条 */
    TEXAS_CARD_TYPE_SITIAO = 8,
    /** 同花顺 */
    TEXAS_CARD_TYPE_TONGHUASHUN = 9,
    /** 皇家同花顺 */
    TEXAS_CARD_TYPE_KINGTONGHUASHUN = 10,
}

/** 操作 */
export enum TEXASPOKERPlayerOperate {
    /** 无 */
    NONE = 0,
    /** 弃牌 */
    ABANDON_CARD = 1,
    /** 过牌 */
    PASS_CARD = 2,
    /** 跟注 */
    FOLLOW_BET = 3,
    /** 加注 */
    ADD_BET = 4,
    /** 下注 */
    BET = 5,
}

/** 玩家状态 */
export enum TEXASPOKERPlayerStatus {
    /** 正常 */
    NORMAL = 1,
    /** 弃牌 */
    ABANDON_CARD = 2,
    /** allIn */
    ALLIN = 4,
}