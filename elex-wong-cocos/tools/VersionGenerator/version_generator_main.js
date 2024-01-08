const fs = require('fs');
const path = require('path');
const Utils = require('./utils');

/**
 * 生成项目首包资源热更信息
 */

// 热更资源默认存放路径
let dest = 'hotupdate/main-hotupdate-assets';
// 编译构建后源资源目录
let buildSrc = './jsb/';
// manifest生成目录
let manifestDir = './assets/resources';
// 资源远程url
let remoteUrl = 'http://localhost:8080/facepoker/hotupdate/main-hotupdate-assets';

const manifest = {
    packageUrl: remoteUrl,
    remoteManifestUrl: remoteUrl + 'project.manifest',
    remoteVersionUrl: remoteUrl + 'version.manifest',
    version: '1.0.0',
    assets: {},
    searchPaths: []
};

// Parse arguments
var i = 2;
while (i < process.argv.length) {
    var arg = process.argv[i];

    switch (arg) {
        case '--url':
        case '-u':
            remoteUrl = process.argv[i + 1];
            i += 2;
            break;
        case '--version':
        case '-v':
            manifest.version = process.argv[i + 1];
            i += 2;
            break;
        case '--src':
        case '-s':
            buildSrc = process.argv[i + 1];
            i += 2;
            break;
        case '--dest':
        case '-d':
            dest = process.argv[i + 1];
            i += 2;
            break;
        case '-m':
            manifestDir = process.argv[i + 1];
            i += 2;
            break;
        default:
            i++;
            break;
    }
}

if (!buildSrc) {
    console.error('MAIN项目构建目录未指定, 通过--src or -s 设置');
    return;
}

let verDir = 'ver-' + manifest.version;
manifest.packageUrl = remoteUrl + '/' + dest + '/' + verDir;
manifest.remoteManifestUrl = manifest.packageUrl + '/project.manifest';
manifest.remoteVersionUrl = manifest.packageUrl + '/version.manifest';

Utils.mkdirSync(dest);

// 目标版本存放目录
let destFileDir = path.join(dest, verDir);
if (fs.existsSync(destFileDir)) {
    console.log(manifest.version, 'is have this version');
    return;
}
Utils.mkdirSync(destFileDir);


// Iterate assets and src folder
Utils.readDir(path.join(buildSrc, 'src'), buildSrc, manifest.assets);
Utils.readDir(path.join(buildSrc, 'jsb-adapter'), buildSrc, manifest.assets);

let srcAssetsDir = path.join(buildSrc, 'assets');
// 首保只关注main/resources资源更新
Utils.readDir(path.join(srcAssetsDir, 'main'), buildSrc, manifest.assets);
Utils.readDir(path.join(srcAssetsDir, 'resources'), buildSrc, manifest.assets);

// 生成project.manifest
let destManifest = path.join(manifestDir, 'project.manifest');
fs.writeFileSync(destManifest, JSON.stringify(manifest));

delete manifest.assets;
delete manifest.searchPaths;
// 生成version.manifest，版本文件直接写入热更目录
let destVersion = path.join(destFileDir, 'version.manifest');
fs.writeFileSync(destVersion, JSON.stringify(manifest));

// 创建热更子目录
Utils.mkdirSync(path.join(destFileDir, 'src'));
let destAssetsDir = path.join(destFileDir, 'assets');
Utils.mkdirSync(destAssetsDir);
Utils.mkdirSync(path.join(destAssetsDir, 'main'));
Utils.mkdirSync(path.join(destAssetsDir, 'resources'));

// 拷贝编译资源到热更目录
Utils.copyFileDir(path.join(buildSrc, 'src'), path.join(destFileDir, 'src'));
Utils.copyFileDir(path.join(srcAssetsDir, 'main'), path.join(destAssetsDir, 'main'));
Utils.copyFileDir(path.join(srcAssetsDir, 'resources'), path.join(destAssetsDir, 'resources'));

// 拷贝project.manifest到热更目录
Utils.copyFile(destManifest, path.join(destFileDir, 'project.manifest'));
