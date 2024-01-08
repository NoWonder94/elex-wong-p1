import { UI } from "../../../../../../cocos.framework/ui/UI";
import { AwakeSystem } from "../../../../../../sharing.base/core/object/IAwakeSystem";
import { SloUILoadingComponent } from "./SloUILoadingComponent";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import CCReferenceCollector from "../../../../../../cocos.framework/components/CCReferenceCollector";
import { DestroySystem } from "../../../../../../sharing.base/core/object/IDestroySystem";
import { FunctionCaller } from "../../../../../../sharing.base/helper/FunctionCaller";
import { MessageEventType } from "../../../../../../cocos.framework/module/message/MessageComponent";
import { EventType } from "../../../../../../cocos.framework/EventType";
import { SceneHelper } from "../../../../../../sharing.base/core/scene/SceneHelper";
import { Game } from "../../../../../../sharing.base/core/entity/Game";
import { Sprite, Node, Widget, Layout, Label, color } from "cc";
import { CCPageView } from "../../../../../../cocos.framework/components/CCPageView";
import { OrientationId } from "../../../../../../cocos.framework/config";
import { GlobalComponent } from "../../../../../../cocos.framework/module/global/GlobalComponent";
import { CCButtonComponent } from "../../../../../../cocos.framework/components/CCButtonComponent";
import { MessageComponentSystem } from "../../../../../../cocos.framework/module/message/MessageComponentSystem";
import { UserMessageComponentSystem } from "../../model/UserMessageComponentSystem";
import { config_lang_getter } from "../../../../../../../scripts/config_getter/config_lang_getter";
import { const_string_lang_model } from "../../../../../../../scripts/config_getter/const_string_lang_model";
import { GlobalComponentSystem } from "../../../../../../cocos.framework/module/global/GlobalComponentSystem";
import { BOOLEAN, GAME_ID, OK } from "../../../../../../sharing.base/consts";
import { AnswerResponse } from "../../../../../../sharing.base/protocols/ProtocolConst";
import { SoundComponentSystem } from "../../../../../../cocos.framework/module/sound/SoundComponentSystem";
import VMState, { VM_ACTION } from "../../../../../../cocos.framework/components/mvvm/VMState";
import { SloSubscibeEvent } from "../../SloSubscibeEvent";

@CocosDecorators.SystemRegister()
export class SloUILoadingComponentAwakeSystem extends AwakeSystem<SloUILoadingComponent> {
    constructor() {
        super(SloUILoadingComponent);
    }

    public awake(self: SloUILoadingComponent, options?: { gameId: GAME_ID; uiconfig?: any; targetevent?: any }) {
        logger.info("SloUILoadingComponent awake");
        self.uiconfig = options.uiconfig;
        self.targetevent = options.targetevent;
        self.gameId = options.gameId;
        self.isLoaded = false;
        self.isLogined = false;

        let rc = self.getParent<UI>().node.getComponent(CCReferenceCollector);
        self.UILine = rc.get("UILine");
        self.Progress = rc.get("Progress", Sprite);
        self.Status = rc.get("Status", Label);
        self.pageContent = rc.get("content");

        rc.get<Node>("PageView").getComponent(CCPageView).setAutoPlay(true, 3);

        self.Load = rc.get("Load");
        self.Load.addComponent(CCButtonComponent).setClickHandler(FunctionCaller.create((self: SloUILoadingComponent) => {
            // 请求进入游戏场景
            SloUILoadingComponentSystem.sendNotification(SloSubscibeEvent.ReqEnterGame, self.gameId, 1001);
        }, SloUILoadingComponentSystem, self)).setInteractable(false);

        self.CheckBox = rc.get<Node>("CheckBox");
        self.CheckBox.addComponent(CCButtonComponent).addClickHandler(FunctionCaller.create(SoundComponentSystem.switchMasterMute, SoundComponentSystem));
        let soundCheckBoxVMState = self.CheckBox.addComponent(VMState);
        soundCheckBoxVMState.valueAction = VM_ACTION.NODE_COLOR;
        soundCheckBoxVMState.valueA = BOOLEAN.FALSE;
        soundCheckBoxVMState.watchPath = "sound.master_volume";
        soundCheckBoxVMState.valueActionColor = color(255, 252, 3);

        self.Status.string = config_lang_getter.instance.getLangData(const_string_lang_model, GlobalComponentSystem.inst.language).slo_loading_status_loading;

        SloUILoadingComponentSystem.setProgress(self, 0);

        SloUILoadingComponentSystem.onListener(self);

        SloUILoadingComponentSystem.onDevOrientationChange(self, GlobalComponent.instance.version.PlatformConfig.CurOrientation);
    }
}

@CocosDecorators.SystemRegister()
export class SloUILoadingComponentDestroySystem extends DestroySystem<SloUILoadingComponent> {
    constructor() {
        super(SloUILoadingComponent);
    }

    destroy(self: SloUILoadingComponent) {
        SloUILoadingComponentSystem.offListener(self);
    }
}

export class SloUILoadingComponentSystem extends MessageComponentSystem {
    protected static listLocalNotifications(self: SloUILoadingComponent): MessageEventType[] {
        return super.listLocalNotifications(self).concat([
            { name: SloSubscibeEvent.UILoadingProgress, callback: FunctionCaller.create(this.setProgress, this, self) },
            { name: SloSubscibeEvent.LoginSuccess, callback: FunctionCaller.create(this.loginSuccess, this, self) },
            { name: SloSubscibeEvent.LoginFail, callback: FunctionCaller.create(this.loginFail, this, self) },
            { name: SloSubscibeEvent.DevOrientationChange, callback: FunctionCaller.create(this.onDevOrientationChange, this, self) },
            { name: SloSubscibeEvent.StartupGame, callback: FunctionCaller.create(this.onStartupGame, this, self) },
        ]);
    }

    public static loginSuccess(self: SloUILoadingComponent) {
        self.isLogined = true;
        logger.info("=================================loginSuccess", self.isLogined, self.isLoaded);
        this.setReady(self);
    }

    private static setReady(self: SloUILoadingComponent) {
        if (!self.isLogined || !self.isLoaded) {
            return;
        }
        self.Load.getComponent(CCButtonComponent).Interactable = true;
        self.Status.string = config_lang_getter.instance.getLangData(const_string_lang_model, GlobalComponentSystem.inst.language).slo_loading_status_continue;
    }

    public static loginFail(self: SloUILoadingComponent) {
        UserMessageComponentSystem.startAuth(true);
    }

    public static async onStartupGame(self: SloUILoadingComponent) {
        // 成功，跳转游戏场景
        await Game.EventSystem.publish(new EventType.UILoadingFinish(SceneHelper.domainScene(self)));
        await Game.EventSystem.publish(self.targetevent);
    }

    public static onDevOrientationChange(self: SloUILoadingComponent, orientation: OrientationId) {
        logger.info("设备方向变化为", orientation);
        let config = self.uiconfig[orientation];
        if (!config) {
            return;
        }
        self.UILine.getComponent(Widget).bottom = config.UILineWidgetBottom;
        self.Load.getComponent(Widget).bottom = config.LoadWidgetBottom;
        self.pageContent.getComponent(Layout).updateLayout(true);
    }

    public static setProgress(self: SloUILoadingComponent, p: number) {
        if (self.Progress) {
            self.Progress.fillRange = p;
        }
        if (p == 1) {
            self.isLoaded = true;
            this.setReady(self);
        }
    }
}
