import Vue from 'vue';

/* VueSession */
import VueSession from 'vue-session';
Vue.use(VueSession);

/* ElementUI */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* Notiflix */
import Notiflix from "notiflix";
Vue.prototype.$notiflix = Notiflix;

/* VueElementLoading */
import VueElementLoading from 'vue-element-loading';
Vue.component('VueElementLoading', VueElementLoading);

/* json viewer */
import JsonViewer from 'vue-json-viewer/ssr'
Vue.use(JsonViewer);
import 'vue-json-viewer/style.css';

/* api.js */
import Api from './common/api';
Vue.use(Api);

/* settings.js */
export default ({ app }, inject) => {
  	inject('globalParams', Vue.observable(
  		require('./common/settings.js')
  	));
}
