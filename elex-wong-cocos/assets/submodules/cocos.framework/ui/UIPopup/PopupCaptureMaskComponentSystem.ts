import { BlockInputEvents, Material, Node, UITransform } from 'cc';
import { GlobalComponentSystem } from '../../service/global/GlobalComponentSystem';
import { PopupBaseComponent } from './PopupBaseComponent';
import { Sprite, v3 } from 'cc';
import { PopupBaseComponentSystem } from './PopupBaseComponentSystem';
import { UI } from '../UI';
import CCReferenceCollector from '../../components/CCReferenceCollector';

export class PopupCaptureMaskComponentSystem extends PopupBaseComponentSystem {
    public static awake(self: PopupBaseComponent, options: any) {
        self.maskOpacity = 255;
        self.mask2Opacity = 160;
        super.awake(self, options);
        self.BackgroundMask.eulerAngles = v3(0, 180, -180);
        // let rc = self.getParent<UI>().node.getComponent(CCReferenceCollector);
        // rc.getRes<Material>('GaussianBlur_3D_Sprite', Material);
        // self.BackgroundMask.getComponent(Sprite).setMaterial(rc.getRes<Material>('GaussianBlur_3D_Sprite', Material), 0);
    }

    /**
     * 展示弹窗
     * @param options 弹窗选项
     * @param duration 动画时长
     */
    public static async show(self: PopupBaseComponent, duration: number = self.animDuration) {
        // 初始化
        this.init(self, self.options);
        // 更新样式
        this.updateDisplay(self.options);
        // 弹窗已完全展示（动画完毕）
        this.onShow && this.onShow(self);
    }

    /**
     * 隐藏弹窗
     * @param suspended 是否被挂起
     * @param duration 动画时长
     */
    public static async hide(self: PopupBaseComponent, suspended: boolean = false, duration: number = self.animDuration) {
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

        // 取消拦截
        self.blocker.active = false;
        // 关闭节点
        self.Main.active = false;
        node.active = false;
        // 弹窗已完全隐藏（动画完毕）
        this.onHide && this.onHide(self, suspended);

        // 弹窗完成回调（该回调为 PopupManagerComponent 专用）
        // 注意：重写 hide 函数时记得调用该回调
        self.finishCallback && self.finishCallback(suspended);
    }

    protected static init(self: PopupBaseComponent, options: any): void {
        GlobalComponentSystem.inst.captureCamera.startRender(self.BackgroundMask.getComponent(Sprite));
    }

    /**
     * 弹窗已完全隐藏（派生类请重写此函数以实现自定义逻辑）
     * @param suspended 是否被挂起
     */
    protected static onHide(self: PopupBaseComponent, suspended: boolean) {
        GlobalComponentSystem.inst.captureCamera.stopRender();
    }
}
