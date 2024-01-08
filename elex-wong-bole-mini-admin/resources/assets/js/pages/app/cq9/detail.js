window._ = require('lodash');

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window.Vue = require('vue');

import ElementUI from 'element-ui';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import 'element-ui/lib/theme-chalk/index.css';

// 引入 vue-cookie
Vue.use(require('vue-cookie'));

// 引入 vue-i18n 国际化
import VueI18n from 'vue-i18n';

// 创建 VueI18n 实例并设置参数
const i18n = new VueI18n({
    locale: Vue.prototype.$cookie.get('lang') || 'zh-cn',
    messages: {
        'en': Object.assign(require(`../../../lang/en`).default, enLocale),
        'zh-cn': Object.assign(require(`../../../lang/zh-CN`).default, zhLocale)
    }
});
Vue.prototype.$lang = function (key) {
    return i18n.t(key);
};

Vue.use(ElementUI, {i18n: (key, value) => i18n.t(key, value)});

// 引入 font-awesome
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// 引入 js-base64
import {Base64} from 'js-base64';

Vue.use(Base64);

// 引入 vue-numeral-filter 数字格式化
import numeralFilter from 'vue-numeral-filter';

Vue.use(numeralFilter);

// 引入 filter 公共过滤库
require('@/utils/filter.js');

// 引入 helper 公共函数库
require('@/utils/helper.js');

// 引入 variable 公共变量库
require('@/utils/variable.js');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.baseURL = '/app';
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
window.axios.defaults.headers.common['token'] = Vue.prototype.$helper.getQueryString('token');

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * You can intercept requests or responses before they are handled by then or catch.
 */

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    error.response.data = {
        resp_msg: {
            code: 500,
            message: "Server Error"
        }
    };
    return error.response;
});

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.component('component-page-loading', require('../../../components/page/Loading.vue'));

import Detail from './Detail.vue';

const record = new Vue({
    el: '#app',
    i18n,
    render: h => h(Detail)
});
