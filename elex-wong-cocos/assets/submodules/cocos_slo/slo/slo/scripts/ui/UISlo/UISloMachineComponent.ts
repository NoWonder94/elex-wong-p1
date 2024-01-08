import { Node, Prefab } from "cc";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import { UISloReelComponent } from "./UISloReelComponent";
import { game_sloHandler_c_spin_Res_Data } from "../../../../../../sharing.protocol/protocols/ws/game/slo/game.sloHandler.c_spin";
import { MachineState, SloMachineConfig, SloResConfig } from "./SloStructDefine";
import { SloModel } from "./SloModel";
import { MessageEventType } from "../../../../../../cocos.framework/module/message/MessageComponent";
import { DicObject } from "../../../../../../sharing.base/helper/Interfaces";
import { OrientationId } from "../../../../../../cocos.framework/config";
import { SceneNodeComponent } from "../../../../../../cocos.framework/module/scene/SceneNodeComponent";

@CocosDecorators.ClassNameRegister("UISloMachineComponent")
export abstract class UISloMachineComponent extends SceneNodeComponent {
    /** 卷轴机器节点 */
    public Machine: Node = null;
    /** 赢节点 */
    public Win: Node = null;
    /** 卷轴预制体 */
    public ReelPrefab: Prefab;
    /** 机器状态 */
    public state: MachineState = MachineState.Init;
    /** 资源、特效配置 */
    public resConfigs: SloResConfig;
    /** 机器配置 */
    public machineConfig: SloMachineConfig;
    /** 卷轴 */
    public reels: UISloReelComponent[] = [];
    /** 旋转停止时间 */
    public autoSpinStopTime: number = 0;
    /** 已经显示线索引 */
    public showedLineIndex: number = 0;
    /** 是否正在轮巡线路特效 */
    public showGainLineEffectIng: boolean = false;
    /** 上个线路显示完成时间 */
    public showGainLineEffectLastTime: number = 0;
    /** 旋转结果 */
    public result: game_sloHandler_c_spin_Res_Data;
    /** slo model数据 */
    public sloModel: SloModel;
    /** 提前停止 */
    public preStop: boolean = false;
    /** Reel stop randMod */
    public randMod: number = 0;
    /** 请求结果时间 */
    public requestResultTime: number;
    /** 普通中奖点坐标 */
    public normalGainPoints = new Set<string>();
    /** 获取资源配置 */
    get ResConfigs() {
        return this.resConfigs;
    }
    UIConfig: DicObject<any>;
    /** slo内部消息 */
    slocmds: MessageEventType[] = [];

    /** 适配 */
    public abstract onDevOrientationChange(orientation: OrientationId);
}
