import { _decorator, Node, Sprite } from 'cc';
import { PopupBaseComponent } from './PopupBaseComponent';
import { FunctionCaller } from '../../../sharing.base/helper/FunctionCaller';
const { ccclass, property } = _decorator;

export enum PopupContentType {
    /** 文本 */
    Text = 1,
    /** 富文本 */
    RichText = 2,
    /** 图片精灵 */
    SpriteFrame = 3,
}

/** 资源弹窗选项类型 */
export type ConfirmPopupOptions = {
    yesHandler: FunctionCaller;
    noHandler?: FunctionCaller;
    type?: PopupContentType;
    value?: string;
    imageAtlas?: string;
};

/**
 * 确认弹框组件
 */
@ccclass('PopupConfirmComponent')
export class PopupConfirmComponent extends PopupBaseComponent {
    /** YES */
    public Yes: Node | null = null;
    /** NO */
    public No: Node | null = null;
    /** 标题图标 */
    public Title: Sprite | null = null;
    /** 信息节点 */
    public Info: Node | null = null;

    get Options() {
        return this.options as ConfirmPopupOptions;
    }
}
