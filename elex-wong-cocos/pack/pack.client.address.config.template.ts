import { DicObject } from '../assets/submodules/sharing.base/helper/Interfaces';
import { readFile, ServerConfigOpts, SSHMode } from './pack.client.helper';

/** 远程服务器包目录 */
const PACKAGES_DIR = '/data/project/packages-slo';
/** 远程服务器解压目录 */
export const REMOTE_UNZIP_DIR = '/data/project/web';

/** 打包发布服务器配置 */
export const ServerConfigs: DicObject<ServerConfigOpts> = {
    local: {
        host: '192.168.2.100',
        port: 22,
        mode: SSHMode.PASSWORD,
        username: 'root',
        password: 'xxxxxx',
        dest: PACKAGES_DIR,
    },
    test: {
        host: '112.74.44.242',
        port: 22,
        mode: SSHMode.PASSWORD,
        username: 'root',
        password: 'Damima123',
        dest: PACKAGES_DIR,
    },
    t1: {
        host: 'xxx.xxx.xxx.xxx',
        port: 22,
        mode: SSHMode.PRIVATE_KEY,
        username: 'root',
        privateKey: readFile('../../../../import.scripts/server.app.facepoker/pack/pack.key/xxx.pem'),
        // passphrase: 'xxxxxxxxxxx',
        dest: PACKAGES_DIR,
        isUseDocker: true,
        isCluster: false,
        subServer: [
            {
                host: 'xxx.xxx.xxx.xxx',
                host_private: 'yyy.yyy.yyy.yyy',
                port: 22,
                mode: SSHMode.PRIVATE_KEY,
                username: 'root',
                privateKey: readFile('../../../../import.scripts/server.app.facepoker/pack/pack.key/xxx.pem'),
                // passphrase: 'xxxxxxxxxxx',
                dest: '/data/sub11/packages',
            },
            {
                host: 'xxx.xxx.xxx.xxx',
                host_private: 'yyy.yyy.yyy.yyy',
                port: 22,
                mode: SSHMode.PRIVATE_KEY,
                username: 'root',
                privateKey: readFile('../../../../import.scripts/server.app.facepoker/pack/pack.key/xxx.pem'),
                // passphrase: 'xxxxxxxxxxx',
                dest: '/data/sub22/packages',
            }
        ]
    },
    t2: {
        host: 'xxx.xxx.xxx.xxx',
        port: 22,
        mode: SSHMode.PASSWORD,
        username: 'root',
        password: 'xxxxxxxxxxxx',
        dest: PACKAGES_DIR,
        isUseDocker: false,
        isCluster: true,
        subServer: [
            {
                host: 'xxx.xxx.xxx.xxx',
                host_private: 'yyy.yyy.yyy.yyy',
                port: 22,
                mode: SSHMode.PASSWORD,
                username: 'root',
                password: 'xxxxxxxxxxxx',
                dest: PACKAGES_DIR,
            }
        ]
    }
}

