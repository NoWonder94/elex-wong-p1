import { Scene } from "../../sharing.base/core/entity/Scene";
import { UI } from "./UI";
import { UIComponent } from "./UIComponent";
import { UIComponentSystem } from './UIComponentSystem';

export class UIHelper {
    public static async create<C>(scene: Scene, uiType: string, c?: C): Promise<UI> {
        return await UIComponentSystem.create(scene.getComponent(UIComponent), uiType, c)
    }

    public static async remove<R>(scene: Scene, uiType: string, r?: R) {
        UIComponentSystem.remove(scene.getComponent(UIComponent), uiType, r);
    }

    // public static async get<R>(scene: Scene, uiType: string) {
    //     // UIComponentSystem.remove(scene.getComponent(UIComponent), uiType, r);
    // }
}