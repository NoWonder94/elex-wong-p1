export class LayerNames {
    /**
     * UI层
     */
    public static readonly UI = "UI";

    /**
     * 游戏单位层
     */
    public static readonly UNIT = "Unit";

    /**
     * 地形层
     */
    public static readonly MAP = "Map";

    /**
     * 默认层
     */
    public static readonly DEFAULT = "Default";

    public static readonly HIDDEN = "Hidden";

    // /// <summary>
    // /// 通过Layers名字得到对应层
    // /// </summary>
    // /// <param name="name"></param>
    // /// <returns></returns>
    // public static GetLayerInt(name: string) {
    //     return LayerMask.NameToLayer(name);
    // }

    // public static GetLayerStr(name: number): string {
    //     return LayerMask.LayerToName(name);
    // }
}