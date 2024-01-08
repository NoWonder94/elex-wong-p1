import { Node } from 'cc';
import { AwakeSystem } from "../../sharing.base/core/object/IAwakeSystem";
import { UI } from "./UI";
import { CocosDecorators } from '../CocosDecorators';

@CocosDecorators.SystemRegister()
export class UIAwakeSystem extends AwakeSystem<UI>{
    constructor() {
        super(UI);
    }

    public awake(self: UI, name: string, node: Node, CLASS: any) {
        self.awake(name, node, CLASS);
    }
}