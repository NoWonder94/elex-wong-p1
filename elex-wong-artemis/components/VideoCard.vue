<template>
  <div class="video-card-container card-shadow p-3 mx-3">
    <div class="pb-2"><video-player :src="video_clip" /></div>
    <div class="title fw-bold">
      {{ title }}
    </div>
    <div class="desc">
      {{ desc }}
    </div>
  </div>
</template>

<script>
import VideoPlayer from "nuxt-video-player";
require("nuxt-video-player/src/assets/css/main.css");
export default {
  name: "VideoCard",
  props: ["title", "desc", "video_clip"],
  components: {
    VideoPlayer,
  },
};
</script>

<style lang="scss">
@import "../assets/scss/base.scss";

.video-card-container {
  color: $fontColor;
  .v-player,
  .v-player__iframe {
    border-radius: 0px;
  }
  .desc {
    opacity: 0.5;
  }
}
</style>
