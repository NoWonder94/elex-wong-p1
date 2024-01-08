<template>
  <div class="side-menu">
    <div class="side-menu-container">
      <div class="side-menu-nav">
        <div
          v-for="item in headers_new"
          :key="item.key"
          class="side-menu-nav-items"
        >
          <div
            class="side-menu-sports side-menu-nav-item"
            v-if="item.key == 'sports'"
            @click="routeToSports"
          >
            <img
              :src="item.img"
              :class="[item.key == 'dashboard' ? 'dashboard' : '']"
            />
            <div>
              {{ item.title }}
            </div>
          </div>

          <nuxt-link :to="item.link" v-else>
            <div class="side-menu-nav-item">
              <img
                :src="item.img"
                :class="[item.key == 'dashboard' ? 'dashboard' : '']"
              />
              <div>
                {{ item.title }}
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div class="side-menu-foot">
        <!--  -->
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
        <!--  -->

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
          <div class="select-redirect-label copyright">
            {{ $t("footer.copyright") }} <br />
            {{ $t("footer.allright") }} <br />
            {{ version }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "SideMenu",

  data() {
    return {
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
      pwd: "",
      isLoading: false,

      isShowMobileNav: false,
      direction: "ltr",
      currency: "",
      language: "",
    };
  },

  computed: {
    ...mapState(["isLogin", "countrys", "langList", "currencyList", "version"]),
  },
  mounted() {
    var authToken = localStorage.getItem("authToken");
    if (!authToken) {
      this.getLocationLang();
    }
    this.initConfig();
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

    appDownload() {
      window.open("https://welive-app.oss-accelerate.aliyuncs.com/app.apk");
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
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/sideMenu.scss";
@import "/assets/scss/mobile/sideMenu.scss";
</style>
