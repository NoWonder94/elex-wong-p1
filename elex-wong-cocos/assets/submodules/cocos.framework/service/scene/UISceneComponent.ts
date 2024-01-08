import { Entity } from '../../../sharing.base/core/object/Entity';
import { CocosDecorators } from '../../CocosDecorators';
import { UI } from '../../ui/UI';

@CocosDecorators.ClassNameRegister('UISceneComponent')
export class UISceneComponent extends Entity {
    public static instance: UISceneComponent;
    public curUIScene: UI;
    public curUISceneDestoryEvent: any;
    public historyScene: UI[] = [];
}