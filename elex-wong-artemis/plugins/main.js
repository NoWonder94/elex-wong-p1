import Vue from 'vue';

/* VueSession */
import VueSession from 'vue-session';
Vue.use(VueSession);

/* ElementUI */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* VueBootstrap */
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

/* copy to clipboard */
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

/* api.js */
import Api from './common/api';
Vue.use(Api);

/* web3.js */
import Web3 from './common/web3';
Vue.use(Web3);

/* odometer */
import IOdometer from 'vue-odometer';
import 'odometer/themes/odometer-theme-default.css';
Vue.component('vue-odometer', IOdometer);

/* lottie */
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
Vue.component('lottie-animation', LottieAnimation);

/* Dayjs */
dayjs.extend(window.dayjs_plugin_customParseFormat);

/* VueCarousel */
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);