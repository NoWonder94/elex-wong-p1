import * as chokidar from 'chokidar';
import * as path from 'path';

// const log = logger && logger.error || console.log.bind(console);

type HotWatchHandler = (filename: string, value?: any) => void;

export class HotfixHelper {
    private watchHandler: HotWatchHandler = null;
    private regExps: any;
    private reload: boolean;
    private watcher: chokidar.FSWatcher;

    constructor(regExps, reload = true) {
        this.watchHandler = null;
        this.regExps = Array.isArray(regExps) ? this.regExps = regExps : this.regExps = [regExps];
        this.reload = reload;
    }

    public watch(hotPath: string | string[], handler: HotWatchHandler) {
        this.watchHandler = handler;
        this.watcher = chokidar.watch(hotPath);
        this.watcher.on('change', this.onChange.bind(this));
    }

    public unwatch() {
        this.watcher.close().catch(() => { });
    }

    private onChange(file) {
        for (let i = 0; i < this.regExps.length; i++) {
            if (this.regExps[i].test(file)) {
                // logger.info(`Hot file ${file} change`);
                if (this.reload) {
                    const info = HotfixHelper.reloadFileByTag(file) as any;
                    if (!info) {
                        continue;
                    }
                    // logger.info(`Hot update file ${info.name} ok`);
                    if (info.name && info.value && this.watchHandler) {
                        this.watchHandler(info.name, info.value);
                    }
                } else {
                    const name = path.parse(file).name;
                    if (this.watchHandler) {
                        this.watchHandler(name);
                    }
                }
                break;
            }
        }
    }

    public static reloadFileByTag(file) {
        let fullPath = null;
        try {
            fullPath = require.resolve(file);
        } catch (err) {
            console.error(`Hot update file ${file} path exception`, err);
            return;
        }

        const module = require.cache[fullPath];
        if (!module) {
            return;
        }

        let isSupportHotUpdate = false;
        for (let key in module.exports) {
            let handler = module.exports[key];
            if (handler.__enableHotfix) {
                isSupportHotUpdate = true;
                break;
            }
        }

        if (!isSupportHotUpdate) {
            return;
        }

        const name = path.parse(fullPath).name;
        try {
            require.cache[fullPath] = undefined;
            let res = { name, value: require(fullPath) };
            let isUp = false;
            for (let key in res.value) {
                let handler = res.value[key];
                try {
                    if (handler.__enableHotfix && (typeof handler === 'object' || typeof handler === 'function')) {
                        for (let k in handler) {
                            module.exports[key][k] = handler[k];
                            isUp = true;
                        }
                    }
                } catch (error) {
                    console.log(11);
                    throw error;
                }
            }
            if (isUp) {
                require.cache[fullPath] = module;
            }
            return res;
        } catch (err) {
            // logger.error(`Load hot update file 【${name}】 exception`, err);
            require.cache[fullPath] = module;
        }
    }

    public static forceReloadFile(file) {
        let fullPath = null;
        try {
            fullPath = require.resolve(file);
        } catch (err) {
            console.error(`Hot update file ${file} path exception`, err);
            return;
        }

        const module = require.cache[fullPath];
        if (!module) {
            return;
        }

        const name = path.parse(fullPath).name;
        try {
            require.cache[fullPath] = undefined;
            let res = { name, value: require(fullPath) };
            let isUp = false;
            for (let key in res.value) {
                let handler = res.value[key];
                try {
                    if (handler.__enableHotfix && (typeof handler === 'object' || typeof handler === 'function')) {
                        for (let k in handler) {
                            module.exports[key][k] = handler[k];
                            isUp = true;
                        }
                    }
                } catch (error) {
                    console.log(11);
                    throw error;
                }
            }
            if (isUp) {
                require.cache[fullPath] = module;
            }
            return res;
        } catch (err) {
            console.error(`Load hot update file 【${name}】 exception`, err);
            require.cache[fullPath] = module;
        }
    }
}


// let hotfix = new HotfixHelper([/.*?\.js$/, /.*?\.json$/]);
// hotfix.watch(process.cwd(), (name: string, v: any) => {
//     console.log(name, v);
// });

// let n = 0;
// setInterval(() => {
//     // console.log(RoomRankSystem.tick())
//     // console.log('------------------------', n++)
//     // console.log(RoomRankSystem.onLoad())
// }, 1000);