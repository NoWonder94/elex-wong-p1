<template>
    <div class="main" id="gameDetailMainContainer" data-aos="flip-left">
        <div class="myModal" id="myModal">
            <div class="modal-body">
                <span class="close">
                    &times;
                </span>
                <div @click="prev" class="prev">
                    &#10094;
                </div>
                <div @click="next" class="next">
                    &#10095;
                </div>
                <div class="mySlides">
                    <div class="imageBox" style="text-align:center; width:80%; margin:0 auto;">
                        <img :src="imgUrl" style="width:100%; overflow:auto;">
                    </div>
                </div>
            </div>
            <div class="column-modal" style="margin:0 auto;">
                <div class="column">
                    <span :style="'height:' + web_game_height + 'vw;'" v-for="(item, index) in demoImg" :key="index">
                        <div style="text-align:center; width:50%;margin:0 auto;">
                            <img class="hover smallPic" :src="item" @click="setImg(index, item)">
                        </div>
                    </span>
                </div>
            </div>
        </div>
        <div class="gameInfo" v-loading="isLoading">
            <div class="row" v-show="isShow">
                <div class="gameInfoContentDiv col-md-9">
                    <img class="gameImage" :src="detail.icon" style="display:inline-block;box-shadow:2px 2px 5px 1px rgba(0,0,0,0.15);">
                    <div class="gameHeader" style="display:inline-block;vertical-align:top;">
                        <!-- span -->
                        <span class="gameTitle">
                            {{ gameName }}
                        </span>
                        <div class="icon_device">
                            <!-- <img :src="$t('gameType.' + (detail.game_category_id - 1) + '.icon')" style="transform:scale(23.5); float:left;"> -->
                            <p class="ptype">
                                {{ $t('gameType.' + (detail.game_category_id - 1) + '.name') }}
                            </p>
                        </div>
                    </div>
                    <el-tabs type="card" class="gameInfoWeb" v-model="activeName">
                        <el-tab-pane :label="$i18n.t('game.introduce')" name="introduce">
                            <div v-html="gameDescription">
                            </div>
                        </el-tab-pane>
                        <el-tab-pane :label="$i18n.t('game.resource_download')" name="webdownload">
                            <table class="resource" style="width:100%;font-size:14px;" v-if="gameFile">
                                <tr>
                                    <td>
                                        .{{ detail.content.fileFormat }}
                                    </td>
                                    <td>
                                        {{ detail.content.file }}
                                    </td>
                                    <td>
                                        <a :href="detail.content.fileUrl" download>
                                            <img src="../assets/commonImage/download.svg">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </el-tab-pane>
                    </el-tabs>

                      <el-carousel class="gameCorouselWeb" indicator-position="none" :interval="4000" :style="'width:50vw;height:' + web_game_height + 'vw;'" type="card">
                          <el-carousel-item :style="'height:' + web_game_height + 'vw;'" v-for="(item, index) in demoImg" :key="index">
                              <img :src="item" :style="'width:100%;height:' + web_game_height + 'vw;'" @click="setImg(index, item)">
                          </el-carousel-item>
                      </el-carousel>
                </div>
                <div class="TableList col-md-3">
                    <el-carousel class="gameCorouselMobile" indicator-position="none" :interval="4000" :style="'width:100%;height: ' + wap_game_height + 'vw;'">
                        <el-carousel-item v-for="(item, index) in demoImg" :key="index">
                            <img :src="item" style="width:100%;">
                        </el-carousel-item>
                    </el-carousel>
                    <!-- table -->
                    <table>
                      <!-- <tr v-for="(item, index) in results.gameDetails" :key="index">
                        <td>{{ item.name }}</td>
                        <td v-html="item.describe"></td>
                      </tr> -->
                      <tr>
                        <td> {{ $i18n.t('column.gameDetail.name') }} </td>
                        <td> {{ gameName }} </td>
                      </tr>
                      <!--<tr>
                        <td> {{ $i18n.t('column.gameDetail.time') }} </td>
                        <td>
                          <span v-if="onlineTime"> {{ onlineTime }} </span>
                          <span v-else> - </span>
                        </td>
                      </tr> -->
                      <tr>
                        <td> {{ $i18n.t('column.gameDetail.type') }} </td>
                        <td> {{ $t('gameType.' + (detail.game_category_id - 1) + '.name') }} </td>
                      </tr>
                      <!--<tr>
                        <td> {{ $i18n.t('column.gameDetail.maxWin') }} </td>
                        <td>
                          <span v-if="maxWin"> {{ maxWin }} </span>
                          <span v-else> - </span>
                        </td>
                      </tr>-->
                      <tr>
                        <td> {{ $i18n.t('column.gameDetail.lang') }} </td>
                        <td>
                    		<span v-if="gameLanguage"> {{ gameLanguage }} </span>
                          	<span v-else> - </span>
                      	</td>
                        <!-- <td> {{ $i18n.t('lang.chinese') }} </td> -->

                      </tr>
                      <!--<tr>
                        <td> {{ $i18n.t('column.gameDetail.resolution') }} </td>
                        <td> <p style='margin-bottom:0'>1920 X 1080</p><p style='margin-bottom:0'>1280 X 720</p><p style='margin-bottom:0'>1136 x 640</p> </td>
                      </tr> -->
                      <tr>
                        <td> {{ $i18n.t('column.gameDetail.platform') }} </td>
                        <td> <i class='bole-icon-ios'></i><i class='bole-icon-android'></i><i class='bole-icon-html5'></i><i class='bole-icon-macOS'></i><i class='bole-icon-windows'></i> </td>
                      </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Close the Modal
export default {
  data() {
    return {
      results: {},
      activeName: 'introduce',
      web_game_height: 0,
      wap_game_height: 0,
      imgIndex: 0,
      imgUrl: '',

        id: 0,
        lang: 'eng',
        detail: [],
        isLoading: false,
        isShow: true,
        gameName: '',
        gameLanguage: '',
        gameDescription: '',
        gameFile: '',
        maxWin: '',
        onlineTime: '',
        demoImg: ''
    };
  },

  updated() {
    $('#tab-webdownload').click(e => {
      $('.el-tabs__nav').addClass('is_activated');
    });

    $('#tab-introduce').click(e => {
      $('.el-tabs__nav').removeClass('is_activated');
    });

    $('.close').click(e => {
      $('.myModal').css('display','none');
    });

    $('.imageBox').click(e => {
      $('.myModal').css('display','none');
    });

    $('.gameCorouselWeb img').click(e => {
      $('.myModal').css('display','block');
    });

    $('.smallPic').click(e => {
      $('.smallPic').css('opacity','1');
    });

    var modal = document.getElementById("myModal");

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  },

  mounted() {
    this.initData();

    // this.init();
  },

  methods: {
    initData() {
        this.id = this.$route.query.id;

        if (!this.id || this.id < 1) {
            this.$router.push({
                path: 'index'
            });
        }

        if (this.$i18n.locale == 'en') {
            this.lang = 'eng';
        } else if (this.$i18n.locale == 'zh-CN' || this.$i18n.locale == 'zh') {
            this.lang = 'chi';
        } else if (this.$i18n.locale == 'kr') {
            this.lang = 'kr';
        } else {
            this.lang = 'eng';
        }

        this.isLoading = true;
        this.isShow = false;

        this.$api.request('/Game/getDetail?id=' + this.id + '&lang=' + this.lang).then((result) => {
            if (result.status) {
                this.detail = result.data;
                this.gameName = result.data.content.title;
                this.gameLanguage = result.data.content.language;

                this.gameDescription = result.data.content.description;
                this.gameFile = result.data.content.file;
                this.maxWin = result.data.max_win;
                this.onlineTime = result.data.online_date;
                this.demoImg = result.data.screenshot;

                let x = [];
                x = this.demoImg;
                for (var i = 0; i < x.length; i++) {
                  if (x[i].id == this.$route.query.id) {
                    this.results = x[i];
                    break;
                  }
                }

                this.getImageDimensions(result.data.screenshot[0], data => {
                  let imgRatio_height = data.height * (2560 / data.width);
                  this.web_game_height = imgRatio_height * 0.010546875;
                  this.wap_game_height = imgRatio_height * 0.0381944;
                });
            }

            this.isLoading = false;
            this.isShow = true;
        }).catch(error => {
            this.$message.error(error.msg);
        });
    },

    setImg(imgIndex, imgUrl) {
        this.imgIndex = imgIndex;
        this.imgUrl = imgUrl;
    },
    next() {
        let index = ++(this.imgIndex);
        if(this.imgIndex < this.demoImg.length) {
            this.imgUrl = this.demoImg[index];
        } else {
            this.imgIndex = 0;
            this.imgUrl = this.demoImg[0];
        }
    },
    prev() {
        let index = --(this.imgIndex);
        if(this.imgIndex >= 0) {
            this.imgUrl = this.demoImg[index];
        } else {
            this.imgIndex = this.demoImg.length - 1;
            this.imgUrl = this.demoImg[this.imgIndex];

        }
    },
    init() {

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

    lightboxEffect(curr) {
      this.currentImage = curr;
      this.bg = !this.bg;
    },
  },

  watch: {
    '$i18n.locale'(val) {
        this.initData();
        // this.init();
    },
    $route(to, from) {
        this.initData();
    }
  }
};
</script>

<style lang="scss" scoped>

@import "../styles/gamedetails.scss";

@media screen and (max-width: 767px) {
 @import "../styles/mobile/gamedetails.scss";
}
@media screen and (min-width: 767px) {
 @import "../styles/pc/gamedetails.scss";
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

  .el-tabs__nav:after {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
    height: 3px;
    width: 50%;
    content: '';
    background-color: red;
    -webkit-transition: left 500ms;
    -moz-transition: left 500ms;
    -ms-transition: left 500ms;
    -o-transition: left 500ms;
    transition: left 500ms;
  }

  .is_activated:after {
    left: 50%;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item {
    color: #b1b1b1;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item:hover {
    color: #656565;
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

  .el-tabs__nav:after {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
    height: 0.2vw;
    width: 50%;
    content: '';
    background-color: red;
    -webkit-transition: left 500ms;
    -moz-transition: left 500ms;
    -ms-transition: left 500ms;
    -o-transition: left 500ms;
    transition: left 500ms;
  }

  .is_activated:after {
    left: 50%;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item {
    color: #b1b1b1;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item:hover {
    color: #656565;
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
            font-size: 1.5vw;
          }

          i:not(:last-child) {
            margin-right: 0.5vw;
          }
        }
      }
    }
  }
}

.el-loading-mask
{
    background-color:#F7F7F7 !important;
}
</style>
