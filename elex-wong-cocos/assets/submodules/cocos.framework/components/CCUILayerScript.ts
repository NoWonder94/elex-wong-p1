import { Component, _decorator, Enum } from "cc";
const { ccclass, property } = _decorator;

export enum UILayer {
    Hidden = 0,
    Low = 10,
    Mid = 20,
    High = 30,
}

@ccclass('CCUILayerScript')
export class CCUILayerScript extends Component {
    @property({ type: Enum(UILayer), tooltip: 'UI层级' })
    public UILayer: UILayer = UILayer.Low;
}