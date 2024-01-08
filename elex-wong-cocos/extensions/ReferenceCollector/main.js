'use strict';

// 扩展内定义的方法
exports.methods = {
    log() {
        console.log('Hello World');
    },
    openPanel() {
        console.log('openPanel');
        Editor.Panel.open('reference-collector');
    },
    saveData(path, data) {
        // 收到数据后缓存起来
        this.cache[path] = data;
    },
    queryData(path) {
        const result = this.cache[path];
        delete this.cache[path];
        return result;
    },
};

// 当扩展被启动的时候执行
exports.load = function () {
    console.log('reference-collector load')
};

// 当扩展被关闭的时候执行
exports.unload = function () {
    console.log('reference-collector unload')
};