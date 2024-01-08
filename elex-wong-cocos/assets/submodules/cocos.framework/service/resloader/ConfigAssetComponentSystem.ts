import { JsonAsset } from 'cc';
import { AppEventType } from '../../../../scripts/AppEventType';
import { Game } from '../../../sharing.base/core/entity/Game';
import { AwakeSystem } from '../../../sharing.base/core/object/IAwakeSystem';
import { CocosDecorators } from '../../CocosDecorators';
import { GlobalComponentSystem } from '../global/GlobalComponentSystem';
import { ConfigAssetComponent } from './ConfigAssetComponent';
import { ResourcesComponentSystem } from './ResourcesComponentSytem';

@CocosDecorators.SystemRegister()
export class ConfigAssetComponentAwakeSystem extends AwakeSystem<ConfigAssetComponent> {
    constructor() {
        super(ConfigAssetComponent)
    }

    async awake(self: ConfigAssetComponent) {
        ConfigAssetComponent.instance = self;
        Game.EventSystem.publish(new AppEventType.ReqGetResourceStart());
        await ResourcesComponentSystem.loadBundlesConfig(['config_common', `config_i18n_${GlobalComponentSystem.inst.language}`, `config_${window['PubPlatform']}`]);
        ResourcesComponentSystem.loadBundles(['config_common', `config_i18n_${GlobalComponentSystem.inst.language}`, `config_${window['PubPlatform']}`], null, () => {
            Game.EventSystem.publish(new AppEventType.ReqGetResourceFinish());
        })
    }
}

/** 配置资源加载 */
export class ConfigAssetComponentSystem {
    /** 切换语言 */
    public changeLange() {

    }

    /** 获取配置 */
    public static getConfig(url: string) {
        let config = ResourcesComponentSystem.getAsset(url, JsonAsset);
        logger.info('config=', config.json);
        return config.json;
    }
}