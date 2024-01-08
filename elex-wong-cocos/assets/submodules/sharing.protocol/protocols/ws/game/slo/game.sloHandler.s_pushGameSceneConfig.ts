import { GAME_ID, SCENE_ID } from '../../../../../sharing.base/consts';
/**
 * 服务器下发游戏的配置信息
 */
export interface game_sloHandler_s_pushGameSceneConfig {
    /** 游戏ID */
    game_id: GAME_ID;
    /** 场景ID */
    scene_id: SCENE_ID;
    /**
     * slo游戏bet配置
     */
    sloBetConfig: string[];
}

