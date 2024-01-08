import { Layout, Node, UITransform, Widget } from "cc";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import { UISloMachineComponent } from "../../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/UISloMachineComponent";
import { SlobskgResConfig } from "../../constants/SlobskgResConfig";
import { OrientationId } from "../../../../../../cocos.framework/config";
import { SloUISlotAdapterConfig } from "../../../../../../cocos_slo/slo/slo/scripts/constants/SloUIAdapterConfig";
import { CCHelper } from "../../../../../../cocos.framework/helper/CCHelper";
import { UserModel } from "../../../../../../cocos_slo/slo/slo/scripts/model/UserModel";
import { UISloBoxItemComponent } from "../../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/UISloBoxItemComponent";

@CocosDecorators.ClassNameRegister("UISlobskgComponent")
export class UISlobskgComponent extends UISloMachineComponent {
    Main: Node;
    Menu: Node;
    Start: Node;
    Logo: Node;
    Fast: Node;
    Bill: Node;
    BetChoice: Node;
    Role: Node;
    MachineEffect: Node;
    ScatterNum: number = 0;
    board: Node;
    board_des_1: Node;
    board_value_1: Node;
    board_des_2: Node;
    board_value_2: Node;
    icon_title: Node;

    /** slo model数据 */
    public userModel: UserModel;

    /** 已经播放 scatter 所属列 */
    scatterAudioEffectCol: number = 0;

    get ResConfigs() {
        return this.resConfigs as SlobskgResConfig;
    }

    public onDevOrientationChange(orientation: OrientationId) {
        logger.info("设备方向变化为", orientation);

        let config = this.UIConfig[orientation] as SloUISlotAdapterConfig;
        if (!config) {
            return;
        }
        this.Main.setPosition(this.Main.getPosition().x, config.MainY);
        CCHelper.setWidget(this.Menu.getComponent(Widget), config.OperateMenuWidget);
        CCHelper.setWidget(this.Start.getComponent(Widget), config.OperateStartBtnWidget);
        CCHelper.setWidget(this.Fast.getComponent(Widget), config.OperateFastNodeWidget);
        CCHelper.setWidget(this.Bill.getComponent(Widget), config.OperateBillChoiceNodeWidget);
        CCHelper.setWidget(this.BetChoice.getComponent(Widget), config.OperateBetChoiceNodeNodeWidget);
        CCHelper.setWidget(this.Role.getComponent(Widget), config.RoleWidget);
    }
}
