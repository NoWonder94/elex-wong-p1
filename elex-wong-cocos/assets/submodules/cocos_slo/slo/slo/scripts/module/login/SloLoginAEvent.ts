import { UIHelper } from "../../../../../../cocos.framework/ui/UIHelper";
import { UIType } from "../../../../../../cocos.framework/ui/UIType";
import { AEvent } from "../../../../../../sharing.base/core/event/IEvent";
import { SloEventType } from "../../SloEventType";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";

@CocosDecorators.SystemRegister()
export class SloUILoginAEvent_CreateUI extends AEvent<SloEventType.SloCreateLoginUI>{
    constructor() {
        super(SloEventType.SloCreateLoginUI)
    }

    protected async run(args: SloEventType.SloCreateLoginUI) {
        await UIHelper.create(args.zoneScene, UIType.UILogin);
    }
}

@CocosDecorators.SystemRegister()
export class SloUILoginAEvent_RemoveUI extends AEvent<SloEventType.SloRemoveLoginUI>{
    constructor() {
        super(SloEventType.SloRemoveLoginUI)
    }

    protected async run(args: SloEventType.SloRemoveLoginUI) {
        await UIHelper.remove(args.zoneScene, UIType.UILogin);
    }
}