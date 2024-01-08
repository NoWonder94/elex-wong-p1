const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class Utils {
    static readDir(dir, rootDir, obj) {
        var stat = fs.statSync(dir);
        if (!stat.isDirectory()) {
            return;
        }
        var subpaths = fs.readdirSync(dir), subpath, size, md5, compressed, relative;
        for (var i = 0; i < subpaths.length; ++i) {
            if (subpaths[i][0] === '.') {
                continue;
            }
            subpath = path.join(dir, subpaths[i]);
            stat = fs.statSync(subpath);
            if (stat.isDirectory()) {
                Utils.readDir(subpath, rootDir, obj);
            }
            else if (stat.isFile()) {
                // Size in Bytes
                size = stat['size'];
                md5 = crypto.createHash('md5').update(fs.readFileSync(subpath)).digest('hex');
                compressed = path.extname(subpath).toLowerCase() === '.zip';

                relative = path.relative(rootDir, subpath);
                relative = relative.replace(/\\/g, '/');
                relative = encodeURI(relative);
                obj[relative] = {
                    'size': size,
                    'md5': md5
                };
                if (compressed) {
                    obj[relative].compressed = true;
                }
            }
        }
    }

    static mkdirSync(path) {
        try {
            fs.mkdirSync(path, { recursive: true });
        } catch (e) {
            if (e.code != 'EEXIST') throw e;
        }
    }

    static rmdirSync(path) {
        try {
            fs.rmdirSync(path);
        } catch (e) {
            if (e.code != 'EEXIST') throw e;
        }
    }

    static copyFile(srcPath, tarPath, cb) {
        var rs = fs.createReadStream(srcPath)
        rs.on('error', function (err) {
            if (err) {
                console.log('read error', srcPath)
            }
            cb && cb(err)
        })

        var ws = fs.createWriteStream(tarPath)
        ws.on('error', function (err) {
            if (err) {
                console.log('write error', tarPath)
            }
            cb && cb(err)
        })
        ws.on('close', function (ex) {
            cb && cb(ex)
        })

        rs.pipe(ws)
    }

    static copyFileDir(srcDir, tarDir, cb) {
        fs.readdir(srcDir, function (err, files) {
            files.forEach(function (file) {
                var srcPath = path.join(srcDir, file)
                var tarPath = path.join(tarDir, file)

                fs.stat(srcPath, function (err, stats) {
                    if (stats.isDirectory()) {
                        fs.mkdir(tarPath, function (err) {
                            if (err) {
                                console.log(err)
                                return
                            }

                            Utils.copyFileDir(srcPath, tarPath)
                        })
                    } else {
                        Utils.copyFile(srcPath, tarPath)
                    }
                });
            });

            //为空时直接回调
            files.length === 0 && cb && cb();
        });
    }
}

module.exports = Utils;