import { CCButtonComponent } from "../../../../../../cocos.framework/components/CCButtonComponent";
import { UI } from "../../../../../../cocos.framework/ui/UI";
import { AwakeSystem } from "../../../../../../sharing.base/core/object/IAwakeSystem";
import { FunctionCaller } from "../../../../../../sharing.base/helper/FunctionCaller";
import { SloUILoginComponent } from "./SloUILoginComponent";
import { GlobalComponentSystem } from "../../../../../../cocos.framework/module/global/GlobalComponentSystem";
import { Label } from 'cc';
import { Game } from "../../../../../../sharing.base/core/entity/Game";
import { SloEventType } from "../../SloEventType";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import { EventType } from "../../../../../../cocos.framework/EventType";
import { SceneHelper } from '../../../../../../sharing.base/core/scene/SceneHelper';
import { BundleNames } from "../../../../../../../scripts/bundles";
import CCReferenceCollector from '../../../../../../cocos.framework/components/CCReferenceCollector';
import { SloSubscibeEvent } from "../../SloSubscibeEvent";
import { DestroySystem } from "../../../../../../sharing.base/core/object/IDestroySystem";
import { MessageComponentSystem } from '../../../../../../cocos.framework/module/message/MessageComponentSystem';
import { AuthType } from "../../../../../../sharing.base/protocols/AuthProtocolConst";
import { MessageEventType } from "../../../../../../cocos.framework/module/message/MessageComponent";
import { UserMessageComponentSystem } from "../../model/UserMessageComponentSystem";

@CocosDecorators.SystemRegister()
export class SloUILoginComponentAwakeSystem extends AwakeSystem<SloUILoginComponent>{
    constructor() {
        super(SloUILoginComponent);
    }

    public awake(self: SloUILoginComponent, nodePrefabURL: string) {
        self.nodePrefabURL = nodePrefabURL;

        logger.info('SloUILoginComponent awake');

        let rc = self.getParent<UI>().node.getComponent(CCReferenceCollector);

        self.ClientVersion = rc.get('ClientVersion', Label);
        self.ServerVersion = rc.get('ServerVersion', Label);

        // 游客
        self.LoginGuest = rc.get('Guest');
        self.LoginGuest.active = GlobalComponentSystem.envConfig.SupportLoginTypes.indexOf(AuthType.Inner) != -1;
        self.LoginGuest.addComponent(CCButtonComponent)
            .setClickHandler(FunctionCaller.create(SloUILoginComponentSystem.onLoginGuest, SloUILoginComponentSystem, self));
        SloUILoginComponentSystem.onListener(self);
    }
}

@CocosDecorators.SystemRegister()
export class SloUILoginComponentDestroySystem extends DestroySystem<SloUILoginComponent>{
    constructor() {
        super(SloUILoginComponent);
    }

    destroy(self: SloUILoginComponent) {
        SloUILoginComponentSystem.offListener(self);
    }
}

export class SloUILoginComponentSystem extends MessageComponentSystem {
    protected static listLocalNotifications(self: SloUILoginComponent): MessageEventType[] {
        return super.listLocalNotifications(self).concat([
            { name: SloSubscibeEvent.LoginSuccess, callback: FunctionCaller.create(this.loginSuccess, this, self) },
        ]);
    }

    public static onLoginGuest(self: SloUILoginComponent) {
        logger.info('onLoginGuest');
        UserMessageComponentSystem.reqGuestLogin();
    }

    private static loginSuccess(self: SloUILoginComponent) {
        Game.EventSystem.publish(new EventType.AppStartScene(BundleNames.SLOBSKG, new SloEventType.SloRemoveLoginUI(SceneHelper.domainScene(self))));
    }
}