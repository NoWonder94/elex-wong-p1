<template>
  <div class="login">
    <div class="login-modal-overlay" @click="closeModal('closeAll')">
      <div class="login-modal" @click.stop>
        <div class="header web">
          <i class="el-icon-close" @click="closeModal('close')"></i>
          <img class="logo" :src="getChannelInfo.logoSmall" alt="" />
        </div>
        <div class="header mobile">
          <i class="el-icon-close" @click="closeModal('close')"></i>
          <div class="btn">
            <div class="login">{{ $tt("sign_in") }}</div>
            <div @click="closeModal('reg')">{{ $tt("register") }}</div>
          </div>
          <el-divider />
          <img class="logo" :src="getChannelInfo.logoSmall" alt="" />
        </div>
        <div class="body" v-if="loginItems != null">
          <div class="title">{{ $tt("sign_in_account") }}</div>
          <div class="text-input" v-if="loginItems['1']">
            <input type="text" v-model="form.email" placeholder=" " />
            <label>{{ $tt("email_address") }}</label>
          </div>

          <div class="text-input" v-if="loginItems['3']">
            <vue-tel-input
              v-model="form.phone"
              v-bind="option"
              @country-changed="countryChanged"
            ></vue-tel-input>
            <div div class="country-code">+{{ form.countryCode }}</div>
          </div>

          <div class="text-input" v-if="loginItems['2']">
            <input
              v-if="showPassword"
              type="text"
              v-model="form.password"
              placeholder=" "
            />
            <input
              v-else
              type="password"
              v-model="form.password"
              placeholder=" "
            />
            <label>{{ $tt("password") }}</label>
            <i
              class="fas"
              :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
              @click="toggleShow()"
            ></i>
          </div>
          <div class="forgotpass">
            <el-link
              type="info"
              @click="closeModal('forgotPwd')"
              :underline="false"
              >{{ $tt("forgot_password") }}</el-link
            >
            <ForgotPwd
              v-show="showForgotModal"
              @close-modal="showForgotModal = false"
            />
          </div>
          <div class="signBtn" @click="login">
            <span v-if="!loading">{{ $tt("sign_in") }}</span>
            <span v-if="loading"><i class="el-icon-loading"></i></span>
            <img
              v-if="!loading"
              class="arrow"
              src="~/assets/img/arrow.svg"
              alt=""
            />
          </div>
        </div>
        <div class="footer">
          <p class="text mobile">
            {{ $tt("sign_in_tnc_1") }}
            <el-link
              href="https://policies.google.com/privacy"
              type="info"
              :underline="false"
            >
              {{ $tt("privacy_policy") }}</el-link
            >
            {{ $tt("and") }}
            <el-link
              href="https://policies.google.com/terms"
              type="info"
              :underline="false"
            >
              {{ $tt("term_of_service") }}</el-link
            >
            {{ $tt("apply") }}
          </p>
          <!-- <el-divider>
            <p>{{ $tt("or") }}</p>
          </el-divider> -->
          <!-- <div class="row">
            <div class="otherLogin">
              <img src="~/assets/img/google.svg" alt="" />
            </div>
            <div class="otherLogin">
              <img src="~/assets/img/steam.svg" alt="" />
            </div>
            <div class="otherLogin">
              <img src="~/assets/img/twitch.svg" alt="" />
            </div>
          </div> -->
          <div class="text web">
            {{ $tt("no_account") }}
            <el-link
              class="text-terms"
              :underline="false"
              type="info"
              @click="closeModal('reg')"
            >
              {{ $tt("create_account") }}</el-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ForgotPwd from "./forgotPwd.vue";
import aes from "@/utils/aes.js";
export default {
  name: "Login",
  components: { ForgotPwd },
  data() {
    return {
      loading: false,
      showForgotModal: false,
      activeName: "first",
      form: {
        email: "",
        password: "",
        phone: "",
        countryCode: "",
      },
      showPassword: false,
      /* Map */
      loginItems: null,
      /* tel input */
      option: {
        inputOptions: {
          placeholder: " ",
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getChannelInfo", "getLoginConfig"]),
  },
  mounted() {
    this.initForm();
  },
  methods: {
    initForm() {
      if (this.getLoginConfig == null) {
        return false;
      }
      var regtype = this.getLoginConfig;
      this.loginItems = {};
      var items = regtype.registerItem.split(",");
      for (let index = 0; index < 6; index++) {
        this.loginItems[`${index + 1}`] = items.includes(`${index + 1}`);
      }
    },
    closeModal(action) {
      this.$emit("close-modal", action);
    },
    toggleShow() {
      this.showPassword = !this.showPassword;
    },

    login() {
      if (this.loading) {
        return;
      }
      if (this.form.email == "") {
        this.$notify({
          title: "Warning",
          message: "Email cannot be empty",
          type: "warning",
          duration: 2000,
        });
        return false;
      }

      if (this.form.password == "") {
        this.$notify({
          title: "Warning",
          message: "Password cannot be empty",
          type: "warning",
          duration: 2000,
        });
        return false;
      }

      this.loading = true;
      this.$api
        .requestByPost("/hall/v2/user/login", {
          userName: this.form.email,
          password: this.form.password,
          phone: this.form.countryCode + this.form.phone,
        })
        .then((result) => {
          const { code, msg, data } = result;
          this.loading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          } else {
            this.$notify({
              title: "Successful",
              message: msg,
              type: "success",
              duration: 2000,
            });
          }
          const { token, socket } = data;
          if (token) {
            this.$AdjustEvent.loginSuccess();
            aes.dealKeys(token.key);
            this.$store.dispatch("updateIslogin", token.access_token);
            localStorage.setItem("socket", socket);
            window.initAppSocket && window.initAppSocket();
            this.$store.dispatch("getUserInfo");
            this.$store.dispatch("getWalletList");
            this.$store.dispatch("getUnreadEmailCount");
            this.$store.dispatch("getUnreadNoticeCount");
            this.closeModal("closeAll");
          }
        })
        .catch((error) => {
          this.loading = false;
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },

    countryChanged(obj) {
      this.form.countryCode = obj.dialCode;
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/login.scss";
@import "/assets/scss/mobile/login.scss";
</style>
