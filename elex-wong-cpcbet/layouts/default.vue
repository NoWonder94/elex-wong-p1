<template>
  <div>
    <client-only>
      <HeaderNew :logo="logo" :siteName="siteName" />
      <SideMenu />
      <UserHeader v-if="isShow" />
      <section v-else>
        <Loading :isLoading.sync="isLoading" v-if="isLoading" />
        <Nuxt v-else />
      </section>
      <script>
        var _smartsupp = _smartsupp || {};
        _smartsupp.key = "ce87a862af59da35f38435ecdb5bf232f0643b45";
        window.smartsupp ||
          (function (d) {
            var s,
              c,
              o = (smartsupp = function () {
                o._.push(arguments);
              });
            o._ = [];
            s = d.getElementsByTagName("script")[0];
            c = d.createElement("script");
            c.type = "text/javascript";
            c.charset = "utf-8";
            c.async = true;
            c.src = "//www.smartsuppchat.com/loader.js?";
            s.parentNode.insertBefore(c, s);
          })(document);
      </script>
    </client-only>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Default",
  head() {
    return {
      title: this.curSiteName,
    };
  },
  data() {
    return {
      isLoading: true,
      isShow: false,
      logo: "",
      siteName: "",
      curSiteName: "",
      // idleTimeout: 10 * 60 * 1000,
      idleTimeout: 30 * 60 * 1000, //30minutes
      idleTimer: null,
    };
  },
  mounted() {
    this.init();
    this.handleUserHeader();
    this.setButtonLocation();
  },
  computed: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      }
      return false;
    },
    ...mapState(["isLogin"]),
  },
  methods: {
    async init() {
      await this.getToken();
      var authToken = localStorage.getItem("authToken");
      if (authToken) {
        this.$store.dispatch("updateIslogin", true);
        this.getUser();
      } else {
        this.getLocationLang();
      }
    },
    setButtonLocation() {
      // setTimeout(() => {
      //   var target = document.getElementById("chat-widget");
      //   new ResizeObserver(this.checkClickIsIframe).observe(target);
      // }, 1500);
    },
    checkClickIsIframe(data) {
      // if (data[0].contentRect.width <= 84 && this.isMobile()) {
      //   document.getElementById("chat-widget-container").style.bottom = "15vw";
      // } else {
      //   document.getElementById("chat-widget-container").style.bottom = "0";
      // }
    },
    getLocationLang() {
      this.$api
        .requestByPost("/System/location", null)
        .then((result) => {
          if (result.status) {
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
    async getToken() {
      let form = {
        device_id: this.generateSid(),
        client: this.isMobile ? "wap" : "web",
        source: "Google",
      };
      this.isLoading = true;
      this.$api
        .requestByPost("App/init", form)
        .then((result) => {
          if (result.status) {
            if (result.data.token) {
              localStorage.setItem("baseToken", result.data.token);
              this.logo = result.data.site_logo;
              this.siteName = result.data.site_name;
              this.getCurrentTitle();
            }
            this.$store.dispatch("updateConfig", result.data);
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
    generateSid() {
      var characters =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var result = "";
      for (var i = 0; i < 32; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      return result;
    },
    handleUserHeader() {
      let path = this.$route.path;
      if (path) {
        let array = path.split("/");
        if (array.length >= 3) {
          if (array[1] == "user") {
            this.isShow = true;
          }
        } else {
          this.isShow = false;
        }
      }
    },
    getCurrentTitle() {
      let path = this.$route.path;
      if (path) {
        let array = path.split("/");
        //when route to home page
        if (array[1] == "") {
          this.curSiteName = this.$t(`home.title`) + " - " + this.siteName;
          return;
        }

        this.curSiteName =
          this.$t(`${array[array.length - 1]}.title`) + " - " + this.siteName;
      }
    },
    getUser() {
      this.$api
        .requestByPost("User/get", null)
        .then((result) => {
          if (result == false) {
            return;
          }
          this.$store.dispatch("updateUserInfo", result.data);
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    initIdleTimer() {
      window.addEventListener("mousemove", this.resetIdleTimer);
      window.addEventListener("keydown", this.resetIdleTimer);
      window.addEventListener("click", this.resetIdleTimer);
    },
    resetIdleTimer() {
      clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(this.logout, this.idleTimeout);
    },
    logout() {
      if (this.isLogin) {
        localStorage.removeItem("authToken");
        this.$store.dispatch("updateUserInfo", {});
        this.$notiflix.Notify.failure(this.$t("message.autoLogout"), {
          showOnlyTheLastOne: true,
        });
        this.$router.push({ path: "/" });
        window.location.reload();
      }
    },
  },
  watch: {
    $route(to, from) {
      this.handleUserHeader();
      this.getCurrentTitle();
      if (this.isLogin) this.getUser();
    },
    isLogin(v) {
      if (v) {
        this.initIdleTimer();
      }
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/default.scss";
@import "/assets/scss/mobile/default.scss";
</style>
