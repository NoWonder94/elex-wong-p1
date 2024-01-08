<template>
  <div id="boleBitGameInfo" class="boleBitGameInfo" v-if="gameDetails != null">
    <div class="left-info">
      <div class="info-heading web" @click="close">
        <img
          class="info-heading-backIcon"
          src="../../assets/img/bolebit/left.png"
        />
        <p class="info-heading-backLabel">{{ $t(`boleBitGame.back`) }}</p>
      </div>
      <!-- swiper -->
      <div v-swiper:mySwiper2="swiperOption" class="swiper">
        <div class="swiper-wrapper info-demo-images">
          <div
            class="swiper-slide"
            v-for="(item, index) in gameDetails.demo_images"
            :key="index"
          >
            <img :src="item" width="450" />
          </div>
        </div>
        <div class="swiper-pagination my-pagination" slot="pagination"></div>
      </div>
      <!-- swiper -->
      <div class="brief-info">
        <div class="brief-game-name">
          {{ gameDetails.name }}
        </div>
        <div class="brief-content" v-html="gameDetails.desc"></div>
      </div>
      <div class="info-content">
        <div class="copy-embed-button mobile">
          {{ $t(`boleBitGame.copy_embed_code`) }}
        </div>
        <p class="info-content-title">{{ $t(`boleBitGame.game_info`) }}</p>
        <div class="info-content-about">
          <div class="info-content-about-block">
            <p>{{ $t(`boleBitGame.game_name`) }}</p>
            <p>{{ gameDetails.name }}</p>
          </div>
          <div class="info-content-about-block">
            <p>{{ $t(`boleBitGame.game_type`) }}</p>
            <p>{{ gameDetails.cate }}</p>
          </div>
          <div
            class="info-content-about-block"
            v-if="
              gameDetails.reels &&
              2 < gameDetails.reels < 7 &&
              gameDetails.type == 'slot'
            "
          >
            <p>{{ $t(`boleBitGame.reels`) }}</p>
            <p>{{ $t(`boleBitGame.reels_${gameDetails.reels}`) }}</p>
          </div>
          <div class="info-content-about-block" v-if="gameDetails.lines">
            <p>{{ $t(`boleBitGame.lines`) }}</p>
            <p>{{ gameDetails.lines }}</p>
          </div>
          <div class="info-content-about-block" v-if="gameDetails.rtp">
            <p>{{ $t(`boleBitGame.rtp`) }}</p>
            <p>{{ gameDetails.rtp }}</p>
          </div>
          <div class="info-content-about-block" v-if="gameDetails.max_bet">
            <p>{{ $t(`boleBitGame.max_win`) }}</p>
            <p>{{ gameDetails.max_bet }}x bet</p>
          </div>
          <div class="info-content-about-block">
            <p>{{ $t(`boleBitGame.language`) }}</p>
            <div class="info-content-about-block-language">
              <img
                v-for="item in gameDetails.support_languages"
                :key="item"
                :src="require(`@/assets/img/bolebit/languages/${item}.png`)"
              />
            </div>
          </div>
          <div
            class="game-features-about mobile"
            v-if="gameDetails.gamble_mode || gameDetails.free_game == 1"
          >
            <p>{{ $t(`boleBitGame.game_features`) }}</p>
            <div class="game-features-about-content">
              <div
                class="game-features-about-block"
                v-if="gameDetails.free_game == 1"
              >
                {{ $t(`boleBitGame.gamble_mode.free_game`) }}
              </div>
              <div v-if="gameDetails.gamble_mode.length != 0">
                <div
                  class="game-features-about-block"
                  v-for="(gameFeature, index) in gameDetails.gamble_mode"
                  :key="index"
                >
                  {{ $t(`boleBitGame.gamble_mode.${gameFeature}`) }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="info-content-try-button"
            @click="getTryNowDemo(gameDetails.game_id)"
          >
            {{ $t(`boleBitGame.tryNow`) }}
          </div>
          <div class="info-content-back-button mobile" @click="close">
            {{ $t(`boleBitGame.back`) }}
          </div>
        </div>
      </div>
    </div>
    <div class="right-features web">
      <div class="copy-embed-button">
        {{ $t(`boleBitGame.copy_embed_code`) }}
      </div>
      <div class="game-features">
        <div
          class="game-features-title"
          v-if="gameDetails.gamble_mode != null || gameDetails.free_game == 1"
        >
          {{ $t(`boleBitGame.game_features`) }}
        </div>
        <div class="game-features-info">
          <div
            class="game-features-info-block"
            v-if="gameDetails.free_game == 1"
          >
            {{ $t(`boleBitGame.gamble_mode.free_game`) }}
          </div>
          <div v-if="gameDetails.gamble_mode != null">
            <div
              class="game-features-info-block"
              v-for="(gameFeature, index) in gameDetails.gamble_mode"
              :key="index"
            >
              {{ $t(`boleBitGame.gamble_mode.${gameFeature}`) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoleBitGameInfo",
  data() {
    return {
      /* swiper */
      swiperOption: {
        noNextTick: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        slidesPerView: 2,
        spaceBetween: 10,
        breakpoints: {
          700: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },
    };
  },
  props: {
    gameDetails: {
      type: Object,
      default: {},
    },
    lang: String,
  },

  methods: {
    close() {
      this.$emit("close", false);
    },

    getTryNowDemo(demoGameId) {
      var gameUrl =
        "https://res.slo888.com/slo-pub/index.html?env=demo&plat=gw&gid=";
      window.open(`${gameUrl}${demoGameId}&lang=${this.lang}`);
    },
    async copyEmbedCode(demoUrl) {
      const embedCode = `<iframe src="${demoUrl}&lang=${this.lang}" width="1280" height="720"></iframe>`;
      // try {
      //   /* copy code to clipboard */
      //   await navigator.clipboard.writeText(embedCode);
      //   /* show success after copied */
      //   this.$message.success(this.$t("boleBitGame.copy_successful"));
      // } catch (error) {
      //   this.$message.error(this.$t("boleBitGame.cannot_copy"));
      // }
    },
  },
  watch: {
    gameDetails: function (val) {
      if (window.screen.width < 700) {
        document.getElementById("boleBitGameInfo").scrollTo(0, 0);
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "/assets/scss/web/bolebit/boleBitGameInfo.scss";
@import "/assets/scss/mobile/bolebit/boleBitGameInfo.scss";
</style>
