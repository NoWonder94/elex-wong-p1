<template>
  <div class="account-header">
    <div class="web">
      <div class="header-list">
        <div
          class="header-item"
          :class="item.url.includes(currentPath) ? 'selected' : ''"
          v-for="(item, index) in items"
          :key="index"
          @click="handleUrl(item.url)"
        >
          <div v-if="item.name == 'Documents'">
            {{ item.name }}
            <span class="number">0</span>
          </div>
          <div v-else>
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="mobile">
      <div class="mobile-header">
        <i class="el-icon-arrow-left" @click="back"></i>
        <div class="title">
          {{ title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountHeader",
  props: ["title"],
  data() {
    return {
      currentPath: "",
      items: [
        { name: this.$tt("profile"), url: "/account/accountInfo" },
        { name: this.$tt("documents"), url: "/documents/identificationProof" },
        { name: this.$tt("game_history"), url: "/gameHistory" },
        { name: this.$tt("transactions"), url: "/transactions/deposits" },
        { name: this.$tt("restrictions"), url: "/restrictions/suspension" },
        // {name: this.$tt("chat_ignores"), url: '/chatIgnores'},
        { name: this.$tt("preferences"), url: "/preferences" },
        // {name: this.$tt("api"), url: '/api'},
      ],
    };
  },
  mounted() {
    this.handlePath();
  },
  methods: {
    handlePath() {
      this.currentPath = this.$route.path.split("/")[2];
    },
    handleUrl(url) {
      window.newRouter("/profile" + url);
      this.handlePath();
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/web/accountHeader.scss";
@import "/assets/scss/mobile/accountHeader.scss";
</style>
