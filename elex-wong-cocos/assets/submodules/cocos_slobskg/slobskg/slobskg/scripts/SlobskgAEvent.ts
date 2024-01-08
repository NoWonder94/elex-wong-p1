import { AEvent } from "../../../../sharing.base/core/event/IEvent";
import { SlobskgSceneFactory } from "./scene/SlobskgSceneFactory";
import { Game } from "../../../../sharing.base/core/entity/Game";
import { AppEventType } from "../../../../../scripts/AppEventType";
import { SlobskgEventType } from "./SlobskgEventType";
import { ZoneCode } from "../../../../../scripts/ZoneCode";
import { CocosDecorators } from "../../../../cocos.framework/CocosDecorators";
import { AssetBundleHelper } from "../../../../cocos.framework/module/resloader/AssetBundleHelper";
import { GlobalComponentSystem } from "../../../../cocos.framework/module/global/GlobalComponentSystem";
import { BundleNames } from "../../../../../scripts/bundles";
import { ResourcesComponentSystem } from "../../../../cocos.framework/module/resloader/ResourcesComponentSytem";
import { UIEventComponent } from "../../../../cocos.framework/ui/UIEventComponent";
import { UIComponent } from "../../../../cocos.framework/ui/UIComponent";
import { SdkLoaderComponent } from "../../../../cocos.sdk/SdkLoaderComponent";
import { EventType } from "../../../../cocos.framework/EventType";
import { EventGlobalComponentSystem } from "../../../../cocos.framework/module/event/EventGlobalComponentSystem";
import { SubscibeEvent } from "../../../../cocos.framework/SubscibeEvent";
import { UserMessageComponent } from "../../../../cocos_slo/slo/slo/scripts/model/UserMessageComponent";
import { GameId } from "../../../../sharing.base/gameplugins";
import { UserMessageComponentSystem } from "../../../../cocos_slo/slo/slo/scripts/model/UserMessageComponentSystem";
import { BskgUILoadingConfig } from "./constants/SlobskgUIAdapterConfig";
import { SloUILoadingComponent } from "../../../../cocos_slo/slo/slo/scripts/ui/UILoading/SloUILoadingComponent";
import { ResConfig } from "../../../../cocos_slo/slo/slo/scripts/constants/ResConfig";

@CocosDecorators.SystemRegister()
export class SlobskgAEvent_Init extends AEvent<AppEventType.slobskg> {
    constructor() {
        super(AppEventType.slobskg);
    }

    protected async run(a: AppEventType.slobskg) {
        logger.info("Slobskg_Create run", AppEventType.slobskg.name);
        // 创建游戏场景
        await SlobskgSceneFactory.createScene(ZoneCode.slobskg, AppEventType.slobskg.name);
        await UserMessageComponentSystem.startAuth();
        // 加载资源
        // 通用资源加载模式
        let isLoaded = ResourcesComponentSystem.bundleIsLoaded(BundleNames.SLOBSKG);
        if (isLoaded) {
            EventGlobalComponentSystem.emit(SubscibeEvent.UILoadingProgress, 1);
            a.scene.afterEvent && Game.EventSystem.publish(a.scene.afterEvent);
            return;
        }

        ResourcesComponentSystem.loadBundle(
            BundleNames.SLOBSKG,
            (p: number) => {
                EventGlobalComponentSystem.emit(SubscibeEvent.UILoadingProgress, p);
            },
            async () => {
                a.scene.afterEvent && Game.EventSystem.publish(a.scene.afterEvent);
            }
        );
    }
}

@CocosDecorators.SystemRegister()
export class SlobskgAEvent_Create extends AEvent<SlobskgEventType.AfterCreateSlobskgZoneScene> {
    constructor() {
        super(SlobskgEventType.AfterCreateSlobskgZoneScene);
    }

    protected async run(a: SlobskgEventType.AfterCreateSlobskgZoneScene) {
        let zoneScene = a.zoneScene;
        zoneScene.addComponent(UIEventComponent);
        zoneScene.addComponent(UIComponent);
        zoneScene.addComponent(SdkLoaderComponent);

        let event = new EventType.UILoadingStart(zoneScene, "slobskg/prefabs/UILoading", SloUILoadingComponent, {
            uiconfig: BskgUILoadingConfig,
            targetevent: new SlobskgEventType.SlobskgCreateMachineUI(zoneScene),
            gameId: GameId.slobskg,
        });

        zoneScene.addComponent(UserMessageComponent, event, event, "slo/prefabs/UIPopupConfirm", "slo/prefabs/UIDebug", "slo/prefabs/UIFreeArea");
    }
}

@CocosDecorators.SystemRegister()
export class SlobskgAEvent_Destroy extends AEvent<SlobskgEventType.AfterDestroySlobskgZoneScene> {
    constructor() {
        super(SlobskgEventType.AfterDestroySlobskgZoneScene);
    }

    protected async run(a: SlobskgEventType.AfterDestroySlobskgZoneScene) {
        logger.info("GameStartSlobskgGame run");
        // 销毁Scene
        // 卸载Bundle

        let bundles = AssetBundleHelper.getBundleNames(GlobalComponentSystem.envConfig.BundleNames, [BundleNames.SLOBSKG], GlobalComponentSystem.inst.language, null, null);
        ResourcesComponentSystem.unloadBundles(bundles);
    }
}
