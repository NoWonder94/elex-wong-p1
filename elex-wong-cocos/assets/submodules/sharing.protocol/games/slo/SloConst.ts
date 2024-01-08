import { SEX } from "../../../sharing.base/constants/PlayerBaseConst";
import { SEAT_ID, UID } from "../../../sharing.base/consts";
import { ProtoPlayerBaseInfo } from "../../protocols/ws/game/impl/game.base";

export enum SpinType {
    /** 正常 */
    Normal = 1,
    /** 免费 */
    FREE = 2,
    /** 小游戏 */
    LITTLE = 3,
}

export interface MatrixReel {
    /**
     * 图标ID
     * [ 2, 11, 8]
     */
    Reel: number[];
}

export interface ProtoSloMachineConfig {
    /** 投注挡位 */
    bets: number[];
    /** 倍数挡位 */
    muls: number[];
    /** scatter Tile Id  */
    scatter_tile_id?: number;
    /**  wild Tile Id  */
    wild_tile_id?: number;
    /**  bonus Tile Id  */
    bonus_tile_id?: number;
    /** 卷轴矩阵 */
    wheel?: MatrixReel[];
    /** 免费游戏卷轴 */
    wheel_free?: MatrixReel[];
    /** 自由游戏局数挡位 */
    auto_gear?: number[];
    /** 剩余余额挡位 */
    del_gear?: number[];
    /** 余额增加挡位 */
    add_gear?: number[];
    /** 免费游戏次数挡位 */
    free_gear?: number[];
}

export interface ProtoSloPlayerInfo extends ProtoPlayerBaseInfo {
    /** 用户id */
    uid: UID;
    /**
     * 拥有金币
     * @TJS-type double
     */
    ownGold: number;
    /** 昵称 */
    nickname: string;
    /** 头像 */
    avatar: string;
    /** 性别 */
    sex: SEX;
    /** 国家编码 */
    country_code: string;
    /** 座位号 */
    seatId: SEAT_ID;
}
