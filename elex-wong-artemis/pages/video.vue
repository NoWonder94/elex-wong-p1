<template>
  <div class="video-container">
    <HeaderTitle :icon="icon" :title="title" />
    <VideoCard
      :title="$t('video.content_title')"
      :desc="$t('video.content_desc')"
      :video_clip="require('../assets/video/boss_sci.mp4')"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.$t("video.title"),
      icon: require("../assets/img/video.svg"),
      dataList: [],
    };
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/video.scss";
</style>
