const fs = require('fs');
const path = require('path');

function walkFile(dirs, handler, filters, excludeFilters, deep) {
    if (deep-- <= 0) {
        return;
    }
    for (let dir of dirs) {
        fs.readdirSync(dir).forEach((filename) => {
            const _path = dir + '/' + filename;
            const stat = fs.statSync(_path);
            if (stat && stat.isDirectory()) {
                walkFile([_path], handler, filters, excludeFilters, deep);
            } else {
                const info = path.parse(_path);
                if (filters.length > 0 && filters.indexOf(info.ext) === -1) {
                    return;
                }

                for (let item of excludeFilters) {
                    if (_path.indexOf(item) !== -1) {
                        return;
                    }
                }

                if (handler) {
                    handler(_path);
                }
            }
        });
    }
}

let all = ['resources'];
walkFile(['assets/bundles/', 'assets/submodules'], (filename) => {
    let data = fs.readFileSync(filename);
    try {
        let meta = JSON.parse(data);
        if (meta.userData.isBundle) {
            const info = path.parse(filename);
            all.push(info.name);
        }
    } catch (error) {

    }
}, ['.meta'], [], 2);

let ts = '/** 自动代码生成，修改无效 */\r\n';
ts += `export const Bundles = [\r\n`;

all.forEach((item) => {
    ts += `\t'${item}',\r\n`
})
ts += '];\r\n\r\n'

ts += `export enum BundleNames {\r\n`
all.forEach((item) => {
    ts += `\t'${item.toUpperCase()}' = '${item}',\r\n`
})
ts += `};\r\n\r\n`

fs.writeFileSync('assets/scripts/bundles.ts', ts)