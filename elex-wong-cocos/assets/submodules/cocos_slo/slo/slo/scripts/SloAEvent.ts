import { AEvent } from "../../../../sharing.base/core/event/IEvent";
import { SloSceneFactory } from "./scene/SloSceneFactory";
import { Game } from "../../../../sharing.base/core/entity/Game";
import { AppEventType } from "../../../../../scripts/AppEventType";
import { SloEventType } from "./SloEventType";
import { ZoneCode } from "../../../../../scripts/ZoneCode";
import { CocosDecorators } from "../../../../cocos.framework/CocosDecorators";
import { AssetBundleHelper } from "../../../../cocos.framework/module/resloader/AssetBundleHelper";
import { GlobalComponentSystem } from "../../../../cocos.framework/module/global/GlobalComponentSystem";
import { ResourcesComponentSystem } from "../../../../cocos.framework/module/resloader/ResourcesComponentSytem";
import { UIEventComponent } from "../../../../cocos.framework/ui/UIEventComponent";
import { UIComponent } from "../../../../cocos.framework/ui/UIComponent";
import { SdkLoaderComponent } from "../../../../cocos.sdk/SdkLoaderComponent";
import { EventType } from "../../../../cocos.framework/EventType";
import { SloMessageComponent } from "./model/SloMessageComponent";
import { BundleNames } from "../../../../../scripts/bundles";
import { EventGlobalComponentSystem } from "../../../../cocos.framework/module/event/EventGlobalComponentSystem";
import { SubscibeEvent } from "../../../../cocos.framework/SubscibeEvent";
import { GlobalOptionsKey } from "../../../../cocos.framework/module/global/GlobalComponent";

@CocosDecorators.SystemRegister()
export class SloAEvent_Init extends AEvent<AppEventType.slo> {
    constructor() {
        super(AppEventType.slo);
    }

    protected async run(a: AppEventType.slo) {
        logger.info("Slo_Create run", AppEventType.slo.name);
        // 创建游戏场景
        await SloSceneFactory.createScene(ZoneCode.slo, AppEventType.slo.name);

        ResourcesComponentSystem.loadBundle(
            BundleNames.SLO,
            (p: number) => {
                EventGlobalComponentSystem.emit(SubscibeEvent.UILoadingProgress, p);
            },
            async () => {
                // 配置Global options
                GlobalComponentSystem.setOptions<string>(GlobalOptionsKey.ButtonHitSound, "slo/audio/sdmn_button");
                await GlobalComponentSystem.sleepSync(0.2);
                await Game.EventSystem.publish(new EventType.AppStartScene(BundleNames.SLOBSKG, a.scene.afterEvent));
            }
        );
    }
}

@CocosDecorators.SystemRegister()
export class SloAEvent_Create extends AEvent<SloEventType.AfterCreateSloZoneScene> {
    constructor() {
        super(SloEventType.AfterCreateSloZoneScene);
    }

    protected async run(a: SloEventType.AfterCreateSloZoneScene) {
        let zoneScene = a.zoneScene;
        zoneScene.addComponent(UIEventComponent);
        zoneScene.addComponent(UIComponent);
        zoneScene.addComponent(SdkLoaderComponent);
        //   zoneScene.addComponent(UserMessageComponent, new SloEventType.SloCreateLoginUI(zoneScene), new EventType.UILoadingStart(zoneScene, "slo/prefabs/UILoading", SloUILoadingComponent), "slo/prefabs/UIPopupConfirm", "slo/prefabs/UIDebug");
        zoneScene.addComponent(SloMessageComponent);

        // 创建UIToast
        await Game.EventSystem.publish(new EventType.UIToastStart("prefabs/UIToast"));
    }
}

@CocosDecorators.SystemRegister()
export class SloAEvent_Destroy extends AEvent<SloEventType.AfterDestroySloZoneScene> {
    constructor() {
        super(SloEventType.AfterDestroySloZoneScene);
    }

    protected async run(a: SloEventType.AfterDestroySloZoneScene) {
        logger.info("GameStartSloGame run");
        // 销毁Scene
        // 卸载Bundle

        let bundles = AssetBundleHelper.getBundleNames(GlobalComponentSystem.envConfig.BundleNames, ["BundleNames.Slo"], GlobalComponentSystem.inst.language, null, null);
        ResourcesComponentSystem.unloadBundles(bundles);
    }
}
