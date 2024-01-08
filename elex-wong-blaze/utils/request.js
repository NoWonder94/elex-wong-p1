import axios from 'axios';
import aes from "./aes"
// import store from '@/store/index'

if (process.env.NODE_ENV === 'development') {
  //   axios.defaults.baseURL = 'http://192.168.0.199:8080';
  // axios.defaults.baseURL = 'http://192.168.0.199:8080';
  // axios.defaults.baseURL = 'http://192.168.0.199:8080';
  axios.defaults.baseURL = 'https://webapi.bcwin.xyz';
} else {
  axios.defaults.baseURL = 'https://webapi.bcwin.xyz';
}
// axios.defaults.headers.common.Origin = window.location.origin;
axios.interceptors.request.use(

  config => {
    // config.url = config.url+ '/'
    // console.log(config.headers.type);
    let swith = false
    if (swith) {
      config.data = { data: aes.encrypt(JSON.stringify(config.data)) };  //对data形式进行传参的加密

    }
    let token = window.localStorage.getItem("token");
    //  config.headers['origin'] = window.location.origin
    // console.log(token);
    config.headers['channelId'] = localStorage.getItem("channelId")
    if (config.headers.type == undefined) {
      if (token) config.headers['Authorization'] = JSON.parse(token).access_token
    } else {
      // 第三方接口反向代理
      config.baseURL = '/api';
      // config.baseURL = 'https://apistaging.wx7777.com/';
      // delete config.headers.type
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

axios.interceptors.response.use(

  response => {
    //   const {
    //     code,
    //     data,
    //     msg
    //   } = response.data;
    // let datas = Rsa.decrypt(response.data)  //解密
    // const respinfgf =  JSON.parse(datas)
    // console.log(respinfgf);
    // console.log(response);
    let swith = false
    if (swith) {
      // console.log(response);
      let result = response.data;
      if (result.toString() != '[object Object]') {
        let dataAes = aes.decrypt(response.data.toString())
        dataAes = decodeURIComponent(dataAes)
        dataAes = dataAes.substring(0, dataAes.lastIndexOf("}") + 1);
        response.data = JSON.parse(dataAes.trim());
      }
      // console.log("1111111"+dataAes);
      // var json = decodeURIComponent(dataAes);
      // console.log("位置："+json.lastIndexOf("}"))
      // console.log("截取值："+json.substring(0,json.lastIndexOf("}")+1))
      //  console.log("2222222"+dataAes);
      // console.log(response);

    }
    // console.log(response);
    if (response.data.code !== 200) {
      switch (response.data.code) {
        case 401:
          if (response.data.data === 'code_1062') {
            // router.push({
            //   path: '/prohibitlogin'
            // })
          } else if (response.data.data === 'code_1122') { //维护通知
            let msg = JSON.parse(response.data.msg)
            // console.log(msg, 'msg')
            // store.commit("SET_NOTICE", msg);
          }
          break;
      }
    }
    // 统一封装状态为500的接口多语言
    // if (code == 500) {
    //   switch (data) {
    //     case "code_1014":
    //       Message({
    //         type: 'error',
    //         message: this.$i18n.t('Login.WrongPassword')
    //       })
    //       break
    //   }
    // }
    return response;
  })
export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

}