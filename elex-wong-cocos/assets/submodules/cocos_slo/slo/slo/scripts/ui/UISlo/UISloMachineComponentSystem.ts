import { AwakeSystem } from "../../../../../../sharing.base/core/object/IAwakeSystem";
import { UISloMachineComponent } from "./UISloMachineComponent";
import { instantiate, Layout, Node, Prefab, Widget } from "cc";
import CCReferenceCollector from "../../../../../../cocos.framework/components/CCReferenceCollector";
import { EntityFactory } from "../../../../../../sharing.base/core/object/EntityFactory";
import { UISloTileComponent } from "./UISloTileComponent";
import { UISloReelComponent } from "./UISloReelComponent";
import { UISloReelComponentSystem } from "./UISloReelComponentSystem";
import { SpinType } from "../../../../../../sharing.protocol/games/slo/SloConst";
import { UI } from "../../../../../../cocos.framework/ui/UI";
import { FunctionCaller } from "../../../../../../sharing.base/helper/FunctionCaller";
import { StartSystem } from "../../../../../../sharing.base/core/object/IStartSystem";
import { game_sloHandler_c_spin_Res_Data, SloAwardItem } from "../../../../../../sharing.protocol/protocols/ws/game/slo/game.sloHandler.c_spin";
import { TimeHelper } from "../../../../../../cocos.framework/helper/TimeHelper";
import { MachineState, ReelStopDelayOpts, SloMachineConfig, SloResConfig } from "./SloStructDefine";
import VMLabel from "../../../../../../cocos.framework/components/mvvm/VMLabel";
import { VM } from "../../../../../../cocos.framework/components/mvvm/ViewModel";
import { SloModel } from "./SloModel";
import VMEvent from "../../../../../../cocos.framework/components/mvvm/VMEvent";
import { BitHelper } from "../../../../../../sharing.base/helper/BitHelper";
import { TweenAnimationHelper } from "../../../../../../cocos.framework/effect/TweenAnimHelper";
import { GlobalComponentSystem } from "../../../../../../cocos.framework/module/global/GlobalComponentSystem";
import { SoundComponentSystem } from "../../../../../../cocos.framework/module/sound/SoundComponentSystem";
import { EventComponent } from "../../../../../../cocos.framework/module/event/EventComponent";
import { EventComponentSystem } from "../../../../../../cocos.framework/module/event/EventComponentSystem";
import { SloMachineEvent } from "./SloMachineEvent";
import { EventGlobalComponentSystem } from "../../../../../../cocos.framework/module/event/EventGlobalComponentSystem";
import { SloSubscibeEvent } from "../../SloSubscibeEvent";
import { DestroySystem } from "../../../../../../sharing.base/core/object/IDestroySystem";
import { MessageComponentSystem } from "../../../../../../cocos.framework/module/message/MessageComponentSystem";
import { MessageEventType } from "../../../../../../cocos.framework/module/message/MessageComponent";
import { SloUISlotAdapterConfig } from "../../constants/SloUIAdapterConfig";
import { Coin } from "../../../../../../sharing.protocol/constants/Coin";
import { BOOLEAN, NONE } from "../../../../../../sharing.base/consts";

export class UISloMachineComponentAwakeSystem<T extends UISloMachineComponent> extends AwakeSystem<T> {
    constructor(CLASS: new () => T) {
        super(CLASS);
    }

    awake(self: T, options: { resConfigs: SloResConfig; machineConfig: SloMachineConfig; uiconfig: SloUISlotAdapterConfig }) {
        self.addComponent(EventComponent);

        self.resConfigs = options.resConfigs;
        self.machineConfig = options.machineConfig;
        self.UIConfig = options.uiconfig;

        let root = self.getParent<UI>().node;
        let rootVMEvent = root.addComponent(VMEvent);
        rootVMEvent.watchPath = "slo.bet_index";
        rootVMEvent.changeHandlers.push(FunctionCaller.create(UISloMachineComponentSystem.onBetIndexChange, this, self));

        self.sloModel = VM.get<SloModel>(SloModel.name).$data;

        let rc = root.getComponent(CCReferenceCollector);

        self.ReelPrefab = rc.getRes("Reel", Prefab);

        self.Machine = rc.get("Machine");

        self.Win = rc.get("Win");

        self.Win.getChildByName("WinValue").addComponent(VMLabel).watchPath = "slo.gain_score_show";

        self.Win.active = false;
    }
}

export class UISloMachineComponentStartSystem<T extends UISloMachineComponent> extends StartSystem<T> {
    constructor(CLASS: new () => T) {
        super(CLASS);
    }

    start(self: UISloMachineComponent) {
        SoundComponentSystem.playMusic(self.resConfigs.Audios.background, true);
    }
}

export class UISloMachineComponentDestroySystem<T extends UISloMachineComponent> extends DestroySystem<T> {
    constructor(CLASS: new () => T) {
        super(CLASS);
    }

    destroy(self: UISloMachineComponent) {
        UISloMachineComponentSystem.offListener(self);
        UISloMachineComponentSystem.offSloListener(self);
    }
}

export class UISloMachineComponentSystem extends MessageComponentSystem {
    /** 监听slo内部事件 */
    public static onSloListener(self: UISloMachineComponent) {
        self.slocmds = this.listSloNotifications(self);
        let listener = self.getComponent(EventComponent);
        for (let item of self.slocmds) {
            EventComponentSystem.on(listener, item.name, item.callback);
        }
    }
    /** 关闭内部事件监听 */
    public static offSloListener(self: UISloMachineComponent) {
        let listener = self.getComponent(EventComponent);
        for (let item of self.slocmds) {
            EventComponentSystem.off(listener, item.name, item.callback.cb, item.callback.target);
        }
    }

    public static setUseCoin(self: UISloMachineComponent, useCode: string, coins: Coin[]) {
        let num = 0;
        let curUseCode = NONE;
        for (let item of coins) {
            if (item.code === useCode && item.quantity > 0) {
                num = item.quantity;
                curUseCode = item.code;
                break;
            }
        }

        if (curUseCode === NONE) {
            curUseCode = coins[0].code;
            num = coins[0].quantity;
        }
        self.sloModel.use_coin_code = curUseCode;
        self.sloModel.use_coin_value = new BigNumber(num).toFormat();
    }

    protected static listLocalNotifications(self: UISloMachineComponent): MessageEventType[] {
        return super.listLocalNotifications(self).concat([
            { name: SloSubscibeEvent.getResp(SloSubscibeEvent.ReqGetSpinResult), callback: FunctionCaller.create(UISloMachineComponentSystem.onSpinResult, UISloMachineComponentSystem, self) },
            { name: SloSubscibeEvent.getResp(SloSubscibeEvent.ReqGetSpinResultFail), callback: FunctionCaller.create(UISloMachineComponentSystem.onSpinResultFail, UISloMachineComponentSystem, self) },
            { name: SloSubscibeEvent.DevOrientationChange, callback: FunctionCaller.create(self.onDevOrientationChange, self) },
        ]);
    }

    protected static listNetNotifications(self): MessageEventType[] {
        return super.listNetNotifications(self).concat([]);
    }

    /** slo内部消息绑定 */
    protected static listSloNotifications(self: UISloMachineComponent): MessageEventType[] {
        return [{ name: SloMachineEvent.ReelStop, callback: FunctionCaller.create(UISloMachineComponentSystem.onReelStop, UISloMachineComponentSystem, self) }];
    }

    public static update(self: UISloMachineComponent) {
        if (this.checkAutoSpin(self)) {
            return;
        }

        this.checkOpenPrize(self);
        this.checkPlayWinLineEffect(self);
    }

    /** 获取旋转结果回调 */
    public static onSpinResult(self: UISloMachineComponent, result: game_sloHandler_c_spin_Res_Data) {
        let passwd = TimeHelper.getTimestampMS() - self.requestResultTime;
        let free = Math.max(self.machineConfig.SpiningTimed - passwd, 0);

        GlobalComponentSystem.sleep(
            free / 1000,
            FunctionCaller.create(() => {
                self.result = result;
                self.state = BitHelper.add(self.state, MachineState.OpenPrizing);
                self.state = BitHelper.add(self.state, MachineState.GetResult);
            }, this)
        );
    }

    public static onSpinResultFail(self: UISloMachineComponent, result: game_sloHandler_c_spin_Res_Data) {
        let passwd = TimeHelper.getTimestampMS() - self.requestResultTime;
        let free = Math.max(self.machineConfig.SpiningTimed - passwd, 0);

        GlobalComponentSystem.sleep(
            free / 1000,
            FunctionCaller.create(() => {
                self.result = result;
                self.state = BitHelper.add(self.state, MachineState.OpenPrizing);
            }, this)
        );
    }

    public static onOperateSpin(self: UISloMachineComponent) {
        this.doSpin(self);
    }

    /** 可视范围内一列的最后一个图标停止 */
    public static onReelStop(self: UISloMachineComponent, col: number) {
        SoundComponentSystem.playEffect(self.resConfigs.Audios.reel_stop);
        if (col === self.reels.length - 1) {
            this.doAllReelStop(self);
        }
    }

    public static createMachine<REEL extends UISloReelComponent, TILE extends UISloTileComponent>(self: UISloMachineComponent, REFL_CLASS: new () => REEL, TILE_CLASS: new () => TILE): void {
        self.Machine.removeAllChildren();
        self.reels = [];

        let newReel: Node;
        // 创建Reels
        for (let i = 0; i < self.machineConfig.wheelCol; i++) {
            newReel = instantiate(self.ReelPrefab);
            self.Machine.addChild(newReel);

            let reel = EntityFactory.createWithParent(self, REFL_CLASS, newReel, self.resConfigs, self.machineConfig.Wheel[i].Reel);

            self.reels[i] = reel;
            let speed: number = Math.min(self.sloModel.spin_speed, self.machineConfig.SpinSpeedConfig.length);
            reel.spinSpeedConfig = self.machineConfig.SpinSpeedConfig[speed - 1];
            reel.col = i;
            UISloReelComponentSystem.createReel(reel, TILE_CLASS, self.machineConfig.WheelRow + 2);
            UISloReelComponentSystem.shuffle(reel);
            reel.In.getComponent(Layout).updateLayout();
            reel.In.getComponent(Layout).enabled = false;
        }
        self.Machine.getComponent(Widget).updateAlignment();
    }

    protected static getReelStartDelay(self: UISloMachineComponent, reelIndex: number) {
        return self.machineConfig.SpinStartDelayBase * reelIndex;
    }

    // 旋转前检查
    protected static doSpinBefore(self: UISloMachineComponent) {
        logger.warn("doSpinBefore must realizetion");
        return false;
    }

    protected static doSpin(self: UISloMachineComponent) {
        if (!BitHelper.has(self.state, MachineState.Spining)) {
            if (!this.doSpinBefore(self)) {
                return;
            }

            this.reset(self);
            EventComponentSystem.emit(self.getComponent(EventComponent), SloMachineEvent.MachineSpinStart);
            SoundComponentSystem.playEffect(self.resConfigs.Audios.spin, true);
            for (let i = 0; i < self.machineConfig.wheelCol; i += 1) {
                const theReel = self.reels[i];
                UISloReelComponentSystem.doSpin(theReel, this.getReelStartDelay(self, i));
            }
            this.requestResult(self);
        } else if (!self.preStop) {
            self.preStop = true;
        }
    }

    protected static getReelStopDelay(self: UISloMachineComponent, reelIndex: number) {
        return self.machineConfig.ReelStopDelayType === ReelStopDelayOpts.RandMod ? this.calcReelStopDelayByMod(self, reelIndex) : this.calcReelStopDelayByAvg(self, reelIndex);
    }

    protected static doStop(self: UISloMachineComponent) {
        let spinDelay = 0;
        self.randMod = Math.random() / 2;
        for (let i = 0; i < self.machineConfig.wheelCol; i += 1) {
            if (!self.preStop) {
                spinDelay = this.getReelStopDelay(self, i);
                // logger.info('spinDelay=', spinDelay);
            }
            const theReel = self.reels[i];
            let reelTiles = self.result.spin_data.matrix[i].Reel.slice();

            GlobalComponentSystem.sleep(
                spinDelay,
                FunctionCaller.create(() => {
                    UISloReelComponentSystem.readyStop(theReel, reelTiles);
                }, this)
            );
        }
    }

    /** 中断 */
    protected static doInterrupt(self: UISloMachineComponent) {}

    protected static doAllReelStop(self: UISloMachineComponent) {
        EventComponentSystem.emit(self.getComponent(EventComponent), SloMachineEvent.ReelAllStop);

        GlobalComponentSystem.sleep(
            0.2,
            FunctionCaller.create(async () => {
                self.autoSpinStopTime = TimeHelper.getTimestampMS();
                self.sloModel.gain_score = self.result.win_gold;
                self.sloModel.gain_score_show = self.result.win_gold.mul(self.machineConfig.NumberShowMulti).toFixedValue(0);

                EventComponentSystem.emit(self.getComponent(EventComponent), SloMachineEvent.MachineSpinStop);

                SoundComponentSystem.stopEffect(self.resConfigs.Audios.spin);

                let isGain = Object.keys(self.result.spin_data.detail).length > 0;
                GlobalComponentSystem.sleep(
                    isGain ? self.machineConfig.GainLockDelay : 0,
                    FunctionCaller.create(() => {
                        self.state = BitHelper.del(self.state, MachineState.Spining);
                    }, this)
                );

                if (isGain) {
                    TweenAnimationHelper.createShockEff(self.getParent<UI>().node, 1, 4);

                    await this.playNormalEffect(self, self.result.spin_data.detail.normal);
                    await this.playScatterEffect(self, self.result.spin_data.detail.scatter);

                    if (self.result.is_scatter == BOOLEAN.TRUE) {
                        logger.info("*************scatterz 中奖");
                    }
                }

                // 轮询显示中奖线路
                self.state = BitHelper.add(self.state, MachineState.ShowGainLine);
            }, this)
        );
    }

    public static async requestResult(self: UISloMachineComponent): Promise<void> {
        self.result = null;
        self.sloModel.gain_score = 0;
        self.requestResultTime = TimeHelper.getTimestampMS();
        EventGlobalComponentSystem.emit(SloSubscibeEvent.ReqGetSpinResult);
    }

    // 监听挡位变化修改
    public static onBetIndexChange(self: UISloMachineComponent, betIndex: number) {
        logger.info("debug betIndex", betIndex);
        self.sloModel.bet = self.sloModel.config.bets[betIndex];
        self.sloModel.mul = self.sloModel.config.muls[betIndex];
    }

    /** 机器重置 */
    protected static reset(self: UISloMachineComponent) {
        SoundComponentSystem.stopAllEffect();
        self.showGainLineEffectLastTime = 0;
        self.autoSpinStopTime = 0;
        self.preStop = false;
        self.Win.active = false;
        self.state = BitHelper.del(self.state, MachineState.ShowGainLine);
        self.showGainLineEffectIng = false;
        self.state = BitHelper.del(self.state, MachineState.OpenPrizing);
        self.state = BitHelper.del(self.state, MachineState.GetResult);
        self.normalGainPoints.clear();
        self.state = BitHelper.add(self.state, MachineState.Spining);
        self.showedLineIndex = 0;
        // 设置新速度
        for (var i = 0; i < self.reels.length; i++) {
            self.reels[i].spinSpeedConfig = self.machineConfig.SpinSpeedConfig[self.sloModel.spin_speed - 1];
        }
    }

    /** 检查自动旋转 */
    private static checkAutoSpin(self: UISloMachineComponent) {
        if (self.sloModel.auto_spin && (BitHelper.has(self.state, MachineState.ShowGainLine) || !BitHelper.has(self.state, MachineState.Spining))) {
            if (self.autoSpinStopTime == -1 || (self.autoSpinStopTime > 0 && TimeHelper.getTimestampMS() - self.autoSpinStopTime >= self.machineConfig.AutoSpinInterval)) {
                this.doSpin(self);
                logger.info("自动旋转auto_spin=", self.sloModel.auto_spin);
                self.sloModel.auto_game_num--;
                // 停止
                if (self.sloModel.auto_game_num <= 0) {
                    self.sloModel.auto_spin = 0;
                    self.sloModel.auto_game_num = self.sloModel.config.auto_gear[0];
                }
            }
            return true;
        }
    }

    /** 检查开奖 */
    private static checkOpenPrize(self: UISloMachineComponent) {
        if (BitHelper.has(self.state, MachineState.OpenPrizing)) {
            self.state = BitHelper.del(self.state, MachineState.OpenPrizing);
            if (BitHelper.has(self.state, MachineState.GetResult)) {
                this.doStop(self);
            } else {
                this.doInterrupt(self);
            }
        }
    }
    /** 检查播放中奖线特效 */
    private static async checkPlayWinLineEffect(self: UISloMachineComponent) {
        if (BitHelper.has(self.state, MachineState.ShowGainLine)) {
            await this.playWinLineEffect(self);
        }
    }

    /** 播放普通中奖特效 */
    private static async playNormalEffect(self: UISloMachineComponent, normal?: SloAwardItem) {
        if (!normal) {
            return;
        }

        let tasks: any[] = [];
        // 中奖交叉图标去重、避免特效播放多次
        for (let item of normal.info) {
            for (let col = 0; col < self.reels.length; col++) {
                let row = item.line[col];
                let reel = self.reels[col];

                let point = `${col}-${row}`;
                if (self.normalGainPoints.has(point)) {
                    continue;
                }

                if (item.pos[col]) {
                    self.normalGainPoints.add(point);
                    tasks.push(UISloReelComponentSystem.playNormalEffect(reel, row));
                }
            }
        }

        EventComponentSystem.emit(self.getComponent(EventComponent), SloMachineEvent.SpinResultGainNormal);

        SoundComponentSystem.playEffect(self.resConfigs.Audios.gain);
        self.Win.active = true;
        await Promise.all(tasks);
    }

    /** 播放 Scatter 特效 */
    private static async playScatterEffect(self: UISloMachineComponent, normal?: SloAwardItem) {
        if (!normal) {
            return;
        }

        EventComponentSystem.emit(self.getComponent(EventComponent), SloMachineEvent.SpinResultGainNormal);

        let tasks: any[] = [];
        for (let item of normal.info) {
            for (let col = 0; col < self.reels.length; col++) {
                let reel = self.reels[col];
                if (item.pos[col]) {
                    tasks.push(UISloReelComponentSystem.playNormalEffect(reel, item.line[col]));
                }
            }
        }

        SoundComponentSystem.playEffect(self.resConfigs.Audios.gain);
        self.Win.active = true;
        await Promise.all(tasks);
    }

    /** 轮询显示中奖线路 */
    private static async playWinLineEffect(self: UISloMachineComponent) {
        if (self.showGainLineEffectIng) {
            return;
        }

        if (TimeHelper.getTimestampMS() - self.showGainLineEffectLastTime < self.machineConfig.ShowGainLineEffectInterval) {
            return;
        }

        if (!self.result.spin_data.detail) {
            return;
        }

        let normal = self.result.spin_data.detail.normal;
        if (!normal) {
            return;
        }

        let item = normal.info[self.showedLineIndex];
        if (!item) {
            return;
        }

        self.showGainLineEffectIng = true;

        let lineTasks: any[] = [];
        for (let col = 0; col < self.reels.length; col++) {
            let reel = self.reels[col];
            if (item.pos[col]) {
                if (col == Math.floor(self.reels.length / 2)) {
                    if (!(self.sloModel.auto_spin || self.preStop) || self.showGainLineEffectLastTime > 0) {
                        UISloReelComponentSystem.setLineGain(reel, item.line[col], item.award.mul(self.machineConfig.NumberShowMulti));
                    }
                }
                lineTasks.push(UISloReelComponentSystem.playNormalLineEffect(reel, item.line[col]));
            }
        }
        await Promise.all(lineTasks);

        ++self.showedLineIndex;
        self.showedLineIndex %= normal.info.length;

        self.showGainLineEffectLastTime = TimeHelper.getTimestampMS();
        self.showGainLineEffectIng = false;
    }

    private static calcReelStopDelayByMod(self: UISloMachineComponent, reelIndex: number) {
        return reelIndex < 2 + self.randMod ? reelIndex / 4 : self.randMod * (reelIndex - 2) + reelIndex / 4;
    }

    private static calcReelStopDelayByAvg(self: UISloMachineComponent, reelIndex: number) {
        return self.machineConfig.SpinStoptDelayBase * reelIndex;
    }
}
