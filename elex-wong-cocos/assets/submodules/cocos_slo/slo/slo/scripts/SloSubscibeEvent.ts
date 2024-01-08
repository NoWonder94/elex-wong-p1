import { SubscibeEvent } from "../../../../cocos.framework/SubscibeEvent";

export class SloSubscibeEvent extends SubscibeEvent {
    /** 启动游戏 */
    public static readonly StartupGame = "StartupGame";
    /** 获取旋转结果 */
    public static readonly ReqGetSpinResult = "ReqGetSpinResult";
    /** 获取旋转结果失败 */
    public static readonly ReqGetSpinResultFail = "ReqGetSpinResultFail";
}
