import { Entity } from '../sharing.base/core/object/Entity';
import { CocosDecorators } from "../cocos.framework/CocosDecorators";

@CocosDecorators.ClassNameRegister('SdkLoaderComponent')
export class SdkLoaderComponent extends Entity {
    public static instance: SdkLoaderComponent;
}



