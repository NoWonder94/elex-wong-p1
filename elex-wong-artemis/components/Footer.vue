<template>
  <div class="footer fixed-bottom">
    <div class="py-2 d-flex justify-content-evenly text-center">
      <div @click="routeToHome">
        <div
          role="button"
          :class="[this.$route.path == localePath('/') ? 'active' : '']"
        >
          <img src="../assets/img/home-fill.svg" alt="" />
          <div class="footer-text">{{ $t("tab.home") }}</div>
        </div>
      </div>
      <div @click="routeToVault">
        <div
          role="button"
          :class="[this.$route.path == localePath('/vault') ? 'active' : '']"
        >
          <img src="../assets/img/bank_vault.svg" alt="" />
          <div class="footer-text">{{ $t("tab.vault") }}</div>
        </div>
      </div>
      <div @click="routeToProfile">
        <div
          role="button"
          :class="[this.$route.path == localePath('/profile') ? 'active' : '']"
        >
          <img src="../assets/img/profile.svg" alt="" />
          <div class="footer-text">{{ $t("tab.me") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Footer",
  computed: {
    ...mapState(["isLogin", "connectedAddress", "language"]),
  },
  methods: {
    routeToHome() {
      this.$router.push({ path: this.localePath("/") });
    },
    routeToVault() {
      this.$router.push({ path: this.localePath("/vault") });
    },
    routeToProfile() {
      this.$router.push({ path: this.localePath("/profile") });
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/footer.scss";
</style>
