import { NetProtocol, NONE } from '../sharing.base/consts';
import { LANGUAGE } from '../sharing.base/languages';
import { OemId, StyleId } from '../sharing.base/oem';
import { AuthType } from '../sharing.base/protocols/AuthProtocolConst';
import { LogLevel } from './helper/Logger';
import { SoundModel } from './service/sound/SoundModel';

/** 屏幕方向id */
export enum OrientationId {
    /** 横屏 */
    landscape = 'landscape',
    /** 竖屏 */
    portrait = 'portrait',
    /** 自动 */
    auto = 'auto',
};

//是否启用安全套接字
const ENABLE_SLL = true;
/** 授权端口 */
const AUTH_PORT = 80
//域名
const DOMAIN = 'localhost';
/** HTTP连接地址 */
const GateURL = `${ENABLE_SLL ? NetProtocol.HTTPS : NetProtocol.HTTP}://${DOMAIN}:${AUTH_PORT}`;

export const EnvConfigs = new Map<string, Config>();

export default class Config {
    /** APP名称标志 */
    public AppName = NONE;
    /** 包名 */
    public Packagename = NONE;
    /** 网关连接地址 */
    public GateURL = GateURL;
    /** 是否是测试环境 */
    public EnvIsTest = false;
    /** 超时 */
    public HttpTimeout = 5000;
    /** 远程配置地址 */
    public RemoteConfigURL = 'http://localhost/remote/config'
    /** 默认语言 */
    public DefaultLanguage = LANGUAGE.en_US;
    /** 默认OEM */
    public DefaultOem = OemId.general;
    /** 皮肤定义 */
    public DefaultStyle = StyleId.cartoon;
    /** 设置屏幕模式 */
    public Orientation = OrientationId.auto;
    /** 当前屏幕方向 */
    public CurOrientation = OrientationId.auto;
    /** 浮点精度 */
    public FloatPrecision = 2;
    /** 设计分辨率 */
    public DesignResolutionSize = {
        width: 1280,
        height: 720
    };
    /** 发布推广渠道 */
    public Platform = 'Default';
    /** 是否启用mock测试 */
    public Mock = false;
    /** 游戏code */
    public GameIds = new Array<string>();
    /** 支持的登录方式 */
    public SupportLoginTypes: AuthType[] = []
    /** 启动流程配置 */
    public StartupFlowEvent: any[];
    /** 资源Bundle集合 */
    public BundleNames: string[] = [];
    /** 日志等级 */
    public LogLevel: LogLevel = LogLevel.INFO;
    /** 音频默认配置 */
    public Audio: SoundModel = {
        master_volume: 1.0,
        music_volume: 1.0,
        music_mute: 0,
        effect_volume: 1.0,
        effect_mute: 0,
    }
}
