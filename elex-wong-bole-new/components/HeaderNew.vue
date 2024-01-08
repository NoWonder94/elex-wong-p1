<template>
  <div class="headerNew">
    <div class="header-content-new">
      <!-- <div class="header-menu-bar mobile" @click="handleMobileMenu()">
        <img src="../assets/img/bolebit/cs_icon.png" alt="">
      </div> -->
      <div class="header-logo">
        <nuxt-link :to="localePath('/boleBitNew')">
          <img src="../assets/img/bolebit/bole_logo.png" />
        </nuxt-link>
      </div>
      <div class="header-actions">
        <no-ssr>
          <div class="header-lang-switcher">
            <el-dropdown trigger="click" @command="handleLang">
              <div>
                <img
                  src="../assets/img/bolebit/language.png"
                  alt=""
                  class="lang-icon"
                />
                <div class="header-lang">
                  {{ lang }}
                </div>
                <div class="icon-down">
                  <img src="../assets/img/bolebit/drop_down.png" />
                </div>
              </div>
              <el-dropdown-menu v-if="langCodes.length > 0">
                <template v-for="item in langCodes">
                  <el-dropdown-item
                    v-if="item.code != 'vi-VN'"
                    :key="item.key"
                    :command="item.code"
                  >
                    {{ item.language }}
                  </el-dropdown-item>
                </template>
                <!-- <el-dropdown-item command="chinese">
                  {{ $t("langList.chinese") }}
                </el-dropdown-item>
                <el-dropdown-item command="english">
                  {{ $t("langList.english") }}
                </el-dropdown-item>
                <el-dropdown-item command="korean">
                  {{ $t("langList.korean") }}
                </el-dropdown-item>
                <el-dropdown-item command="thai">
                  {{ $t("langList.thai") }}
                </el-dropdown-item>
                <el-dropdown-item command="indonesian">
                  {{ $t("langList.indonesian") }}
                </el-dropdown-item>
                <el-dropdown-item command="japanese">
                  {{ $t("langList.japanese") }}
                </el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderNew",
  data() {
    return {
      isShowMobileMenu: false,
      lang: "",
      langCodes: [],
    };
  },
  async mounted() {
    await this.getLangCode();
    var lang = localStorage.getItem("lang-boleBitnew");
    if (!lang) {
      lang = "zh-CN";
    }
    this.handleLang(lang);
    //解决el-dropdown rendering问题
    setTimeout(function () {
      $(".header-actions").css("display", "inline-block");
    }, 100);
  },
  methods: {
    handleLang(lang) {
      let curLang = this.langCodes.find((item) => item.code == lang);
      this.lang = curLang.language;
      let langkey = curLang.key;
      this.$emit("changeLang", langkey, lang);
      let temp = "chi";
      switch (lang) {
        case "zh-CN":
          temp = "chi";
          break;
        case "en-US":
          temp = "en";
          break;
        case "id-ID":
          temp = "indo";
          break;
        case "ja-JP":
          temp = "jpn";
          break;
        case "ko-KR":
          temp = "krn";
          break;
        case "th-TH":
          temp = "thai";
          break;
        case "zh-HK":
          temp = "chi";
          break;
        case "pt-BR":
          temp = "pt";
          break;
        default:
          break;
      }

      localStorage.setItem("lang-boleBitnew", lang);
      localStorage.setItem("langkey-boleBit", langkey);
      // if (temp == "ft") temp = "chi";
      this.$router.push(this.switchLocalePath(temp));
    },
    async getLangCode() {
      await this.$api
        .request("https://bolebit.bolegaming.com/api/App/languagesList")
        .then((result) => {
          if (result.status) this.langCodes = result.data;
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error"));
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/web/headerNew.scss";
@import "/assets/scss/mobile/headerNew.scss";
</style>
