<template>
    <no-ssr>
        <div>
            <Header />
            <section>
                <Nuxt />
            </section>
            <Footer />
        </div>
    </no-ssr>
</template>
<script>
import { mapState } from "vuex";
export default {
    name: 'Default',
    mounted() {
        this.init();
    },
    computed: {
        ...mapState(["isLogin", "connectedAddress", "config", "signing"]),
    },
    methods: {
        async init() {
            const selectedLang = localStorage.getItem("selected_language") ?? "zh-CN";
            this.$store.dispatch("updateLanguage", selectedLang);

            if (window.ethereum) {
                this.$web3 = new Web3(window.ethereum);
                // this.$message.success('Reinitialize Web3');
            } else {
                this.$message.error('Please Install Ethereum Plugin or App');
                return;
            }
            var chain = await this.$web3.eth.net.getId();
            if (chain !== 56) {
                this.$message.error(this.$t('message.switch_main_chain'));
                return;
            }
            if (ethereum.selectedAddress == null) {
                this.toggleMask();
            } else {
                this.eth = ethereum.selectedAddress;
                this.connect(this.eth);
            }

            ethereum.on('accountsChanged', (accounts) => {
                this.logout();
                if (accounts.length > 0) {
                    this.eth = accounts[0];
                    this.connect(this.eth);
                }
            });
            ethereum.on('chainChanged', (chainId) => {
                this.logout();
                this.$router.push({ path: this.localePath("/") });
            });
            ethereum.on('disconnect', (r) => {
                this.logout();
                this.$router.push({ path: this.localePath("/") });
            });
            const that = this;
            window.addEventListener('beforeunload', function (e) {
                try {
                    that.logout();
                } catch (error) {
                    // that.$message.error(error);
                }
            });
        },
        async toggleMask() {
            try {
                // get all wallet account
                let accounts = await ethereum.enable();
                if (accounts.length > 0) {
                    // get selected accounts
                    let address = accounts[0];
                    this.connect(address);
                }
            } catch (error) {
                console.log(error);
                // this.$message.error('togglemask ' + error);
            }
        },
        async connect(address) {
            if (this.isLogin == true) {
                // this.$message.error("Sign in already");
                return;
            }
            if (this.signing == true) {
                // this.$message.error("Signing in process");
                return;
            }
            try {

                let verifyCode = await this.$api.requestByPost("system/getVerifyCode", {
                    address: address,
                });

                if (verifyCode.status == true) {
                    this.sign(verifyCode.data);
                }
            } catch (error) {
                console.log(error);
                // this.$message.error('connect' + error);
            }
        },
        async sign(verifyCodeData) {
            try {
                this.$store.dispatch("updateSigning", true);
                const { auth_info, code, pwd } = verifyCodeData;
                let sign = await this.$web3.eth.personal
                    .sign(code, ethereum.selectedAddress, pwd);
                this.$store.dispatch("updateSigning", false);
                if (sign != null) {
                    this.login(sign, auth_info);
                } else {
                    this.$store.dispatch("updateSigning", false);
                }
            } catch (error) {
                this.$store.dispatch("updateSigning", false);
                console.log(error);
                // this.$message.error('sign ' + error);
            }
        },
        async login(sign, auth_info) {
            let login = await this.$api
                .requestByPost("system/login", {
                    signature: sign,
                    referrer_code: this.$route.query.invite_code,
                    auth_info: auth_info,
                });
            if (login.status == true) {
                localStorage.setItem("authToken", login.token);
                localStorage.setItem("connectedAddress", ethereum.selectedAddress);
                this.$store.dispatch("updateIsLogin", true);
                this.$store.dispatch("updateConnectedAddress", ethereum.selectedAddress);
                this.$router.push({ path: this.localePath("/") });
            }
        },
        logout() {
            this.$store.dispatch("updateIsLogin", false);
            this.$store.dispatch("updateConnectedAddress", '');
            this.$store.dispatch("updateWalletAmount", '');
            this.$store.dispatch("updateAccount", null);
            localStorage.removeItem("authToken");
            localStorage.removeItem("connectedAddress");
            this.$router.push({ path: this.localePath("/") });
        },
    },
    beforeDestroy() {
        this.logout();
    },

}
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/default.scss";
</style>