import Config, { EnvConfigs } from '../../submodules/cocos.framework/config';
import { NetProtocol } from '../../submodules/sharing.base/consts';
import { LANGUAGE } from '../../submodules/sharing.base/languages';
import { EventType } from '../../submodules/cocos.framework/EventType';
import { BundleNames, Bundles } from '../bundles';
import { AppEventType } from '../AppEventType';
import { LogLevel } from '../../submodules/cocos.framework/helper/Logger';
import { AuthType } from '../../submodules/sharing.base/protocols/AuthProtocolConst';
import Platform from '../platform';

/** 启用安全套接字 */
const ENABLE_SLL = false;
/** 授权端口 */
export const AUTH_PORT = 11201;
/** 域名 */
const DOMAIN = '192.168.31.142';
// const DOMAIN = '192.168.3.188';
/** HTTP连接地址 */
const GateURL = `${ENABLE_SLL ? NetProtocol.HTTPS : NetProtocol.HTTP}://${DOMAIN}:${AUTH_PORT}`;

const GameIds: Array<string> = ['pokzjh'];

const SplashWaitEvent = [AppEventType.ReqGetResourceFinish.name];

export default class LocalConfig extends Config {
    /** 发布渠道 */
    public Platform = 'pokzjh';
    /** 包名 */
    // public Packagename = 'com.facepoker.game';
    public Packagename = 'com.cocos.game';
    /** http连接地址 */
    public GateURL = GateURL;
    /** 是否是测试环境 */
    public EnvIsTest = true;
    /** 远程配置地址 */
    public RemoteConfigURL = null;
    /** 默认语言 */
    public DefaultLanguage = LANGUAGE.en_US;
    /** 浮点精度 */
    public FloatPrecision = 8;
    /** 是否启用mock测试 */
    public Mock = true;
    /** 游戏code */
    public GameIds = GameIds;
    /** 资源Bundle集合 */
    public BundleNames: string[] = Bundles;
    /** 日志等级 */
    public LogLevel: LogLevel = LogLevel.DEBUG;
    /** 支持的登录方式 */
    public SupportLoginTypes: AuthType[] = [AuthType.Inner, AuthType.TokenSignIn];
    /** 启动流程配置 */
    public StartupFlowEvent: any[] = [
        new EventType.SplashStart('slo/prefabs/UISplash', SplashWaitEvent),
        // 大厅
        new EventType.AppStartScene(BundleNames.SLO, new EventType.SplashFinish()),
        // 游戏
        // new EventType.AppStartScene(BundleNames.SLOBSKG, new EventType.SplashFinish()),
        // new EventType.AppStartScene(BundleNames.SLOWARRIO, new EventType.SplashFinish()),

        // new EventType.AppStartCheckupdate()
        // new EventType.AppStartHotUpdate('prefabs/UIHotupdate')
    ];
}

EnvConfigs.set(Platform.Local, new LocalConfig());
