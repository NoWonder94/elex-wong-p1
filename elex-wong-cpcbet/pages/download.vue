<template>
  <div class="download">
    <div class="download-section">
      <div class="download-left">
        <div class="welive">
          {{ $t("download.supreme_gaming") }}
        </div>
        <div class="title">
          {{ $t("download.title") }}
        </div>
        <div class="description web">
          {{ $t("download.description") }}
        </div>
        <div class="download-row web">
          <!-- <div class="download-box google">
            {{ $t('download.googleplay') }}
          </div>
          <div class="download-box">
            {{ $t('download.apple') }}
          </div> -->
          <div class="download-box" @click="downloadAPk()">
            {{ $t("download.apk") }}
          </div>
        </div>
      </div>
      <div class="download-right">
        <img src="../assets/img/phone.png" />
      </div>
      <div class="mobile-download mobile" @click="downloadAPk()">
        {{ $t("download.download") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Download",
  // head() {
  //   return {
  //     title: this.$t("download.metaTitle"),
  //   };
  // },
  methods: {
    downloadAPk() {
      window.open("https://welive-app.oss-accelerate.aliyuncs.com/app.apk");
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/download.scss";
@import "/assets/scss/mobile/download.scss";
</style>
