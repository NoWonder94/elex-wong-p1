import Vue from 'vue';

/* VueSession */
import VueSession from 'vue-session';
Vue.use(VueSession);

/* ElementUI */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* Swiper */
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
Vue.use(VueAwesomeSwiper);

import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay]);

/* VueSocialSharing */
import VueSocialSharing from 'vue-social-sharing';
Vue.use(VueSocialSharing);

/* AOS */
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

/* Particles */
import Particles from "particles.vue";
Vue.use(Particles);

/* api.js */
import Api from './common/api';
Vue.use(Api);

/* settings.js */
export default ({ app }, inject) => {
  	inject('globalParams', Vue.observable(
  		require('./common/settings.js')
  	));
}

var lang = localStorage.getItem('lang');
if (!lang) {
	localStorage.setItem('lang', 'chinese');
}