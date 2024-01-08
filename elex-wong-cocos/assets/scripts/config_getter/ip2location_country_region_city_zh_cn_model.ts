import { config_data_file_name } from './config_data_file_name';
import { config_model_base } from './config_model';

/**
 * 成就任务配置
 */
export class ip2location_country_region_city_zh_cn_model extends config_model_base {
	/** 国家编码 */
	country_alpha2_code: string;
	/** 国家数字编码 */
	country_numeric_code: number;
	/** 国家名称 */
	country_name: string;
	/** 区域码 */
	region_code: number;
	/** 区域名称 */
	region_name: string;
	/** 城市名 */
	city_name: string;
	/** 语言编码 */
	lang_code: string;
	/** 语言名称 */
	lang_name: string;
	/** 区域/省份 */
	lang_region_name: string;
	/** 城市名称 */
	lang_city_name: string;

	public static readonly FIELDS = {
		COUNTRY_ALPHA2_CODE: 'country_alpha2_code',
		COUNTRY_NUMERIC_CODE: 'country_numeric_code',
		COUNTRY_NAME: 'country_name',
		REGION_CODE: 'region_code',
		REGION_NAME: 'region_name',
		CITY_NAME: 'city_name',
		LANG_CODE: 'lang_code',
		LANG_NAME: 'lang_name',
		LANG_REGION_NAME: 'lang_region_name',
		LANG_CITY_NAME: 'lang_city_name',
	}

	public static getClassName(): string {
        return 'ip2location_country_region_city_zh_cn_model'
    }

    public static getConfigName(filename?: string): string {
        return filename || config_data_file_name.ip2location_country_region_city_zh_cn;
    }

    public static isPublic(): boolean {
        return true;
    }

}