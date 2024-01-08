import { config_data_file_name } from './config_data_file_name';
import { config_model_base } from './config_model';

/**
 * 成就任务配置
 */
export class activity_task_once_model extends config_model_base {
	/** 任务id */
	id: number;
	/** 后续任务 */
	after_id: number;
	/** 任务描述 */
	desc_id: number;
	/** 任务目标类型 */
	target_type: number;
	/** 任务目标子类型 */
	target_sub_type: number;
	/** 达成目标值 */
	target_value: number;
	/** 奖励 */
	reward: any;

	public static readonly FIELDS = {
		ID: 'id',
		AFTER_ID: 'after_id',
		DESC_ID: 'desc_id',
		TARGET_TYPE: 'target_type',
		TARGET_SUB_TYPE: 'target_sub_type',
		TARGET_VALUE: 'target_value',
		REWARD: 'reward',
	}

	public static getClassName(): string {
        return 'activity_task_once_model'
    }

    public static getConfigName(filename?: string): string {
        return filename || config_data_file_name.activity_task_once;
    }

}