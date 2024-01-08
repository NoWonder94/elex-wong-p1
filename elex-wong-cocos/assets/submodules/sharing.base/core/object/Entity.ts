import { Pool } from '../Pool';
import { EventSystem } from './EventSystem';
import { ObjectPool } from './ObjectPools';

class EntityIdMap {
    maps: Map<number, Entity>;
    constructor() {
        this.maps = new Map<number, Entity>();
    }
}

type EntityType = string;
class EntityTypeMap {
    maps: Map<EntityType, Entity>;
    constructor() {
        this.maps = new Map<EntityType, Entity>();
    }
}

/** 实体状态 */
enum EntityStatus {
    None = 0,
    IsFromPool = 1,
    IsRegister = 2,
    IsComponent = 4,
    IsCreate = 8,
}

/** 实体创建状态 */
export enum EntityCreateStatus {
    /** 初始 */
    None = 0,
    /** 已经加载 */
    Loaded = 1,
    /** 已经启动 */
    Started = 2,
    /** 运行中 */
    Updating = 3,
}

export class Entity {
    private components = new EntityTypeMap();
    private static readonly dictPool = new Pool<EntityTypeMap>();

    private children = new EntityIdMap();
    private static readonly childrenPool = new Pool<EntityIdMap>();

    private static instanceIdRef: number = 0;
    private static idRef: number = 0;
    private static unitIdRef: number = 0;

    /** 组件实例ID */
    public instanceId: number = 0;
    /** 实体id */
    public id: number = 0;

    protected parent: Entity;
    protected domain: Entity;

    /** 实体状态 */
    private status: EntityStatus = EntityStatus.None
    /** 实体创建状态 */
    public createStatus: EntityCreateStatus = EntityCreateStatus.None;

    /** 是否正在更新中 */
    public isUpdating: boolean = false;
    /** 组件更新周期(毫秒) */
    public periodMS: number = 0;
    /** 最近一次更新时间 */
    public lastUpdateMS: number = 0;

    public static genInstanceId() {
        return ++this.instanceIdRef;
    }

    public static genId() {
        return ++this.idRef;
    }

    public static genUnitId() {
        return ++this.unitIdRef;
    }

    get isRequireUpdate() {
        if (this.periodMS === 0) {
            return true;
        }

        if (this.isUpdating) {
            return false;
        }

        if (0 === this.lastUpdateMS || Date.now() - this.lastUpdateMS > this.periodMS) {
            return true;
        }

        return false;
    }

    get type() {
        return this.constructor.name;
    }

    get Children() {
        return this.children === null ? this.children = Entity.childrenPool.fetch(EntityIdMap) : this.children;
    }

    get Components() {
        return this.components === null ? this.components = Entity.dictPool.fetch(EntityTypeMap) : this.components;
    }

    /** 是否来自对象池 */
    get IsFromPool() {
        return (this.status & EntityStatus.IsFromPool) === EntityStatus.IsFromPool;
    }

    set IsFromPool(value) {
        if (value) {
            this.status |= EntityStatus.IsFromPool;
        } else {
            this.status &= ~EntityStatus.IsFromPool;
        }
    }

    get IsRegister() {
        return (this.status & EntityStatus.IsRegister) === EntityStatus.IsRegister;
    }

    set IsRegister(value) {
        if (this.IsRegister === value) {
            return;
        }

        if (value) {
            this.status |= EntityStatus.IsRegister;
        } else {
            this.status &= ~EntityStatus.IsRegister;
        }

        EventSystem.Instance.registerSystem(this, value);
    }

    get IsComponent() {
        return (this.status & EntityStatus.IsComponent) === EntityStatus.IsComponent;
    }

    set IsComponent(value) {
        if (value) {
            this.status |= EntityStatus.IsComponent;
        } else {
            this.status &= ~EntityStatus.IsComponent;
        }
    }

    get IsCreate() {
        return (this.status & EntityStatus.IsCreate) === EntityStatus.IsCreate;
    }

    set IsCreate(value) {
        if (value) {
            this.status |= EntityStatus.IsCreate;
        } else {
            this.status &= ~EntityStatus.IsCreate;
        }
    }

    get IsDisposed() {
        return 0 === this.instanceId;
    }

    get Parent() {
        return this.parent;
    }

    set Parent(value: Entity) {
        if (value == null) {
            throw new Error('cant set parent null: {this.GetType().Name}');
        }

        if (this.parent != null) {
            // 之前有parent
            // parent相同，不设置
            if (this.parent.instanceId === value.instanceId) {
                logger.warn('重复设置了Parent: {this.GetType().Name} parent: {this.parent.GetType().Name}');
                return;
            }

            this.parent.removeChild(this);

            this.parent = value;
            this.parent.addChild(this);

            this.Domain = this.parent.domain;
        }
        else {
            this.parent = value;
            this.parent.addChild(this);

            this.IsComponent = false;

            this.afterSetParent();
        }
    }

    get Domain() {
        return this.domain;
    }

    set Domain(value: Entity) {
        if (value == null) {
            return;
        }

        let preDomain: Entity = this.domain;
        this.domain = value;

        if (null == preDomain) {
            this.instanceId = Entity.genInstanceId();
        }

        // 是否注册跟parent一致
        if (this.parent != null) {
            this.IsRegister = this.Parent.IsRegister;
        }

        // 递归设置孩子的Domain
        if (this.children != null) {
            for (let entity of this.children.maps.values()) {
                entity.Domain = this.domain;
            }
        }

        if (this.components != null) {
            for (let entity of this.Components.maps.values()) {
                entity.Domain = this.domain;
            }
        }
    }


    /** 该方法只能在AddComponent中调用，其他人不允许调用 */
    private set ComponentParent(value: Entity) {
        if (this.parent != null) {
            throw new Error('Component parent is not null: {this.GetType().Name}');
        }
        this.parent = value;
        this.IsComponent = true;
        this.afterSetParent();
    }

    /** 设置更新周期 */
    public setUpdatePeriod(ms: number) {
        this.periodMS = ms;
    }

    public getParent<T extends Entity>(): T {
        return this.Parent as T;
    }

    private afterSetParent() {
        this.Domain = this.parent.domain;
    }

    dispose() {
        if (this.IsDisposed) {
            return;
        }

        EventSystem.Instance.remove(this.instanceId);

        this.instanceId = 0;

        this.createStatus = EntityCreateStatus.None;

        // 清理Component
        if (this.components != null) {
            for (let entity of this.components.maps.values()) {
                entity.dispose();
            }
            this.components.maps.clear();
            Entity.dictPool.recycle(this.components);
            this.components = null;
        }

        // 清理Children
        if (this.children != null) {
            for (let child of this.children.maps.values()) {
                child.dispose();
            }
            this.children.maps.clear();
            Entity.childrenPool.recycle(this.children);
            this.children = null;
        }

        // 触发Destroy事件
        EventSystem.Instance.destroy(this);

        this.domain = null;

        if (this.parent != null && !this.parent.IsDisposed) {
            if (this.IsComponent) {
                this.parent.removeComponentInst(this);
            }
            else {
                this.parent.removeChild(this);
            }
        }

        this.parent = null;

        if (this.IsFromPool) {
            ObjectPool.Instance.recycle(this);
        }

        this.status = EntityStatus.None;
    }



    private addChild(entity: Entity) {
        this.Children.maps.set(entity.id, entity);
    }

    public getChild<T extends Entity>(id: number): T {
        if (this.children == null) {
            return null;
        }
        return this.children.maps.get(id) as T;
    }

    private removeChild(entity: Entity) {
        if (this.children == null) {
            return;
        }
        this.children.maps.delete(entity.id);
        if (this.children.maps.size === 0) {
            Entity.childrenPool.recycle(this.children);
            this.children = null;
        }
    }

    private addToComponent(type: string, component: Entity) {
        this.Components.maps.set(type, component);
    }

    private removeFromComponent(type: string, component: Entity) {
        if (this.components == null) {
            return;
        }

        this.Components.maps.delete(type);

        if (this.Components.maps.size === 0 && this.IsFromPool) {
            Entity.dictPool.recycle(this.components);
            this.components = null;
        }
    }

    public static create<T extends Entity>(CLASS: new () => T, isFromPool: boolean): Entity {
        let component: Entity;
        if (isFromPool) {
            component = ObjectPool.Instance.fetch<T>(CLASS);
        }
        else {
            component = new CLASS();
        }
        component.IsFromPool = isFromPool;
        component.IsCreate = true;
        component.id = 0;

        return component;
    }

    private createWithComponentParent<T extends Entity>(CLASS: new () => T): Entity;
    private createWithComponentParent<T extends Entity, P1>(CLASS: new () => T, p1: P1): Entity;
    private createWithComponentParent<T extends Entity, P1, P2>(CLASS: new () => T, p1: P1, p2: P2): Entity;
    private createWithComponentParent<T extends Entity, P1, P2, P3>(CLASS: new () => T, p1: P1, p2: P2, p3: P3): Entity;
    private createWithComponentParent<T extends Entity>(CLASS: new () => T, ...args): Entity {
        let component: Entity = Entity.create(CLASS, true);

        component.id = this.id;
        component.ComponentParent = this;

        EventSystem.Instance.awake.apply(EventSystem.Instance, [component].concat(Array.prototype.slice.call(arguments, 1)));

        return component;
    }

    AddComponentInst(component: Entity) {
        let type = component.type;
        if (this.components != null && this.components.maps.has(type)) {
            throw new Error(`addComponent, component already exist, id: ${this.id}, component: ${type}`);
        }

        component.ComponentParent = this;
        this.addToComponent(type, component);

        return component;
    }

    addComponent<T extends Entity>(CLASS: new () => T, ...args): T {
        let type: string = CLASS.name;
        if (this.components != null && this.components.maps.has(type)) {
            throw new Error(`addComponent, component already exist, id: ${this.id}, component: ${type}`);
        }

        let component: T = this.createWithComponentParent.apply(this, Array.prototype.slice.call(arguments, 0));
        // component.Domain = this;

        this.addToComponent(type, component);

        return component;
    }

    removeComponent<T extends Entity>(CLASS: new () => T): T {
        if (this.IsDisposed) {
            return;
        }

        if (!this.components) {
            return;
        }

        let c: Entity = this.getComponent(CLASS);
        if (c == null) {
            return;
        }
        let type: string = CLASS.name;
        this.removeFromComponent(type, c);
        c.dispose();
    }

    removeComponentInst(component: Entity) {
        if (this.IsDisposed) {
            return;
        }

        if (!this.components) {
            return;
        }

        let type: string = component.type;


        let c: Entity = this.getComponentInst(type);
        if (c == null) {
            return;
        }

        if (c.instanceId !== component.instanceId) {
            return;
        }

        this.removeFromComponent(type, c);
        c.dispose();
    }

    getComponent<T extends Entity>(CLASS: new () => T): T {
        if (this.components == null) {
            return null;
        }

        let type: string = CLASS.name;

        let component: Entity = this.components.maps.get(type);
        if (!component) {
            return;
        }

        return <T>component;
    }

    getComponentInst(type: string) {
        if (this.components == null) {
            return null;
        }

        let component: Entity = this.components.maps.get(type);
        if (!component) {
            return null;
        }

        return component;
    }
}