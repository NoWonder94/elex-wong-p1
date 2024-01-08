<template>
  <div class="index">
    <div>
      <div class="index-banner">
        <el-carousel :interval="5000" arrow="always" trigger="click">
          <el-carousel-item v-for="(banner, index) in bannerList" :key="index">
            <img
              :src="banner.image"
              alt=""
              @click="
                banner.onclick ? banner.onclick() : routeToEventPage(banner.id)
              "
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="notice-container">
        <transition name="fade">
          <div v-if="currentNotice" class="marquee">
            <p>{{ currentNotice }}</p>
          </div>
        </transition>
      </div>
      <!-- swiper -->
      <div class="filter">
        <div class="filter-container game-type" v-if="optionList.length != 0">
          <div v-swiper:mySwiper1="swiperOption" class="swiper">
            <div class="swiper-wrapper info-demo-images">
              <div
                class="swiper-slide"
                v-for="item in optionList"
                :key="item.id"
              >
                <div
                  :class="[
                    'game-type-item',
                    gameCategoryId == item.id ? 'green-border-box' : '',
                  ]"
                  @click="onSelectGameType(item.id)"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div
              class="swiper-pagination my-pagination"
              slot="pagination"
            ></div>
          </div>
          <div id="PrevBtn" class="swiper-button-prev">
            <img src="../assets/img/left.svg" class="swiperNav" />
          </div>
          <div id="NextBtn" class="swiper-button-next">
            <img src="../assets/img/right.svg" class="swiperNav" />
          </div>
        </div>
        <hr />
        <div
          class="filter-container filter-type"
          v-if="filterByList.length != 0"
        >
          <div v-swiper:mySwiper2="swiperOption2" class="swiper">
            <div class="swiper-wrapper info-demo-images">
              <div
                :class="[
                  'swiper-slide',
                  filterBy.includes(item.code) ? 'green-border-box' : '',
                ]"
                v-for="item in filterByList"
                :key="item.id"
                @click="onSelectGameFilter(item.code)"
              >
                <div :class="['filter-by-item']">
                  <img :src="item.icon" v-if="item.icon" />
                  <div class="filter-name" v-else>
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="swiper-pagination my-pagination"
              slot="pagination"
            ></div>
          </div>
          <div id="PrevBtn2" class="swiper-button-prev">
            <img src="../assets/img/left.svg" class="swiperNav" />
          </div>
          <div id="NextBtn2" class="swiper-button-next">
            <img src="../assets/img/right.svg" class="swiperNav" />
          </div>
        </div>
      </div>
      <div class="index-games">
        <div class="index-search-bar mobile">
          <div class="login-input-with-route">
            <el-input
              class="login-input"
              :placeholder="$t('header.search')"
              v-model="debouncedInput"
              @input="onFilterGame"
              clearable
            >
            </el-input>

            <div class="login-input-tooltip">
              <i class="el-icon-search"></i>
            </div>
          </div>
        </div>
        <div class="index-games-lable-position web">
          <div class="index-games-label">
            <ContentTitle :text="$t('home.games')" />
          </div>
          <div class="index-games-showAll">
            <div>{{ $t("games.sort_by") }}</div>
            <el-dropdown @command="handleCommand">
              <el-button type="primary">
                {{ sortByName
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu
                slot="dropdown"
                class="games-list-filter-option"
              >
                <el-dropdown-item
                  v-for="sortType in sortTypeList"
                  :key="sortType.name"
                  :value="sortType.key"
                  :command="`${sortType.key}||${sortType.name}`"
                  >{{ sortType.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

        <div class="index-games-list" v-if="gameList.length != 0">
          <div
            v-for="(item, index) in gameList"
            :key="index"
            :class="[
              'index-games-card',
              currentFocus == item.id ? 'is_active' : '',
            ]"
          >
            <input
              type="image"
              v-if="item.image != '' && item.image"
              :src="item.image"
              :alt="item.image"
              class="index-games-card-image"
              @focus="onFocus(item.id)"
            />

            <input
              type="image"
              v-else
              :src="require('../assets/img/logo.png')"
              class="index-games-card-image"
              @focus="onFocus(item.id)"
            />

            <div class="index-games-card-middle" v-if="isLogin">
              <div class="index-games-list-card-wrap">
                <div
                  class="greenGradientButtonBg text"
                  @click="playGame(item.id, 0)"
                >
                  {{ $t("home.real") }}
                </div>
                <div class="text" @click="playDemo(item.id)">
                  {{ $t("home.demo") }}
                </div>
              </div>
            </div>
            <div class="index-games-card-middle" v-if="!isLogin">
              <div class="index-games-list-card-wrap">
                <div class="login-text">{{ $t("home.plsLogin") }}</div>
              </div>
            </div>
          </div>
          <infinite-loading
            class="gameList-scroll-loading mobile"
            v-if="gameList.length"
            spinner="bubbles"
            @infinite="infiniteScroll"
          >
            <div slot="no-results">{{ $t("games.no_more_result") }}</div>
          </infinite-loading>
        </div>
        <div v-else>
          <div class="games-list-noData" v-if="totalList == 0">
            <img
              class="game-list-noData-img"
              src="../assets/img/no_data.png"
              alt="no_data"
            />
            <div class="game-list-noData-label">{{ $t("no_data") }}</div>
          </div>
        </div>
        <div class="games-list-pagination web" v-if="gameList.length != 0">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="20"
            :total="totalList"
            :current-page="gamePage"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
      <Loading :isLoading.sync="isLoading" :isFullscreen="false" />
    </div>
    <!-- swiper -->
    <FullscreenIframe
      v-if="showIframe"
      :url="url"
      @close="showIframe = false"
    ></FullscreenIframe>
  </div>
</template>
<script>
import { mapState } from "vuex";
import FullscreenIframe from "../components/FullscreenIframe.vue";
export default {
  name: "Index",
  // head() {
  //   return {
  //     title: this.$t("home.title"),
  //   };
  // },
  components: {
    FullscreenIframe,
  },
  data() {
    return {
      /* Iframe  */
      showIframe: false,
      url: "https://example.com",
      /* swiper */
      bannerList: [],
      bannerListTemp: [
        {
          brief: null,
          id: 1,
          image: "https://via.placeholder.com/1200x200.png",
          title: "abc",
        },
      ],
      gameIndexLists: [],
      currentFocus: null,
      swiperOption: {
        noNextTick: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: "#NextBtn",
          prevEl: "#PrevBtn",
        },
        slidesPerView: "auto",
        breakpointsInverse: true,
        // paginationHide: true,
      },
      swiperOption2: {
        noNextTick: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: "#NextBtn2",
          prevEl: "#PrevBtn2",
          disabledClass: "swiper-button-disabled",
        },
        slidesPerView: "auto",
        breakpointsInverse: true,
        // paginationHide: true,
      },

      isLoading: false,
      isCallApi: false,
      gameList: [],
      optionList: [],
      totalList: 0,
      gameCategoryId: 0,
      sortTypeList: [
        { key: "hot", name: this.$t("games.hot") },
        { key: "recommend", name: this.$t("games.popular") },
        { key: "name_asc", name: this.$t("games.name_asc") },
        { key: "name_desc", name: this.$t("games.name_desc") },
      ],
      sortBy: "",
      sortByName: "",
      gamePage: 1,
      debouncedInput: "",
      filterByList: [],
      filterBy: [],
      currentNotice: "",
      notices: [],
    };
  },
  computed: {
    ...mapState(["isLogin"]),
  },
  mounted() {
    this.initBulletins();
    this.initGameIndex();
    this.initEventBanner();
    this.$root.$on("search_game", (data) => {
      this.debouncedInput = data;
      this.onFilterGame();
    });
  },
  methods: {
    openIframe(url) {
      this.showIframe = true;
      this.url = url;
    },
    initBulletins() {
      var b = localStorage.getItem("bulletins");
      if (b != null) {
        var json = JSON.parse(b);
        this.notices = [];
        json.forEach((element) => {
          this.notices.push(element.title);
        });
        this.startMarquee();
      }
    },
    startMarquee() {
      this.currentNotice = this.notices[0];
      setTimeout(() => {
        this.nextNotice();
      }, 10000);
    },
    nextNotice() {
      this.currentNotice = null;
      setTimeout(() => {
        this.currentNotice = this.notices.shift();
        this.notices.push(this.currentNotice);
        setTimeout(() => {
          this.nextNotice();
        }, 10000);
      }, 300);
    },
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
    initGameIndex() {
      this.$api
        .requestByPost("/Game/index", null)
        .then((result) => {
          if (result.status == true) {
            this.optionList = result.data;
            this.gameCategoryId = result.data[0].id;
            this.sortBy = "hot";
            this.sortByName = this.$t("games.hot");
            this.getGameList("first");
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
          // let all = {
          //   games: [],
          //   icon: "",
          //   id: 0,
          //   name: "All",
          // };
          // this.optionList.unshift(all);
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },

    handleCurrentChange(val) {
      this.gamePage = val;
      this.getGameList();
    },
    getGameList(type) {
      let params = {
        cate_id: this.gameCategoryId,
        page: this.gamePage,
        name: this.debouncedInput,
        order: this.sortBy,
        platform: this.filterBy.toString(),
      };
      this.isLoading = true;
      this.$api
        .requestByPost("/Game/lists", params)
        .then((result) => {
          if (result.status == true) {
            this.totalList = result.data.count;
            this.filterByList = result.data.platforms;

            if (type == "first" && this.filterByList.length > 0) {
              this.filterBy = [];
              this.filterBy.push(this.filterByList[0].code);
              this.getGameList();
              return;
            }

            if (this.isMobile()) {
              if (this.gameList.length < this.totalList) {
                this.gameList.push(...result.data.list);
              }
            } else {
              this.gameList = result.data.list;
            }
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }

          this.isLoading = false;
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },

    onSelectGameType(id) {
      this.filterBy = [];
      this.gameCategoryId = id;
      this.gameList = [];
      this.gamePage = 1;
      this.getGameList("first");
    },
    onSelectGameFilter(code) {
      this.filterBy = [];
      this.filterBy.push(code);
      this.onSelectGameList();
    },
    handleCommand(command) {
      let key = command.split("||");
      this.sortBy = key[0];
      this.sortByName = key[1];
      this.onSelectGameList();
    },
    onSelectGameList() {
      this.gameList = [];
      this.gamePage = 1;
      this.getGameList();
    },
    onFilterGame() {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.gameList = [];
        this.gamePage = 1;
        this.getGameList();
      }, 500);
    },
    infiniteScroll($state) {
      setTimeout(() => {
        this.gamePage++; // next page

        if (this.gameList.length < this.totalList) {
          this.getGameList();
          $state.loaded();
        } else {
          $state.complete();
        }
      }, 500);
    },

    initEventBanner() {
      let params = { page: 1 };
      this.$api
        .requestByPost("Activity/lists", params)
        .then((result) => {
          if (result.status == true) {
            this.bannerList = result.data.list;
            this.bannerList.unshift({
              brief: null,
              id: 0,
              image: require("@/assets/img/banner/jili.jpg"),
              title: "",
              onclick: () => {
                this.gameCategoryId = "2";
                this.gamePage = 1;
                this.debouncedInput = "";
                this.sortBy = "hot";
                this.filterBy = ["JiLi"];
                this.getGameList();
                console.log("hihi");
              },
            });
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },

    routeToGame(id) {
      this.$router.push({
        path: "games",
        query: {
          gameCate: id,
        },
      });
    },

    playDemo(gameDetail) {
      if (gameDetail.isDemo != 1) {
        this.$notiflix.Notify.failure("No Support Demo", {
          showOnlyTheLastOne: true,
        });
      } else {
        this.playGame(gameDetail.id, 1);
      }
    },

    playGame(gameId, demoId) {
      this.$api
        .requestByPost("/Game/play", {
          id: gameId,
          is_demo: demoId,
        })
        .then((result) => {
          if (result.status == true) {
            const { data, msg } = result;
            if (data !== null) {
              // setTimeout(() => {
              //   window.open(data, "_blank");
              // });
              this.openIframe(data);
            } else {
              this.$notiflix.Notify.failure(msg, {
                showOnlyTheLastOne: true,
              });
            }
          } else if (typeof result === "string") {
            this.$notiflix.Notify.failure(result, {
              showOnlyTheLastOne: true,
            });
          } else {
            this.$notiflix.Notify.failure(JSON.stringify(result.data), {
              showOnlyTheLastOne: true,
            });
          }
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(error.toString(), {
            showOnlyTheLastOne: true,
          });
        });
    },

    routeToEventPage(id) {
      this.$router.push({ path: "/events/" + id });
    },

    onFocus(id) {
      if (this.currentFocus == id) {
        this.currentFocus == null;
      } else {
        this.currentFocus = id;
      }
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/index.scss";
@import "/assets/scss/mobile/index.scss";

/* 定义跑马灯动画 */
@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-100%, 0);
  }
}

/* 应用跑马灯动画 */
.marquee {
  animation: marquee 15s linear infinite;
}

.notice-container {
  padding: 10px;
  color: $primaryGreen;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.notice-container {
  overflow: hidden;
}

.marquee {
  width: 100%;
  // overflow: hidden;
  white-space: nowrap;
}

.marquee p {
  display: inline-block;
  padding-left: 100%;
  animation: marquee 15s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-100%, 0);
  }
}
</style>
