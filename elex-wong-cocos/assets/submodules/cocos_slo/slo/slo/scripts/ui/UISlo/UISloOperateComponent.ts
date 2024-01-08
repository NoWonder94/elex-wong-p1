import { Label, Node, screen, game, dragonBones, math, Sprite, Color, color } from "cc";
import { AwakeSystem } from "../../../../../../sharing.base/core/object/IAwakeSystem";
import { FunctionCaller } from "../../../../../../sharing.base/helper/FunctionCaller";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import { CCButtonComponent } from "../../../../../../cocos.framework/components/CCButtonComponent";
import { CCButtonComponentScale } from "../../../../../../cocos.framework/components/CCButtonComponentScale";
import CCReferenceCollector from "../../../../../../cocos.framework/components/CCReferenceCollector";
import VMLabel from "../../../../../../cocos.framework/components/mvvm/VMLabel";
import VMModify from "../../../../../../cocos.framework/components/mvvm/VMModify";
import VMState, { VM_ACTION } from "../../../../../../cocos.framework/components/mvvm/VMState";
import { CCHelper } from "../../../../../../cocos.framework/helper/CCHelper";
import { EventComponent } from "../../../../../../cocos.framework/module/event/EventComponent";
import { EventComponentSystem } from "../../../../../../cocos.framework/module/event/EventComponentSystem";
import { SceneNodeComponent } from "../../../../../../cocos.framework/module/scene/SceneNodeComponent";
import { ResourcesComponentSystem } from "../../../../../../cocos.framework/module/resloader/ResourcesComponentSytem";
import { SloMachineEvent } from "./SloMachineEvent";
import { UISloMachineComponent } from "./UISloMachineComponent";
import { SloModel } from "./SloModel";
import CCList from "../../../../../../cocos.framework/components/list/CCList";
import { OpenMarkPage } from "./SloStructDefine";
import { slo_base_config_model } from "../../../../../../../scripts/config_getter/slo_base_config_model";
import { UISloUIHelpComponent } from "./UISloUIHelpComponent";
import { MessageComponentSystem } from "../../../../../../cocos.framework/module/message/MessageComponentSystem";
import { MessageEventType } from "../../../../../../cocos.framework/module/message/MessageComponent";
import { SubscibeEvent } from "../../../../../../cocos.framework/SubscibeEvent";
import { OrientationId } from "../../../../../../cocos.framework/config";
import CCFrameIndex from "../../../../../../cocos.framework/components/CCFrameIndex";
import VMNode from "../../../../../../cocos.framework/components/mvvm/VMNode";
import { BOOLEAN } from "../../../../../../sharing.base/consts";
import { UserModel } from "../../model/UserModel";
import { VM } from "../../../../../../cocos.framework/components/mvvm/ViewModel";

@CocosDecorators.ClassNameRegister("UISloOperateComponent")
export class UISloOperateComponent extends SceneNodeComponent {
    /** 开始按钮节点 */
    public StartBtnNode: Node = null;
    /** 自动按钮节点 */
    public AutoSpin: Node = null;
    /** 快速按钮节点 */
    public FastSpin: Node = null;
    /** 目录按钮节点 */
    public MenuBtnNode: Node = null;
    /** 押注挡位减操作 */
    public TotalBetSub: Node = null;
    /** 押注挡位加操作 */
    public TotalBetAdd: Node = null;
    // 剩余自动次数
    public AutoNumber: Node = null;

    /** 总投注 */
    public TotalBetValue: Node = null;
    /** 兑换值 */
    public BTCvalueValue: Node = null;

    /** 选择货币按钮节点 */
    public BillOtherBtnNode: Node = null;
    /** 货币列表 */
    public BillListNodeNode: Node = null;

    /** 朋友 */
    public FriendBtnNode: Node = null;
    /** 好友列表 */
    public FriendListNodeNode: Node = null;

    /** 下注区域 */
    public BetChoiceNode: Node = null;
    /** 货币选择区 */
    public BillChoiceNode: Node = null;

    public userModel: UserModel;

    public initUI() {
        this.FriendBtnNode.getChildByName("icon").angle = 180; // 收起
        this.BillOtherBtnNode.angle = 180;
        this.FriendListNodeNode.active = false;
        this.BillListNodeNode.active = false;
    }

    startGame() {
        let parent = this.getParent<UISloMachineComponent>();
        EventComponentSystem.emit(parent.getComponent(EventComponent), SloMachineEvent.MachineOperteSpin);
    }

    menuGame() {
        this.getComponent(UISloUIHelpComponent).showPage(OpenMarkPage.SettingPage);
    }

    autoGame() {
        let parent = this.getParent<UISloMachineComponent>();
        if (parent.sloModel.auto_spin == 0) {
            this.getComponent(UISloUIHelpComponent).showPage(OpenMarkPage.AutoSettingPage);
        } else {
            EventComponentSystem.emit(parent.getComponent(EventComponent), SloMachineEvent.MachineOperteExitAutoSpin);
            parent.sloModel.auto_game_num = parent.sloModel.config.auto_gear[0];
            parent.sloModel.auto_spin = 0;
        }
    }

    fastGame() {
        let parent = this.getParent<UISloMachineComponent>();
        parent.sloModel.spin_speed == 1 ? (parent.sloModel.spin_speed = 2) : (parent.sloModel.spin_speed = 1);
    }

    friendShow() {
        if (this.FriendBtnNode.getChildByName("icon").angle == 0) {
            this.FriendBtnNode.getChildByName("icon").angle = 180;
            this.FriendListNodeNode.active = false;
        } else {
            this.FriendBtnNode.getChildByName("icon").angle = 0;
            this.FriendListNodeNode.active = true;

            let list = this.FriendListNodeNode.getComponent(CCList);
            list.numItems = 20;
            list.setRenderEvent(FunctionCaller.create(this.onFriendListRender, this));
            list.updateAll();
        }
    }

    billShow() {
        if (this.BillOtherBtnNode.angle == 0) {
            this.BillOtherBtnNode.angle = 180; // 收起
            this.BillListNodeNode.active = false;
        } else {
            this.BillOtherBtnNode.angle = 0; // 展示
            this.BillListNodeNode.active = true;
            // 数据
            let list = this.BillListNodeNode.getComponent(CCList);
            list.numItems = this.userModel.base.coins.length;
            list.setRenderEvent(FunctionCaller.create(this.onBillListRender, this));
            list.updateAll();
        }
    }

    onFriendListRender(item: Node, idx: number) { }

    onBillListRender(item: Node, idx: number) {
        let rc = item.getComponent(CCReferenceCollector);

        let coin = this.userModel.base.coins[idx];
        let user_icon = rc.get("user_icon");
        let user_name = rc.get<Node>("user_name");
        user_name.getComponent(Label).string = new BigNumber(coin.quantity).toFormat();
    }

    /** 押注挡位选择 */
    public setBetSelect() {
        let parent = this.getParent<UISloMachineComponent>();
        let totalBetSubVMModify = this.TotalBetSub.addComponent(VMModify);
        totalBetSubVMModify.watchPath = "slo.bet_index";
        totalBetSubVMModify.valueClamp = true;
        totalBetSubVMModify.valueMin = 0;
        totalBetSubVMModify.valueMax = parent.sloModel.config.bets.length - 1;
        this.TotalBetSub.addComponent(CCButtonComponentScale).setClickHandler(
            FunctionCaller.create(
                (data: any, event: any) => {
                    totalBetSubVMModify.vAddInt(event, data);
                },
                this,
                -1
            )
        );

        let totalBetAddVMModify = this.TotalBetAdd.addComponent(VMModify);
        totalBetAddVMModify.watchPath = "slo.bet_index";
        totalBetAddVMModify.valueClamp = true;
        totalBetAddVMModify.valueMin = 0;
        totalBetAddVMModify.valueMax = parent.sloModel.config.bets.length - 1;
        this.TotalBetAdd.addComponent(CCButtonComponentScale).setClickHandler(
            FunctionCaller.create(
                (data: any, event: any) => {
                    totalBetAddVMModify.vAddInt(event, data);
                },
                this,
                1
            )
        );
    }

    /** 是否显示操作按钮 */
    public async doRotate(bSping: boolean) {
        let parent = this.getParent<UISloMachineComponent>();
        this.MenuBtnNode.active = bSping;
        this.BetChoiceNode.active = bSping;
        this.BillChoiceNode.active = bSping;
        if (parent.sloModel.auto_spin == 1) {
            this.AutoSpin.active = true;
        } else {
            this.AutoSpin.active = bSping;
        }

        return this;
    }
}

@CocosDecorators.SystemRegister()
export class UISloOperateComponentAwakeSystem extends AwakeSystem<UISloOperateComponent> {
    constructor() {
        super(UISloOperateComponent);
    }
    awake(self: UISloOperateComponent, node: Node) {
        self.node = node;
        let rc = node.getComponent(CCReferenceCollector);

        self.userModel = VM.get<UserModel>(UserModel.name).$data;

        self.addComponent(UISloUIHelpComponent, rc.get("UIHelp"));

        let parent = self.getParent<UISloMachineComponent>();

        // 汇率
        self.BillOtherBtnNode = rc.get<Node>("BillOtherBtn");
        self.BillOtherBtnNode.addComponent(CCButtonComponentScale).addClickHandler(FunctionCaller.create(self.billShow, self));
        self.BillChoiceNode = rc.get("BillChoiceNode");
        self.BillListNodeNode = rc.get("BillListNode");
        self.BTCvalueValue = rc.get("BTCvalueValue");

        self.BTCvalueValue.addComponent(VMLabel).watchPath = "slo.use_coin_value";
        // self.BillListNodeNode.getComponent(CCList).numItems = 20;

        // 好友
        self.FriendBtnNode = rc.get<Node>("FriendBtn");
        self.FriendBtnNode.addComponent(CCButtonComponentScale).addClickHandler(FunctionCaller.create(self.friendShow, self));
        self.FriendListNodeNode = rc.get("FriendListNode");

        // 开始按钮
        self.StartBtnNode = rc.get<Node>("StartBtn");
        self.StartBtnNode.addComponent(CCButtonComponentScale).addClickHandler(FunctionCaller.create(self.startGame, self));

        // 目录按钮
        self.MenuBtnNode = rc.get<Node>("Menu");
        self.MenuBtnNode.addComponent(CCButtonComponentScale).addClickHandler(FunctionCaller.create(self.menuGame, self));

        // 快速按钮
        self.FastSpin = rc.get<Node>("FastSpin");
        self.FastSpin.addComponent(CCButtonComponentScale).addClickHandler(FunctionCaller.create(self.fastGame, self));
        let fastVMState = self.FastSpin.addComponent(VMState);
        fastVMState.valueAction = VM_ACTION.NODE_COLOR;
        fastVMState.valueA = 2;
        fastVMState.watchPath = "slo.spin_speed";
        fastVMState.valueActionColor = color(255, 252, 3);

        // 自动按钮
        self.AutoSpin = rc.get<Node>("AutoSpin");
        self.AutoSpin.addComponent(CCButtonComponentScale).addClickHandler(FunctionCaller.create(self.autoGame, self));
        self.AutoSpin.addComponent(VMNode);
        let autoVMState = self.AutoSpin.addComponent(VMState);
        autoVMState.valueA = 1;
        autoVMState.valueAction = VM_ACTION.COMPONENT_CUSTOM;
        autoVMState.watchPath = "slo.auto_spin";
        autoVMState.valueComponentName = "VMNode";
        autoVMState.valueComponentProperty = "indexSpriteFrame";
        autoVMState.valueComponentDefaultValue = 0;
        autoVMState.valueComponentActionValue = 1;

        // 自动次数
        self.AutoNumber = rc.get<Node>("CC_AutoNumber");
        let fastLabelVMState = self.AutoNumber.addComponent(VMState);
        fastLabelVMState.valueAction = VM_ACTION.NODE_ACTIVE;
        fastLabelVMState.valueA = 1;
        fastLabelVMState.watchPath = "slo.auto_spin";
        let autoValue = self.AutoNumber.getChildByName("value");
        autoValue.addComponent(VMLabel).watchPath = "slo.auto_game_num";

        // 下注区域
        self.TotalBetSub = rc.get<Node>("TotalBetSub");
        let subBtnVMState = self.TotalBetSub.addComponent(VMState);
        subBtnVMState.valueAction = VM_ACTION.NODE_COLOR;
        subBtnVMState.valueA = parent.sloModel.config.bets[0];
        subBtnVMState.watchPath = "slo.bet";
        subBtnVMState.valueActionColor = color(149, 149, 149);

        self.TotalBetAdd = rc.get<Node>("TotalBetAdd");
        let addBtnVMState = self.TotalBetAdd.addComponent(VMState);
        addBtnVMState.valueAction = VM_ACTION.NODE_COLOR;
        addBtnVMState.valueA = parent.sloModel.config.bets[parent.sloModel.config.bets.length - 1];
        addBtnVMState.watchPath = "slo.bet";
        addBtnVMState.valueActionColor = color(149, 149, 149);

        self.BetChoiceNode = rc.get("BetChoiceNode");
        self.setBetSelect();

        self.TotalBetValue = rc.get("TotalBetValue");
        self.TotalBetValue.addComponent(VMLabel).watchPath = "slo.bet";

        self.initUI();
    }
}
