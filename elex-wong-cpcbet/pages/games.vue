<template>
  <div class="games">
    <div class="games-list-filter">
      <div class="games-list-filter-input">
        <el-input
          :placeholder="$t('games.searchGame')"
          v-model="debouncedInput"
          @input="onFilterGame"
          clearable
        >
          <i class="el-icon-search el-input__icon" slot="prefix"> </i>
        </el-input>
      </div>

      <div class="games-list-filter-selection">
        <el-select
          class="games-list-filter-option"
          placeholder=""
          v-model="sortBy"
          @change="onSelectGameList"
        >
          <i class="el-icon-s-operation el-input__icon" slot="prefix"> </i>
          <el-option
            v-for="sortType in sortTypeList"
            :key="sortType.name"
            :label="sortType.name"
            :value="sortType.key"
          ></el-option>
        </el-select>

        <el-select
          class="games-list-filter-option"
          v-model="filterBy"
          :placeholder="$t('games.filter')"
          @change="onSelectGameList"
          multiple
        >
          <el-option
            v-for="filterByPlatform in filterByList"
            :key="filterByPlatform.code"
            :label="filterByPlatform.name"
            :value="filterByPlatform.code"
          >
            <div style="float: left; color: #003937">
              {{ filterByPlatform.name }}
            </div>
            <div style="float: right; color: #469f78">
              {{ filterByPlatform.num }}
            </div>
          </el-option>
        </el-select>

        <el-select
          class="games-list-filter-option"
          :placeholder="$t('games.filter')"
          @change="onSelectGameList"
          v-model="gameCategoryId"
        >
          <el-option
            v-for="option in optionList"
            :key="option.id"
            :value="option.id"
            :label="option.name"
          ></el-option>
        </el-select>
      </div>
    </div>

    <Loading :isLoading.sync="isLoading" v-if="isLoading" />

    <div class="games-list" v-if="gameList.length != 0">
      <div
        v-for="(game, index) in gameList"
        :key="index"
        :class="['games-list-card', currentFocus == game.id ? 'is_active' : '']"
      >
        <input
          type="image"
          v-if="game.image != null"
          :src="game.image"
          class="games-list-card-image"
          @focus="onFocus(game.id)"
        />

        <input
          type="image"
          v-else
          :src="require('../assets/img/logo.png')"
          class="games-list-card-image-exist"
          @focus="onFocus(game.id)"
        />

        <div class="games-list-card-container-middle" v-if="isLogin">
          <div class="games-list-card-wrap">
            <div
              class="greenGradientButtonBg text"
              @click="playGame(game.id, 0)"
            >
              {{ $t("games.real") }}
            </div>
            <div class="text" @click="playDemo(game.id)">
              {{ $t("games.demo") }}
            </div>
          </div>
        </div>
        <div class="games-list-card-container-middle" v-if="!isLogin">
          <div class="games-list-card-wrap">
            <div class="login-text">{{ $t("games.plsLogin") }}</div>
          </div>
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

    <div class="games-list-noData" v-if="totalList == 0 && isCallApi">
      <img
        class="game-list-noData-img"
        src="../assets/img/no_data.png"
        alt="no_data"
      />
      <div class="game-list-noData-label">{{ $t("no_data") }}</div>
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
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Games",
  head() {
    return {
      title: this.$t("games.title"),
    };
  },
  data() {
    return {
      isLoading: false,
      isCallApi: false,
      optionList: [],
      gameList: [],
      gameCategoryId: null,
      totalList: 0,
      gamePage: 1,
      gameDetail: [],
      timeout: null,
      debouncedInput: "",
      sortTypeList: [
        { key: "recommend", name: this.$t("games.popular") },
        { key: "hot", name: this.$t("games.hot") },
        { key: "name_asc", name: this.$t("games.name_asc") },
        { key: "name_desc", name: this.$t("games.name_desc") },
      ],
      sortBy: "",
      filterByList: [],
      filterBy: [],
      currentFocus: null,
    };
  },
  computed: {
    ...mapState(["isLogin"]),
  },

  mounted() {
    this.initialize();
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

    initialize() {
      this.$api
        .requestByPost("/Game/index", null)
        .then((result) => {
          if (result.status == true) {
            this.optionList = result.data;
            this.gameCategoryId = result.data[0].id;
            this.sortBy = "recommend";
            this.getGameList();
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

    getGameList() {
      let params = {
        cate_id: this.gameCategoryId,
        page: this.gamePage,
        name: this.debouncedInput,
        order: this.sortBy,
        platform: this.filterBy.toString(),
      };
      // this.isLoading = true;
      this.$api
        .requestByPost("/Game/lists", params)
        .then((result) => {
          if (result.status == true) {
            this.isCallApi = true;
            this.totalList = result.data.count;
            this.filterByList = result.data.platforms;

            if (result.data.count != 0) {
              this.isCallApi = false;
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

          // this.isLoading = false;
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

    onSelectGameList() {
      this.gameList = [];
      this.gamePage = 1;
      this.getGameList();
    },

    /* debounce input */
    onFilterGame() {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.gameList = [];
        this.gamePage = 1;
        this.getGameList();
      }, 500);
    },

    onFocus(id) {
      if (this.currentFocus == id) {
        this.currentFocus == null;
      } else {
        this.currentFocus = id;
      }
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
          if (result != null && result.status == true) {
            const { data, msg } = result;
            if (data !== null) {
              window.open(data, "_blank");
            } else {
              this.$notiflix.Notify.failure(msg, {
                showOnlyTheLastOne: true,
              });
            }
          } else {
            // error condition
            if (result.msg != null && result.msg != '') {
              this.$notiflix.Notify.failure(result.msg, {
                showOnlyTheLastOne: true,
              });
            } else {
              this.$notiflix.Notify.failure(result, {
                showOnlyTheLastOne: true,
              });
            }
          }
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/games.scss";
@import "/assets/scss/mobile/games.scss";
</style>
