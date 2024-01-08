import { config_data_file_name } from './config_data_file_name';
import { config_model_base } from './config_model';

/**
 * 常量参数配置
 */
export class constants_model extends config_model_base {


	public static getClassName(): string {
        return 'constants_model'
    }

    public static getConfigName(filename?: string): string {
        return filename || config_data_file_name.constants;
    }
}