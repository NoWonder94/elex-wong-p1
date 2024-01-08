import { GlobalComponentSystem } from "../../submodules/cocos.framework/service/global/GlobalComponentSystem";
import { config_lang_getter } from "../config_getter/config_lang_getter";
import { const_string_lang_model } from "../config_getter/const_string_lang_model";

export class ConfigHelper {
    static getLabelValue(key: string) {
        let strings = config_lang_getter.instance.getLangData(const_string_lang_model, GlobalComponentSystem.inst.language);
        if (!strings) {
            return;
        }
        return strings[key];
    }
}