import { createApp } from 'vue'
import router from "./router";
import store from './store'
import i18n from './lang'
import { Connection } from './utils'
import mitt from "mitt"
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/jquery.slotmachine.css'
import 'animate.css'
import "./assets/css/base.css";
import "bootstrap";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// @ts-ignore
window.$bus = mitt();

// @ts-ignore
window.$store = store;

// @ts-ignore
window.$i18n = i18n.global;

// @ts-ignore
window.process = {env:{
	NODE_ENV: process.env.NODE_ENV
}};

store.dispatch('common/init');

Connection.init();

const app = createApp(App);

app.config.globalProperties.SHOW_COIN_BAR = false;

app.use(router);
app.use(store);
app.use(i18n);
app.use(Toast, {});
app.mount('#app')
