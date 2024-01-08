import { version } from "../assets/scripts/version";
import { DicObject } from "../assets/submodules/sharing.base/helper/Interfaces";

const fs = require('fs');

export enum SSHMode {
    /** 密码模式 */
    PASSWORD = 1,
    /** 私钥模式 */
    PRIVATE_KEY = 2
}

/** SSH服务器配置选项 */
export interface ServerConfigOpts {
    /** 主机 */
    host: string;
    /** 私有地址 */
    host_private?: string;
    /** 端口，默认22 */
    port: number,
    /** 授权模式 */
    mode: SSHMode;
    /** 用户名 */
    username: string;
    /** 密码，密码模式 */
    password?: string;
    /** 远程目录,默认用户根目录 */
    dest?: string;
    /** 私钥，密钥模式 */
    privateKey?: string;
    /** 私钥密码，密钥模式 */
    passphrase?: string;
    /** 是否使用docker */
    isUseDocker?: boolean;
    /** 是否集群模式 */
    isCluster?: boolean;
    /** 集群主机 */
    subServer?: ServerConfigOpts[];
}

export function readFile(filename: string) {
    if (!fs.existsSync(filename)) {
        return;
    }
    return fs.readFileSync(filename);
}

export function getMasterServerConfig(configs: DicObject<ServerConfigOpts>): ServerConfigOpts {
    return configs[version.PubPlatform];
}

export function getSlaveServers(configs: DicObject<ServerConfigOpts>) {
    return configs[version.PubPlatform].subServer || [];
}

export function getGulpSSHConfig(configs: DicObject<ServerConfigOpts>, serverConfig?: ServerConfigOpts): {
    host: string;
    port: number;
    username: string;
    privateKey: string;
    passphrase: string;
    password: string;
} {
    serverConfig = serverConfig || configs[version.PubPlatform]
    let sshConfig: any = {
        host: serverConfig.host,
        port: serverConfig.port || 22,
        username: serverConfig.username,
    };
    if (serverConfig.mode === SSHMode.PRIVATE_KEY) {
        sshConfig.privateKey = serverConfig.privateKey;
        if (serverConfig.passphrase) {
            sshConfig.passphrase = serverConfig.passphrase;
        }
    } else {
        sshConfig.password = serverConfig.password;
    }
    return sshConfig;
}

export function getScpConfig(configs: DicObject<ServerConfigOpts>, serverConfig?: ServerConfigOpts): {
    host: string;
    port: number;
    username: string;
    privateKey: string;
    passphrase: string;
    password: string;
    dest: string;
} {
    serverConfig = serverConfig || configs[version.PubPlatform]
    let scpConfig: any = getGulpSSHConfig(configs);
    scpConfig.dest = serverConfig.dest;
    return scpConfig;
}