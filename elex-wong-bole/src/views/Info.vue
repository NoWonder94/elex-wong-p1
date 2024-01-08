<template>
    <div id="Info_Id" class="Info_Container_CN">
        <div class="Banner_Top">
            <div>
                <div class="background_animate">
                </div>
                <div data-aos="zoom-in">
                    <span>
                        {{ $i18n.t('info.title') }}
                    </span>
                </div>
            </div>
            <div id="scene">
                <img data-depth="0.6" src="../assets/info/info_top_img.png">
            </div>
        </div>
        <div id="content" class="content">
            <center>
                <!-- 网页版 -->
                <el-menu class="menu_web" :default-active="activeIndex" mode="horizontal">
                    <el-menu-item index="game" @click="selectInfoType(1)">
                        {{ $i18n.t('info.game_related') }}
                    </el-menu-item>
                    <el-menu-item index="news" @click="selectInfoType(2)">
                        {{ $i18n.t('info.news_related') }}
                    </el-menu-item>
                    <el-menu-item index="activity" @click="selectInfoType(3)">
                        {{ $i18n.t('info.activities_related') }}
                    </el-menu-item>
                    <el-menu-item index="all" @click="selectInfoType(0)">
                        {{ $i18n.t('info.all') }}
                    </el-menu-item>
                </el-menu>
                <!-- //网页版 -->
                <!-- 手机版 -->
                <el-select class="menu_wap" :value="activeIndex" placeholder="--">
                    <el-option v-for="item in $t('infoType')" :value="item.name" :key="item.id" :label="item.name" @click.native="selectInfoType(item.id, item.name)">
                    </el-option>
                    <el-option :label="$i18n.t('info.all')" @click.native="selectInfoType(0,'all')" value="all">
                    </el-option>
                </el-select>
                <!-- //手机版 -->
                <div class="info_container row" v-loading="isLoading">
                    <div class="info_list col-sm-12 col-md-8" v-show="isShow">
                        <template v-for="item in list">
                            <div data-aos="fade-in-up-mobile" data-aos-delay="200" data-aos-offset="-100" data-aos-once="true" class="item" @click="navigateToPage(item.id)" :key="item.id">
                                <div class="imgContainer">
                                    <img :src="item.img">
                                </div>
                                <div class="item_content">
                                    <span class="info_date">
                                        <span v-if="item.self_set_date"> {{ item.self_set_date }} </span>
                                        <span v-else> {{ item.date_create }} </span>
                                    </span>
                                    <span class="info_name" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; width: 100%; display: block; line-height:1.2;">
                                        {{ item.content.title }}
                                    </span>
                                    <span class="info_details">
                                        {{ item.content.summary }}
                                    </span>
                                </div>
                                <span id="more_id" class="hvr-sweep-to-right">
                                    {{ $i18n.t('button.more') }}
                                </span>
                            </div>
                        </template>
                        <span v-if="totalCount == 0">
                            {{ $i18n.t('message.noData') }}
                        </span>
                        <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="totalCount" :current-page.sync="currentPage" @current-change="handleCurrentChange" class="d-none d-sm-none d-md-block" v-if="totalCount > 0">
                        </el-pagination>
                    </div>
                    <span class="d-inline-block d-sm-inline-block d-md-none load-more" @click="handleMore">
                        {{ loadMoreText }}
                        <i class="el-icon-arrow-down">
                        </i>
                    </span>
                    <div class="date_container col-sm-12 col-md-4">
                        <div class="animated fadeInUp">
                            <div class="popular">
                                <span style="border-bottom:1px solid #D0D0D0;">
                                    <i class="bole-icon-hot" style="color:red;">
                                    </i>
                                    {{ $i18n.t('info.popular_article') }}
                                </span>
                                <ol>
                                    <li v-for="(item, index) in popular_list" :key="index" v-if="index < 3">
                                        <span @click="$router.push({path: '/infoDetail', query: { id: item.id }})">
                                            {{ item.content.title }}
                                        </span>
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <!-- <el-date-picker
                          v-model="month_value"
                          type="month"
                          width="100%"
                          placeholder="请选择月份"
                          @change="onDateChange">
                        </el-date-picker>-->
                    </div>
                </div>
            </center>
        </div>
    </div>
</template>

<script>
import Parallax from 'parallax-js';
export default {
  data() {
    return {
      info: {},
      info_list: {},
      popular_list: {},
      month_value: '',
      total: 0,
      currentPage: 1,
      loadMoreText: '',

        activeIndex: 'all',
        categoryId: 0,
        page: 1,
        pageSize: 5,
        lang: 'eng',
        list: [],
        listtotal: [],
        totalPages: 0,
        totalCount: 0,
        isLoading: false,
        isShow: true,
    };
  },
  computed: {
    infoListLength() {
      return Object.values(this.info_list).length;
    }
  },
  mounted() {
    if (this.$el.clientWidth < 575.98) {
      this.pageSize = 3;
    }

    this.initData();

    // this.init();

    /*
    var scene = document.getElementById('scene');
    var parallaxInstance = new Parallax(scene, {
      relativeInput: true
    });
    */
  },
  methods: {
    initData() {
        this.isLoading = true;
        this.isShow = false;

        if (this.$i18n.locale == 'en') {
            $('#Info_Id').removeClass('Info_Container_CN');
            $('#Info_Id').addClass('Info_Container_EN');
            $('#Info_Id').removeClass('Info_Container_KR');
            this.lang = 'eng';
        } else if (this.$i18n.locale == 'zh-CN' || this.$i18n.locale == 'zh') {
            $('#Info_Id').removeClass('Info_Container_EN');
            $('#Info_Id').addClass('Info_Container_CN');
            $('#Info_Id').removeClass('Info_Container_KR');
            this.lang = 'chi';
        } else if (this.$i18n.locale == 'kr') {
            $('#Info_Id').removeClass('Info_Container_EN');
            $('#Info_Id').removeClass('Info_Container_CN');
            $('#Info_Id').addClass('Info_Container_KR');
            this.lang = 'kr';
        } else {
            $('#Info_Id').removeClass('Info_Container_CN');
            $('#Info_Id').addClass('Info_Container_EN');
            $('#Info_Id').removeClass('Info_Container_KR');
            this.lang = 'eng';
        }

        this.loadMoreText = this.$i18n.t('info.load_more');

        this.$api.request('/Info/getList?categoryId=' + this.categoryId + '&page=' + this.page + '&pageSize=' + this.pageSize + '&lang=' + this.lang).then((result) => {
            if (result.status) {
                this.list = result.data.list;
                this.totalCount = result.data.totalCount;
                this.popular_list = result.data.list;
            }

            this.isLoading = false;
            this.isShow = true;
        }).catch(error => {
            this.$message.error(error.msg);
        });
    },
    selectInfoType(categoryId, infoName) {
        this.categoryId = categoryId;
        this.activeIndex = infoName;
        this.initData();
    },
    handleCurrentChange(val) {
        this.page = val;
        this.initData();
    },
    navigateToPage(infoId) {
        this.$router.push({
            path: 'infoDetail',
            query: {
                id: infoId
            }
        });
    },
    handleMore() {
      let totalPages = Math.ceil(this.totalCount / this.pageSize);
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.$api.request('/Info/getList?categoryId=' + this.categoryId + '&page=' + this.currentPage + '&pageSize=' + this.pageSize + '&lang=' + this.lang).then((result) => {
            if (result.status) {

                let oriData = this.list;
                let data = result.data.list;
                let array = [];

                for (var i = 0; i < oriData.length; i++) {
                    array.push(oriData[i]);
                }

                for (var i = 0; i < data.length; i++) {
                    array.push(data[i]);
                }

                this.list = array;
            }

            this.isLoading = false;
            this.isShow = true;
        }).catch(error => {
            this.$message.error(error.msg);
        });
      }

      if (this.currentPage == totalPages) {
        this.loadMoreText = this.$i18n.t('info.reached_end');
      }
    }
  },
    watch: {
        '$i18n.locale'(val) {
            this.initData();
        }
    }
};
</script>

<style lang="scss" scoped>

@import "../styles/info.scss";

@media screen and (max-width: 767px) {
  @import "../styles/mobile/info.scss";
}

@media only screen and (min-width: 767px) and (max-width: 991.98px) {
  .Banner_Top {
    height: 48vw;

    #scene {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -300px;
      left: 0;
      img {
        position: absolute !important;
        top: auto !important;
        left: auto !important;
        bottom: 0 !important;
        right: 0 !important;
        width: 25%;
        animation: motion 5s infinite ease;

        @keyframes motion {
          0% {
            bottom: 0px;
          }
          50% {
            bottom: 50px;
          }
          100% {
            bottom: 0px;
          }
        }
      }
    }

    div {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      .background_animate {
        background-position: bottom;
        width: 100%;
        height: 100%;
        background-size: cover;
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
      }
      span {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        white-space: nowrap;
        transform: translateX(-50%) translateY(-50%);
        color: white;
      }
    }
  }

  .menu_wap {
    display: none;
  }

  .content {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 30px;
    .el-menu--horizontal {
      margin: 4vw 0 2.5vw 0;
      padding: 1.5vw 2.4vw 1.7vw 2.4vw;
      box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.15);
    }
    .el-menu--horizontal > .el-menu-item:not(:last-child) {
      border-right: 0.2px solid #e0e0e0;
    }

    .el-menu--horizontal > .el-menu-item:last-child {
      float: right;
    }

    .el-menu--horizontal > .el-menu-item {
      height: 1.5vw;
      line-height: 1.5vw;
      font-size: 1vw;
      padding: 0 2vw;
    }
    .el-menu-item.is-disabled {
      cursor: default;
      opacity: 1;
    }
    .el-menu--horizontal > .el-menu-item.is-active {
      color: #ff0317;
      border-bottom: transparent;
    }

    .info_container {
      .info_list {
        display: block;
        .item {
          overflow: hidden;
          margin-bottom: 1.3vw;
          background-color: white;
          box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.15);
          position: relative;
          cursor: pointer;

          .imgContainer {
            width: 35%;
            float: left;
            overflow: hidden;
            img {
              width: 100%;
            }
          }

          .item_content {
            float: left;
            max-width: 63%;
            padding-left: 2%;
            padding-top: 2%;
            text-align: left;
            span {
              display: block;
              margin-bottom: 2%;
            }

            span:first-child {
              font-size: 0.9vw;
              color: #656565;
            }
            span:nth-child(2) {
              font-size: 1.5vw;
              font-weight: bold;
              color: black;
              overflow: hidden;
              width: 100%;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span:last-child {
              font-size: 0.9vw;
              color: #656565;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              display: none;
            }
          }

          #more_id {
            position: absolute;
            bottom: 5%;
            right: 2%;
            display: table;
            font-size: 0.8vw;
            font-weight: bold;
            border: 1px solid #ff0317;
            color: #ff0317;
            border-radius: 5px;
            padding: 0.3vw 0.8vw;
            width: 16%;
          }
        }

        .item:hover {
          img {
            transition: all 0.5s;
            transform: scale(1.2);
            transform-origin: center;
          }
        }

        .load-more {
          color: #656565;

          i {
            display: block;
          }
        }
      }

      .date_container {
        .popular {
          background-color: white;
          -webkit-box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.15);
          box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.15);

          span {
            display: block;
            padding: 1vw 2vw 1vw 2vw;
            margin: 0 2vw;
            font-size: 1vw;
            text-align: left;
            font-weight: bold;
          }

          ol {
            padding: 0;
            li {
              counter-increment: list;
              list-style-type: none;
              position: relative;
              span {
                font-size: 0.8vw;
                position: relative;
                padding: 1vw 2vw 1vw 2vw;
                margin: 0 2vw;
                border-radius: 5px;
                display: block;
                cursor: pointer;

                i {
                  position: absolute;
                  right: 0.5vw;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }
            }

            li:before {
              color: red;
              content: counter(list) '.';
              position: absolute;
              left: 2vw;
              top: 50%;
              transform: translateY(-50%);
              font-weight: bold;
              text-align: right;
              font-size: 1vw;
            }
          }
        }

        .el-date-editor {
          width: 100%;
        }
      }
    }
  }
}

@media only screen and (min-width: 992px) {
  @import "../styles/pc/info.scss";
}

</style>
