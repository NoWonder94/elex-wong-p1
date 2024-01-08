window._ = require('lodash');
window.axios = require('axios');
window.axios.defaults.baseURL = 'https://api.boss-sci.com/';
window.axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

const instance = axios.create();

instance.interceptors.request.use(function (request) {
    let authToken = localStorage.getItem('authToken');
    if (authToken) {
        request.headers.Authorization = 'Bearer ' + authToken;
    }
    request.headers['CURRENT-LANG'] = localStorage.getItem('selected_language') ?? 'zh-CN';

    return request;
}, function (error) {
    error.response = {
        data: null,
        loginStatus: 0,
        msg: error,
        status: false,
    };

    return error.response;
});

instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    error.response = {
        data: null,
        loginStatus: 0,
        msg: error,
        status: false,
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