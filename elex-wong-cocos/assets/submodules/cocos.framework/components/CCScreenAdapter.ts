import { _decorator, Component, view, ResolutionPolicy, macro, } from "cc";
import { SubscibeEvent } from "../SubscibeEvent";
import { OrientationId } from "../config";
import { GlobalComponentSystem } from '../service/global/GlobalComponentSystem';
import { EventGlobalComponentSystem } from '../../sharing.base/service/event/EventGlobalComponentSystem';
const { ccclass } = _decorator;

/**
 * 屏幕适配组件
 */
@ccclass('CCScreenAdapter')
export default class CCScreenAdapter extends Component {

    protected onLoad() {
        view.enableRetina(true);
        view.enableAutoFullScreen(true);
        view.resizeWithBrowserSize(true);

        if (GlobalComponentSystem.envConfig.Orientation == OrientationId.landscape) {
            view.setOrientation(macro.ORIENTATION_LANDSCAPE);
            view.setDesignResolutionSize(GlobalComponentSystem.envConfig.DesignResolutionSize.width, GlobalComponentSystem.envConfig.DesignResolutionSize.height, ResolutionPolicy.FIXED_HEIGHT);
        } else if (GlobalComponentSystem.envConfig.Orientation == OrientationId.portrait) {
            view.setOrientation(macro.ORIENTATION_PORTRAIT);
            view.setDesignResolutionSize(GlobalComponentSystem.envConfig.DesignResolutionSize.width, GlobalComponentSystem.envConfig.DesignResolutionSize.height, ResolutionPolicy.FIXED_WIDTH);
        } else {
            view.setOrientation(macro.ORIENTATION_AUTO);
            let frameSize = view.getFrameSize();
            if (frameSize.width > frameSize.height) {
                // 横屏
                GlobalComponentSystem.envConfig.Orientation = OrientationId.landscape;
                view.setDesignResolutionSize(GlobalComponentSystem.envConfig.DesignResolutionSize.width, GlobalComponentSystem.envConfig.DesignResolutionSize.height, ResolutionPolicy.FIXED_HEIGHT);
            } else {
                // 竖屏
                GlobalComponentSystem.envConfig.Orientation = OrientationId.portrait;
                view.setDesignResolutionSize(GlobalComponentSystem.envConfig.DesignResolutionSize.height, GlobalComponentSystem.envConfig.DesignResolutionSize.width, ResolutionPolicy.FIXED_WIDTH);
            }
        }
        // 设置游戏窗口变化的回调
        view.setResizeCallback(() => this.onResize());
    }

    protected start() {
        // 主动调用一次
        this.adapt();
    }

    /**
     * 游戏窗口变化
     */
    private onResize() {
        // 由于 setResizeCallback 只能设置一个回调
        // 使用事件系统发送一个特定事件，让其他组件也可以监听到窗口变化
        EventGlobalComponentSystem.emit(SubscibeEvent.ViewResize)
        // 适配
        this.adapt();
    }

    /**
     * 适配
     */
    private adapt() {
        let frameSize = view.getFrameSize();
        // 实际屏幕比例
        let screenRatio = frameSize.width / frameSize.height;

        let designResolutionSize = view.getDesignResolutionSize()
        // 设计比例
        let designRatio = designResolutionSize.width / designResolutionSize.height;
        // 判断实际屏幕宽高比
        if (screenRatio <= 1) {
            // 此时屏幕高度大于宽度
            if (screenRatio <= designRatio) {
                this.setFitWidth();
            } else {
                // 此时实际屏幕比例大于设计比例
                // 为了保证纵向的游戏内容不受影响，应使用 fitHeight 模式
                this.setFitHeight();
            }
        } else {
            // 此时屏幕高度小于宽度
            this.setFitHeight();
        }
    }

    /**
     * 适配高度模式
     */
    private setFitHeight() {
        view.setResolutionPolicy(ResolutionPolicy.FIXED_HEIGHT);
    }

    /**
     * 适配宽度模式
     */
    private setFitWidth() {
        view.setResolutionPolicy(ResolutionPolicy.FIXED_WIDTH);
    }

}
