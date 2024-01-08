import { UIComponent } from "./UIComponent";

export abstract class IAUIEvent {
}

/**
 * UI事件基类
 */
export abstract class AUIEvent<C, R> extends IAUIEvent {
    public abstract onCreate(uiComponent: UIComponent, a: C);
    public abstract onRemove(uiComponent: UIComponent, a: R);
}