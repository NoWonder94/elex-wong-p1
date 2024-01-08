<template>
  <div class="event">
    <div class="event-banner" v-for="banner in eventList" :key="banner.id">
      <img :src="banner.image" alt="" @click="handleRoute(banner.id)" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Events",
  // head() {
  //   return {
  //     title: this.$t("event.title"),
  //   }
  // },
  data() {
    return {
      eventList: [],
    };
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
      let params = { page: 1 };
      this.$api
        .requestByPost("Activity/lists", params)
        .then((result) => {
          if (result.status == true) {
            this.eventList = result.data.list;
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
    },

    handleRoute(id) {
      this.$router.push({ path: "/events/" + id });
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/events.scss";
@import "/assets/scss/mobile/events.scss";
</style>
