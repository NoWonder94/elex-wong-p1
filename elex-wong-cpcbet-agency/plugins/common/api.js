window._ = require('lodash');
window.axios = require('axios');
// window.axios.defaults.baseURL = 'https://dev.apigolivezhibo.com:20102/test/proxy';
// window.axios.defaults.baseURL = 'https://gozlive.com/demo/proxy';
window.axios.defaults.baseURL = 'https://api.cpcbet.com/cpc/proxy';
window.axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

const instance = axios.create();
instance.interceptors.request.use(function (request) {
  let baseToken = localStorage.getItem('baseToken');
  let authToken = localStorage.getItem('authToken');
  if (authToken) {
    request.headers.Authorization = 'Bearer ' + authToken;
  } else {
    if (!baseToken) {
      baseToken = 'gPf0IMUue3XEJIfLxWadBsFGmRKZoQw8AyOySxCuNymNEuD%2FmdT0C6uu3NXyELDcYT2TSJdRywkjQZ6YdGmAnnOMm%2FjMOmforTQWs8NZK8erftcH7NciHfGOR%2Frw5Aep7tGZ0G%2BR%2FFWqQXAIkvNk72wyRY%2Fs1I4ubQbMwXIPUkVPpiOXmo2kk7CsWWqdb%2BMY';
    }
    request.headers.Authorization = 'Bearer ' + baseToken;
  }
  request.headers['CURRENT-LANG'] = localStorage.getItem('selected_language') ?? 'en';
  request.headers['CURRENT-CURRENCY'] = localStorage.getItem('selected_currency') ?? 'PHP';

  return request;
}, function (error) {
  error.response.data = {
    resp_msg: {
      code: 500,
      message: 'Server Error'
    }
  };

  return error.response;
});

instance.interceptors.response.use(function (response) {
  if (response.data.loginStatus == -1) {
    //登录状态失效
    //清除登录状态
    localStorage.removeItem('agentId');
    localStorage.removeItem('authToken');
    $nuxt.$store.dispatch('updateUserInfo', {});
    $nuxt.$router.push({ path: '/' });
    $nuxt.$notiflix.Notify.failure('Your session has expired!', {
      showOnlyTheLastOne: true,
  });
    return {msg:'Your session has expired!',status:false};;
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
api.requestByGet = function (method, data = {}) {
  if (Object.entries(data).length > 0) {
    var esc = encodeURIComponent;
    var query = Object.keys(data).map(k => esc(k) + '=' + esc(data[k])).join('&');
    method = method + '?' + query;
  }

  return instance.get(method);
};

api.requestByPost = function (method, data = {}) {
  return instance.post(method, data);
};

export default {
  install(Vue, options) {
    Vue.prototype.$api = api;
  }
};
