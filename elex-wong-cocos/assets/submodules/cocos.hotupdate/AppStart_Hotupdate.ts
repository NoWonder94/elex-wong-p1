import { EventType } from "../cocos.framework/EventType";
import { UIHelper } from "../cocos.framework/ui/UIHelper";
import { UIType } from "../cocos.framework/ui/UIType";
import { Game } from "../sharing.base/core/entity/Game";
import { AEvent } from "../sharing.base/core/event/IEvent";
import { CocosDecorators } from "../cocos.framework/CocosDecorators";

@CocosDecorators.SystemRegister()
export class AppStart_Hotupdate extends AEvent<EventType.AppStartHotUpdate> {
    constructor() {
        super(EventType.AppStartHotUpdate)
    }

    protected async run(a: EventType.AppStartCheckupdate) {
        await UIHelper.create(Game.Scene, UIType.UIHotupdate, a);
    }
}


