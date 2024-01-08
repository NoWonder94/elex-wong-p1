import { DicObject } from "../../../../../../sharing.base/helper/Interfaces";
import { MatrixReel } from "../../../../../../sharing.protocol/games/slo/SloConst";

export enum MachineState {
    /** 初始状态 */
    Init = 0,
    /** 旋转中 */
    Spining = 1,
    /** 开奖中 */
    OpenPrizing = 2,
    /** 显示中奖线 */
    ShowGainLine = 4,
    /** 成功获取结果 */
    GetResult = 8,
}

export enum SpinDirection {
    Up,
    Down,
}

/** 图标配置 */
export interface IconConfig {
    /** 背景SpriteFrame */
    background?: string;
    /** 背景SpriteFrame */
    icon: string;
    /** 特殊SpriteFrame */
    special?: string;
    /** 背景爆炸sp.skeleton */
    effectBackgroundBomb?: string;
    /** Icon特效sp.skeleton */
    effectIcon?: {
        front?: string;
        back?: string;
    };
}

export interface AudioConfig {
    /** 背景音乐 */
    background?: string;
    /** 按钮点击 */
    hit?: string;
    /** 中奖 */
    gain?: string;
    /** 转动 */
    spin?: string;
    /** reel 停止 */
    reel_stop?: string;
}

export interface SpinSpeedConfigOpts {
    /** 旋转速度 */
    SpinSpeed: number;
    /** 停止旋转速度 */
    StopSpeed: number;
    /** 启动旋转Easing速度 */
    StartEasingSpeed: number;
    /** 结束旋转Easing速度 */
    EndEasingSpeed: number;
}

export enum ReelStopDelayOpts {
    RandMod = 1,
    Avg = 2,
}

export enum OpenMarkPage {
    /** 设置 */
    SettingPage = 0,
    /** 赔付表 */
    RecordPage = 1,
    /** 自动下注设置 */
    AutoSettingPage = 2,
    HidePage = 3,
}

export interface SloMachineConfig {
    /** scatter编号 炸弹 */
    scatter_id?: number;
    /** wild编号 钻头 */
    wild_id?: number;
    /** bonus编号 */
    bonus_id?: number;
    /** 卷轴矩阵 */
    Wheel: MatrixReel[];
    /** 卷轴行数 */
    WheelRow: number;
    /** 卷轴列数 */
    wheelCol: number;
    /** 图标数量 */
    TileNum: number;
    /** 旋转时长(毫秒) */
    SpiningTimed: number;
    /** 旋转启动延时(秒) */
    SpinStartDelayBase: number;
    /** 旋转停止延时(秒) */
    SpinStoptDelayBase: number;
    /** 中奖锁定延时(秒) */
    GainLockDelay: number;
    /** 中奖线路特效间隔（毫秒） */
    ShowGainLineEffectInterval: number;
    /** 旋转速度配置 */
    SpinSpeedConfig: SpinSpeedConfigOpts[];
    /** 数字显示倍数 */
    NumberShowMulti: number;
    /** Reel 停止延时类型 */
    ReelStopDelayType: ReelStopDelayOpts;
    /** 旋转停止时间(毫秒) */
    AutoSpinInterval: number;
}

export interface SloResConfig {
    /** 图标配置 */
    Icons: DicObject<IconConfig>;
    Audios: AudioConfig;
    /** 旋转按钮特效配置 */
    SpinBtnEffect?: {
        Start: string;
        Stop: string;
        Default: string;
        Running: string;
    };
}
