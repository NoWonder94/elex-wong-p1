import { Label, Layout, Node, Prefab, RichText, Sprite, UITransform, instantiate, Vec3, SpriteFrame, EditBox, Widget } from 'cc';
import { CocosDecorators } from "../../CocosDecorators";
import CCReferenceCollector from "../../components/CCReferenceCollector";
import CCList, { TemplateType } from "../../components/list/CCList";
import { UI } from "../UI";
import { ChatPopupOptions, DataPosType, UIChatComponent } from "./UIChatComponent";
import CCListItem from '../../components/list/CCListItem';
import { FunctionCaller } from '../../../sharing.base/helper/FunctionCaller';
import { PopupBaseComponentAwakeSystem, PopupBaseComponentSystem } from '../UIPopup/PopupBaseComponentSystem';
import { CCButtonComponent } from '../../components/CCButtonComponent';
import { StartSystem } from '../../../sharing.base/core/object/IStartSystem';

@CocosDecorators.SystemRegister()
export class UIChatComponentAwakeSystem extends PopupBaseComponentAwakeSystem<UIChatComponent>{
    constructor() {
        super(UIChatComponent);
    }

    public awake(self: UIChatComponent, options: ChatPopupOptions) {
        super.awake(self, options);
        logger.info('UIChatComponentAwakeSystem awake');
        let rc = self.getParent<UI>().node.getComponent(CCReferenceCollector);

        rc.get<Node>('Send').addComponent(CCButtonComponent)
            .setClickHandler(FunctionCaller.create(UIChatComponentSystem.onSendMsg, UIChatComponentSystem, self));

        rc.get<Node>('Emoj').addComponent(CCButtonComponent)
            .setClickHandler(FunctionCaller.create(UIChatComponentSystem.onShowEmoj, UIChatComponentSystem, self));

        self.input = rc.get<Node>('Input').getComponent(EditBox);
        self.list = rc.get<Node>('List').addComponent(CCList);
        self.list.templateType = TemplateType.NODE;

        self.list.frameByFrameRenderNum = 10;

        self.list.tmpNode = rc.get<Node>('ListItem');
        self.itemMinHeight = self.list.tmpNode.getComponent(UITransform).height;
        let itemRc = self.list.tmpNode.getComponent(CCReferenceCollector);

        let richtext: RichText = itemRc.get<Node>('Msg').getComponentInChildren(RichText);
        self.msgRichtextMaxWidth = richtext.maxWidth;

        self.list.tmpNode.addComponent(CCListItem).adaptiveSize = true;

        self.list.setRenderEvent(FunctionCaller.create(UIChatComponentSystem.onListRender, UIChatComponentSystem, self))

        self.datas = options.datas;
    }
}

@CocosDecorators.SystemRegister()
export class UIChatComponentStartSystem extends StartSystem<UIChatComponent>{
    constructor() {
        super(UIChatComponent);
    }

    public start(self: UIChatComponent) {
        self.list.numItems = self.datas.length;
    }
}

export class UIChatComponentSystem extends PopupBaseComponentSystem {

    public static async show(self: UIChatComponent, duration: number = self.animDuration) {
        return;
    }

    public static onListRender(self: UIChatComponent, item: Node, idx: number) {
        let rc = item.getComponent(CCReferenceCollector);

        let itemUITransform: UITransform = item.getComponent(UITransform);

        let timeNode: Node = rc.get('Time');
        let timeLayout: Layout = timeNode.getComponent(Layout);
        let time: Label = timeNode.getComponentInChildren(Label);

        let avatarNode: Node = rc.get('Avatar');
        let avatarSprite: Sprite = avatarNode.getComponentInChildren(Sprite);

        let msgNode: Node = rc.get<Node>('Msg');
        let msgBg: Sprite = msgNode.getComponent(Sprite);
        let msgWidget: Widget = msgNode.getComponent(Widget);

        let msgUITransform: UITransform = msgNode.getComponent(UITransform);

        let msgLayoutV: Layout = null;
        let msgLayoutH: Layout = null;
        let msgLayouts: Layout[] = msgNode.getComponents(Layout);

        for (let item of msgLayouts) {
            if (item.type === 2) {
                msgLayoutV = item;
            } else if (item.type === 1) {
                msgLayoutH = item;
            }
        }

        let richtext: RichText = msgNode.getComponentInChildren(RichText);

        let data = self.datas[idx];

        avatarNode.active = msgNode.active = data.posType != DataPosType.Middle;
        timeNode.active = data.posType == DataPosType.Middle;

        switch (data.posType) {
            case DataPosType.Left:
                let avatarNodeWg = avatarNode.getComponent(Widget);
                avatarNodeWg.isAlignLeft = true;
                avatarNodeWg.isAlignRight = false;
                avatarNodeWg.left = 0;
                avatarNodeWg.updateAlignment();

                avatarSprite.spriteFrame = rc.getRes('head_c_women0', SpriteFrame);
                msgBg.spriteFrame = rc.getRes('chat_bubble_bg_1', SpriteFrame);

                richtext.string = `<color=#030303>${data.content.msg}</c>`;

                if (richtext.node.getComponent(UITransform).width > self.msgRichtextMaxWidth) {
                    richtext.maxWidth = self.msgRichtextMaxWidth;
                } else {
                    richtext.maxWidth = 0;
                }

                msgLayoutV.updateLayout();
                msgLayoutH.paddingLeft = 30;
                msgLayoutH.paddingRight = 20;
                msgLayoutH.updateLayout();

                msgWidget.isAlignLeft = true;
                msgWidget.isAlignRight = false;
                msgWidget.left = avatarNode.getComponent(UITransform).width + 10;
                msgWidget.updateAlignment();

                itemUITransform.height = Math.max(self.itemMinHeight, msgUITransform.height);
                break;
            case DataPosType.Right:
                let avatarNodeWgSelf = avatarNode.getComponent(Widget);
                avatarNodeWgSelf.isAlignRight = true;
                avatarNodeWgSelf.isAlignLeft = false;
                avatarNodeWgSelf.right = 0;
                avatarNodeWgSelf.updateAlignment();

                avatarSprite.spriteFrame = rc.getRes('head_c_women3', SpriteFrame);
                msgBg.spriteFrame = rc.getRes('chat_bubble_bg_2', SpriteFrame);
                richtext.string = `<color=#030303>${data.content.msg}</c>`;

                if (richtext.node.getComponent(UITransform).width > self.msgRichtextMaxWidth) {
                    richtext.maxWidth = self.msgRichtextMaxWidth;
                } else {
                    richtext.maxWidth = 0;
                }

                msgLayoutV.updateLayout();
                msgLayoutH.paddingLeft = 20;
                msgLayoutH.paddingRight = 30;
                msgLayoutH.updateLayout();

                msgWidget.isAlignRight = true;
                msgWidget.isAlignLeft = false;
                msgWidget.right = avatarNode.getComponent(UITransform).width + 10;
                msgWidget.updateAlignment();

                itemUITransform.height = Math.max(self.itemMinHeight, msgUITransform.height);
                break;
            case DataPosType.Middle:
                time.string = data.content.msg;
                itemUITransform.height = self.itemMinHeight * 0.75;
                // 下面这两行，因为3.0.0Preview的缺陷，逼不得已才加的，等到正式版出来，应该就不用了
                time.updateRenderData(true);
                timeLayout['_doLayout']();
                break;
        }
    }

    public static onSendMsg(self: UIChatComponent) {
        logger.info('UIChatComponent send msg=', self.input.string);
    }

    public static onShowEmoj(self: UIChatComponent) {

    }
}