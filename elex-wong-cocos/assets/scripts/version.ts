import Platform from './platform';
import { PackVersionType, VersionConfig } from '../submodules/cocos.framework/VersionConfig';

export const version = new VersionConfig();

/** 发布渠道 */
version.PubPlatform = Platform.Test;

/** App名称 */
version.AppName = 'slo';

/** git 打包配置 */
version.GitPackConfig = {
    /** 打包版本类型 */
    PackVersion: PackVersionType.BETA,
    /** 发布分支名 */
    BranchName: 'master',
    /** 发布版本号 */
    VersionNo: '3.4.32',
    /** 发布时间 */
    PubTime: '20210824_093830',
    /** git版本号 */
    GitHashVersion: 'fdd2ad5984eaa551a13e19875ccb5d26c4445cb6',
};
