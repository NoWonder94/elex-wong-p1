<template>
  <div class="bolebitIndex">
    <div class="boleheading">
      <HeaderNew @changeLang="changeLang" />
    </div>
    <div class="bolebitIndexSection">
      <div class="left-bar web">
        <BoleBitSideMenu @handleFilter="getGameList" :lang="langKey" />
      </div>
      <div class="right-display">
        <!-- loading -->
        <div v-show="loading" class="boleBitIndexLoadingContent">
          <!-- <i class="el-icon-loading"></i> -->
          <lottie-animation :path="`bolebit/lottie/loading.json`" :loop="true" :autoPlay="true"
            class="game-item-front-cover" />
        </div>
        <!-- loading -->
        <BoleBitGameList
          @isShow="showGameInfo"
          @handleFilter="getGameByGamble"
          v-show="isShowGameList"
          :gameLists="gameLists"
          :gameType="gameType"
          :gambleMode="gambleMode"
          :lang="langCode"
        />
        <BoleBitGameInfo
          @close="showGameList"
          v-show="isShowGameInfo"
          :gameDetails="gameDetails"
          :lang="langCode"
        />
      </div>
    </div>
    <div class="bolefooter">
      <FooterNew @handleFilter="getGameList" :lang="langKey" />
    </div>
  </div>
</template>

<script>
/* lottie */
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue"; // import lottie-vuejs

import BoleBitGameList from "../../components/boleBit/boleBitGameList.vue";
import BoleBitGameInfo from "../../components/boleBit/boleBitGameInfo.vue";
import HeaderNew from "../../components/HeaderNew.vue";
import FooterNew from "../../components/FooterNew.vue";
export default {
  components: {
    BoleBitGameList,
    BoleBitGameInfo,
    HeaderNew,
    FooterNew,
    LottieAnimation,
  },
  head() {
    return {
      title: this.$t("navList.boleBit"),
      meta: [
        {
          name: "facebook-domain-verification",
          content: "cusq1hp0k0l11h0us56zab3v4ptrw0",
        },
      ],
      script: [
        {
          innerHTML: `!function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '279666914354953');
                  fbq('track', 'PageView');`,
          type: "text/javascript",
          charset: "utf-8",
        },
      ],
    };
  },
  data() {
    return {
      /* hide show components */
      isShowGameList: true,
      isShowGameInfo: false,

      gameLists: [],
      tempLists: [],
      masterGameLists: [],
      gameDetails: {},

      /* game id from list */
      gameInfoId: 0,
      gambleMode: "none",
      gameType: "all",

      /* loading */
      loading: true,

      langKey: "ch",
      langCode: "zh-CN",
    };
  },

  mounted() {
    // this.getGameList();
    this.langKey = localStorage.getItem("langkey-boleBit");
    this.getGameList(0, "all");
  },

  methods: {
    showGameList() {
      this.isShowGameInfo = false;
      this.isShowGameList = true;
    },
    getGameList(category, type) {
      this.loading = true;
      this.showGameList();
      let lang = this.langKey;
      let url = `https://bolebit.bolegaming.com/api/App/listGame?lang=${lang}`;
      this.gameType = type;
      if (category != 0) {
        url += `&cate_id=${category}`;
      }
      this.gambleMode = "none";
      this.$api
        .request(url)
        .then((result) => {
          if (result.status) {
            let list = result.data;
            this.gameLists = list;
            this.masterGameLists = list;
            this.tempLists = list;
          }
          this.loading = false;
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error"));
          this.loading = false;
        });
    },

    showGameInfo(bool, id) {
      this.isShowGameInfo = bool;
      this.isShowGameList = false;
      // this.getGameInfo(id);
      this.getGameInfo(id);
    },

    getGameInfo(gameDetailsId) {
      this.gameDetails = this.gameLists.find(
        (element) => element.id == gameDetailsId
      );
    },

    getGameByGamble(type) {
      this.gameLists = [];
      this.gambleMode = type;
      this.loading = true;

      setTimeout(() => {
        if (type != "none") {
          this.gameLists = this.tempLists.filter(
            (element) =>
              element.gamble_mode != null && element.gamble_mode.includes(type)
          );
        } else {
          this.gameLists = this.newtempList;
        }
      }, 500);

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },

    changeLang(langKey, lang) {
      this.langKey = langKey;
      this.langCode = lang;
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/web/bolebit/boleBitGame.scss";
@import "/assets/scss/mobile/bolebit/boleBitGame.scss";
</style>
