import { Label, Node, screen, game, dragonBones, math, Layout, UITransform } from "cc";
import { AwakeSystem } from "../../../../../../sharing.base/core/object/IAwakeSystem";
import { FunctionCaller } from "../../../../../../sharing.base/helper/FunctionCaller";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import CCReferenceCollector from "../../../../../../cocos.framework/components/CCReferenceCollector";
import VMLabel from "../../../../../../cocos.framework/components/mvvm/VMLabel";
import { SceneNodeComponent } from "../../../../../../cocos.framework/module/scene/SceneNodeComponent";
import { MessageComponentSystem } from "../../../../../../cocos.framework/module/message/MessageComponentSystem";
import { MessageEventType } from "../../../../../../cocos.framework/module/message/MessageComponent";
import { SubscibeEvent } from "../../../../../../cocos.framework/SubscibeEvent";
import { OrientationId } from "../../../../../../cocos.framework/config";
import { SloUILoadingAdapterConfig } from "../../constants/SloUIAdapterConfig";
import { DicObject } from "../../../../../../sharing.base/helper/Interfaces";
import { GlobalComponent } from "../../../../../../cocos.framework/module/global/GlobalComponent";

@CocosDecorators.ClassNameRegister("UISloButtomAreaComponent")
export class UISloButtomAreaComponent extends SceneNodeComponent {
    /** 最大押注 */
    public MaxBetValue: Node = null;
    /** 赢得值 */
    public GainValue: Node = null;
    /** 携带值 */
    public OwnValue: Node = null;

    public MaxNode: Node = null;
    public WinNode: Node = null;
    public OwnNode: Node = null;

    uiconfig: DicObject<SloUILoadingAdapterConfig>;
}

@CocosDecorators.SystemRegister()
export class UISloButtomAreaComponentAwakeSystem extends AwakeSystem<UISloButtomAreaComponent> {
    constructor() {
        super(UISloButtomAreaComponent);
    }
    awake(self: UISloButtomAreaComponent, node: Node) {
        self.node = node;
        let rc = self.node.getComponent(CCReferenceCollector);

        self.MaxNode = rc.get("MaxNode");
        self.WinNode = rc.get("WinNode");
        self.OwnNode = rc.get("OwnNode");
        // 倍数
        self.MaxBetValue = rc.get("MaxBetValue");
        let VMLabelCmp = self.MaxBetValue.addComponent(VMLabel);
        VMLabelCmp.watchPathArr = ["slo.mul"];
        VMLabelCmp.templateMode = true;
        self.MaxBetValue.getComponent(Label).string = "X{{0}}";
        // 赢得分数
        self.GainValue = rc.get("GainValue");
        self.GainValue.addComponent(VMLabel).watchPath = "slo.gain_score";
        // 金钱
        self.OwnValue = rc.get("OwnValue");
        self.OwnValue.addComponent(VMLabel).watchPath = "user.base.gold";

        UISloButtomAreaComponentSystem.onDevOrientationChange(self, GlobalComponent.instance.version.PlatformConfig.CurOrientation);
    }
}

export class UISloButtomAreaComponentSystem extends MessageComponentSystem {
    protected static listLocalNotifications(self: UISloButtomAreaComponent): MessageEventType[] {
        return super.listLocalNotifications(self).concat([{ name: SubscibeEvent.DevOrientationChange, callback: FunctionCaller.create(this.onDevOrientationChange, this, self) }]);
    }

    public static onDevOrientationChange(self: UISloButtomAreaComponent, orientation: OrientationId) {
        let a = self.MaxNode.getPosition().x;
        let aW = self.MaxNode.getComponent(UITransform).width;
        let b = self.OwnNode.getPosition().x;
        let bW = self.OwnNode.getComponent(UITransform).width;
        let x = (a + aW + b - bW) / 2;
        self.WinNode.setPosition(math.v3(x, 0, 0));
    }
}
