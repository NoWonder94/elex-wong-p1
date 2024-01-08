<template>
  <div class="event-detail">
    <div class="back-title mobile" @click="back">
      <i class="el-icon-back"></i>
      <!-- {{ $t("events.title") }} -->
    </div>
    <div class="event-detail-wrapping-mobile">
      <img :src="eventImage" alt="" class="event_img" />
      <ContentTitle :text="title" />
      <div class="event-description">
        {{ activityDesc }}
      </div>
      <div v-html="contents" class="event-others"></div>
      <!-- <hr /> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "EventDetail",
  head() {
    return {
      title: this.title + " - " + this.$t("cpcbet"),
    };
  },
  data() {
    return {
      isLoading: true,
      eventId: this.$route.params,
      contents: "",
      activityDesc: "",
      title: "",
      eventImage: "",
    };
  },
  mounted() {
    this.activityGet();
  },
  methods: {
    activityGet() {
      this.$api
        .requestByPost("Activity/get", { id: this.eventId.eventDetails })
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

          this.contents = result.data.content;
          this.activityDesc = result.data.activity_desc;
          this.title = result.data.title;
          this.eventImage = result.data.image;

          this.isLoading = false;
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    back() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/eventDetail.scss";
@import "/assets/scss/mobile/eventDetail.scss";
</style>
