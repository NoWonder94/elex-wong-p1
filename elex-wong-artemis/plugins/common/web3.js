export default {
    install(Vue, options) {
        Vue.prototype.$web3 = new Web3(window.ethereum);
    }
};