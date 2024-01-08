import { Node } from "cc";
import { CocosDecorators } from "../CocosDecorators";
import CCReferenceCollector from "../components/CCReferenceCollector";
import { PopupBaseComponent } from "../ui/UIPopup/PopupBaseComponent";

@CocosDecorators.ClassNameRegister("NodePopupComponent")
export class NodePopupComponent extends PopupBaseComponent {
    /** 组件所属节点 */
    public node: Node;
    /** 节点预制体路径 */
    public nodePrefabURL: string;
    /** 节点资源收集器 */
    public rc: CCReferenceCollector;
}
