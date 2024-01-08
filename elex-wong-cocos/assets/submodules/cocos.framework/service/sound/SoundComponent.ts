import { AudioSource } from "cc";
import { BOOLEAN } from "../../../sharing.base/consts";
import { Entity } from '../../../sharing.base/core/object/Entity';
import { CocosDecorators } from "../../CocosDecorators";
import { SoundModel } from "./SoundModel";

// export interface AudioTable {
//     /** 主音量 */
//     master_volume?: number,
//     /** 音乐音量 */
//     music_volume?: number,
//     /** 音乐静音 */
//     music_mute?: BOOLEAN,
//     /** 特效音量 */
//     effect_volume?: number,
//     /** 特效静音 */
//     effect_mute?: BOOLEAN,
// }

@CocosDecorators.ClassNameRegister('SoundComponent')
export class SoundComponent extends Entity {
    public static instance: SoundComponent = null;
    /** 特效通道数 */
    public effectNum: number = 8;
    /** 音乐组件 */
    public musicAudioSource: AudioSource | null = null;
    /** 特效组件 */
    public effectAudioSource: Array<AudioSource> = [];
    /** 特效 */
    public effectAudioSourceIndex = new Map<string, number>();
    /** 特效当前通道 */
    public curEffectAudioSource: number = 0;
    /** 音频配置表 */
    public soundTable: SoundModel = null;
}