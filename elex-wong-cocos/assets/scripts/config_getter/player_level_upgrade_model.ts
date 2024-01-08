import { config_data_file_name } from './config_data_file_name';
import { config_model_base } from './config_model';

/**
 * 玩家等级升级经验配置
 */
export class player_level_upgrade_model extends config_model_base {
	/** 等级 */
	level: number;
	/** 经验值上限 */
	exp_max: number;

	public static readonly FIELDS = {
		LEVEL: 'level',
		EXP_MAX: 'exp_max',
	}

	public static getClassName(): string {
        return 'player_level_upgrade_model'
    }

    public static getConfigName(filename?: string): string {
        return filename || config_data_file_name.player_level_upgrade;
    }

}