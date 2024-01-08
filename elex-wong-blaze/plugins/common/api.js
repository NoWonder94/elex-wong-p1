import aes from "@/utils/aes.js"

window._ = require('lodash');
window.axios = require('axios');
// window.axios.defaults.baseURL = 'https://webapi.bcwin.xyz';
window.axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

const instance = axios.create();
instance.interceptors.request.use(function (request) {
  if ($nuxt.$config.encryption) {
    request.data = { data: aes.encrypt(JSON.stringify(request.data)) };  //对data形式进行传参的加密
  }
  let authToken = localStorage.getItem('authToken');
  let channelId = localStorage.getItem('channelId') ?? $nuxt.$config.channel_id;

  if (authToken) {
    request.headers.Authorization = authToken;
    request.headers.channelId = channelId;
  }
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

function forceLogout(response) {
  $nuxt.$notify({
    title: "Warning",
    message: 'Your session has expired!',
    type: "warning",
    duration: 5000,
  });
  let lang = localStorage.getItem("selected_language");
  localStorage.clear();
  localStorage.setItem("selected_language", lang);
  $nuxt.$store.dispatch("updateIslogin", null);
  $nuxt.$store.dispatch("updateUserInfo", null);
  window.initAppSocket && window.initAppSocket();
  aes.systemDefKey()
  $nuxt.$router.push({ path: $nuxt.localePath('/') });
  window.location.reload();
  // return { code: 401, msg: 'Your session has expired!', status: false };
  throw Error('Your session has expired!');
}

instance.interceptors.response.use(function (response) {

  if ($nuxt.$config.encryption) {
    let result = response.data;
    try {
      if (result.toString() != '[object Object]') {
        let dataAes = aes.decrypt(response.data.toString())
        dataAes = decodeURIComponent(dataAes)
        dataAes = dataAes.substring(0, dataAes.lastIndexOf("}") + 1);
        response.data = JSON.parse(dataAes.trim());
      }
    } catch (error) {
      return forceLogout(response);
    }
  }
  // check API login status
  if (response.data.code == 401) {
    return forceLogout(response);
  }

  if (response.data.code == 501) {
    window.showMaintaince && window.showMaintaince(true);
    return;
  }

  return response.data;
}, function (error) {
  // error.response.data = {
  //     resp_msg: {
  //         code: 500,
  //         message: 'Server Error'
  //     }
  // };

  return error.response;
});

let api = {};
api.requestByGet = function (method, data = {}) {
  if (Object.entries(data).length > 0) {
    var esc = encodeURIComponent;
    var query = Object.keys(data).map(k => esc(k) + '=' + esc(data[k])).join('&');
    method = method + '?' + query;
  }

  return instance.get(method, { baseURL: $nuxt.$config.endpoint_url });
};

api.requestByPost = function (method, data = {}) {
  let coinType = localStorage.getItem('coinType');
  let lang = localStorage.getItem("selected_language");
  let body = {
    ...data,
    "channelId": $nuxt.$config.channel_id, // required parameter
    // "currencyId": coinType ? JSON.parse(coinType).currencyId : '', // required coin type
    "language": lang ?? 'pt' // required language type
  }
  if (coinType != null && coinType != "" && coinType != undefined) {
    body['currencyId'] = typeof coinType == 'string' ? JSON.parse(coinType).currencyId :coinType.currencyId;
  }
  return instance.post(method, body, { baseURL: $nuxt.$config.endpoint_url });
};
export default {
  install(Vue, options) {
    Vue.prototype.$api = api;
  }
};
