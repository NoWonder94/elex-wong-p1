import { Game } from "../../../sharing.base/core/entity/Game";
import { AEvent } from "../../../sharing.base/core/event/IEvent";
import { EventType } from "../../EventType";
import { AEventSystem } from '../../ui/AEventSystem';
import { ResourcesComponentSystem } from "../resloader/ResourcesComponentSytem";
import { AssetBundleHelper } from '../resloader/AssetBundleHelper';
import { GlobalComponentSystem } from '../global/GlobalComponentSystem';
import { CocosDecorators } from "../../CocosDecorators";

@CocosDecorators.SystemRegister()
export class AppStart_Scene extends AEvent<EventType.AppStartScene> {
    constructor() {
        super(EventType.AppStartScene)
    }

    protected async run(a: EventType.AppStartScene) {
        logger.info('AppStart_Scene run name=', a.zoneSceneName);
        // 切换Bundle资源配置
        let bundles = AssetBundleHelper.getBundleNames(GlobalComponentSystem.envConfig.BundleNames,
            [a.zoneSceneName], GlobalComponentSystem.inst.language, null, null)
        await ResourcesComponentSystem.loadBundlesConfig(bundles);
        let CLASS = AEventSystem.getEventTypeClass(a.zoneSceneName);
        // 启动Scene
        Game.EventSystem.publish(new CLASS(a));
    }
}


