<template>
    <div class="user-game-detail">
        <div class="main" id="gameDetailMainContainer" data-aos="flip-left">
            <!--
            <div class="mainTopBanner" :style="'background-image:url(' + results.imgsrc + ')'">
                <div class="filtermask">
                </div>
                <div class="BannerTitle">
                    <div>
                        <h1>
                            {{ results.name }}
                        </h1>
                    </div>
                </div>
            </div>
            -->
            <div class="gameInfo">
                <div class="row">
                    <div class="gameInfoContentDiv col-md-9">
                        <img class="gameImage" :src="gameDetail.icon" style="display:inline-block;box-shadow:2px 2px 5px 1px rgba(0,0,0,0.15);">
                        <div class="gameHeader" style="display:inline-block;vertical-align:top;">
                            <span class="gameTitle">
                                {{ gameDetail.content.title }}
                            </span>
                            <div class="icon_device">
                                <img v-for="(icon, index) in results.mobileOSIcon" :key="index" :src="icon">
                            </div>
                        </div>
                        <el-tabs type="card" class="gameInfoWeb" v-model="activeName" @tab-click="handleTabClick">
                            <el-tab-pane :label="$i18n.t('game.introduce')" name="introduce">
                                <div>
                                    {{ gameDetail.content.description }}
                                </div>
                            </el-tab-pane>
                            <el-tab-pane :label="$i18n.t('game.resource_download')" name="webdownload">
                                <table class="resource" style="width:100%;font-size:14px;">
                                    <tr style="cursor:pointer;" @click="download(gameDetail.content.fileUrl)">
                                        <td>
                                            .{{ gameDetail.content.fileFormat }}
                                        </td>
                                        <td>
                                            {{ gameDetail.content.file }}
                                        </td>
                                        <td>
                                            <a :href="gameDetail.content.fileUrl" download>
                                                <img src="../../assets/commonImage/download.svg">
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </el-tab-pane>
                            <el-tab-pane :label="$i18n.t('game.demo')" name="demo">
                            </el-tab-pane>
                        </el-tabs>

                        <el-carousel class="gameCorouselWeb" indicator-position="none" :interval="4000" :style="'width:39vw;height:' + web_game_height + 'vw;'" type="card" v-show="isShowCarousell">
                            <el-carousel-item :style="'height:' + web_game_height + 'vw;'" v-for="(item, index) in results.gameScreenshots" :key="index">
                                <img :src="item" :style="'width:100%;height:' + web_game_height + 'vw;'">
                            </el-carousel-item>
                        </el-carousel>

                    </div>
                    <!-- 旁边的咨询 -->
                    <div class="TableList col-md-3">
                        <el-carousel class="gameCorouselMobile" indicator-position="none" :interval="4000" :style="'width:100%;height: ' + wap_game_height + 'vw;'">
                            <el-carousel-item v-for="(item, index) in results.gameScreenshots" :key="index">
                                <img :src="item" style="width:100%;">
                            </el-carousel-item>
                        </el-carousel>
                        <table>
                            <tr v-for="(item, index) in results.gameDetails" :key="index">
                                <td>
                                    {{ item.name }}
                                </td>
                                <td class="side-bar-icon" v-html="item.describe">
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    const config = {
        headers: { "Authorization": "dVkrLzgxbzI0WjQyNGFWRWJLZm9GUk9KVkluelp3N29MK2N2K3l5RHJvLzRXWjQ4VWswaWpoeEtZT0JFUmplZ2xtSDRrQWEyT3FvVUJKT2s4ODlyaG5IOGRLTlpGU3hiODEyOXdzZmxEcDZqOUNBeTA2RFI0MWMwT3NnQS9GYVF4eG1ocHk1WGRFNHdiL0tweE9nWW8vbC8wWk1jZk1ETjVrYm5obmpaNU9uR2h3NGRYUXpTaXl2VjM0Y29ZcG9VRDgxQ3hOdTBNLzVKNnZjT0s0MnBqcTM1SmNBRzh3c0FnOUpINzdYNUNCcTVxMnd1bndDRUxZMytvWVVHc2t3cUpJWk4xa0h6MjhjSzdiSjNwK010ZEE9PQ%3D%3D"}
    };

export default {
  data() {
    return {
      news: {},
      results: {},
      activeName: 'introduce',
      isShowCarousell: true,
      web_game_height: 0,
      wap_game_height: 0,

        gameDetail: [],
    };
  },

  mounted() {
    this.initData();
    this.init();
  },

  updated() {
    $('#tab-webdownload').click(e => {
      $('.el-tabs__nav').addClass('is_activated');
    });

    $('#tab-introduce').click(e => {
      $('.el-tabs__nav').removeClass('is_activated');
    });
  },

  methods: {
    initData() {
        let id = this.$route.query.id;

        //axios.get('http://api.bolegaming.com/Game/getDetail?id=' + id, '', config).then((response) => {
        //axios.post('/Game/getDetail?id=' + id).then((response) => {
        this.$api.request('/Game/getDetail?id=' + id).then((result) => {
            if (result.status) {
                this.gameDetail = result.data;
                console.log(this.gameDetail);
            }
        }).catch(error => {
            this.$message.error(error.msg);
        });
    },
    init() {
      this.news = this.$i18n.t('Game_Details');

      let x = [];
      x = this.news;
      for (var i = 0; i < x.length; i++) {
        if (x[i].id == this.$route.query.id) {
          this.results = x[i];
          break;
        }
      }

      this.getImageDimensions(this.results.gameScreenshots[0], data => {
        let imgRatio_height = data.height * (2560 / data.width);
        this.web_game_height = imgRatio_height * 0.010546875;
        this.wap_game_height = imgRatio_height * 0.0381944;
      });
    },

    getImageDimensions(path, callback) {
      var img = new Image();
      img.src = path;
      img.onload = function() {
        callback({
          width: img.width,
          height: img.height
        });
      };
    },

    download(val) {
      window.location.href = val;
    },
  },

  watch: {
    '$i18n.locale'(val) {
      this.init();
    },
    'activeName':function(panelName) {
        if (panelName == 'demo') {
            this.isShowCarousell = false;
        } else {
            this.isShowCarousell = true;
        }
    }
  }
};
</script>
<!--
<style lang="scss" type="text/css">
    @import "../../styles/centre/GameDetail.scss";
</style>
-->
<style lang="scss" scoped>
@media screen and (max-width: 767px) {
  .mainTopBanner {
    height: 69.5vw;

    .BannerTitle {
      display: none;
    }
  }

  .gameInfo {
    padding: 5vw 0 16vw 0;
    .row {
      margin-left: 0;
      margin-right: 0;
      .gameInfoWeb {
        margin-top: 10vw;

        div {
          font-size: 4vw;
          color: #656565;
          padding: 2vw 0 4vw 0;
          letter-spacing: 0.2vw;
          line-height: 7.5vw;
        }

        table.resource {
          margin-bottom: 11.5vw;
          tr {
            width: 100%;
            text-align: center;

            td {
              padding: 0 0;
              font-size: 4vw;
              font-weight: 400;
              text-align: left;
              vertical-align: top;
            }

            td:first-child {
              width: 20%;
              padding-bottom: 5vw;
            }

            td:nth-child(2) {
              width: 60%;
              img {
                display: none;
              }
            }

            td:last-child {
              width: 20%;
              text-align: center;
              img {
                width: 10%;
                transform: scale(4.5);
              }
            }
          }

          tr:first-child {
            width: 100%;
            border-bottom: 0.5px solid #d0d0d0;
          }

          tr:not(:first-child) {
            border-bottom: 0.5px solid #d0d0d0;
            td {
              padding: 5vw 0;
            }
          }
        }
      }

      .gameInfoContentDiv {
        padding: 0 11.2vw;
        .gameImage {
          width: 18vw;
        }
      }
    }
  }

  .gameHeader {
    .gameTitle {
      vertical-align: top;
      font-weight: bold;
      padding-left: 3vw;
    }

    .icon_device {
      padding-left: 3vw;
      padding-top: 1vw;
      img {
        width: 5.5vw;
        margin-right: 1.5vw;
      }
    }

    span {
      font-size: 6vw;
    }
  }

  .gameCorouselWeb {
    display: none;
  }

  .TableList {
    position: relative;
    padding: 0;

    table {
      width: 90%;
      font-size: 4vw;
      color: #656565;
      background-color: white;
      margin: 7vw auto 0 auto;
      position: relative;
      tr {
        td {
          padding: 4vw 6vw;
          vertical-align: top;
          font-weight: 500;
        }
        td:first-child {
          width: 40%;
          text-align: left;
        }
        td:last-child {
          width: 60%;
          text-align: right;
        }
      }

      tr:first-child {
        td {
          padding: 9.9vw 6vw 4.5vw 6vw;
        }
      }
      tr:last-child {
        td {
          padding: 4vw 6vw 10.3vw 6vw;
        }
      }
      tr:not(:first-child):after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        width: 85%;
        border-bottom: 1.5px solid #d0d0d0;
      }
    }
  }
}
@media screen and (min-width: 767px) {
  .mainTopBanner {
    height: 50.25vw;

    .BannerTitle {
      position: absolute;
      top: 0;
      left: 0;
      display: table;
      width: 100%;
      height: 100%;

      div {
        display: table-cell;
        vertical-align: middle;
        h1 {
          font-size: 4.2vw;
          font-weight: 500;
        }
      }
    }
  }

  .gameInfo {
    padding: 5vw 12.5vw 4.4vw 7.9vw;
    .row {
      align-items: flex-start;
      .gameInfoContentDiv {
        width: 52vw;
        padding: 0;
        margin: 0 auto;
        flex: 0 0 auto;
        .gameInfoWeb {
          padding-top: 1.675vw;
          div {
            padding: 0.8vw 0 2.6vw 0;
            color: #656565;
            line-height: 2vw;
            font-size: 1vw;
            letter-spacing: 0.05vw;
          }
          table {
            tr {
              width: 100%;
              text-align: center;
              td {
                padding: 0.5vw 0;
                font-size: 0.7vw;
              }

              td:first-child {
                width: 10%;
                text-align: left;
                padding-left: 0.5vw;
              }
              td:nth-child(2) {
                width: 70%;
                text-align: left;
              }

              td:last-child {
                width: 20%;
                text-align: right;
                padding-right: 5vw;

                img {
                  width: 40%;
                  filter: brightness(150%);
                }
              }
            }
            tr:not(:first-child) {
              border-bottom: 0.1px solid #d0d0d0;
            }
            tr:first-child {
              width: 100%;
              text-align: center;
              border-bottom: 0.1px solid #d0d0d0;
              font-weight: bold;
            }
          }
        }
      }
    }
  }

  .gameHeader {
    .gameTitle {
      font-weight: bold;
      font-size: 1.9vw;
      padding: 0 0 0.5vw 1.5vw;
      display: block;
    }

    .icon_device {
      padding-left: 1.5vw;
      img {
        width: 1.2vw;
        margin-right: 0.3vw;
        vertical-align: top;
      }

      img:last-child {
        width: 1vw;
        height: 1.1vw;
        position: relative;
        top: 0.02vw;
      }
    }

    .is_ClickAble:hover {
      cursor: pointer;
    }
  }

  .TableList {
    /*padding: 1.9vw 1.4vw 6vw 1.4vw;*/
    height: auto;
    background-color: white;

    .gameCorouselMobile {
      display: none;
    }
    table {
      width: 100%;
      font-size: 0.7vw;

      tr {
        td:nth-child(1) {
          text-align: left;
        }
        td:nth-child(2) {
          text-align: right;
        }

        td {
          padding: 0.8vw 0;
          vertical-align: top;
          color: #656565;
        }
        td:first-child {
          width: 40%;
        }
        td:last-child {
          width: 60%;
        }
      }

      tr:not(:last-child) {
        border-bottom: 0.5px solid #d0d0d0;
      }
    }
  }

  .gameInfoContentDiv {
    .gameImage {
      width: 8vw;
    }
  }
}
.main {
  width: 100%;
  margin: 0 auto;
  .mainTopBanner {
    position: relative;
    background-size: cover;
    background-position: center;
    text-align: center;
    color: white;

    .filtermask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      background-color: rgba(0, 0, 0, 0.55);
    }
  }
  .gameInfo {
    background-color: #f5f5f5;
    justify-content: space-between;
    .TableList {
      height: auto;
      margin: 0;
    }
  }
}
</style>
<style lang="scss">
#gameDetailMainContainer {
  .gameInfo {
    @media screen and (min-width: 767px) {
      .el-tabs__header {
        padding: 0;
        position: relative;
        margin: 0;
        width: 96.5%;
      }

      .el-tabs__content {
        word-wrap: break-word;
        position: relative;
        width: 96%;

        .el-tab-pane {
          padding-top: 0;
        }
      }

      .el-tabs__item {
        font-size: 1.2vw;
        padding: 0vw 1vw 0.5vw 1vw;
        height: auto;
        font-weight: 500;
        background-color: transparent !important;
      }
    }

    @media screen and (max-width: 767px) {
      .el-tabs__header {
        .el-tabs__nav {
          //transform: translateX(2.5vw) !important;

          border: none;
          .el-tabs__item {
            height: auto;
            font-size: 5.2vw;
            padding: 0 8vw 3vw 8vw;
            background-color: transparent;
          }

          .is-active {
            font-weight: bold;
          }
        }
      }

      .el-tabs__content {
        .el-tab-pane {
          padding-top: 0;
        }
      }
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  text-align: center;
  margin: 0;
}

.el-carousel {
  .el-carousel__container {
    height: 100%;
  }
}

@media screen and (max-width: 767px) {
  .el-tabs__nav {
    position: relative;
    border: transparent !important;
    div {
      background-color: #f7f7f7;
    }
  }

    .user-game-detail
    {
        .el-tabs__nav:after {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 3;
            height: 3px;
            width: 33.33%;
            content: '';
            background-color: red;
            -webkit-transition: left 500ms;
            -moz-transition: left 500ms;
            -ms-transition: left 500ms;
            -o-transition: left 500ms;
            transition: left 500ms;
        }

        .is_activated:after {
            left: 33.33%;
        }
    }

  .el-tabs--card > .el-tabs__header .el-tabs__item {
    color: #b1b1b1;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item:hover {
    color: #FF0317;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    color: black;
  }

  .el-tab-pane {
    padding-top: 30px;
    font-size: 12px;
    line-height: 25px;
    letter-spacing: 0.1vw;
  }

  .TableList {
    table {
      tr {
        td {
          i {
            font-size: 5.5vw;
          }

          i:not(:last-child) {
            margin-right: 2vw;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 767px) {
  .el-tabs__nav {
    position: relative;
    border: transparent !important;
    div {
      background-color: #f7f7f7;
    }
  }

    .user-game-detail
    {
        .el-tabs__nav:after {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 3;
            height: 0.2vw;
            width: 33.33%;
            content: '';
            background-color: red;
            -webkit-transition: left 500ms;
            -moz-transition: left 500ms;
            -ms-transition: left 500ms;
            -o-transition: left 500ms;
            transition: left 500ms;
        }

        .is_activated:after {
            left: 33.33%;
        }
    }

  .el-tabs--card > .el-tabs__header .el-tabs__item {
    color: #b1b1b1;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item:hover {
    color: #FF0317;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    color: black;
  }
  .el-tab-pane {
    padding-top: 30px;
    font-size: 12px;
    line-height: 25px;
    letter-spacing: 0.1vw;
  }

  .TableList {
    table {
      tr {
        td {
          i {
            font-size:0.9vw;
          }

          i:not(:last-child) {
            margin-right: 0.2vw;
          }
        }
      }
    }
  }
}
</style>
