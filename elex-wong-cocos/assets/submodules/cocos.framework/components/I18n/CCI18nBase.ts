import { _decorator, Component } from "cc";
import { EventGlobalComponentSystem } from "../../../sharing.base/service/event/EventGlobalComponentSystem";
import { SubscibeEvent } from "../../SubscibeEvent";
import { LANGUAGE } from '../../../sharing.base/languages';
import { FunctionCaller } from "../../../sharing.base/helper/FunctionCaller";
import { GlobalComponentSystem } from '../../service/global/GlobalComponentSystem';

/**
 * 多语言组件基类
 */
export abstract class CCI18nBase<T> extends Component {
    protected curLang: LANGUAGE;
    public resId: string;

    private langChanged(lang: LANGUAGE) {
        if (this.curLang === lang) {
            return;
        }
        this.curLang = lang
        this.onLangChanged();
    }

    protected onLoad() {
        this.curLang = GlobalComponentSystem.inst.language;
        EventGlobalComponentSystem.on(SubscibeEvent.LanguageChange, FunctionCaller.create(this.langChanged, this));
    }

    protected onDestroy() {
        EventGlobalComponentSystem.off(SubscibeEvent.LanguageChange, this.langChanged, this);
    }

    /**
     * 语言更改回调（子类重写该函数以具体实现）
     */
    protected onLangChanged() {
        this.setRes()
    }

    /**
     * 获取当前语言资源
     */
    protected abstract getRes(): Promise<T>;

    /**
     * 设置当前语言资源
     */
    protected abstract setRes(): Promise<void>;

    /**
     * 设置当前语言资源id
     */
    public setResId(resId: string) {
        this.resId = resId;
        this.onLangChanged();
        return this;
    }

    public set ResId(v: string) {
        this.setResId(v);
    }

}
