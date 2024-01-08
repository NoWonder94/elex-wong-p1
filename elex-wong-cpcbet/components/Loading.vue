<template>
  <div class="loading" style="display: block">
    <vue-element-loading
      background-color="rgba(44,44,44,0.9)"
      spinner="bar-fade-scale"
      color="#DAAC54"
      :is-full-screen="isFullscreen"
      :active="isLoading ? isLoading : false"
    />
  </div>
</template>
<script>
export default {
  name: "Loading",
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
    isFullscreen: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    isLoading: function () {},
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/loading.scss";
@import "/assets/scss/mobile/loading.scss";
</style>
