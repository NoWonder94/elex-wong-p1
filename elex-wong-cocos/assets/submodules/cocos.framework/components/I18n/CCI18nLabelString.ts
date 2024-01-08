import { _decorator, Label, RichText } from "cc";
import { CCI18nBase } from "./CCI18nBase";
import { GlobalComponentSystem } from "../../service/global/GlobalComponentSystem";
import { FunctionCaller } from "../../../sharing.base/helper/FunctionCaller";
import { GlobalOptionsKey } from "../../constants/Constants";
const { ccclass, requireComponent } = _decorator;

@ccclass("CCI18nLabelString")
@requireComponent(Label)
export class CCI18nLabelString extends CCI18nBase<string> {
    private label: Label | RichText | null = null;

    protected onLoad() {
        super.onLoad();
        this.label = this.node.getComponent(Label) || this.node.getComponent(RichText);
    }

    protected async getRes(): Promise<string> {
        if (!this.resId) {
            return;
        }

        let caller = GlobalComponentSystem.getOptions<FunctionCaller>(GlobalOptionsKey.GetLabelValue);
        if (!caller) {
            return;
        }
        return caller.exec(this.resId);
    }

    protected async setRes() {
        let value = await this.getRes();
        if (!value) {
            return;
        }
        if (this.label) this.label.string = value;
    }
}
