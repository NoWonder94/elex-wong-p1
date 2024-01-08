import { _decorator, Sprite, Node, Label, RichText, SpriteAtlas, SpriteFrame } from "cc";
import { CCButtonComponentScale } from "../../components/CCButtonComponentScale";
import { ConfirmPopupOptions, PopupConfirmComponent, PopupContentType } from "./PopupConfirmComponent";
import { PopupBaseComponentAwakeSystem, PopupBaseComponentSystem } from "./PopupBaseComponentSystem";
import { CocosDecorators } from "../../CocosDecorators";
import { UI } from "../UI";
import { FunctionCaller } from "../../../sharing.base/helper/FunctionCaller";
import CCReferenceCollector from "../../components/CCReferenceCollector";
import { ResourcesComponentSystem } from "../../service/resloader/ResourcesComponentSytem";
import { CCHelper } from "../../helper/CCHelper";

@CocosDecorators.SystemRegister()
export class PopupConfirmComponentAwakeSystem extends PopupBaseComponentAwakeSystem<PopupConfirmComponent> {
    constructor() {
        super(PopupConfirmComponent);
    }

    awake(self: PopupConfirmComponent, options: ConfirmPopupOptions) {
        super.awake(self, options);
        let rc = self.getParent<UI>().node.getComponent(CCReferenceCollector);

        self.Yes = rc.get("CC_Yes");
        self.Yes.active = options.yesHandler ? true : false;
        self.No = rc.get("CC_No");
        self.No.active = options.noHandler ? true : false;

        self.Title = rc.get<Node>("CC_Title").getComponent(Sprite);

        self.Info = rc.get<Node>("CC_Info");

        for (let children of self.getParent<UI>().node.children) {
            children.active = false;
        }

        // 注册按钮事件
        self.Yes.addComponent(CCButtonComponentScale).setClickHandler(FunctionCaller.create(PopupConfirmComponentSystem.onYes, PopupConfirmComponentSystem, self));
        self.No.addComponent(CCButtonComponentScale).setClickHandler(FunctionCaller.create(PopupConfirmComponentSystem.onNo, PopupConfirmComponentSystem, self));

        PopupConfirmComponentSystem.setInfo(self, options);
    }
}

export class PopupConfirmComponentSystem extends PopupBaseComponentSystem {
    /**
     * 确认
     */
    public static onYes(self: PopupConfirmComponent) {
        self.Options.yesHandler && self.Options.yesHandler.exec();
        this.hide(self);
    }

    /**
     * 关闭
     */
    public static onNo(self: PopupConfirmComponent) {
        self.Options.noHandler && self.Options.noHandler.exec();
        this.hide(self);
    }

    public static setInfo(self: PopupConfirmComponent, options: ConfirmPopupOptions) {
        switch (options.type) {
            case PopupContentType.RichText:
                this.initRichText(self, options);
                break;
            case PopupContentType.SpriteFrame:
                this.initSpriteFrame(self, options);
                break;
            default:
                this.initText(self, options);
                break;
        }
    }

    public static initText(self: PopupConfirmComponent, options: ConfirmPopupOptions) {
        let textNode = self.Info.getChildByName("Text");
        textNode.getComponent(Label).string = options.value;
        textNode.active = true;
    }

    public static async initRichText(self: PopupConfirmComponent, options: ConfirmPopupOptions) {
        let richTextNode = self.Info.getChildByName("RichText");
        if (options.value) {
            richTextNode.getComponent(RichText).string = options.value;
        }
        if (options.imageAtlas) {
            richTextNode.getComponent(RichText).imageAtlas = await ResourcesComponentSystem.loadAsset(options.imageAtlas, SpriteAtlas);
        }
        richTextNode.active = true;
    }

    public static async initSpriteFrame(self: PopupConfirmComponent, options: ConfirmPopupOptions) {
        let imageTextNode = self.getParent<UI>().node.getChildByName("ImageText");
        if (options.value) {
            imageTextNode.getComponent(Sprite).spriteFrame = await ResourcesComponentSystem.loadAsset(options.value, SpriteFrame);
        }
        CCHelper.maxScaleNode(imageTextNode);
        imageTextNode.active = true;
    }
}
