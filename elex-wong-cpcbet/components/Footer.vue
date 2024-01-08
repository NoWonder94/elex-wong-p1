<template>
  <div class="footer">
    <div class="footer-content web">
      <div class="footer-copyright">
        {{ $t("footer.copyright") }} <br />
        {{ $t("footer.allright") }} <br />
        {{ version }}
      </div>

      <div class="footer-navs-list">
        <div class="footer-nav">
          <a @click="routeToArticle(4)">
            {{ $t("footer.userAgreement") }}
          </a>
        </div>
        <div class="footer-nav">
          <a @click="routeToArticle(5)">
            {{ $t("footer.privacyAgreement") }}
          </a>
        </div>
        <div class="footer-nav">
          <a @click="routeToArticle(3)">
            {{ $t("footer.aboutUs") }}
          </a>
        </div>
      </div>
    </div>
    <!-- <div
      class="footer-icons mobile"
      v-if="this.$route.path == '/' || checkRoute()"
    >
      <div class="footer-nav-list">
        <div
          class="footer-navs"
          v-for="(header, index) in iconList"
          :key="index"
        >
          <div
            class="footer-navs-sports"
            v-if="header.key == 'sports'"
            @click="routeToSports"
          >
            <div><img :src="header.img" /></div>
            <div class="nav-title">
              {{ header.title }}
            </div>
          </div>

          <nuxt-link :to="header.link" v-else>
            <div>
              <img :src="header.img" alt="" />
            </div>
            <div class="nav-title">
              {{ header.title }}
            </div>
          </nuxt-link>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { version } from "os";
import { mapState } from "vuex";
export default {
  name: "Footer",
  data() {
    return {
      routeList: ["games", "liveCasino", "events", "userprofile"],
      iconList: [
        {
          key: "home",
          title: this.$t("nav.home"),
          link: "/",
          img: require("../assets/img/home.svg"),
        },
        {
          key: "games",
          title: this.$t("nav.games"),
          link: "/games",
          img: require("../assets/img/games.svg"),
        },
        {
          key: "live_casino",
          title: this.$t("nav.live_casino"),
          link: "/liveCasino",
          img: require("../assets/img/live_casino.svg"),
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
      ],
    };
  },
  computed: {
    ...mapState(["isLogin", "version"]),
  },
  methods: {
    routeToSports() {
      if (this.isLogin == false) {
        this.$notiflix.Notify.failure("Please Login", {
          showOnlyTheLastOne: true,
        });
        return false;
      }

      let params = { platform: "Bti", is_demo: 0 };
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
            this.$notiflix.Notify.failure(JSON.stringify(result.data), {
              showOnlyTheLastOne: true,
            });
          }
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },

    routeToArticle(id) {
      this.$router.push({ path: "/article", query: { articleId: id } });
    },
    checkRoute() {
      var test = this.$route.path.replace(/[^A-Za-z]/g, "");
      return this.routeList.includes(test);
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/footer.scss";
@import "/assets/scss/mobile/footer.scss";
</style>
