import { CocosDecorators } from "../../../cocos.framework/CocosDecorators";
import { Entity } from '../../../sharing.base/core/object/Entity';

@CocosDecorators.ClassNameRegister('IOSApiComponent')
export class IOSApiComponent extends Entity {
    public static instance: IOSApiComponent;
}