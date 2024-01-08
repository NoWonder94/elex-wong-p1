import Logger from './helper/Logger';
import { CocosDecorators } from './CocosDecorators';
import { VersionConfig } from './VersionConfig';
import { NumberHelper } from './helper/NumberHelper';

/** 挂在全局变量 */
window['logger'] = Logger;
window['SystemRegister'] = CocosDecorators.SystemRegister;
window['ClassNameRegister'] = CocosDecorators.ClassNameRegister;
window['UIEventRegister'] = CocosDecorators.UIEventRegister;

export class Global {
    public static setGlobalConfig(config: VersionConfig) {
        window['PubPlatform'] = config.PubPlatform;
        window['AppName'] = config.AppName;
        window['PlatformConfig'] = config.PlatformConfig;
        window['RemoteConfigURL'] = config.PlatformConfig.RemoteConfigURL;
        NumberHelper.init(config.PlatformConfig.FloatPrecision);
    }
}


