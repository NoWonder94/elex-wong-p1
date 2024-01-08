import Vue from 'vue';

/* VueSession */
import VueSession from 'vue-session';
Vue.use(VueSession);

/* copy to clipboard */
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

/* ElementUI */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale });

/* Swiper */
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
Vue.use(VueAwesomeSwiper);

/* Loadash */
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
Vue.use(VueLodash, { lodash: lodash })

import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay]);

/* Notiflix */
import Notiflix from "notiflix";
Vue.prototype.$notiflix = Notiflix;

/* VueElementLoading */
import VueElementLoading from 'vue-element-loading';
Vue.component('VueElementLoading', VueElementLoading);

import LoginModal from '@/components/LoginModal';
Vue.component('LoginModal', LoginModal);
/* api.js */
import Api from './common/api';
Vue.use(Api);

/* settings.js */
export default ({ app }, inject) => {
    inject('globalParams', Vue.observable(
        require('./common/settings.js')
    ));
}
