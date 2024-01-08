/** 游戏ID */
export type GAME_ID = string;
/** 房间ID */
export type ROOM_ID = number;
/** 房间编号(6位数字) */
export type ROOM_CODE = number;
/** ES ID */
export type ES_ID = number;
/** 游戏场景ID */
export type SCENE_ID = number;
/** 用户ID */
export type UID = number;
/** 座位号 */
export type SEAT_ID = number;
/** 平台编码 */
export type PLAT_CODE = string;
/** 线路编码 */
export type LINE_CODE = string;
/** 语言类型 */
export type LANG = string;
/** 币编码 */
export type COIN_CODE = string;
/** 占位符 */
export const NONE = "-";

export const OK = 0;

/** boolean类型定义 */
export enum BOOLEAN {
    TRUE = 1,
    FALSE = 0,
}

/** 浮点精度 */
export const FloatPrecision = 2;

/** 网路协议类型定义 */
export enum NetProtocol {
    HTTP = "http",
    HTTPS = "https",
    WS = "ws",
    WSS = "wss",
    TCP = "tcp",
    UDP = "udp",
}

export enum HttpMethod {
    GET = "get",
    POST = "post",
}

/** Device type define */
export enum DeviceType {
    /** 未知 */
    NONE = 0,
    /** android */
    ANDROID = 1,
    /** ios */
    IOS = 2,
    /** pc */
    PC = 3,
}

export interface PlatIdentify {
    /**
     * 平台编码
     */
    plat_code: string;
    /**
     * 平台子线路编码(默认与plat_code相同)
     */
    line_code?: string;
}

export interface OXError {
    code: number;
    msg: string;
    detail?: string;
}

export interface OXResponse {
    error: OXError;
    data: any;
}

// export interface OXSysResponse {
//     [key: string]: string | number | null | undefined;
// }

/** 游戏分类 */
export enum GAME_CATEGORY {
    /** 扑克 */
    POKER = 1,
    /** 麻将 */
    MJ = 2,
    /** 百人类 */
    MULTI = 4,
    /** 街机电游 */
    ESPORTS = 8,
    /** 新游戏 */
    NEW = 16,
    /** 热门游戏 */
    HOT = 32,
    /** 特殊分类（竞技场、俱乐部等） */
    SPECIAL = 64,
    /** MOBA对战 */
    MOBA = 128,
    /** 大型多人在线角色扮演 */
    MMORPG = 256,
    /** 策略类游戏 */
    SLG = 512,
    /** 智益类游戏 */
    PUZ = 1024,
    /** 运动类游戏 */
    SPG = 2048,
}

/** 游戏级别 */
export enum GAME_GRADE {
    /** 推荐 */
    RECOMMEND = 1,
    /** 火爆 */
    HOT = 2,
    /** 新游戏 */
    NEW = 4,
    /** 一般 */
    COMMON = 8,
    /** 维护中 */
    MAINTENANCE = 16,
    /** 敬请期待 */
    DEV = 32,
    /** 玩过 */
    PLAYED = 64,
}

/** 有效倍数 */
export interface ValidMulti {
    /**
     * @TJS-type uInt32
     */
    multi: number;
    /**
     * @TJS-type sInt32
     */
    opt: BOOLEAN;
}

/** 无效值 */
export const INVALID_NUMBER = -1;

/** 全局资源配置 */
export interface GlobalResources {
    error: any;
    UIString: any;
    UIConfig: any;
    /** 定制 */
    oem: string[];
    /** 皮肤 */
    style: string[];
    /** 屏幕方向 */
    Orientation: string[];
    /** 支持语言 */
    lang: string[];
    /** 游戏ID */
    game_ids: string[];
}

/** 权重值结构 */
export interface WeightValueStruct {
    /** 值 */
    value: any;
    /** 权重 */
    weight: number;
}
