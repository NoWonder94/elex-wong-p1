import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ElementUI from 'element-ui';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/dist/css/swiper.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'hover.css/css/hover.css';
// import '../static/api/js/gt.js';
import SvgFiller from 'vue-svg-filler'

import App from '@/App';
import router from '@/router';
import Utils from '@/common/utils';
import data_CN from '../static/data/data_CN.js';
import data_EN from '../static/data/data_EN.js';
import data_KR from '../static/data/data_KR.js';
import '@/styles/element.scss';
import '@/styles/iconfont.css';
import '@/styles/fontello.css';
import '@/styles/animate.css';
import '@/styles/style.css';

window.$ = require('jquery');

Vue.use(VueI18n);
Vue.use(Utils);
Vue.use(ElementUI);
Vue.component('svg-filler', SvgFiller)

Vue.config.productionTip = false;

window.axios = require('axios');
import Api from '@/common/Api';
Vue.use(Api);

let lang= getParameterByName('lang');
let browserLang = navigator.language || navigator.userlanguage;
let locale;

console.log(lang);
if (lang) {
  if (lang == 'en' || lang == 'en-US') {
    locale = 'en';
  } else if (lang == 'zh-CN' || lang == 'zh') {
    locale = 'zh-CN';
  } else if (lang == 'kr') {
    locale = 'kr';
  }
} else if (localStorage.getItem('bole_lang')) {
  locale = localStorage.getItem('bole_lang');
// } else if (browserLang) {
//   if (browserLang == 'en' || browserLang == 'en-US') {
//     locale = 'en';
//   } else if (browserLang == 'zh-CN' || browserLang == 'zh') {
//     locale = 'zh-CN';
//   } else if (browserLang == 'kr') {
//     locale = 'kr';
//   } else {
//     locale = 'zh-CN';
//   }
} else {
    locale = 'en';
}

const i18n = new VueI18n({
  locale: locale,
  messages: {
    en: Object.assign(require('./lang/en').default, data_EN),
    'zh-CN': Object.assign(require('./lang/zh-CN').default, data_CN),
    'kr': Object.assign(require('./lang/kr').default, data_KR)
  }
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.

  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  // if(nearestWithTitle) document.title = nearestWithTitle.meta.title+" - 博乐游戏";
  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
    el => el.parentNode.removeChild(el)
  );

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement('meta');

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '');

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  mounted() {
    AOS.init({
      offset: 0,
      duration: 500
    });
  },
  components: { App },
  template: '<App/>'
});
