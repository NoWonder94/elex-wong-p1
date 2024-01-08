<template>
    <div id="inquiry_Id" class="main">
        <div class="bannerTop" :style="'background-image:url(' + details.imgSrc + ')'" style="filter:brightness(70%);">
        </div>
        <div class="content">
            <div class="innerContent">
                <span class="date">
                    {{ details.fullDate }}
                </span>
                <div class="mainContent">
                    <span class="title">
                        {{ details.name }}
                    </span>
                    <p v-for="(item, index) in details.paragraph" :key="index" v-html="item">
                    </p>
                    <img :src="details.img1" width="80%;">
                    <p v-for="(item, index) in details.paragraph1" :key="index" v-html="item"></p>
                    <img :src="details.img2" width="80%;">
                    <p v-for="(item, index) in details.paragraph2" :key="index" v-html="item"></p>
                    <img :src="details.img3" width="80%;">
                    <p v-for="(item, index) in details.paragraph3" :key="index" v-html="item"></p>
                    <p v-for="(item, index) in details.paragraph4" :key="index" v-html="item"></p>
                    <div id="imageGallery" v-if="details.contentImage">
                        <el-carousel id="pc" :interval="3000" type="card">
                            <el-carousel-item v-for="(item, index) in details.contentImage" :key="index">
                                <img :id="'imageItem' + index" :src="item" :data-zoom-src="item" width="100%;" style="z-index:1;">
                            </el-carousel-item>
                        </el-carousel>
                        <el-carousel id="mobile" :interval="0" arrow="always" indicator-position="none">
                            <el-carousel-item v-for="(item, index) in details.contentImage" :key="index">
                                <img :id="'imageItem' + index" :src="item" :data-zoom-src="item" width="100%;" style="z-index:11;">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
                <div class="bottom_share row">
                    <div class="col-md-12" v-if="typeof details.youtube_embedded != 'undefined'">
                        <iframe width="100%" height="315" :src="details.youtube_embedded" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                    </div>
                    <div class="col-md-9" style="display:flex;">
                        <span>
                            {{ $i18n.t('info_details.social_share') }} :
                        </span>
                        <div class="bdsharebuttonbox">
                            <a href="#" class="bds_more" data-cmd="more"></a>
                            <a href="#" class="bds_fbook" data-cmd="fbook"></a>
                            <a href="#" class="bds_tsina" data-cmd="tsina"></a>
                            <a href="#" class="bds_weixin" data-cmd="weixin"></a>
                            <a href="#" class="bds_qzone" data-cmd="qzone"></a>
                            <a href="#" class="bds_renren" data-cmd="renren"></a>
                            <a href="#" class="bds_tqq" data-cmd="tqq"></a>
                        </div>
                    </div>
                </div>
                <div class="navigationMobile">
                    <span @click="handlePrevious(details.id)">
                        {{ $i18n.t('info_details.previous') }}
                    </span>
                    <span @click="handleNext(details.id)">
                        {{ $i18n.t('info_details.next') }}
                    </span>
                </div>
            </div>
            <div id="web_page_navigation">
                <div class="page_navigation_container">
                    <img :src="details.imgContent" width="100%;">
                    <div class="page_navigation">
                        <div class="next_previous_btn" @click="handlePrevious(details.id)">
                            <i class="el-icon-arrow-up">
                            </i>
                            {{ $i18n.t('info_details.previous') }}
                        </div>
                        <div>
                            <span style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis; width:100%; display:block; -webkit-line-clamp:1; -webkit-box-orient:vertical;">
                                {{ previousNewsTitle }}
                            </span>
                        </div>
                    </div>
                    <div class="page_navigation">
                        <div class="next_previous_btn" @click="handleNext(details.id)">
                            <i class="el-icon-arrow-down">
                            </i>
                            {{ $i18n.t('info_details.next') }}
                        </div>
                        <div>
                            <span style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis; width:100%; display:block; -webkit-line-clamp:1; -webkit-box-orient:vertical;">
                                {{ nextNewsTitle }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="tsina">
        </div>
    </div>
</template>
<script>
    import mediumZoom from 'medium-zoom';

    export default {
        data() {
            return {
                details: {},
                isFirstNews: false,
                isLastNews: false,
                previousNewsTitle: '',
                nextNewsTitle: '',
                inquiryDetails: {}
            };
        },
        components: {},
        beforeCreate() {
            //window._bd_share_main = "";
        },
        mounted() {
            this.init();
            this.url = window.location.href;
            const that = this;
            setTimeout(() => {
                that.setShare();
            }, 0);
        },
        methods: {
            init() {
                this.imageClickEnlarge();
                this.inquiryDetails = this.$i18n.t('Info_Details');
                this.isFirstNews = false;
                this.isLastNews = false;
                let x = [];
                x = Object.values(this.inquiryDetails);

                for (var i = 0; i < x.length; i++) {
                    if (x[i].id == this.$route.query.id) {
                        this.details = x[i];

                        if (i == 0) {
                            this.isFirstNews = true;
                            this.previousNewsTitle = '';
                            this.nextNewsTitle = x[i + 1].name;
                        }

                        if (i == x.length - 1) {
                            this.isLastNews = true;
                            this.previousNewsTitle = x[i - 1].name;
                            this.nextNewsTitle = '';
                        }

                        if (i != 0 && i != x.length - 1) {
                            this.previousNewsTitle = x[i - 1].name;
                            this.nextNewsTitle = x[i + 1].name;
                        }

                        break;
                    }
                }

                if (Object.values(this.details) == '') {
                    this.$router.push({
                        path: 'inquiry'
                    });
                }
            },
            imageClickEnlarge() {
                let clientWidth = this.$el.clientWidth;

                $(document).ready(function() {
                    const zoom = mediumZoom();
                    zoom.update({
                        margin: clientWidth > 768 ? 100 : 0,
                        background: 'rgba(0,0,0,0.8)'
                    });

                    zoom.attach('#imageGallery img');
                });
            },
            handlePrevious(x) {
                if (this.isFirstNews) {
                    this.$message.info(this.$i18n.t('info_details.first_chapter'));
                } else {
                    var int_id = parseInt(x);
                    int_id = int_id - 1;
                    var str = int_id.toString();
                    this.$router.push({
                        path: '/member/infoDetails',
                        query: { id: str, title: this.previousNewsTitle }
                    });
                    this.init();
                    this.setShare();
                }
            },
            handleNext(x) {
                if (this.isLastNews) {
                    this.$message.info(this.$i18n.t('info_details.last_chapter'));
                } else {
                    var int_id = parseInt(x);
                    int_id = int_id + 1;
                    var str = int_id.toString();
                    this.$router.push({
                        path: '/member/infoDetails',
                        query: { id: str, title: this.nextNewsTitle }
                    });
                    this.init();
                    this.setShare();
                }
            },
            setShare() {
                //分享相关代码
                window._bd_share_main = '';
                window._bd_share_config = {
                    common: {
                        bdSnsKey: {},
                        bdDesc: '',
                        bdText: this.details.name,
                        bdUrl: window.location.href,
                        bdMini: '1',
                        bdMiniList: false,
                        bdPic: 'https://www.bolegaming.com/' + this.details.imgContent,
                        bdStyle: '1',
                        bdSize: '12'
                    },
                    share: {}
                };
                const s = document.createElement('script');
                s.type = 'text/javascript';
                s.src = '/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
                document.body.appendChild(s);
                //$("#tsina").html("");
                //$("#tsina").html(s);
            }
        },
        watch: {
            '$i18n.locale'(val) {
                this.init();
            }
        }
    };
</script>
<style lang="scss" scoped>
@media screen and (max-width: 769px) {
  .main {
    padding-top:0;
    .content {
      height: auto;
      width: 80%;
      margin: 0 auto;
      padding: 8vw 0 12.5vw 0;
      .innerContent {
        width: 100%;
        .date {
          font-size: 3.5vw;
          font-weight: 500;
        }

        .title {
          font-size: 6vw;
          font-weight: 600;
          display: block;
          padding-bottom: 8vw;
        }

        p {
          font-size: 4vw;
          font-weight: 500;
          line-height: 7.5vw;
          letter-spacing: 0.1vw;
          padding-bottom: 5vw;
          color: #656565;
        }
      }

      #web_page_navigation {
        display: none;
      }
    }
  }
  .backward {
    display: none;
  }

  .bannerTop {
    width: 100%;
    height: 40vw;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .content {
    .mainContent {
      p {
        padding-bottom: 2vw;
      }

      #imageGallery {
        margin-bottom: 20px;
      }
    }
    .bottom_share {
      span {
        font-size: 4vw;
        color: #656565;
        font-weight: 500;
        position: relative;
      }

      .categorize {
        padding-bottom: 2vw;
      }
      .categorize:hover {
        cursor: pointer;
      }

      .bdsharebuttonbox {
        padding-left: 3vw;
      }
    }
  }

  .navigationContainer {
    display: none;
  }

  .navigation {
    display: none;
  }

  .navigationMobile {
    display: flex;
    text-align: center;
    justify-content: space-between;
    span {
      display: block;
      border: 1.5px solid #ff0317;
      color: #ff0317;
      padding: 1.5vw 11vw;
      border-radius: 5px;
      font-size: 4.5vw;
      font-weight: bold;
      margin-top: 8vw;
    }
  }
}

@media screen and (min-width: 769px) {
  .main {
    padding: 0;

    .content {
      width: 85%;
      display: flex;
      .innerContent {
        width: 60%;
      }
      #web_page_navigation {
        width: 40%;
        display: block;
        .page_navigation_container {
          width: 90%;
          margin: 0 auto 0 auto;
          color: #656565;
          img {
            margin-bottom: 1.6vw;
          }
          div.page_navigation {
            overflow: auto;
            div {
              margin: 0;
              padding: 0.2vw 0;
              font-size: 0.8vw;
              font-weight: lighter;
            }

            div.next_previous_btn {
              font-size: 0.9vw;
              i {
                font-size: 0.8vw;
              }
            }

            div:first-child {
              float: left;
              clear: left;
              width: 5vw;
              border: 1px solid #707070;
              border-radius: 10px;
              text-align: center;
              font-weight: 500;
              cursor: pointer;
            }

            div:last-child {
              width: 75%;
              float: left;
              font-weight: 500;
              padding-left: 1.3vw;
              position: relative;
              top: 0.1vw;
            }

            div:hover + div,
            div:nth-child(2):hover {
              cursor: pointer;
              background-color: #e6e6e6;
            }
          }

          div.page_navigation:last-child {
            margin-top: 1.1vw;
          }
        }
      }
    }
  }
  .backward {
    width: 100%;
    padding: 20px 50px;
    background-color: #f0f0f0;
    margin: 0;
  }

  .bannerTop {
    width: 100%;
    height: 23.7vw;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .content {
    margin: 0 auto;
    padding: 5.5vw 0;

    .innerContent {
      .date {
        font-size: 0.9vw;
        font-weight: 500;
      }
      .mainContent {
        span.title {
          font-size: 1.2vw;
          font-weight: 800;
          display: block;
          padding-top: 0.8vw;
          padding-bottom: 2.1vw;
        }
        p {
          font-size: 0.9vw;
          letter-spacing: 0.1vw;
          padding-bottom: 3.3vw;
          margin-bottom: 0;
          color: #656565;
        }

        #imageGallery {
          margin-bottom: 20px;
        }
      }
      .bottom_share {
        span {
          font-size: 0.8vw;
          color: #656565;
        }
        .categorize:hover {
          cursor: pointer;
        }

        .col-md-9 {
          span {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .bdsharebuttonbox {
            margin-left: 1vw;
          }
        }
      }
    }
  }

  .mainContent {
    width: 100%;
  }
  .navigationMobile {
    display: none;
  }

  .navigation {
    display: block;
    span:hover {
      cursor: pointer;
    }
  }
}
.main {
  background-color: #f0f0f0;
  .backward {
    cursor: pointer;
  }
  .navigationContainer {
    width: 100%;
    background-color: rgba(40, 40, 40, 1);
    padding-top: 20px;
    .navigationList {
      background-color: white;
      padding-top: 0;
      margin: 0 auto;
      width: 70%;
    }
  }
}
</style>

<style lang="scss">
@media screen and (max-width: 769px) {
  #mobile {
    .el-carousel__container {
      height: 50vw;
      overflow: hidden;
    }

    .el-carousel__item {
      height: auto;
    }
  }

  #pc {
    display: none;
  }
}

@media screen and (min-width: 769px) {
  #inquiry_Id {
    #mobile {
      display: none;
    }
    #pc {
      .el-carousel__container {
        height: 16vw;
      }
    }
  }
}
</style>
