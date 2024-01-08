export class SubscibeEvent {
    public static getResp(event: string): string {
        return `${event}Resp`;
    }

    /** 设备方向变化 */
    public static readonly DevOrientationChange = 'DevOrientationChange';
    /** 进入游戏 */
    public static readonly ReqEnterGame = 'ReqEnterGame';
    /** 离开游戏 */
    public static readonly ReqLeaveGame = 'ReqLeaveGame';

    /** 窗口变化 */
    public static readonly ViewResize = 'ViewResize';
    /** 语言切换 */
    public static readonly LanguageChange = 'LanguageChange';
    /** UI加载进度 */
    public static readonly UILoadingProgress = 'UILoadingProgress';
    /** 登录成功 */
    public static readonly LoginSuccess = 'LoginSuccess';
    /** 登录失败 */
    public static readonly LoginFail = 'LoginFail';
    /** 连接断开 */
    public static readonly Disconnected = 'Disconnected';

    /** 获取资源 */
    public static readonly ReqGetResource = 'ReqGetResource';
    // 获取游戏状态
    public static readonly ReqGetPlayerState = 'ReqGetPlayerState';
    /** 同步玩家信息 */
    public static readonly ReqSyncPlayerInfo = 'ReqSyncPlayerInfo';
    /** 用户注销 */
    public static readonly ReqUserLogout = 'ReqUserLogout';

    /** 设置顶部提示信息 */
    public static readonly SetCommonTopTipInfo = 'SetCommonTopTipInfo';

    /** 游戏配置 */
    public static readonly ReqSloBetConfig = 'ReqSloBetConfig';
}
