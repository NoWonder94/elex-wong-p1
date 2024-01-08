import { AwakeSystem } from "../../../../../../sharing.base/core/object/IAwakeSystem";
import { UISloReelComponent } from "./UISloReelComponent";
import { instantiate, Node, Prefab, tween, v3, UITransform, Layout, dragonBones } from "cc";
import CCReferenceCollector from "../../../../../../cocos.framework/components/CCReferenceCollector";
import { RandomHelper } from "../../../../../../sharing.base/helper/RandomHelper";
import { EntityFactory } from "../../../../../../sharing.base/core/object/EntityFactory";
import { UISloTileComponent } from "./UISloTileComponent";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import { SloResConfig, SpinDirection } from "./SloStructDefine";
import { EventComponent } from "../../../../../../cocos.framework/module/event/EventComponent";
import { EventComponentSystem } from "../../../../../../cocos.framework/module/event/EventComponentSystem";
import { SloMachineEvent } from "./SloMachineEvent";
import { ResourcesComponentSystem } from "../../../../../../cocos.framework/module/resloader/ResourcesComponentSytem";
import { CCHelper } from "../../../../../../cocos.framework/helper/CCHelper";

@CocosDecorators.SystemRegister()
export class UISloReelComponentAwakeSystem extends AwakeSystem<UISloReelComponent> {
    constructor() {
        super(UISloReelComponent);
    }
    awake(self: UISloReelComponent, node: Node, resConfigs: SloResConfig, reelTileIds: number[], direction: SpinDirection = SpinDirection.Down) {
        self.node = node;
        let rc = self.node.getComponent(CCReferenceCollector);
        self.In = rc.get("In");
        self.Effect = rc.get("Effect");
        self.Effect.active = false;
        self.TilePrefab = rc.getRes("Tile", Prefab);
        self.iconConfigs = resConfigs.Icons;
        self.reelTileIds = reelTileIds;
        self.direction = direction;
    }
}

export class UISloReelComponentSystem {
    public static createReel<T extends UISloTileComponent>(self: UISloReelComponent, CLASS: new () => T, row: number = 5): void {
        self.In.removeAllChildren();
        self.tiles = [];

        let newTile: Node;
        for (let i = 0; i < row; i += 1) {
            newTile = instantiate(self.TilePrefab);
            let tile = EntityFactory.createWithParent(self, CLASS, newTile, self.iconConfigs);
            self.In.addChild(newTile);
            self.tiles[i] = tile;
        }

        self.tileHeight = newTile.getComponent(UITransform).height + self.In.getComponent(Layout).spacingY;
    }

    public static async playNormalEffect(self: UISloReelComponent, row: number) {
        let tile = self.resultTiles[row];
        if (!tile) {
            return;
        }
        await tile.playNormalEffect();
    }

    public static async showDoTileMask(self: UISloReelComponent, row: number) {
        let tile = self.resultTiles[row];
        if (!tile) {
            logger.info("*********showTileMask", row);
            return;
        }
        tile.showMask();
    }

    public static async hideDoTileMask(self: UISloReelComponent, row: number) {
        let tile = self.resultTiles[row];
        if (!tile) {
            logger.info("*********showTileMask", row);
            return;
        }
        tile.hideMask();
    }

    public static async showTileMask(self: UISloReelComponent, row: number) {
        let tile = self.resultTiles[row];
        if (!tile) {
            return;
        }
        tile.showMask();
    }

    public static async setLineGain(self: UISloReelComponent, row: number, gain: number) {
        let tile = self.resultTiles[row];
        if (!tile) {
            return;
        }

        tile.setLineGain(gain);
    }

    public static async playNormalLineEffect(self: UISloReelComponent, row: number) {
        let tile = self.resultTiles[row];
        if (!tile) {
            return;
        }
        await tile.playNormalLineEffect();
    }

    /**
     * 播放卷轴列特效
     */
    public static async playReelEffect(self: UISloReelComponent, effectRes: string) {
        self.Effect.active = true;

        let anim = self.Effect.getComponent(dragonBones.ArmatureDisplay);
        if (!anim) {
            logger.info("playReelEffect not exist dragonBones.ArmatureDisplay");
            return;
        }

        anim.dragonAsset = await ResourcesComponentSystem.loadAsset(`${effectRes}_ske`, dragonBones.DragonBonesAsset);
        anim.dragonAtlasAsset = await ResourcesComponentSystem.loadAsset(`${effectRes}_tex`, dragonBones.DragonBonesAtlasAsset);

        CCHelper.playDrangonDefaultAnimation(anim, 0);
    }

    public static shuffle(self: UISloReelComponent): void {
        for (let i = 0; i < self.tiles.length; i += 1) {
            this.nextStartIndex(self);

            let tid = self.reelTileIds[self.startIndex];
            self.tiles[i].setTile(tid);
        }
    }

    private static nextStartIndex(self: UISloReelComponent) {
        if (self.startIndex === -1) {
            // 随机开始位置
            self.startIndex = RandomHelper.randRange(0, self.reelTileIds.length - 1);
        }

        if (self.direction === SpinDirection.Down) {
            self.startIndex++;
            self.startIndex = self.startIndex % self.reelTileIds.length;
        } else {
            self.startIndex--;
            if (self.startIndex < 0) {
                self.startIndex = self.reelTileIds.length - 1;
            }
        }
    }

    public static readyStop(self: UISloReelComponent, newResult: Array<number>): void {
        const check = self.direction === SpinDirection.Down || newResult == null;
        self.result = check ? newResult : newResult.reverse();
        self.stopSpinning = true;
    }

    public static changeCallback(self: UISloReelComponent, element: UISloTileComponent = null): void {
        const el = element;
        const dirModifier = self.direction === SpinDirection.Down ? -1 : 1;

        if (el.node.position.y * dirModifier > self.tileHeight * 2) {
            el.node.position = v3(0, -self.tileHeight * 2 * dirModifier, 0);

            let pop = null;
            if (self.result != null && self.result.length > 0) {
                pop = self.result.pop();
            }

            if (pop != null && pop >= 0) {
                el.setTile(pop);
                self.resultTiles.unshift(el);
            } else {
                this.nextStartIndex(self);
                el.setTile(self.reelTileIds[self.startIndex]);
            }
        }
    }

    /** 检查是否结束旋转 */
    public static checkEndCallback(self: UISloReelComponent, element: UISloTileComponent = null): void {
        const el = element;
        if (self.stopSpinning) {
            this.doStop(self, el);
        } else {
            this.doSpinning(self, el);
        }
    }

    /** 开始旋转 */
    public static doSpin(self: UISloReelComponent, windUp: number): void {
        self.stopSpinning = false;
        self.resultTiles = [];

        EventComponentSystem.emit(self.getParent().getComponent(EventComponent), SloMachineEvent.ReelSpinStart);

        self.tiles.forEach((element) => {
            element.reset();

            const dirModifier = self.direction === SpinDirection.Down ? -1 : 1;

            const delay = tween(element.node).delay(windUp);
            const start = tween(element.node).by(self.spinSpeedConfig.StartEasingSpeed, { position: v3(0, self.tileHeight * dirModifier, 0) }, { easing: "backIn" });
            const doChange = tween().call(() => this.changeCallback(self, element));
            const callSpinning = tween(element.node).call(() => this.doSpinning(self, element, 1));

            delay.then(start).then(doChange).then(callSpinning).start();
        });
    }

    /** 旋转 */
    public static doSpinning(self: UISloReelComponent, element: UISloTileComponent = null, times = 1): void {
        EventComponentSystem.emit(self.getParent().getComponent(EventComponent), SloMachineEvent.ReelSpining);
        const dirModifier = self.direction === SpinDirection.Down ? -1 : 1;
        const move = tween().by(self.spinSpeedConfig.SpinSpeed, { position: v3(0, self.tileHeight * dirModifier, 0) });
        const doChange = tween().call(() => this.changeCallback(self, element));
        const repeat = tween(element.node).repeat(times, move.then(doChange));
        const checkEnd = tween().call(() => this.checkEndCallback(self, element));

        repeat.then(checkEnd).start();
    }

    /** 停止旋转 */
    public static doStop(self: UISloReelComponent, element: UISloTileComponent = null): void {
        const dirModifier = self.direction === SpinDirection.Down ? -1 : 1;
        const move = tween(element.node).by(self.spinSpeedConfig.StopSpeed, { position: v3(0, self.tileHeight * dirModifier, 0) } as any);
        const doChange = tween().call(() => this.changeCallback(self, element));
        const end = tween().by(self.spinSpeedConfig.EndEasingSpeed, { position: v3(0, self.tileHeight * dirModifier, 0) }, { easing: "bounceOut" });

        const stopEffectEnd = tween().call(() => {
            if (self.resultTiles.indexOf(element) != -1) {
                // 可视范围的Tile图标停止
                EventComponentSystem.emit(self.getParent().getComponent(EventComponent), SloMachineEvent.ReelTileStop, self.col, element.tileId);
            }

            if (self.resultTiles.indexOf(element) === self.tiles.length - 3) {
                // 可视范围内一列的最后一个图标停止
                EventComponentSystem.emit(self.getParent().getComponent(EventComponent), SloMachineEvent.ReelStop, self.col);
            }
        });

        move.then(doChange).then(move).then(doChange).then(end).then(doChange).then(stopEffectEnd).start();
    }
}
