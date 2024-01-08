import { Label, Node, Widget, Button, color, EventHandler, ParticleSystem2D, EventMouse } from "cc";
import { AwakeSystem } from "../../../../../../sharing.base/core/object/IAwakeSystem";
import { FunctionCaller } from "../../../../../../sharing.base/helper/FunctionCaller";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import CCReferenceCollector from "../../../../../../cocos.framework/components/CCReferenceCollector";
import VMNode from "../../../../../../cocos.framework/components/mvvm/VMNode";
import { SceneNodeComponent } from "../../../../../../cocos.framework/module/scene/SceneNodeComponent";
import { MessageComponentSystem } from "../../../../../../cocos.framework/module/message/MessageComponentSystem";
import { MessageEventType } from "../../../../../../cocos.framework/module/message/MessageComponent";
import { SubscibeEvent } from "../../../../../../cocos.framework/SubscibeEvent";
import { OrientationId } from "../../../../../../cocos.framework/config";
import { UI } from "../../../../../../cocos.framework/ui/UI";
import { CCButtonComponent } from "../../../../../../cocos.framework/components/CCButtonComponent";
import CCFrameIndex from "../../../../../../cocos.framework/components/CCFrameIndex";
import { SloModel } from "./SloModel";
import { VM } from "../../../../../../cocos.framework/components/mvvm/ViewModel";
import VMState, { VM_ACTION } from "../../../../../../cocos.framework/components/mvvm/VMState";
import { EventType } from "../../../../../../cocos.framework/EventType";
import { PopupFreeSetComponent, PopupFreeSetComponentSystem } from "./PopupFreeSetComponentSystem";
import { GlobalComponentSystem } from "../../../../../../cocos.framework/module/global/GlobalComponentSystem";

@CocosDecorators.ClassNameRegister("UISloBoxItemComponent")
export class UISloBoxItemComponent extends SceneNodeComponent {
    /** 背景特效 */
    public EffectBg: Node = null;

    /** 描述 */
    public Des: Node = null;

    /** 数字 */
    public Number: Node = null;

    /** 盒子 */
    public Box: Node = null;

    public index: number = null;

    public bClick: boolean = false;

    public sloModel: SloModel;

    public onClickBox() {
        let parent = this.getParent<PopupFreeSetComponent>();

        if (this.sloModel.config.free_gear[this.index]) {
            this.sloModel.free_game_num = this.sloModel.config.free_gear[this.index];
            this.Box.getComponent(CCFrameIndex).index = this.index + 4;
        } else {
            logger.warn("sloModel free_gear[id] is null", this.index);
        }
        this.bClick = true;
        logger.info("*************免费游戏次数", this.sloModel.free_game_num);
        // 延迟关闭
        GlobalComponentSystem.sleep(
            0.25,
            FunctionCaller.create(() => {
                PopupFreeSetComponentSystem.hide(parent);
            }, this)
        );
    }

    public onMouseIn() {
        if (this.bClick) return;
        this.EffectBg.active = true;
    }

    public onMouseOut() {
        if (this.bClick) return;
        this.EffectBg.active = false;
    }
}

@CocosDecorators.SystemRegister()
export class UISloBoxItemComponentAwakeSystem extends AwakeSystem<UISloBoxItemComponent> {
    constructor() {
        super(UISloBoxItemComponent);
    }
    awake(self: UISloBoxItemComponent, node: Node) {
        self.node = node;

        let rc = self.node.getComponent(CCReferenceCollector);

        self.sloModel = VM.get<SloModel>(SloModel.name).$data;

        self.index = self.node["_itemTab"];

        // 背景光效
        self.EffectBg = rc.get("effect_bg");
        self.EffectBg.active = false;

        // 描述
        self.Des = rc.get<Node>("des");
        self.Des.getComponent(CCFrameIndex).index = self.index;

        // 数字
        self.Number = rc.get<Node>("number");
        self.Number.getComponent(CCFrameIndex).index = self.index;

        // 宝箱
        self.Box = rc.get("box");
        self.Box.on(Node.EventType.MOUSE_ENTER, self.onMouseIn, self);
        self.Box.on(Node.EventType.MOUSE_LEAVE, self.onMouseOut, self);
        self.Box.addComponent(CCButtonComponent).setClickHandler(FunctionCaller.create(self.onClickBox, self));
        self.Box.getComponent(CCFrameIndex).index = self.index;
    }
}
