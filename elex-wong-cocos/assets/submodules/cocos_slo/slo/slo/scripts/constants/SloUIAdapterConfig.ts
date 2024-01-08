import { WidgetConfigItem } from "../../../../../cocos.framework/constants/Constants";

export interface SloUILoadingAdapterConfig {
    UILineWidgetBottom: number;
    LoadWidgetBottom: number;
}

export interface SloUISlotAdapterConfig {
    // all
    MainY: number;

    // warrio
    OperateSpinWidget?: WidgetConfigItem[];
    OperateOptionsMenuWidget?: WidgetConfigItem[];

    // bskg
    RoleWidget?: WidgetConfigItem[];
    OperateMenuWidget?: WidgetConfigItem[];
    OperateStartBtnWidget?: WidgetConfigItem[];
    OperateFastNodeWidget?: WidgetConfigItem[];
    OperateBillChoiceNodeWidget?: WidgetConfigItem[];
    OperateBetChoiceNodeNodeWidget?: WidgetConfigItem[];
}
