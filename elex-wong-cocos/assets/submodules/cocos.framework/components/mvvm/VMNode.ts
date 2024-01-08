import { _decorator, Component, Vec3, Color, Label, color } from "cc";
import CCFrameIndex from "../CCFrameIndex";

const { ccclass } = _decorator;

/**
 * 节点属性修改器
 */
@ccclass("VMNode")
export default class VMNode extends Component {
    set rotation(v: Vec3) {
        this.node.eulerAngles = v;
    }

    set indexSpriteFrame(index: number) {
        if (this.node.getComponent(CCFrameIndex)) {
            this.node.getComponent(CCFrameIndex).index = index;
        } else {
            logger.info("Node not find CCFrameIndex");
        }
    }

    set updataLabelColor(color: Color) {
        if (this.node.getComponent(Label)) {
            this.node.getComponent(Label).color = color;
        } else {
            logger.info("Node not find label");
        }
    }
}
