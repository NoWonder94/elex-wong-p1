import { Entity } from "../../../sharing.base/core/object/Entity";
import { CocosDecorators } from "../../CocosDecorators";
import { NetworkComponent } from "./NetworkComponent";


@CocosDecorators.ClassNameRegister('NetworkManagerComponent')
export class NetworkManagerComponent extends Entity {
    public static instance: NetworkManagerComponent | null = null;

    public channels: { [key: number]: NetworkComponent } = {};
}