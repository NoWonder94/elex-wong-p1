import { ReelStopDelayOpts, SloMachineConfig } from "../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/SloStructDefine";
import { DicObject } from "../../../../../sharing.base/helper/Interfaces";

/** 机器控制参数 */
export const BskgMachineConfig: SloMachineConfig = {
    /** scatter编号 */
    scatter_id: 2,
    /** wild编号 */
    wild_id: 1,
    /** 卷轴矩阵 */
    Wheel: [
        { Reel: [7, 5, 8, 10, 3, 11, 9, 6, 2, 7, 8, 4, 9, 10, 1, 11, 8, 5, 9, 10, 4, 11, 6, 9, 2, 7, 11, 3, 9, 10, 2, 5, 11, 7, 3, 10, 6, 4, 11, 8, 2, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { Reel: [7, 5, 8, 10, 3, 11, 9, 6, 2, 7, 8, 4, 9, 10, 1, 11, 8, 5, 9, 10, 4, 11, 6, 9, 2, 7, 11, 3, 9, 10, 2, 5, 11, 7, 3, 10, 6, 4, 11, 8, 2, 4, 5, 6, 7, 12, 3, 4, 5, 1, 2, 3, 6, 4, 5, 6] },
        { Reel: [7, 5, 8, 10, 3, 11, 9, 6, 2, 7, 8, 4, 9, 10, 1, 11, 8, 5, 9, 10, 4, 11, 6, 9, 2, 7, 11, 3, 9, 10, 2, 5, 11, 7, 3, 10, 6, 4, 11, 8, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 7, 8, 9, 10, 12] },
        { Reel: [7, 5, 8, 10, 3, 11, 9, 6, 2, 7, 8, 4, 9, 10, 1, 11, 8, 5, 9, 10, 4, 11, 6, 9, 2, 7, 11, 3, 9, 10, 2, 5, 11, 7, 3, 10, 6, 4, 11, 8, 2, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 11, 12] },
        { Reel: [7, 5, 8, 10, 3, 11, 9, 6, 2, 7, 8, 4, 9, 10, 1, 11, 8, 5, 9, 10, 4, 11, 6, 9, 2, 7, 11, 3, 9, 10, 2, 5, 11, 7, 3, 10, 6, 4, 11, 8, 2, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 9, 10, 11, 12] },
    ],
    /** 卷轴行数 */
    WheelRow: 3,
    /** 卷轴列数 */
    wheelCol: 5,
    /** 图标数量 */
    TileNum: 12,

    ////////////// 时间配置 //////////////

    /** 旋转时长(毫秒) */
    SpiningTimed: 1000,
    /** 旋转启动延时(秒) */
    SpinStartDelayBase: 0.01,
    /** 旋转停止延时(秒) */
    SpinStoptDelayBase: 0.2,
    /** 中奖锁定延时(秒) */
    GainLockDelay: 0.8,
    /** 中奖线路特效间隔（毫秒） */
    ShowGainLineEffectInterval: 500,
    /** 旋转速度配置 */
    SpinSpeedConfig: [
        {
            /** 旋转速度 */
            SpinSpeed: 0.04,
            /** 停止旋转速度 */
            StopSpeed: 0.04,
            /** 启动旋转Easing速度 */
            StartEasingSpeed: 0.25,
            /** 结束旋转Easing速度 */
            EndEasingSpeed: 0.25,
        },
        {
            /** 旋转速度 */
            SpinSpeed: 0.02,
            /** 停止旋转速度 */
            StopSpeed: 0.01,
            /** 启动旋转Easing速度 */
            StartEasingSpeed: 0.15,
            /** 结束旋转Easing速度 */
            EndEasingSpeed: 0.05,
        },
    ],
    /** 中奖数字显示倍数 */
    NumberShowMulti: 100,
    /** Reel 停止延时类型 */
    ReelStopDelayType: ReelStopDelayOpts.Avg,
    /** 旋转停止时间(毫秒) */
    AutoSpinInterval: 1000,
};

/** 事件特效集合 */
export type EventEffect = DicObject<string>;
