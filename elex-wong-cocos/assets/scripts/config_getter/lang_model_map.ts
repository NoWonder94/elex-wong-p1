
export class lang_model_map {
    private static maps = new Map<string, any>();

    public static add(model: any) {
        this.maps.set(model.getClassName(), model);
    }

    public static get(filename: string) {
        return this.maps.get(filename);
    }
}