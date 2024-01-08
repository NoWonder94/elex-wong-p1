import { NodePool, Prefab } from "cc";
import { Entity } from '../../../sharing.base/core/object/Entity';
import { CocosDecorators } from "../../CocosDecorators";

/** 对象池管理类 */
@CocosDecorators.ClassNameRegister('PoolComponent')
export default class PoolComponent extends Entity {
    public static instance: PoolComponent = null;

    public poolMap: Map<string, NodePool> = new Map<string, NodePool>();

    public prefabMap: Map<string, Prefab> = new Map<string, Prefab>();
}