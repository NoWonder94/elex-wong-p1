import { Label, Node, Widget, Button, color, EventHandler } from "cc";
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
import { GlobalComponent } from "../../../../../../cocos.framework/module/global/GlobalComponent";
import { CCButtonComponentScale } from "../../../../../../cocos.framework/components/CCButtonComponentScale";
import { CCButtonComponent } from "../../../../../../cocos.framework/components/CCButtonComponent";
import { SoundComponentSystem } from "../../../../../../cocos.framework/module/sound/SoundComponentSystem";
import VMState, { VM_ACTION } from "../../../../../../cocos.framework/components/mvvm/VMState";
import { BOOLEAN } from "../../../../../../sharing.base/consts";
import { const_string_lang_model } from "../../../../../../../scripts/config_getter/const_string_lang_model";
import { CCHelper } from "../../../../../../cocos.framework/helper/CCHelper";
import VMLabel from "../../../../../../cocos.framework/components/mvvm/VMLabel";
import CCButtonGroup from "../../../../../../cocos.framework/components/CCButtonGroup";
import { OpenMarkPage } from "./SloStructDefine";
import { UISloMachineComponent } from "./UISloMachineComponent";
import { CCPageView } from "../../../../../../cocos.framework/components/CCPageView";
import CCSwitchPage from "../../../../../../cocos.framework/components/CCSwitchPage";
import { UISloOperateComponent } from "./UISloOperateComponent";
import { EventComponentSystem } from "../../../../../../cocos.framework/module/event/EventComponentSystem";
import { EventComponent } from "../../../../../../cocos.framework/module/event/EventComponent";
import { SloMachineEvent } from "./SloMachineEvent";
import CCFrameIndex from "../../../../../../cocos.framework/components/CCFrameIndex";
import { CCI18nLabelString } from "../../../../../../cocos.framework/components/I18n/CCI18nLabelString";
import VMModify from "../../../../../../cocos.framework/components/mvvm/VMModify";

@CocosDecorators.ClassNameRegister("UISloUIHelpComponent")
export class UISloUIHelpComponent extends SceneNodeComponent {
    /** 标题 */
    public CC_Title0: Node = null;

    /** 货币单位描述 */
    public CC_BoxDes: Label = null;
    /** 单词游戏不超过值 */
    public CC_BoxValue: Label = null;

    /** 按钮组-1 */
    public CC_Btns1: Node = null;
    /** 按钮组-3-1 */
    public CC_Btns3_1: Node = null;
    /** 按钮组-3-2 */
    public CC_Btns3_2: Node = null;
    /** 按钮组-4 */
    public CC_Btns4: Node = null;

    public CC_BoxAdd: Node = null;
    public CC_BoxDel: Node = null;

    /** 音乐 */
    public CC_SetSoundBtn: Node = null;
    /** 音效 */
    public CC_SetEffectBtn: Node = null;

    /** 开始游戏 */
    public CC_StartGameBtn: Node = null;

    /** 赔付表 */
    public CC_HelpBtn: Node = null;
    /** 设置 */
    public CC_SettingBtn: Node = null;
    /** 关闭 */
    public CC_ClsoeBtn: Node = null;

    public CC_PageView: Node = null;

    public showPage(index: OpenMarkPage) {
        let parent = this.getParent<UISloOperateComponent>();
        let parent2 = parent.getParent<UISloMachineComponent>();
        switch (index) {
            case OpenMarkPage.AutoSettingPage:
                this.node.active = true;
                this.CC_PageView.getComponent(CCSwitchPage).index = OpenMarkPage.AutoSettingPage;
                CCHelper.setLanguageResId(this.CC_Title0, const_string_lang_model.FIELDS.GAME_SETTING);
                this.CC_HelpBtn.active = false;
                this.CC_SettingBtn.active = false;
                break;
            case OpenMarkPage.SettingPage:
                this.node.active = true;
                this.CC_PageView.getComponent(CCSwitchPage).index = OpenMarkPage.SettingPage;
                CCHelper.setLanguageResId(this.CC_Title0, const_string_lang_model.FIELDS.GAME_CURRENCY_SETTING);
                this.CC_HelpBtn.active = true;
                this.CC_SettingBtn.active = true;
                break;
            case OpenMarkPage.RecordPage:
                this.node.active = true;
                this.CC_PageView.getComponent(CCSwitchPage).index = OpenMarkPage.RecordPage;
                CCHelper.setLanguageResId(this.CC_Title0, const_string_lang_model.FIELDS.GAME_PAID_TABLE);
                this.CC_HelpBtn.active = true;
                this.CC_SettingBtn.active = true;
                break;
            case OpenMarkPage.HidePage:
                this.node.active = false;
        }
        parent2.sloModel.open_page = index;
    }

    /** 开始自动游戏 */
    public beginGame() {
        let opera = this.getParent<UISloOperateComponent>();
        let parent = opera.getParent<UISloMachineComponent>();

        logger.info("开始自动游戏参数:", parent.sloModel.auto_game_num, parent.sloModel.free_game_num, parent.sloModel.exceed, parent.sloModel.del_index, parent.sloModel.add_index);

        EventComponentSystem.emit(parent.getComponent(EventComponent), SloMachineEvent.MachineOperteAutoSpin, parent);
        if (parent.sloModel.auto_spin == 1) return;

        parent.sloModel.auto_spin = 1;
        parent.autoSpinStopTime = 2;

        logger.info("====进入自动模式", parent.sloModel.auto_spin);

        this.showPage(OpenMarkPage.HidePage);
    }

    /** 按钮激活 */
    btnSetAction(btn: Node, valueA: number, path: string) {
        btn.addComponent(VMNode);
        let btnState = btn.addComponent(VMState);
        btnState.valueA = valueA;
        btnState.valueAction = VM_ACTION.COMPONENT_CUSTOM;
        btnState.watchPath = path;
        btnState.valueComponentName = "VMNode";
        btnState.valueComponentProperty = "indexSpriteFrame";
        btnState.valueComponentDefaultValue = 0;
        btnState.valueComponentActionValue = 1;
        // 文字
        let valueNode = btn.getChildByName("value");
        valueNode.addComponent(VMNode);
        let labelState = valueNode.addComponent(VMState);
        labelState.valueA = valueA;
        labelState.valueAction = VM_ACTION.COMPONENT_CUSTOM;
        labelState.watchPath = path;
        labelState.valueComponentName = "VMNode";
        labelState.valueComponentProperty = "updataLabelColor";
        labelState.valueComponentDefaultValue = color(255, 255, 255);
        labelState.valueComponentActionValue = color(255, 252, 3);
    }

    /** 单次游戏赢得不超过 */
    public setBetSelect() {
        let opera = this.getParent<UISloOperateComponent>();
        let parent = opera.getParent<UISloMachineComponent>();
        // let totalBetSubVMModify = this.CC_BoxDel.addComponent(VMModify);
        // totalBetSubVMModify.watchPath = "slo.bet_index";
        // totalBetSubVMModify.valueClamp = true;
        // totalBetSubVMModify.valueMin = 0;
        // totalBetSubVMModify.valueMax = parent.sloModel.config.bets.length - 1;
        this.CC_BoxDel.addComponent(CCButtonComponentScale).setClickHandler(
            FunctionCaller.create(
                () => {
                    this.CC_BoxValue.string = "" + parent.sloModel.exceed--;
                },
                this,
                -1
            )
        );

        // let totalBetAddVMModify = this.CC_BoxAdd.addComponent(VMModify);
        // totalBetAddVMModify.watchPath = "slo.bet_index";
        // totalBetAddVMModify.valueClamp = true;
        // totalBetAddVMModify.valueMin = 0;
        // totalBetAddVMModify.valueMax = parent.sloModel.config.bets.length - 1;
        this.CC_BoxAdd.addComponent(CCButtonComponentScale).setClickHandler(
            FunctionCaller.create(
                () => {
                    this.CC_BoxValue.string = "" + parent.sloModel.exceed++;
                },
                this,
                1
            )
        );
    }
}

@CocosDecorators.SystemRegister()
export class UISloUIHelpComponentAwakeSystem extends AwakeSystem<UISloUIHelpComponent> {
    constructor() {
        super(UISloUIHelpComponent);
    }
    awake(self: UISloUIHelpComponent, node: Node) {
        self.node = node;
        let rc = self.node.getComponent(CCReferenceCollector);

        let opera = self.getParent<UISloOperateComponent>();
        let parent = opera.getParent<UISloMachineComponent>();

        ///// 翻译 /////
        CCHelper.setLanguageResId(rc.get<Node>("CC_SetSoundStr"), const_string_lang_model.FIELDS.GAME_MUSIC);
        CCHelper.setLanguageResId(rc.get<Node>("CC_SetEffectStr"), const_string_lang_model.FIELDS.GAME_EFFECT);
        CCHelper.setLanguageResId(rc.get<Node>("CC_StartGameStr"), const_string_lang_model.FIELDS.SLO_LOADING_STATUS_CONTINUE);
        CCHelper.setLanguageResId(rc.get<Node>("CC_Title1"), const_string_lang_model.FIELDS.GAME_1);
        CCHelper.setLanguageResId(rc.get<Node>("CC_Title2"), const_string_lang_model.FIELDS.GAME_2);
        CCHelper.setLanguageResId(rc.get<Node>("CC_Title3_1"), const_string_lang_model.FIELDS.GAME_3);
        CCHelper.setLanguageResId(rc.get<Node>("CC_Title3_2"), const_string_lang_model.FIELDS.GAME_4);
        CCHelper.setLanguageResId(rc.get<Node>("CC_Title4"), const_string_lang_model.FIELDS.GAME_5);

        self.CC_Title0 = rc.get<Node>("CC_Title0");
        self.CC_PageView = rc.get<Node>("CC_PageView");

        self.CC_BoxDel = rc.get<Node>("CC_BoxDel");
        self.CC_BoxAdd = rc.get<Node>("CC_BoxAdd");
        self.setBetSelect();

        self.CC_BoxDes = rc.get("CC_BoxDes", Label);

        self.CC_BoxValue = rc.get("CC_BoxValue", Label);

        rc.get<Label>("CC_Sprce_1", Label).string = "€ 99999.99";

        rc.get<Label>("CC_Sprce_2", Label).string = "€ 99999.99";

        // 自动游戏局数
        self.CC_Btns1 = rc.get("CC_Btns1");
        for (let i = 0; i < self.CC_Btns1.children.length; i++) {
            let btn = self.CC_Btns1.children[i];
            if (!parent.sloModel.config.auto_gear[i]) return;
            let valueA = parent.sloModel.config.auto_gear[i];
            if (valueA == -1) {
                btn.getChildByName("value").getComponent(Label).string = "∞";
            } else {
                btn.getChildByName("value").getComponent(Label).string = valueA + "";
            }
            btn.addComponent(CCButtonComponent).setClickHandler(
                FunctionCaller.create(() => {
                    parent.sloModel.auto_game_num = valueA;
                }, self)
            );
            self.btnSetAction(btn, valueA, "slo.auto_game_num");
        }

        // 减少下线
        self.CC_Btns3_1 = rc.get("CC_Btns3_1");
        for (let i = 0; i < self.CC_Btns3_1.children.length; i++) {
            let btn = self.CC_Btns3_1.children[i];
            if (!parent.sloModel.config.del_gear[i]) return;
            let valueA = parent.sloModel.config.del_gear[i];
            btn.getChildByName("value").getComponent(Label).string = valueA + "%";
            btn.addComponent(CCButtonComponent).setClickHandler(
                FunctionCaller.create(() => {
                    parent.sloModel.del_index = valueA;
                }, self)
            );
            self.btnSetAction(btn, valueA, "slo.del_index");
        }

        // 增加上线
        self.CC_Btns3_2 = rc.get("CC_Btns3_2");
        for (let i = 0; i < self.CC_Btns3_2.children.length; i++) {
            let btn = self.CC_Btns3_2.children[i];
            if (!parent.sloModel.config.add_gear[i]) return;
            let valueA = parent.sloModel.config.add_gear[i];
            btn.getChildByName("value").getComponent(Label).string = valueA + "%";
            btn.addComponent(CCButtonComponent).setClickHandler(
                FunctionCaller.create(() => {
                    parent.sloModel.add_index = valueA;
                }, self)
            );
            self.btnSetAction(btn, valueA, "slo.add_index");
        }

        // 免费游戏自动次数
        self.CC_Btns4 = rc.get("CC_Btns4");
        for (let i = 0; i < self.CC_Btns4.children.length; i++) {
            let btn = self.CC_Btns4.children[i];
            if (!parent.sloModel.config.free_gear[i]) return;
            let valueA = parent.sloModel.config.free_gear[i];
            btn.getChildByName("value").getComponent(Label).string = valueA + "";
            btn.addComponent(CCButtonComponent).setClickHandler(
                FunctionCaller.create(() => {
                    parent.sloModel.free_game_num = valueA;
                }, self)
            );
            self.btnSetAction(btn, valueA, "slo.free_game_num");
        }

        // 关闭
        self.CC_ClsoeBtn = rc.get<Node>("CC_ClsoeBtn");
        self.CC_ClsoeBtn.addComponent(CCButtonComponentScale).setClickHandler(
            FunctionCaller.create(() => {
                self.showPage(OpenMarkPage.HidePage);
            }, this)
        );

        // 开始按钮
        self.CC_StartGameBtn = rc.get<Node>("CC_StartGameBtn");
        let startBtnVMState = self.CC_StartGameBtn.addComponent(VMState);
        startBtnVMState.valueAction = VM_ACTION.NODE_VISIBLE;
        startBtnVMState.valueA = OpenMarkPage.AutoSettingPage;
        startBtnVMState.watchPath = "slo.open_page";
        self.CC_StartGameBtn.addComponent(CCButtonComponentScale).setClickHandler(
            FunctionCaller.create(() => {
                self.beginGame();
            }, this)
        );

        // 赔付表按钮
        self.CC_HelpBtn = rc.get<Node>("CC_HelpBtn");
        let helpBtnVMState = self.CC_HelpBtn.addComponent(VMState);
        helpBtnVMState.valueAction = VM_ACTION.NODE_COLOR;
        helpBtnVMState.valueA = OpenMarkPage.RecordPage;
        helpBtnVMState.watchPath = "slo.open_page";
        helpBtnVMState.valueActionColor = color(255, 252, 3);
        self.CC_HelpBtn.addComponent(CCButtonComponentScale).setClickHandler(
            FunctionCaller.create(() => {
                self.showPage(OpenMarkPage.RecordPage);
            }, this)
        );

        // 设置按钮
        self.CC_SettingBtn = rc.get<Node>("CC_SettingBtn");
        let settingBtnVMState = self.CC_SettingBtn.addComponent(VMState);
        settingBtnVMState.valueAction = VM_ACTION.NODE_COLOR;
        settingBtnVMState.valueA = OpenMarkPage.SettingPage;
        settingBtnVMState.watchPath = "slo.open_page";
        settingBtnVMState.valueActionColor = color(255, 252, 3);
        self.CC_SettingBtn.addComponent(CCButtonComponentScale).setClickHandler(
            FunctionCaller.create(() => {
                self.showPage(OpenMarkPage.SettingPage);
            }, this)
        );

        // 音乐
        self.CC_SetSoundBtn = rc.get("CC_SetSoundBtn");
        self.CC_SetSoundBtn.addComponent(CCButtonComponent).addClickHandler(FunctionCaller.create(SoundComponentSystem.switchMusicMute, SoundComponentSystem));
        self.CC_SetSoundBtn.addComponent(VMNode);
        let soundCheckBoxVMState = self.CC_SetSoundBtn.addComponent(VMState);
        soundCheckBoxVMState.valueA = BOOLEAN.FALSE;
        soundCheckBoxVMState.valueAction = VM_ACTION.COMPONENT_CUSTOM;
        soundCheckBoxVMState.watchPath = "sound.music_mute";
        soundCheckBoxVMState.valueComponentName = "VMNode";
        soundCheckBoxVMState.valueComponentProperty = "indexSpriteFrame";
        soundCheckBoxVMState.valueComponentDefaultValue = BOOLEAN.FALSE;
        soundCheckBoxVMState.valueComponentActionValue = BOOLEAN.TRUE;

        // 音效
        self.CC_SetEffectBtn = rc.get("CC_SetEffectBtn");
        self.CC_SetEffectBtn.addComponent(CCButtonComponent).addClickHandler(FunctionCaller.create(SoundComponentSystem.switchEffectMute, SoundComponentSystem));
        self.CC_SetEffectBtn.addComponent(VMNode);
        let effectCheckBoxVMState = self.CC_SetEffectBtn.addComponent(VMState);
        effectCheckBoxVMState.valueA = BOOLEAN.FALSE;
        effectCheckBoxVMState.valueAction = VM_ACTION.COMPONENT_CUSTOM;
        effectCheckBoxVMState.watchPath = "sound.effect_mute";
        effectCheckBoxVMState.valueComponentName = "VMNode";
        effectCheckBoxVMState.valueComponentProperty = "indexSpriteFrame";
        effectCheckBoxVMState.valueComponentDefaultValue = BOOLEAN.FALSE;
        effectCheckBoxVMState.valueComponentActionValue = BOOLEAN.TRUE;

        UISloUIHelpComponentSystem.onDevOrientationChange(self, GlobalComponent.instance.version.PlatformConfig.CurOrientation);
    }
}

export class UISloUIHelpComponentSystem extends MessageComponentSystem {
    protected static listLocalNotifications(self: UISloUIHelpComponent): MessageEventType[] {
        return super.listLocalNotifications(self).concat([{ name: SubscibeEvent.DevOrientationChange, callback: FunctionCaller.create(this.onDevOrientationChange, this, self) }]);
    }

    /** 适配 */
    public static onDevOrientationChange(self: UISloUIHelpComponent, orientation: OrientationId) {
        const widgets = self.node.getComponentsInChildren(Widget);
        for (let i = 0; i < widgets.length; i++) {
            widgets[i].updateAlignment();
        }
    }
}
