import { Label, Sprite } from 'cc';
import { CocosDecorators } from '../../CocosDecorators';
import { NodeComponent } from '../../service/NodeComponent';

@CocosDecorators.ClassNameRegister('UILoadingComponent')
export class UILoadingComponent extends NodeComponent {
    /** 圆形 */
    public Bar: Sprite;
    /** 状态label */
    public Value: Label;
}
