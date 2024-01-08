import { OrientationId } from "../../../../../cocos.framework/config";
import { SloUILoadingAdapterConfig, SloUISlotAdapterConfig } from "../../../../../cocos_slo/slo/slo/scripts/constants/SloUIAdapterConfig";
import { DicObject } from "../../../../../sharing.base/helper/Interfaces";

export const BskgUILoadingConfig: DicObject<SloUILoadingAdapterConfig> = {};
BskgUILoadingConfig[OrientationId.portrait] = {
    UILineWidgetBottom: 330,
    LoadWidgetBottom: 150,
};

BskgUILoadingConfig[OrientationId.landscape] = {
    UILineWidgetBottom: 30,
    LoadWidgetBottom: 30,
};

export const BskgUISlotConfig: DicObject<SloUISlotAdapterConfig> = {};
BskgUISlotConfig[OrientationId.landscape] = {
    MainY: 0,
    RoleWidget: [
        {
            type: "horizontalCenter",
            value: -500,
        },
        {
            type: "verticalCenter",
            value: -160,
        },
    ],
    OperateMenuWidget: [
        {
            type: "left",
            value: 25,
        },
        {
            type: "bottom",
            value: 180,
        },
    ],
    OperateStartBtnWidget: [
        {
            type: "right",
            value: 15,
        },
        {
            type: "bottom",
            value: 130,
        },
    ],
    OperateFastNodeWidget: [
        {
            type: "right",
            value: 15,
        },
        {
            type: "bottom",
            value: 50,
        },
    ],
    OperateBillChoiceNodeWidget: [
        {
            type: "left",
            value: 10,
        },
        {
            type: "bottom",
            value: 50,
        },
    ],
    OperateBetChoiceNodeNodeWidget: [
        {
            type: "left",
            value: 300,
        },
        {
            type: "bottom",
            value: 50,
        },
    ],
};

BskgUISlotConfig[OrientationId.portrait] = {
    MainY: 0,
    RoleWidget: [
        {
            type: "horizontalCenter",
            value: -260,
        },
        {
            type: "verticalCenter",
            value: -400,
        },
    ],
    OperateMenuWidget: [
        {
            type: "right",
            value: 28,
        },
        {
            type: "bottom",
            value: 160,
        },
    ],
    OperateStartBtnWidget: [
        {
            type: "horizontalCenter",
            value: 0,
        },
        {
            type: "bottom",
            value: 60,
        },
    ],
    OperateFastNodeWidget: [
        {
            type: "right",
            value: 0,
        },
        {
            type: "bottom",
            value: 60,
        },
    ],
    OperateBillChoiceNodeWidget: [
        {
            type: "left",
            value: 10,
        },
        {
            type: "bottom",
            value: 140,
        },
    ],
    OperateBetChoiceNodeNodeWidget: [
        {
            type: "left",
            value: 10,
        },
        {
            type: "bottom",
            value: 60,
        },
    ],
};
