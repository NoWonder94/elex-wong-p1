import Config from "./config";

/** 打包版本类型 */
export enum PackVersionType {
    BASE = 'base',
    ALPHA = 'alpha',
    BETA = 'beta',
    RC = 'rc',
    RELEASE = 'release',
};

/** git 打包配置 */
export interface GitPackConfig {
    /** 打包版本类型 */
    PackVersion: PackVersionType,
    /** 发布分支名 */
    BranchName: string,
    /** 发布版本号 */
    VersionNo: string,
    /** 发布时间 */
    PubTime: string,
    /** git版本号 */
    GitHashVersion: string,
}

/** 版本配置 */
export class VersionConfig {
    /** 发布渠道 */
    public PubPlatform: string;
    /** App名称 */
    public AppName: string;
    /** 发布配置 */
    public PlatformConfig: Config;
    /** git 打包配置 */
    public GitPackConfig: GitPackConfig;
}