import { math, tween, UIOpacity, Node, UITransform, BlockInputEvents, v3 } from 'cc';
import { AwakeSystem } from '../../../sharing.base/core/object/IAwakeSystem';
import CCReferenceCollector from '../../components/CCReferenceCollector';
import { MessageComponentSystem } from '../../service/message/MessageComponentSystem';
import { UI } from '../UI';
import { PopupBaseComponent } from './PopupBaseComponent';

export class PopupBaseComponentAwakeSystem<T extends PopupBaseComponent> extends AwakeSystem<T> {
    constructor(CLASS: new () => T) {
        super(CLASS);
    }

    awake(self: T, options: any) {
        PopupBaseComponentSystem.awake(self, options);
    }
}

export class PopupBaseComponentSystem extends MessageComponentSystem {
    public static awake(self: PopupBaseComponent, options: any) {
        let rc = self.getParent<UI>().node.getComponent(CCReferenceCollector);
        self.BackgroundMask = rc.get('CC_BackgroundMask');
        // self.BackgroundMask.eulerAngles = v3(0, 0, -180);
        self.Main = rc.get('CC_Main');
        // 储存选项
        self.options = options;
        // mask
        if (rc.get('CC_Mask')) {
            self.maskNode = rc.get('CC_Mask');
            self.maskNode.getComponent(UIOpacity).opacity = self.mask2Opacity;
        }
    }

    /**
     * 展示弹窗
     * @param options 弹窗选项
     * @param duration 动画时长
     */
    public static show(self: PopupBaseComponent, duration: number = self.animDuration) {
        return new Promise<void>((resolve) => {
            // 重置节点
            self.BackgroundMask.getComponent(UIOpacity).opacity = 0;
            self.BackgroundMask.active = true;
            self.Main.scale = math.v3(0, 0, 0);
            self.Main.active = true;
            self.getParent<UI>().node.active = true;
            // 初始化
            this.init(self, self.options);
            // 更新样式
            this.updateDisplay(self.options);
            // 播放背景动画
            tween(self.BackgroundMask.getComponent(UIOpacity))
                .to(duration * 0.8, { opacity: self.maskOpacity })
                .call(() => {
                    console.log(self.BackgroundMask.getComponent(UIOpacity).opacity);
                })
                .start();

            // 播放主体动画
            tween(self.Main)
                .to(duration, { scale: math.v3(1, 1, 1) }, { easing: 'backOut' })
                .call(() => {
                    // 弹窗已完全展示（动画完毕）
                    this.onShow && this.onShow(self);
                    // Done
                    resolve();
                })
                .start();
        });
    }

    /**
     * 隐藏弹窗
     * @param suspended 是否被挂起
     * @param duration 动画时长
     */
    public static hide(self: PopupBaseComponent, suspended: boolean = false, duration: number = self.animDuration) {
        return new Promise<void>((resolve) => {
            let node = self.getParent<UI>().node;
            // 拦截点击事件
            if (!self.blocker) {
                self.blocker = new Node('blocker');
                let blockerUITransform = self.blocker.addComponent(UITransform);
                self.blocker.addComponent(BlockInputEvents);
                self.blocker.setParent(node);
                blockerUITransform.setContentSize(node.getComponent(UITransform).contentSize);
            }
            self.blocker.active = true;
            // 播放背景动画
            tween(self.BackgroundMask.getComponent(UIOpacity))
                .delay(duration * 0.2)
                .to(duration * 0.8, { opacity: 0 })
                .call(() => {
                    self.BackgroundMask.active = false;
                })
                .start();
            // 播放主体动画
            tween(self.Main)
                .to(duration, { scale: math.v3(0, 0, 0) }, { easing: 'backIn' })
                .call(() => {
                    // 取消拦截
                    self.blocker.active = false;
                    // 关闭节点
                    self.Main.active = false;
                    node.active = false;
                    // 弹窗已完全隐藏（动画完毕）
                    this.onHide && this.onHide(self, suspended);
                    // Done
                    resolve();
                    // 弹窗完成回调（该回调为 PopupManagerComponent 专用）
                    // 注意：重写 hide 函数时记得调用该回调
                    self.finishCallback && self.finishCallback(suspended);
                })
                .start();
        });
    }

    /**
     * 初始化（子类请重写此函数以实现自定义逻辑）
     */
    protected static init(self: PopupBaseComponent, options: any): void {}

    /**
     * 更新样式（子类请重写此函数以实现自定义样式）
     * @param options 弹窗选项
     */
    protected static updateDisplay(options: any) {}

    /**
     * 弹窗已完全展示（派生类请重写此函数以实现自定义逻辑）
     */
    protected static onShow(self: PopupBaseComponent) {}

    /**
     * 弹窗已完全隐藏（派生类请重写此函数以实现自定义逻辑）
     * @param suspended 是否被挂起
     */
    protected static onHide(self: PopupBaseComponent, suspended: boolean) {}

    /**
     * 设置弹窗完成回调（该回调为 PopupManagerComponent 专用）
     * @param callback 回调
     */
    public static setFinishCallback(self: PopupBaseComponent, callback: (suspended: boolean) => void): void {
        self.finishCallback = callback;
    }
}
