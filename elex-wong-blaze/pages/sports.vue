<template>
  <div class="sports" v-loading="isLoading">
    <div class="nodata-icon">
      <img :src="getChannelInfo.logoSmall" />
      <h3>{{ $tt("under_maintenance") }}</h3>
      <nuxt-link to="/">
        <div>{{ $tt("back") }}</div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sports",
  meta: {
    auth: true,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  mounted() {
    this.getList();
  },
  computed: {
    ...mapGetters(["getChannelInfo"]),
  },
  methods: {
    getList() {
      this.isLoading = true;

      this.$api
        .requestByPost("/hall/v2/playHall/getSportsByChannel")
        .then((result) => {
          const { code, data, msg } = result;
          this.isLoading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }
        })
        .catch((error) => {
          this.isLoading = false;

          // this.$notify({
          //   title: "Warning",
          //   message: error,
          //   type: "warning",
          //   duration: 2000,
          // });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.sports {
  position: relative;
  min-height: 40vh;
  color: #fff;

  .nodata-icon {
    height: calc(100vh - 65px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 230px;
      filter: grayscale(100%);
      opacity: 0.5;
    }

    h3 {
      line-height: 2;
      font-size: 25px;
      opacity: 0.5;
    }

    a {
      text-decoration: none;
      border: 1px solid #323b45;
      font-size: 15px;
      width: 230px;
      margin-top: 15px;
      line-height: 2.5;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
