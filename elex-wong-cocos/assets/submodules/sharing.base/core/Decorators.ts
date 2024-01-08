import { Game } from './entity/Game';

export namespace Decorators {
    /** System注册（Entity事件、全局事件） */
    export const SystemRegister = () => {
        return (target) => {
            if (isClient) {
                Game.EventSystem.addSystem(target);
            }
        }
    }

    /** 类名注册（代码压缩编译后，无法取到类名） */
    export const ClassNameRegister = (classname: string) => {
        return (target) => {
            Object.defineProperty(target, 'name', {
                writable: true
            })
            target.name = classname;
        }
    }
}

