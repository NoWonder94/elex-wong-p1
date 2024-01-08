<template>
    <div id="Homepage_Id" class="Homepage_CN">
        <div class="Container_Homepage">
            <div id="Topbanner">
                <div class="BannerTitle">
                    <h1>
                        欢迎来到客户中心
                    </h1>
                </div>
            </div>
            <div id="latest">
                <p id="latest_title">
                    最新消息
                </p>
                <div id="content" class="content">
                    <div class="info_container row">
                        <div class="info_list col-sm-12 col-md-12">
                            <template v-for="(item, index) in list">
                                <div>
                                    <div class="date-publish">
                                        <span class="publish_date">
                                            {{ item.month }}
                                        </span>
                                        <!--
                                        <span class="publish_day">
                                            <img :src="item.day">
                                        </span>
                                        -->
                                        <div class="publish_day">
                                            <img :src="item.day">
                                        </div>
                                    </div>
                                    <div class="item" data-aos="fade-in-up-mobile" data-aos-delay="200" data-aos-offset="-100" data-aos-once="true" @click="$router.push({path: 'infoDetails', query: { id: item.id }})" :key="index" v-if="infoListLength > 0">
                                        <div class="imgContainer">
                                            <img :src="item.imglogo">
                                        </div>
                                        <div class="item_content">
                                            <span
                                                class="info_name"
                                                style="
                                                color:#000;
                                                font-size:1.2vw;
                                                overflow: hidden;
                                                white-space: nowrap;
                                                text-overflow: ellipsis;
                                                width: 100%;
                                                display: block; line-height:1.2;"
                                                v-html="item.name"
                                            >
                                            </span>
                                            <span class="info_details">
                                                {{ item.info }}
                                            </span>
                                        </div>
                                        <span id="more_id" class="hvr-sweep-to-right">
                                            <!-- {{ $i18n.t('info.more') }} -->
                                            了解更多
                                        </span>
                                    </div>
                                </div>
                            </template>
                            <span v-if="infoListLength <= 0">
                                暂无数据
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="comingsoon">
                <p id="title">
                    即将推出游戏
                </p>
                <template>
                    <el-table :data="tableData" style="width:100%">
                        <el-table-column prop="gameName" label="游戏名称">
                        </el-table-column>
                        <el-table-column prop="gameCode" label="游戏Code">
                        </el-table-column>
                        <el-table-column prop="mediaDate" label="媒体包公开时间">
                        </el-table-column>
                        <el-table-column prop="testDate" label="测试公开时间">
                        </el-table-column>
                        <el-table-column prop="officialDate" label="正式营运时间">
                        </el-table-column>
                    </el-table>
                </template>
            </div>
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
      list: [],
      month_value: '',
      activeIndex: 'all',
      total: 0,
      currentPage: 1,
      loadMoreText: '',
      pageSize: 5,

      tableData: [{
            gameName: '123456',
            gameCode: '123456',
            mediaDate: '3月22日',
            testDate: '3月29日',
            officialDate: '5月6日'
          }, {
            gameName: '123456',
            gameCode: '123456',
            mediaDate: '3月22日',
            testDate: '3月29日',
            officialDate: '5月6日'
          }, {
            gameName: '123456',
            gameCode: '123456',
            mediaDate: '3月22日',
            testDate: '3月29日',
            officialDate: '5月6日'
          }]
    };
  },
  computed: {
    infoListLength() {
      return Object.values(this.info_list).length;
    }
  },
  mounted() {
    if (this.$el.clientWidth < 575.98) {
      this.pageSize = 5;
    }

    this.info = this.$i18n.t('Info');

    this.handleInfoChange('all');
  },
  methods: {
    handleInfoChange(x) {
      switch (x) {
        case 'all':
          this.info_list = this.$utils.sorting_data_bydate(
            Object.values(this.$i18n.t('Info')).slice(0, 3)
          );
          this.activeIndex = x;
          break;

        default:
          this.info_list = this.$utils.sorting_data_bydate(this.info[x]);
          this.activeIndex = x;
          break;
      }

      this.list = Object.values(this.info_list).slice(0, this.pageSize);
      return this.info_list;
    },
    onDateChange(date) {
      this.handleInfoChange(this.activeIndex);
      if (date != null) {
        let fullDate = date.getMonth() + 1 + '/' + date.getFullYear();
        this.info_list = Object.values(this.info_list).filter(item =>
          item.date.includes(fullDate)
        );
        this.list = Object.values(this.info_list).slice(0, this.pageSize);
      }
    },
    handleCurrentChange(val) {
      this.list = Object.values(this.info_list).slice(
        (val - 1) * this.pageSize,
        val * this.pageSize
      );
      $('html, body').animate(
        {
          scrollTop: $('#content').offset().top
        },
        0
      );
    },
    handleMore() {
      let totalPages = Math.ceil(this.infoListLength / this.pageSize);
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.list = Object.values(this.info_list).slice(
          0,
          this.currentPage * this.pageSize
        );
      }

      if (this.currentPage == totalPages) {
        this.loadMoreText = this.$i18n.t('info.reached_end');
      }
    }
  },
  watch: {
    '$i18n.locale'(val) {
      this.init();
    }
  }
};
</script>

<style lang="scss">
@media only screen and (min-width: 769px) {
  #Homepage_Id {
    position:relative;
  }

  .Container_Homepage {
    width:100%;
    height:100%;
    padding-top:3.3vw;
    padding-bottom:3.3vw;
    padding-left:7.9vw;

    #Topbanner {
      width:56.2vw;
      height:12.2vw;
      background-image:url(../../assets/centre/home_banner.png);
      background-size:100%;
    }

    h1 {
      font-size:1.9vw;
      padding :4.7vw 0vw 4.7vw 16.5vw;
      color:#fff;
    }

    #latest_title {
      font-size: 1.9vw;
      font-weight:bold;
      margin-top:3.1vw;

        p
        {
            margin-bottom:0;
        }
    }

    .content
    {
        margin-top:2vw;
    }

    .date {
      width:84px;
      height:147.87px;
      float:left;
    }

    #month {
      margin-top:1.4vw;
    }

    #days {
      width:2.5vw;
      height:2.5vw;
      margin-top:0.3vw;
      background-image:url(../../assets/centre/icon_date.png);
    }

    .info_img {
      width: 10.9vw;
      height: 7.7vw;
      background-image:url(../../assets/home/top_01.png);
      background-size:100% 100%;
      float:left;
    }

    .info_detail {
      width:40.2vw;
      height:7.7vw;
      float:left;
      border:1px solid #000000;
      background-color:#fff;
    }

    #mainTitle p{
      font-size:1.2vw;
      font-weight:bold;
    }

    #subTitle p{
      font-size:0.7vw;
      color:#F7F7F7s;
    }

    #info_detail el-button{
      width: 4.8vw;
      height: 1.7vw;
      float:right;
    }

    .info_container {
      width: 56vw;
      margin:0;

      .info_list {
            padding-left:0 !important;
            padding-right:0 !important;
            display:block;

            .date-publish {
                padding-top:1.4vw;
                display:inline-block;
                width:4.5vw;
                color:#656565;
                font-size:0.7vw;
                vertical-align:top;

                .publish_day {
                    margin-top:0.5vw;
                    width:2.8vw;
                    height:2.5vw;
                    overflow:hidden;

                    img {
                        position:relative;
                        top:0px;
                        //top:-44px;
                        width:100%;
                    }
                }
            }

          .item {
            display:inline-block;
            width: 51.1vw;
            overflow: hidden;
            margin-bottom: 1.1vw;
            background-color: white;
            box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.15);
            position: relative;
            cursor: pointer !important;



            .imgContainer {
              width: 10.9vw;
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
                font-size: 0.7vw;
                color: #656565;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }

            #more_id {
              position: absolute;
              bottom: 0.8vw;
              right: 1vw;
              display: table;
              font-size: 0.8vw;
              font-weight: bold;
              border: 1px solid #ff0317;
              color: #ff0317;
              border-radius: 5px;
              padding: 0.3vw 0.8vw;
              //width: 4.8vw;
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
    }

    #comingsoon {
        margin-top:5.1vw;
        width:56.2vw;

        #title
        {
            margin-bottom:0;
            font-size:1.9vw;
            font-weight:bold;
        }

      .el-table {
        margin-top:1.4vw;
        width:100%;

        tr {
          color:#fff;
          text-align:center;
          font-size:1vw;
        }

        td {
          color:#000;
          font-size:0.8vw;
          text-align:center;
        }

        th.is-leaf {
            background-color:#B81319;
            text-align:center;
            border-right:1px solid #fff;
        }
      }
    }
  }
}

@media only screen and (max-width: 769px) {
  #Homepage_Id {
    background-color:black;
    position:relative;
  }

  .Container_Homepage {
    width:100%;
    height:100%;
    border:1px solid black;
    background-color:white;
  }
}
</style>
