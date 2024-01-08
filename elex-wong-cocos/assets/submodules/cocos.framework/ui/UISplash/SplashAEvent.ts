import { UIHelper } from "../UIHelper";
import { AEvent } from "../../../sharing.base/core/event/IEvent";
import { EventType } from "../../EventType";
import { UIType } from "../UIType";
import { Game } from "../../../sharing.base/core/entity/Game";
import { CocosDecorators } from "../../CocosDecorators";

@CocosDecorators.SystemRegister()
export class SplashAEvent_CreateSplashUI extends AEvent<EventType.SplashStart>{
    constructor() {
        super(EventType.SplashStart)
    }

    protected async run(args: EventType.SplashStart) {
        await UIHelper.create(Game.Scene, UIType.UISplash, args);
    }
}

@CocosDecorators.SystemRegister()
export class SplashAEvent_RemoveSplashUI extends AEvent<EventType.SplashFinish>{
    constructor() {
        super(EventType.SplashFinish)
    }

    protected run(args: EventType.SplashFinish) {
        UIHelper.remove(Game.Scene, UIType.UISplash);
    }
}