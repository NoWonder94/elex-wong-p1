<template>
  <div id="Gamelibrary_Id" class="Gamelibrary_CN">
    <div class="Gamelibrary_Container">
      <div class="content">
        <center>
          <el-menu class="menu_web" :default-active="activeIndex" mode="horizontal">
            <el-menu-item
              index="majiong"
              @click="selectGameType(1)"
            >{{ $i18n.t('game.mahjong') }}</el-menu-item>
            <el-menu-item
              index="puko"
              @click="selectGameType(2)"
            >{{ $i18n.t('game.card_games') }}</el-menu-item>
            <el-menu-item
              index="other"
              @click="selectGameType(3)"
            >{{ $i18n.t('game.board_games') }}</el-menu-item>
            <el-menu-item
              index="laohuji"
              @click="selectGameType(4)"
            >{{ $i18n.t('game.slot_games') }}</el-menu-item>
            <el-menu-item
              index="street"
              @click="selectGameType(5)"
            >{{ $i18n.t('game.arcade') }}</el-menu-item>
            <el-menu-item index="all" @click="selectGameType(0)">{{ $i18n.t('game.all') }}</el-menu-item>
          </el-menu>

          <div class="gameListContainer" v-loading="isLoading">
            <div
              class="nodata"
              v-if="list.length == 0"
              style="text-align:center"
            >
              <span>{{ $i18n.t('game.coming_soon') }}</span>
            </div>
            <div
              data-aos="fade-right"
              data-aos-offset="-100"
              data-aos-duration="500"
              data-aos-once="true"
              :data-aos-delay="((index + 3) * 100) % 300"
              class="gameItem"
              style="position:relative;"
              v-for="(item, index) in list"
              :key="index"
              v-else
            >
              <div :class="{ hoverEffect: item.status != '2' }">
                <img
                  class="gameImage"
                  :src="item.img"
                  v-on:click="handleHref(item.status, item.id)"
                >
              </div>
              <div
                style="background-color:white; cursor:pointer;"
                v-on:click="handleHref(item.status, item.id)"
              >
                <div class="row">
                  <div class="gameIcon col-sd-4 col-md-4">
                    <img :src="item.icon">
                  </div>
                  <div class="title col-sd-8 col-md-8 col-12">
                    <span v-on:click="handleHref(item.status, item.id)">{{ item.content.title }}</span>
                    <div class="imgDiv">
                      <img v-for="(icon, index) in item.mobileOSIcon" :key="index" :src="icon">
                    </div>
                  </div>
                  <div
                    class="gameContent col-sd-12 col-md-12"
                    style="overflow : hidden;text-overflow: ellipsis;-webkit-line-clamp: 2;-webkit-box-orient: vertical;"
                  >
                    <span>{{ item.content.summary }}</span>
                  </div>
                  <span
                    class="status"
                    :class="item.status == '2' ? 'unavailable' : ''"
                    v-on:click="handleHref(item.status, item.id)"
                  ><!-- {{ item.test }} -->游戏试玩</span>
                  <span
                    class="status1 hvr-sweep-to-right"
                    :class="item.status == '2' ? 'unavailable' : ''"
                    v-on:click="handleHref(item.status, item.id)"
                  ><!-- {{ item.check }} -->查看详情</span>
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
import game from '~/root/game_Item_order.json';
import Parallax from 'parallax-js';
  export default {
  data() {
    return {
      activeIndex: 'all',
      lang: 'eng',
      game: {},
      gameList: {},
      list: [],
      isLoading: false,
      isShow: true
    };
  },
  mounted() {
    this.game = this.$i18n.t('Game');
    this.handleGameList('all');
    this.initData();
  },

  methods: {
    handleGameList(x) {
      switch (x) {
        case 'majiong':
          this.gameList = this.game.majiong;
          this.activeIndex = x;
          break;

        case 'card_games':
          this.gameList = this.game.card_games;
          this.activeIndex = x;
          break;

        case 'slot_games':
          this.gameList = this.game.slot_games;
          this.activeIndex = x;
          break;

        case 'board_games':
          this.gameList = this.game.board_games;
          this.activeIndex = x;
          break;

        case 'arcade':
          this.gameList = this.game.arcade;
          this.activeIndex = x;
          break;

        case 'all':
          this.gameList = this.$utils.sorting_data(
            Object.values(this.game),game
          );

          this.activeIndex = x;
          break;
      }
    },

    handleHref(x, id) {
      if (x == 'false') {
        this.$message.info(this.$i18n.t('game.status_false'));
      } else {
        this.$router.push({ path: '../member/gameDetails', query: { id: id } });
      }
    },

    initData() {
      if (this.$i18n.locale == 'en') {
          this.lang = 'eng';
        } else if (this.$i18n.locale == 'zh-CN'){
          this.lang = 'chi';
        } else if (this.$i18n.locale == 'kr') {
          this.lang = 'kr';
        } else {
          this.lang = 'eng';
        }
      this.isLoading = true;
      this.isShow = false;

      this.$api.request('/Game/getList?gameCategoryId=' + this.gameCategoryId + '&lang=' + this.lang).then((result) => {
        if (result.status) {
          this.list = result.data.list;
          console.log(this.list);
        }
        this.isLoading = false;
        this.isShow = true;
      }).catch(error => {
        this.$message.error(error.msg);
      });
    },
    selectGameType(gameCategoryId, gameName) {
      this.gameCategoryId = gameCategoryId;
      this.activeIndex = gameName;
      // this.activeIndex = gameCategoryId;
      this.initData();
    },
  },
  watch: {
    '$i18n.locale'(val) {
      this.initData();
    }
  }
  };
</script>

<style lang="scss">
.Gamelibrary_CN {
  [data-aos='zoom-in-responsive'] {
    transition-property: transform, opacity;
    @media screen and (max-width: 769px) {
      transform: scale(0.5);
      opacity: 0;
      &.aos-animate {
        transition-delay: 0.5s;
        opacity: 1;
        transform: scale(1);
      }
    }
    @media screen and (min-width: 769px) {
      transform: scale(0.5);
      opacity: 0;
      &.aos-animate {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  @media only screen and (min-width: 769px) {
    .Gamelibrary_Container {
      margin:6.6vw 12.5vw 0vw 7.9vw;

    .content {
      width: 56.02vw;
      margin: 0 auto;
      text-align: center;

      .menu_web {
        display: block;
      }

      .menu_wap {
        display: none;
      }

      .el-menu--horizontal {
        margin: 4vw 0 2.5vw 0;
        padding: 1.6vw 1.5vw 1.6vw 1.6vw;
        box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.15);
      }
      .el-menu--horizontal > .el-menu-item:not(:last-child) {
        border-right: 0.2px solid #e0e0e0;
      }
      .el-menu--horizontal > .el-menu-item:nth-last-child(2) {
        border-right: none;
      }

      .el-menu--horizontal > .el-menu-item:last-child {
        float: right;
      }

      .el-menu--horizontal > .el-menu-item {
        height: 1.5vw;
        line-height: 1.5vw;
        font-size: 1vw;
        font-weight: 400;
        padding: 0 1.7vw;
      }
      .el-menu-item.is-disabled {
        cursor: default;
        opacity: 1;
      }
      .el-menu--horizontal > .el-menu-item.is-active {
        color: #ff0317;
        font-weight: 500;
        border-bottom: transparent;
      }

      .gameListContainer {
        display: grid;
        grid-template-columns: 31.6% 31.6% 31.6%;
        grid-row-gap: 20px;
        justify-content: space-between;
        text-align: left;
        padding-bottom: 4.9vw;
        margin: 0 auto;
        .nodata {
          grid-column: 2;
        }

        .gameItem {
          background-color: white;
          -webkit-box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.15);
          -moz-box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.15);
          box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.15);
          .hoverEffect:hover {
            overflow: hidden;
            cursor: pointer;
            img {
              transition: all 0.5s;
              transform: scale(1.2);
              transform-origin: center;
            }
          }
          div {
            width: 100%;
            .row {
              margin: 0;
              font-size: 0.9vw;
              font-weight: 500;
              padding-bottom: 4vw;
              .status {
                padding: 0.2vw 1vw;
                position: absolute;
                right: 1vw;
                bottom: 1vw;
                background-color: #ff0317;
                color: #fff;
                font-size: 0.8vw;
                font-weight: 400;
                min-width: 4vw;
                text-align: center;
                border: 1px solid #ff0317;
                border-radius: 5px;
              }

              .status1 {
                padding: 0.2vw 1vw;
                position: absolute;
                left: 1vw;
                bottom: 1vw;
                color: #ff0317;
                font-size: 0.8vw;
                font-weight: 400;
                min-width: 4vw;
                text-align: center;
                border: 1px solid #ff0317;
                border-radius: 5px;
              }

              .unavailable {
                opacity: 0.5;
              }

              .col-md-4 {
                padding: 1vw;
                img {
                  width: 95%;
                }
              }
              .title {
                position: relative;
                padding: 1vw 1vw 1vw 0;

                .imgDiv {
                  position: relative;
                  top: 0;
                  img {
                    width: 1.2vw;
                    margin-right: 0.3vw;
                  }

                  img:last-child {
                    width: 1vw;
                    height: 1.1vw;
                    position: relative;
                    top: 0.02vw;
                  }
                }
              }

              .gameContent {
                color: #656565;
                font-size: 0.8vw;
                font-weight: 400;
                text-align: justify;
                padding-left: 1.2vw;
                padding-right: 1.2vw;
              }

              span:hover {
                cursor: pointer;
              }
            }
          }

          img {
            width: 100%;
          }
        }
      }
    }
    }

    .gameListContainer {
      margin-top:2.5vw;
    }
  }
}
</style>
