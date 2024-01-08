import { Decorators } from '../sharing.base/core/Decorators';
import { AEventSystem } from './ui/AEventSystem';
import { UIEventSytem } from './ui/UIEventSytem';

/** Cocos装饰器 */
export namespace CocosDecorators {

    /** System注册（Entity事件、全局事件） */
    export const SystemRegister = Decorators.SystemRegister

    /** 类名注册（代码压缩编译后，无法取到类名） */
    export const ClassNameRegister = (classname: string) => {
        return Decorators.ClassNameRegister(classname);
    }

    /** UI事件注册 */
    export const UIEventRegister = (uiType: string) => {
        return (target) => {
            UIEventSytem.registerSystem(uiType, target);
        }
    }

    /** A事件注册 */
    export const AEventRegister = (classname: string) => {
        return (target) => {
            AEventSystem.registerEventTypeClass(classname, target);
        }
    }
}

