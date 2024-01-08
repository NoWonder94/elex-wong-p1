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

/* VueUploadImage */
import VueUploadImage from 'vue-upload-image';
Vue.component('VueUploadImage', VueUploadImage);

/* VueEditor */
import VueEditor from 'vue2-editor';
Vue.use(VueEditor, {
    useCustomImageHandler: true
});

/* api.js */
import Api from './common/api';
Vue.use(Api);

/* settings.js */
export default ({ app }, inject) => {
  	inject('globalParams', Vue.observable(
  		require('./common/settings.js')
  	));
}
