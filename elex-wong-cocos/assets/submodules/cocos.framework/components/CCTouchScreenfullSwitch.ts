import { _decorator, Component, director } from 'cc';
const { ccclass } = _decorator;

@ccclass('CCTouchScreenfullSwitch')
export class CCTouchScreenfullSwitch extends Component {
    onEnable() {
        director.emit('CCTouchScreenfullSwitch', true, this.uuid);
    }

    onDisable() {
        director.emit('CCTouchScreenfullSwitch', false, this.uuid);
    }
}
