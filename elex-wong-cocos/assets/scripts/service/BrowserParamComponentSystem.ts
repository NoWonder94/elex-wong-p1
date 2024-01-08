import { sys } from 'cc';
import { CocosDecorators } from '../../submodules/cocos.framework/CocosDecorators';
import { AwakeSystem } from '../../submodules/sharing.base/core/object/IAwakeSystem';
import { BrowserParamComponent, BrowserParamKey } from './BrowserParamComponent';
import BrowserHelper from '../../submodules/cocos.framework/helper/BrowserHelper';
import { GlobalComponentSystem } from '../../submodules/cocos.framework/service/global/GlobalComponentSystem';
import { AuthType } from '../../submodules/sharing.base/protocols/AuthProtocolConst';
import { ConfigurationComponentSystem } from '../../submodules/cocos.framework/service/configuration/ConfigurationComponentSystem';
import { GlobalOptionsKey, StorageConfigTable } from '../../submodules/cocos.framework/constants/Constants';
import { RandomHelper, RandomStrType } from '../../submodules/sharing.base/helper/RandomHelper';
import { URLHelper } from '../../submodules/sharing.base/helper/URLHelper';
import { NetProtocol } from '../../submodules/sharing.base/consts';
import { AUTH_PORT } from '../env/config.local';

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

        // 设置目标游戏ID
        if (BrowserHelper.getParam(BrowserParamKey.GameId)) {
            GlobalComponentSystem.gameId = BrowserHelper.getParam(BrowserParamKey.GameId);
        }

        // 设置目标游戏场景ID
        if (BrowserHelper.getParam(BrowserParamKey.SceneId)) {
            GlobalComponentSystem.sceneId = Number(BrowserHelper.getParam(BrowserParamKey.SceneId));
        }
    }

}

export class BrowserParamComponentSystem {
    static getPlatCode() {
        return BrowserHelper.getParam(BrowserParamKey.PlatCode) || GlobalComponentSystem.envConfig.Platform;
    }
}