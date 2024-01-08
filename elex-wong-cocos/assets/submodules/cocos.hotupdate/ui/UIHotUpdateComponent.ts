import { Label, Node } from 'cc';
import { CocosDecorators } from '../../cocos.framework/CocosDecorators';
import { Entity } from '../../sharing.base/core/object/Entity';

@CocosDecorators.ClassNameRegister('UIHotUpdateComponent')
export class UIHotUpdateComponent extends Entity {
    public ProgressBar: Node;
    public ProgressValue: Node;
    public ProgressTip: Label;
    public ClientVersion: Label;
}