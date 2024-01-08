<template>
    <div id="inquiry_Id" class="main">
        <div class="bannerTop" :style="'background-image:url(' + detail.img_banner + ')'" style="filter: brightness(70%);">
        </div>
        <div class="content">
            <div class="innerContent">
                <span class="date">
                  <span v-if="detail.self_set_date">{{ detail.self_set_date }} </span>
                  <span v-else> {{ detail.date_create }} </span>
                </span>
                <div class="mainContent">
                    <span class="title">
                        {{ infoTitle }}
                    </span>
                    <!-- removed part -->
                    <div v-html="infoDescription">
                    </div>
                    <div id="imageGallery" v-if="detail.screenshot !=''">
                        <el-carousel id="pc" :interval="3000" type="card">
                            <el-carousel-item v-for="item in detail.screenshot" :key="item">
                                <img :src="item"  style="width:100%;z-index:1;" @click="imageClickEnlarge()">
                            </el-carousel-item>
                        </el-carousel>
                        <el-carousel id="mobile" :interval="3000" arrow="always" indicator-position="none">
                            <el-carousel-item v-for="item in detail.screenshot" :key="item">
                                <img :src="item" :data-zoom-src="item" width="100%;" style="z-index:11;">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
                <div class="bottom_share row">
                    <div class="col-md-12" v-if="typeof details.youtube_embedded != 'undefined'">
                        <iframe width="100%" height="315" :src="details.youtube_embedded" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                    </div>
                    <div class="col-md-3 categorize" @click="$router.push({path: 'info', query: { categorize: details.groupCategorize }})">
                        <span>
                            {{ $i18n.t('info_details.categorize') }} :
                        </span>
                        <span>
                            {{ $t('infoType.' + (detail.info_category_id - 1) + '.name') }}
                        </span>
                    </div>
                    <div class="col-md-9" style="display:flex;">
                        <span>
                            {{ $i18n.t('info_details.social_share') }} :
                        </span>
                        <div class="bdsharebuttonbox">
                            <a href="#" class="bds_more" data-cmd="more">
                            </a>
                            <a href="#" class="bds_fbook" data-cmd="fbook">
                            </a>
                            <a href="#" class="bds_tsina" data-cmd="tsina">
                            </a>
                            <a href="#" class="bds_weixin" data-cmd="weixin">
                            </a>
                            <a href="#" class="bds_qzone" data-cmd="qzone">
                            </a>
                            <a href="#" class="bds_renren" data-cmd="renren">
                            </a>
                            <a href="#" class="bds_tqq" data-cmd="tqq">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="navigationMobile">
                    <span @click="navigateToPage(detail.prev.id)" v-if="detail.prev.id != ''">
                        {{ $i18n.t('info_details.previous') }}
                    </span>
                    <span @click="navigateToPage(detail.next.id)" v-if="detail.next.id != ''">
                        {{ $i18n.t('info_details.next') }}
                    </span>
                </div>
            </div>
            <div id="web_page_navigation">
                <div class="page_navigation_container">
                    <img :src="detail.img" width="100%;">
                    <div class="page_navigation" v-if="detail.prev.id != ''">
                        <div class="next_previous_btn" @click="navigateToPage(detail.prev.id)">
                            <i class="el-icon-arrow-up">
                            </i>
                            {{ $i18n.t('info_details.previous') }}
                        </div>
                        <div>
                            <span style="
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                width: 100%;
                                display: block;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;"
                            >
                                {{ detail.prev.name }}
                            </span>
                        </div>
                    </div>
                    <div class="page_navigation" v-if="detail.next.id != ''">
                        <div class="next_previous_btn" @click="navigateToPage(detail.next.id)">
                            <i class="el-icon-arrow-down">
                            </i>
                            {{ $i18n.t('info_details.next') }}
                        </div>
                        <div>
                            <span
                                style="
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                width: 100%;
                                display: block;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;"
                            >
                                {{ detail.next.name }}
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
      inquiryDetails: {},

        id: 0,
        lang: 'eng',
        detail: [],
        isLoading: false,
        isShow: true,
        infoTitle: '',
        infoDescription: ''
    };
  },
  components: {},
  beforeCreate() {
    // window._bd_share_main = "";
  },
  mounted() {
    /*
    this.init();
    this.url = window.location.href;
    const that = this;
    setTimeout(() => {
      that.setShare();
    }, 0);
    */

    this.initData();
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

            this.$api.request('/Info/getDetail?id=' + this.id + '&lang=' + this.lang).then((result) => {
                if (result.status) {
                    this.detail = result.data;
                    this.infoTitle = result.data.content.title;
                    this.infoDescription = result.data.content.description;
                    this.setShare();
                }

                this.isLoading = false;
                this.isShow = true;
            }).catch(error => {
                this.$message.error(error.msg);
            });

            // this.imageClickEnlarge;
        },
        navigateToPage(infoId) {
            this.isLoading = true;
            this.isShow = false;
            this.detail = [];
            this.$router.push({
                path: 'infoDetail',
                query: {
                    id: infoId
                }
            });
        },
        setShare() {
            //分享相关代码
            window._bd_share_main = '';
            window._bd_share_config = {
                common: {
                    bdSnsKey: {},
                    bdDesc: '',
                    bdText: this.detail.content.title,
                    bdUrl: window.location.href,
                    bdMini: '1',
                    bdMiniList: false,
                    bdPic: 'https://www.bolegaming.com/' + this.detail.img,
                    bdStyle: '1',
                    bdSize: '12'
                },
                share: {}
            };
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = '../../static/api/share/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
            document.body.appendChild(s);
            //$("#tsina").html("");
            //$("#tsina").html(s);
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
        }
    },
    watch: {
        '$i18n.locale'(val) {
          // this.init();
          this.initData();
        },
        $route(to, from) {
          this.initData();
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/infodetails.scss";

@media screen and (max-width: 769px) {
  @import "../styles/mobile/infodetails.scss";
}

@media screen and (min-width: 769px) {
  @import "../styles/pc/infodetails.scss";
}

</style>
