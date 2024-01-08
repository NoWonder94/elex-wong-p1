import { sys } from 'cc';
import { CocosDecorators } from '../../../../../cocos.framework/CocosDecorators';
import { AwakeSystem } from '../../../../../sharing.base/core/object/IAwakeSystem';
import { BrowserParamComponent, BrowserParamKey } from './BrowserParamComponent';
import BrowserHelper from '../../../../../cocos.framework/helper/BrowserHelper';
import { GlobalComponentSystem } from '../../../../../cocos.framework/module/global/GlobalComponentSystem';
import { GlobalOptionsKey } from '../../../../../cocos.framework/module/global/GlobalComponent';
import { AuthType } from '../../../../../sharing.base/protocols/AuthProtocolConst';
import { ConfigurationComponentSystem } from '../../../../../cocos.framework/module/configuration/ConfigurationComponentSystem';
import { StorageConfigTable } from '../../../../../cocos.framework/constants/Constants';
import { RandomHelper, RandomStrType } from '../../../../../sharing.base/helper/RandomHelper';
import { URLHelper } from '../../../../../sharing.base/helper/URLHelper';
import { NetProtocol } from '../../../../../sharing.base/consts';
import { AUTH_PORT } from '../../../../../../scripts/env/config.local';

@CocosDecorators.SystemRegister()
export class BrowserParamComponentAwakeSystem extends AwakeSystem<BrowserParamComponent>{
    constructor() {
        super(BrowserParamComponent)
    }

    awake(self: BrowserParamComponent) {
        if (sys.isNative) {
            return;
        }

        // 根据浏览器参数，修改数据
        if (BrowserHelper.getParam(BrowserParamKey.Token) && GlobalComponentSystem.envConfig.SupportLoginTypes.indexOf(AuthType.TokenSignIn) >= 0) {
            GlobalComponentSystem.setOptions(GlobalOptionsKey.Token, BrowserHelper.getParam(BrowserParamKey.Token));
            ConfigurationComponentSystem.setData<number>(StorageConfigTable.Sys, AuthType.TokenSignIn, 'last_login_type');
        } else if (BrowserHelper.getParam(BrowserParamKey.Account) && GlobalComponentSystem.envConfig.SupportLoginTypes.indexOf(AuthType.Inner) >= 0) {
            ConfigurationComponentSystem.setData<number>(StorageConfigTable.Sys, AuthType.Inner, 'last_login_type');
            ConfigurationComponentSystem.setData<string>(StorageConfigTable.Sys, BrowserHelper.getParam(BrowserParamKey.Account), 'last_login_data');
        } else {
            // 默认随机账号
            ConfigurationComponentSystem.setData<number>(StorageConfigTable.Sys, AuthType.Inner, 'last_login_type');
            ConfigurationComponentSystem.setData<string>(StorageConfigTable.Sys, RandomHelper.randomString(10, RandomStrType.mix), 'last_login_data');
        }

        // 设置网关地址
        let gateUrl = BrowserHelper.getParam(BrowserParamKey.Gate);

        if (gateUrl) {
            logger.info('gateUrl = ', gateUrl, URLHelper.check(gateUrl), GlobalComponentSystem.envConfig.EnvIsTest);
            if (!URLHelper.check(gateUrl) && GlobalComponentSystem.envConfig.EnvIsTest) {
                GlobalComponentSystem.envConfig.GateURL = `${NetProtocol.HTTP}://${gateUrl}:${AUTH_PORT}`
            } else {
                GlobalComponentSystem.envConfig.GateURL = BrowserHelper.getParam(BrowserParamKey.Gate);
            }
        }
    }

}

export class BrowserParamComponentSystem {
    static getPlatCode() {
        return BrowserHelper.getParam(BrowserParamKey.PlatCode) || GlobalComponentSystem.envConfig.Platform;
    }
}