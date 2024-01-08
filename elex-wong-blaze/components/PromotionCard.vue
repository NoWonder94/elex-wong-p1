<template>
  <div class="promotion-card">
    <div class="promotion-text">
      <img :src="img" alt="" />
    </div>
    <div class="promotion-text">
      <h1 class="title">{{ title }}</h1>
      <div class="promotion-desc-container">
        <div class="promotion-description" v-html="subtitle"></div>
        <div class="promotion-shadow"></div>
      </div>
      <button class="promotion-text-button" @click="click(id)">
        {{ $tt("read_more") }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Promotion-Card",
  props: ["img", "title", "subtitle", "id"],
  methods: {
    click(id) {
      this.$emit("event", id);
    },
  },
};
</script>
<style lang="scss" type="type/css">
@import "/assets/scss/web/promotion-card.scss";
@import "/assets/scss/mobile/promotion-card.scss";
</style>
