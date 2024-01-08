const fs = require('fs');
const path = require('path');
const Utils = require('./utils');

/**
 * 生成项目Bundle资源热更信息
 */

// 热更资源默认存放路径
let dest = 'hotupdate/main-hotupdate-assets';
// 编译构建后源资源目录
let buildSrc = './jsb/';
// manifest生成目录
let manifestDir = './assets/resources';
// 资源远程url
let remoteUrl = 'http://localhost:8080/facepoker/hotupdate/main-hotupdate-assets';
// bundle name
let bundleDir = 'bundlename';

const manifest = {
    packageUrl: remoteUrl + '/' + bundleDir,
    remoteManifestUrl: remoteUrl + `/${bundleDir}/${bundleDir}.manifest`,
    remoteVersionUrl: remoteUrl + `/${bundleDir}/${bundleDir}-version.manifest`,
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
        case '-b':
            bundleDir = process.argv[i + 1];
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

// manifest.packageUrl = `${remoteUrl}${bundleDir}/`;
// manifest.remoteManifestUrl = `${remoteUrl}${bundleDir}/${bundleDir}.manifest`;
// manifest.remoteVersionUrl = `${remoteUrl}${bundleDir}/${bundleDir}-ver.manifest`;

let verDir = 'ver-' + manifest.version;
manifest.packageUrl = `${remoteUrl}/${dest}/${bundleDir}/${verDir}`;
manifest.remoteManifestUrl = manifest.packageUrl + `/${bundleDir}.manifest`;
manifest.remoteVersionUrl = manifest.packageUrl + `/${bundleDir}-version.manifest`;

Utils.mkdirSync(dest);
Utils.mkdirSync(path.join(dest, bundleDir));

// 目标版本存放目录
let destFileDir = path.join(dest, bundleDir, verDir);
if (fs.existsSync(destFileDir)) {
    console.log('is have this version');
    return;
}
Utils.mkdirSync(destFileDir);

let srcAssetsDir = path.join(buildSrc, 'assets', bundleDir);

// Iterate assets and src folder
Utils.readDir(srcAssetsDir, buildSrc, manifest.assets);

// 生成Bundle project.manifest
let destManifest = path.join(manifestDir, `${bundleDir}.manifest`);
fs.writeFileSync(destManifest, JSON.stringify(manifest));

// var manifestDestDir = path.join(destFileDir, bundleDir)
// Utils.mkdirSync(manifestDestDir);
// var destManifest = path.join(manifestDestDir, bundleDir + '.manifest');
// fs.writeFile(destManifest, JSON.stringify(manifest), (err) => {
//     if (err) throw err;
//     console.log('Manifest bundle successfully generated');
// });


delete manifest.assets;
delete manifest.searchPaths;
// 生成version.manifest，版本文件直接写入热更目录
let destVersion = path.join(destFileDir, `${bundleDir}-version.manifest`);
fs.writeFileSync(destVersion, JSON.stringify(manifest));

// Utils.mkdirSync(path.join(destFileDir, bundleDir));

let destAssetsDir = path.join(destFileDir, 'assets');
Utils.copyFileDir(srcAssetsDir, destFileDir);
// 拷贝Bundle project.manifest到热更目录
Utils.copyFile(destManifest, path.join(destFileDir, `${bundleDir}.manifest`));
