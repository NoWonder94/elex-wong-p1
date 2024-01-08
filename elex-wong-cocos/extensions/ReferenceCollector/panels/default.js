const { readFileSync } = require('fs');
const { join } = require('path');

// 面板上的方法
exports.methods = {
    open() {
        // Editor.Panel.open('reference-collector');
    },

};

// 监听面板事件
exports.linsteners = {
    // 面板显示的时候触发的钩子
    show() { },
    // 面板隐藏的时候触发的钩子
    hide() { },
    /**
     * 面板大小更改的时候触发
     */
    resize() {
        console.log(this.clientHeight);
        console.log(this.clientWidth);
    },
};

// 面板的内容
exports.template = readFileSync(join(__dirname, '../static/default.html'), 'utf8');
// 面板上的样式
exports.style = readFileSync(join(__dirname, '../static/default.css'), 'utf8');

// 快捷选择器\渲染后 html 选择器
exports.$ = {
    elem: 'div',
    header: 'header',
    test: '.test',
};

// 面板启动后触发的钩子函数
exports.ready = function () {
    this.$.elem.innerHTML = 'Hello World List';

    // console.log(this.$.header); // <header>
    // console.log(this.$.test); // <section class="test">

    // const tab = await Editor.Message.request('reference-collector', 'query', 'tab');
    // const subTab = await Editor.Message.request('reference-collector', 'query', 'subTab');

    // // 打印查询到的数据
    // console.log(tab, subTab)
    // TODO 使用这两个数据初始化


};

// 面板准备关闭的时候会触发的函数，return false 的话，会终止关闭面板
exports.beforeClose = function () { };

// 面板关闭后的钩子函数
exports.close = function () {
    console.log('default pannel close');
    // 收到数据后上传到扩展进程
    // Editor.Message.send('reference-collector', 'upload', 'tab', 1);
    // Editor.Message.send('reference-collector', 'upload', 'subTab', 0);
};