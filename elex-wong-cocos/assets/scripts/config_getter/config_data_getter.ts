import { config_model_base, ConfigClass } from './config_model';

interface DataConfigStruct {
	fieldData: any[];
	fieldMap: any;
}

export class config_data_getter {
	/** 配置数据 */
	private modelDatas = new Map<string, DataConfigStruct>();

	private static _instance: config_data_getter = null;

	public static get instance() {
		if (null == config_data_getter._instance) {
			config_data_getter._instance = new config_data_getter();
		}

		return config_data_getter._instance;
	}

	/**
	* 获取配置数据行数
	* @param configClass 数据模型类
	* @param dataFile 数据文件名
	*/
	public getRowNumber<T extends config_model_base>(configClass: ConfigClass<T>, dataFile?: string): number {
		let configData = this.getConfigData(configClass, dataFile);
		if (null == configData) {
			return 0;
		}
		return configData.fieldData.length;
	}

	/**
	 * 通过数组索引获取数据
	 * 字段key必须定义为索引字段
	 * @param configClass 数据模型类
	 * @param index 数组坐标
	 * @param dataFile 数据文件名
	 */
	public getRowById<T extends config_model_base>(configClass: ConfigClass<T>, index: number, dataFile?: string): T {
		let configData = this.getConfigData(configClass, dataFile);
		if (null == configData) {
			return;
		}

		if (index >= configData.fieldData.length) {
			return;
		}

		return configData.fieldData[index];
	}

	/**
	 * 通过key、value映射map索引数据
	 * 字段key必须定义为索引字段
	 * @param configClass 数据模型类
	 * @param key 索引字段
	 * @param value 索引值
	 * @param dataFile 数据文件名
	 */
	public getRowByIndex<T extends config_model_base>(configClass: ConfigClass<T>, key: string, value: any, dataFile?: string): T {
		let configData = this.getConfigData(configClass, dataFile);
		if (null == configData) {
			return;
		}

		let rowDataIndex = configData.fieldMap[key + '_' + value.toString()];
		if (null == rowDataIndex) {
			console.log(`在模型配置文件${configClass.getClassName()}中,字段【${key}】未创建索引, 不能通过该字段查找数据`);
			return null;
		}
		let rowData = configData.fieldData[rowDataIndex];
		if (!rowData) {
			console.log(`在数据文件${configClass.getConfigName(dataFile)}中找不到指定配置key=${key}&value=${value}, 请重新生成数据文件`);
			return null;
		}
		return rowData;
	}

	/**
	* 通过key、value匹配获取数据
	 * @param configClass 数据模型类
	 * @param key 字段名
	 * @param value 值
	 * @param dataFile 数据文件名
	*/
	public getRowByEnumKV<T extends config_model_base>(configClass: ConfigClass<T>, key: string, value: any, dataFile?: string): T {
		let configData = this.getConfigData(configClass, dataFile);
		if (null == configData) {
			return;
		}

		for (let i = 0; i <= configData.fieldData.length; i++) {
			let rowData: any = this.getRowById(configClass, i, dataFile) as any;
			if (rowData && rowData[key] === value) {
				return rowData;
			}
		}
	}

	/**
	* 获取数据集合
	* @param configClass 数据模型类
	* @param dataFile 数据文件名
	*/
	public getDataArray<T extends config_model_base>(configClass: ConfigClass<T>, dataFile?: string): T[] {
		let configData = this.getConfigData(configClass, dataFile);
		if (null == configData) {
			return;
		}

		return configData.fieldData;
	}

	private getConfigData<T extends config_model_base>(uiClass: ConfigClass<T>, filename: string): DataConfigStruct {
		let cfgFileName = uiClass.getConfigName(filename);
		let configData = this.modelDatas.get(cfgFileName)
		if (!configData) {
			let configUrl = uiClass.getUrl(cfgFileName);
			configData = config_model_base.loadJson(configUrl);
			if (configData) {
				console.log(`读取磁盘文件${cfgFileName}成功`)
				// 空间换时间
				let newFiledData = [];
				let fields = Object.values<string>(uiClass.FIELDS);
				for (let i = 0; i < configData.fieldData.length; i++) {
					let rowDatas = configData.fieldData[i];
					let item: any = {};
					for (let j = 0; j < rowDatas.length; j++) {
						if (!fields[j]) {
							console.log(`配置文件${cfgFileName}数据和模型不匹配，请重新生成配置`);
							return;
						}
						item[fields[j]] = rowDatas[j];
					}
					newFiledData.push(item);
				}
				configData.fieldData = newFiledData;
			}
			this.modelDatas.set(cfgFileName, configData);
		}

		if (!configData) {
			console.log(`配置文件${cfgFileName}不存在, 请检查`);
		}

		return configData;
	}
}