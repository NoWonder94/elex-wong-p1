import { CocosDecorators } from '../../submodules/cocos.framework/CocosDecorators';
import { UISplashComponentSystem } from '../../submodules/cocos.framework/ui/UISplash/UISplashComponentSystem';
import { AEvent } from '../../submodules/sharing.base/core/event/IEvent';
import { AppEventType } from '../AppEventType';

@CocosDecorators.SystemRegister()
export class SplashSelfAEvent_ReqGetResourceStart extends AEvent<AppEventType.ReqGetResourceStart> {
    constructor() {
        super(AppEventType.ReqGetResourceStart);
    }

    protected async run(args: AppEventType.ReqGetResourceStart) {
        UISplashComponentSystem.changeStatus('配置加载中');
    }
}

@CocosDecorators.SystemRegister()
export class SplashSelfAEvent_ReqGetResourceFinish extends AEvent<AppEventType.ReqGetResourceFinish> {
    constructor() {
        super(AppEventType.ReqGetResourceFinish);
    }

    protected async run(args: AppEventType.ReqGetResourceFinish) {
        UISplashComponentSystem.changeStatus('配置加载完成');
        UISplashComponentSystem.delWaitEvent(AppEventType.ReqGetResourceFinish.name);
    }
}

@CocosDecorators.SystemRegister()
export class SplashSelfAEvent_ReqLoginStart extends AEvent<AppEventType.ReqLoginStart> {
    constructor() {
        super(AppEventType.ReqLoginStart);
    }

    protected async run(args: AppEventType.ReqGetResourceStart) {
        UISplashComponentSystem.changeStatus('登录授权中');
    }
}

@CocosDecorators.SystemRegister()
export class SplashSelfAEvent_ReqLoginFinish extends AEvent<AppEventType.ReqLoginFinish> {
    constructor() {
        super(AppEventType.ReqLoginFinish);
    }

    protected async run(args: AppEventType.ReqLoginFinish) {
        UISplashComponentSystem.changeStatus('登录授权完成');
        UISplashComponentSystem.delWaitEvent(AppEventType.ReqLoginFinish.name);
    }
}
