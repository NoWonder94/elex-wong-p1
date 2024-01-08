<template>
  <div class="refer">
    <div class="refer-modal-overlay" @click="closeModal('close')">
      <div class="refer-modal" @click.stop>
        <div class="header">
          <i class="el-icon-close" @click="closeModal('close')"></i>
          <div class="head">{{ $tt("refer_a_friend") }}</div>
        </div>

        <div class="body">
          <div class="alert">{{ $tt("earn_by_invitation") }}</div>
          <div class="title">{{ $tt("invite_friend_earn_money") }}</div>
          <div class="desc">
            {{ $tt("receive_cash_balance") }}
          </div>
          <div class="desc" @click="closeModal('how')">
            <span class="desc-text">{{ $tt("how_invitation_works") }}</span>
          </div>
        </div>

        <div class="footer">
          <el-divider />
          <div class="subtitle">{{ $tt("share_your_code") }}</div>

          <div
            class="refer-code-container mobile"
            @click="copyToClipBoard(referCode)"
          >
            <el-input v-model="referCode" :disabled="true">
              <div class="label" slot="prefix">
                {{ $tt("your_referral_code") }}
              </div>

              <el-button slot="append">{{ $tt("copy_link") }}</el-button>
            </el-input>
          </div>

          <div class="web">
            <div class="label">{{ $tt("your_referral_code") }}</div>
            <div
              class="input"
              @click="copyToClipBoard(referCode)"
              v-loading="loading"
            >
              {{ referCode }}
            </div>
            <div class="copyBtn" @click="copyToClipBoard(referCode)">
              {{ $tt("copy_link") }}
            </div>
          </div>
          <!-- <div class="whatsapp mobile">
            <img class="icon" src="~/assets/img/logo-whatsapp.svg" alt="" />
            Share via WhatsApp
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Refer",
  data() {
    return {
      // referCode: "blaze.com/r/PaKBqd",
      referCode: "",
      loading: false,
    };
  },
  computed: {
    ...mapState(["user", "isLogin"]),
  },
  mounted() {
    if (this.isLogin) {
      this.getPromotionCode();
    }
  },
  methods: {
    closeModal(action) {
      this.$emit("close-modal", action);
    },
    copyToClipBoard(textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      this.$notify({
        title: "Successful",
        message: "Copied to clipboard.",
        type: "success",
        duration: 2000,
      });
    },
    getPromotionCode() {
      if (this.user) {
        var userId = this.user.id;
      }
      this.loading = true;

      this.$api
        .requestByGet("/hall/v2/user/getPromotionCode", { userId: userId })
        .then((res) => {
          const { code, data, msg } = res;
          if (code == 200) {
            // this.referCode = window.location.href + msg;
            this.referCode =
              window.location.hostname + "?type=referral&code=" + msg;
          }
          this.loading = false;
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/refer.scss";
@import "/assets/scss/mobile/refer.scss";
</style>
