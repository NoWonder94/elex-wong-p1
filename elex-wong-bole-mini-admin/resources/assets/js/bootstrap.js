window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.baseURL = '/api';
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * You can intercept requests or responses before they are handled by then or catch.
 */

axios.interceptors.response.use(function (response) {
    if (response.data.resp_msg.code == 401) {
        window.location.reload();
    } else if (response.data.resp_msg.code == 402) {
        window.location.href = '#/error/402';
    } else if (response.data.resp_msg.code == 403) {
        window.location.href = '#/error/403';
    } else {
        return response;
    }
}, function (error) {
    error.response.data = {
        resp_msg: {
            code: 500,
            message: "Server Error"
        }
    };
    return error.response;
    // return Promise.reject(error);
    // if (process.env.NODE_ENV == 'prod') {
    //     if (confirm('请求失败，点击确定刷新页面')) {
    //         window.location.reload();
    //     }
    // }
});

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });
