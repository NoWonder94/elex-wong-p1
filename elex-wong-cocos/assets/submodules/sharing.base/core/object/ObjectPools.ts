import { Entity } from './Entity';

export class ObjectPool {

    private static instance: ObjectPool;

    private readonly dictionary: Map<string, Entity[]> = new Map<string, Entity[]>();

    public static get Instance() {
        return ObjectPool.instance ? ObjectPool.instance : ObjectPool.instance = new ObjectPool();
    }

    public fetch<T extends Entity>(CLASS: new () => T): T {
        const type: string = CLASS.name;
        let queue: Entity[];
        if (!this.dictionary.has(type)) {
            queue = new Array<Entity>();
            this.dictionary.set(type, queue);
        }
        queue = this.dictionary.get(type);
        let obj: Entity;
        if (queue.length > 0) {
            obj = queue.shift();
        }
        else {
            obj = new CLASS();
        }
        obj.IsFromPool = true;

        return obj as T;
    }

    public recycle(obj: Entity) {
        const type: string = obj.constructor.name;
        let queue: Entity[];
        if (!this.dictionary.has(type)) {
            queue = new Array<Entity>();
            this.dictionary.set(type, queue);
        }
        queue = this.dictionary.get(type);
        queue.push(obj);
    }

    public clear() {
        for (let entitys of this.dictionary.values()) {
            entitys.forEach((e) => e.dispose());
        }

        this.dictionary.clear();
    }

    public dispose() {
        this.clear();
        ObjectPool.instance = null;
    }
}




