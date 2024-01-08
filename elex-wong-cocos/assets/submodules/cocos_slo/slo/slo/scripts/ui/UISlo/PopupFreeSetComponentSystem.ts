import { Label, _decorator, Node, Layout, UITransform, ParticleSystem2D } from "cc";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import { CCButtonComponent } from "../../../../../../cocos.framework/components/CCButtonComponent";
import { CCButtonComponentScale } from "../../../../../../cocos.framework/components/CCButtonComponentScale";
import CCFrameIndex from "../../../../../../cocos.framework/components/CCFrameIndex";
import CCReferenceCollector from "../../../../../../cocos.framework/components/CCReferenceCollector";
import { OrientationId } from "../../../../../../cocos.framework/config";
import { GlobalComponent } from "../../../../../../cocos.framework/module/global/GlobalComponent";
import { GlobalComponentSystem } from "../../../../../../cocos.framework/module/global/GlobalComponentSystem";
import { MessageEventType } from "../../../../../../cocos.framework/module/message/MessageComponent";
import { UI } from "../../../../../../cocos.framework/ui/UI";
import { PopupBaseComponent } from "../../../../../../cocos.framework/ui/UIPopup/PopupBaseComponent";
import { PopupBaseComponentAwakeSystem, PopupBaseComponentSystem } from "../../../../../../cocos.framework/ui/UIPopup/PopupBaseComponentSystem";
import { EntityFactory } from "../../../../../../sharing.base/core/object/EntityFactory";
import { DestroySystem } from "../../../../../../sharing.base/core/object/IDestroySystem";
import { FunctionCaller } from "../../../../../../sharing.base/helper/FunctionCaller";
import { SloSubscibeEvent } from "../../SloSubscibeEvent";
import { UISloBoxItemComponent } from "./UISloBoxItemComponent";

const { ccclass, property } = _decorator;

/**
 * 测试弹窗
 */
@ccclass("PopupFreeSetComponent")
export class PopupFreeSetComponent extends PopupBaseComponent {
    public BoxTitle: Node = null;

    public LayoutNode: Node = null;

    public onDevOrientationChange(orientation: OrientationId) {
        logger.info("***************");
        if (orientation == OrientationId.landscape) {
            this.LayoutNode.setPosition(0, -24, 0);
            this.LayoutNode.getComponent(Layout).constraintNum = 1;
            let h = this.LayoutNode.getComponent(UITransform).height / 2 + 50;
            this.BoxTitle.setPosition(0, h, 0);
        }

        if (orientation == OrientationId.portrait) {
            this.LayoutNode.setPosition(0, 210, 0);
            this.LayoutNode.getComponent(Layout).constraintNum = 2;
            let h = this.LayoutNode.getComponent(UITransform).height + 85;
            this.BoxTitle.setPosition(0, h, 0);
        }
    }
}

@CocosDecorators.SystemRegister()
export class PopupFreeSetComponentAwakeSystem extends PopupBaseComponentAwakeSystem<PopupFreeSetComponent> {
    constructor() {
        super(PopupFreeSetComponent);
    }

    awake(self: PopupFreeSetComponent, options: any) {
        super.awake(self, options);

        let rc = self.getParent<UI>().node.getComponent(CCReferenceCollector);

        self.BoxTitle = rc.get("title");

        self.LayoutNode = rc.get("layout");

        for (let i = 0; i < self.LayoutNode.children.length; i++) {
            let item = self.LayoutNode.children[i];
            let RcItem = item.getComponent(CCReferenceCollector);
            // 标记
            item["_itemTab"] = i;
            EntityFactory.createWithParent(self, UISloBoxItemComponent, item, null);
        }

        // 隐藏
        for (let children of self.getParent<UI>().node.children) {
            children.active = false;
        }

        // 延迟回调
        GlobalComponentSystem.sleep(
            0.5,
            FunctionCaller.create(() => {}, self)
        );

        // 适配
        self.onDevOrientationChange(GlobalComponent.instance.version.PlatformConfig.CurOrientation);

        PopupFreeSetComponentSystem.onListener(self);
    }
}

@CocosDecorators.SystemRegister()
export class PopupFreeSetComponentDestroySystem extends DestroySystem<PopupFreeSetComponent> {
    constructor() {
        super(PopupFreeSetComponent);
    }

    destroy(self: PopupFreeSetComponent) {
        PopupFreeSetComponentSystem.offListener(self);
    }
}

export class PopupFreeSetComponentSystem extends PopupBaseComponentSystem {
    protected static listLocalNotifications(self: PopupFreeSetComponent): MessageEventType[] {
        return super.listLocalNotifications(self).concat([{ name: SloSubscibeEvent.DevOrientationChange, callback: FunctionCaller.create(self.onDevOrientationChange, self) }]);
    }

    /** 确认 */
    public static onYes(self: PopupFreeSetComponent) {
        // this.hide(self);
    }

    /** 关闭 */
    public static onNo(self: PopupFreeSetComponent) {
        this.hide(self);
    }
}
