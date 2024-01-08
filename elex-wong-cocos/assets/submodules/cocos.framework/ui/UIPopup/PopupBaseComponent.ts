import { _decorator, Node, math, UIOpacity, tween, BlockInputEvents, UITransform } from 'cc';
import { MessageComponent } from '../../service/message/MessageComponent';
const { ccclass, property } = _decorator;

/**
 * 弹窗基类
 */
@ccclass('PopupBaseComponent')
export class PopupBaseComponent extends MessageComponent {
    /** 背景遮罩 */
    public BackgroundMask: Node | null = null;

    /** 背景透明度 */
    public maskOpacity: number = 200;

    /** mask 透明度 */
    public maskNode: Node | null = null;

    /** mask 透明度 */
    public mask2Opacity: number = 120;

    /** 弹窗主体 */
    public Main: Node | null = null;

    /** 展示/隐藏动画的时长 */
    public animDuration: number = 0.3;

    /** 用于拦截点击的节点 */
    public blocker: Node = null;

    /** 弹窗选项 */
    public options: any = null;

    /** 弹窗流程结束回调（注意：该回调为 PopupManagerComponent 专用，重写 hide 函数时记得调用该回调） */
    public finishCallback: (suspended: boolean) => void = null;
}
