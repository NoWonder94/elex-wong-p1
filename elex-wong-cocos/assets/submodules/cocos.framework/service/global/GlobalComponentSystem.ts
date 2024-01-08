import { Camera, Canvas, find, Node } from 'cc';
import { AwakeSystem } from '../../../sharing.base/core/object/IAwakeSystem';
import { GlobalComponent } from './GlobalComponent';
import { VersionConfig } from '../../VersionConfig';
import BrowserHelper from '../../helper/BrowserHelper';
import { UrlParamKey } from '../../../sharing.base/oem';
import { ResourcesComponentSystem } from '../resloader/ResourcesComponentSytem';
import { AssetBundleHelper } from '../resloader/AssetBundleHelper';
import { EventGlobalComponentSystem } from '../../../sharing.base/service/event/EventGlobalComponentSystem';
import { SubscibeEvent } from '../../SubscibeEvent';
import { CocosDecorators } from '../../CocosDecorators';
import { LANGUAGE } from '../../../sharing.base/languages';
import { ConfigurationComponentSystem } from '../configuration/ConfigurationComponentSystem';
import { StorageConfigTable } from '../../constants/Constants';
import CCReferenceCollector from '../../components/CCReferenceCollector';
import { CCCaptureCamera } from '../../components/CCCaptureCamera';
import { CCCameraSync } from '../../components/CCCameraSync';

@CocosDecorators.SystemRegister()
export class GlobalComponentAwakeSystem extends AwakeSystem<GlobalComponent> {
    constructor() {
        super(GlobalComponent);
    }

    awake(self: GlobalComponent, version: VersionConfig) {
        GlobalComponent.instance = self;

        self.Global = find('/Global');
        self.Canvas = self.Global.getComponent(Canvas);

        let rc = self.Global.getComponent(CCReferenceCollector);
        self.Unit = rc.get('Unit');
        self.UI = find('/Global/UI');


        let captureCameraNode = rc.get<Node>('CaptureCamera');
        captureCameraNode.addComponent(CCCameraSync);
        self.captureCamera = self.Global.addComponent(CCCaptureCamera);
        self.captureCamera.addCamera(captureCameraNode.getComponent(Camera))

        self.version = version;
        self.startupFlowEventIndex = 0;

        self.language = this.defaultLang;
        self.style = this.DefaultStyle;
        self.oem = this.DefaultOem;
    }

    private get defaultLang() {
        return (BrowserHelper.getParam(UrlParamKey.LANG) || ConfigurationComponentSystem.getData<string>(StorageConfigTable.Sys, UrlParamKey.LANG) || GlobalComponentSystem.envConfig.DefaultLanguage) as LANGUAGE;
    }

    private get DefaultStyle() {
        return ConfigurationComponentSystem.getData<string>(BrowserHelper.getParam(UrlParamKey.STYLE) || StorageConfigTable.Sys, UrlParamKey.STYLE) || GlobalComponentSystem.envConfig.DefaultStyle;
    }

    private get DefaultOem() {
        return ConfigurationComponentSystem.getData<string>(BrowserHelper.getParam(UrlParamKey.OEM) || StorageConfigTable.Sys, UrlParamKey.OEM) || GlobalComponentSystem.envConfig.DefaultOem;
    }
}

export class GlobalComponentSystem {
    public static getNextEvent() {
        return this.envConfig.StartupFlowEvent[GlobalComponent.instance.startupFlowEventIndex++];
    }

    public static get inst() {
        return GlobalComponent.instance;
    }

    public static get language() {
        return this.inst.language;
    }

    public static get envConfig() {
        return GlobalComponent.instance.version.PlatformConfig;
    }

    /** 切换语言 */
    public static async changeLang(lang: LANGUAGE) {
        // 设置语言
        GlobalComponent.instance.language = lang;

        let baseBundles = ResourcesComponentSystem.getBaseBundleNames();
        let bundles = AssetBundleHelper.getBundleNames(GlobalComponentSystem.envConfig.BundleNames, baseBundles, GlobalComponentSystem.inst.language, null, null);
        await ResourcesComponentSystem.loadBundlesConfig(bundles);

        ConfigurationComponentSystem.setData<string>(StorageConfigTable.Sys, lang, UrlParamKey.LANG);

        EventGlobalComponentSystem.emit(SubscibeEvent.LanguageChange, lang);
    }

    /** 设置动态配置 */
    public static async setResouces(resouces: any) {
        GlobalComponent.instance.resources = resouces;
    }

    /** 获取动态配置 */
    public static getResouces() {
        return GlobalComponent.instance.resources;
    }

    public static set gameId(v) {
        GlobalComponent.instance.gameId = v;
    }

    public static get gameId() {
        return GlobalComponent.instance.gameId;
    }

    public static set sceneId(v) {
        GlobalComponent.instance.sceneId = v;
    }

    public static get sceneId() {
        return GlobalComponent.instance.sceneId;
    }

    /** 设置Options */
    public static setOptions<T>(key: string, value: T) {
        GlobalComponent.instance.options[key] = value;
    }

    /** 获取Options */
    public static getOptions<T>(key: string): T {
        return GlobalComponent.instance.options[key];
    }
}
