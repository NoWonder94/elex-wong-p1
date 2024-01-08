import { Label, Node } from 'cc';
import { CocosDecorators } from '../../CocosDecorators';
import { NodeComponent } from '../../service/NodeComponent';

@CocosDecorators.ClassNameRegister('UICircleLoadingComponent')
export class UICircleLoadingComponent extends NodeComponent {
    /** 圆形 */
    public Circle: Node;
    /** 状态label */
    public Value: Label;
}

