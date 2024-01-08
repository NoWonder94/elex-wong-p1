import { Entity } from './Entity';
import { EventSystem } from './EventSystem';

export class EntityFactory {
    public static createWithParent<T extends Entity>(parent: Entity, CLASS: new () => T): T;
    public static createWithParent<T extends Entity, A>(parent: Entity, CLASS: new () => T, a: A): T;
    public static createWithParent<T extends Entity, A, B>(parent: Entity, CLASS: new () => T, a: A, b: B): T;
    public static createWithParent<T extends Entity, A, B, C>(parent: Entity, CLASS: new () => T, a: A, b: B, c: C): T;
    public static createWithParent<T extends Entity>(parent: Entity, CLASS: new () => T, ...args): T {
        const component = Entity.create(CLASS, true);
        component.Parent = parent;
        component.id = Entity.genId();
        EventSystem.Instance.awake.apply(EventSystem.Instance, [component].concat(Array.prototype.slice.call(arguments, 2)));
        return component as T;
    }

    public static createWithParentAndId<T extends Entity>(parent: Entity, id: number, CLASS: new () => T): T;
    public static createWithParentAndId<T extends Entity, A>(parent: Entity, id: number, CLASS: new () => T, a: A): T;
    public static createWithParentAndId<T extends Entity, A, B>(parent: Entity, id: number, CLASS: new () => T, a: A, b: B): T;
    public static createWithParentAndId<T extends Entity, A, B, C>(parent: Entity, id: number, CLASS: new () => T, a: A, b: B, c: C): T;
    public static createWithParentAndId<T extends Entity, A, B, C, D>(parent: Entity, id: number, CLASS: new () => T, a: A, b: B, c: C, d: D): T;
    public static createWithParentAndId<T extends Entity>(parent: Entity, id: number, CLASS: new () => T, ...args): T {
        const component = Entity.create(CLASS, true);
        component.Parent = parent;
        component.id = id;
        EventSystem.Instance.awake.apply(EventSystem.Instance, [component].concat(Array.prototype.slice.call(arguments, 2)));
        return component as T;
    }

    public static create<T extends Entity>(domain: Entity, CLASS: new () => T): T;
    public static create<T extends Entity, A>(domain: Entity, CLASS: new () => T, a: A): T;
    public static create<T extends Entity, A, B>(domain: Entity, CLASS: new () => T, a: A, b: B): T;
    public static create<T extends Entity, A, B, C>(domain: Entity, CLASS: new () => T, a: A, b: B, c: C): T;
    public static create<T extends Entity, A, B, C, D>(domain: Entity, CLASS: new () => T, a: A, b: B, c: C, d: D): T;
    public static create<T extends Entity>(domain: Entity, CLASS: new () => T, ...args): T {
        const component = Entity.create(CLASS, true);
        component.Domain = domain;
        component.id = Entity.genId();
        EventSystem.Instance.awake.apply(EventSystem.Instance, [component].concat(Array.prototype.slice.call(arguments, 2)));
        return component as T;
    }

    public static createWithId<T extends Entity>(domain: Entity, id: number, CLASS: new () => T): T;
    public static createWithId<T extends Entity, A>(domain: Entity, id: number, CLASS: new () => T, a: A): T;
    public static createWithId<T extends Entity, A, B>(domain: Entity, id: number, CLASS: new () => T, a: A, b: B): T;
    public static createWithId<T extends Entity, A, B, C>(domain: Entity, id: number, CLASS: new () => T, a: A, b: B, c: C): T;
    public static createWithId<T extends Entity>(domain: Entity, id: number, CLASS: new () => T, ...args): T {
        const component = Entity.create(CLASS, true);
        component.Domain = domain;
        component.id = id;
        EventSystem.Instance.awake.apply(EventSystem.Instance, [component].concat(Array.prototype.slice.call(arguments, 2)));
        return component as T;
    }
}