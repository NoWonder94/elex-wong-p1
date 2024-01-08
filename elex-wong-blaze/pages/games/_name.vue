<template>
  <div class="games" v-loading="isLoading">
    <div v-if="isShowIframe == true">
      <div v-if="url != ''">
        <iframe
          :src="url"
          width="100%"
          height="630px"
          frameborder="0"
          scrolling="yes"
        ></iframe>
      </div>
      <div class="nodata-icon" v-else>
        <img :src="getChannelInfo.logoSmall" />
        <h3>{{ $tt("under_maintenance") }}</h3>
        <nuxt-link to="/">
          <div>{{ $tt("back") }}</div>
        </nuxt-link>
      </div>
    </div>
    <div v-else-if="isLogin && type != 2" class="games-info">
      <div class="games-detail">
        <div class="games-detail-left">
          <div class="games-detail-img">
            <img
              class="games-img"
              :src="gameDetail.imgPlay"
              v-if="gameDetail.imgPlay != '' && gameDetail.imgPlay != null"
            />
            <img class="games-noimg" :src="getChannelInfo.logoMini" v-else />
          </div>
          <div class="games-detail-text">
            <div class="games-detail-title">
              {{ gameDetail.gameName }}
            </div>
            <div class="games-detail-provider">
              {{ gameDetail.gameChannelName }}
            </div>
            <div class="games-detail-select-balance">
              {{ $tt("select_balance") }}
            </div>
            <div class="games-detail-balance">
              {{ $tt("balance_in") }}
            </div>
            <div class="games-detail-coin">
              <el-dropdown
                @command="handleWalletUnit"
                trigger="click"
                placement="bottom-start"
              >
                <div class="header-bonus">
                  <div class="header-bonus-wallet">
                    <div class="wallet-left">
                      <div class="currency-icon">
                        <img :src="getCoin.currencyIcon" alt="" />
                      </div>
                      <div class="header-currency">
                        <span class="currency-unit">
                          {{ getCoin.currencyName }}
                        </span>
                      </div>
                    </div>
                    <div class="wallet-right">
                      <i class="el-icon-arrow-down"></i>
                    </div>
                  </div>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in getUserCoinInfo"
                    :key="index"
                    :command="item"
                    class="account-wallet"
                  >
                    <div class="unit">
                      <div class="currency-icon">
                        <img :src="item.currencyIcon" alt="icon" />
                      </div>
                      {{ item.currencyName }}
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <div class="games-detail-right">
          <div class="real-game" @click="handleGame()">
            <img src="@/assets/img/play.png" />
            {{ $tt("real_game") }}
          </div>
          <div
            class="fun-play"
            v-if="gameDetail.isDemo == 1"
            @click="handleDemoGame()"
          >
            <img src="@/assets/img/play.png" />
            {{ $tt("fun_play") }}
          </div>
        </div>
      </div>
      <div class="games-recommended">
        <GameSwiper
          v-if="gameList.length > 0"
          :list="gameList"
          leftButton="prevBtn16"
          rightButton="nextBtn16"
          :title="$tt('recommended')"
          type="game"
          :gameDetail="true"
        />
      </div>
      <div class="games-providers">
        <ProviderSwiper
          v-if="providerList.length > 0"
          :list="providerList"
          leftButton="prevBtn17"
          rightButton="nextBtn17"
          :title="$tt('providers')"
          :gameDetail="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "Games",
  // meta: {
  //   auth: true,
  // },
  async asyncData({ params }) {
    const name = params.name;
    return { name };
  },
  data() {
    return {
      isLoading: false,
      playId: "",
      title: "",
      url: "",
      titleList: "",
      gameList: [],
      providerList: [],
      gameDetail: {},
      isShowIframe: false,
      type: 2,
    };
  },
  computed: {
    ...mapGetters(["getChannelInfo", "getUserCoinInfo", "getCoin"]),
    ...mapState(["isLogin"]),
  },
  mounted() {
    var list = this.name.split("-");
    this.playId = list[0];
    // this.titleList = list.slice(1);
    this.type = list[1];
    if (this.type == 2) {
      this.handleDemoGame();
    } else {
      if (this.isLogin) {
        this.getGame();
        this.getHall();
        this.getAllProviderList();
      } else {
        window.location.href = '/';
      }
    }
  },
  methods: {
    getTitle() {
      for (let i = 0; i < this.titleList.length; i++) {
        this.titleList[i] =
          this.titleList[i][0].toUpperCase() + this.titleList[i].substr(1);
      }
      this.title = this.titleList.join(" ");
    },
    verifyUrl(string) {
      if (string != null) {
        if (string.split(":")[0].includes("http")) {
          return true;
        }
      } else {
        return false;
      }
    },
    handleGame() {
      this.isLoading = true;

      this.$api
        .requestByPost("/single/gameUrl/list", {
          playId: this.playId,
          lobbyUrl: window.location.host,
          mode: 0,
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

          this.$AdjustEvent.enterThirdPartyGame();
          this.url = this.verifyUrl(msg) == true ? msg : "";
          this.checkMobile();
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
    handleDemoGame() {
      this.isLoading = true;

      this.$api
        .requestByPost("/single/gameUrl/gameDemoUrl", {
          playId: this.playId,
          lobbyUrl: window.location.host,
          mode: 0,
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

          this.$AdjustEvent.enterThirdPartyGame();
          this.url = this.verifyUrl(msg) == true ? msg : "";
          this.checkMobile();
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
    checkMobile() {
      if (window.innerWidth < 1201) {
        if (this.url != "") {
          // window.open(this.url);
          window.location.href = this.url;
          // this.$router.replace(this.localePath("/"));
        }
      } else {
        this.isShowIframe = true;
      }
    },
    handleWalletUnit(e) {
      this.$store.dispatch("updateCoinType", JSON.stringify(e));
    },
    getGame() {
      var data = { playId: this.playId };
      this.isLoading = true;

      this.$api
        .requestByPost("/hall/v2/playHall/getGameIdInfo", data)
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
          this.gameDetail = data;
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
          const { topGame } = data;
          this.gameList = topGame;
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

          this.providerList = data;
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
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/games.scss";
@import "/assets/scss/mobile/games.scss";
</style>
