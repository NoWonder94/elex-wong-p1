import { AUIEvent, IAUIEvent } from "./AUIEvent";

export class UIEventSytem {
    public static UIEvents = new Map<string, IAUIEvent>();

    public static registerSystem(uiType: string, CLASS: new () => any) {
        let inst = null;
        try {
            inst = new CLASS();
        } catch (error) {
            return;
        }

        if (inst instanceof IAUIEvent) {
            this.UIEvents.set(uiType, inst);
        }
    }
}