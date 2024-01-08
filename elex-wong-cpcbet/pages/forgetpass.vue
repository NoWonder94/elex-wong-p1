<template>
  <div class="forgetPass">
    <div class="container">
      <div class="select">
        <div class="select-region-label">
          {{ $t("forgetPass.nationArea") }}
        </div>
        <el-select
          class="select-region-option"
          v-model="code"
          :placeholder="$t('forgetPass.nationArea')"
          filterable
          default-first-option
        >
          <el-option
            v-for="(countryCode, index) in countrys"
            :key="index"
            :label="countryCode.name + ' +' + countryCode.code"
            :value="countryCode.code"
          >
            <span style="float: left"> {{ countryCode.name }} </span>
            <span style="float: right"> {{ "+" + countryCode.code }} </span>
          </el-option>
        </el-select>
      </div>

      <div class="input">
        <el-input v-model="mobile" :placeholder="$t('forgetPass.phoneNo')" />
      </div>
      <div class="input web">
        <el-input
          v-model="verifyCode"
          :placeholder="$t('register.verificationCode')"
        >
          <p slot="suffix" @click="handleIconClick" v-if="ttl == 0">
            {{ $t("forgetPass.getVerificationCode") }}
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

      <div class="submit-button greenGradientButtonBg" @click="login">
        {{ $t("forgetPass.submit") }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Forgetpass",
  // head() {
  //   return {
  //     title: this.$t("header.forgetpass"),
  //   };
  // },
  data() {
    return {
      isLoading: true,
      mobile: "",
      code: "",
      verifyCode: "",
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
    ...mapState(["countrys"]),
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
    initConfig() {
      var selected_country = localStorage.getItem("selected_country");
      this.code = parseInt(selected_country);
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
          this.$router.push({ path: "/user/changepwd" });
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    login() {
      let params = {
        country: this.code,
        mobile: this.mobile,
        code: this.verifyCode,
        type: "sms",
      };

      this.$api
        .requestByPost("System/login", params)
        .then((result) => {
          if (result.status == true) {
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );

            /* Store Token */
            localStorage.setItem("authToken", result.token);

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
        type: "login",
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
@import "/assets/scss/pc/forgetPass.scss";
@import "/assets/scss/mobile/forgetPass.scss";
</style>

