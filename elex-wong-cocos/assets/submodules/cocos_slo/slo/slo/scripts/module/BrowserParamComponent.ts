import { CocosDecorators } from '../../../../../cocos.framework/CocosDecorators';
import { Entity } from '../../../../../sharing.base/core/object/Entity';

export enum BrowserParamKey {
    /** 网关 */
    Gate = 'gate',
    /** 账号 */
    Account = 'account',
    /** Token会话 */
    Token = 'token',
    /** 平台 */
    PlatCode = 'plat',
}

@CocosDecorators.ClassNameRegister("BrowserParamComponent")
export class BrowserParamComponent extends Entity {
}