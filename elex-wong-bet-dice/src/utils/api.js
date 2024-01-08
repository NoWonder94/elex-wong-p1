import axios from "axios";
import { CONFIG } from "@/defines";
import qs from "qs";
import { useToast } from "vue-toastification";

const toast = useToast();

const Api = axios.create({
  baseURL: CONFIG.apiUrl,
  timeout: 30000
});

Api.interceptors.request.use(
  config => {
    if (config.data) {
      config.data = qs.stringify(config.data)
    }

    const storeAccount = window.$store.state.account;
    if (storeAccount.publicKey) {
      config.headers['Authorization'] = storeAccount.publicKey
    }
    return config;
  },
  error => {
    toast.error(error.message);
    return Promise.reject(error)
  }
);

Api.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.status) {
      toast.error(res.msg);
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    toast.error(error.message);
    return Promise.reject(error)
  }
);

export { Api };