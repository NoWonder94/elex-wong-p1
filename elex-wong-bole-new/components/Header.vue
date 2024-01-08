<template>
  <div class="header">
    <div class="header-content">
      <div class="header-menu-bar mobile" @click="handleMobileMenu()">
        <div class="header-menu-bar-icon"></div>
        <div class="header-menu-bar-icon"></div>
        <div class="header-menu-bar-icon"></div>
      </div>
      <div class="header-logo">
        <nuxt-link :to="localePath('/')">
          <img src="../assets/img/logo.png" />
        </nuxt-link>
      </div>
      <div class="header-actions">
        <div class="header-nav web">
          <nuxt-link :to="localePath('/')">
            {{ $t("navList.index") }}
          </nuxt-link>
        </div>
        <div class="header-nav web">
          <nuxt-link :to="localePath('/bole-bit')">
            {{ $t("navList.game") }}
          </nuxt-link>
        </div>
        <div class="header-nav web">
          <nuxt-link :to="localePath('/about-us')">
            {{ $t("navList.aboutUs") }}
          </nuxt-link>
        </div>
        <div class="header-nav web">
          <nuxt-link :to="localePath('/info')">
            {{ $t("navList.news") }}
          </nuxt-link>
        </div>
        <div class="header-nav web">
          <nuxt-link :to="localePath('/game')">
            {{ $t("navList.boleBit") }}
          </nuxt-link>
        </div>
        <no-ssr>
          <div class="header-lang-switcher">
            <el-dropdown trigger="click" @command="handleLang">
              <div>
                <div class="header-lang">
                  {{ lang }}
                </div>
                <div class="icon-down">
                  <img src="../assets/img/down_white.png" />
                </div>
              </div>
              <el-dropdown-menu>
                <el-dropdown-item command="chinese">
                  {{ $t("langList.chinese") }}
                </el-dropdown-item>
                <el-dropdown-item command="english">
                  {{ $t("langList.english") }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </no-ssr>
      </div>
      <div class="header-actions-mobile">
        <div class="header-nav-mobile mobile" @click="handleMobileMenuNav()">
          <nuxt-link :to="localePath('/')">
            {{ $t("navList.index") }}
          </nuxt-link>
        </div>
        <div class="header-nav-mobile mobile" @click="handleMobileMenuNav()">
          <nuxt-link :to="localePath('/bole-bit')">
            {{ $t("navList.game") }}
          </nuxt-link>
        </div>
        <div class="header-nav-mobile mobile" @click="handleMobileMenuNav()">
          <nuxt-link :to="localePath('/about-us')">
            {{ $t("navList.aboutUs") }}
          </nuxt-link>
        </div>
        <div class="header-nav-mobile mobile" @click="handleMobileMenuNav()">
          <nuxt-link :to="localePath('/info')">
            {{ $t("navList.news") }}
          </nuxt-link>
        </div>
        <div class="header-nav-mobile mobile" @click="handleMobileMenuNav()">
          <nuxt-link :to="localePath('/game')">
            {{ $t("navList.boleBit") }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      isShowMobileMenu: false,
      lang: "",
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();

    var lang = localStorage.getItem("lang");
    if (!lang) {
      lang = "chinese";
    }
    this.handleLang(lang);

    //解决el-dropdown rendering问题
    setTimeout(function () {
      $(".header-actions").css("display", "inline-block");
    }, 100);
  },
  methods: {
    handleScroll() {
      if (this.$route.path == "/" || "/en") {
        if (document.documentElement.scrollTop > 0) {
          $(".header-content").css("background-color", "#1B1B1B");
        } else {
          $(".header-content").css("background-color", "transparent");
        }
      } else {
        $(".header-content").css("background-color", "#1B1B1B");
      }
    },
    handleMobileMenu() {
      if (this.isShowMobileMenu == false) {
        $(".header-actions-mobile").show();
      } else {
        $(".header-actions-mobile").hide();
      }
      this.isShowMobileMenu = !this.isShowMobileMenu;
    },
    handleMobileMenuNav() {
      $(".header-actions-mobile").hide();
      this.isShowMobileMenu = false;
    },
    handleLang(lang) {
      localStorage.setItem("lang", lang);
      this.lang = this.$t("langList." + lang);

      switch (lang) {
        case "chinese":
          lang = "chi";
          break;
        case "english":
          lang = "en";
          break;
        default:
          break;
      }
      this.$router.push(this.switchLocalePath(lang));
    },
  },
  watch: {
    $route(to, from) {
      this.handleScroll();
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/web/header.scss";
@import "/assets/scss/mobile/header.scss";
</style>
