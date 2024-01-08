export interface ERROR_BASE {
    /**
     * @TJS-type int32
     */
    code: number;
    msg: string;
    detail?: string;
}

/** 邮件区域类型 */
export enum MailZoneType {
    /** 玩家 */
    Player = 1,
    /** 全服 */
    Global = 2
}

/** 邮件类型 */
export enum MailType {
    /** 信息 */
    Info = 1,
    /** 奖励 */
    Reward = 2,
    /** 补偿 */
    Compensate = 3,
    /** 赠送 */
    Give = 4,
}

/** 邮件状态 */
export enum MailStatus {
    /** 未读 */
    UnRead = 1,
    /** 已读 */
    Read = 2,
    /** 已领取 */
    Receive = 4,
    /** 删除（玩家） */
    Delete = 8,
    /** 删除（系统） */
    DeleteSys = 16,
}

/** 邮件操作 */
export enum MailOperateType {
    /** 读 */
    Read = 1,
    /** 领取 */
    Receive = 2,
    /** 删除 */
    Delete = 3,
}

/** 好友添加确认操作类型 */
export enum FriendAckOperateType {
    /** 同意 */
    Agree = 1,
    /** 拒绝 */
    Refuse = 2,
}

/** 红点类型 */
export enum RedDotType {
    /** 纯红点 */
    Pure = 1,
    /** 带数字 */
    WithNumber = 2,
    /** 带flag */
    WithNewFlag = 3,
}

/** 红点信息 */
export interface RedDotInfo {
    /** 类型 */
    type: RedDotType,
    /** 红点参数 */
    param?: string;
    /** 增加数量 */
    incr?: number;
}

/** 广告类型 */
export enum AdPlatType {
    Google = 1,
    Wechat = 2,
}

/** 平台广告类型 */
export enum AdType {
    /** 激励广告 */
    Reward = 1,
    /** 插屏广告 */
    Insert = 2,
    /** 横幅广告 */
    Banner = 3,
}