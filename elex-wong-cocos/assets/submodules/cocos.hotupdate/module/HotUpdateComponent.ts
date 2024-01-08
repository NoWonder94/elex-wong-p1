import { Asset } from 'cc';
import { CocosDecorators } from '../../cocos.framework/CocosDecorators';
import { Entity } from '../../sharing.base/core/object/Entity';
import { FunctionCaller } from '../../sharing.base/helper/FunctionCaller';

/** 热更事件定义 */
export enum HotUpdateEvent {
    AreadyNew = 0,
    UpdateFinish = 1,
    NewVersion = 2,
    UpdateProgress = 3,
    UpdateError = 4,
    UpdateFail = 5,
}

/**
 * 事件信息定义
 */
export interface UpdateProgressInfo {
    fileProgress: number;
    fileTotal: number;
    byteProgress: number;
    byteTotal: number;
    bytePercent: number;
    filePercent: number;
}

export interface NewVersionInfo {
    version: string;
    size: number;
}

export interface FailInfo {
    failCount: number;
    reason: string;
}

export interface ErrorInfo {
    reason: string;
}


// const jsb = (<any>window).jsb;

export type HotUpdteEventListener = (etype: HotUpdateEvent, info?: UpdateProgressInfo | NewVersionInfo | FailInfo) => void

@CocosDecorators.ClassNameRegister('HotUpdateComponent')
export class HotUpdateComponent extends Entity {
    /** 是否更新中 */
    public updating: boolean = false;
    /** 是否可重试 */
    public canRetry: boolean = false;
    /** 存储路径 */
    public storagePath: string = '';
    /** 失败次数 */
    public failCount: number = 0;
    /** 资源管理器 */
    public am: jsb.AssetsManager = null!;
    /** 资源版本文件 */
    public manifestAsset: Asset = null;
    /** 热更事件监听 */
    public eventListener: FunctionCaller = null!;
    /** 热更资源目录 */
    public resName: string;
    public localVersion: string;
    public remoteVersion: string;
}
