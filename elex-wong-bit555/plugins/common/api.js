window._ = require('lodash');
window.axios = require('axios');
window.axios.defaults.baseURL = 'https://api.gersonsupport.cn/api/';
window.axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

const instance = axios.create();
instance.interceptors.request.use(function (request) {
  let authToken = localStorage.getItem('authToken');
  let baseToken = localStorage.getItem('baseToken');
  if (!baseToken || baseToken == "") {
    baseToken = "ZFViWVo3cTkzU01ZekUza2M4UVc0VXJPdW1QS2dGOVFmcHg4L3l6dWxnWlkxNklCUXJVSS9waEdlVVB1NUJwbmk3Vmd5UlNDaTZwRGpSN0xGc3B5Ry9hcXFqMzRYRnY1SWo4UjV4UGVLTVBJZ1VQaDg0SUxUSHFsNWU0bVFjb24vMjc3aktGNXVBTkFCZWJ0cmtLSlVoSzJMVWRUQWdxNEtxSEFvOVNISnFobnMvNFhGSWdQWEp4N2o0TmYvQm9t";
  }
  if (authToken) {
    request.headers.Authorization = 'Bearer ' + authToken;
  } else {
    request.headers.Authorization = 'Bearer ' + baseToken;
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
