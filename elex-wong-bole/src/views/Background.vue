<template>
  <div id="background_Id" class="background_Container_CN">
    <div class="Banner_Top">
      <div>
        <div class="background_animate"></div>
        <div data-aos="zoom-in-responsive">
          <span>{{ $i18n.t('background.title') }}</span>
        </div>
      </div>
      <div id="scene">
        <img data-depth="0.6" src="../assets/background/background_top_img.png">
      </div>
    </div>
    <div class="content">
      <div class="overview_background">
        <div class="overview_content_masking">
          <div class="overview_content">
            <span class="title">{{ $i18n.t('background.overview_title') }}</span>
            <span class="introduce">
              <span id="animate_fade_up_id">{{ $i18n.t('background.overview') }}</span>
            </span>
            <div class="image_container">
              <div>
                <center>
                  <img src="../assets/background/background_img_poker.png">
                  <span>{{ $i18n.t('background.development') }}</span>
                </center>
              </div>
              <div>
                <center>
                  <img src="../assets/background/background_img_bigdata.png">
                  <span>{{ $i18n.t('background.big_data') }}</span>
                </center>
              </div>
              <div>
                <center>
                  <img src="../assets/background/background_img_ai.png">
                  <span>{{ $i18n.t('background.AI') }}</span>
                </center>
              </div>
              <div>
                <center>
                  <img src="../assets/background/background_img_travel.png">
                  <span>{{ $i18n.t('background.Tour_Hotel') }}</span>
                </center>
              </div>
            </div>
          </div>
        </div>
        <div class="overview_background_masking"></div>
      </div>
      <span class="label" data-aos="fade-in-right-up-responsive">
        <span>{{ $i18n.t('background.partner_title_part1') }}</span>
        <span>{{ $i18n.t('background.partner_title_part2') }}</span>
        <hr>
      </span>
      <div class="slogan" data-aos="fade-left">
        <div class="slogan_content">
          <div data-aos="fade-right" data-aos-delay="100">
            <span>{{ $i18n.t('background.strengths_title') }}</span>
            <span>{{ $i18n.t('background.strengths') }}</span>
          </div>
          <div data-aos="fade-right" data-aos-delay="200">
            <span>{{ $i18n.t('background.vision_title') }}</span>
            <span>{{ $i18n.t('background.vision') }}</span>
          </div>
          <div data-aos="fade-right" data-aos-delay="300">
            <span>{{ $i18n.t('background.strategy_title') }}</span>
            <span>{{ $i18n.t('background.strategy') }}</span>
          </div>
          <div data-aos="fade-right" data-aos-delay="400">
            <span>{{ $i18n.t('background.partner_title') }}</span>
            <span>{{ $i18n.t('background.partner') }}</span>
          </div>
        </div>
      </div>
      <div class="slogan_mobile">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide>{{ $i18n.t('background.strengths_title') }}</swiper-slide>
          <swiper-slide>{{ $i18n.t('background.vision_title') }}</swiper-slide>
          <swiper-slide>{{ $i18n.t('background.strategy_title') }}</swiper-slide>
          <swiper-slide>{{ $i18n.t('background.partner_title') }}</swiper-slide>
        </swiper>
        <div class="slogan_mobile_background" @click="handleSlideChange()">
          <div id="slogan_background_content">{{ contentSlogan }}</div>
        </div>
      </div>
      <div class="slogan2" id="slogan2_id">
        <div class="slogan2_container">
          <div>
            <center>
              <img src="../assets/background/background_img_woker.svg">
              <span style="position:relative">
                <IOdometer class="iOdometer" :value="staff"/>
                <span class="plus">+</span>
              </span>
              <span class="cn">{{ $i18n.t('background.employee') }}</span>
            </center>
          </div>
          <div>
            <center>
              <img src="../assets/background/background_img_studio.svg">
              <span>
                <IOdometer class="iOdometer" :value="workplace"/>
              </span>
              <span class="cn">{{ $i18n.t('background.workplace') }}</span>
            </center>
          </div>
          <div>
            <center>
              <img src="../assets/background/background_img_nationality.svg">
              <span>
                <IOdometer class="iOdometer" :value="nationalize"/>
              </span>
              <span class="cn">{{ $i18n.t('background.nationality') }}</span>
            </center>
          </div>
          <div>
            <center>
              <img src="../assets/background/background_img_game.svg">
              <span>
                <IOdometer class="iOdometer" :value="game"/>
              </span>
              <span class="cn">{{ $i18n.t('background.games') }}</span>
            </center>
          </div>
        </div>
      </div>
      <div class="contact_background">
        <div id="maskLayer_Id"></div>
        <center id="zoom_effect">
          <span class="contact_logo">{{ $i18n.t('background.contact') }}</span>
          <div class="contact_list">
            <div>
              <span
                class="contact"
                @click="$router.push({ path: '/contactUs' })"
              >{{ $i18n.t('background.contact_us') }}</span>
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
import IOdometer from 'vue-odometer';
import 'odometer/themes/odometer-theme-default.css';
export default {
  data() {
    return {
      contentSlogan: '',
      swiperOption: {
        direction: 'horizontal',
        initialSlide: 1,
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        slideToClickedSlide: true
      },
      staff: 0,
      workplace: 0,
      nationalize: 0,
      game: 0
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },

  components: {
    swiper,
    swiperSlide,
    IOdometer
  },
  mounted() {
    this.init();
  },
  destroyed() {
    window.removeEventListener('scroll', this.listenerIodometer);
  },
  methods: {
    init() {
      if (this.$i18n.locale == 'en') {
        $('#background_Id').removeClass('background_Container_CN');
        $('#background_Id').addClass('background_Container_EN');
        $('#background_Id').removeClass('background_Container_KR');
      } else if (this.$i18n.locale == 'zh-CN') {
        $('#background_Id').removeClass('background_Container_EN');
        $('#background_Id').addClass('background_Container_CN');
        $('#background_Id').removeClass('background_Container_KR');
      } else {
        $('#background_Id').removeClass('background_Container_CN');
        $('#background_Id').removeClass('background_Container_EN');
        $('#background_Id').addClass('background_Container_KR');
      }

      this.contentSlogan = this.$i18n.t('background.strengths');

      this.swiper.on('slideChangeTransitionEnd', e => {
        switch (this.swiper.realIndex) {
          case 0:
            this.contentSlogan = this.$i18n.t('background.strengths');
            break;
          case 1:
            this.contentSlogan = this.$i18n.t('background.vision');
            break;
          case 2:
            this.contentSlogan = this.$i18n.t('background.strategy');
            break;
          case 3:
            this.contentSlogan = this.$i18n.t('background.partner');
            break;
        }
      });

      /*
            var scene = document.getElementById('scene');

            var parallaxInstance = new Parallax(scene, {
                relativeInput: true
            });
            */

      window.addEventListener('scroll', this.listenerIodometer);

      this.swiper.on('slideNextTransitionStart', e => {
        $('#slogan_background_content').css('opacity', '0');
        $('#slogan_background_content').css('transform', 'translateX(-100px)');
      });

      this.swiper.on('slideNextTransitionEnd', e => {
        $('#slogan_background_content').css('transform', 'translateX(0px)');
        setTimeout(() => {
          $('#slogan_background_content').css('opacity', '1');
        }, 50);
      });

      this.swiper.on('slidePrevTransitionStart', e => {
        $('#slogan_background_content').css('opacity', '0');
        $('#slogan_background_content').css('transform', 'translateX(100px)');
      });

      this.swiper.on('slidePrevTransitionEnd', e => {
        $('#slogan_background_content').css('transform', 'translateX(0px)');
        setTimeout(() => {
          $('#slogan_background_content').css('opacity', '1');
        }, 50);
      });
    },

    listenerIodometer() {
      let offset = $('#slogan2_id').offset().top;
      if (window.scrollY + 500 >= offset) {
        const that = this;
        setInterval(() => {
          that.staff = 300;
          that.workplace = 7;
          that.nationalize = 12;
          that.game = 48;
        }, 500);
      }

      let offsetLayer = $('#maskLayer_Id').offset().top;
      if (window.scrollY + 500 >= offsetLayer - 400) {
        $('#maskLayer_Id').addClass('masking');
        $('#zoom_effect').addClass('zoom_effect_active');
      }

      let offsetLayer2 = $('#animate_fade_up_id').offset().top;
      if (window.scrollY + 500 >= offsetLayer2) {
        $('#animate_fade_up_id').addClass('animate_fade_up');
      }
    },

    handleSlideChange() {
      this.swiper.slideNext();
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
  @import "../styles/background.scss";

@media only screen and (max-width: 769px) {
  @import "../styles/mobile/background.scss";
}

@media only screen and (min-width: 769px) {
  @import "../styles/pc/background.scss"
}
</style>
<style>
.odometer-inside {
  display: inline !important;
}
</style>
