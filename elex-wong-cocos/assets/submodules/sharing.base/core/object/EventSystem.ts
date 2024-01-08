import { UnOrderMultiMap } from '../UnOrderMultiMap';
import { Entity, EntityCreateStatus } from './Entity';
import { IEvent, AEvent } from '../event/IEvent';
import { IAwakeSystem, IChangeSystem, IDestroySystem, ILateUpdateSystem, ILoadSystem, IStartSystem, IUpdateSystem } from './ISystem';

export class EventSystem {
    private static instance: EventSystem;

    /** 所有组件 */
    private readonly allComponents: Map<number, Entity> = new Map<number, Entity>();
    /** 所有事件 */
    private readonly allEvents: UnOrderMultiMap<string, IEvent> = new UnOrderMultiMap<string, IEvent>();
    private readonly awakeSystems: UnOrderMultiMap<string, IAwakeSystem> = new UnOrderMultiMap<string, IAwakeSystem>();
    private readonly loadSystems: UnOrderMultiMap<string, ILoadSystem> = new UnOrderMultiMap<string, ILoadSystem>();
    private readonly startSystems: UnOrderMultiMap<string, IStartSystem> = new UnOrderMultiMap<string, IStartSystem>();
    private readonly destroySystems: UnOrderMultiMap<string, IDestroySystem> = new UnOrderMultiMap<string, IDestroySystem>();
    private readonly updateSystems: UnOrderMultiMap<string, IUpdateSystem> = new UnOrderMultiMap<string, IUpdateSystem>();
    private readonly lateUpdateSystems: UnOrderMultiMap<string, ILateUpdateSystem> = new UnOrderMultiMap<string, ILateUpdateSystem>();
    private readonly changeSystems: UnOrderMultiMap<string, IChangeSystem> = new UnOrderMultiMap<string, IChangeSystem>();

    private starts: number[] = new Array<number>();
    private starts2: number[] = new Array<number>();
    private loaders: number[] = new Array<number>();
    private updates: number[] = new Array<number>();
    private updates2: number[] = new Array<number>();
    private lateUpdates: number[] = new Array<number>();
    private lateUpdates2: number[] = new Array<number>();

    public static get Instance() {
        return EventSystem.instance ? EventSystem.instance : EventSystem.instance = new EventSystem();
    }

    public async publish<T>(a: T) {
        if (!a) {
            logger.warn('EventSystem publish a is null');
            return;
        }

        const iEvents: IEvent[] = this.allEvents.getList(a.constructor.name);
        if (iEvents == null) {
            return;
        }

        for (const iEvent of iEvents) {
            if (iEvent == null) {
                continue;
            }

            if (!(iEvent instanceof IEvent)) {
                continue;
            }
            const aEvent: AEvent<T> = iEvent as AEvent<T>;
            try {
                await aEvent.handle(a)
            }
            catch (err) {
                logger.error('EventSystem publish event err=', err);
            }
        }
    }

    registerSystem(component: Entity, isRegister: boolean = true) {
        if (!isRegister) {
            this.remove(component.instanceId);
            return;
        }

        this.allComponents.set(component.instanceId, component);

        if (this.loadSystems.containsKey(component.type)) {
            this.loaders.push(component.instanceId);
        }

        if (this.updateSystems.containsKey(component.type)) {
            this.updates.push(component.instanceId);
        }

        if (this.lateUpdateSystems.containsKey(component.type)) {
            this.lateUpdates.push(component.instanceId);
        }

        if (this.startSystems.containsKey(component.type)) {
            this.starts.push(component.instanceId);
        }
    }

    remove(instanceId: number) {
        this.allComponents.delete(instanceId);
    }

    get(instanceId: number): Entity {
        const component: Entity = this.allComponents.get(instanceId);
        return component;
    }

    public addSystem(CLASS: new () => any) {
        let inst = null;
        try {
            inst = new CLASS();
            if (!inst.type) {
                return;
            }
        } catch (error) {
            return;
        }
        if (inst instanceof IAwakeSystem) {
            this.awakeSystems.add(inst.type, inst);
        } else if (inst instanceof ILoadSystem) {
            this.loadSystems.add(inst.type, inst);
        } else if (inst instanceof IStartSystem) {
            this.startSystems.add(inst.type, inst);
        } else if (inst instanceof IDestroySystem) {
            this.destroySystems.add(inst.type, inst);
        } else if (inst instanceof IUpdateSystem) {
            this.updateSystems.add(inst.type, inst);
        } else if (inst instanceof ILateUpdateSystem) {
            this.lateUpdateSystems.add(inst.type, inst);
        } else if (inst instanceof IChangeSystem) {
            this.changeSystems.add(inst.type, inst);
        } else if (inst instanceof IEvent) {
            this.allEvents.add(inst.type, inst);
        }
    }

    public cleanSystem() {
        this.awakeSystems.clear();
        this.loadSystems.clear();
        this.startSystems.clear();
        this.destroySystems.clear();
        this.updateSystems.clear();
        this.lateUpdateSystems.clear();
        this.changeSystems.clear();
        this.allEvents.clear();
    }
    awake(component: Entity): void;
    awake<P1>(component: Entity, p1: P1): void;
    awake<P1, P2>(component: Entity, p1: P1, p2: P2): void;
    awake<P1, P2, P3>(component: Entity, p1: P1, p2: P2, p3: P3): void;
    awake(component: Entity, ...args): void {
        const iAwakeSystems: IAwakeSystem[] = this.awakeSystems.getList(component.type);
        if (iAwakeSystems == null) {
            return;
        }

        for (const aAwakeSystem of iAwakeSystems) {
            if (aAwakeSystem == null) {
                continue;
            }

            if (!(aAwakeSystem instanceof IAwakeSystem)) {
                continue;
            }

            const iAwake: IAwakeSystem = aAwakeSystem;

            try {
                iAwake.run.apply(iAwake, Array.prototype.slice.call(arguments, 0));
            }
            catch (err) {
                logger.error('EventSystem awake err=', err);
            }
        }
    }

    public change(component: Entity) {
        const iChangeSystems: IChangeSystem[] = this.changeSystems.getList(component.type);

        if (iChangeSystems == null) {
            return;
        }

        for (const iChangeSystem of iChangeSystems) {
            if (iChangeSystem == null) {
                continue;
            }

            try {
                iChangeSystem.run(component);
            }
            catch (err) {
                logger.error('EventSystem change err=', err);
            }
        }
    }

    public destroy(component: Entity): void {
        const iDestroySystems: IDestroySystem[] = this.destroySystems.getList(component.type);
        if (iDestroySystems == null) {
            return;
        }

        for (const iDestroySystem of iDestroySystems) {
            if (iDestroySystem == null) {
                continue;
            }

            try {
                iDestroySystem.run(component);
            } catch (err) {
                logger.error('EventSystem destroy err=', component.type, err);
            }
        }
    }

    public async load() {
        while (this.loaders.length > 0) {
            const instanceId: number = this.loaders.shift();
            const component: Entity = this.allComponents.get(instanceId);
            if (!component) {
                continue;
            }

            if (component.IsDisposed) {
                continue;
            }

            const iLoadSystems: ILoadSystem[] = this.loadSystems.getList(component.type);
            if (iLoadSystems == null) {
                continue;
            }

            for (const iLoadSystem of iLoadSystems) {
                try {
                    try {
                        await iLoadSystem.run(component);
                    } catch (error) {
                        logger.error(`Component ${component.type} load exception`, error)
                    }
                } catch (err) {
                    logger.error('EventSystem load err=', component.type, err);
                }
            }
        }
    }

    private async start() {
        while (this.starts.length > 0) {
            const instanceId: number = this.starts.shift();
            const component: Entity = this.allComponents.get(instanceId);
            if (!component) {
                continue;
            }

            const iLoadSystems: ILoadSystem[] = this.loadSystems.getList(component.type);
            if (iLoadSystems != null && component.createStatus !== EntityCreateStatus.Loaded) {
                this.starts2.push(component.instanceId);
                continue;
            }

            const iStartSystems: IStartSystem[] = this.startSystems.getList(component.type);
            if (iStartSystems == null) {
                continue;
            }

            for (const iStartSystem of iStartSystems) {
                try {
                    try {
                        await iStartSystem.run(component);
                    } catch (error) {
                        logger.error(`Component ${component.type} start exception`, error)
                    }
                }
                catch (err) {
                    logger.error('EventSystem start err=', component.type, err);
                }
            }
        }

        [this.starts, this.starts2] = [this.starts2, this.starts];
    }

    public async update(deltaTime: number) {
        await this.load();
        await this.start();

        while (this.updates.length > 0) {
            const instanceId: number = this.updates.shift();
            const component: Entity = this.allComponents.get(instanceId);
            if (!component) {
                continue;
            }
            if (component.IsDisposed) {
                continue;
            }

            const iUpdateSystems: IUpdateSystem[] = this.updateSystems.getList(component.type);
            if (iUpdateSystems == null) {
                continue;
            }

            this.updates2.push(instanceId);

            if (component.createStatus !== EntityCreateStatus.Updating) {
                const iLoadSystems: ILoadSystem[] = this.loadSystems.getList(component.type);
                const iStartSystems: ILoadSystem[] = this.startSystems.getList(component.type);

                if (iLoadSystems != null && iStartSystems == null && component.createStatus !== EntityCreateStatus.Loaded) {
                    continue;
                }

                if (iStartSystems != null && component.createStatus !== EntityCreateStatus.Started) {
                    continue;
                }
            }

            for (const iUpdateSystem of iUpdateSystems) {
                try {
                    if (component.isRequireUpdate) {
                        try {
                            iUpdateSystem.run(component, deltaTime);
                        } catch (error) {
                            logger.error(`Component ${component.type} update exception`, error)
                        }
                    }
                }
                catch (err) {
                    logger.warn('EventSystem update err=', component.type, err);
                }
            }
        }

        [this.updates, this.updates2] = [this.updates2, this.updates];
    }

    public lateUpdate(deltaTime: number) {
        while (this.lateUpdates.length > 0) {
            const instanceId: number = this.lateUpdates.shift();
            const component: Entity = this.allComponents.get(instanceId);
            if (!component) {
                continue;
            }
            if (component.IsDisposed) {
                continue;
            }

            const iLateUpdateSystems: ILateUpdateSystem[] = this.lateUpdateSystems.getList(component.type);
            if (iLateUpdateSystems == null) {
                continue;
            }

            this.lateUpdates2.push(instanceId);

            for (const iLateUpdateSystem of iLateUpdateSystems) {
                try {
                    iLateUpdateSystem.run(component, deltaTime);
                }
                catch (err) {
                    logger.warn('EventSystem lateUpdate err=', component.type, err);
                }
            }
        }

        [this.lateUpdates, this.lateUpdates2] = [this.lateUpdates2, this.lateUpdates];
    }

    public toString() {
        let sb: string = '================================\r\n';
        let noParent = new Set<string>();
        let typeCount = new Map<string, number>();
        let noDomain = new Set<string>();
        for (let v of this.allComponents.values()) {
            if (v.Parent == null) {
                noParent.add(v.type);
            }

            if (v.Domain == null) {
                noDomain.add(v.type);
            }

            let c = typeCount.get(v.type) || 0;
            typeCount.set(v.type, c++);
        }

        sb += 'not set parent type:\r\n';
        for (let item of noParent) {
            sb += `\t${item}\r\n`;
        }

        sb += 'not set domain type:\r\n';
        for (let item of noDomain) {
            sb += `\t${item}\r\n`;
        }

        sb += 'Entity Count:\r\n';
        for (let [k, v] of typeCount.entries()) {
            sb += `\t${k}:${v}\r\n`;
        }
        sb += '================================\r\n';
        return sb;
    }

    public dispose() {
        EventSystem.instance = null;
    }
}

export const eventSystem = new EventSystem();