<template>
  <div class="index">
    <div class="banner before-login-banner" v-if="!isLogin">
      <div v-for="(item, index) in beforeLoginBanner" :key="index">
        <img :src="item.resource" :data-url="item.jumpUrl" />
      </div>
      <!-- <div class="banner-text">
            <div class="banner-text-title">
              €200 Welcome Package 💸
            </div>
            <div class="banner-text-desc">
              Receive a bonus up to €200 & 40 free rounds.
            </div>
            <div class="banner-text-button" @click="handleModal('register')">
              Register
            </div>
          </div> -->
    </div>
    <div class="banner after-login-banner" v-else>
      <div v-swiper:mySwiper="bannerSwiperOption" class="swiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in bannerList"
            :key="index"
          >
            <div class="" style="position: relative">
              <img :src="item.resource" />
              <div
                class=""
                style="
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  cursor: pointer;
                "
                v-if="item.jumpUrl != null || item.jumpUrl != ''"
                :data-url="item.jumpUrl"
              ></div>
            </div>
            <!-- <img class="web" :src="item.webImg"> -->
            <!-- <img class="mobile" :src="item.mobileImg"> -->
            <div class="banner-text">
              <!-- <div class="banner-text-title">
                    {{ item.title }}
                  </div>
                  <div class="banner-text-desc">
                    {{ item.desc }}
                  </div>
                  <div class="banner-text-button" @click="handleUrl(item.url)">
                    {{ item.button }}
                  </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination my-pagination" slot="pagination"></div>
    </div>
    <div class="search" id="searchBar" @click.prevent="handleSearch">
      <Search :click="searchClicked" />
    </div>
    <div class="category">
      <div
        class="category-item"
        :class="category_type == item.id ? 'selected' : ''"
        v-for="item in category"
        :key="item.id"
        @click="getCategory(item.id)"
      >
        <img :src="category_type == item.id ? item.selectedImg : item.img" />
        <div class="category-item-label">
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="game-content" v-loading="isLoading">
      <div class="lobby" v-if="category_type == 1">
        <!-- <div class="game-row">
              <div class="game-title-row">
                <div class="game-title">
                  Original Games
                </div>
                <div class="game-view-all" @click="handleUrl('/games/category/Originals')">
                  View All <i class="el-icon-arrow-right"></i>
                </div>
              </div>
              <div class="games-list">
                <div class="games-item" v-for="(item, index) in original_games" :key="index">
                  <img class="web" :src="item.img">
                  <img class="mobile" :src="item.mobileImg">
                  <img class="web" :src="item.img" @click="handleUrl(item.url)">
                  <img class="mobile" :src="item.mobileImg" @click="handleUrl(item.url)">
                </div>
              </div>
            </div> -->
        <div>
          <GameSwiper
            v-if="hallGame.length > 0"
            :list="hallGame"
            leftButton="prevBtn1"
            rightButton="nextBtn1"
            :title="$tt('hall_game')"
            url="category/hallGame"
            type="game"
          />
          <GameSwiper
            v-if="topGame.length > 0"
            :list="topGame"
            leftButton="prevBtn2"
            rightButton="nextBtn2"
            :title="$tt('top_game')"
            url="category/topGame"
            type="game"
          />
          <GameSwiper
            v-if="newGame.length > 0"
            :list="newGame"
            leftButton="prevBtn3"
            rightButton="nextBtn3"
            :title="$tt('new_game')"
            url="category/newGame"
            type="game"
          />
          <GameSwiper
            v-if="hotGame.length > 0"
            :list="hotGame"
            leftButton="prevBtn4"
            rightButton="nextBtn4"
            :title="$tt('hot_game')"
            url="category/hotGame"
            type="game"
          />
          <GameSwiper
            v-if="winGame.length > 0"
            :list="winGame"
            leftButton="prevBtn5"
            rightButton="nextBtn5"
            :title="$tt('win_game')"
            url="category/winGame"
            type="game"
          />
          <ProviderSwiper
            v-if="lobbyProviderList.length > 0"
            :list="lobbyProviderList"
            leftButton="prevBtn6"
            rightButton="nextBtn6"
            :title="$tt('game_providers')"
            url="providers"
          />
        </div>
      </div>
      <div class="slot" v-if="category_type == 2">
        <div v-if="totalGame > 0">
          <div class="games-list">
            <div
              class="games-item"
              v-for="(item, index) in gameList"
              :key="index"
            >
              <GameImage
                :img="item.imgPlay"
                :title="item.gameName"
                :desc="item.gameChannelName"
                :playId="item.playId"
                :isDemo="item.isDemo"
                @login="handleModal('login')"
                @deposit="handleModal('deposit')"
              />
            </div>
          </div>
          <div class="view-all" @click="handleUrl('/games/category/slots')">
            {{ $tt("view_all") }} {{ totalGame }} {{ $tt("games") }}
          </div>
        </div>
        <div v-else>{{ $tt("no_games_found") }}</div>
        <ProviderSwiper
          v-if="providerList.length > 0"
          :list="providerList"
          leftButton="prevBtn12"
          rightButton="nextBtn12"
          :title="$tt('game_providers')"
          url="providers"
        />
      </div>
      <div class="live-casino" v-if="category_type == 3">
        <div v-if="totalGame > 0">
          <div class="games-list">
            <div
              class="games-item"
              v-for="(item, index) in gameList"
              :key="index"
            >
              <GameImage
                :img="item.imgPlay"
                :title="item.gameName"
                :desc="item.gameChannelName"
                :playId="item.playId"
                :isDemo="item.isDemo"
                @login="handleModal('login')"
                @deposit="handleModal('deposit')"
              />
            </div>
          </div>
          <div
            class="view-all"
            @click="handleUrl('/games/category/liveCasino')"
          >
            {{ $tt("view_all") }} {{ totalGame }} {{ $tt("games") }}
          </div>
        </div>
        <div v-else>{{ $tt("no_games_found") }}</div>
        <ProviderSwiper
          v-if="providerList.length > 0"
          :list="providerList"
          leftButton="prevBtn13"
          rightButton="nextBtn13"
          :title="$tt('game_providers')"
          url="providers"
        />
      </div>
      <div class="game-show" v-if="category_type == 4">
        <div v-if="totalGame > 0">
          <div class="games-list">
            <div
              class="games-item"
              v-for="(item, index) in gameList"
              :key="index"
            >
              <GameImage
                :img="item.imgPlay"
                :title="item.gameName"
                :desc="item.gameChannelName"
                :playId="item.playId"
                :isDemo="item.isDemo"
                @login="handleModal('login')"
                @deposit="handleModal('deposit')"
              />
            </div>
          </div>
          <div class="view-all" @click="handleUrl('/games/category/gameShows')">
            {{ $tt("view_all") }} {{ totalGame }} {{ $tt("games") }}
          </div>
        </div>
        <div v-else>{{ $tt("no_games_found") }}</div>
        <ProviderSwiper
          v-if="providerList.length > 0"
          :list="providerList"
          leftButton="prevBtn14"
          rightButton="nextBtn14"
          :title="$tt('game_providers')"
          url="providers"
        />
      </div>
      <div class="blaze" v-if="category_type == 5">
        <div v-if="totalGame > 0">
          <div class="games-list">
            <div
              class="games-item"
              v-for="(item, index) in gameList"
              :key="index"
            >
              <GameImage
                :img="item.imgPlay"
                :title="item.gameName"
                :desc="item.gameChannelName"
                :playId="item.playId"
                :isDemo="item.isDemo"
                @login="handleModal('login')"
                @deposit="handleModal('deposit')"
              />
            </div>
          </div>
          <div class="view-all" @click="handleUrl('/games/category/originals')">
            {{ $tt("view_all") }} {{ totalGame }} {{ $tt("games") }}
          </div>
        </div>
        <div v-else>{{ $tt("no_games_found") }}</div>
        <ProviderSwiper
          v-if="providerList.length > 0"
          :list="providerList"
          leftButton="prevBtn15"
          rightButton="nextBtn15"
          :title="$tt('game_providers')"
          url="providers"
        />
      </div>
    </div>
    <ShowModal v-if="showModal" :type="type" @close="showModal = false" />
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Index",
  data() {
    return {
      isLoading: false,
      showDepositModal: false,
      searchClicked: false,
      category_type: 1,
      category: [
        {
          id: 1,
          img: require("../assets/img/spinner.svg"),
          selectedImg: require("../assets/img/spinner_selected.svg"),
          label: this.$tt("lobby"),
          type: 1,
        },
        {
          id: 2,
          img: require("../assets/img/slot.svg"),
          selectedImg: require("../assets/img/slot_selected.svg"),
          label: this.$tt("featured_slots"),
          type: 1,
        },
        {
          id: 3,
          img: require("../assets/img/casino.svg"),
          selectedImg: require("../assets/img/casino_selected.svg"),
          label: this.$tt("live_casino"),
          type: 6,
        },
        {
          id: 4,
          img: require("../assets/img/game show.svg"),
          selectedImg: require("../assets/img/game show_selected.svg"),
          label: this.$tt("game_shows"),
          type: 5,
        },
        {
          id: 5,
          img: require("../assets/img/blaze.svg"),
          selectedImg: require("../assets/img/blaze_selected.svg"),
          label: this.$tt("blaze_originals"),
          type: 0,
        },
      ],
      original_games: [
        {
          img: require("../assets/img/crash.png"),
          mobileImg: require("../assets/img/mobile/crash.png"),
          url: "/games/crash",
        },
        {
          img: require("../assets/img/double.png"),
          mobileImg: require("../assets/img/mobile/double.png"),
          url: "/games/double",
        },
        {
          img: require("../assets/img/mines.png"),
          mobileImg: require("../assets/img/mobile/mines.png"),
          url: "/games/mines",
        },
        {
          img: require("../assets/img/dice.png"),
          mobileImg: require("../assets/img/mobile/dice.png"),
          url: "/games/dice",
        },
      ],
      showModal: false,
      type: "",
      bannerSwiperOption: {
        loop: true,
        autoplay: {
          delay: 6000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        slidesPerView: 1,
        breakpointsInverse: true,
        breakpoints: {
          900: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
      },
      beforeLoginBanner: [],
      bannerList: [],
      hallGame: [],
      hotGame: [],
      topGame: [],
      newGame: [],
      winGame: [],
      providerList: [],
      gameList: [],
      totalGame: 0,
      type: 1,
      lobbyProviderList: [],
    };
  },
  mounted() {
    document.addEventListener("click", this.closeSearch);
    document.addEventListener("click", this.handleBanner);
    this.getHall();
    this.getAllProviderList();
    this.getAllGameList();
  },
  beforeDestroy() {
    document.addEventListener("click", this.closeSearch);
    document.addEventListener("click", this.handleBanner);
  },
  methods: {
    getHall() {
      this.isLoading = true;

      this.$api
        .requestByPost("/hall/v2/playHall/getByHallId")
        .then((result) => {
          const { code, data, msg } = result;
          this.isLoading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }
          const {
            hallGame,
            hotGame,
            topGame,
            nowGame,
            winGame,
            advertising,
            originalGame,
          } = data;
          this.hallGame = hallGame;
          this.hotGame = hotGame;
          this.$store.dispatch("setOriginalGames", originalGame);
          this.topGame = topGame;
          this.newGame = nowGame;
          this.winGame = winGame;
          this.bannerList = advertising;
          this.beforeLoginBanner.push(this.bannerList[0], this.bannerList[1]);
        })
        .catch((error) => {
          // this.$notify({
          //   title: "Warning",
          //   message: error,
          //   type: "warning",
          //   duration: 2000,
          // });
        });
    },
    getProvider() {
      this.isLoading = true;

      // 0: 自研游戏 1: slots 5:桌面游戏 6:视讯真人 10:体育
      this.$api
        .requestByPost("/hall/v2/playHall/getPlayBaseGameChannel", {
          gameType: this.type,
        })
        .then((result) => {
          const { code, data, msg } = result;
          this.isLoading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          this.providerList = data;
        })
        .catch((error) => {
          // this.$notify({
          //   title: "Warning",
          //   message: error,
          //   type: "warning",
          //   duration: 2000,
          // });
        });
    },
    getAllGameList() {
      this.isLoading = true;

      this.$api
        .requestByPost("/hall/v2/playHall/getAllGameList", {
          gameType: this.type,
        })
        .then((result) => {
          const { code, data, msg } = result;
          this.isLoading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          this.gameList = data.hallGame.slice(0, 18);
          this.totalGame = data.hallGame.length;
        })
        .catch((error) => {
          // this.$notify({
          //   title: "Warning",
          //   message: error,
          //   type: "warning",
          //   duration: 2000,
          // });
        });
    },
    getAllProviderList() {
      this.$api
        .requestByPost("/hall/v2/playHall/getManufacturerGameOverview")
        .then((result) => {
          const { code, data, msg } = result;
          this.isLoading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          this.lobbyProviderList = data;
        })
        .catch((error) => {
          // this.$notify({
          //   title: "Warning",
          //   message: error,
          //   type: "warning",
          //   duration: 2000,
          // });
        });
    },
    getCategory(id) {
      this.category_type = id;
      this.type = this.category[id - 1].type;
      this.getProvider();
      this.getAllGameList();
    },
    handleUrl(url) {
      if (url == "deposit") {
        this.handleModal(url);
      } else {
        window.newRouter(url);
      }
    },
    handleModal(type) {
      this.type = type;
      this.showModal = true;
    },
    handleSearch() {
      if (this.searchClicked == false) {
        this.searchClicked = true;
      }
    },
    closeSearch(e) {
      var target = document.getElementById("searchBar");
      if (target != null) {
        if (!target.contains(e.target)) {
          this.searchClicked = false;
        }
      }
    },
    handleBanner(e) {
      if (
        e.target.dataset.url != undefined &&
        e.target.dataset.url != "" &&
        e.target.dataset.url != null
      ) {
        if (e.target.dataset.url.includes("http")) {
          window.location.href = e.target.dataset.url;
          return;
        }

        window.newRouter(e.target.dataset.url);
      }
    },
  },
  computed: {
    ...mapState(["isLogin"]),
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/web/index.scss";
@import "/assets/scss/mobile/index.scss";
</style>
