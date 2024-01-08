<template>
  <div>
    <client-only>
      <Header :logo="logo" />
      <section>
        <Nuxt />
      </section>
      <LoginModal :modalShow="modalShow"></LoginModal>
      <!--
        <Footer />
        -->
      <div style="display: none">version:{{ version }}</div>
    </client-only>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Default",
  head() {
    return {
      title: this.siteName,
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: this.logo,
        },
      ],
    };
  },
  data() {
    return {
      modalShow: true,
      logo: "",
      siteName: "",
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState(["isLogin", "version"]),
  },
  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    async init() {
      await this.getToken();
      var authToken = localStorage.getItem("authToken");
      if (authToken) {
        sessionStorage.setItem("is_login", "true");
        this.$store.dispatch("updateIslogin", true);
        this.getUser();
      } else {
        sessionStorage.setItem("is_login", "false");
      }
    },
    async getToken() {
      let form = {
        device_id: this.generateSid(),
        client: this.isMobile() ? "wap" : "web",
        source: "Google",
      };
      this.isLoading = true;
      this.$api
        .requestByPost("App/init", form)
        .then((result) => {
          if (result.status == true) {
            if (result.data.token) {
              localStorage.setItem("baseToken", result.data.token);
              localStorage.setItem(
                "gameType",
                JSON.stringify(result.data.game_type)
              );
              // localStorage.setItem("siteName", result.data.site_name);
              this.siteName = result.data.site_name;
              this.logo = result.data.site_logo;
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
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
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
    getUser() {
      this.$api
        .requestByPost("/Account/get", null)
        .then((result) => {
          if (result.status == true) {
            this.$store.dispatch("updateUserInfo", result.data);
            localStorage.setItem("agentId", result.data.id);
            localStorage.setItem("agentLevel", result.data.type);
            localStorage.setItem(
              "roleAccess",
              JSON.stringify(result.data.role)
            );
          }
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
  },
  watch: {
    isLogin(v) {
      this.modalShow = !v;
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/default.scss";
@import "/assets/scss/mobile/default.scss";
</style>
