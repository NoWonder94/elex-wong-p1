import { Node } from "cc";
import { CocosDecorators } from "../CocosDecorators";
import CCReferenceCollector from "../components/CCReferenceCollector";
import { MessageComponent } from "./message/MessageComponent";

@CocosDecorators.ClassNameRegister("NodeComponent")
export class NodeComponent extends MessageComponent {
    /** 组件所属节点 */
    public node: Node;
    /** 节点预制体路径 */
    public nodePrefabURL: string;
    /** 节点资源收集器 */
    public rc: CCReferenceCollector;
}
