import { Node } from "cc";
import { Entity } from "../../sharing.base/core/object/Entity";
import { CocosDecorators } from "../CocosDecorators";

/**
 * 管理所有UI GameObject
 */

@CocosDecorators.ClassNameRegister('UIEventComponent')
export class UIEventComponent extends Entity {
    public static instance: UIEventComponent;
    public UILayers = new Map<number, Node>();
}