<template>
  <div class="game-category">
    <div class="game-category-header">
      <div class="game-category-header-left">
        <div class="title">
          <i class="el-icon-back" @click="handleUrl('/')"></i>
          <div class="game-category-header-title">{{ title }}</div>
        </div>
        <div class="search mobile">
          <i
            class="el-icon-search"
            @click="handleSearch"
            v-show="isSearch == false"
          ></i>
          <i
            class="el-icon-close"
            @click="handleSearch"
            v-show="isSearch == true"
          ></i>
        </div>
      </div>
      <div class="game-category-header-right web">
        <div class="search">
          <el-input
            :placeholder="$tt('search')"
            prefix-icon="el-icon-search"
            v-model="search"
            @input="searchGame"
          >
          </el-input>
        </div>
        <div class="provider">
          <el-select
            v-model="provider"
            class="provider-select"
            multiple
            :popper-append-to-body="false"
            placeholder=""
          >
            <template #prefix>
              {{ $tt("providers_") }}
              <span class="length" v-if="providerLength == 0">{{
                $tt("all")
              }}</span>
              <span class="length" v-else>{{ providerLength }}</span>
            </template>
            <el-checkbox-group
              v-model="providerCheckedList"
              @change="handleProvider"
            >
              <el-option
                v-for="item in providerOptions"
                :key="item.gameChannel || item.type"
                :value="item.gameChannel || item.type"
              >
                <el-checkbox
                  :label="item.gameChannel || item.type"
                  :key="item.gameChannel || item.type"
                >
                  {{ item.gameChannelName || item.name }}
                  <span class="number">{{ item.gameNum || item.num }}</span>
                </el-checkbox>
              </el-option>
            </el-checkbox-group>
          </el-select>
        </div>
        <!-- <div class="category">
          <el-select
            v-model="category"
            class="category-select"
            multiple
            :popper-append-to-body="false"
            placeholder=""
          >
            <template #prefix>
              {{ $tt("categories_") }}
              <span class="length" v-if="categoryLength == 0">{{ $tt("all") }}</span>
              <span class="length" v-else>{{ categoryLength }}</span>
            </template>
            <el-checkbox-group
              v-model="categoryCheckedList"
              @change="handleCategory"
            >
              <el-option
                v-for="item in option"
                :key="item.value"
                :value="item.value"
              >
                <el-checkbox :label="item.label" :key="item.value">
                  {{ item.label }}
                  <span class="number">{{ item.number }}</span>
                </el-checkbox>
              </el-option>
            </el-checkbox-group>
          </el-select>
        </div> -->
      </div>
      <div class="game-category-header-search mobile">
        <div class="game-category-header-search-item" v-if="isSearch == true">
          <div class="search">
            <el-input
              :placeholder="$tt('search')"
              prefix-icon="el-icon-search"
              v-model="search"
              @input="searchGame"
            >
            </el-input>
          </div>
        </div>
        <div class="game-category-header-search-item" v-if="isSearch == false">
          <div class="provider">
            <el-select
              v-model="provider"
              class="provider-select"
              multiple
              :popper-append-to-body="false"
              placeholder=""
            >
              <template #prefix>
                {{ $tt("providers_") }}
                <span class="length" v-if="providerLength == 0">{{
                  $tt("all")
                }}</span>
                <span class="length" v-else>{{ providerLength }}</span>
              </template>
              <el-checkbox-group
                v-model="providerCheckedList"
                @change="handleProvider"
              >
                <el-option
                  v-for="item in providerOptions"
                  :key="item.gameChannel || item.type"
                  :value="item.gameChannel || item.type"
                >
                  <el-checkbox
                    :label="item.gameChannel || item.type"
                    :key="item.gameChannel || item.type"
                  >
                    {{ item.gameChannelName || item.name }}
                    <span class="number">{{ item.gameNum || item.num }}</span>
                  </el-checkbox>
                </el-option>
              </el-checkbox-group>
            </el-select>
          </div>
          <!-- <div class="category">
            <el-select
              v-model="category"
              class="category-select"
              multiple
              :popper-append-to-body="false"
              placeholder=""
              x-placement="bottom-end"
            >
              <template #prefix>
                {{ $tt("categories_") }}
                <span class="length" v-if="categoryLength == 0">{{ $tt("all") }}</span>
                <span class="length" v-else>{{ categoryLength }}</span>
              </template>
              <el-checkbox-group
                v-model="categoryCheckedList"
                @change="handleCategory"
              >
                <el-option
                  v-for="item in option"
                  :key="item.value"
                  :value="item.value"
                >
                  <el-checkbox :label="item.label" :key="item.value">
                    {{ item.label }}
                    <span class="number">{{ item.number }}</span>
                  </el-checkbox>
                </el-option>
              </el-checkbox-group>
            </el-select>
          </div> -->
        </div>
      </div>
    </div>
    <div v-if="isLoading" v-loading="isLoading" style="padding: 50px 0"></div>
    <div class="game-category-content" v-else>
      <div v-if="totalGame > 0">
        <div class="game-list">
          <div class="game-item" v-for="(item, index) in list" :key="index">
            <GameImage
              :img="item.img"
              :title="item.title"
              :desc="item.desc"
              :playId="item.playId"
              :isDemo="item.isDemo"
              @login="handleModal('login')"
              @deposit="handleModal('deposit')"
            />
          </div>
        </div>
        <div class="view-more">
          <el-progress
            :percentage="percentage"
            color="#F12C4C"
            :show-text="false"
            :stroke-width="2"
          ></el-progress>
          <div class="display">
            {{ $tt("displaying") }} {{ showGame }} {{ $tt("of") }}
            {{ totalGame }} {{ $tt("games_") }}
          </div>
          <div class="load-more" @click="loadMore" v-if="showGame != totalGame">
            {{ $tt("load_more") }}
          </div>
        </div>
      </div>
      <div v-else>
        {{ $tt("no_games_found") }}
      </div>
    </div>
    <ShowModal v-if="showModal" :type="modalType" @close="showModal = false" />
  </div>
</template>

<script>
export default {
  name: "GameCategory",
  async asyncData({ params }) {
    const name = params.name;
    return { name };
  },
  data() {
    return {
      isLoading: false,
      isCategory: false,
      title: "",
      search: "",
      provider: "",
      category: "",
      option: [
        { value: "amatic", label: "Amatic", number: 23 },
        { value: "belatra", label: "Belatra", number: 76 },
        { value: "betsoft", label: "Betsoft", number: 128 },
      ],
      providerOptions: [],
      providerCheckedList: [],
      providerLength: 0,
      categoryCheckedList: [],
      categoryLength: 0,
      percentage: 0,
      isSearch: false,
      initialGame: 0,
      showGame: 0,
      totalGame: 0,
      gameList: [],
      list: [],
      showModal: false,
      type: 0,
      initList: [],
      modalType: '',
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      switch (this.name) {
        case "hotGame":
        case "topGame":
        case "newGame":
        case "winGame":
        case "hallGame":
          this.isCategory = true;
          this.getHall();
          // this.getAllProvider();
          break;
        case "slots":
        case "liveCasino":
        case "gameShows":
        case "originals":
          this.isCategory = false;
          this.getAllGame();
          this.getProvider();
        default:
          break;
      }
    },
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

          const { hallGame, hotGame, topGame, nowGame, winGame } = data;
          if (this.name == "hotGame") {
            this.title = this.$tt("hot_game");
            this.gameList = hotGame;
          } else if (this.name == "topGame") {
            this.title = this.$tt("top_game");
            this.gameList = topGame;
          } else if (this.name == "newGame") {
            this.title = this.$tt("new_game");
            this.gameList = nowGame;
          } else if (this.name == "winGame") {
            this.title = this.$tt("win_game");
            this.gameList = winGame;
          } else if (this.name == "hallGame") {
            this.title = this.$tt("hall_game");
            this.gameList = hallGame;
          }

          var providerList = [];
          for (var i in this.gameList) {
            var isCheck = providerList.find(item => item['gameChannelName'] == this.gameList[i]['gameChannelName']);
            if (!isCheck) {
              providerList.push({gameChannelName: this.gameList[i]['gameChannelName'], gameChannel: this.gameList[i]['gameChannel'], gameNum: 1});
            } else {
              var index = providerList.findIndex(item => item['gameChannelName'] == this.gameList[i]['gameChannelName']);
              providerList[index]['gameNum'] += 1;
            }
          }
          this.providerOptions = providerList;

          this.initList = [...this.gameList];
          this.addGameItem();
        })
        .catch((error) => {
          this.isLoading = false;

          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },
    getAllGame() {
      this.isLoading = true;

      if (this.name == "slots") {
        this.title = this.$tt("slots");
        this.type = 1;
      } else if (this.name == "liveCasino") {
        this.title = this.$tt("live_casino");
        this.type = 6;
      } else if (this.name == "gameShows") {
        this.title = this.$tt("game_shows");
        this.type = 5;
      } else if (this.name == "originals") {
        this.title = this.$tt("blaze_originals");
        this.type = 0;
      }

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

          this.gameList = data.hallGame;
          this.initList = [...this.gameList];
          this.addGameItem();
        })
        .catch((error) => {
          this.isLoading = false;

          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },
    getAllProvider() {
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

          this.providerOptions = data;
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },
    getProvider() {
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

          this.providerOptions = data;
        })
        .catch((error) => {
          this.isLoading = false;

          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
        });
    },
    searchGame(value) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.getSearchList();
      }, 700);
    },
    getSearchList() {
      if (this.isCategory) {
        this.isLoading = true;
        this.gameList = [];
        this.list = [];
        var filterList = [];
        this.initList.filter((item) => {
          if (item['gameName'].toLowerCase().includes(this.search.toLowerCase())) {
            filterList.push(item);
          }
        });

        if (this.providerLength > 0) {
          filterList.filter((item) => {
            if (this.providerCheckedList.includes(item.gameChannel) == true) {
              this.gameList.push(item);
            }
          });
        } else {
          this.gameList = filterList;
        }
        this.isLoading = false;

        this.addGameItem();
      } else {
        var data = { searchInfo: this.search };
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

              var filterList = [];

              data.forEach((element) => {
                if (element.gameType == this.type) {
                  this.gameList = filterList = element.gameList;
                }
              });

              this.gameList = [];
              this.list = [];

              if (this.providerLength > 0) {
                filterList.filter((item) => {
                  if (this.providerCheckedList.includes(item.gameChannel) == true) {
                    this.gameList.push(item);
                  }
                });
              } else {
                this.gameList = filterList;
              }

            this.addGameItem();
          })
          .catch((error) => {
            this.$notify({
              title: "Warning",
              message: error,
              type: "warning",
              duration: 2000,
            });
          });
      }
    },
    handleProvider() {
      this.providerLength = this.providerCheckedList.length;
      // this.getCategory();
      this.gameList = [];
      this.list = [];

      if (this.search != "") {
        this.searchGame();
      } else {
        if (this.providerLength > 0) {
          this.initList.filter((item) => {
            if (this.providerCheckedList.includes(item.gameChannel) == true) {
              this.gameList.push(item);
            }
          });
        } else {
          this.gameList = [...this.initList];
        }
        this.addGameItem();
      }
    },
    handleCategory() {
      this.categoryLength = this.categoryCheckedList.length;
    },
    addGameItem() {
      this.totalGame = this.gameList.length;
      this.initialGame = this.showGame =
        this.totalGame > 30 ? 30 : this.totalGame;
      this.percentage = (this.showGame / this.totalGame) * 100;

      for (var i = 0; i < this.initialGame; i++) {
        this.list.push({
          img: this.gameList[i].imgPlay,
          title: this.gameList[i].gameName,
          desc: this.gameList[i].gameChannelName,
          playId: this.gameList[i].playId,
          isDemo: this.gameList[i].isDemo,
        });
      }
      this.gameList.splice(0, this.initialGame);
    },
    loadMore() {
      var qty =
        this.showGame + this.initialGame > this.totalGame
          ? this.totalGame - this.showGame
          : this.initialGame;
      this.showGame += qty;
      this.percentage = (this.showGame / this.totalGame) * 100;

      for (var i = 0; i < qty; i++) {
        this.list.push({
          img: this.gameList[i].imgPlay,
          title: this.gameList[i].gameName,
          desc: this.gameList[i].gameChannelName,
          playId: this.gameList[i].playId,
          isDemo: this.gameList[i].isDemo,
        });
      }
      this.gameList.splice(0, this.initialGame);
    },
    handleSearch() {
      this.isSearch = !this.isSearch;
    },
    handleUrl(url) {
      window.newRouter(url);
    },
    handleModal(type) {
      this.modalType = type;
      this.showModal = true;
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/category.scss";
@import "/assets/scss/mobile/category.scss";
</style>
