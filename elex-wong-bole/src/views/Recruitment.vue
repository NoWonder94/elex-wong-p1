<template>
  <div id="recruitment_Id" class="recruitment_Container_CN">
    <div class="Banner_Top">
      <div>
        <div class="background_animate"></div>
        <div data-aos="zoom-in-responsive">
          <span>{{ $i18n.t('recruitment.title') }}</span>
        </div>
      </div>
      <div id="scene">
        <img data-depth="0.6" src="../assets/recruitment/recurit_top_img.png">
      </div>
    </div>
    <div class="content">
      <div class="first_part row">
        <div class="first_part_title col-sm-12 col-md-7" data-aos="fade-inup-right-responsive">
          <span>“Together Stronger”</span>
          <span>{{ $i18n.t('recruitment.overview') }}</span>
        </div>
        <div id="first_part_image_animation_id" class="first_part_image col-sm-12 col-md-5">
          <img src="../assets/recruitment/recurit_bg_01.png">
          <div class="overview_background_masking"></div>
          <img src="../assets/recruitment/recurit_bg_02.png">
        </div>
      </div>
      <div class="second_part" data-aos="fade-down">
        <swiper :options="second_part_swiperOption">
          <swiper-slide>
            <div class="second_part_item_container">
              <div>
                <img src="../assets/recruitment/recurit_img_01.png">
              </div>
              <div>
                <span class="personal_slogan">“ 博乐给我面对困难的勇气。”</span>
                <span class="position">市场经理 Christine Chen 台湾</span>
              </div>
            </div>
            <div class="second_part_item_container">
              <div>
                <img src="../assets/recruitment/recurit_img_02.png">
              </div>
              <div>
                <span class="personal_slogan">“ 博乐让我遇见一群好伙伴，在拼搏的路途中不孤单！”</span>
                <span class="position">游戏UI设计师 Jonathan Lim 新加坡</span>
              </div>
            </div>
            <div class="second_part_item_container">
              <div>
                <img src="../assets/recruitment/recurit_img_03.png">
              </div>
              <div>
                <span class="personal_slogan">“ 很开心能加入博乐这大家庭，团队实力坚强！”</span>
                <span class="position">商务经理 Andy Sze 香港</span>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="second_part_item_container">
              <div>
                <img src="../assets/recruitment/recurit_img_04.png">
              </div>
              <div>
                <span class="personal_slogan">“ I love BoleGaming!!”</span>
                <span class="position">高级UX设计师 Mike kuznetsov 新加坡</span>
              </div>
            </div>
            <div class="second_part_item_container">
              <div>
                <img src="../assets/recruitment/recurit_img_05.png">
              </div>
              <div>
                <span class="personal_slogan">“ 有很多机会能到国外看看，开阔自己的视野。”</span>
                <span class="position">商务专员 Sabrina Ng 菲律宾</span>
              </div>
            </div>
            <div class="second_part_item_container">
              <div>
                <img src="../assets/recruitment/recurit_img_06.png">
              </div>
              <div>
                <span class="personal_slogan">“ In BoleGaming We Trust.”</span>
                <span class="position">互联网产品经理 Thomas Jones 香港</span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <div class="third_part third_part_web" data-aos="fade-right">
        <div class="third_part_container">
          <div data-aos="fade-right" data-aos-delay="1000">
            <span>{{ $i18n.t('recruitment.duty_title') }}</span>
            <span>{{ $i18n.t('recruitment.duty') }}</span>
          </div>
          <div data-aos="fade-right" data-aos-delay="1100">
            <span>{{ $i18n.t('recruitment.Do_not_compromise_title') }}</span>
            <span>{{ $i18n.t('recruitment.Do_not_compromise') }}</span>
          </div>
          <div data-aos="fade-right" data-aos-delay="1200">
            <span>{{ $i18n.t('recruitment.passion_title') }}</span>
            <span>{{ $i18n.t('recruitment.passion') }}</span>
          </div>
          <div data-aos="fade-right" data-aos-delay="1300">
            <span>{{ $i18n.t('recruitment.faith_title') }}</span>
            <span>{{ $i18n.t('recruitment.faith') }}</span>
          </div>
          <div data-aos="fade-right" data-aos-delay="1400">
            <span>{{ $i18n.t('recruitment.open_minded_title') }}</span>
            <span>{{ $i18n.t('recruitment.open_minded') }}</span>
          </div>
          <div data-aos="fade-right" data-aos-delay="1500">
            <span>{{ $i18n.t('recruitment.growth_title') }}</span>
            <span>{{ $i18n.t('recruitment.growth') }}</span>
          </div>
        </div>
      </div>

      <div class="third_part_mobile">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide>
            <span>{{ $i18n.t('recruitment.duty_title') }}</span>
          </swiper-slide>
          <swiper-slide>
            <span>{{ $i18n.t('recruitment.Do_not_compromise_title') }}</span>
          </swiper-slide>
          <swiper-slide>
            <span>{{ $i18n.t('recruitment.passion_title') }}</span>
          </swiper-slide>
          <swiper-slide>
            <span>{{ $i18n.t('recruitment.faith_title') }}</span>
          </swiper-slide>
          <swiper-slide>
            <span>{{ $i18n.t('recruitment.open_minded_title') }}</span>
          </swiper-slide>
          <swiper-slide>
            <span>{{ $i18n.t('recruitment.growth_title') }}</span>
          </swiper-slide>
        </swiper>
        <div class="third_part_mobile_content" id="third_part_mobile_content_id">{{ content }}</div>
      </div>

      <div class="forth_part">
        <span
          class="forth_part_title"
          data-aos="zoom-in-pulse-responsive"
        >{{ $i18n.t('recruitment.bole_DNA') }}</span>
        <span data-aos="fade-up" data-aos-delay="200">
          <span class="wrapper">
            <span>{{ $i18n.t('recruitment.bole_DNA_part1') }}</span>
            <span>{{ $i18n.t('recruitment.bole_DNA_part2') }}</span>
            <span>{{ $i18n.t('recruitment.bole_DNA_part3') }}</span>
          </span>
          <span class="wrapper">
            <span>{{ $i18n.t('recruitment.bole_DNA_part4') }}</span>
            <span>{{ $i18n.t('recruitment.bole_DNA_part5') }}</span>
          </span>
        </span>
      </div>

      <div class="fifth_part" id="fifth_part_id">
        <span class="fifth_part_title">{{ $i18n.t('recruitment.here') }}</span>
        <div class="fifth_part_container" data-aos="fade-in-responsive" data-aos-delay="0">
          <div class="masking_layer_container">
            <img src="../assets/recruitment/recurit_studio_01.png">
            <div class="layer"></div>
          </div>
          <div class="fifth_path_location">
            <span>{{ $i18n.t('recruitment.singapore_workplace') }}</span>
            <span>{{ $i18n.t('recruitment.singapore') }}</span>
            <span>{{ $i18n.t('recruitment.singapore_location') }}</span>
            <div class="layer"></div>
          </div>
        </div>
        <div class="fifth_part_container" data-aos="fade-in-responsive" data-aos-delay="200">
          <div class="masking_layer_container">
            <img src="../assets/recruitment/recurit_studio_02.png">
            <div class="layer"></div>
          </div>
          <div class="fifth_path_location">
            <span>{{ $i18n.t('recruitment.agios_workplace') }}</span>
            <span>{{ $i18n.t('recruitment.agios') }}</span>
            <span>{{ $i18n.t('recruitment.agios_location') }}</span>
            <div class="layer"></div>
          </div>
        </div>
        <div class="fifth_part_container" data-aos="fade-in-responsive" data-aos-delay="400">
          <div class="masking_layer_container">
            <img src="../assets/recruitment/recurit_studio_03.png">
            <div class="layer"></div>
          </div>
          <div class="fifth_path_location">
            <span>{{ $i18n.t('recruitment.taiwan_workplace') }}</span>
            <span>{{ $i18n.t('recruitment.taiwan') }}</span>
            <span>{{ $i18n.t('recruitment.taiwan_location') }}</span>
            <div class="layer"></div>
          </div>
        </div>
        <div class="fifth_part_container" data-aos="fade-in-responsive" data-aos-delay="600">
          <div class="masking_layer_container">
            <img src="../assets/recruitment/recurit_studio_04.png">
            <div class="layer"></div>
          </div>
          <div class="fifth_path_location">
            <span>{{ $i18n.t('recruitment.Feliphina_workplace') }}</span>
            <span>{{ $i18n.t('recruitment.Feliphina') }}</span>
            <span>{{ $i18n.t('recruitment.Feliphina_location') }}</span>
            <div class="layer"></div>
          </div>
        </div>
      </div>

      <div class="vacancySection">
        <center>
          <span>{{ data.vacancy_slogan }}</span>
          <p>{{ data.vacancy_Info }}</p>
        </center>
        <el-menu class="vacancy_menu d-none d-sm-block" default-active="design" mode="horizontal">
          <el-menu-item
            index="design"
            style="width:12%;"
            @click="handleClick('design')"
          >{{ data.design_categorize }}</el-menu-item>
          <el-menu-item
            index="product"
            style="width:12%;"
            @click="handleClick('product')"
          >{{ data.product_categorize }}</el-menu-item>
          <el-menu-item
            index="market"
            style="width:12%;"
            @click="handleClick('market')"
          >{{ data.sales_categorize }}</el-menu-item>
          <el-menu-item
            index="service"
            style="width:12%;"
            @click="handleClick('service')"
          >{{ data.service_categorize }}</el-menu-item>
          <el-menu-item
            index="technique"
            style="width:12%;"
            @click="handleClick('technique')"
          >{{ data.technique_categorize }}</el-menu-item>
          <el-menu-item
            index="all"
            style="width:12%;"
            @click="handleClick('all')"
          >{{ $i18n.t('recruitment.all') }}</el-menu-item>
        </el-menu>
        <el-select class="d-block d-sm-none" :value="current" placeholder="选着类型">
          <el-option
            :label="data.design_categorize"
            value="design"
            @click.native="handleClick('design')"
          ></el-option>
          <el-option
            :label="data.product_categorize"
            value="product"
            @click.native="handleClick('product')"
          ></el-option>
          <el-option
            :label="data.sales_categorize"
            value="market"
            @click.native="handleClick('market')"
          ></el-option>
          <el-option
            :label="data.service_categorize"
            value="service"
            @click.native="handleClick('service')"
          ></el-option>
          <el-option
            :label="data.technique_categorize"
            value="technique"
            @click.native="handleClick('technique')"
          ></el-option>
          <el-option
            :label="$i18n.t('recruitment.all')"
            value="all"
            @click.native="handleClick('all')"
          ></el-option>
        </el-select>
      </div>
      <div class="vacancyDetail">
        <div>
          <ul>
            <li>{{ data.position }}</li>
            <li>{{ data.requirePax }}</li>
            <li>{{ data.location }}</li>
            <li class="d-none d-sm-none d-md-block">{{ $i18n.t('recruitment.more') }}</li>
          </ul>
        </div>
        <div class="annoucement">
          <div class="accordion" id="accordionExample">
            <div class="card" v-for="(item, index) in vancacyPlatform" :key="index">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button
                    class="btn collapsed"
                    type="button"
                    data-toggle="collapse"
                    :data-target="'#collapse' + index"
                    aria-expanded="true"
                    aria-controls="collapsone"
                  >
                    <ul>
                      <li>{{ item.name }}</li>
                      <li>{{ item.pax }}</li>
                      <li>
                        {{ item.location }}
                        <i class="el-icon-arrow-right d-md-none"></i>
                      </li>
                      <li class="d-none d-sm-none d-md-block">
                        {{ item.more_detail }}
                        <i class="el-icon-arrow-right"></i>
                      </li>
                    </ul>
                  </button>
                </h5>
              </div>

              <div
                :id="'collapse' + index"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <hr style="border-top: 1px solid rgba(255,255,255,1)">
                <div class="card-body">
                  <span>{{ $i18n.t('recruitment.job_desc') }}</span>
                  <ol>
                    <li v-for="(item, index) in item.detail.describe" :key="index">{{ item }}</li>
                  </ol>
                  <br>
                  <span>{{ $i18n.t('recruitment.job_requirement') }}</span>
                  <ol>
                    <li v-for="(item, index) in item.detail.require" :key="index">{{ item }}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="contact_background">
        <div id="maskLayer_Id"></div>
        <center id="zoom_effect">
          <span class="contact_logo">{{ $i18n.t('recruitment.contact') }}</span>
          <div class="contact_list">
            <div>
              <span
                class="contact"
                @click="$router.push({ path: '/contactUs' })"
              >{{ $i18n.t('recruitment.contact_us') }}</span>
            </div>
            <div>
              <span>Info@bolegaming.com</span>
              <span>2354679497</span>
              <span>BoleGaming</span>
              <span>BoleGaming</span>
            </div>
          </div>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import Parallax from 'parallax-js';
export default {
  data() {
    return {
      current: 'design',
      vacancyList: {},
      vancacyPlatform: {},
      data: {},
      content: '',
      second_part_swiperOption: {
        direction: 'horizontal',
        effect: 'fade',
        loop: true,
        //
        autoplay: true,
        fade: {
          crossFade: true
        }
      },
      swiperOption: {
        direction: 'horizontal',
        initialSlide: 0,
        slidesPerView: 5,
        loop: true,
        autoplay: true,
        centeredSlides: true
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },

  components: {
    swiper,
    swiperSlide
  },

  destroyed() {
    window.removeEventListener('scroll', this.scrollListener);
  },

  mounted() {
    $('#first_part_image_animation_id img').addClass('slide');
    this.init();
  },

  methods: {
    init() {
      if (this.$i18n.locale == 'en') {
        $('#recruitment_Id').removeClass('recruitment_Container_CN');
        $('#recruitment_Id').addClass('recruitment_Container_EN');
        $('#recruitment_Id').removeClass('recruitment_Container_KR');
      } else if (this.$i18n.locale == 'zh-CN') {
        $('#recruitment_Id').removeClass('recruitment_Container_EN');
        $('#recruitment_Id').addClass('recruitment_Container_CN');
        $('#recruitment_Id').removeClass('recruitment_Container_KR');
      } else {
        $('#recruitment_Id').removeClass('recruitment_Container_EN');
        $('#recruitment_Id').removeClass('recruitment_Container_CN');
        $('#recruitment_Id').addClass('recruitment_Container_KR');
      }

      this.content = this.$i18n.t('recruitment.duty');
      this.data = this.$i18n.t('basic_Info');
      this.vancacyPlatform = this.data.design;

      window.addEventListener('scroll', this.scrollListener);

      this.swiper.on('slideChangeTransitionStart', e => {
        $('#third_part_mobile_content_id').css('opacity', 0);
      });
      this.swiper.on('slideChangeTransitionEnd', e => {
        switch (this.swiper.realIndex) {
          case 0:
            this.content = this.$i18n.t('recruitment.duty');
            break;
          case 1:
            this.content = this.$i18n.t('recruitment.Do_not_compromise');
            break;
          case 2:
            this.content = this.$i18n.t('recruitment.passion');
            break;
          case 3:
            this.content = this.$i18n.t('recruitment.faith');
            break;
          case 4:
            this.content = this.$i18n.t('recruitment.open_minded');
            break;
          case 5:
            this.content = this.$i18n.t('recruitment.growth');
            break;
        }
        $('#third_part_mobile_content_id').css('opacity', 1);
      });

      this.swiper.on('tap', e => {
        this.swiper.slideTo(this.swiper.clickedIndex);
      });

      /*
      var scene = document.getElementById('scene');

      var parallaxInstance = new Parallax(scene, {
        relativeInput: true
      });
      */
    },
    handleClick(x) {
      this.current = x;
      switch (x) {
        case 'design':
          this.vancacyPlatform = this.data.design;
          break;
        case 'product':
          this.vancacyPlatform = this.data.product;
          break;
        case 'market':
          this.vancacyPlatform = this.data.market;
          break;
        case 'service':
          this.vancacyPlatform = this.data.service;
          break;
        case 'technique':
          this.vancacyPlatform = this.data.technique;
          break;
        case 'all':
          this.vancacyPlatform = Object.assign(
            {},
            this.data.design,
            this.data.product,
            this.data.market,
            this.data.service,
            this.data.technique
          );
          break;
      }
    },
    scrollListener() {
      /*
      let offsetLayer = $("#first_part_image_animation_id").offset().top;
      if( window.scrollY + 500 >= offsetLayer ){
        $("#first_part_image_animation_id img").addClass("slide");
      }else{
        //$("#first_part_image_animation_id img").removeClass("slide");
      }
      */

      let offsetLayer2 = $('#fifth_part_id').offset().top;
      if (window.scrollY + 500 >= offsetLayer2) {
        $('.masking_layer_container .layer').addClass('layer_img_active');
        $('.fifth_path_location .layer').addClass('layer_location_active');
        $('.fifth_part_container').addClass('active_fade');
      }

      let offsetLayer3 = $('#maskLayer_Id').offset().top;
      //alert(offsetLayer3);
      //alert(window.scrollY);
      if (window.scrollY + 500 >= offsetLayer3 - 400) {
        $('#maskLayer_Id').addClass('masking');
        $('#zoom_effect').addClass('zoom_effect_active');
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

<style lang="scss" scoped>
@import "../styles/recruitment.scss";

@media only screen and (max-width: 769px) {
  @import "../styles/mobile/recruitment.scss";
}

@media only screen and (min-width: 769px) {
  @import "../styles/pc/recruitment.scss";
}

</style>
<style lang="scss">
#recruitment_Id {
  .el-input {
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.15);
    .el-input__inner {
      height: 12vw;
      color: #656565;
      font-size: 4vw;
    }
    .el-icon-arrow-up:before {
      color: #656565;
      font-size: 4vw;
      font-weight: bold;
    }
  }
}
</style>
