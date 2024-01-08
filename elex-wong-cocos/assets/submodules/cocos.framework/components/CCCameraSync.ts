
import { _decorator, Component, Node, find, Canvas, Camera } from 'cc';
const { ccclass } = _decorator;

@ccclass('CCCameraSync')
export class CCCameraSync extends Component {
    private canvasCamera: Camera;
    onLoad() {
        this.canvasCamera = find("Global").getComponent(Canvas).cameraComponent;
        this.syncCamera();
    }

    syncCamera() {
        let curCamera = this.node.getComponent(Camera);
        curCamera.orthoHeight = this.canvasCamera.orthoHeight;
        curCamera.near = this.canvasCamera.near;
        curCamera.far = this.canvasCamera.far;
    }

    onEnable() {
        this.syncCamera();
    }
}
