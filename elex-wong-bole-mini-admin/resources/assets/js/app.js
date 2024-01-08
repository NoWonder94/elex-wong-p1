/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

// 路由 router
import router from './router/index.js';

// 引入 vue-cookie
Vue.use(require('vue-cookie'));

// 引入 element-ui
import ElementUI from 'element-ui';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import 'element-ui/lib/theme-chalk/index.css';
// import '../sass/element-variables.scss'

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);
import {morphDate} from 'vue-morphling';
Vue.use(morphDate);
const VueUploadComponent = require('vue-upload-component');
Vue.component('file-upload', VueUploadComponent);

//上传多图plugin
import VueUploadMultipleImage from './components/00_base/VueUploadMultipleImage';
if (document.querySelector('#my-strictly-unique-vue-upload-multiple-image')) {
    Vue.component('VueUploadMultipleImage', VueUploadMultipleImage);
    new Vue({
        el: '#my-strictly-unique-vue-upload-multiple-image', render: h => h(App)
    });
}

// 引入 vue-i18n 国际化
import VueI18n from 'vue-i18n';

// 创建 VueI18n 实例并设置参数
const i18n = new VueI18n({
    locale: Vue.prototype.$cookie.get('lang') || 'zh-CN',
    messages: {
    	'en': Object.assign(require(`./lang/en`).default, enLocale),
    	'zh-CN': Object.assign(require(`./lang/zh-CN`).default, zhLocale)
    }
});
Vue.prototype.$lang = function(key) {
	return i18n.t(key);
};

Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) });

// 引入 font-awesome
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// 引入 vue-progressbar 进度条
import VueProgressBar from 'vue-progressbar';

Vue.use(VueProgressBar);

// 引入 vuebar 滚动条
import Vuebar from 'vuebar';

Vue.use(Vuebar);

// 引入 vue-numeral-filter 数字格式化
import numeralFilter from 'vue-numeral-filter';

Vue.use(numeralFilter);

// 引入 js-base64
import {Base64} from 'js-base64';

Vue.use(Base64);

// 引入 filter 公共过滤库
require('./utils/filter.js');

// 引入 helper 公共函数库
require('./utils/helper.js');

// 引入 variable 公共变量库
require('./utils/variable.js');

// 根 App.vue
import App from './App.vue';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('component-layout-menu', require('./components/layout/Menu.vue'));
Vue.component('component-layout-user', require('./components/layout/User.vue'));
Vue.component('component-page-breadcrumb', require('./components/page/Breadcrumb.vue'));
Vue.component('component-page-loading', require('./components/page/Loading.vue'));
Vue.component('component-page-org-tree', require('./components/page/Tree.vue'));
Vue.component('component-page-org-tree-option', require('./components/page/TreeOption.vue'));
Vue.component('component-page-game-scenes', require('./components/page/game/Scenes.vue'));
Vue.component('component-page-game-scenes-option', require('./components/page/game/ScenesOption.vue'));
Vue.component('component-page-timestamp', require('./components/page/Timestamp.vue'));

Vue.config.productionTip = false;

const app = new Vue({
    el: '#app',
    router,
    i18n,
    render: h => h(App)
});
