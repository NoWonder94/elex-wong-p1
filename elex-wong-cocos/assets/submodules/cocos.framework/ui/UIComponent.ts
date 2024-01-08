import { Entity } from "../../sharing.base/core/object/Entity";
import { UI } from "./UI";
import { CocosDecorators } from "../CocosDecorators";

/**
 * 管理Scene上的UI
 */
@CocosDecorators.ClassNameRegister('UIComponent')
export class UIComponent extends Entity {
    public UIs = new Map<string, UI>();
}