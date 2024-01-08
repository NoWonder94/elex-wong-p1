<template>
  <el-dialog
    class="loginDialog"
    title="Login"
    :visible.sync="modalShow"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="form" :model="form" class="loginDialog-form">
      <!-- <el-form-item label="Mobile">
        <el-input v-model="form.mobile" placeholder="Mobile Number">
          <el-select
            class="loginDialog-form-mobileRegion"
            slot="prepend"
            placeholder="+63"
            v-model="form.country"
            filterable
            default-first-option
            :popper-append-to-body="false"
          >
            <el-option
              v-for="(countryCode, index) in countrys"
              :key="index"
              :label="'+' + countryCode.code"
              :value="countryCode.code"
              class="loginDialog-form-mobileRegion-optionsList"
            >
              <span style="float: left"> {{ countryCode.name }} </span>
              <span style="float: right">
                {{ "+" + countryCode.code }}
              </span>
            </el-option>
          </el-select>
        </el-input>
      </el-form-item> -->

      <!-- <el-form-item
        label="Verification Code"
        class="loginDialog-form-verifyCode"
      >
        <el-input class="loginDialog-form-input" v-model="form.code">
          <el-button
            slot="append"
            @click="handleVerifyCodeSent"
            v-if="ttl == 0"
          >
            Get Verification Code
          </el-button>
          <el-button slot="append" disabled v-else> {{ ttl }} sec </el-button>
        </el-input>
      </el-form-item> -->

      <el-form-item label="Username">
        <el-input
          class="loginDialog-form-input"
          type="text"
          v-model="form.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          class="loginDialog-form-input"
          type="password"
          v-model="form.code"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="loginDialog-button fill-box" @click="login(form)">
        <div v-if="isLoading"><i class="el-icon-loading"></i></div>
        <div v-else>Confirm</div>
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LoginModal",
  data() {
    return {
      isLoading: false,
      canClose: false,
      form: {
        country: 63,
        mobile: "",
        code: "",
        type: "pwd", // pwd/sms
        captchas: null,
        username: "",
      },
      captchaObj: null,
      // verification code TTL
      geetest: "",
      ttl: 0,
    };
  },
  props: ["modalShow"],
  computed: {
    ...mapState(["countrys"]),
  },
  mounted() {
    this.initialize();
    const that = this;
  },

  methods: {
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
              web.form.captchas = captchaResult;
              // web.sendVerifyCode();
              // web.login();
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
    login() {
      this.isLoading = true;
      const that = this;
      this.$api
        .requestByPost("/System/login", this.form)
        .then((result) => {
          if (result.status == true) {
            localStorage.setItem("authToken", result.token);
            sessionStorage.setItem("is_login", "true");
            that.modalShow = false;
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.login"),
              {
                showOnlyTheLastOne: true,
              }
            );
            // this.getUser();
            window.location.reload();
          } else {
            if (result.data != null && result.data.type == "captchas") {
              this.geetest.showBox();
              return;
            }
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
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    getUser() {
      this.$api
        .requestByPost("/Account/get", null)
        .then((result) => {
          if (result.status == true) {
            this.$store.dispatch("updateUserInfo", result.data);
            localStorage.setItem("agentLevel", result.data.type);
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
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    closeCallback() {
      const that = this;
      if (window.sessionStorage) {
        const data = JSON.parse(sessionStorage.getItem("is_login"));
        if (data) {
          that.modalShow = false;
        } else {
          that.modalShow = true;
        }
      }
    },
    handleVerifyCodeSent() {
      if (this.form.mobile == "") {
        this.$notiflix.Notify.failure(this.$t("message.mobile_empty"), {
          showOnlyTheLastOne: true,
        });
        return false;
      }
      this.geetest.showBox();
    },

    sendVerifyCode() {
      let params = {
        country: this.form.country,
        mobile: this.form.mobile,
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
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },

    countDownTimer() {
      if (this.ttl > 0) {
        setTimeout(() => {
          this.ttl -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/loginModal.scss";
@import "/assets/scss/mobile/loginModal.scss";
</style>
