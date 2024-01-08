export class AEventSystem {
    public static AEvents = new Map<string, any>();

    public static registerEventTypeClass(classname: string, CLASS: new () => any) {
        this.AEvents.set(classname, CLASS);
    }

    public static getEventTypeClass(classname: string) {
        return this.AEvents.get(classname);
    }
}