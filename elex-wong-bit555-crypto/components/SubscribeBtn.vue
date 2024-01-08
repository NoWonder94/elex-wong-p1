<template>
  <div class="subscribe-btn-container">
    <div class="subscribe-btn" v-if="!isLogin" @click="openPop">
      <i class="fa-solid fa-circle-user"></i>
      <div>
        {{ $t("subscribe") }}
      </div>
    </div>
    <div class="subscribe-btn" v-if="isLogin" @click="openUser">
      <i class="fa-solid fa-circle-user"></i>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Modal from "./Modal.vue";
export default {
  name: "SubscribeBtn",
  data() {
    return {};
  },
  mounted() {},
  computed: mapState(["isLogin"]),
  methods: {
    close() {},
    signInOrOut(value) {
      this.signin = value;
    },
    openPop() {
      this.$emit("openPop");
    },
    openUser() {
      this.$emit("openUser");
    },
  },
  components: { Modal },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/subscribeBtn.scss";
@import "/assets/scss/mobile/subscribeBtn.scss";
</style>
