import { sys } from "cc";
import { AwakeSystem } from "../../../sharing.base/core/object/IAwakeSystem";
import { UpdateSystem } from "../../../sharing.base/core/object/IUpdateSystem";
import { CocosDecorators } from "../../CocosDecorators";
import { StorageHelper } from "../../helper/StorageHelper";
import { ConfigurationComponent } from "./ConfigurationComponent";

@CocosDecorators.SystemRegister()
export class ConfigurationComponentAwakeSystem extends AwakeSystem<ConfigurationComponent>{
    constructor() {
        super(ConfigurationComponent)
    }

    awake(self: ConfigurationComponent, dbname: string) {
        ConfigurationComponent.instance = self;
        self.dbname = dbname;


        // self.path = ConfigurationComponentSystem.getConfigPath();
        let content = StorageHelper.get(dbname);
        // if (sys.isNative) {
        //     content = jsb.fileUtils.getValueMapFromFile(self.path);
        // } else {
        //     content = StorageHelper.get(dbname);
        // }

        if (content && content.length) {
            if (content.startsWith('@')) {
                content = content.substring(1);
            }

            try {
                // 初始化操作
                self.datas = JSON.parse(content);
            } catch (err) {

            }
        }
    }
}

@CocosDecorators.SystemRegister()
export class ConfigurationComponentUpdateSystem extends UpdateSystem<ConfigurationComponent>{
    constructor() {
        super(ConfigurationComponent)
    }

    update(self: ConfigurationComponent) {
        ConfigurationComponentSystem.scheduleSave(self);
    }
}

export class ConfigurationComponentSystem {

    public static getData<T>(table: string, id?: string): T {
        let tdata = ConfigurationComponent.instance.datas[table];
        if (null == tdata) {
            return null;
        }

        if (id) {
            return tdata[id];
        }

        return tdata;
    }

    public static setData<T>(table: string, data: T, id?: string) {
        if (!id) {
            ConfigurationComponent.instance.datas[table] = data;
        } else {
            let tdata = ConfigurationComponent.instance.datas[table];
            if (!tdata) {
                tdata = ConfigurationComponent.instance.datas[table] = {};
            }
            tdata[id] = data;
        }

        this.markModified();
    }

    public static delData<T>(table: string, id?: string) {
        if (!id) {
            delete ConfigurationComponent.instance.datas[table];
        } else {
            let tdata = ConfigurationComponent.instance.datas[table];
            if (!tdata) {
                return;
            }
            delete tdata[id];
        }
        this.markModified();
    }

    /**
     * 标记为已修改
     */
    public static markModified() {
        ConfigurationComponent.instance.markSave = true;
    }

    public static getConfigPath() {
        let self = ConfigurationComponent.instance;
        let platform = sys.platform;
        let path = '';

        if (platform === sys.OS.WINDOWS) {
            path = `src/${self.dbname}`;
        } else if (platform === sys.OS.LINUX) {
            path = `./${self.dbname}`;
        } else {
            if (sys.isNative) {
                path = jsb.fileUtils.getWritablePath();
                path = path + self.dbname;
            } else {
                path = `src/${self.dbname}`;
            }
        }
        return path;
    }

    public static scheduleSave(self: ConfigurationComponent) {
        if (!self.markSave) {
            return;
        }
        this.save();
    }

    public static save() {
        let self = ConfigurationComponent.instance;
        // 写入文件
        let str = JSON.stringify(self.datas);

        const zipStr = str;

        self.markSave = false;

        if (!sys.isNative) {
            StorageHelper.set(self.dbname, zipStr);
            return;
        }
        jsb.fileUtils.writeToFile(zipStr);
    }
}



