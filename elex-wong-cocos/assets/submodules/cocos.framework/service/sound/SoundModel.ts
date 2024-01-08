import { BOOLEAN } from '../../../sharing.base/consts';

const soundModel = {
    /** 主音量 */
    master_volume: 1,
    /** 音乐音量 */
    music_volume: 1,
    /** 音乐静音 */
    music_mute: BOOLEAN.FALSE,
    /** 特效音量 */
    effect_volume: 1,
    /** 特效静音 */
    effect_mute: BOOLEAN.FALSE,
};

export const soundModelName = 'sound';

export type SoundModel = typeof soundModel;
