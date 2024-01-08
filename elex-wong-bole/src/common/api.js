import axios from 'axios';
// axios.defaults.baseURL = 'http://api.bolemini.com';
axios.defaults.baseURL = 'https://api.bolegaming.com';

const instance = axios.create();
instance.interceptors.request.use(
    request => {
        //request.headers.Authorization = 'Bearer abc';
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        return response.data;
    },
    function(error) {
        return Promise.reject(error);
    }
);

let api = {};

api.request = function(method, data) {
    return instance.get(method, data);
};

export default {
    install(Vue, options) {
      Vue.prototype.$api = api;
    }
};
