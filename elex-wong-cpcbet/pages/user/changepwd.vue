<template>
  <div class="changepwd">
    <div class="back-title changepwd-back">
      <i class="el-icon-back back-icon" @click="back"></i>
      {{ $t("changePass.title") }}
    </div>
    <div class="title"></div>
    <div class="container">
      <div class="container-left-input">
        <div class="input">
          <div class="input-label">
            {{ $t("changePass.new_password") }}
          </div>
          <el-input
            v-model="newPass"
            :placeholder="$t('changePass.new_password')"
          />
        </div>
        <div class="input">
          <div class="input-label">
            {{ $t("changePass.confirm_new_password") }}
          </div>
          <el-input
            v-model="confirmNewPass"
            :placeholder="$t('changePass.confirm_new_password')"
          />
        </div>
      </div>

      <div class="container-right-input">
        <div class="input web">
          <div class="input-label">
            {{ $t("register.verificationCode") }}
          </div>
          <el-input
            v-model="verifyCode"
            :placeholder="$t('register.verificationCode')"
          >
            <p slot="suffix" @click="handleIconClick" v-if="ttl == 0">
              {{ $t("changePass.getVerificationCode") }}
            </p>
            <p slot="suffix" style="cursor: default" v-else>
              {{ ttl }} {{ $t("forgetPass.secondsLeft") }}
            </p>
          </el-input>
        </div>
        <div class="input mobile">
          <div class="input-label mobile">
            {{ $t("register.verificationCode") }}
          </div>
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

        <div class="submit-button greenGradientButtonBg" @click="submit">
          {{ $t("changePass.title") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePassword",
  // head() {
  //   return {
  //     title: this.$t("changePass.title"),
  //   };
  // },
  data() {
    return {
      isLoading: true,
      newPass: "",
      confirmNewPass: "",
      verifyCode: "",
      geetest: "",
      captchaObj: {},
      ttl: 0,
    };
  },
  mounted() {
    this.initialize();
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
    sendVerifyCode() {
      let params = {
        captchas: JSON.stringify(this.captchaObj),
        type: "repwd",
      };

      this.$api
        .requestByPost("User/sendSmsVerifyCode", params)
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
    submit() {
      if (this.confirmNewPass != this.newPass) {
        this.$notiflix.Notify.failure(this.$t("message.pass_not_same"), {
          showOnlyTheLastOne: true,
        });
        return false;
      }
      let params = {
        type: "sms",
        code: this.verifyCode,
        pwd: this.confirmNewPass,
      };
      this.$api
        .requestByPost("User/repwd", params)
        .then((result) => {
          if (result.status == true) {
            localStorage.setItem("authToken", result.token);
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );
            this.$router.push({ path: "/" });
          } else {
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
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/changepwd.scss";
@import "/assets/scss/mobile/changepwd.scss";
</style>
