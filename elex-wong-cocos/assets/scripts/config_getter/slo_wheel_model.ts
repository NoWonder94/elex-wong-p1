import { config_data_file_name } from './config_data_file_name';
import { config_model_base } from './config_model';

/**
 * 卷轴模型配置
 */
export class slo_wheel_model extends config_model_base {
	/** 模型等级 */
	id: number;
	/** 模型 */
	wheel: any;
	/** 权重模型 */
	wheel_weight: any;
	/** 免费模型 */
	wheel_free: any;
	/** 免费权重模型 */
	wheel_free_weight: any;

	public static readonly FIELDS = {
		ID: 'id',
		WHEEL: 'wheel',
		WHEEL_WEIGHT: 'wheel_weight',
		WHEEL_FREE: 'wheel_free',
		WHEEL_FREE_WEIGHT: 'wheel_free_weight',
	}

	public static getClassName(): string {
        return 'slo_wheel_model'
    }

    public static getConfigName(filename?: string): string {
        return filename;
    }

}