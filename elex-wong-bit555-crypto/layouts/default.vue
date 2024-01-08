<template>
  <div>
    <Header />
    <section>
      <Nuxt />
    </section>
    <Footer />
  </div>
</template>
<script>
export default {
  name: "Default",
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      var authToken = localStorage.getItem("authToken");
      if (!authToken) {
        this.getBaseToken();
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
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/default.scss";
@import "/assets/scss/mobile/default.scss";
</style>
