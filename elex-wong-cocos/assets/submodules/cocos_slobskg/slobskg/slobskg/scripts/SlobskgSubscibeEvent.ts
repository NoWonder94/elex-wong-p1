import { SubscibeEvent } from "../../../../cocos.framework/SubscibeEvent";

export class SlobskgSubscibeEvent extends SubscibeEvent {
    /** 设置资源加载进度 */
    public static readonly SetResLoadProgress = "SetResLoadProgress";

    /** 设置中间提示信息 */
    public static readonly SetCommonCenterTipInfo = "SetCommonCenterTipInfo";
    /** 设置环形资源加载进度 */
    public static readonly SetCommonCircleLoadProgress = "SetCommonCircleLoadProgress";
    /** 获取资源 */
    public static readonly ReqGetResource = 'ReqGetResource';
    //获取游戏状态
    public static readonly ReqGetPlayerState = 'ReqGetPlayerState';
    /** 同步玩家信息 */
    public static readonly ReqSyncPlayerInfo = 'ReqSyncPlayerInfo';
    /** 终端登陆 */
    public static readonly ReqUserLogin = 'ReqUserLogin';
    /** 平台登陆 */
    public static readonly ReqPlatformLogin = 'ReqPlatformLogin';
    /** 用户注销 */
    public static readonly ReqUserLogout = 'ReqUserLogout';
}