import { _decorator, Component, view, math } from "cc";
import { SubscibeEvent } from "../SubscibeEvent";
import { EventGlobalComponentSystem } from "../../sharing.base/service/event/EventGlobalComponentSystem";
import { FunctionCaller } from "../../sharing.base/helper/FunctionCaller";

const { ccclass } = _decorator;

/**
 * 背景适配组件
 */
@ccclass("CCBackgroundFitter")
export default class CCBackgroundFitter extends Component {
    protected onLoad() {
        EventGlobalComponentSystem.on(SubscibeEvent.ViewResize, FunctionCaller.create(this.adapt, this));
    }

    protected start() {
        this.adapt();
    }

    protected onDestroy() {
        EventGlobalComponentSystem.off(SubscibeEvent.ViewResize, this.adapt, this);
    }

    /**
     * 适配
     */
    private adapt() {
        let frameSize = view.getFrameSize();
        let screenRatio = frameSize.height / frameSize.width;

        let designResolutionSize = view.getDesignResolutionSize();
        let designRatio = designResolutionSize.height / designResolutionSize.width;

        if (screenRatio >= designRatio) {
            let scale = frameSize.height / designResolutionSize.height;
            this.node.scale = math.v3(scale);
        } else {
            let scale = frameSize.width / designResolutionSize.width;
            this.node.scale = math.v3(scale);
        }
    }
}
