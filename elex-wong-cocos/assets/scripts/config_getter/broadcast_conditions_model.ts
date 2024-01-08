import { config_data_file_name } from './config_data_file_name';
import { config_model_base } from './config_model';

/**
 * 公告触发条件配置
 */
export class broadcast_conditions_model extends config_model_base {
	/** 任务id */
	id: string;
	/** 优先级 */
	priority: number;
	/** 次数 */
	times: number;
	/** 条件 */
	condition: number;
	/** 推送延时（秒） */
	delay: number;
	/** 任务描述 */
	desc: string;

	public static readonly FIELDS = {
		ID: 'id',
		PRIORITY: 'priority',
		TIMES: 'times',
		CONDITION: 'condition',
		DELAY: 'delay',
		DESC: 'desc',
	}

	public static getClassName(): string {
        return 'broadcast_conditions_model'
    }

    public static getConfigName(filename?: string): string {
        return filename || config_data_file_name.broadcast_conditions;
    }

}