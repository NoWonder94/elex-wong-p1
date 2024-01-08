import { _decorator, Component, Font, Label } from 'cc';
import { LANGUAGE } from '../../sharing.base/languages';
import { CocosDecorators } from '../CocosDecorators';
import { GlobalComponent } from '../service/global/GlobalComponent';
const { ccclass, property, executeInEditMode, requireComponent, menu } = _decorator;

@ccclass('CCFontIndex')
@CocosDecorators.ClassNameRegister('CCButtonComponent')
@executeInEditMode
@requireComponent(Label)
@menu('自定义组件/UI/CCFontIndex(字体改变)')
export default class CCFontIndex extends Component {
    @property({
        type: [Font],
        tooltip: 'Label将会用到的字体库',
    })
    fonts: Array<Font> = [null];

    @property({
        tooltip: '当前使用的字体',
        override: true,
    })
    get index() {
        return this._index;
    }
    set index(value: number) {
        this.setIndex(value);
    }
    @property
    private _index: number = 0;

    @property({
        tooltip: '当前使用的字体',
        override: true,
    })
    get strValue() {
        return this._value;
    }
    set strValue(str: number) {
        this.setValue(str);
    }
    @property
    private _value: number = 0;

    protected setIndex(value: number) {
        if (value < 0) return;
        this._index = value % this.fonts.length;
        let sprite = this.node.getComponent(Label);
        sprite.font = this.fonts[this._index];
    }

    private setValue(str: number) {
        let lang = GlobalComponent.instance.language || LANGUAGE.en_US;
        logger.info('*******dddd', lang);
        let suffix = lang == LANGUAGE.zh_CN ? 'b' : 'x';
        this._value = str;
        let sprite = this.node.getComponent(Label);
        sprite.string = str + 'x';
    }
}
