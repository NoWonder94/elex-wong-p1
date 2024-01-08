import { _decorator, Component, view, macro, ResolutionPolicy } from 'cc';
const { ccclass } = _decorator;
import { Game } from '../submodules/sharing.base/core/entity/Game';
import { EventType } from '../submodules/cocos.framework/EventType';
import { version } from './version';
import { EnvConfigs, OrientationId } from '../submodules/cocos.framework/config';
import { SubscibeEvent } from '../submodules/cocos.framework/SubscibeEvent';
import { EventGlobalComponentSystem } from '../submodules/sharing.base/service/event/EventGlobalComponentSystem';
import { FunctionCaller } from '../submodules/sharing.base/helper/FunctionCaller';
import { OrientationComponent } from '../submodules/cocos.framework/service/OrientationComponent';
import { Global } from '../submodules/cocos.framework/Global';
import { TimerGlobalComponentSystem } from '../submodules/sharing.base/service/timer/TimerGlobalComponentSystem';
import { CCSysComponent } from '../submodules/cocos.framework/service/CCSysComponent';
import { CCTouchInput } from '../submodules/cocos.framework/components/CCTouchInput';
import { TouchScreenfullComponent } from '../submodules/cocos.framework/service/TouchScreenfullComponent';

@ccclass('Init')
export class Init extends Component {
    async start() {
        /** 发布渠道配置 */
        version.PlatformConfig = EnvConfigs.get(version.PubPlatform);
        Global.setGlobalConfig(version);

        this.addComponent(CCTouchInput);
        Game.Scene.addComponent(CCSysComponent);
        Game.Scene.addComponent(TouchScreenfullComponent);
        Game.Scene.addComponent(OrientationComponent);
        Game.EventSystem.publish(new EventType.AppStartInit());
    }

    protected update(deltaTime: number) {
        Game.EventSystem.update(deltaTime);
    }

    protected lateUpdate(deltaTime: number) {
        Game.EventSystem.lateUpdate(deltaTime);
    }

    protected onDestroy() {
        Game.close();
    }
}
