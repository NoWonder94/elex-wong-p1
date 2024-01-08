import { UIHelper } from "../../../../../../cocos.framework/ui/UIHelper";
import { AEvent } from "../../../../../../sharing.base/core/event/IEvent";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import { SlobskgEventType } from "../../SlobskgEventType";
import { SlobskgUIType } from "../../SlobskgUIType";

@CocosDecorators.SystemRegister()
export class SlobskgUIMachineAEvent_CreateUI extends AEvent<SlobskgEventType.SlobskgCreateMachineUI>{
    constructor() {
        super(SlobskgEventType.SlobskgCreateMachineUI)
    }

    protected async run(args: SlobskgEventType.SlobskgCreateMachineUI) {
        await UIHelper.create(args.zoneScene, SlobskgUIType.UISloMachine);
    }
}

@CocosDecorators.SystemRegister()
export class SlobskgUIMachineAEvent_RemoveUI extends AEvent<SlobskgEventType.SlobskgRemoveMachineUI>{
    constructor() {
        super(SlobskgEventType.SlobskgRemoveMachineUI)
    }

    protected async run(args: SlobskgEventType.SlobskgRemoveMachineUI) {
        await UIHelper.remove(args.zoneScene, SlobskgUIType.UISloMachine);
    }
}