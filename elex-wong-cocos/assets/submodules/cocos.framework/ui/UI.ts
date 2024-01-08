import { Node } from "cc";
import { Entity } from "../../sharing.base/core/object/Entity";
import { EntityFactory } from "../../sharing.base/core/object/EntityFactory";
import { ComponentView } from "./ComponentView";
import { CocosDecorators } from "../CocosDecorators";

/**
 * ui等级
 */
export enum UILevel {
    /** 场景级别 */
    Scene = 1,
    /** 弹窗级别 */
    Popup = 2,
}

@CocosDecorators.ClassNameRegister('UI')
export class UI extends Entity {
    /** 节点 */
    public node: Node;
    /** UI名称 */
    private name: string;
    /** ui组件类型 */
    private uiclass: any;
    /** 是否常驻节点不消耗 */
    public persist: boolean;
    /** ui级别 */
    public level: UILevel = UILevel.Scene;

    public get Name() {
        return this.name;
    }

    public get CLASS() {
        return this.uiclass;
    }

    public nameChildren = new Map<string, UI>();

    public awake(name: string, node: Node, CLASS: any) {
        this.nameChildren.clear();
        node.addComponent(ComponentView).Component = this;
        this.name = name;
        this.node = node;
        this.uiclass = CLASS;
    }

    public dispose() {
        if (this.IsDisposed) {
            return;
        }

        super.dispose();

        for (let ui of this.nameChildren.values()) {
            ui.dispose();
        }

        this.node.removeFromParent();
        if (!this.persist) {
            this.node.destroy();
        }
        this.node = null;
        this.nameChildren.clear();
    }

    // public  SetAsFirstSibling() {
    //     this.component.transform.SetAsFirstSibling();
    // }

    public add(ui: UI) {
        this.nameChildren.set(ui.Name, ui);
        ui.Parent = this;
    }

    public remove(name: string) {
        let ui: UI = this.nameChildren.get(name);
        if (!ui) {
            return;
        }
        this.nameChildren.delete(name);
        ui.dispose();
    }

    public get(name: string): UI {
        let child: UI = this.nameChildren.get(name);
        if (child) {
            return child;
        }

        let childNode: Node = this.node.getChildByName(name);
        if (childNode == null) {
            return null;
        }
        child = EntityFactory.create<UI, string, Node>(this.Domain, UI, name, childNode);
        this.add(child);
        return child;
    }
}