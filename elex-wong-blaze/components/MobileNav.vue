<template>
  <div class="mobile-nav-container">
    <div class="mobile-nav-innner-container">
      <div class="mobile-nav-item" @click="handleMenu">
        <Burger class="mobile-icon" />
        <div class="mobile-title">{{ $tt("menu") }}</div>
      </div>
      <div class="mobile-nav-item" @click="handleSearch">
        <Search class="mobile-icon" />
        <div class="mobile-title">{{ $tt("search") }}</div>
      </div>
      <div class="mobile-nav-item">
        <Logo class="mobile-icon-unranked" />
      </div>
      <div class="mobile-nav-item" @click="openLiveSupport">
        <Chat class="mobile-icon" />
        <div class="mobile-title">{{ $tt("mobileNavChat") }}</div>
      </div>
      <div class="mobile-nav-item" @click="handleModal('login')" v-if="!isLogin">
        <Rewards class="mobile-icon" />
        <div class="mobile-title">{{ $tt("_rewards") }}</div>
      </div>
      <div class="mobile-nav-item" @click="handleUrl('/rewards')" v-if="isLogin">
        <Rewards class="mobile-icon" />
        <div class="mobile-title">{{ $tt("_rewards") }}</div>
      </div>
    </div>
    <ShowModal v-if="showModal" :type="type" @close="showModal = false" />
  </div>
</template>
<script>
import Burger from "~/components/svg/Burger.vue";
import Search from "~/components/svg/Search.vue";
import Logo from "~/components/svg/Logo.vue";
import Chat from "~/components/svg/Chat.vue";
import Rewards from "~/components/svg/Rewards.vue";
import { mapState } from "vuex";
export default {
  name: "MobileNav",
  components: { Burger, Search, Logo, Chat, Rewards },
  data() {
    return {
      type: "",
      showModal: false,
    };
  },
  computed: {
    ...mapState(["isLogin"]),
  },
  methods: {
    handleUrl(url) {
      window.newRouter(url);
    },
    handleMenu() {
      this.$emit("handle-mobileNav", true);
    },
    handleSearch() {
      this.$emit("handleSearch", true);
    },
    handleModal(type) {
      this.type = type;
      this.showModal = true;
    },
    openLiveSupport() {
      window.openChat && window.openChat();
      // activate live chat
      // LC_API.open_chat_window();

      // another live chat
      // window.open("https://vue.livehelp100service.com/chatwindow.aspx?siteId=65000839&planId=54e8c5fd-d2c7-4629-8e93-335f95e65988");
    },
  },
};
</script>
<style lang="scss" type="type/css">
@import "/assets/scss/mobile/mobileNav.scss";
</style>
