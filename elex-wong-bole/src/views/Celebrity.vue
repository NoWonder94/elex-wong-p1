<template>
  <div id="Celebrity_Id" class="Celebrity_CN">
    <div :class="['Banner_Top1', modify]">
      <div class="Banner_Top1_Step1 animated fadeOut_1">
        <div class="img_box animated fadeInOut_4">
          <img class="img_4" src="../assets/celebrity/img_4.png" alt>
        </div>
        <div class="img_box animated fadeInOut_3">
          <img class="img_3" src="../assets/celebrity/img_3.png" alt>
        </div>
        <div class="img_box animated fadeInOut_2">
          <img class="img_2" src="../assets/celebrity/img_2.png" alt>
        </div>
        <div class="img_box animated fadeInOut_1">
          <img class="img_1" src="../assets/celebrity/img_1.png" alt>
        </div>
      </div>
      <div class="Banner_Top1_Step2 animated fadeIn_1">
        <div class="title animated fadeInLeft_1">
          <h4 class="animated fadeIn_3">{{ $i18n.t('celebrity.title') }}</h4>
          <p class="animated fadeIn_4">{{ $i18n.t('celebrity.name') }}</p>
        </div>
        <div class="left" :style="{ bottom: bottom }">
          <div class="bg animated fadeInLeft_2">
            <div class="text">
              <p class="animated fadeIn_5">{{ $i18n.t('celebrity.slogan_one') }}</p>
              <p class="animated fadeIn_6">
                <span id="slogan" class="hide">{{ $i18n.t('celebrity.slogan_two') }}</span>
                <span>- {{ $i18n.t('celebrity.name') }}</span>
              </p>
            </div>
          </div>
          <div class="video animated fadeIn_7">
            <video-player
              class="video-player-box"
              ref="videoPlayer"
              :options="playerOptions"
              :playsinline="true"
              @ready="playerReadied"
              @play="onPlayerPlay"
            ></video-player>
          </div>
        </div>
        <div class="right animated fadeInLeft_3">
          <div class="light animated fadeIn_8"></div>
          <div class="tmc"></div>
        </div>
      </div>
    </div>
    <div :class="['Banner_Top2', active, modify2]">
      <div class="content">
        <div class="left">
          <h4>{{ $i18n.t('celebrity.info') }}</h4>
          <div class="info">
            <p>
              <span>{{ $i18n.t('celebrity.year_one') }}</span>
              {{ $i18n.t('celebrity.story_one_1') }}
              {{ $i18n.t('celebrity.story_one_2') }}
              {{ $i18n.t('celebrity.story_one_3') }}
            </p>
            <p>
              <span>{{ $i18n.t('celebrity.year_two') }}</span>
              {{ $i18n.t('celebrity.story_two_1') }}
              {{ $i18n.t('celebrity.story_two_2') }}
            </p>
            <p>
              <span>{{ $i18n.t('celebrity.year_three') }}</span>
              {{ $i18n.t('celebrity.story_three_1') }}
              {{ $i18n.t('celebrity.story_three_2') }}
              {{ $i18n.t('celebrity.story_three_3') }}
            </p>
          </div>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item :title="this.$i18n.t('celebrity.year_one')" name="1">
              <div>
                {{ $i18n.t('celebrity.story_one_1') }}
                {{ $i18n.t('celebrity.story_one_2') }}
                {{ $i18n.t('celebrity.story_one_3') }}
              </div>
            </el-collapse-item>
            <el-collapse-item :title="this.$i18n.t('celebrity.year_two')" name="2">
              <div>
                {{ $i18n.t('celebrity.story_two_1') }}
                {{ $i18n.t('celebrity.story_two_2') }}
              </div>
            </el-collapse-item>
            <el-collapse-item :title="this.$i18n.t('celebrity.year_three')" name="3">
              <div>
                {{ $i18n.t('celebrity.story_three_1') }}
                {{ $i18n.t('celebrity.story_three_2') }}
                {{ $i18n.t('celebrity.story_three_3') }}
              </div>
            </el-collapse-item>
          </el-collapse>

          <p>{{ $i18n.t('celebrity.partner') }}</p>
        </div>

        <div class="right">
          <img src="../assets/celebrity/bgimg_1.png" alt>
          <p>{{ $i18n.t('celebrity.chance') }}</p>
        </div>

        <div class="bottom">
          <p>
            {{ $i18n.t('celebrity.invite_one') }}
            <span></span>
            {{ $i18n.t('celebrity.invite_two') }}
            <span></span>
            {{ $i18n.t('celebrity.invite_three') }}
          </p>
          <p>
            {{ $i18n.t('celebrity.invite_four') }}
            <span></span>
            {{ $i18n.t('celebrity.invite_five') }}
          </p>
        </div>
      </div>
    </div>
    <div class="Pictures">
      <div class="text" data-aos="fade" data-aos-delay="500">
        <p>{{ $i18n.t('celebrity.desc_one') }}</p>
        <p>{{ $i18n.t('celebrity.desc_two') }}</p>
        <p>{{ $i18n.t('celebrity.desc_three') }}</p>
        <p>{{ $i18n.t('celebrity.desc_four') }}</p>
        <p>{{ $i18n.t('celebrity.desc_five') }}</p>
      </div>
      <div class="picture1">
        <div :style="{ transform: translateY }"></div>
      </div>
      <div class="picture2">
        <div></div>
        <div data-aos="fade" data-aos-delay="500" data-aos-duration="1000" data-aos-offset="150"></div>
      </div>
      <div class="picture3">
        <div data-aos="fade" data-aos-duration="1000"></div>
      </div>
    </div>
    <div class="Honour">
      <h4>{{ $i18n.t('celebrity.honour') }}</h4>
      <div class="timeline">
        <div class="left" data-aos="fade-right-responsive" data-aos-once="true">
          <p data-aos="fade" data-aos-delay="300" data-aos-once="true">{{ $i18n.t('celebrity.honour_one') }}</p>
          <p data-aos="fade" data-aos-delay="300" data-aos-once="true">{{ $i18n.t('celebrity.honour_two') }}</p>
          <p data-aos="fade" data-aos-delay="300" data-aos-once="true">{{ $i18n.t('celebrity.honour_three') }}</p>
        </div>
        <div class="right">
          <div
            class="events"
            data-aos="fade-right-responsive2"
            data-aos-delay="500"
            data-aos-once="true"
          >
            <ol>
              <li data-aos="fade" data-aos-delay="800" data-aos-once="true">
                <div>
                  <p>{{ $i18n.t('celebrity.timeline_year_one') }}</p>
                  <span data-aos="fade" data-aos-delay="900" data-aos-once="true" >{{ $i18n.t('celebrity.timeline_detail_one') }}</span>
                </div>
              </li>
              <li data-aos="fade" data-aos-delay="1000" data-aos-once="true">
                <div>
                  <p>{{ $i18n.t('celebrity.timeline_year_two') }}</p>
                  <span data-aos="fade" data-aos-delay="1100" data-aos-once="true">{{ $i18n.t('celebrity.timeline_detail_two') }}</span>
                </div>
              </li>
              <li data-aos="fade" data-aos-delay="1200" data-aos-once="true">
                <div>
                  <p>{{ $i18n.t('celebrity.timeline_year_three') }}</p>
                  <span data-aos="fade" data-aos-delay="1300" data-aos-once="true">{{ $i18n.t('celebrity.timeline_detail_three') }}</span>
                </div>
              </li>
              <li data-aos="fade" data-aos-delay="1400" data-aos-once="true">
                <div>
                  <p>{{ $i18n.t('celebrity.timeline_year_four') }}</p>
                  <span data-aos="fade" data-aos-delay="1500" data-aos-once="true">{{ $i18n.t('celebrity.timeline_detail_four') }}</span>
                </div>
              </li>
              <li data-aos="fade" data-aos-delay="1600" data-aos-once="true">
                <div>
                  <p>{{ $i18n.t('celebrity.timeline_year_five') }}</p>
                  <span data-aos="fade" data-aos-delay="1700" data-aos-once="true">{{ $i18n.t('celebrity.timeline_detail_five') }}</span>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="Highlight">
      <h4>{{ $i18n.t('celebrity.highlight') }}</h4>
      <div class="items">
        <transition-group name="list" tag="div">
          <div
            class="item"
            v-for="(item, index) in videosInfo"
            v-bind:key="item.title"
            @click="onItemClick(index)"
          >
            <div></div>
            <iframe
              width="100%"
              height="100%"
              :src="item.url"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <p>{{ item.title }}</p>
          </div>
        </transition-group>
      </div>
      <div class="highlightSwiperMobile">
        <p>{{ highlightSwiperTitle }}</p>
        <swiper :options="highlightSwiperOptionMobile" ref="highlightSwiper" class="swiper-no-swiping">
          <swiper-slide>
            <iframe
              id="frameId1"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/bgw6j2CpRkE"
              frameborder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </swiper-slide>
          <swiper-slide>
            <iframe
              id="frameId2"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/bY2JcN-kYJc"
              frameborder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </swiper-slide>
          <swiper-slide>
            <iframe
              id="frameId3"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/_xzcfrgNjys"
              frameborder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="swiper-button-prev swiper-button-white highlightPrev2" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white highlightNext2" slot="button-next"></div>
      </div>
    </div>
    <div class="Scenes">
      <h4>{{ $i18n.t('celebrity.scene') }}</h4>
      <swiper :options="scenesSwiperOptionPC" class="swiper-no-swiping scenesSwiperPC">
        <swiper-slide>
          <div class="img-box box1">
            <div>
              <img src="../assets/celebrity/photo_big1.png" alt>
            </div>
            <div>
              <img src="../assets/celebrity/photo_big2.png" alt>
            </div>
            <div>
              <img src="../assets/celebrity/photo_big3.png" alt>
            </div>
            <div>
              <img src="../assets/celebrity/photo_big4.png" alt>
            </div>
            <div>
              <img src="../assets/celebrity/photo_big5.png" alt>
            </div>
            <div>
              <img src="../assets/celebrity/photo_big6.png" alt>
            </div>
            <div>
              <img src="../assets/celebrity/photo_big7.png" alt>
            </div>
            <div>
              <img src="../assets/celebrity/photo_big8.png" alt>
            </div>
            <div>
              <img src="../assets/celebrity/photo_big9.png" alt>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="img-box box2">
            <div>
              <img src="../assets/celebrity/photo_big3.png" alt>
            </div>
            <div>
              <img src="../assets/celebrity/photo_big4.png" alt>
            </div>
            <div>
              <img src="../assets/celebrity/photo_big7.png" alt>
            </div>
            <div>
              <img src="../assets/celebrity/photo_big8.png" alt>
            </div>
            <div>
              <img src="../assets/celebrity/photo_big9.png" alt>
            </div>
            <div>
              <img src="../assets/celebrity/photo_big10.png" alt>
            </div>
            <div>
              <img src="../assets/celebrity/photo_big11.png" alt>
            </div>
            <div>
              <img src="../assets/celebrity/photo_big12.png" alt>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev swiper-button-white scenesPrev1" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white scenesNext1" slot="button-next"></div>
      </swiper>
      <swiper :options="scenesSwiperOptionMobile" class="swiper-no-swiping scenesSwiperMobile">
        <swiper-slide class="mb-box-1">
          <img src="../assets/celebrity/photo_big1.png" alt>
          <img src="../assets/celebrity/photo_big2.png" alt>
          <img src="../assets/celebrity/photo_big3.png" alt>
          <img src="../assets/celebrity/photo_big4.png" alt>
        </swiper-slide>
        <swiper-slide class="mb-box-2">
          <img src="../assets/celebrity/photo_big5.png" alt>
          <img src="../assets/celebrity/photo_big6.png" alt>
          <img src="../assets/celebrity/photo_big7.png" alt>
          <img src="../assets/celebrity/photo_big8.png" alt>
        </swiper-slide>
        <swiper-slide class="mb-box-3">
          <img src="../assets/celebrity/photo_big9.png" alt>
          <img src="../assets/celebrity/photo_big10.png" alt>
          <img src="../assets/celebrity/photo_big11.png" alt>
          <img src="../assets/celebrity/photo_big12.png" alt>
        </swiper-slide>
        <div class="swiper-button-prev swiper-button-white scenesPrev2" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white scenesNext2" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import mediumZoom from 'medium-zoom';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';

export default {
  data() {
    return {
      isRevealed: undefined,
      isAnimating: undefined,
      step: 0,
      modify: '',
      modify2: '',
      active: '',
      noscroll: undefined,

      activeName: '1',
      highlightSwiperTitle: '＂麦蒂时刻＂35秒拿下13分',
      highlightSwiperOptionMobile: {
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.highlightNext2',
          prevEl: '.highlightPrev2'
        }
      },
      scenesSwiperOptionPC: {
        loop: true,
        spaceBetween: '8%',
        navigation: {
          nextEl: '.scenesNext1',
          prevEl: '.scenesPrev1'
        }
      },
      scenesSwiperOptionMobile: {
        loop: true,
        navigation: {
          nextEl: '.scenesNext2',
          prevEl: '.scenesPrev2'
        }
      },

      playerOptions: {
        muted: true,
        language: 'zh',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src:
              'https://www.bolegaming.com/video/TMAC3.mp4'
          }
        ]
        //poster: "/static/images/author.jpg",
      },

      videosInfo: [
        {
          url: 'https://www.youtube.com/embed/bgw6j2CpRkE',
          title: this.$i18n.t('celebrity.video2')
        },
        {
          url: 'https://www.youtube.com/embed/NollBuDyU6Q',
          title: this.$i18n.t('celebrity.video1')
        },
        {
          url: 'https://www.youtube.com/embed/_xzcfrgNjys',
          title: this.$i18n.t('celebrity.video3')
        }
      ],

      translateY: 'translateY(0)',
      bottom: '0px',

      startX: 0,
      startY: 0
    };
  },
  components: {
    swiper,
    swiperSlide,
    videoPlayer
  },
  computed: {
    pageScroll() {
      return window.pageYOffset;
    },
    highlightSwiper() {
      return this.$refs.highlightSwiper.swiper;
    },
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  mounted() {
    this.init();
    this.hide();
    this.constyle();
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScrollPage);
    window.removeEventListener('touchstart', this.onTouchstart);
    window.removeEventListener('touchmove', this.preventDefault);
    window.removeEventListener('touchend', this.onTouchend);
  },
  methods: {
    init() {
      //手机端切换视频标题
      this.highlightSwiper.on('slideChangeTransitionEnd', e => {
        if (this.highlightSwiper.activeIndex == 0) {
          this.highlightSwiperTitle = this.$i18n.t('celebrity.video2')
        } else if (this.highlightSwiper.activeIndex == 1) {
          this.highlightSwiperTitle = this.$i18n.t('celebrity.video1')
        } else if (this.highlightSwiper.activeIndex == 2) {
          this.highlightSwiperTitle = this.$i18n.t('celebrity.video3')
        }
      });

      window.addEventListener('scroll', this.onScrollPage);
      //处理动画
      if (this.$el.clientWidth > 768) {
        //PC滚动处理
        this.disableScroll();
        this.noscroll = this.pageScroll === 0;
        if (this.pageScroll) {
          this.isRevealed = true;
          this.step = 2;
          this.modify = 'modify';
          this.active = 'active';
          this.modify2 = 'modify';
        }
      } else {
        //Mobile滑动处理
        window.addEventListener('touchstart', this.onTouchstart);

        window.addEventListener('touchmove', this.preventDefault, { passive: false });

        window.addEventListener('touchend', this.onTouchend);
      }

      //拍摄花絮图片点击放大显示
      this.imageClickEnlarge();

      //设置手机端第一屏视频距离底部的高度（iOS safari底部工具栏会挡住视频）
      let isSafariBrowser =
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent);
      let isIOS = /(iPhone|iPod|iOS)/i.test(navigator.userAgent);
      if (isSafariBrowser && isIOS) {
        if(window.innerHeight < 667) {
          this.bottom = '22px';
        }
      }
    },

    hide() {
      if (this.$i18n.locale == 'en') {
        $('#slogan').addClass('hide');
      } else  if (this.$i18n.locale == 'zh-CN' || this.$i18n.locale == 'zh'){
        $('#slogan').removeClass('hide');
      } else  if (this.$i18n.locale == 'kr'){
        $('#slogan').removeClass('hide');
      } else {
        $('#slogan').addClass('hide');
      }
    },

    constyle() {
      if (this.$i18n.locale == 'en') {
        $('#Celebrity_Id').addClass('Celebrity_EN');
        $('#Celebrity_Id').removeClass('Celebrity_CN');
        $('#Celebrity_Id').removeClass('Celebrity_KR');
      } else  if (this.$i18n.locale == 'zh-CN' || this.$i18n.locale == 'zh'){
        $('#Celebrity_Id').addClass('Celebrity_CN');
        $('#Celebrity_Id').removeClass('Celebrity_EN');
        $('#Celebrity_Id').removeClass('Celebrity_KR');
      } else  if (this.$i18n.locale == 'kr'){
        $('#Celebrity_Id').removeClass('Celebrity_CN');
        $('#Celebrity_Id').removeClass('Celebrity_EN');
        $('#Celebrity_Id').addClass('Celebrity_KR');
      } else {
        $('#Celebrity_Id').addClass('Celebrity_EN');
        $('#Celebrity_Id').removeClass('Celebrity_CN');
        $('#Celebrity_Id').removeClass('Celebrity_KR');
      }

      this.videosInfo = [{url: 'https://www.youtube.com/embed/bgw6j2CpRkE',title: this.$i18n.t('celebrity.video2')},{url: 'https://www.youtube.com/embed/NollBuDyU6Q',title: this.$i18n.t('celebrity.video1')},{url: 'https://www.youtube.com/embed/_xzcfrgNjys',title: this.$i18n.t('celebrity.video3')}];

      if (this.highlightSwiper.activeIndex == 0) {
        this.highlightSwiperTitle = this.$i18n.t('celebrity.video2')
      } else if (this.highlightSwiper.activeIndex == 1) {
        this.highlightSwiperTitle = this.$i18n.t('celebrity.video1')
      } else if (this.highlightSwiper.activeIndex == 2) {
        this.highlightSwiperTitle = this.$i18n.t('celebrity.video3')
      }
    },

    disableScroll() {
      let _this = this;
      window.onkeydown = function(event) {
        let e = event || window.event || arguments.callee.caller.arguments[0];
        let keys = [32, 37, 38, 39, 40];
        if (keys.includes(e.keyCode)) {
          _this.preventDefault(e);
          return;
        }
      };
      window.ontouchmove = this.preventDefault;
    },
    enableScroll() {
      window.ontouchmove = window.onkeydown = null;
    },
    preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault) e.preventDefault();
      e.returnValue = false;
    },
    onScrollPage() {
      let scrollVal = window.pageYOffset;
      if (this.$el.clientWidth > 768) {
        // 设置图片picture1滚动样式
        if (scrollVal > 300 && scrollVal < 900) {
          let val = 0;
          val = scrollVal / 8 - 50;
          this.translateY = 'translateY(' + parseInt(val) + 'px)';
        }

        if (this.noscroll) {
          if (scrollVal < 0) return false;
          window.scrollTo(0, 0);
        }

        if (this.isAnimating) {
          return false;
        }

        if (scrollVal <= 0 && this.isRevealed) {
          this.toggle(0);
        } else if (scrollVal > 0 && !this.isRevealed) {
          this.toggle(1);
        }

      } else {
        // 设置图片picture1滚动样式
        if (scrollVal > 400 && scrollVal < 900) {
          let val = 0;
          val = scrollVal / 10 - 40;
          this.translateY = 'translateY(' + parseInt(val) + 'px)';
        }
      }
    },
    toggle(reveal) {
      this.isAnimating = true;

      if (reveal) {
        this.step++;
        //暂停视频
        this.player.pause();

        if (this.step == 1) {
          this.modify = 'modify';
          this.active = 'active';
        } else if (this.step == 2) {
          this.modify2 = 'modify';
        }
      } else {
        if (this.step == 2) {
          this.step = 0;
          this.modify = '';
          this.modify2 = '';
          this.active = '';
        }

        this.noscroll = true;
        this.disableScroll();
      }

      setTimeout(() => {
        if (this.step == 1) {
          this.isRevealed = false;
          this.isAnimating = false;
        } else {
          this.isRevealed = !this.isRevealed;
          this.isAnimating = false;
          if (reveal) {
            this.noscroll = false;
            this.enableScroll();
          }
        }
      }, 1200);
    },
    onTouchstart(e) {
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
    },
    onTouchend(e) {
      let moveEndX, moveEndY, X, Y;
      let scrollVal = window.pageYOffset;

      moveEndX = e.changedTouches[0].pageX;
      moveEndY = e.changedTouches[0].pageY;
      X = moveEndX - this.startX;
      Y = moveEndY - this.startY;

      if ( Y > 0 && Math.abs(Y)>Math.abs(X)) {
        //console.log('手指从上往下滑动');

        if (scrollVal <= 0 && this.step == 2) {
          window.addEventListener('touchmove', this.preventDefault, { passive: false });
          this.step = 0;
          this.modify = '';
          this.modify2 = '';
          this.active = '';
        }

      }else if ( Y < 0  && Math.abs(Y)>Math.abs(X) ) {
        //console.log('手指从下往上滑动');
        //暂停视频
        this.player.pause();

        if(this.step < 2) {
          this.step++;
          if (this.step == 1) {
            this.modify = 'modify';
            this.active = 'active';
          } else if (this.step == 2) {
            this.modify2 = 'modify';
            setTimeout(()=>{
              window.removeEventListener('touchmove', this.preventDefault, { passive: true });
            },1500)
          }
        }
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
        zoom.attach('.Scenes img');
      });
    },
    onItemClick(index) {
      //切换视频位置
      this.videosInfo[1].url = this.videosInfo[1].url.replace(/\?autoplay=1/gi,'');
      if (index != 1) {
        let newCurrentValue = this.videosInfo.splice(index, 1, this.videosInfo[1])[0];
        newCurrentValue.url = newCurrentValue.url + '?autoplay=1';
        this.videosInfo.splice(1, 1, newCurrentValue);
      }
    },
    playerReadied(player) {
      setTimeout(() => {
        player.play();
      }, 6000);
    },
    onPlayerPlay(player) {
      setTimeout(() => {
        player.muted(false)
      }, 100)
    },
  },

  watch: {
    '$i18n.locale'(val) {
      this.hide();
      this.constyle();
    }
  }
};
</script>

<style lang="scss">
@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.fadeInOut_1 {
  animation-name: fadeInOut;
  animation-delay: 0.5s !important;
}

.fadeInOut_2 {
  animation-name: fadeInOut;
  animation-delay: 1s !important;
}

.fadeInOut_3 {
  animation-name: fadeInOut;
  animation-delay: 1.5s !important;
}

.fadeInOut_4 {
  animation-name: fadeInOut;
  animation-delay: 2s !important;
}

.fadeOut_1 {
  animation-name: fadeOut;
  animation-delay: 2s !important;
}

.fadeIn_1 {
  animation-name: fadeIn;
  animation-delay: 2.5s !important;
}

.fadeIn_3 {
  @media screen and (max-width: 769px) {
    animation-name: fadeIn;
    animation-delay: 4.3s !important;
  }

  @media screen and (min-width: 769px) {
    animation-name: fadeIn;
    animation-delay: 2.8s !important;
  }
}

.fadeIn_4 {
  @media screen and (max-width: 769px) {
    animation-name: fadeIn;
    animation-delay: 4.5s !important;
  }

  @media screen and (min-width: 769px) {
    animation-name: fadeIn;
    animation-delay: 3.2s !important;
  }
}

.fadeIn_5 {
  animation-name: fadeIn;
  animation-delay: 4.7s !important;
}

.fadeIn_6 {
  animation-name: fadeIn;
  animation-delay: 4.9s !important;
}

.fadeIn_7 {
  @media screen and (max-width: 769px) {
    animation-name: fadeInLeft;
    animation-delay: 2.4s !important;
  }

  @media screen and (min-width: 769px) {
    animation-name: fadeIn;
    animation-delay: 4.8s !important;
  }
}

.fadeInLeft_1 {
  @media screen and (max-width: 769px) {
    animation-name: fadeInLeft;
    animation-delay: 3.5s !important;
  }

  @media screen and (min-width: 769px) {
    animation-name: fadeIn;
  }
}

@keyframes fadeInLeft_2 {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fadeInLeft_2 {
  animation-name: fadeInLeft_2;
  -webkit-animation-name: fadeInLeft_2;
  animation-duration: 1s;
  animation-delay: 3.8s;
}

@keyframes fadeInLeft_3 {
  from {
    opacity: 0;
    transform: translateX(0vw);
  }

  to {
    opacity: 1;
    transform: translateX(64vw);
  }
}

.fadeInLeft_3 {
  @media screen and (max-width: 769px) {
    animation-name: fadeIn;
    -webkit-animation-name: fadeIn;
    animation-duration: 1s;
    animation-delay: 3.2s;
  }

  @media screen and (min-width: 769px) {
    animation-name: fadeInLeft_3;
    -webkit-animation-name: fadeInLeft_3;
    animation-duration: 2s;
    animation-delay: 2.5s;
  }
}

.fadeIn_8 {
  @media screen and (max-width: 769px) {
    animation-name: fadeIn;
    animation-delay: 3.5s !important;
  }

  @media screen and (min-width: 769px) {
    animation-name: fadeIn;
    animation-delay: 3.8s !important;
  }
}

[data-aos='fade-right-responsive'] {
  transition-property: transform, opacity;
  @media screen and (max-width: 769px) {
    opacity: 0;
    transform: translateX(-100%);
    &.aos-animate {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  @media screen and (min-width: 769px) {
    opacity: 0;
    transform: translateX(-100%);
    &.aos-animate {
      opacity: 1;
      transform: translateX(0px);
    }
  }
}

[data-aos='fade-right-responsive2'] {
  transition-property: transform, opacity;
  @media screen and (max-width: 769px) {
    opacity: 0;
    transform: translateY(-100%);
    &.aos-animate {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @media screen and (min-width: 769px) {
    opacity: 0;
    transform: translateX(-100%);
    &.aos-animate {
      opacity: 1;
      transform: translateX(0px);
    }
  }
}

@media only screen and (min-width: 769px) {
  #Celebrity_Id {
    background-color: black;
    position: relative;
  }

  .Banner_Top1 {
    height: 100%;
    width: 100%;
    padding-top: 5.4vw;
    position: relative;
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    transition-duration: 1.2s;

    &.modify {
      opacity: 0;
      transform: translateY(-100%) scale(0.9);
    }

    .Banner_Top1_Step1 {
      height: calc(100vh - 5.4vw);
      display: flex;
      flex-direction: row;
      overflow: hidden;

      .img_box {
        height: 100%;
        flex: 1;
        position: relative;

        img {
          height: 100%;
          margin: auto;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .img_3 {
          height: 72%;
        }

        .img_2 {
          height: 92%;
        }

        .img_1 {
          height: 92%;
        }
      }
    }

    .Banner_Top1_Step2 {
      height: calc(100vh - 5.4vw);
      width: 100%;
      position: absolute;
      top: 5.4vw;
      z-index: 11;
      color: white;

      .title {
        margin-left: 9.8vw;
        margin-top: 2.5vw;

        h4 {
          display: inline-block;
          font-size: 2.1vw;
          font-weight: 700;
          margin: 0;
        }

        p {
          margin: 0;
          margin-left: 4.8vw;
          display: inline-block;
          font-size: 2.5vw;
          font-weight: 700;
        }
      }

      .left {
        position: absolute;
        left: 0;
        margin-top: 1.9vw;
        z-index: 10;

        .bg {
          width: 58.4vw;
          height: 62.1vh;
          display: block;
          background-color: #500101;
          margin-top: 7.4vh;
          position: relative;
          overflow: hidden;

          .text {
            position: absolute;
            bottom: 2.3vh;
            left: 12.5vw;
            width: 40vw;

            p {
              margin: 0;
              font-size: 1.2vw;
            }

            span:nth-child(2) {
              margin-left: 12vw;
              font-size: 0.8vw;
            }
          }
        }

        .video {
          width: 58.5vw;
          height: 58.4vh;
          display: block;
          background-color: black;
          position: absolute;
          top: 0;
          left: 7vw;

          .video-player-box {
            width: 100%;
            height: 100%;

            .video-js {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .right {
        height: calc(100vh - 5.4vw);
        position: absolute;
        top: 0;

        .light {
          width: 32.3vw;
          height: 57.5vh;
          background: url('../assets/celebrity/light1.png') no-repeat;
          background-size: contain;
        }

        .tmc {
          position: absolute;
          right: 0.9vw;
          top: 13.7vh;
          z-index: 10;
          width: 29.9vw;
          height: 76.7vh;
          background: url('../assets/celebrity/tmc.png') no-repeat;
          background-size: contain;
        }
      }
    }
  }

  .hide {
    visibility:hidden;
  }

  .Banner_Top2 {
    height: 100%;
    width: 100%;
    padding-top: 5.4vw;
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    transition-duration: 1.2s;
    transform: translateY(100vh);
    position: absolute;
    top: 0;
    opacity: 0;

    .content {
      height: calc(100vh - 5.4vw);
      padding-top: 5.3vh;
      opacity: 0;
      transition-property: opacity;
      transition-duration: 1s;
      transition-delay: 0.5s;

      .left {
        background-color: black;
        position: absolute;
        left: 10vw;
        z-index: 10;
        width: 39.6vw;
        height: calc(100vh - 5.4vw);
        color: white;
        opacity: 0;
        transition-duration: 1s;
        transition-delay: 0.5s;
        overflow: hidden;
        transform: translateX(-100%);

        h4,
        & > p {
          margin: 0;
          margin-right: 4vw;
        }

        h4 {
          font-size: 1.9vw;
          opacity: 0;
          transition-duration: 1s;
          transition-delay: 1.5s;
        }

        & > p {
          font-size: 1.2vw;
          font-weight: 700;
          opacity: 0;
          transition-duration: 1s;
          transition-delay: 1.6s;
          transform: translateY(40vh);
        }

        .info {
          background-color: #500101;
          margin: 2vw 3vw 2vw 0;
          padding: 4.8vh 1vw;
          box-sizing: border-box;
          width: 0vw;
          min-height: 37vh;
          transition-duration: 1.2s;
          transition-delay: 0.5s;

          p {
            font-size: 0.9vw;
            min-width: 35vw;
            opacity: 0;
            transition-duration: 1s;
            transition-delay: 1.6s;
            transform: translateY(10vh);
          }

          span {
            font-size: 1.2vw;
            font-weight: 700;
          }
        }

        .el-collapse {
          display: none;
        }
      }

      .right {
        margin: 0 auto;
        position: relative;

        img {
          width: 75vw;
          height: 67.2vh;
          display: block;
          margin: 0 auto;
          object-fit: cover;
          object-position: right;
        }

        p {
          margin: 0 auto;
          text-align: center;
          color: white;
          font-size: 1.9vw;
          background-color: rgba(0, 0, 0, 0.55);
          height: 11.9vh;
          line-height: 11.9vh;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          transition-duration: 1s;
        }
      }

      .bottom {
        transition-duration: 1s;
        transition-delay: 0.5s;
        margin-top: 1vh;

        p {
          margin: 0 auto;
          text-align: center;
          color: white;
          width: 43.8vw;
          font-size: 1.2vw;
        }
      }
    }

    &.active {
      transform: translateY(0);
      opacity: 1;

      .content {
        opacity: 1;
      }
    }

    &.modify {
      .left {
        opacity: 1;
        transform: translateX(0);

        h4 {
          opacity: 1;
        }

        & > p {
          opacity: 1;
          transform: translateY(0);
        }

        .info {
          width: 37vw;

          p {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }

      .right p {
        opacity: 0;
      }

      .bottom {
        opacity: 0;
      }
    }
  }

  .Pictures {
    position: relative;
    z-index: 9;

    .text {
      display: none;
    }

    .picture1 {
      margin-left: 29.6vw;
      width: 28.1vw;
      height: 37.6vh;
      position: relative;
      overflow: hidden;

      div {
        width: 33.72vw;
        height: 45.12vh;
        background: url('../assets/celebrity/bgimg_2.png') no-repeat;
        background-size: cover;
        background-position: bottom right;
        transition-duration: 0.2s;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }

    .picture2 {
      margin-left: 60.3vw;
      margin-top: -24.5vh;
      position: relative;

      div {
        width: 22.8vw;
        height: 60.7vh;
        background: url('../assets/celebrity/bgimg_3.1.png') no-repeat;
        background-size: cover;
        background-position: right;
      }

      div:nth-child(2) {
        position: absolute;
        top: 0;
        left: 0;
        background: url('../assets/celebrity/bgimg_3.2.png') no-repeat;
        background-size: cover;
        background-position: right;
      }
    }

    .picture3 {
      margin-top: 14.4vh;

      div {
        width: 100%;
        height: 38vh;
        background: url('../assets/celebrity/bgimg_4.png') no-repeat;
        background-size: cover;
      }
    }
  }

  .Honour {
    background-color: #d5d5d5;
    padding: 11.2vh 0 12vw 0;
    height: 71.4vh;

    h4 {
      margin-left: 9.8vw;
      font-size: 1.9vw;
    }

    .timeline {
      margin-top: 9.7vh;
      position: relative;

      .left {
        background-color: #500101;
        width: 35.3%;
        height: 19.6vh;
        padding: 4vh 0 0;

        p {
          font-size: 1.2vw;
          color: #fff;
          margin: 0;
          margin-left: 12.5vw;
        }
      }

      .right {
        position: relative;

        .events {
          position: absolute;
          z-index: 1;
          left: 35.3%;
          bottom: 0px;
          height: 2px;
          background: #500101;
          width: 64.7%;
        }

        .events ol {
          list-style: none;

          li:nth-child(2n) {
            div {
              top: 0vw;
              margin-bottom: 0px;
              padding-bottom: 0.5vw;

              &::before {
                bottom: -2.4vw;
              }

              &::after {
                bottom: 0.2vw;
              }

              p {
                margin-top: 3.8vw;
              }
            }
          }

          li:nth-child(1) {
            div {
              left: 8.3vw;
              width: 7.5vw;
            }
          }

          li:nth-child(2) {
            div {
              left: 14.85vw;
              width: 8.4vw;
            }
          }

          li:nth-child(3) {
            div {
              left: 21.85vw;
              width: 8.4vw;

              &:before {
                height: 4vw;
              }
            }
          }

          li:nth-child(4) {
            div {
              left: 25.6vw;
              width: 14.9vw;
            }
          }

          li:nth-child(5) {
            div {
              left: 33.4vw;
              width: 13.3vw;

              &:before {
                height: 4vw;
              }
            }
          }
        }

        .events li div {
          position: absolute;
          bottom: 0;
          z-index: 2;
          text-align: center;
          color: #500101;
          margin-bottom: 3vw;
          padding-bottom: 1.5vw;

          &::before {
            content: '';
            position: absolute;
            width: 1px;
            height: 3vw;
            background: #500101;
            bottom: -3.2vw;
            left: 0;
            right: 0;
            margin: auto;
          }

          &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            bottom: -3.2vw;
            height: 8px;
            width: 8px;
            border-radius: 50%;
            border: 2px solid #b81319;
            background-color: #b81319;
          }

          p {
            margin: 0;
            font-size: 1.7vw;
            font-weight: bold;
          }

          span {
            font-size: 0.9vw;
            display: block;
            height: 35px;
          }
        }
      }
    }
  }

  .Highlight {
    padding: 16.5vh 9.8vw 0;

    h4 {
      font-size: 1.9vw;
      color: white;
    }

    .highlightSwiperMobile {
      display: none;
    }

    .items {
      width: 100%;
      overflow: hidden;
      height: 43vh;
      padding-bottom: 3vh;
      position: relative;

      & > div {
        width: 100%;
        height: 100%;
      }

      .item {
        width: 28%;
        height: 24.6vh;
        position: relative;
        display: inline-block;
        transition-duration: 0.5s;

        div {
          width: 100%;
          height: 100%;
          z-index: 10;
          position: absolute;
          left: 0;
          top: 0;
        }

        p {
          text-align: center;
          color: #fff;
          font-size: 0.8vw;
        }
      }

      .item:nth-child(2) {
        width: 40%;
        height: 37vh;
        margin: 0 2%;
        position: relative;
        top: 2vh;

        div {
          z-index: -1;
        }

        p {
          font-size: 1.2vw;
        }
      }

      .item:nth-child(3) {
        position: absolute;
        right: 0px;
        bottom: 6vh;
      }
    }
  }

  .Scenes {
    padding: 23.1vh calc(9.8vw - 4%) 20.2vh;

    h4 {
      font-size: 1.9vw;
      color: white;
      margin-left: 4vw;
    }

    .scenesSwiperMobile {
      display: none;
    }

    .swiper-container.scenesSwiperPC {
      margin-top: 8.9vh;
      padding: 0 6.7%;

      .swiper-slide {
        .img-box {
          width: 100%;
          height: 63.5vh;
          position: relative;

          div {
            margin: 0.25vw;
            position: absolute;
            overflow: hidden;
          }

          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }

          img:hover {
            transition: all 0.5s;
            transform: scale(1.2);
            transform-origin: center;
          }
        }

        .img-box.box1 {
          div:nth-child(1) {
            width: 19.3vw;
            height: 31.8vh;
          }

          div:nth-child(2) {
            width: 21.9vw;
            height: 22.7vh;
            left: 19.8vw;
          }

          div:nth-child(3) {
            width: 21.9vw;
            height: 22.7vh;
            left: 42.2vw;
          }

          div:nth-child(4) {
            width: 10.3vw;
            height: 22.7vh;
            left: 64.6vw;
          }

          div:nth-child(5) {
            width: 19.3vw;
            height: 30.7vh;
            top: 32.8vh;
          }

          div:nth-child(6) {
            width: 17.6vw;
            height: 39.8vh;
            top: 23.7vh;
            left: 19.8vw;
          }

          div:nth-child(7) {
            width: 17.6vw;
            height: 39.8vh;
            top: 23.7vh;
            left: 37.9vw;
          }

          div:nth-child(8) {
            width: 18.9vw;
            height: 19vh;
            top: 23.7vh;
            left: 56vw;
          }

          div:nth-child(9) {
            width: 18.9vw;
            height: 19vh;
            top: 43.7vh;
            left: 56vw;

            img {
              object-position: top;
            }
          }
        }

        .img-box.box2 {
          div:nth-child(1) {
            width: 24.3vw;
            height: 22.7vh;
          }

          div:nth-child(2) {
            width: 10.3vw;
            height: 22.7vh;
            left: 24.8vw;
          }

          div:nth-child(3) {
            width: 14vw;
            height: 40.3vh;
            top: 23.7vh;
          }

          div:nth-child(4) {
            width: 20.6vw;
            height: 19.65vh;
            top: 23.7vh;
            left: 14.5vw;
          }

          div:nth-child(5) {
            width: 20.6vw;
            height: 19.65vh;
            top: 44.35vh;
            left: 14.5vw;

            img {
              object-position: top;
            }
          }

          div:nth-child(6) {
            width: 19.5vw;
            height: 63.5vh;
            left: 35.6vw;
          }

          div:nth-child(7) {
            width: 19.5vw;
            height: 31.5vh;
            left: 55.6vw;
          }

          div:nth-child(8) {
            width: 19.5vw;
            height: 31.5vh;
            top: 32.5vh;
            left: 55.6vw;

            img {
              object-position: top;
            }
          }
        }
      }

      .scenesPrev1 {
        left: 4vw;
      }

      .scenesNext1 {
        right: 4vw;
      }
    }
  }
}

@media only screen and (max-width: 769px) {
  #Celebrity_Id {
    background-color: black;
    position: relative;
  }

  .Banner_Top1 {
    height: 100%;
    width: 100%;
    padding-top: 18.1vw;
    position: relative;
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    transition-duration: 1.2s;

    &.modify {
      opacity: 0;
      transform: translateY(-100%) scale(0.9);
    }

    .Banner_Top1_Step1 {
      height: calc(100vh - 18.1vw);

      .img_box {
        height: calc(100vh - 18.1vw);
        width: 100%;
        position: absolute;
        right: 0;

        img {
          height: 100%;
          margin: auto;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .img_3 {
          height: 80%;
          right: -20%;
        }

        .img_2 {
          height: 60%;
        }

        .img_1 {
          height: 90%;
        }
      }
    }

    .Banner_Top1_Step2 {
      height: calc(100vh - 18.1vw);
      width: 100%;
      position: absolute;
      top: 18.1vw;
      z-index: 11;
      color: white;

      .title {
        width: 72.8vw;
        height: 7.4vh;
        text-align: center;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        background-color: #500101;
        z-index: 10;
        padding-top: 2.3vh;
        margin-top: 3.3vh;

        h4 {
          font-size: 4.8vw;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          top: -2vh;
        }

        p {
          font-size: 5.3vw;
          font-weight: bold;
          margin: 0;
        }
      }

      .left {
        width: 100%;
        height: calc(100vh - 18.1vw - 48vh);
        position: absolute;
        bottom: 0;
        z-index: 9;

        .bg {
          .text {
            display: none;
          }
        }

        .video {
          height: 32.5vh;
          width: 100%;
          display: block;
          background-color: black;

          .video-player-box {
            width: 100%;
            height: 100%;

            .video-js {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .right {
        overflow: hidden;
        position: relative;
        text-align: center;
        height: 48vh;

        .light {
          width: 74.8vw;
          height: 42vh;
          margin: 0 auto;
          margin-top: 2.5vh;
          background: url('../assets/celebrity/mb_light.png') no-repeat;
          background-size: 100%;
        }

        .tmc {
          position: absolute;
          right: 8%;
          top: 11.4vh;
          z-index: 10;
          width: 78.6vw;
          height: 44.8vh;
          background: url('../assets/celebrity/mb_tmc.png') no-repeat;
          background-size: 100%;
        }
      }
    }
  }

  .hide {
    visibility:hidden;
  }

  .Banner_Top2 {
    height: 100%;
    width: 100%;
    padding-top: 18.1vw;
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    transition-duration: 1.2s;
    transform: translateY(100vh);
    position: absolute;
    top: 0;
    opacity: 0;

    .content {
      height: calc(100vh - 18.1vw);
      width: 100%;
      position: relative;

      .left {
        width: 100%;
        position: absolute;
        top: 30vh;
        transition-duration: 1s;
        transition-delay: 1s;
        opacity: 0;

        h4 {
          color: #fff;
          font-size: 6.4vw;
          text-align: center;
        }

        .info {
          display: none;
        }

        .el-collapse {
          width: 80%;
          margin: auto;
          border: none;
          margin-top: 2.7vh;

          .el-collapse-item__header {
            background-color: #710000;
            border-bottom: 1px solid #000000;
            color: #fff;
            font-size: 5.3vw;
            padding-left: 4.3vw;
          }

          .el-collapse-item__wrap {
            border: none;
          }

          .el-collapse-item__content {
            background-color: #500101;
            color: #fff;
            padding: 4vw;
            font-size: 4.3vw;
          }
        }

        & > p {
          display: none;
        }
      }

      .right {
        width: 100%;
        height: 42.3vh;
        background: url('../assets/celebrity/mb_bgimg_1.png') no-repeat;
        background-size: cover;
        background-position: right;
        margin-top: 4.3vh;
        position: relative;
        transition-duration: 1s;

        img {
          display: none;
        }

        p {
          background-color: #434343;
          color: #fff;
          width: 90.4vw;
          text-align: center;
          font-size: 6.4vw;
          font-weight: bold;
          margin: auto;
          padding-bottom: 1.1vh;
          position: absolute;
          left: 0;
          right: 0;
          bottom: -12vh;
          opacity: 0;
          transition-duration: 0.8s;
        }
      }

      .bottom {
        padding: 3.4vh 9vw 0;
        margin-top: 12vh;
        opacity: 0;
        position: relative;
        transition-duration: 0.8s;

        p {
          text-align: left;
          color: white;
          font-size: 4.3vw;
          margin-bottom: 1vh;

          span {
            display: block;
            margin-bottom: 1vh;
          }
        }
      }
    }

    &.active {
      transform: translateY(0);
      opacity: 1;

      .right {
        p {
          opacity: 1;
        }
      }

      .bottom {
        opacity: 1;
      }

    }

    &.modify {
      .left {
        opacity: 1;
        transform: translateX(0);
      }

      .right {
        height: 28.3vh;

        p {
          opacity: 0;
          z-index: -1;
        }
      }

      .bottom {
        opacity: 0;
        z-index: -1;
      }

    }
  }

  .Pictures {
    .text {
      opacity: 0;
      transition-duration: 1s;
      transition-delay: 1s;
      padding: 9.6vh 0;

      p {
        color: #fff;
        text-align: center;
        margin: auto;
        font-size: 4.8vw;
      }
    }

    .picture1 {
      width: 65.3vw;
      height: 28.6vh;
      position: relative;
      overflow: hidden;

      div {
        width: 78.36vw;
        height: 34.32vh;
        background: url('../assets/celebrity/mb_bgimg_2.png') no-repeat;
        background-size: cover;
        background-position: bottom right;
        transition-duration: 0.2s;
        position: relative;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }

    .picture2 {
      margin-top: 3.4vh;
      margin-left: 32.8vw;
      position: relative;

      div {
        width: 54.9vw;
        height: 46.4vh;
        background: url('../assets/celebrity/mb_bgimg_3.1.png') no-repeat;
        background-size: cover;
        background-position: right;
      }

      div:nth-child(2) {
        width: 54.9vw;
        height: 46.4vh;
        background: url('../assets/celebrity/mb_bgimg_3.2.png') no-repeat;
        background-size: cover;
        background-position: right;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .picture3 {
      display: none;
    }
  }

  .Highlight {
    margin-top: 9.5vh;

    h4 {
      color: #fff;
      text-align: center;
      font-size: 6.4vw;
    }

    .items {
      display: none;
    }

    .highlightSwiperMobile {
      margin-top: 2.7vh;
      position: relative;

      p {
        width: 100vw;
        height: 5.4vh;
        line-height: 5.4vh;
        color: #fff;
        font-size: 5.3vw;
        text-align: center;
        background-color: #500101;
        margin: 0;
      }

      .swiper-container {
        padding-bottom: 3vh;

        .swiper-slide {
          width: 100vw;
          height: 37.4vh;
        }

        .swiper-pagination {
          bottom: 0;

          .swiper-pagination-bullet {
            background: #fff;
            opacity: 0.5;
          }

          .swiper-pagination-bullet-active {
            opacity: 1;
            background: #ff0317;
          }
        }
      }

      .highlightPrev2 {
        top: 2.7vh;
        width: 24px;
        height: 24px;
        left: 10px;
        margin-top: -12px;
        background-size: 20px 24px;
        outline: none;
      }

      .highlightNext2 {
        top: 2.7vh;
        width: 24px;
        height: 24px;
        right: 10px;
        margin-top: -12px;
        background-size: 20px 24px;
        outline: none;
      }
    }
  }

  .Honour {
    margin-top: 9.5vh;

    h4 {
      color: #fff;
      text-align: center;
      font-size: 6.4vw;
    }

    .timeline {
      background-color: #d5d5d5;
      margin-top: 14vw;
      position: relative;

      .left {
        background-color: #500101;
        width: 87.8vw;
        height: 15.7vh;
        padding: 2.4vh 0 2.4vh 19.7vw;
        box-sizing: border-box;
        position: absolute;
        top: -10vw;

        p {
          color: #fff;
          font-size: 4.3vw;
          margin: 0;
        }
      }

      .right {
        padding-top: 18vw;

        .events {
          padding: 4vw 0;

          &:after {
            content: '';
            position: absolute;
            z-index: 1;
            left: 40px;
            top: 0px;
            height: 100%;
            background: #500101;
            width: 2px;
          }
        }

        .events ol {
          list-style: none;
          position: relative;
          z-index: 10;
        }

        .events li div {
          width: 100%;
          height: 16vw;

          &::before {
            content: '';
            position: absolute;
            width: 8vw;
            height: 1px;
            background: #500101;
            top: 24%;
          }

          &::after {
            content: '';
            position: absolute;
            top: 18%;
            left: -3px;
            height: 8px;
            width: 8px;
            border-radius: 50%;
            border: 2px solid #b81319;
            background-color: #b81319;
            z-index: 10;
          }

          p {
            float: left;
            color: #500101;
            font-size: 5.3vw;
            font-weight: bold;
            margin-left: 12vw;
          }

          span {
            float: right;
            width: 29.9vw;
            font-size: 3.7vw;
            margin-right: 13vw;
            grid-template-columns: auto auto auto auto auto;
          }
        }
      }
    }
  }

  .Scenes {
    margin-top: 7.3vh;
    padding-bottom: 13.3vh;
    background-color: black;

    h4 {
      color: #fff;
      text-align: center;
      font-size: 6.4vw;
      margin: 0;
    }

    .scenesSwiperPC {
      display: none;
    }

    .swiper-container.scenesSwiperMobile {
      margin-top: 2.7vh;

      .swiper-slide {
        img {
          width: 50%;
          height: 19.8vh;
          float: left;
          object-fit: cover;
          object-position: top;
        }
      }

      .swiper-slide.mb-box-2 {
        img:nth-child(2) {
          object-position: center;
        }
      }
    }
  }
}


.Celebrity_CN {
  @media only screen and (max-width: 769px) {
    .Honour {
      .timeline {
        .right {
          .events li div {
            p {
              margin-left: 12vw;
            }
          }
        }
      }
    }
  }
}

.Celebrity_EN {
  @media only screen and (min-width: 769px) {
    .Honour {
      .timeline {
        .right {
          .events ol {
            li:nth-child(1) {
              div {
                left: 8.3vw;
                width: 8vw;
                height:8.5vw;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 769px) {
    .Banner_Top1 {
      .Banner_Top1_Step2 {
        .title {
          p {
            margin-top: 4vw;
          }
        }
      }
    }

    .Honour {
      .timeline {
        .right {
          .events li div {
            p {
              margin-left: 10vw;
            }
          }
        }
      }
    }
  }
}

.Celebrity_KR {
  @media only screen and (max-width: 769px) {

    .Honour {
      .timeline {
        .right {
          .events li div {
            p {
              margin-left: 12vw;
            }
          }
        }
      }
    }
  }
}
</style>
