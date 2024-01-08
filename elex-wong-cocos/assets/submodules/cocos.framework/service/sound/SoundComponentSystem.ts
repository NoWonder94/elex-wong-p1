import { AudioClip, AudioSource } from 'cc';
import { AwakeSystem } from '../../../sharing.base/core/object/IAwakeSystem';
import { CocosDecorators } from '../../CocosDecorators';
import { StorageConfigTable } from '../../constants/Constants';
import { ConfigurationComponentSystem } from '../configuration/ConfigurationComponentSystem';
import { GlobalComponentSystem } from '../global/GlobalComponentSystem';
import { SoundComponent } from './SoundComponent';
import { ResourcesComponentSystem } from '../resloader/ResourcesComponentSytem';
import { BOOLEAN } from '../../../sharing.base/consts';
import { SoundModel, soundModelName } from './SoundModel';
import { VM } from '../../components/mvvm/ViewModel';

@CocosDecorators.SystemRegister()
export class SoundComponentAwakeSystem extends AwakeSystem<SoundComponent> {
    constructor() {
        super(SoundComponent);
    }

    awake(self: SoundComponent, audioConfig: SoundModel) {
        SoundComponent.instance = self;

        self.soundTable = ConfigurationComponentSystem.getData<SoundModel>(StorageConfigTable.Audio);
        if (!self.soundTable) {
            self.soundTable = audioConfig;
            ConfigurationComponentSystem.setData(StorageConfigTable.Audio, self.soundTable);
        }

        VM.add(self.soundTable, soundModelName);

        self.musicAudioSource = GlobalComponentSystem.inst.Global.addComponent(AudioSource);
        self.musicAudioSource.volume = self.soundTable.music_volume * self.soundTable.master_volume;
        if (self.soundTable.music_mute === BOOLEAN.TRUE) {
            self.musicAudioSource.volume = 0;
        }

        for (let i = 0; i < self.effectNum; i++) {
            let as = GlobalComponentSystem.inst.Global.addComponent(AudioSource);
            self.effectAudioSource.push(as);
            as.volume = self.soundTable.effect_volume * self.soundTable.master_volume;
            if (self.soundTable.effect_mute === BOOLEAN.TRUE) {
                as.volume = 0;
            }
        }

        self.curEffectAudioSource = 0;
    }
}

export class SoundComponentSystem {
    /**
     * 设置主音量
     * @param value 音量值（0.0 ~ 1.0）
     */
    public static setMasterVolume(value: number): void {
        if (value < 0.0) value = 0.0;
        else if (value > 1.0) value = 1.0;

        SoundComponent.instance.soundTable.master_volume = value;
        this.setMusicVolume(SoundComponent.instance.soundTable.music_volume);
        this.setEffectVolume(SoundComponent.instance.soundTable.effect_volume);

        ConfigurationComponentSystem.markModified();
    }

    /**
     * 设置音量（音乐与特效）
     * @param value 音量值（0.0 ~ 1.0）
     */
    public static setVolume(value: number): void {
        this.setMusicVolume(value);
        this.setEffectVolume(value);
    }

    /**
     * 设置音乐音量
     * @param value 音量值（0.0 ~ 1.0）
     */
    public static setMusicVolume(value: number): void {
        let self = SoundComponent.instance;
        if (value < 0.0) value = 0.0;
        else if (value > 1.0) value = 1.0;

        self.soundTable.music_volume = value;
        let realVolume = self.soundTable.master_volume * value;
        self.musicAudioSource.volume = realVolume;

        ConfigurationComponentSystem.markModified();
    }

    /**
     * 获取音乐音量
     */
    public static getMusicVolume() {
        return SoundComponent.instance.soundTable.music_volume;
    }

    /**
     * 设置特效音量
     * @param value 音量值（0.0 ~ 1.0）
     */
    public static setEffectVolume(value: number): void {
        let self = SoundComponent.instance;

        if (value < 0.0) value = 0.0;
        else if (value > 1.0) value = 1.0;

        self.soundTable.effect_volume = value;
        let realVolume = self.soundTable.master_volume * value;
        self.effectAudioSource.forEach((as, id) => (as.volume = realVolume));

        ConfigurationComponentSystem.markModified();
    }

    /**
     * 获取特效音量
     */
    public static getEffectVolume() {
        return SoundComponent.instance.soundTable.effect_volume;
    }

    /**
     * 播放音乐
     * @param url 音频资源地址
     * @param loop 是否循环播放
     */
    public static async playMusic(url: string, loop: boolean) {
        if (!this.isValidUrl(url)) {
            return;
        }

        let self = SoundComponent.instance;
        self.musicAudioSource.stop();
        loop = loop ? true : false;
        self.musicAudioSource.loop = loop;
        self.musicAudioSource.clip = await ResourcesComponentSystem.loadAsset(url, AudioClip);
        if (self.musicAudioSource.clip) {
            self.musicAudioSource.play();
        } else {
            logger.error('music audio clip null: ', url);
        }
    }

    /**
     * 停止播放音乐
     */
    public static stopMusic() {
        SoundComponent.instance.musicAudioSource.stop();
    }

    /**
     * 暂停播放音乐
     */
    public static pauseMusic() {
        SoundComponent.instance.musicAudioSource.pause();
    }

    /**
     * 继续播放音乐
     */
    public static resumeMusic() {
        SoundComponent.instance.musicAudioSource.play();
    }

    /**
     * 播放音效
     * @param url 音频资源地址
     * @param loop 是否循环播放
     */
    public static async playEffect(url: string, loop: boolean = false) {
        if (!this.isValidUrl(url)) {
            return;
        }

        let self = SoundComponent.instance;
        let as = self.effectAudioSource[self.curEffectAudioSource];
        self.effectAudioSourceIndex.set(url, self.curEffectAudioSource);
        self.curEffectAudioSource++;
        if (self.curEffectAudioSource >= self.effectNum) {
            self.curEffectAudioSource = 0;
        }

        as.loop = loop;

        as.clip = await ResourcesComponentSystem.loadAsset(url, AudioClip);
        if (as.clip) {
            as.play();
        } else {
            logger.error('effect audio clip null: ', url);
        }
    }

    public static stopEffect(url: string) {
        let self = SoundComponent.instance;
        let index = self.effectAudioSourceIndex.get(url);
        if (null != index) {
            let as = self.effectAudioSource[index];
            as.stop();
        }
    }

    /**
     * 停止所有特效音频
     */
    public static stopAllEffect(): void {
        SoundComponent.instance.effectAudioSource.forEach((as) => {
            as.stop();
        });
    }

    /**
     * 暂停所有特效音频
     */
    public static pauseAllEffect(): void {
        SoundComponent.instance.effectAudioSource.forEach((as) => as.stop());
    }

    /**
     * 恢复所有特效音频
     */
    public static resumeAllEffect(): void {
        SoundComponent.instance.effectAudioSource.forEach((as) => as.play());
    }

    /**
     * 停止所有音频
     */
    public static stopAll(): void {
        this.stopMusic();
        this.stopAllEffect();
    }

    /**
     * 暂停所有音频
     */
    public static pauseAll(): void {
        this.pauseMusic();
        this.pauseAllEffect();
    }

    /**
     * 恢复所有音频
     */
    public static resumeAll(): void {
        this.resumeMusic();
        this.resumeAllEffect();
    }

    /**
     * 设置音乐静音
     * @param mute 是否静音
     */
    public static setMusicMute(mute: BOOLEAN) {
        let self = SoundComponent.instance;
        self.soundTable.music_mute = mute ? 1 : 0;
        self.soundTable.master_volume = 1;
        this.setMusicVolume(self.soundTable.music_mute);
        ConfigurationComponentSystem.markModified();
    }

    public static switchMusicMute() {
        let self = SoundComponent.instance;
        this.setMusicMute(self.soundTable.music_mute === BOOLEAN.TRUE ? BOOLEAN.FALSE : BOOLEAN.TRUE);
    }

    /**
     * 设置特效静音
     * @param mute 静音状态
     */
    public static setEffectMute(mute: BOOLEAN) {
        let self = SoundComponent.instance;
        self.soundTable.effect_mute = mute ? 1 : 0;
        self.soundTable.master_volume = 1;
        this.setEffectVolume(self.soundTable.effect_mute);
        ConfigurationComponentSystem.markModified();
    }

    public static switchEffectMute() {
        let self = SoundComponent.instance;
        this.setEffectMute(self.soundTable.effect_mute === BOOLEAN.TRUE ? BOOLEAN.FALSE : BOOLEAN.TRUE);
    }

    /**
     * 主音量开关
     */
    public static switchMasterMute(): void {
        let self = SoundComponent.instance;
        this.setMasterVolume(self.soundTable.master_volume > 0 ? 0 : 1);
    }

    /** 初始化 */
    public static initMasterMute(): void {
        let self = SoundComponent.instance;
        this.setMasterVolume(self.soundTable.master_volume);
    }

    private static isValidUrl(url: string) {
        if (!url) {
            return false;
        }

        url = url.trim();
        if ('' === url) {
            return false;
        }
        return true;
    }
}
