/** 资源包 */

import { dragonBones, AnimationClip, AudioClip, Font, ImageAsset, JsonAsset, Prefab, SceneAsset, SpriteAtlas, SpriteFrame, TextAsset, ParticleAsset } from "cc";
import { GAME_CATEGORY, GAME_GRADE } from "../../sharing.base/consts";
import { DicObject } from '../../sharing.base/helper/Interfaces';

/** 资源类型映射 */
export const AssetTypeLink = {
    AudioClip: AudioClip,
    Prefab: Prefab,
    SpriteAtlas: SpriteAtlas,
    SpriteFrame: SpriteFrame,
    SceneAsset: SceneAsset,
    TextAsset: TextAsset,
    JsonAsset: JsonAsset,
    ImageAsset: ImageAsset,
    Font: Font,
    AnimationClip: AnimationClip,
    ParticleAsset: ParticleAsset,
    DragonBonesAsset: dragonBones.DragonBonesAsset,
    DragonBonesAtlasAsset: dragonBones.DragonBonesAtlasAsset,
}

export interface ResPackages {
    /** 音频片段资源 */
    AudioClip?: string[],
    /** 预制资源 */
    Prefab?: string[],
    /** 精灵图集资源 */
    SpriteAtlas?: string[],
    /** 精灵帧资源 */
    SpriteFrame?: string[],
    /** 场景资源 */
    SceneAsset?: string[],
    /** 文本资源 */
    TextAsset?: string[]
    /** Json 资源 */
    JsonAsset?: string[]
    /** 图像资源 */
    ImageAsset?: string[]
    /** 字体资源 */
    Font?: string[]
    /** 动画剪辑 */
    AnimationClip?: string[]
    /** dragonBones的骨骼数据 */
    DragonBonesAsset?: string[]
    /** dragonBones 的骨骼纹理数据 */
    DragonBonesAtlasAsset?: string[]
    /** ParticleAsset */
    ParticleAsset?: string[]
}

/** 加载资源配置 */
export interface ResPkgStruct {
    readonly general?: Array<string>,
    readonly prefabs?: Array<string>,
    readonly dragonBones?: Array<string>,
    readonly atlases?: Array<string>,
}

export class ResDirConfig {
    public static readonly COMMON_PREFABS = 'common/prefabs';
    public static readonly LOBBY_PREFABS = 'lobby/prefabs';
    public static readonly MULJOYFISH_PREFABS = 'games_muljoyfish/prefabs';
    public static readonly POKQZNN_UI_PREFABS = 'pokqznn/prefabs/ui';
    public static readonly MINIBALLPAOKU_UI_PREFABS = 'miniballpaoku/prefabs/ui';
}

export enum ResGroup {
    splash = 'splash',
    lobby = 'lobby',
    common = 'common',
    games_muljoyfish = 'games_muljoyfish',
}

/** 大厅游戏分类 */
export const LobbyCategory: DicObject<number> = {
    /** 全部游戏 */
    0: GAME_CATEGORY.POKER | GAME_CATEGORY.MJ | GAME_CATEGORY.MJ | GAME_CATEGORY.ESPORTS | GAME_CATEGORY.NEW | GAME_CATEGORY.HOT,
    /** 经典棋牌 */
    1: GAME_CATEGORY.POKER | GAME_CATEGORY.MJ,
    /** 街机电游 */
    2: GAME_CATEGORY.ESPORTS,
    /** 白人对战 */
    3: GAME_CATEGORY.MULTI,
    /** 新游推荐 */
    4: GAME_CATEGORY.NEW | GAME_CATEGORY.HOT,
}

/** 大厅游戏级别 */
export const LobbyGameGrade: DicObject<number> = {
    /** 一般 */
    0: GAME_GRADE.COMMON | GAME_GRADE.MAINTENANCE | GAME_GRADE.DEV,
    /** 火爆 */
    1: GAME_GRADE.HOT,
    /** 推荐 */
    2: GAME_GRADE.RECOMMEND,
    /** 新游戏 */
    3: GAME_GRADE.NEW,
    /** 玩过 */
    4: GAME_GRADE.PLAYED,
}


