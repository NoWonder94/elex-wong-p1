import { Scene } from '../sharing.base/core/entity/Scene';
import { GAME_ID } from '../sharing.base/consts';
import { CocosDecorators } from './CocosDecorators';

export namespace EventType {
    export const getEventResp = (event: string) => `${event}Resp`;

    @CocosDecorators.ClassNameRegister('AppStartInit')
    export class AppStartInit {
    }

    @CocosDecorators.ClassNameRegister('AppStartCheckupdate')
    export class AppStartCheckupdate {
    }

    @CocosDecorators.ClassNameRegister('AppStartHotUpdate')
    export class AppStartHotUpdate {
        constructor(public prefabURL: string) { }
    }

    @CocosDecorators.ClassNameRegister('AppStartScene')
    export class AppStartScene {
        constructor(public zoneSceneName: string, public afterEvent?: any) { }
    }

    @CocosDecorators.ClassNameRegister('SplashStart')
    export class SplashStart {
        constructor(public prefabURL: string, public waitEvents: string[]) { }
    }

    @CocosDecorators.ClassNameRegister('SplashFinish')
    export class SplashFinish {
    }

    @CocosDecorators.ClassNameRegister('UILoadingStart')
    export class UILoadingStart {
        constructor(public zoneScene: Scene, public prefabURL: string, public CLASS: new () => any, public options?: { uiconfig?: any, targetevent?: any, reconnect?: boolean }) { }
    }

    @CocosDecorators.ClassNameRegister('UILoadingFinish')
    export class UILoadingFinish {
        constructor(public zoneScene: Scene) { }
    }

    @CocosDecorators.ClassNameRegister('UILoginStart')
    export class UILoginStart {
        constructor(public zoneScene: Scene, public prefabURL: string, public CLASS: new () => any, public options?: { uiconfig?: any, targetevent?: any, reconnect: boolean }) { };
    }

    @CocosDecorators.ClassNameRegister('UILoginFinish')
    export class UILoginFinish {
        constructor(public zoneScene: Scene) { };
    }

    @CocosDecorators.ClassNameRegister('UINetworkTipCreate')
    export class UINetworkTipCreate {
        constructor(public zoneScene: Scene, public prefabURL: string, public CLASS?: new () => any) { }
    }

    @CocosDecorators.ClassNameRegister('UIToastStart')
    export class UIToastStart {
        constructor(public prefabURL: string) { }
    }


    @CocosDecorators.ClassNameRegister('SplashStatus')
    export class SplashStatus {
        constructor(public statusInfo: string) { }
    }

    @CocosDecorators.ClassNameRegister('LoadingFinish')
    export class LoadingFinish {
        constructor(public zoneScene: Scene) { }
    }

    @CocosDecorators.ClassNameRegister('LoginFinish')
    export class LoginFinish {
        constructor(public zoneScene: Scene) { }
    }

    @CocosDecorators.ClassNameRegister('AppStartLobby')
    export class AppStartLobby {
    }

    @CocosDecorators.ClassNameRegister('AfterCreateZoneScene')
    export class AfterCreateZoneScene {
        constructor(public zoneScene: Scene) { }
    }
    @CocosDecorators.ClassNameRegister('AppStartInitFinish')
    export class AppStartInitFinish {
        constructor(public zoneScene: Scene) { }
    }
}