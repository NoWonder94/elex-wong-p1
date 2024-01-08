import { CocosDecorators } from "../../../../cocos.framework/CocosDecorators";
import { Scene } from "../../../../sharing.base/core/entity/Scene";

export namespace SlobskgEventType {

    @CocosDecorators.ClassNameRegister('AfterCreateSlobskgZoneScene')
    export class AfterCreateSlobskgZoneScene {
        constructor(public zoneScene: Scene) { }
    }

    @CocosDecorators.ClassNameRegister('AfterDestroySlobskgZoneScene')
    export class AfterDestroySlobskgZoneScene {
        constructor(public zoneScene: Scene) { }
    }

    @CocosDecorators.ClassNameRegister('SlobskgCreateMachineUI')
    export class SlobskgCreateMachineUI {
        constructor(public zoneScene: Scene) { };
    }


    @CocosDecorators.ClassNameRegister('SlobskgRemoveMachineUI')
    export class SlobskgRemoveMachineUI {
        constructor(public zoneScene: Scene) { };
    }

    @CocosDecorators.ClassNameRegister('SlobskgCreateLobbyUI')
    export class SlobskgCreateLobbyUI {
        constructor(public zoneScene: Scene) { };
    }

    @CocosDecorators.ClassNameRegister('SlobskgRemoveLobbyUI')
    export class SlobskgRemoveLobbyUI {
        constructor(public zoneScene: Scene) { };
    }

    @CocosDecorators.ClassNameRegister('SlobskgLeaveLobby')
    export class SlobskgLeaveLobby {
        constructor(public zoneScene: Scene) { };
    }

    @CocosDecorators.ClassNameRegister('SlobskgCreateGameUI')
    export class SlobskgCreateGameUI {
        constructor(public zoneScene: Scene) { };
    }

    @CocosDecorators.ClassNameRegister('SlobskgRemoveGameUI')
    export class SlobskgRemoveGameUI {
        constructor(public zoneScene: Scene) { };
    }

    @CocosDecorators.ClassNameRegister('SlobskgExitGame')
    export class SlobskgExitGame {
        constructor(public zoneScene: Scene) { };
    }
}