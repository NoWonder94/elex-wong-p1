import { AwakeSystem } from "../../sharing.base/core/object/IAwakeSystem";
import { UIHotUpdateComponent } from "./UIHotUpdateComponent";
import { UI } from '../../cocos.framework/ui/UI';
import { FailInfo, HotUpdateComponent, HotUpdateEvent, UpdateProgressInfo, ErrorInfo } from '../module/HotUpdateComponent';
import { Game } from "../../sharing.base/core/entity/Game";
import { HotUpdateComponentSystem } from "../module/HotUpdateComponentSystem";
import { FunctionCaller } from "../../sharing.base/helper/FunctionCaller";
import { Label, Sprite } from "cc";
import { CocosDecorators } from "../../cocos.framework/CocosDecorators";
import CCReferenceCollector from "../../cocos.framework/components/CCReferenceCollector";
import { NumberFormatHelper } from "../../cocos.framework/helper/NumberFormatHelper";

@CocosDecorators.SystemRegister()
export class UIHotUpdateComponentAwakeSystem extends AwakeSystem<UIHotUpdateComponent>{
    constructor() {
        super(UIHotUpdateComponent)
    }

    public awake(self: UIHotUpdateComponent) {
        let rc = self.getParent<UI>().node.getComponent(CCReferenceCollector);

        self.ProgressBar = rc.get('Bar');
        self.ProgressValue = rc.get('Value');
        self.ProgressTip = rc.get('Tip', Label);
        self.ClientVersion = rc.get('ClientVersion', Label);

        let hotUpdateComponent = Game.Scene.getComponent(HotUpdateComponent);
        HotUpdateComponentSystem.setEventlistener(hotUpdateComponent, FunctionCaller.create(UIHotUpdateComponentSystem.onHotupdate, UIHotUpdateComponentSystem, self));
        HotUpdateComponentSystem.startUpdate(hotUpdateComponent);
        self.ClientVersion.getComponent(Label).string = HotUpdateComponentSystem.getVersion(hotUpdateComponent);
    }
}

export class UIHotUpdateComponentSystem {
    public static onHotupdate(self: UIHotUpdateComponent, etype: HotUpdateEvent, info?: UpdateProgressInfo & FailInfo & ErrorInfo) {
        logger.info('UIHotUpdateComponentSystem onHotupdate etype=', etype);
        switch (etype) {
            case HotUpdateEvent.UpdateError:
                // 提示
                logger.error('更新发生错误， reason=', info.reason)
                break;
            case HotUpdateEvent.UpdateFail:
                // 更新失败，重试尝试
                if (info.failCount < 3) {
                    let hotUpdateComponent = Game.Scene.getComponent(HotUpdateComponent);
                    HotUpdateComponentSystem.retry(hotUpdateComponent);
                    return;
                }
                // 提示
                break;
            case HotUpdateEvent.AreadyNew:
            case HotUpdateEvent.UpdateFinish:
                // 更新完成
                Game.Scene.removeComponent(HotUpdateComponent);
                break;
            case HotUpdateEvent.UpdateProgress:
                // 更新进度
                this.updateProgress(self, info);
                break;
        }
    }

    private static updateProgress(self: UIHotUpdateComponent, info: UpdateProgressInfo) {
        logger.info('热更新进度info=', JSON.stringify(info));
        self.ProgressBar.getComponent(Sprite).fillRange = info.filePercent;
        self.ProgressValue.getComponent(Label).string = NumberFormatHelper.progress2Percent(info.filePercent);
        self.ProgressTip.string = `游戏更新中... ${info.filePercent === 1 ? info.byteTotal.div(1024, 0) : info.byteProgress.div(1024, 0)}kb/${info.byteTotal.div(1024, 0)}kb`;
    }
}