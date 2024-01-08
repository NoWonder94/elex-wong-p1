
import { _decorator, Component, Sprite, Camera, SpriteFrame, view, gfx, RenderTexture, UITransform } from 'cc';
import { CCCameraSync } from './CCCameraSync';
const { ccclass } = _decorator;

@ccclass('CCCaptureCamera')
export class CCCaptureCamera extends Component {
    private captureCameras: Array<Camera> = [];
    private spriteFrame = new SpriteFrame();
    private renderSprite: Sprite = null;

    addCamera(camera: Camera) {
        let size = view.getVisibleSize();
        camera.node.active = true;
        let rt = new RenderTexture();
        if (rt) {
            const colorAttachment = new gfx.ColorAttachment();
            colorAttachment.loadOp = gfx.LoadOp.LOAD;
            const depthStencilAttachment = new gfx.DepthStencilAttachment();
            const passInfo = new gfx.RenderPassInfo([colorAttachment], depthStencilAttachment);
            rt.reset({ width: size.width, height: size.height, passInfo: passInfo });
            this.spriteFrame.texture = rt;
        }
        camera.targetTexture = rt;
        this.captureCameras.push(camera);
        camera.node.active = false;
    }

    startRender(sp: Sprite): void {
        let size = view.getVisibleSize();
        this.captureCameras.forEach(camera => {
            camera.node.active = true;
            let rt = camera.targetTexture;
            if (rt) {
                rt.resize(size.width, size.height);
            }
        });
        sp.node.getComponent(UITransform).contentSize = view.getVisibleSize();
        sp.spriteFrame = this.spriteFrame;
        this.renderSprite = sp;
    }

    stopRender() {
        this.captureCameras.forEach(camera => {
            camera.node.active = false;
        });
        this.renderSprite.spriteFrame = null;
        this.renderSprite = null;
    }
}
