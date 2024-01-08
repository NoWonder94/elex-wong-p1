import Config, { EnvConfigs } from '../../submodules/cocos.framework/config';
import { NetProtocol } from '../../submodules/sharing.base/consts';
import { LANGUAGE } from '../../submodules/sharing.base/languages';
import { AuthType } from '../../submodules/sharing.base/protocols/AuthProtocolConst';
import Platform from '../platform';

//是否启用安全套接字
const ENABLE_SLL = true;
const AUTH_PORT = 3002
//域名
const DOMAIN = 'xxx.xxx.xxx.xxx';
/** HTTP连接地址 */
const GateURL = `${ENABLE_SLL ? NetProtocol.HTTPS : NetProtocol.HTTP}://${DOMAIN}:${AUTH_PORT}`;

const GameIds: Array<string> = [
    "pokqznn",
]

export default class PubConfig extends Config {
    /** http连接地址 */
    public GateURL = GateURL;
    /** 默认语言 */
    public DefaultLanguage = LANGUAGE.zh_CN;
    /** 浮点精度 */
    public FloatPrecision = 8;
    /** 游戏code */
    public GameIds = GameIds;
    /** 支持的登录方式 */
    public SupportLoginTypes: AuthType[] = [AuthType.TokenSignIn];
}

EnvConfigs.set(Platform.Pub, new PubConfig());