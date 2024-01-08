import { UIHelper } from "../UIHelper";
import { AEvent } from "../../../sharing.base/core/event/IEvent";
import { EventType } from "../../EventType";
import { UIType } from "../UIType";
import { Game } from "../../../sharing.base/core/entity/Game";
import { CocosDecorators } from "../../CocosDecorators";

@CocosDecorators.SystemRegister()
export class ToastAEvent_CreateUI extends AEvent<EventType.UIToastStart>{
    constructor() {
        super(EventType.UIToastStart)
    }

    protected async run(args: EventType.UIToastStart) {
        await UIHelper.create(Game.Scene, UIType.UIToast, args);
    }
}