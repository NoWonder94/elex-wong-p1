import { Asset, game, sys } from "cc";
import { AwakeSystem } from "../../sharing.base/core/object/IAwakeSystem";
import { FailInfo, HotUpdateComponent, HotUpdateEvent, NewVersionInfo, UpdateProgressInfo, ErrorInfo } from './HotUpdateComponent';
import { DestroySystem } from "../../sharing.base/core/object/IDestroySystem";
import { FunctionCaller } from "../../sharing.base/helper/FunctionCaller";
import { CocosDecorators } from "../../cocos.framework/CocosDecorators";

@CocosDecorators.SystemRegister()
export class HotUpdateComponentAwakeSystem extends AwakeSystem<HotUpdateComponent>{
    constructor() {
        super(HotUpdateComponent);
    }

    public awake(self: HotUpdateComponent, manifestAsset: Asset, remoteName: string) {
        self.manifestAsset = manifestAsset;
        self.resName = remoteName;
    }
}

@CocosDecorators.SystemRegister()
export class HotUpdateComponentDestroySystem extends DestroySystem<HotUpdateComponent>{
    constructor() {
        super(HotUpdateComponent);
    }

    destroy(self: HotUpdateComponent) {
        HotUpdateComponentSystem.destroy(self);
    }
}

/**
 * Setup your own version compare handler, versionA and B is versions in string
 * if the return value greater than 0, versionA is greater than B,
 * if the return value equals 0, versionA equals to B,
 * if the return value smaller than 0, versionA is smaller than B.
 * @param versionA 
 * @param versionB 
 */
function versionCompareHandle(versionA: string, versionB: string): number {
    let self: HotUpdateComponent = this;
    self.localVersion = versionA;
    self.remoteVersion = versionB;
    console.log("JS Custom Version Compare: local version is " + versionA + ', remote version is ' + versionB);
    const vA = versionA.split('.');
    const vB = versionB.split('.');
    for (let i = 0; i < vA.length; ++i) {
        const a = parseInt(vA[i]);
        const b = parseInt(vB[i] || '0');
        if (a === b) {
            continue;
        } else {
            return a - b;
        }
    }

    if (vB.length > vA.length) {
        return -1;
    } else {
        return 0;
    }
}

export class HotUpdateComponentSystem {
    public static setEventlistener(self: HotUpdateComponent, eventlistener: FunctionCaller) {
        self.eventListener = eventlistener;
    }
    public static destroy(self: HotUpdateComponent) {
        self.am.setEventCallback(null!);
    }

    /** 更新检查 */
    public static startCheck(self: HotUpdateComponent) {
        if (self.updating) {
            logger.warn('Checking or updating ...');
            return;
        }

        if (self.am === null) {
            this.loadManifest(self);
        }

        if (!self.am.getLocalManifest() || !self.am.getLocalManifest().isLoaded()) {
            logger.warn('Failed to load local manifest ...');
            return;
        }

        self.am.setEventCallback((event: jsb.EventAssetsManager) => {
            console.log('Code: ' + event.getEventCode());
            switch (event.getEventCode()) {
                case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                    logger.error("No local manifest file found, hot update skipped.")
                case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                    logger.error("Fail to download manifest file, hot update skipped.")
                    this.call(self, HotUpdateEvent.UpdateError);
                    break;
                case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                    logger.info("Already up to date with the latest remote version.")
                    this.call(self, HotUpdateEvent.AreadyNew);
                    break;
                case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                    logger.info('New version found, please try to update. (' + Math.ceil(self.am.getTotalBytes() / 1024) + 'kb)');
                    // 为当前版本的版本号
                    let currentVersion = parseFloat(this.getVersion(self));
                    // 之前保存在 local Storage 中的版本号，如果没有，则认为是新版本
                    let previousVersion = parseFloat(sys.localStorage.getItem('currentVersion'));
                    if (previousVersion < currentVersion) {
                        // 热更新的储存路径，如果旧版本中有多个，可能需要记录在列表中，全部清理
                        let ret = jsb.fileUtils.removeDirectory(this.getStoragePath(self));
                        logger.info(`大版本${previousVersion}->${currentVersion}更新，删除缓存目录${this.getStoragePath(self)} ret=`, ret);
                    }
                    this.call(self, HotUpdateEvent.NewVersion, { version: self.remoteVersion, size: self.am.getTotalBytes() });
                    break;
                default:
                    return;
            }

            self.am.setEventCallback(null!);
            self.updating = false;
        });

        self.am.checkUpdate();
        self.updating = true;
    }

    /** 启动更新 */
    public static startUpdate(self: HotUpdateComponent) {
        if (self.updating) {
            logger.warn('updating ...');
            return;
        }

        if (self.am === null) {
            this.loadManifest(self);
        }

        if (!self.am.getLocalManifest() || !self.am.getLocalManifest().isLoaded()) {
            logger.warn('Failed to load local manifest ...');
            return;
        }

        self.am.setEventCallback((event: jsb.EventAssetsManager) => {
            let needRestart = false;
            let failed = false;
            let errorReason = '';
            switch (event.getEventCode()) {
                case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                    errorReason = 'No local manifest file found, hot update skipped.';
                    logger.error('No local manifest file found, hot update skipped.')
                    failed = true;
                    break;
                case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                    logger.info(event.getDownloadedFiles() + ' / ' + event.getTotalFiles(), event.getDownloadedBytes() + ' / ' + event.getTotalBytes());
                    const msg = event.getMessage();
                    if (msg) {
                        logger.info(event.getPercent() || 0 / 100 + '% msg: ' + msg);
                    }
                    // 更新进度
                    this.call(self, HotUpdateEvent.UpdateProgress, {
                        fileProgress: event.getDownloadedFiles(),
                        fileTotal: event.getTotalFiles(),
                        byteProgress: event.getDownloadedBytes(),
                        byteTotal: event.getTotalBytes(),
                        bytePercent: event.getPercent() || 0,
                        filePercent: event.getPercentByFile() || 0,
                    });
                    break;
                case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                    errorReason = 'Fail to download manifest file, hot update skipped.';
                    logger.warn('Fail to download manifest file, hot update skipped.');
                    failed = true;
                    break;
                case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                    errorReason = 'Already up to date with the latest remote version.';
                    logger.warn('Already up to date with the latest remote version.');
                    failed = true;
                    break;
                case jsb.EventAssetsManager.UPDATE_FINISHED:
                    logger.info('Update finished. ' + event.getMessage());
                    // 存储版本号
                    sys.localStorage.setItem('currentVersion', self.remoteVersion);
                    needRestart = true;
                    this.call(self, HotUpdateEvent.UpdateFinish);
                    break;
                case jsb.EventAssetsManager.UPDATE_FAILED:
                    logger.warn('Update failed. ' + event.getMessage());
                    self.updating = false;
                    self.canRetry = true;
                    self.failCount++;
                    this.call(self, HotUpdateEvent.UpdateFail, {
                        failCount: self.failCount,
                        reason: event.getMessage()
                    });
                    break;
                case jsb.EventAssetsManager.ERROR_UPDATING:
                    errorReason = 'Asset update error: ' + event.getAssetId() + ', ' + event.getMessage();
                    logger.info('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                    failed = true;
                    break;
                case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                    logger.info('Asset error_decompress:', event.getMessage())
                    errorReason = 'Asset error_decompress: ' + event.getMessage();
                    failed = true;
                    break;
                default:
                    break;
            }

            if (failed) {
                this.call(self, HotUpdateEvent.UpdateError, { reason: errorReason });
                self.am.setEventCallback(null!);
                self.updating = false;
            }

            if (needRestart) {
                self.am.setEventCallback(null!);
                // Prepend the manifest's search path
                let searchPaths = jsb.fileUtils.getSearchPaths();
                logger.info('HotUpdateSearchPaths searchPaths=', JSON.stringify(searchPaths));
                let newPaths = self.am.getLocalManifest().getSearchPaths();
                logger.info('HotUpdateSearchPaths newPaths=', JSON.stringify(newPaths));
                Array.prototype.unshift.apply(searchPaths, newPaths);
                // This value will be retrieved and appended to the default search path during game startup,
                // please refer to samples/js-tests/main.js for detailed usage.
                // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
                sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
                jsb.fileUtils.setSearchPaths(searchPaths);

                // restart game.
                setTimeout(() => {
                    game.restart();
                }, 500)
            }
        });

        self.failCount = 0;
        self.am.update();
        self.updating = true;
    }

    public static getVersion(self: HotUpdateComponent) {
        return self.am.getLocalManifest().getVersion();
    }

    public static retry(self: HotUpdateComponent) {
        if (!self.updating && self.canRetry) {
            self.canRetry = false;
            logger.info('Retry failed Assets...')
            self.am.downloadFailedAssets();
        }
    }

    public static getStoragePath(self: HotUpdateComponent) {
        return ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + `${self.resName}-remote-asset`);
    }

    private static loadCustomManifest(self: HotUpdateComponent) {
        // if (self.am.getState() === jsb.AssetsManager.State.UNINITED) {
        // manifestUrl
        // var manifest = new jsb.Manifest(customManifestStr, self.storagePath);
        //     self.am.loadLocalManifest(manifest, this._storagePath);
        //     // this.panel.info.string = 'Using custom manifest';
        // }
    }

    private static loadManifest(self: HotUpdateComponent) {
        self.storagePath = this.getStoragePath(self);
        logger.info('Storage path for remote asset : ' + self.storagePath);

        // Init with empty manifest url for testing custom manifest
        self.am = new jsb.AssetsManager(self.manifestAsset.nativeUrl, self.storagePath, versionCompareHandle.bind(self));

        // Setup the verification callback, but we don't have md5 check function yet, so only print some message
        // Return true if the verification passed, otherwise return false
        self.am.setVerifyCallback(function (filePath: string, asset: any) {
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            let compressed = asset.compressed;
            // Retrieve the correct md5 value.
            let expectedMD5 = asset.md5;
            // asset.path is relative path and path is absolute.
            let relativePath = asset.path;
            // The size of asset file, but this value could be absent.
            // let size = asset.size;
            if (compressed) {
                logger.info("Verification compressed passed : " + relativePath);
                return true;
            } else {
                //增加md5校验，如果不需要可以直接return true
                // let data = jsb.fileUtils.getStringFromFile(filePath);
                // let fileMd5 = CryptoJS.MD5(data);
                // logger.info('==========fileMd5 = ', fileMd5)
                // logger.info('==========asset.md5 = ', asset.md5)
                // if (fileMd5 !== asset.md5) {
                //     logger.warn('md5 is wrong, file:' + filePath);
                //     return false;
                // }
                logger.info("Verification md5 passed : " + relativePath + ' (' + expectedMD5 + ')');
                return true;
            }
        });

        const url = self.manifestAsset.nativeUrl;
        self.am.loadLocalManifest(url);

        logger.info('Hot update is ready, please check or directly update.');
    }

    private static call(self: HotUpdateComponent, etype: HotUpdateEvent, info?: UpdateProgressInfo | NewVersionInfo | FailInfo | ErrorInfo) {
        if (!self.eventListener) {
            return;
        }

        self.eventListener.exec(etype, info);
    }
}




