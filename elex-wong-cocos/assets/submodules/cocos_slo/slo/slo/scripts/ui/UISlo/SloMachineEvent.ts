export class SloMachineEvent {
    /** 普通中奖 */
    static SpinResultGainNormal: string = "SpinResultGainNormal";
    /** Scatter中奖 */
    static SpinResultGainScatter: string = "SpinResultGainScatter";
    /** Bigwin中奖 */
    static SpinResultGainBigwin: string = "SpinResultGainBigwin";
    /** Machine转动开始 */
    static MachineSpinStart: string = "MachineSpinStart";
    /** Machine转动停止 */
    static MachineSpinStop: string = "MachineSpinStop";
    /** Reel转动开始 */
    static ReelSpinStart: string = "ReelSpinStart";
    /** Reel转动中 */
    static ReelSpining: string = "ReelSpining";
    /** 可视范围内 Reel Tile转动停止 */
    static ReelTileStop: string = "ReelTileStop";
    /** Reel转动停止 */
    static ReelStop: string = "ReelStop";
    /** 所有Reel转动停止 */
    static ReelAllStop: string = "ReelAllStop";
    /** 开始游戏 */
    static MachineOperteSpin: string = "MachineOperteSpin";
    /** 自动游戏开始 */
    static MachineOperteAutoSpin: string = "MachineOperteAutoSpin";
    /** 退出自动游戏 */
    static MachineOperteExitAutoSpin: string = "MachineOperteExitAutoSpin";
}
