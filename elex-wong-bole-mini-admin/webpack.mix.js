let mix = require('laravel-mix');

// 合并任何 Webpack 配置以覆盖默认配置
mix.webpackConfig({
    output: {
        chunkFilename: "js/pages/[id].js?id=[chunkhash]"
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/assets/js'),
            '~': path.resolve(__dirname, 'resources/assets/sass')
        }
    }
});

// 引入全局 scss 变量，在 vue 文件内使用
mix.options({
    extractVueStyles: 'public/css/vue.css',
    globalVueStyles: 'resources/assets/sass/_variables.scss'
});

// 游戏回放资源目录复制
mix.copyDirectory('resources/ges', 'public/ges');

// CQ9 资源目录复制
mix.copyDirectory('resources/cq9', 'public/cq9');

// img 图片资源目录复制
mix.copyDirectory('resources/assets/img', 'public/img');

// js 预处理器
mix.js('resources/assets/js/pages/app/cq9/detail.js', 'public/js/app/cq9')
    .js('resources/assets/js/pages/app/game/record.js', 'public/js/app')
    .js('resources/assets/js/pages/user/auth/login.js', 'public/js/user')
    .js('resources/assets/js/app.js', 'public/js');

// sass 预处理器
mix.sass('resources/assets/sass/pages/app/cq9/detail.scss', 'public/css/app/cq9')
    .sass('resources/assets/sass/pages/app/game/record.scss', 'public/css/app')
    .sass('resources/assets/sass/pages/user/login.scss', 'public/css/user')
    .sass('resources/assets/sass/app.scss', 'public/css');

// 运行 npm run prod 时版本化控制
if (mix.inProduction()) {
    mix.version();
}

