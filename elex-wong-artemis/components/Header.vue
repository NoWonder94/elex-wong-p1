<template>
  <nav class="navbar fixed-top header py-2">
    <div class="container-fluid px-2">
      <div class="d-flex container p-0">
        <div v-b-toggle.sidebar-backdrop class="p-1 pe-2">
          <span class="navbar-toggler-icon"></span>
        </div>
        <div class="py-1 btn rounded-pill connect-btn d-flex align-items-center" role="button" v-on:click="toggleMask">
          <img src="../assets/img/link.png" class="link-icon pe-1" />

          <div v-if="!isLogin">{{ $t("connect_wallet") }}</div>
          <div class="connect-btn-addresss" v-else>
            {{ shortAddress(connectedAddress) }}
          </div>
        </div>

        <select class="form-select ms-auto border-bottom" aria-label="Default select example"
          :placeholder="$t('language')" @change="changeLang" v-model="selectedLang">
          <option v-for="language in langs" :key="language.key" :value="language.key">
            {{ language.title }}
          </option>
        </select>
      </div>
      <b-sidebar id="sidebar-backdrop" backdrop shadow>
        <template slot="header">
          <div class="
              d-flex
              justify-content-between
              align-content-end
              container-fluid
              py-3
              px-4
              card-shadow-without-radius
            ">
            <div class="d-flex align-items-center">
              <img src="../assets/img/bosssci_logo2.png" class="logo-img" />
            </div>
            <button v-b-toggle.sidebar-backdrop type="button" class="btn-close" aria-label="Close"></button>
          </div>
        </template>
        <div class="p-3 pb-1 font14">
          <div v-for="index in route" :key="index.path">
            <nuxt-link :to="index.path">
              <div class="
                  d-flex
                  justify-content-between
                  align-items-center
                  mx-1
                  my-4
                  dt
                ">
                <div class="d-flex">
                  <img class="route-icon me-2" :src="index.icon" />{{
                  index.text
                  }}
                </div>
                <img class="link-icon" src="../assets/img/forward.svg" />
              </div>
            </nuxt-link>
          </div>
        </div>
        <hr class="mx-4" />
        <div class="px-2 mx-4 font14">
          <div class="d-flex text-center px-1 pt-2">
            <div class="px-1 py-2 col border-end" role="button" @click="openUrl(config.facebook)">
              <img src="../assets/img/facebook.png" class="header-icon" />
            </div>
            <div class="px-1 py-2 col border-end" role="button" @click="openUrl(config.telegram)">
              <img src="../assets/img/telegram.png" class="header-icon" />
            </div>
            <div class="px-1 py-2 col" role="button" @click="openUrl(config.twitter)">
              <img src="../assets/img/twitter.png" class="header-icon" />
            </div>
          </div>
          <div class="d-flex text-center px-1">
            <div class="px-1 py-1 col">
              <div class="opacity-50">Facebook</div>
            </div>
            <div class="px-1 py-1 col">
              <div class="opacity-50">Telegram</div>
            </div>
            <div class="px-1 py-1 col">
              <div class="opacity-50">Twitter</div>
            </div>
          </div>
          <div class="border my-2 p-2 text-center position-relative rounded-pill">
            <div class="fw-bold">{{ config != null ? config.email : "" }}</div>
            <div class="
                position-absolute
                top-50
                end-0
                transform_y50_x10
                text-primary
              " role="button" v-clipboard:copy="config != null ? config.email : ''" v-clipboard:success="onCopy"
              v-clipboard:error="onError">
              {{ $t("utils.copy") }}
            </div>
          </div>
          <div class="pb-2 text-center opacity-50">
            {{ $t("headers.company_email") }}
          </div>

          <div class="pb-2 text-center opacity-50">{{ version }}</div>
        </div>
      </b-sidebar>
    </div>
  </nav>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      route: [
        {
          text: this.$t("headers.introduction"),
          path: this.localePath("/introduction"),
          icon: require("../assets/img/bosssci_logo.png"),
        },
        {
          text: this.$t("headers.aibot"),
          path: this.localePath("/ai-betting-robot"),
          icon: require("../assets/img/ai_betting.svg"),
        },
        {
          text: this.$t("headers.video"),
          path: this.localePath("/video"),
          icon: require("../assets/img/video.svg"),
        },
        {
          text: this.$t("headers.vault"),
          path: this.localePath("/vault"),
          icon: require("../assets/img/deposit_withdrawal.svg"),
        },
        {
          text: this.$t("headers.strategy"),
          path: this.localePath("/our-strategy"),
          icon: require("../assets/img/our_strategy.svg"),
        },
        {
          text: this.$t("headers.faq"),
          path: this.localePath("/faq"),
          icon: require("../assets/img/f_q.svg"),
        },
      ],
      referralLink: "Support@Artemis.com",
      selectedLang: "",
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState([
      "isLogin",
      "connectedAddress",
      "config",
      "signing",
      "version",
      "langs",
    ]),
  },
  methods: {
    init() {
      this.selectedLang = localStorage.getItem("selected_language") ?? "zh-CN";
    },
    changeLang(e) {
      this.$store.dispatch("updateLanguage", this.selectedLang);
      // window.location.reload();
    },
    shortAddress(a) {
      if (a == null || a == "") {
        return "";
      }
      return a.slice(0, 4) + "..." + a.substr(a.length - 4);
    },
    openUrl(url) {
      if (url != "" && url != null) {
        window.open(url);
      }
    },
    onCopy: function (e) {
      this.$message.success(this.$t("message.copy_successful"));
    },
    onError: function (e) {
      this.$message.success(this.$t("message.copy_failed"));
    },
    async toggleMask() {
      try {
        // get all wallet account
        var chain = await this.$web3.eth.net.getId();
        if (chain !== 56) {
          this.$message.error(this.$t('message.switch_main_chain'));
          return;
        }
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
        // this.$message.error('connect ' + error);
      }
    },
    async sign(verifyCodeData) {
      try {
        this.$store.dispatch("updateSigning", true);
        const { auth_info, code, pwd } = verifyCodeData;
        let sign = await this.$web3.eth.personal.sign(
          code,
          ethereum.selectedAddress,
          pwd
        );
        this.$store.dispatch("updateSigning", false);
        if (sign != null) {
          this.login(sign, auth_info);
        } else {
          this.$store.dispatch("updateSigning", false);
        }
      } catch (error) {
        this.$store.dispatch("updateSigning", false);
        console.log(error);
        // this.$message.error('sign' + error);
      }
    },
    async login(sign, auth_info) {
      let login = await this.$api.requestByPost("system/login", {
        signature: sign,
        referrer_code: this.$route.query.invite_code,
        auth_info: auth_info,
      });
      if (login.status == true) {
        localStorage.setItem("authToken", login.token);
        localStorage.setItem("connectedAddress", ethereum.selectedAddress);
        this.$store.dispatch("updateIsLogin", true);
        this.$store.dispatch(
          "updateConnectedAddress",
          ethereum.selectedAddress
        );
        this.$router.push({ path: this.localePath("/") });
      }
    },
    logout() {
      this.$store.dispatch("updateIsLogin", false);
      this.$store.dispatch("updateConnectedAddress", "");
      this.$store.dispatch("updateWalletAmount", "");
      this.$store.dispatch("updateAccount", null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("connectedAddress");
    },
  },
  beforeDestroy() {
    this.logout();
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/header.scss";
</style>
