import { Decorators } from "../submodules/sharing.base/core/Decorators";
import { EventType } from "../submodules/cocos.framework/EventType";
import { CocosDecorators } from "../submodules/cocos.framework/CocosDecorators";

export namespace AppEventType {
    @Decorators.ClassNameRegister('slo')
    @CocosDecorators.AEventRegister('slo')
    export class slo {
        constructor(public scene: EventType.AppStartScene) { }
    }

    @Decorators.ClassNameRegister('slobskg')
    @CocosDecorators.AEventRegister('slobskg')
    export class slobskg {
        constructor(public scene: EventType.AppStartScene) { }
    }
    @Decorators.ClassNameRegister('slowarrio')
    @CocosDecorators.AEventRegister('slowarrio')
    export class slowarrio {
        constructor(public scene: EventType.AppStartScene) { }
    }
    @Decorators.ClassNameRegister('slostarburst')
    @CocosDecorators.AEventRegister('slostarburst')
    export class slostarburst {
        constructor(public scene: EventType.AppStartScene) { }
    }
    @Decorators.ClassNameRegister('slomp')
    @CocosDecorators.AEventRegister('slomp')
    export class slomp {
        constructor(public scene: EventType.AppStartScene) { }
    }

    @Decorators.ClassNameRegister('ReqGetResourceStart')
    export class ReqGetResourceStart {
    }

    @Decorators.ClassNameRegister('ReqGetResourceFinish')
    export class ReqGetResourceFinish {
    }

    @Decorators.ClassNameRegister('ReqLoginStart')
    export class ReqLoginStart {
    }

    @Decorators.ClassNameRegister('ReqLoginFinish')
    export class ReqLoginFinish {
    }
}