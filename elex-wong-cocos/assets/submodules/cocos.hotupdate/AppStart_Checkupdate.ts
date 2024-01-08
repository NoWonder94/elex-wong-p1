import { sys } from "cc";
import { ErrorInfo, HotUpdateComponent, HotUpdateEvent, NewVersionInfo } from "./module/HotUpdateComponent";
import { HotUpdateComponentSystem } from "./module/HotUpdateComponentSystem";
import { Game } from "../sharing.base/core/entity/Game";
import { AEvent } from "../sharing.base/core/event/IEvent";
import { FunctionCaller } from "../sharing.base/helper/FunctionCaller";
import { EventType } from "../cocos.framework/EventType";
import { GlobalComponentSystem } from "../cocos.framework/module/global/GlobalComponentSystem";
import { ResourcesComponentSystem } from "../cocos.framework/module/resloader/ResourcesComponentSytem";
import { CocosDecorators } from "../cocos.framework/CocosDecorators";

@CocosDecorators.SystemRegister()
export class AppStart_Checkupdate extends AEvent<EventType.AppStartCheckupdate> {
    constructor() {
        super(EventType.AppStartCheckupdate)
    }

    protected async run(a: EventType.AppStartCheckupdate) {
        // 热更检查
        let manifestAsset = await ResourcesComponentSystem.loadAsset('project');
        if (!manifestAsset || !sys.isNative) {
            Game.EventSystem.publish(GlobalComponentSystem.getNextEvent());
            return;
        }

        // TODO 热更组件优化，满足多bundle更新、检查

        logger.info('manifestAsset', manifestAsset)
        let hotUpdateComponent = Game.Scene.addComponent(HotUpdateComponent, manifestAsset, GlobalComponentSystem.envConfig.AppName);
        HotUpdateComponentSystem.setEventlistener(hotUpdateComponent, FunctionCaller.create(this.onCheckHotupdate, this));
        HotUpdateComponentSystem.startCheck(hotUpdateComponent);
    }

    private onCheckHotupdate(etype: HotUpdateEvent, info?: NewVersionInfo & ErrorInfo) {
        logger.info('onCheckHotupdate etype=', etype);
        switch (etype) {
            case HotUpdateEvent.UpdateError:
                // 提示
                logger.error('检查更新失败， reason=', info.reason)
                break;
            case HotUpdateEvent.AreadyNew:
                // 已经是最新版本
                Game.EventSystem.publish(GlobalComponentSystem.getNextEvent());
                Game.Scene.removeComponent(HotUpdateComponent);
                break;
            case HotUpdateEvent.NewVersion:
                // 存在版本更新
                Game.EventSystem.publish(new EventType.AppStartHotUpdate('prefabs/UIHotupdate'));
                break;
        }
    }
}


