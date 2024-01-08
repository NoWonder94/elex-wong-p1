import { CocosDecorators } from '../../submodules/cocos.framework/CocosDecorators';
import { Entity } from '../../submodules/sharing.base/core/object/Entity';

export enum BrowserParamKey {
    /** 网关 */
    Gate = 'gate',
    /** 账号 */
    Account = 'account',
    /** Token会话 */
    Token = 'token',
    /** 平台 */
    PlatCode = 'plat',
    /** 游戏ID */
    GameId = 'gid',
    /** 场景ID */
    SceneId = 'sid',
    /** 语言 */
    Lang = 'lang',
}

@CocosDecorators.ClassNameRegister("BrowserParamComponent")
export class BrowserParamComponent extends Entity {
}