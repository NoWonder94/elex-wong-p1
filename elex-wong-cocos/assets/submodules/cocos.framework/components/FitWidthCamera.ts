import { _decorator, Component, Camera, view, } from "cc";
const { ccclass, property, requireComponent } = _decorator;

@ccclass
@requireComponent(Camera)
export class FitWidthCamerats extends Component {

    private _camera!: Camera;
    private _defaultTanFov!: number;

    onLoad() {
        this._camera = this.getComponent(Camera)!;
        this._defaultTanFov = Math.tan(this._camera.fov / 180 * Math.PI);
        this.updateFov();
        window.addEventListener('resize', this.updateFov);
    }

    updateFov = () => {
        let tan2 = view.getVisibleSize().height / view.getDesignResolutionSize().height * this._defaultTanFov;
        logger.info('===111camera fov=', this._camera.fov);
        this._camera.fov = Math.atan(tan2) / Math.PI * 180;
        logger.info('===222camera fov=', this._camera.fov);
    }

    onDestroy() {
        window.removeEventListener('resize', this.updateFov);
    }

}