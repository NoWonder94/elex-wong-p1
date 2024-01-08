/** 玩家挂起事件 */
export enum PLAYER_HANGUP_EVENT {
    /** 无挂起事件 */
    NONE = 0,
    /** 钱包挂起 */
    WALLET = 1,
}

/** 房间状态 */
export enum RoomState {
    /** 初始状态 */
    NONE = 0,
    /** 游戏中 */
    GAMING = 1,
    /** 结算中 */
    SETTLEMENT = 2,
    /** 结束 */
    FINISH = 3,
    /** 数据提交中 */
    COMMITTING = 4,
    /** 等待下一局 */
    WAIT_NEXT = 5,
    /** 销毁 */
    DESTROY = 6,
}

/** 对战游玩法类型 */
export enum GamePlayway {
    /** 默认 */
    None = '',
    /** 金币场模式 */
    Scene = 'Scene',
    /** 竞技场模式 */
    Arena = 'Arena',
    /** 俱乐部模式 */
    Club = 'Club',
    /** 幸运奖池模式 */
    Luckypool = 'Luckypool',
    /** 房卡模式 */
    Card = 'Card',
}

/** 游戏匹配类型 */
export enum GAME_MATCH_TYPE {
    /** 固定房间模式 */
    FIXED = 1,
    /** 随机匹配模式 */
    RANDOM = 2,
    /** Slo匹配模式 */
    SLO = 3,
    /** 好友匹配模式 */
    FRIEND = 4,
    /** 捕鱼匹配模式 */
    Fish = 5,
}