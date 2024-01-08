import { SloResConfig } from "../../../../../cocos_slo/slo/slo/scripts/ui/UISlo/SloStructDefine";

const BskgResExtConfig = {
    /** 哥布林 */
    BskgRole: {
        Audios: {
            gain1: "slobskg/audio/bskg_role_win1",
            gain2: "slobskg/audio/bskg_role_win2",
        },
        Effect: {
            default: "slobskg/animation/bskg_roleani1",
            gain1: "slobskg/animation/bskg_roleani2",
        },
    },
    /** 音效 */
    BskgAudios: {
        scatters: [
            /** scatter 出现音效1 */
            "slobskg/audio/bskg_scat_appear1",
            /** scatter 出现音效2 */
            "slobskg/audio/bskg_scat_appear2",
        ],
        fastReel: [
            /** 前3列出现2个scatter,第四列加速旋转音效 */
            "slobskg/audio/bskg_reel_fast_spin1",
            /** 前4列出现2个scatter,第五列加速旋转音效 */
            "slobskg/audio/bskg_reel_fast_spin2",
        ],
    },
    /** 列特效 */
    BskgEffects: {
        reelFast: "slobskg/animation/bskg_reel_fast",
        dustEffect_1: "slobskg/animation/bskg_dust_1",
        dustEffect_2: "slobskg/animation/bskg_dust_2",
    },
};

export type SlobskgResConfig = SloResConfig & typeof BskgResExtConfig;

/** 宝石矿工资源配置 */
export const BskgResConfig: SlobskgResConfig = {
    /** 图标配置 */
    Icons: {
        1: {
            background: "bskg_icon_background_4",
            icon: "bskg_icon_1",
            special: "bskg_icon_special_1",
            effectIcon: {
                front: "slobskg/animation/bskg_icon_1",
            },
        },
        2: {
            background: "bskg_icon_background_4",
            icon: "bskg_icon_2",
            special: "bskg_icon_special_2",
            effectIcon: {
                front: "slobskg/animation/bskg_icon_2",
            },
        },
        3: {
            background: "bskg_icon_background_3",
            icon: "bskg_icon_3",
            effectBackgroundBomb: "slobskg/animation/bskg_icon_di3",
            effectIcon: {
                front: "slobskg/animation/bskg_icon_3",
            },
        },
        4: {
            background: "bskg_icon_background_3",
            icon: "bskg_icon_4",
            effectBackgroundBomb: "slobskg/animation/bskg_icon_di3",
            effectIcon: {
                front: "slobskg/animation/bskg_icon_4",
            },
        },
        5: {
            background: "bskg_icon_background_3",
            icon: "bskg_icon_5",
            effectBackgroundBomb: "slobskg/animation/bskg_icon_di3",
            effectIcon: {
                front: "slobskg/animation/bskg_icon_5",
            },
        },
        6: {
            background: "bskg_icon_background_2",
            icon: "bskg_icon_6",
            effectBackgroundBomb: "slobskg/animation/bskg_icon_di2",
            // effectIcon: 'slobskg/animation/bskg_icon_6',
            effectIcon: {
                back: "slobskg/animation/bskg_icon_6",
            },
        },
        7: {
            background: "bskg_icon_background_2",
            icon: "bskg_icon_7",
            effectBackgroundBomb: "slobskg/animation/bskg_icon_di2",
            // effectIcon: 'slobskg/animation/bskg_icon_7',
            effectIcon: {
                back: "slobskg/animation/bskg_icon_7",
            },
        },
        8: {
            background: "bskg_icon_background_2",
            icon: "bskg_icon_8",
            effectBackgroundBomb: "slobskg/animation/bskg_icon_di2",
            // effectIcon: 'slobskg/animation/bskg_icon_8',
            effectIcon: {
                back: "slobskg/animation/bskg_icon_8",
            },
        },
        9: {
            background: "bskg_icon_background_1",
            icon: "bskg_icon_9",
            effectBackgroundBomb: "slobskg/animation/bskg_icon_di",
            effectIcon: {
                back: "slobskg/animation/bskg_icon_kuang",
            },
        },
        10: {
            background: "bskg_icon_background_1",
            icon: "bskg_icon_10",
            effectBackgroundBomb: "slobskg/animation/bskg_icon_di",
            effectIcon: {
                back: "slobskg/animation/bskg_icon_kuang",
            },
        },
        11: {
            background: "bskg_icon_background_1",
            icon: "bskg_icon_11",
            effectBackgroundBomb: "slobskg/animation/bskg_icon_di",
            effectIcon: {
                back: "slobskg/animation/bskg_icon_kuang",
            },
        },
        12: {
            background: "bskg_icon_background_1",
            icon: "bskg_icon_12",
            effectBackgroundBomb: "slobskg/animation/bskg_icon_di",
            effectIcon: {
                back: "slobskg/animation/bskg_icon_kuang",
            },
        },
    },
    /** 音效 */
    Audios: {
        background: "slobskg/audio/bskg_background_mus",
        hit: "slobskg/audio/sdmn_button",
        gain: "slobskg/audio/bskg_bom",
        spin: "slobskg/audio/bskg_reel",
        reel_stop: "slobskg/audio/bskg_reelstop",
    },
    /** 旋转按钮特效配置 */
    SpinBtnEffect: {
        Start: "",
        Stop: "",
        Default: "",
        Running: "",
    },
    BskgRole: BskgResExtConfig.BskgRole,
    BskgAudios: BskgResExtConfig.BskgAudios,
    BskgEffects: BskgResExtConfig.BskgEffects,
};
