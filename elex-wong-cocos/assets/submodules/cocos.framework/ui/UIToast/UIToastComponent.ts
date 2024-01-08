import { Node } from 'cc';
import { Entity } from '../../../sharing.base/core/object/Entity';
import { CocosDecorators } from '../../CocosDecorators';

@CocosDecorators.ClassNameRegister('UIToastComponent')
export class UIToastComponent extends Entity {
    public static instance: UIToastComponent;
    /** 背景 */
    public Value: Node;
    public Root: Node;
}

