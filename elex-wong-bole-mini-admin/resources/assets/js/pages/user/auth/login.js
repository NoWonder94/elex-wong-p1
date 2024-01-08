/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.baseURL = '/api';
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

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
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window.Vue = require('vue');

// 引入 vue-cookie
Vue.use(require('vue-cookie'));

import ElementUI from 'element-ui';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import 'element-ui/lib/theme-chalk/index.css';

// 引入 vue-i18n 国际化
import VueI18n from 'vue-i18n';

// 创建 VueI18n 实例并设置参数
const i18n = new VueI18n({
    locale: Vue.prototype.$cookie.get('lang') || 'zh-CN',
    messages: {
    	'en': Object.assign(require(`../../../lang/en`).default, enLocale),
    	'zh-CN': Object.assign(require(`../../../lang/zh-CN`).default, zhLocale)
    }
});
Vue.prototype.$lang = function(key) {
	return i18n.t(key);
};

Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) });

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('auth-login', require('./Login.vue'));

const app = new Vue({
    el: '#app',
    i18n,
});
