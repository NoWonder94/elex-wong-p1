import { HotfixHelper } from './HotfixHelper';
import { version } from '../assets/scripts/version';
import Platform from '../assets/scripts/platform';
import { RES_INPUT_ROOT_DIR, PackConfig, RES_OUTPUT_ROOT_DIR } from './pack.res.config';
import { REMOTE_UNZIP_DIR, ServerConfigs } from './pack.client.address.config';
import { getGulpSSHConfig, getScpConfig, getMasterServerConfig, getSlaveServers, ServerConfigOpts } from './pack.client.helper';
const gulp = require('gulp');
const zip = require('gulp-zip');
const scp = require('gulp-scp2');
const GulpSSH = require('gulp-ssh');
const runSequence = require('run-sequence');
const path = require('path');
const del = require('del');

/** 测试环境 */
export const EnvTests: string[] = [
    Platform.Local,
    Platform.Test,
]

/** 红色console */
const consoleLog = '\x1B[31m%s\x1B[0m';

const masterGulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: getGulpSSHConfig(ServerConfigs)
});

const masterScpConfig = getScpConfig(ServerConfigs);

let pkgName = '';
let devicePlatfrom = '';
let resOutDir = `${RES_OUTPUT_ROOT_DIR}/${version.PubPlatform}`;

const versionServerConfig = getMasterServerConfig(ServerConfigs);

const scpCmd = versionServerConfig.isCluster ? 'scpCluster' : 'scp';



gulp.task('default', function (cb) {
    console.log('需要指定打包的平台, 例如 ./project.pack.sh web-desktop');
});

// 清理、不混肴压缩发布、打包、上传
gulp.task('web-desktop', function (cb) {
    devicePlatfrom = 'web-desktop';
    resOutDir = `${resOutDir}/${devicePlatfrom}`;
    runSequence('genVersion', ['copyResFull'], 'zip', scpCmd, 'unzip', cb);
});

// 清理、不混肴压缩发布、打包、上传
gulp.task('web-mobile', function (cb) {
    devicePlatfrom = 'web-mobile';
    resOutDir = `${resOutDir}/${devicePlatfrom}`;
    runSequence('genVersion', ['copyResFull'], 'zip', scpCmd, 'unzip', cb);
});

// gulp 功能业务配置
gulp.task('clean', function () {
    return del([
        // 删除
        resOutDir,
    ], { force: true });
});

/** 生成git version */
gulp.task('genVersion', function (cb) {
    const { execFile } = require('child_process');
    execFile('bash', ['project.gen.version.sh'], { cwd: `../../../` }, (error, stdout, stderr) => {
        if (error) {
            console.log(consoleLog, 'genVersion error=', error);
            throw error;
        }
        console.log(stdout);
        cb();
    })
});

/** copy资源 */
gulp.task('copyResFull', function () {
    let inputDir = `${RES_INPUT_ROOT_DIR}/${devicePlatfrom}/**/*`
    return gulp.src([inputDir])
        .pipe(gulp.dest(resOutDir))
        .on('error', function (err) {
            console.info(err.stack);
            gulp.emit('end');
        });
});

/** 资源压缩 */
gulp.task('zip', function () {
    const reloadVersion = HotfixHelper.forceReloadFile(path.join(__dirname, `../assets/scripts/version.js`)).value.version;
    pkgName = `${version.AppName}.${version.PubPlatform}.${devicePlatfrom}.${version.GitPackConfig.PackVersion}.${reloadVersion.GitPackConfig.BranchName}.v${reloadVersion.GitPackConfig.VersionNo}_${reloadVersion.GitPackConfig.PubTime}.zip`;

    console.info('pack client zip package path:', PackConfig.output.zip);
    console.info('pack client zip package name:', pkgName);
    return gulp.src(`${resOutDir}/**/*`)
        .pipe(zip(pkgName))
        .pipe(gulp.dest(PackConfig.output.zip));
});

/** 压缩包传输 */
gulp.task('scp', function () {
    return gulp.src(`${PackConfig.output.zip}/${pkgName}`)
        .pipe(scp(masterScpConfig))
        .on('error', function (err) {
            console.info(err);
        });
});

/** 远程包分发 */
function remoteScp(serverConfig: ServerConfigOpts) {
    const scpCmd = `scp -P 22 ${pkgName} ${serverConfig.username}@${serverConfig.host_private}:${serverConfig.dest}`;

    let resp = masterGulpSSH
        .shell([`cd ${masterScpConfig.dest}`, scpCmd], { filePath: `scp-${serverConfig.host}.log` })
        .pipe(gulp.dest('logs'));

    return new Promise((resolve, reject) => {
        resp.on('error', () => {
            console.log(consoleLog, `主节点向从节点${serverConfig.host}分发包出现异常`)
            reject();
        })
        resp.on('end', () => {
            console.log(consoleLog, `主节点向从节点${serverConfig.host}分发包成功`)
            resolve(null);
        })
    })
}

/** 远程创建dest目录 */
function remoteCreateDestDir(serverConfig: ServerConfigOpts) {
    const slaveGulpSSH = new GulpSSH({
        ignoreErrors: false,
        sshConfig: getGulpSSHConfig(ServerConfigs, serverConfig)
    });
    let resp = slaveGulpSSH
        .shell([`mkdir -p ${serverConfig.dest}`], { filePath: `createDestDir-${serverConfig.host}.log` })
        .pipe(gulp.dest('logs'));

    return new Promise((resolve, reject) => {
        resp.on('error', () => {
            console.log(consoleLog, `从节点${serverConfig.host}创建目录出现异常`)
            reject();
        })
        resp.on('end', () => {
            console.log(consoleLog, `从节点${serverConfig.host}创建目录成功`)
            resolve(null);
        })
    })
}

function remoteUnzip(serverConfig: ServerConfigOpts) {
    const nodeGulpSSH = new GulpSSH({
        ignoreErrors: false,
        sshConfig: getGulpSSHConfig(ServerConfigs, serverConfig)
    });

    const unzipCmd = `unzip -o ${pkgName} -d ../${version.AppName}-${version.PubPlatform}`;

    let resp = nodeGulpSSH
        .shell([`cd ${serverConfig.dest}`, unzipCmd], { filePath: `unzip-${serverConfig.host}.log` })
        .pipe(gulp.dest('logs'));

    return new Promise((resolve, reject) => {
        resp.on('error', () => {
            console.log(consoleLog, `节点${serverConfig.host}包解压异常`)
            reject();
        })
        resp.on('end', () => {
            console.log(consoleLog, `节点${serverConfig.host}包解压成功`)
            resolve(null);
        })
    })
}

function remoteCleanRemoteCode(serverConfig: ServerConfigOpts) {
    const nodeGulpSSH = new GulpSSH({
        ignoreErrors: false,
        sshConfig: getGulpSSHConfig(ServerConfigs, serverConfig)
    });

    const cdCodeDirCmd = `cd ../${version.AppName}-${version.PubPlatform}`;
    // const singleRmCmd = 'rm -rf `ls | grep -v "init.sh"`';
    const multiRmCmd = 'rm -rf `ls | egrep  -v "(init.sh|client.data)"`';

    let resp = nodeGulpSSH
        .shell([`cd ${serverConfig.dest}`, cdCodeDirCmd, multiRmCmd], { filePath: `cleanRemoteRes-${serverConfig.host}.log` })
        .pipe(gulp.dest('logs'));

    return new Promise((resolve, reject) => {
        resp.on('error', () => {
            console.log(consoleLog, `节点${serverConfig.host}资源清理异常`)
            reject();
        })
        resp.on('end', () => {
            console.log(consoleLog, `节点${serverConfig.host}资源清理成功`)
            resolve(null);
        })
    })
}

/** 集群模式包分发 */
gulp.task('scpCluster', function (cb) {
    let resp = gulp.src(`${PackConfig.output.zip}/${pkgName}`)
        .pipe(scp(masterScpConfig));

    resp.on('error', function (err) {
        console.log(consoleLog, '集群模式资源包出现异常', err);
        cb(err);
    })

    resp.on('finish', async function (err) {
        // 分发包到slave服务器
        let serverConfigs = getSlaveServers(ServerConfigs);
        for (let item of serverConfigs) {
            try {
                await remoteCreateDestDir(item);
                await remoteScp(item);
            } catch (error) {
                process.exit(0);
            }
        }
        console.log(consoleLog, '集群模式资源包分发完成')
        cb();
    });
});

// 清理远程资源
gulp.task('cleanRemoteRes', (cb) => {
    const cdCodeDirCmd = `cd ../${version.AppName}-${version.PubPlatform}`;
    // const singleRmCmd = 'rm -rf `ls | grep -v "init.sh"`';
    const multiRmCmd = 'rm -rf `ls | egrep  -v "(init.sh|client.data)"`';
    let resp = masterGulpSSH
        .shell([`cd ${masterScpConfig.dest}`, cdCodeDirCmd, multiRmCmd], { filePath: 'cleanRemoteRes.log' })
        .pipe(gulp.dest('logs'));

    resp.on('error', () => {
        console.log(consoleLog, '主节点资源清理异常');
        cb();
    })
    resp.on('end', async () => {
        console.log(consoleLog, '主节资源清理完成');
        if (versionServerConfig.isCluster) {
            let serverConfigs = getSlaveServers(ServerConfigs);
            for (let item of serverConfigs) {
                try {
                    await remoteCleanRemoteCode(item);
                } catch (error) {
                    process.exit(0);
                }
            }
        }

        cb();
    })
});

// 解压包
gulp.task('unzip', (cb) => {
    const func = () => {
        const unzipCmd = `unzip -o ${pkgName} -d ${REMOTE_UNZIP_DIR}/${version.AppName}-${version.PubPlatform}`;
        let resp = masterGulpSSH
            .shell([`cd ${masterScpConfig.dest}`, unzipCmd], { filePath: `unzip-${masterScpConfig.host}.log` })
            .pipe(gulp.dest('logs'));

        resp.on('error', () => {
            console.log(consoleLog, '主节点解压 gulp-ssh.shell.log');
            cb();
        })
        resp.on('end', async () => {
            console.log(consoleLog, '主节点解压完成');
            if (versionServerConfig.isCluster) {
                let serverConfigs = getSlaveServers(ServerConfigs);
                for (let item of serverConfigs) {
                    try {
                        await remoteUnzip(item);
                    } catch (error) {
                        process.exit(0);
                    }
                }
            }
            cb();
        })
    }

    if (EnvTests.indexOf(version.PubPlatform) > 0) {
        // 测试环境，则直接解压资源
        func();
        return;
    }

    console.log(consoleLog, '注意当前是正式环境，请确认安全后再选择解压资源！！！！')
    // 正式环境，用户选择
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readline.question(`当前为正式环境，确定要解压发布资源【YES:是，NO:否】?\r\n`, select => {
        if (select === 'YES') {
            console.log(consoleLog, '正在解压中...')
            func();
        } else {
            console.log(consoleLog, '你选择了不重启')
            cb();
        }
        readline.close()
    })
});



