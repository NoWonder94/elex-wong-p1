<template>
  <div>
    <Header @openPop="openSubcribePop" @openUser="openUserPop" />
    <section>
      <Nuxt @openPop="openSubcribePop" />
    </section>
    <SubscribeBtn @openPop="openSubcribePop" @openUser="openUserPop" />
    <Footer />
    <Modal :open="opensubcribepop" @closePop="closePop" />
    <Modal2 :open="openaccountpop" @closePop="closePop" />
  </div>
</template>
<script>
import SubscribeBtn from "../components/SubscribeBtn.vue";
import Modal from "../components/Modal.vue";
export default {
  name: "Default",
  components: { SubscribeBtn, Modal },
  created() {
    this.$nuxt.$on("openPop", () => this.openSubcribePop());
  },
  data() {
    return {
      opensubcribepop: false,
      openaccountpop: false,
      isLogin: false,
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      var authToken = localStorage.getItem("authToken");
      if (!authToken) {
        this.getBaseToken();
      } else {
        this.getUserDetail();
      }
    },
    getBaseToken() {
      let form = {
        sid: "4BDF673929D64C5681E4D8904BFD8F81",
        client: "pc",
      };

      this.$api
        .requestByPost("App/getToken", form)
        .then((result) => {
          if (result.status == true) {
            if (result.token) {
              localStorage.setItem("baseToken", result.token);
            }
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error"));
        });
    },
    getUserDetail() {
      this.$api
        .requestByPost("User/getDetail")
        .then((result) => {
          if (result.status == true) {
            this.$store.dispatch("updateUserInfo", result.data);
          } else {
            localStorage.setItem("authToken", "");
            this.$message.error(result.msg);
            getBaseToken();
          }
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error"));
        });
    },
    closePop() {
      this.opensubcribepop = false;
      this.openaccountpop = false;
    },
    openSubcribePop() {
      document.documentElement.style.overflow = "hidden";
      this.opensubcribepop = true;
    },
    openUserPop() {
      document.documentElement.style.overflow = "hidden";
      this.openaccountpop = true;
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/default.scss";
@import "/assets/scss/mobile/default.scss";
</style>
