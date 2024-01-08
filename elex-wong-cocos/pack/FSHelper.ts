import * as fs from 'fs';
import * as path from 'path';

export class FSHelper {
    public static mkdirsSync(dirName: string) {
        if (fs.existsSync(dirName)) {
            return true;
        } else {
            if (this.mkdirsSync(path.dirname(dirName))) {
                fs.mkdirSync(dirName);
                return true;
            }
        }
    }

    public static walkFile(dirs: string[], handler: Function, filters: string[] = [], excludeFilters: string[] = []) {
        for (let dir of dirs) {
            fs.readdirSync(dir).forEach((filename) => {
                const _path = path.join(dir, filename);
                const stat = fs.statSync(_path);
                if (stat && stat.isDirectory()) {
                    this.walkFile([_path], handler, filters, excludeFilters);
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

    public static readLines(input, func) {
        let remaining = '';
        input.on('data', (data) => {
            remaining += data;
            let index = remaining.indexOf('\n');
            while (index > -1) {
                const line = remaining.substring(0, index);
                remaining = remaining.substring(index + 1);
                func(line);
                index = remaining.indexOf('\n');
            }
        });

        input.on('end', () => {
            if (remaining.length > 0) {
                func(remaining);
            }
        });
    }
}