import { Node, Prefab } from "cc";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import { DicObject } from "../../../../../../sharing.base/helper/Interfaces";
import { UISloTileComponent } from "./UISloTileComponent";
import { AudioConfig, IconConfig, SpinDirection, SpinSpeedConfigOpts } from "./SloStructDefine";
import { SceneNodeComponent } from "../../../../../../cocos.framework/module/scene/SceneNodeComponent";

@CocosDecorators.ClassNameRegister("UISloReelComponent")
export class UISloReelComponent extends SceneNodeComponent {
    public reelTileIds: number[];
    public iconConfigs: DicObject<IconConfig>;
    public In: Node = null;
    public Effect: Node;
    public TilePrefab: Prefab;
    public direction: SpinDirection;
    public tiles: UISloTileComponent[] = [];
    public resultTiles: UISloTileComponent[] = [];
    public result: Array<number> = [];
    public stopSpinning = false;
    /** 轮盘位置 */
    public startIndex: number = -1;
    /** 转速配置 */
    public spinSpeedConfig: SpinSpeedConfigOpts;
    /** tile高度 */
    public tileHeight: number = 0;
    /** 卷轴列 */
    public col: number = 0;
}
