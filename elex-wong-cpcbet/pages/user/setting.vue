<template>
  <div class="setting">
    <div class="back-title title">
      <i class="el-icon-back mobile" @click="handleRoute('profile')"></i>
      {{ $t("setting.title") }}
    </div>
    <hr class="web">
    <div class="setting-section">
      <div class="setting-languages">
        <div class="language-lable">
          {{ $t("setting.language") }}
        </div>
        <el-select
          v-model="language"
          @change="onLocaleChange"
          :placeholder="$t('setting.selectLanguage')"
        >
          <el-option
            v-for="(item, index) in langList"
            :key="index"
            :value="item.code"
            :label="item.name"
            >{{ item.name }}
          </el-option>
        </el-select>
      </div>
      <div class="setting-languages">
        <div class="language-lable">
          {{ $t("setting.password") }}
        </div>
        <div class="setting-button" @click="onChangePwdClick">
          {{ $t("setting.change") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "setting",
  // head() {
  //   return {
  //     title: this.$t("setting.title"),
  //   }
  // },
  data() {
    return {
      language: "",
    };
  },
  computed: {
    ...mapState(["langList"]),
  },
  mounted() {
    this.initConfig();
  },
  methods: {
    onChangePwdClick() {
      this.$router.push({ path: "/user/changepwd" });
    },
    initConfig() {
      var selected_language = localStorage.getItem("selected_language");
      this.language = selected_language;
    },
    onLocaleChange() {
      this.$store.dispatch("updateLanguage", this.language);
    },
    handleRoute(url) {
      this.$router.push({path: '/user/' + url});
    }
  },
};
</script>

<style lang="scss" type="text/css">
@import "assets/scss/mobile/setting.scss";
@import "assets/scss/pc/setting.scss";
</style>
