<template>
  <div class="rules">
    <div class="mobile-header mobile">
      <div @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="title">{{ $tt("fairness") }}</div>
    </div>
    <div class="rules-content">
      <div
        v-for="(list, index) in rulesList"
        :key="index"
        class="rules-row mobile"
      >
        <div class="text" @click="handleUrl(list.url)">
          {{ list.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RulesMenu",
  data() {
    return {
      rulesList: [
        {
          name: "CRASH",
          url: "/crash",
        },
        {
          name: "DOUBLE",
          url: "/Double",
        },
      ],
    };
  },
  methods: {
    handleUrl(url) {
      window.newRouter("/rules" + url);
    },
    onResize() {
      this.width = window.innerWidth;
      if (this.width > 1200) {
        this.$router.replace(this.localePath("/rules/crash"));
      }
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  watch: {
    $route(newValue, oldValue) {
      this.onResize();
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/rulesMenu.scss";
@import "/assets/scss/mobile/rulesMenu.scss";
</style>
