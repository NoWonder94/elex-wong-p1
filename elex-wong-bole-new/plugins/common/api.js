window._ = require('lodash');
window.axios = require('axios');
window.axios.defaults.baseURL = 'https://api.bolegaming.com/';
window.axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

const instance = axios.create();
instance.interceptors.response.use(function (response) {
  if (response.data.status == 'ERR') {
    return false;
  }

  return response.data;
}, function (error) {
  error.response.data = {
    resp_msg: {
      code: 500,
      message: 'Server Error'
    }
  };

  return error.response;
});

let api = {};
api.request = function (method, data) {
  return instance.post(finalize(method), data);
};

export default {
  install(Vue, options) {
    Vue.prototype.$api = api;
  }
};

function finalize(method) {

  if (!method.includes('bolebit.bolegaming.com')) {
    var lang = localStorage.getItem('lang');
    if (!lang) {
      lang = 'chinese';
    }

    switch (lang) {
      case 'chinese':
        lang = 'chi';
        break;
      case 'english':
        lang = 'eng';
        break;
      default:
        break;
    }

    return method + '&lang=' + lang;
  }
  return method;
}
