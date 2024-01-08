import { sys } from 'cc';
import { UIComponent } from '../submodules/cocos.framework/ui/UIComponent';
import { UIEventComponent } from '../submodules/cocos.framework/ui/UIEventComponent';
import { ResourcesComponent } from '../submodules/cocos.framework/service/resloader/ResourcesComponent';
import { Game } from '../submodules/sharing.base/core/entity/Game';
import { AEvent } from '../submodules/sharing.base/core/event/IEvent';
import { EventType } from '../submodules/cocos.framework/EventType';
import { GlobalComponent } from '../submodules/cocos.framework/service/global/GlobalComponent';
import { GlobalComponentSystem } from '../submodules/cocos.framework/service/global/GlobalComponentSystem';
import { version } from './version';
import { BundleNames } from './bundles';
import { ResourcesComponentSystem } from '../submodules/cocos.framework/service/resloader/ResourcesComponentSytem';
import { EventGlobalComponent } from '../submodules/sharing.base/service/event/EventGlobalComponent';
import { ZoneSceneManagerComponent } from '../submodules/sharing.base/core/scene/ZoneSceneManagerComponent';
import { CocosDecorators } from '../submodules/cocos.framework/CocosDecorators';
import { PopupManagerComponent } from '../submodules/cocos.framework/ui/UIPopup/PopupManagerComponent';
import { AppEventType } from './AppEventType';
import { ConfigurationComponent } from '../submodules/cocos.framework/service/configuration/ConfigurationComponent';
import { SoundComponent } from '../submodules/cocos.framework/service/sound/SoundComponent';
import { NetworkManagerComponent } from '../submodules/cocos.framework/service/network/NetworkManagerComponent';
import { EntityFactory } from '../submodules/sharing.base/core/object/EntityFactory';
import { NetworkComponent } from '../submodules/cocos.framework/service/network/NetworkComponent';
import { WebsocketOmelox, OmeloxProtocol } from '../submodules/cocos.framework/service/network/WebsocketOmelox';
import { NetworkManagerComponentSystem } from '../submodules/cocos.framework/service/network/NetworkManagerComponentSystem';
import HTTP from '../submodules/cocos.framework/service/network/HTTP';
import { UISceneComponent } from '../submodules/cocos.framework/service/scene/UISceneComponent';
import { ConfigAssetComponent } from '../submodules/cocos.framework/service/resloader/ConfigAssetComponent';
import { config_model_base } from './config_getter/config_model';
import { ConfigAssetComponentSystem } from '../submodules/cocos.framework/service/resloader/ConfigAssetComponentSystem';
import { ConfigHelper } from './helper/ConfigHelper';
import { FunctionCaller } from '../submodules/sharing.base/helper/FunctionCaller';
import { BrowserParamComponent } from './service/BrowserParamComponent';
import { SoundComponentSystem } from '../submodules/cocos.framework/service/sound/SoundComponentSystem';
import { GlobalOptionsKey } from '../submodules/cocos.framework/constants/Constants';
import { TimerGlobalComponent } from '../submodules/sharing.base/service/timer/TimerGlobalComponent';

@CocosDecorators.SystemRegister()
export class AppStart_Init extends AEvent<EventType.AppStartInit> {
    constructor() {
        super(EventType.AppStartInit);
    }

    protected async run(a: EventType.AppStartInit) {
        logger.info('AppStart_Init EventType.AppStartInit');

        // 加载资源管理组件
        Game.Scene.addComponent(ResourcesComponent);
        Game.Scene.addComponent(ConfigurationComponent, version.AppName);
        Game.Scene.addComponent(GlobalComponent, version);
        // 加载网络组件
        Game.Scene.addComponent(NetworkManagerComponent);
        Game.Scene.addComponent(UIEventComponent);
        Game.Scene.addComponent(UIComponent);
        Game.Scene.addComponent(EventGlobalComponent);
        Game.Scene.addComponent(TimerGlobalComponent);
        Game.Scene.addComponent(ZoneSceneManagerComponent);
        Game.Scene.addComponent(UISceneComponent);
        Game.Scene.addComponent(PopupManagerComponent);
        Game.Scene.addComponent(SoundComponent, version.PlatformConfig.Audio);
        Game.Scene.addComponent(BrowserParamComponent);

        // 配置Global options
        GlobalComponentSystem.setOptions<FunctionCaller>(GlobalOptionsKey.GetLabelValue, FunctionCaller.create(ConfigHelper.getLabelValue, ConfigHelper));

        // 创建网络节点
        let networkComponent = EntityFactory.create(Game.Scene, NetworkComponent, new HTTP(version.PlatformConfig.GateURL), new WebsocketOmelox(), new OmeloxProtocol(), {
            prefabUrl: 'prefabs/UICircleLoading',
        });
        NetworkManagerComponentSystem.setNetNode(networkComponent);

        await ResourcesComponentSystem.loadBundlesConfig([BundleNames.SLO]);

        if (sys.isNative) {
            Game.EventSystem.publish(new EventType.AppStartCheckupdate());
        } else {
            await Game.EventSystem.publish(GlobalComponentSystem.getNextEvent());
        }

        // 加载资源配置组件
        Game.Scene.addComponent(ConfigAssetComponent);

        // 初始化声音
        SoundComponentSystem.initMasterMute();
    }
}

@CocosDecorators.SystemRegister()
export class ConfigAssetAEvent_ReqGetResourceFinish extends AEvent<AppEventType.ReqGetResourceFinish> {
    constructor() {
        super(AppEventType.ReqGetResourceFinish);
    }

    protected async run(args: AppEventType.ReqGetResourceFinish) {
        config_model_base.setJsonLoaderHandler((configUrl) => {
            let resUrl = configUrl.substring(0, configUrl.indexOf('.json'));
            return ConfigAssetComponentSystem.getConfig(resUrl);
        });
    }
}
