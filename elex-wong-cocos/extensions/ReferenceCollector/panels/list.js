// 监听面板事件
exports.linsteners = {
    // 面板显示的时候触发的钩子
    show() { },
    // 面板隐藏的时候触发的钩子
    hide() { },
};

// 面板的内容
exports.template = '<div>list Hello</div>';
// 面板上的样式
exports.style = 'div { color: yellow; }';
// 快捷选择器
exports.$ = {
    elem: 'div',
};

// 面板启动后触发的钩子函数
exports.ready = function () {
    this.$.elem.innerHTML = 'list Hello World';
};

// 面板准备关闭的时候会触发的函数，return false 的话，会终止关闭面板
exports.beforeClose = function () { };

// 面板关闭后的钩子函数
exports.close = function () { };