import { Entity } from "../../../sharing.base/core/object/Entity";
import { CocosDecorators } from "../../CocosDecorators";

@CocosDecorators.ClassNameRegister('ConfigurationComponent')
export class ConfigurationComponent extends Entity {
    public static instance: ConfigurationComponent = null;
    /** 配置路径 */
    public path: string = '';
    /** 数据库名 */
    public dbname: string;
    /** 数据 */
    public datas: any = {};
    /** 标记需要保存 */
    public markSave: boolean = false;

}