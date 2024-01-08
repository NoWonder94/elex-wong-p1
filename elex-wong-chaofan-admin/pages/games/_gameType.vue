<template>
  <div class="gameType">
    <LottieLoading class="gameType-loading-position" v-if="isLoading" />
    <el-tabs
      class="gameType-tabbar"
      type="border-card"
      stretch
      @tab-click='getGameList'
      v-model="activeGameCate"
      v-else
    >
      <el-tab-pane
        v-for="gameCate in gameCateList"
        :key="gameCate.id"
        :label="gameCate.currency_title"
        :name="gameCate.id.toString()"
        >
          <div class="tab-content">
            <!-- filter -->
            <el-input
              v-model="filterName"
              placeholder="搜索游戏名字"
              class="game-search"
              clearable>
            </el-input>
            <!-- filter -->
            <div class="gameType-tabbar-list">
              <!-- ticket ui -->
              <div
                class="card"
                v-for="game in filteredGameList"
                :key="game.id"
              >
                <div class="left">
                  <h3>{{ game.id }}</h3>
                  <p>ID</p>
                </div>

                <div class="right">
                  <div class="right-content-label">
                    <h6>{{ game.eng_name }}</h6>
                    <h2>{{ game.chi_name }}</h2>
                  </div>

                  <div class="right-content">
                    <div class="right-content-flex">
                      <p> 游戏类型 </p>
                      <p> {{ game.game_type }} </p>
                    </div>
                    <div class="right-content-flex">
                      <p> 玩家人数 </p>
                      <p> <i class="el-icon-user"></i> {{ game.max_player }}</p>
                    </div>
                    <div class="right-content-flex">
                      <p> 支持语言 </p>
                      <p> {{ game.support_lang_msg }} </p>
                    </div>

                    <!-- game icon -->
                    <div class="right-play-corner" @click="handleOpenGame(game.game_code, game.scene_id)">
                      <i
                        class="right-play-loading el-icon-loading"
                        v-if="isGameButtonClick" ></i>
                      <img
                        v-else
                        class="right-play-button"
                        src="../../assets/img/game-handle.svg" >
                    </div>
                  </div>
                </div>
              </div>
              <!-- ticket ui -->
            </div>
          </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        type: this.$route.params.gameType,
        gameCateList: [],
        activeGameCate: "",
        gameList: [],
        isLoading: false,
        isGameButtonClick: false,
        /* filter */
        filterName: '',
      }
    },

    mounted () {
      this.getGameServerList();
    },

    computed: {
      filteredGameList() {
        return this.gameList.filter( element => {
          return  element.eng_name.toLowerCase().includes(this.filterName.toLowerCase()) || element.chi_name.includes(this.filterName.toLowerCase());
        })
      }
    },

    methods: {
      getGameServerList() {
        this.isLoading = true;

        let params = {
          type: this.type == "single" ? 0 : 1,
        }

        this.$api
          .requestByPost("user/Game/serverList", params)
          .then((result) => {
            if (result.status == true) {
              this.gameCateList = result.data;
              this.activeGameCate = result.data[0].id.toString();
              this.getGameList();
              this.isLoading = false;
            } else {
              this.$notiflix.Notify.failure(
                result.msg ? result.msg : this.$t("message.error"), {
                  showOnlyTheLastOne: true,
                });
            }

            this.isLoading = false;
          })
          .catch((error) => {
            console.log(error);
            this.$notiflix.Notify.failure(this.$t("message.error"), {
              showOnlyTheLastOne: true,
            });
          });
      },

      getGameList() {
        let params = {
          id: this.activeGameCate,
        }

        this.$api
          .requestByPost("user/Game/list", params)
          .then((result) => {
            if (result.status == true) {
              this.gameList = result.data;

            } else {
              this.$notiflix.Notify.failure(
                result.msg ? result.msg : this.$t("message.error"), {
                  showOnlyTheLastOne: true,
                });
            }

          })
          .catch((error) => {
            console.log(error);
            this.$notiflix.Notify.failure(this.$t("message.error"), {
              showOnlyTheLastOne: true,
            });
          });
      },

      handleOpenGame(gameCode, sceneId) {
        if(this.isGameButtonClick == true) {
          return false;
        }

        let params = {
          game_code: gameCode,
          scene_id: sceneId,
          server_id: this.activeGameCate,
        };

        this.isGameButtonClick = true;
        this.$api
          .requestByPost("user/Game/play", params)
          .then((result) => {
              if (result.status == true) {
                if (result.data.resp_msg.code == 200) {
                    window.open(result.data.resp_data.url, '_blank');
                } else {
                  this.$notiflix.Notify.failure(
                  result.data.resp_msg.message ? result.data.resp_msg.message : this.$t("message.error"), {
                    showOnlyTheLastOne: true,
                  });
                }

              } else {
                this.$notiflix.Notify.failure(
                  result.msg ? result.msg : this.$t("message.error"), {
                    showOnlyTheLastOne: true,
                  });
              }
             this.isGameButtonClick = false;
            })
            .catch((error) => {
              console.log(error);
              this.$notiflix.Notify.failure(this.$t("message.error"), {
                showOnlyTheLastOne: true,
              });
            });
      }
    },
  }
</script>

<style lang="scss" type="text/css">
  @import "../../assets/scss/pc/gameType.scss";
</style>
