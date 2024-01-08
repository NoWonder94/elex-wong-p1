<template>
  <div class="forgotpwd">
    <div class="forgotpwd-modal-overlay" @click="closeModal('close')">
      <div class="forgotpwd-modal" @click.stop>
        <div class="header web">
          <i class="el-icon-close" @click="closeModal('close')"></i>
          <img class="logo" src="~/assets/img/brand_logo.png" alt="" />
        </div>
        <div class="header mobile">
          <i class="el-icon-close" @click="closeModal('close')"></i>
          <div class="btn">
            <div @click="closeModal('login')">{{ $tt("login") }}</div>
            <div class="register" @click="closeModal('reg')">
              {{ $tt("register") }}
            </div>
          </div>
          <el-divider />
          <img class="logo" src="~/assets/img/brand_logo.png" alt="" />
        </div>
        <div class="body">
          <div class="title">{{ $tt("forgot_password") }}</div>
          <div class="text-input">
            <input type="text" v-model="form.email" placeholder=" " />
            <label>{{ $tt("email_address") }}</label>
          </div>

          <div class="submitBtn">{{ $tt("submit") }}</div>
        </div>
        <!-- <div class="footer">
          <div class="row">
            <div class="otherLogin">
              <img src="~/assets/img/steam.svg" alt="" />
            </div>
            <div class="otherLogin">
              <img src="~/assets/img/google.svg" alt="" />
            </div>
            <div class="otherLogin">
              <img src="~/assets/img/twitch.svg" alt="" />
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPwd",
  data() {
    return {
      form: {
        email: "",
      },
    };
  },
  methods: {
    closeModal(action) {
      this.$emit("close-modal", action);
      this.form = {
        email: "",
      };
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/forgotpwd.scss";
@import "/assets/scss/mobile/forgotpwd.scss";
</style>
