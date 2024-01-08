<template>
  <div class="referral">
    <div class="referral-back back-title">
      <span @click="back">
        <i class="el-icon-back"></i>{{ $t("referral.title") }}</span
      >
    </div>
    <div class="referral-wrapping-mobile">
      <div class="referral-container">
        <div class="referral-title">
          {{ $t("referral.invitationCode") }} : {{ invitationCode }}
        </div>
        <div class="referral-qrcode">
          <img :src="qrcode" class="qrcode-img" alt="" />
        </div>
        <hr />
        <div class="referral-text">
          {{ $t("referral.copyAndSentToFriend") }}
        </div>
        <button
          class="referral-button greenGradientButtonBg"
          type="button"
          v-clipboard:copy="referralLink"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          {{ $t("referral.copyLink") }}
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "referral",
  head() {
    return {
      title: this.$t("referral.title"),
    };
  },
  data() {
    return {
      invitationCode: "",
      qrcode: require("../../../assets/img/banner/banner.png"),
      referralLink: "",
      isLoading: false,
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    back() {
      this.$router.back();
    },
    initialize() {
      this.$api
        .requestByPost("Proxy/share", null)
        .then((result) => {
          const { image, code, url } = result.data;
          this.qrcode = image;
          this.referralLink = url;
          this.invitationCode = code;
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    onCopy: function (e) {
      // alert(this.$t("message.onCopy") + e.text);
      this.$notiflix.Notify.success(this.$t("message.onCopy") + e.text, {
        showOnlyTheLastOne: true,
      });
    },
    onError: function (e) {
      // alert(this.$t("message.copyFailed"));
      this.$notiflix.Notify.failure(this.$t("message.copyFailed"), {
        showOnlyTheLastOne: true,
      });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/referral.scss";
@import "/assets/scss/mobile/referral.scss";
</style>
