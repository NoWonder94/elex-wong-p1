<template>
  <div class="boleBitGameList">
    <div class="banner-list" v-show="showAfterRender">
      <div v-swiper:mySwiper3="bannerSwiperOption" class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in bannerList" :key="item.id">
            <img :src="item.img" @click="openUrl(item.link)" class="web" />
            <img :src="item.m_img" @click="openUrl(item.link)" class="mobile" />
          </div>
        </div>
        <div class="swiper-pagination my-pagination" slot="pagination"></div>
      </div>
      <div id="bannerPrevBtn" class="swiper-button-prev">
        <img src="../../assets/img/bolebit/left.png" class="swiperNav" />
      </div>
      <div id="bannerNextBtn" class="swiper-button-next">
        <img src="../../assets/img/bolebit/right.png" class="swiperNav" />
      </div>
    </div>

    <div class="showboleBitGameListContent">
      <div
        class="boleBitGameList-game-actions"
        v-show="gameType == 'slot' || gameType == 'all'"
      >
        <div class="boleBitGameList-wrap">
          <img src="../../assets/img/bolebit/filter.png" class="filter-icon" />
          <img src="../../assets/img/bolebit/drop_down.png" class="icon-down" />
          <select
            id="boleBitGameList-select"
            class="boleBitGameList-select"
            @change="handleFilter()"
          >
            <option value="" disabled selected hidden>
              {{ $t("boleBitGame.filter") }}
            </option>
            <option value="none">
              {{ $t("boleBitGame.gamble_mode.none") }}
            </option>
            <option
              value="free_spin_onoff"
              v-if="gameType == 'slot' || gameType == 'all'"
            >
              {{ $t("boleBitGame.gamble_mode.free_spin_onoff") }}
            </option>
            <option
              value="buy_free_spin"
              v-if="gameType == 'slot' || gameType == 'all'"
            >
              {{ $t("boleBitGame.gamble_mode.buy_free_spin") }}
            </option>
          </select>
        </div>
        <!-- <el-dropdown trigger="click" @command="handleFilter">
            <div>
              <div class="header-filter">
                {{ filter }}
              </div>
              <div class="icon-down">
                <img src="../../assets/img/bolebit/drop_down.png" />
              </div>
            </div>
            <el-dropdown-menu id="boleBitGameList-dropdown-menu">
              <el-dropdown-item command="none">
                {{ $t("boleBitGame.gamble_mode.none") }}
              </el-dropdown-item>
              <el-dropdown-item
                command="free_spin_onoff"
                v-if="gameType == 'slot' || gameType == 'all'"
              >
                {{ $t("boleBitGame.gamble_mode.free_spin_onoff") }}
              </el-dropdown-item>
              <el-dropdown-item
                command="buy_free_spin"
                v-if="gameType == 'slot' || gameType == 'all'"
              >
                {{ $t("boleBitGame.gamble_mode.buy_free_spin") }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
      </div>

      <div class="game-list">
        <div class="game-list-title">
          {{ $t(`boleBitGame.allGame`) }}
          <span v-show="gameLists.length != 0"
            >&#40;{{ gameLists.length }}&#41;</span
          >
        </div>
        <div class="game-list-group">
          <div
            class="game-item"
            v-for="(gameList, index) in gameLists"
            :key="index"
          >
            <div v-if="gameList != null">
              <!-- Lottie -->
              <div class="game-item-img">
                <div class="game-cover" @click="openInfo(gameList.id)"></div>
                <!-- <lottie-animation
                  :path="`${gameList.front_cover}`"
                  :loop="true"
                  :autoPlay="true"
                  class="game-item-front-cover"
                /> -->
                <!-- <iframe
                  :src="gameList.front_cover"
                  class="game-item-front-cover"
                  scrolling="no"
                  frameborder="0"
                >
                </iframe> -->
                <div
                  v-if="isMobile()"
                  style="
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    <!-- padding-top: 117%; -->
                  "
                >
                  <!-- <iframe
                    style="position:absolute; top:0; left:0; right: 0, bottom: 0; height: 100%; width:100%;border:none;"
                    loading="lazy"
                    scrolling="no"
                    :src="`https://bolebit.bolegaming.com${gameList.mobile_cover_image}`"
                    frameborder="0"
                  ></iframe> -->
                  <img
                    :src="`https://bolebit.bolegaming.com${gameList.mobile_cover_image}`"
                    alt=""
                  />
                </div>
                <!-- <iframe v-if="isMobile()" class="game-item-front-cover" loading="lazy" scrolling="no" height="252px"
                  width="215px" :src="gameList.front_cover" frameborder="0"></iframe> -->
                <!-- <iframe
                  v-else
                  class="game-item-front-cover"
                  loading="lazy"
                  scrolling="no"
                  height="252px"
                  width="215px"
                  :src="`https://bolebit.bolegaming.com${gameList.cover_image}`"
                  frameborder="0"
                ></iframe> -->
                <img
                  v-else
                  class="game-item-front-cover"
                  :src="`https://bolebit.bolegaming.com${gameList.mobile_cover_image}`"
                  alt=""
                />
              </div>
              <!-- Lottie -->
              <div :class="['game-name', lang == 'japanese' ? 'japanese' : '']">
                {{ gameList.name }}
              </div>
              <div class="game-type">
                {{ gameList.cate }}
              </div>
              <div
                :class="['game-button-group', lang == 'korean' ? 'korean' : '']"
              >
                <div
                  class="try-now game-button"
                  @click="playDemo(gameList.game_id)"
                >
                  {{ $t(`boleBitGame.tryNow`) }}
                </div>
                <div class="details game-button" @click="openInfo(gameList.id)">
                  {{ $t(`boleBitGame.details`) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* lottie */
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue"; // import lottie-vuejs

export default {
  name: "BoleBitGameList",
  components: {
    LottieAnimation,
  },
  props: {
    gameLists: {
      type: Array,
      default: [],
    },
    gameType: String,
    gambleMode: String,
    lang: String,
  },
  data() {
    return {
      showAfterRender: false,
      bannerSwiperOption: {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        noNextTick: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: "#bannerNextBtn",
          prevEl: "#bannerPrevBtn",
        },
        slidesPerView: 1,
        breakpointsInverse: true,
      },
      bannerSwiperOption_m: {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        noNextTick: false,
        pagination: {
          el: ".swiper-pagination_m",
          clickable: true,
        },
        navigation: {
          nextEl: "#bannerNextBtn_m",
          prevEl: "#bannerPrevBtn_m",
        },
        slidesPerView: 1,
        breakpointsInverse: true,
      },
      bannerList: [],
    };
  },
  mounted() {
    this.getBanner();
    setTimeout(() => (this.showAfterRender = true), 50);
  },
  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    openInfo(id) {
      this.$emit("isShow", true, id);
    },
    getBanner() {
      if (window.innerWidth > 700) {
      } else {
      }
      this.$api
        .request(`https://bolebit.bolegaming.com/api/App/bannerList`)
        .then((result) => {
          if (result.status) {
            this.bannerList = result.data;
          }
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error"));
        });
    },
    openUrl(link) {
      if (link != "") {
        window.open(link);
      }
    },
    playDemo(demoGameId) {
      var gameUrl =
        "https://res.slo888.com/slo-pub/index.html?env=demo&plat=gw&gid=";
      if (demoGameId) {
        window.open(`${gameUrl}${demoGameId}&lang=${this.lang}`);
      }
    },
    handleFilter() {
      var select = document.getElementById("boleBitGameList-select");
      var value = select.options[select.selectedIndex].value.toString();

      this.$emit("handleFilter", value);
    },
  },
  watch: {
    gambleMode: function (val) {
      var select = document.getElementById("boleBitGameList-select");
      if (val == "none") {
        select.selectedIndex = null;
      }
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/web/bolebit/boleBitGameList.scss";
@import "/assets/scss/mobile/bolebit/boleBitGameList.scss";
</style>
