import PoolComponent from './PoolComponent';
import { AwakeSystem } from '../../../sharing.base/core/object/IAwakeSystem';
import { instantiate, Node, NodePool, Prefab } from 'cc';
import { ResourcesComponentSystem } from '../resloader/ResourcesComponentSytem';
import { CocosDecorators } from '../../CocosDecorators';

@CocosDecorators.SystemRegister()
export class PoolComponentAwakeSystem extends AwakeSystem<PoolComponent>{
    constructor() {
        super(PoolComponent)
    }

    awake(self: PoolComponent) {
        PoolComponent.instance = self;
    }
}

/** 对象池管理类 */
export class PoolComponentSystem {

    public static async get(path: string): Promise<Node> {
        let self = PoolComponent.instance;
        const pool = self.poolMap.get(path);
        if (pool && pool.size() > 0) {
            return pool.get();
        } else if (self.prefabMap.has(path)) {
            return instantiate(self.prefabMap.get(path));
        }
        const node = await this.getFromRes(path);
        return (node ? node : null);
    }

    public static put(path: string, node: Node): void {
        let self = PoolComponent.instance;
        let pool = self.poolMap.get(path);
        if (!pool) {
            pool = new NodePool();
            self.poolMap.set(path, pool);
        }
        pool.put(node);
    }

    private static async getFromRes(path: string): Promise<Node> {
        let prefabAsset = await ResourcesComponentSystem.loadAsset<Prefab>(path, Prefab);
        if (prefabAsset) {
            prefabAsset.addRef();
            PoolComponent.instance.prefabMap.set(path, prefabAsset);
            return instantiate(prefabAsset)
        }
    }
}