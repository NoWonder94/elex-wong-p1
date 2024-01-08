import { UIHelper } from "../UIHelper";
import { AEvent } from "../../../sharing.base/core/event/IEvent";
import { EventType } from "../../EventType";
import { UIType } from "../UIType";
import { CocosDecorators } from "../../CocosDecorators";

@CocosDecorators.SystemRegister()
export class LoadingAEvent_CreateUI extends AEvent<EventType.UILoadingStart>{
    constructor() {
        super(EventType.UILoadingStart)
    }

    protected async run(args: EventType.UILoadingStart) {
        await UIHelper.create(args.zoneScene, UIType.UILoading, args);
    }
}

@CocosDecorators.SystemRegister()
export class LoadingAEvent_RemoveUI extends AEvent<EventType.UILoadingFinish>{
    constructor() {
        super(EventType.UILoadingFinish)
    }

    protected run(args: EventType.UILoadingFinish) {
        UIHelper.remove(args.zoneScene, UIType.UILoading);
    }
}