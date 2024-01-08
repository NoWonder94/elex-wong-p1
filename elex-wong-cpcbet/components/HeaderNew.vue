<template>
  <div class="header">
    <div class="header-login-register">
      <div class="header-container">
        <div class="header-menu-bar mobile" @click="handleMobileMenu">
          <div class="header-menu-bar-icon"></div>
          <div class="header-menu-bar-icon"></div>
          <div class="header-menu-bar-icon"></div>
        </div>
        <div class="header-branding" @click="routeToHome">
          <div class="header-logo">
            <img class="header-logo-img" :src="logo" v-if="logo" />
            <!-- <img src="../assets/img/logo.png" class="header-logo-img" v-else /> -->
          </div>
          <!--
            <div class="header-branding-content">
              <div class="header-branding-title">{{ $t("cpcbet") }}</div>
              <div class="header-branding-title">{{ siteName }}</div>
              <div class="header-branding-slogan">{{ $t("live_sport") }}</div>
            </div>
          -->
        </div>
        <!-- previous login searchbar location -->
      </div>

      <div class="header-right-bar web">
        <div
          class="header-search-bar web"
          v-if="this.$route.name.split('__')[0] == 'index'"
        >
          <div class="login-input-with-route">
            <el-input
              class="login-input"
              :placeholder="$t('header.search')"
              v-model="debouncedInput"
              @input="onFilterGame"
              clearable
            >
            </el-input>

            <div class="login-input-tooltip">
              <i class="el-icon-search"></i>
            </div>
          </div>
        </div>
        <div class="header-before-login web" v-if="!isLogin">
          <div class="green-box login-button" @click="openLogin">
            {{ $t("header.login") }}
            <!-- / {{ $t("header.register") }} -->
          </div>
        </div>

        <div class="header-after-login web" v-if="isLogin">
          <nuxt-link
            to="/user/deposit"
            class="green-border-box dashboard-button"
            v-if="user.is_deposit"
          >
            {{ $t("header.deposit") }}
          </nuxt-link>
          <div class="green-border-box logout-button" @click="logout">
            {{ $t("header.logout") }}
          </div>
        </div>
        <!--
        <div class="select">
          <div class="select-title">{{ $t("register.currency") }}</div>
          <el-select
            v-model="currency"
            :placeholder="$t('register.currency')"
            @change="onCurrencyChange"
          >
            <el-option
              v-for="(currency, index) in currencyList"
              :key="index"
              :label="currency.code"
              :value="currency.code"
            >
            </el-option>
          </el-select>
        </div>
        -->
        <!--
        <div class="select">
          <div class="select-title">{{ $t("register.language") }}</div>
          <el-select
            v-model="language"
            :placeholder="$t('register.language')"
            @change="onLocaleChange"
          >
            <el-option
              v-for="(lang, index) in langList"
              :key="index"
              :label="lang.name"
              :value="lang.code"
            >
            </el-option>
          </el-select>
        </div>
         -->
      </div>

      <!-- <div class="header-login-dashboard web">
        <div class="header-before-login" v-if="!isLogin">
          <el-input
            class="login-input-with-select"
            :placeholder="$t('header.phoneNo')"
            v-model="mobile"
          >
            <el-select
              slot="prepend"
              class="login-option"
              placeholder="+86"
              v-model="code"
              filterable
              default-first-option
            >
              <el-option
                v-for="(countryCode, index) in countrys"
                :key="index"
                :label="'+' + countryCode.code"
                :value="countryCode.code"
              >
                <span style="float: left"> {{ countryCode.name }} </span>
                <span style="float: right"> {{ "+" + countryCode.code }} </span>
              </el-option>
            </el-select>
          </el-input>

          <div class="login-input-with-route">
            <el-input
              class="login-input"
              :placeholder="$t('header.password')"
              v-model="pwd"
            >
            </el-input>

            <div class="login-input-tooltip">
              <i class="el-icon-warning-outline"></i>
              <div class="bottom">
                <nuxt-link to="/forgetpass">
                  {{ $t("header.forgetpass") }}
                </nuxt-link>
              </div>
            </div>
          </div>

          <div class="green-box login-button" @click="login">
            {{ $t("header.login") }}
          </div>
          <nuxt-link to="/register" class="green-border-box register-button">
            {{ $t("header.register") }}
          </nuxt-link>
        </div>

        <div class="header-after-login" v-if="isLogin">
          <nuxt-link to="/user/deposit" class="green-box dashboard-button">
            {{ $t("header.deposit") }}
          </nuxt-link>
          <div class="green-border-box logout-button" @click="logout">
            {{ $t("header.logout") }}
          </div>
        </div>
      </div> -->

      <div class="header-login-dashboard-mobile mobile">
        <div class="header-before-login" v-if="!isLogin">
          <div class="green-box login-button" @click="handleMobileMenu">
            {{ $t("header.login") }}
          </div>
        </div>
        <div class="header-after-login" v-if="isLogin">
          <nuxt-link
            to="/user/profile"
            class="green-border-box dashboard-button"
            v-if="user.is_deposit"
          >
            {{ $t("header.deposit") }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="login-popup-container" v-show="login_popup">
      <div class="login-popup-wrap">
        <div class="login-pop">
          <div class="close">
            <i class="el-icon-close" @click="closeLogin"></i>
          </div>
          <div class="login-pop-content">
            <img src="../assets/img/profile_default.png" />
            <!-- <el-input
              class="login-input-with-select"
              :placeholder="$t('header.phoneNo')"
              v-model="mobile"
            >
              <el-select
                slot="prepend"
                class="login-option"
                placeholder="+86"
                v-model="code"
                filterable
                default-first-option
              >
                <el-option
                  v-for="(countryCode, index) in countrys"
                  :key="index"
                  :label="'+' + countryCode.code"
                  :value="countryCode.code"
                >
                  <span style="float: left"> {{ countryCode.name }} </span>
                  <span style="float: right">
                    {{ "+" + countryCode.code }}
                  </span>
                </el-option>
              </el-select>
            </el-input> -->

            <el-input
              class="login-input-with-select"
              :placeholder="$t('header.username')"
              v-model="username"
            >
            </el-input>
            <div class="login-input-with-route">
              <el-input
                class="login-input"
                :placeholder="$t('header.password')"
                v-model="pwd"
                show-password
              >
              </el-input>
            </div>
            <div class="forgetpass">
              <nuxt-link to="/forgetpass">
                {{ $t("header.forgetpass") }}
              </nuxt-link>
            </div>
            <div class="green-box login-button" @click="login">
              <div v-if="isLoading"><i class="el-icon-loading"></i></div>
              <div v-else>{{ $t("header.login") }}</div>
            </div>
            <!-- <nuxt-link to="/register" class="green-border-box register-button">
              {{ $t("header.register") }}
            </nuxt-link> -->
          </div>
        </div>
      </div>
    </div>
    <transition name="header-drawer">
      <div class="header-actions-mobile mobile" v-if="isShowMobileNav">
        <div class="header-actions-mobile-container">
          <div class="header-actions-mobile-header">
            <div class="header-logo">
              <img class="header-logo-img" :src="logo" v-if="logo" />
              <img
                src="../assets/img/logo.png"
                class="header-logo-img"
                v-else
              />
            </div>
            <!--
            <div class="header-branding-content">
              <div class="header-branding-title">
                {{ $t("cpcbet") }}
              </div>
              <div class="header-branding-slogan">{{ $t("live_sport") }}</div>
            </div>
             -->
            <i class="el-icon-close" @click="handleClose"></i>
          </div>
          <hr />
          <div class="header-actions-mobile-content">
            <div class="header-before-login" v-if="!isLogin">
              <!-- <el-input
                class="login-input-with-select"
                :placeholder="$t('header.phoneNo')"
                v-model="mobile"
              >
                <el-select
                  slot="prepend"
                  class="login-option"
                  placeholder="+86"
                  v-model="code"
                  filterable
                  default-first-option
                >
                  <el-option
                    v-for="(countryCode, index) in countrys"
                    :key="index"
                    :label="'+' + countryCode.code"
                    :value="countryCode.code"
                  >
                    <span style="float: left"> {{ countryCode.name }} </span>
                    <span style="float: right">
                      {{ "+" + countryCode.code }}
                    </span>
                  </el-option>
                </el-select>
              </el-input> -->
              <el-input
                class="login-input-with-select"
                :placeholder="$t('header.username')"
                v-model="username"
              >
              </el-input>
              <el-input
                class="login-input"
                :placeholder="$t('header.password')"
                v-model="pwd"
                show-password
              >
              </el-input>

              <div class="green-box login-button" @click="login">
                <div v-if="isLoading"><i class="el-icon-loading"></i></div>
                <div v-else>{{ $t("header.login") }}</div>
              </div>
              <!-- <nuxt-link
                to="/register"
                class="green-border-box register-button"
              >
                {{ $t("header.register") }}
              </nuxt-link> -->
              <nuxt-link to="/forgetpass" class="forget-pwd-button">
                {{ $t("header.forgetpass") }}
              </nuxt-link>
            </div>

            <div class="header-after-login" v-if="isLogin">
              <div class="header-actions-mobile-nav">
                <div
                  v-for="item in headers_new"
                  :key="item.key"
                  :class="[
                    'header-actions-mobile-nav-item',
                    item.link == $route.path ? 'green-box' : '',
                  ]"
                >
                  <div
                    class="header-navs-sports header-navs"
                    v-if="item.key == 'sports'"
                    @click="routeToSports"
                  >
                    <img
                      :src="item.img"
                      :class="[item.key == 'dashboard' ? 'dashboard' : '']"
                    />
                    {{ item.title }}
                  </div>

                  <nuxt-link :to="item.link" v-else>
                    <div class="header-navs">
                      <img
                        :src="item.img"
                        :class="[item.key == 'dashboard' ? 'dashboard' : '']"
                      />
                      {{ item.title }}
                    </div>
                  </nuxt-link>
                </div>
              </div>
              <div class="border-box logout-button" @click="logout">
                {{ $t("header.logout") }}
              </div>
            </div>
          </div>

          <div class="header-actions-mobile-footer">
            <div class="header-actions-mobile-footer-container">
              <div class="select">
                <div class="select-title">{{ $t("register.currency") }}</div>
                <el-select
                  v-model="currency"
                  :placeholder="$t('register.currency')"
                  @change="onCurrencyChange"
                >
                  <el-option
                    v-for="(currency, index) in currencyList"
                    :key="index"
                    :label="currency.code"
                    :value="currency.code"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="select">
                <div class="select-title">{{ $t("register.language") }}</div>
                <el-select
                  v-model="language"
                  :placeholder="$t('register.language')"
                  @change="onLocaleChange"
                >
                  <el-option
                    v-for="(lang, index) in langList"
                    :key="index"
                    :label="lang.name"
                    :value="lang.code"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="select-redirect">
                <div class="select-redirect-label" @click="routeToArticle(4)">
                  {{ $t("footer.userAgreement") }}
                </div>
              </div>
              <div class="select-redirect">
                <div class="select-redirect-label" @click="routeToArticle(5)">
                  {{ $t("footer.privacyAgreement") }}
                </div>
              </div>
              <div class="select-redirect">
                <div class="select-redirect-label" @click="routeToArticle(3)">
                  {{ $t("footer.aboutUs") }}
                </div>
              </div>
              <div class="select-redirect">
                <div class="select-redirect-label">
                  {{ version }}
                </div>
              </div>
              <!-- <div class="app-download-button greenGradientButtonBg">
                <div><img src="../assets/img/app_download.svg" alt="" /></div>
                <div class="app-download-text">
                  {{ $t("header.app_download") }}
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "HeaderNew",

  data() {
    return {
      headers: [
        { label: "Home", nav: "/" },
        { label: "Games", nav: "/games" },
        { label: "Live Casino", nav: "/liveCasino" },
        { label: "Sports", nav: "" },
        // { label: "Download", nav: "/download" },
        { label: "Events", nav: "/events" },
      ],
      headers_new: [
        {
          key: "games",
          title: this.$t("nav.games"),
          link: "/",
          img: require("../assets/img/games.svg"),
        },
        {
          key: "sports",
          title: this.$t("nav.sports"),
          link: "",
          img: require("../assets/img/sports.svg"),
        },
        {
          key: "events",
          title: this.$t("nav.events"),
          link: "/events",
          img: require("../assets/img/events.svg"),
        },
        {
          key: "dashboard",
          title: this.$t("nav.dashboard"),
          link: "/user/deposit",
          img: require("../assets/img/dashboard.svg"),
        },
      ],
      code: "",
      mobile: "",
      username: "",
      pwd: "",
      search: "",
      isLoading: false,
      login_popup: false,

      isShowMobileNav: false,
      direction: "ltr",
      currency: "",
      language: "",

      debouncedInput: "",
      captchaObj: null,
    };
  },

  computed: {
    ...mapState([
      "isLogin",
      "countrys",
      "langList",
      "currencyList",
      "user",
      "version",
    ]),
  },
  props: ["logo", "siteName"],
  mounted() {
    var authToken = localStorage.getItem("authToken");
    if (!authToken) {
      this.getLocationLang();
    }
    this.initConfig();
    this.initCaptcha();
  },
  methods: {
    getLocationLang() {
      this.$api
        .requestByPost("/System/location", null)
        .then((result) => {
          if (result.status) {
            this.code = parseInt(result.data.code);
            this.$store.dispatch("updateCountryCode", result.data.code);
            this.$store.dispatch("updateLanguage", result.data.lang ?? "en");
            this.$store.dispatch(
              "updateCurrency",
              result.data.currency ?? "PHP"
            );
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    initConfig() {
      var selected_language = localStorage.getItem("selected_language");
      this.language = selected_language;
      var selected_currency = localStorage.getItem("selected_currency");
      this.currency = selected_currency;
    },
    openLogin() {
      this.login_popup = true;
    },
    closeLogin() {
      this.login_popup = false;
    },
    login() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      let params = {
        username: this.username,
        country: this.code,
        mobile: this.mobile,
        code: this.pwd,
        type: "pwd",
        captchas:
          this.captchaObj != null ? JSON.stringify(this.captchaObj) : null,
      };

      this.$api
        .requestByPost("System/login", params)
        .then((result) => {
          if (result.status == true) {
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );

            /* Store Token */
            localStorage.setItem("authToken", result.token);

            /* call user get */
            this.getUser();
            this.handleClose();
          } else if (
            !result.status &&
            result.data &&
            result.data.type == "captchas"
          ) {
            this.geetest.showBox();
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }

          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },

    getUser() {
      this.$api
        .requestByPost("User/get", null)
        .then((result) => {
          if (result.status == true) {
            this.$store.dispatch("updateUserInfo", result.data);
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
      this.$router.push({ path: "/" });
    },

    logout() {
      localStorage.removeItem("authToken");
      this.$store.dispatch("updateUserInfo", {});
      this.$notiflix.Notify.success(this.$t("message.logout"), {
        showOnlyTheLastOne: true,
      });
      this.handleClose();
      this.$router.push({ path: "/" });
      window.location.reload();
    },

    routeToSports() {
      if (this.isLogin == false) {
        this.$notiflix.Notify.failure(this.$t("message.plsLogin"), {
          showOnlyTheLastOne: true,
        });
        return false;
      }

      let params = { id: "1329", platform: "CQ9", is_demo: 0 };
      this.$api
        .requestByPost("/Game/play", params)
        .then((result) => {
          if (result.status == true) {
            const { data, msg } = result;
            if (data !== null) {
              window.open(data, "_blank");
            } else {
              this.$notiflix.Notify.failure(msg, {
                showOnlyTheLastOne: true,
              });
            }
          } else {
            if (result.msg != null && result.msg != "") {
              this.$notiflix.Notify.failure(result.msg, {
                showOnlyTheLastOne: true,
              });
            } else {
              this.$notiflix.Notify.failure(result, {
                showOnlyTheLastOne: true,
              });
            }
          }
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },

    routeToHome() {
      this.$router.push({ path: "/" });
    },

    routeToArticle(id) {
      this.$router.push({ path: "/article", query: { articleId: id } });
    },

    handleMobileMenu() {
      this.isShowMobileNav = !this.isShowMobileNav;
      if (this.isShowMobileNav)
        document.documentElement.style.overflow = "hidden";
      else document.documentElement.style.overflow = "auto";
    },

    handleClose() {
      this.login_popup = false;
      this.isShowMobileNav = false;
      document.documentElement.style.overflow = "auto";
    },
    onCurrencyChange() {
      this.$store.dispatch(
        "updateCurrency",
        this.currency ? this.currency : "USD"
      );
    },
    onLocaleChange() {
      this.$store.dispatch(
        "updateLanguage",
        this.language ? this.language : "en"
      );
    },
    appDownload() {
      window.open("https://welive-app.oss-accelerate.aliyuncs.com/app.apk");
    },

    onFilterGame() {
      this.$root.$emit("search_game", this.debouncedInput);
    },

    initCaptcha() {
      let web = this;
      initGeetest4(
        {
          captchaId: "043a29c6f820a1e3c42ab255d0b0c10a",
          product: "bind",
          language: "eng",
          riskType: "slide",
        },
        function (captcha) {
          web.geetest = captcha;
          captcha
            .onReady(function () {})
            .onSuccess(function () {
              var captchaResult = captcha.getValidate();
              if (!captchaResult) {
                return alert("Verify");
              }
              captchaResult.captcha_id = "043a29c6f820a1e3c42ab255d0b0c10a";
              web.captchaObj = captchaResult;
              web.login();
            })
            .onError(function () {
              //your code
            });
        }
      );
    },
  },
  watch: {
    $route(to, from) {
      this.handleClose();
      this.login_popup = false;
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/headerNew.scss";
@import "/assets/scss/mobile/headerNew.scss";
</style>
