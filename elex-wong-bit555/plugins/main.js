import Vue from 'vue';

/* VueSession */
import VueSession from 'vue-session';
Vue.use(VueSession);

/* ElementUI */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* VueElementLoading */
import VueElementLoading from 'vue-element-loading';
Vue.component('VueElementLoading', VueElementLoading);

/* api.js */
import Api from './common/api';
Vue.use(Api);

import moment from 'moment'

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MMM DD, YYYY');
  }
});

/* settings.js */
export default ({ app }, inject) => {
  inject('globalParams', Vue.observable(
    require('./common/settings.js')
  ));
}
