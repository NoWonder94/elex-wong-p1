import { Node, Canvas, Camera } from 'cc';
import { VersionConfig } from '../../VersionConfig';
import { Entity } from '../../../sharing.base/core/object/Entity';
import { CocosDecorators } from '../../CocosDecorators';
import { LANGUAGE } from '../../../sharing.base/languages';
import { GAME_ID, SCENE_ID } from '../../../sharing.base/consts';
import { CCCaptureCamera } from '../../components/CCCaptureCamera';

@CocosDecorators.ClassNameRegister('GlobalComponent')
export class GlobalComponent extends Entity {
    public static instance: GlobalComponent;
    public Global: Node;
    public Unit: Node;
    public UI: Node;
    public Canvas: Canvas;
    public captureCamera: CCCaptureCamera;

    public version: VersionConfig;
    /** 启动流事件索引 */
    public startupFlowEventIndex: number;
    /** 远程资源配置 */
    public resources: any;
    /** 语言 */
    language: LANGUAGE;
    /** 风格 */
    style: string;
    /** 定制 */
    oem: string;
    /** 选项配置 */
    options: any = {};
    /** 当前运行游戏ID */
    gameId: GAME_ID;
    /** 当前运行游戏场景ID */
    sceneId: SCENE_ID;
}
