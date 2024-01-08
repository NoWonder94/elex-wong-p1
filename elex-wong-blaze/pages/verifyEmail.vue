<template>
  <div class="verifyEmail">
    <div class="verifyEmail-modal-overlay" @click="closeModal('close')">
      <div class="verifyEmail-modal" @click.stop>
        <div class="header">
          <i class="el-icon-close" @click="closeModal('close')"></i>
          <img class="logo" src="~/assets/img/brand_logo.png" alt="" />
        </div>
        <div class="body">
          <div class="title">{{ $tt("verify_email_address") }}</div>
          <div class="desc">
            {{ $tt("sent_veificaiton_link") }}
            <span style="color: #8c9099">{{ email }}</span
            >.{{ $tt("confirm_email") }}
          </div>
          <div class="link">{{ $tt("resend_verification_code") }}</div>
          <div class="desc">
            {{ $tt("incorrect_email") }}
            <span class="link" @click="closeModal('openAccountSetting')">
              {{ $tt("go_to_setting") }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "verifyEmail",
  meta: {
    auth: true,
  },
  data() {
    return {
      email: "email@blaze.com",
    };
  },
  methods: {
    closeModal(action) {
      this.$emit("close-modal", action);
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/verifyEmail.scss";
@import "/assets/scss/mobile/verifyEmail.scss";
</style>
