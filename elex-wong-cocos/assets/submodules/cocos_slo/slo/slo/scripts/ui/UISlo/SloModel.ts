import { ProtoSloMachineConfig, SpinType } from "../../../../../../sharing.protocol/games/slo/SloConst";
import { CocosDecorators } from "../../../../../../cocos.framework/CocosDecorators";
import { VM } from "../../../../../../cocos.framework/components/mvvm/ViewModel";
import { OpenMarkPage } from "./SloStructDefine";
import { COIN_CODE } from "../../../../../../sharing.base/consts";

@CocosDecorators.ClassNameRegister("slo")
export class SloModel {
    /** 旋转倍速挡位(1：正常速度，2：急速) 最大值不超过机器配置中，配置的速度配置 */
    spin_speed: number = 1;

    /** 使用币code */
    use_coin_code: COIN_CODE = "";
    /** 使用币图标 */
    use_coin_icon: string = "";
    /** 使用币余额 */
    use_coin_value: number = 0;

    spin_type: SpinType = SpinType.Normal;

    /** 投注 */
    bet: number = 100;
    /** 倍数 */
    mul: number = 100;
    /** 押注挡位 */
    bet_index: number = 8;
    /** 自动旋转【0：手动，1：自动】 */
    auto_spin: number = 0;
    /** 赢得分数 */
    gain_score: number = 0;
    /** 赢得分数 */
    gain_score_show: number = 0;
    /** 配置 */
    config: ProtoSloMachineConfig = {
        /** 投注挡位 */
        bets: [1, 2, 5, 10, 15, 30, 50, 70, 100],
        /** 倍数挡位 */
        muls: [1, 2, 5, 10, 15, 30, 50, 70, 100],
        /** 自由游戏局数挡位 */
        auto_gear: [5, 10, 25, 50, 75, 100, -1],
        /** 剩余余额挡位 */
        del_gear: [10, 50, 75],
        /** 余额增加挡位 */
        add_gear: [150, 200, 500],
        /** 免费游戏次数挡位 */
        free_gear: [5, 10, 15, 20],
    };

    /** 弹出页面 */
    open_page: OpenMarkPage = OpenMarkPage.HidePage;

    /** 自动游戏局数 */
    auto_game_num: number = 10;
    /** 免费游戏次数 */
    free_game_num: number = 10;
    /** 单次赢得超过 */
    exceed: number = 10;
    /** del */
    del_index: number = 50;
    /** add */
    add_index: number = 200;
}

VM.add(new SloModel(), SloModel.name);
