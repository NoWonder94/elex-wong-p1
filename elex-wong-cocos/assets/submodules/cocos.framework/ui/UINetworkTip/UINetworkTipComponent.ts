import { Label, Node } from 'cc';
import { Entity } from '../../../sharing.base/core/object/Entity';
import { CocosDecorators } from '../../CocosDecorators';

@CocosDecorators.ClassNameRegister('UINetworkTipComponent')
export class UINetworkTipComponent extends Entity {
    /** UI预制体路径 */
    public nodePrefabURL: string;
    /** 圆形 */
    public Circle: Node;
    /** 状态label */
    public Value: Label;
    /** 等待显示 */
    public show: boolean;
}