import { EventSystem } from '../object/EventSystem';
import { EntitySceneFactory } from './EntitySceneFactory';
import { Scene } from './Scene';
import { SceneType } from './SceneType';
import { ObjectPool } from '../object/ObjectPools';

export class Game {
    /** 场景 */
    private static scene: Scene;
    /** 时间系统 */
    public static EventSystem: EventSystem = EventSystem.Instance;
    /** 对象池 */
    public static ObjectPool: ObjectPool = ObjectPool.Instance;

    public static get Scene() {
        if (Game.scene != null) {
            return Game.scene;
        }

        Game.scene = EntitySceneFactory.createScene(0, 0, 0, SceneType.Process, 'Process')
        // Game.scene.addComponent(TimerComponent);
        return Game.scene;
    }

    public static load() {
    }

    public static async update() {
        await Game.EventSystem.update(0);
    }

    public static lateUpdate() {
        Game.EventSystem.lateUpdate(0);
    }

    public static close(): void {
        Game.Scene.dispose();
        Game.scene = null;
        Game.EventSystem.dispose();
        Game.ObjectPool.dispose();
    }

}

