<template>
  <div class="header">
    <div class="header-content">
      <div class="web header-content-container">
        <div class="header-content-nav-wrap">
          <div class="header-content-logo">
            <nuxt-link to="/"><img src="../assets/img/logo.png" /></nuxt-link>
          </div>
          <div class="header-content-nav-container">
            <div
              class="header-content-nav"
              v-for="(header, index) in headers"
              :key="index"
            >
              <nuxt-link :to="header.nav">
                {{ $t("types." + header.label) }}
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="header-content-others">
          <div class="header-content-platforms-container">
            <div
              class="header-content-platforms"
              v-for="(platform, index) in platforms"
              :key="index"
              @click="openLink(platform.link)"
            >
              <i
                :class="['fa-brands', platform.img]"
                v-if="platform.img != ''"
              ></i>
            </div>
          </div>
          <div class="header-content-subcribe">
            <div v-if="!isLogin" @click="subcribe">{{ $t("subscribe") }}</div>
            <div v-if="isLogin" @click="openUser">{{ $t("account") }}</div>
          </div>
          <div class="header-content-playnow" @click="playNow">
            {{ $t("playnow") }}
          </div>
        </div>
      </div>
      <div
        :class="[
          'header-content-container-mobile ',
          'mobile',
          this.$route.path == '/' ? 'flex-end' : '',
        ]"
      >
        <div class="header-content-logo" v-show="this.$route.path != '/'">
          <nuxt-link to="/"><img src="../assets/img/logo.png" /></nuxt-link>
        </div>
        <div
          :class="['header-content-nav-icon', isShowMobileNav ? 'open' : '']"
          @click="showMobileNav"
        >
          <div :class="['side-bar', isShowMobileNav ? 'open' : '']">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div class="header-actions-mobile mobile" v-if="isShowMobileNav">
        <div class="header-actions-mobile-innerLayer">
          <div class="header-actions-mobile-innerLayer-middle">
            <div
              class="header-actions-mobile-innerLayer-nav"
              v-for="(header, index) in headers"
              :key="index"
            >
              <nuxt-link :to="header.nav">
                {{ $t("types." + header.label) }}
              </nuxt-link>
            </div>
          </div>
          <div class="header-actions-mobile-innerLayer-bottom">
            <div class="header-actions-mobile-innerLayer-platforms-container">
              <div
                class="header-actions-mobile-innerLayer-platform"
                v-for="(platform, index) in platforms"
                :key="index"
                @click="openLink(platform.link)"
              >
                <i
                  :class="['fa-brands', platform.img]"
                  v-if="platform.img != ''"
                ></i>
              </div>
            </div>
            <div class="header-actions-mobile-innerLayer-subcribe">
              <div v-if="!isLogin" @click="subcribe">{{ $t("subscribe") }}</div>
              <div v-if="isLogin" @click="openUser">{{ $t("account") }}</div>
            </div>
            <div
              class="header-actions-mobile-innerLayer-playnow"
              @click="playNow"
            >
              {{ $t("playnow") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Modal from "./Modal.vue";
export default {
  name: "Header",
  data() {
    return {
      headers: [
        { label: "home", nav: "/" },
        { label: "news", nav: "/news" },
        { label: "event", nav: "/event" },
        //{ label: "help", nav: "/help" },
      ],
      platforms: [
        {
          label: "Github",
          link: "https://github.com/Bit555game",
          img: "fa-github",
        },
        {
          label: "Twitter",
          link: "https://twitter.com/Bit555_Official",
          img: "fa-twitter",
        },
        {
          label: "Facebook",
          link: "https://www.facebook.com/Bit555-106614435328018",
          img: " fa-facebook",
        },
        {
          label: "Discord",
          link: "https://discord.gg/VbkqV3M7zN",
          img: "fa-discord",
        },
        {
          label: "Instagram",
          link: "https://www.instagram.com/bit555.io/",
          img: "fa-instagram",
        },
        {
          label: "Telegram",
          link: "https://t.me/Bit555_English",
          img: "fa-telegram",
        },
      ],
      navBarIndex: -1,
      /* mobile */
      isShowMobileNav: false,
    };
  },
  computed: mapState(["isLogin"]),
  methods: {
    openLink(link) {
      if (link != "") window.open(link);
    },
    showMobileNav() {
      this.isShowMobileNav = !this.isShowMobileNav;
      if (this.isShowMobileNav)
        document.documentElement.style.overflow = "hidden";
      else document.documentElement.style.overflow = "auto";
    },
    //open sign in or out popup
    subcribe() {
      this.$emit("openPop");
    },
    //open account popup
    openUser() {
      this.$emit("openUser");
    },
    playNow() {
      window.open("https://bit555.io/i-58ewgevu-n/");
    },
  },
  watch: {
    $route(to, from) {
      this.isShowMobileNav = false;
    },
  },
  components: { Modal },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/header.scss";
@import "/assets/scss/mobile/header.scss";
</style>
