import { CocosDecorators } from "../../../../cocos.framework/CocosDecorators";
import { Scene } from "../../../../sharing.base/core/entity/Scene";

export namespace SloEventType {

    @CocosDecorators.ClassNameRegister('AfterCreateSloZoneScene')
    export class AfterCreateSloZoneScene {
        constructor(public zoneScene: Scene) { }
    }

    @CocosDecorators.ClassNameRegister('AfterDestroySloZoneScene')
    export class AfterDestroySloZoneScene {
        constructor(public zoneScene: Scene) { }
    }


    @CocosDecorators.ClassNameRegister('SloCreateLoginUI')
    export class SloCreateLoginUI {
        constructor(public zoneScene: Scene) { };
    }


    @CocosDecorators.ClassNameRegister('SloRemoveLoginUI')
    export class SloRemoveLoginUI {
        constructor(public zoneScene: Scene) { };
    }

    @CocosDecorators.ClassNameRegister('SloCreateLobbyUI')
    export class SloCreateLobbyUI {
        constructor(public zoneScene: Scene) { };
    }

    @CocosDecorators.ClassNameRegister('SloRemoveLobbyUI')
    export class SloRemoveLobbyUI {
        constructor(public zoneScene: Scene) { };
    }

    @CocosDecorators.ClassNameRegister('SloLeaveLobby')
    export class SloLeaveLobby {
        constructor(public zoneScene: Scene) { };
    }
}