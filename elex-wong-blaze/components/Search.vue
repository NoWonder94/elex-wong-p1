<template>
  <div id="searchBox" class="search-box">
    <div
      v-if="navSearch"
      class="search-fullscreen"
      :class="{ isShowSearch: isShowSearch }"
    >
      <div class="header">
        <div class="title">
          <i class="el-icon-back" @click="closeNav"></i>
          <div class="text">
            {{ $tt("search") }}
          </div>
        </div>
        <div class="input">
          <el-input
            :placeholder="$tt('search_game_provider')"
            prefix-icon="el-icon-search"
            v-model="search"
            @input="searchGame"
          >
          </el-input>
        </div>
        <div class="tab-row">
          <div
            class="tab-item"
            :class="type == 'all' ? 'selected' : ''"
            @click="handleType('all')"
          >
            {{ $tt("all") }}
          </div>
          <div
            class="tab-item"
            :class="type == 'slot' ? 'selected' : ''"
            @click="handleType('slot')"
          >
            {{ $tt("slots") }}
          </div>
          <div
            class="tab-item"
            :class="type == 'casino' ? 'selected' : ''"
            @click="handleType('casino')"
          >
            {{ $tt("live_casino") }}
          </div>
          <!-- <div class="tab-item" :class="type == 'original' ? 'selected' : ''" @click="handleType('original')">{{ $tt("blaze_originals") }}</div> -->
        </div>
      </div>
      <div v-if="isLoading" v-loading="isLoading" style="margin: 50px 0"></div>
      <div v-else class="content">
        <div v-if="gameList.length > 0">
          <div class="title">{{ $tt("suggest_games") }}</div>
          <div class="game-list">
            <div
              class="game-item"
              v-for="(item, index) in gameList"
              :key="index"
              @click="handleUrl(item.playId, item.gameName)"
            >
              <div class="game-image">
                <img :src="item.imgPlay" />
              </div>
              <div class="game-text">
                <div class="game-title">
                  {{ item.gameName }}
                </div>
                <div class="game-desc">
                  {{ item.gameChannelName }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-result">
          {{ $tt("no_results_found") }}
        </div>
      </div>
    </div>
    <div v-else>
      <div class="input">
        <el-input
          :placeholder="$tt('search_game_provider')"
          prefix-icon="el-icon-search"
          v-model="search"
          @input="searchGame"
        >
        </el-input>
      </div>
      <div class="search-modal-overlay" v-if="searchClicked">
        <div class="search-modal">
          <div class="tab-row">
            <div
              class="tab-item"
              :class="type == 'all' ? 'selected' : ''"
              @click="handleType('all')"
            >
              {{ $tt("all") }}
            </div>
            <div
              class="tab-item"
              :class="type == 'slot' ? 'selected' : ''"
              @click="handleType('slot')"
            >
              {{ $tt("slots") }}
            </div>
            <div
              class="tab-item"
              :class="type == 'casino' ? 'selected' : ''"
              @click="handleType('casino')"
            >
              {{ $tt("live_casino") }}
            </div>
            <!-- <div class="tab-item" :class="type == 'original' ? 'selected' : ''" @click="handleType('original')">Blaze Originals</div> -->
          </div>
          <div
            v-if="isLoading"
            v-loading="isLoading"
            style="margin: 50px 0"
          ></div>
          <div v-else class="content">
            <div v-if="gameList.length > 0">
              <div class="title">{{ $tt("suggest_games") }}</div>
              <div class="game-list">
                <div
                  class="game-item"
                  v-for="(item, index) in gameList"
                  :key="index"
                  @click="handleUrl(item.playId, item.gameName)"
                >
                  <div class="game-image">
                    <img :src="item.imgPlay" />
                  </div>
                  <div class="game-text">
                    <div class="game-title">
                      {{ item.gameName }}
                    </div>
                    <div class="game-desc">
                      {{ item.gameChannelName }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="no-result">
              {{ $tt("no_results_found") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <ShowModal v-if="showModal" type="login" @close="showModal = false" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Search",
  props: ["navSearch", "isShowSearch", "click"],
  data() {
    return {
      isLoading: false,
      type: "all",
      search: "",
      gameList: [],
      searchClicked: false,
      showModal: false,
    };
  },
  mounted() {
    if (this.navSearch) {
      this.searchGame();
    }
    this.searchClicked = this.click;
  },
  methods: {
    handleType(type) {
      this.type = type;
      this.searchGame();
    },
    handleUrl(id, name) {
      if (this.isLogin) {
        window.newRouter(
          "/games/" + id + "-" + name.replace(/\s+/g, "-").toLowerCase()
        );
      } else {
        this.showModal = true;
      }
    },
    closeNav() {
      this.$emit("handleClose", false);
    },
    handleSearch() {
      if (this.searchClicked == false) {
        this.searchClicked = true;
      }
    },
    searchGame(value) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.getList();
      }, 700);
    },
    getList() {
      var data = { searchInfo: this.search };
      // if (this.type != "all") {
      //   data["gameType"] = this.type == "slot" ? 1 : 6;
      // }
      this.isLoading = true;

      this.$api
        .requestByPost("/hall/v2/playHall/queryGameTypeList", data)
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

          var slotList = [];
          var liveCasinoList = [];

          data.forEach((element) => {
            if (element.gameType == 1) {
              slotList = element.gameList;
            } else if (element.gameType == 6) {
              liveCasinoList = element.gameList;
            }
          });

          if (this.type != "all") {
            this.gameList =
              this.type == "slot"
                ? slotList.splice(0, 8)
                : liveCasinoList.splice(0, 8);
          } else {
            this.gameList = [];
            for (var i = 0; i < data.length; i++) {
              for (var j = 0; j < data[i]["gameList"].length; j++) {
                if (this.gameList.length < 8) {
                  this.gameList.push(data[i]["gameList"][j]);
                }
              }
            }
          }
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
  },
  watch: {
    click(newValue, oldValue) {
      this.searchClicked = this.click;
      this.searchGame();
    },
  },
  computed: {
    ...mapState(["isLogin"]),
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/search.scss";
@import "/assets/scss/mobile/search.scss";
</style>
