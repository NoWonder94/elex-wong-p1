<template>
  <div class="register">
    <div class="container">
      <div class="input">
        <el-input
          class="input-with-select"
          :placeholder="$t('header.phoneNo')"
          v-model="mobile"
        >
          <el-select
            slot="prepend"
            class="input-option-region"
            placeholder="+86"
            v-model="code"
            filterable
            default-first-option
          >
            <el-option
              v-for="(countryCode, index) in countrys"
              :key="index"
              :label="'+' + countryCode.code"
              :value="countryCode.code"
            >
              <span style="float: left"> {{ countryCode.name }} </span>
              <span style="float: right"> {{ "+" + countryCode.code }} </span>
            </el-option>
          </el-select>
        </el-input>
      </div>

      <div class="input">
        <el-input v-model="username" :placeholder="$t('register.username')" />
      </div>
      <div class="input">
        <el-input
          v-model="pwd"
          :placeholder="$t('register.password')"
          show-password
        />
      </div>
      <div class="input web">
        <el-input
          v-model="verifyCode"
          :placeholder="$t('register.verificationCode')"
        >
          <p slot="suffix" @click="handleIconClick" v-if="ttl == 0">
            {{ $t("register.getVerificationCode") }}
          </p>
          <p slot="suffix" style="cursor: default" v-else>
            {{ ttl }} {{ $t("forgetPass.secondsLeft") }}
          </p>
        </el-input>
      </div>
      <div class="input mobile">
        <el-input
          v-model="verifyCode"
          :placeholder="$t('register.verificationCode')"
        >
        </el-input>
        <div class="suffix-text" @click="handleIconClick" v-if="ttl == 0">
          {{ $t("register.getVerificationCode") }}
        </div>
        <div class="suffix-text" v-else>
          {{ ttl }} {{ $t("forgetPass.secondsLeft") }}
        </div>
      </div>

      <div class="register-button greenGradientButtonBg" @click="register">
        <div v-if="isLoading"><i class="el-icon-loading"></i></div>
        <div v-else>{{ $t("register.register") }}</div>
      </div>
      <div class="select">
        <div class="select-label">
          {{ $t("register.currency") }}
        </div>
        <el-select
          class="select-option"
          v-model="currency"
          :placeholder="$t('register.currency')"
        >
          <el-option
            v-for="(currency, index) in currencyList"
            :key="index"
            :label="currency.code"
            :value="currency.code"
          >
          </el-option>
        </el-select>
      </div>

      <div class="select">
        <div class="select-label">
          {{ $t("register.language") }}
        </div>
        <el-select
          class="select-option"
          v-model="language"
          :placeholder="$t('register.language')"
          @change="onLocaleChange()"
        >
          <el-option
            v-for="(lang, index) in langList"
            :key="index"
            :label="lang.name"
            :value="lang.code"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Register",
  // head() {
  //   return {
  //     title: this.$t("header.register"),
  //   };
  // },
  data() {
    return {
      isLoading: false,
      mobile: "",
      code: 63,
      verifyCode: "",
      pwd: "",
      username: "",
      language: "",
      currency: "",
      geetest: "",
      captchaObj: {},
      ttl: 0,
    };
  },
  mounted() {
    this.initConfig();
    this.initialize();
  },
  computed: {
    ...mapState(["countrys", "langList", "currencyList"]),
  },

  methods: {
    countDownTimer() {
      if (this.ttl > 0) {
        setTimeout(() => {
          this.ttl -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    onLocaleChange() {
      this.$store.dispatch("updateLanguage", this.language);
    },
    initConfig() {
      var selected_country = localStorage.getItem("selected_country");
      this.code = parseInt(selected_country);
      var selected_language = localStorage.getItem("selected_language");
      this.language = selected_language;
      var selected_currency = localStorage.getItem("selected_currency");
      this.currency = selected_currency;
    },
    initialize() {
      let web = this;
      initGeetest4(
        {
          captchaId: "043a29c6f820a1e3c42ab255d0b0c10a",
          product: "bind",
          language: "eng",
          riskType: "slide",
        },
        function (captcha) {
          web.geetest = captcha;
          captcha
            .onReady(function () {})
            .onSuccess(function () {
              var captchaResult = captcha.getValidate();
              if (!captchaResult) {
                return alert("Verify");
              }
              captchaResult.captcha_id = "043a29c6f820a1e3c42ab255d0b0c10a";
              web.captchaObj = captchaResult;
              web.sendVerifyCode();
            })
            .onError(function () {
              //your code
            });
          $("#btn").click(function () {
            captcha.showCaptcha();
          });
        }
      );
    },
    handleIconClick() {
      this.geetest.showBox();
    },
    getUser() {
      this.$api
        .requestByPost("User/get", null)
        .then((result) => {
          this.$store.dispatch("updateUserInfo", result.data);
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    register() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      let params = {
        country: this.code.toString(),
        mobile: this.mobile,
        verify_code: this.verifyCode,
        pwd: this.pwd,
        username: this.username,
      };

      this.$api
        .requestByPost("System/reg", params)
        .then((result) => {
          if (result.status == true) {
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );

            /* Store currency and language */
            localStorage.setItem("authToken", result.token);
            this.$store.dispatch(
              "updateCurrency",
              this.currency ? this.currency : "USD"
            );
            this.$store.dispatch(
              "updateLanguage",
              this.language ? this.language : "en"
            );

            /* call user get */
            this.getUser();
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    sendVerifyCode() {
      let params = {
        country: this.code,
        mobile: this.mobile,
        captchas: JSON.stringify(this.captchaObj),
        type: "reg",
      };

      this.$api
        .requestByPost("System/sendSmsVerifyCode", params)
        .then((result) => {
          if (result.status == true) {
            this.ttl = result.data.ttl;
            this.countDownTimer();
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );
          } else {
            if (result.data) {
              this.ttl = result.data.ttl;
              this.countDownTimer();
            }
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/register.scss";
@import "/assets/scss/mobile/register.scss";
</style>

