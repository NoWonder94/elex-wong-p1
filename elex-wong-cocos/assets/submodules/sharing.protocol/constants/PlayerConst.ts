import { ROOM_ID, SCENE_ID } from '../../sharing.base/consts';

/** 玩家战绩数据 */
export interface PlayerReportInfo {
    room_id: ROOM_ID,
    scene_id: SCENE_ID,
    gain_gold: number,
    round_time: number,
    round_id: string
}