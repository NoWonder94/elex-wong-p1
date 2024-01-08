import { config_data_file_name } from './config_data_file_name';
import { config_model_base } from './config_model';

/**
 * slo基础配置
 */
export class slo_base_config_model extends config_model_base {
	/** 游戏ID */
	id: string;
	/** 图标数量 */
	tile_num: number;
	/** 卷轴列数 */
	wheel_col: number;
	/** 卷轴行数 */
	wheel_row: number;
	/** 中奖线数 */
	line_num: number;
	/** 百搭编号 */
	wild_id: number;
	/** 百搭奖励 */
	wild_award: any;
	/** Scatter编号 */
	scatter_id: number;
	/** Scatter奖励 */
	scatter_award: any;
	/** Bonus编号 */
	bonus_id: number;
	/** Bonus奖励 */
	bonus_award: any;
	/** 普通奖励 */
	normal_award: any;
	/** 中奖线 */
	line: any;
	/** 中奖线坐标 */
	line_pos: any;

	public static readonly FIELDS = {
		ID: 'id',
		TILE_NUM: 'tile_num',
		WHEEL_COL: 'wheel_col',
		WHEEL_ROW: 'wheel_row',
		LINE_NUM: 'line_num',
		WILD_ID: 'wild_id',
		WILD_AWARD: 'wild_award',
		SCATTER_ID: 'scatter_id',
		SCATTER_AWARD: 'scatter_award',
		BONUS_ID: 'bonus_id',
		BONUS_AWARD: 'bonus_award',
		NORMAL_AWARD: 'normal_award',
		LINE: 'line',
		LINE_POS: 'line_pos',
	}

	public static getClassName(): string {
        return 'slo_base_config_model'
    }

    public static getConfigName(filename?: string): string {
        return filename || config_data_file_name.slo_base_config;
    }

}