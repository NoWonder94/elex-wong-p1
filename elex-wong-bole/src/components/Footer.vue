<template>
  <div class="mainContainer footer">
    <img id="go_up" src="../assets/footer_img/up_arrow.png" @click="scrollTop">
    <div class="cooperationInfo">
      <div class="row">
        <div class="col-md-12 col-xs-12 col-sm-12" style="height:100%;position:relative;">
          <div class="navWeb">
            <div class="navigationBottom">
              <div class="NavBottomItem">
                <p class="title">{{ $i18n.t('footer.lesen') }}</p>
                <div class="img_container">
                  <img src="../assets/footer_img/pagcor_logo.png">
                  <img src="../assets/footer_img/footer_common_icon_gibraltar_white@2x.456dd7c.png">
                </div>
                <div class="content">{{ $i18n.t('footer.lesen_Info') }}</div>
              </div>
              <div class="NavBottomItem">
                <p class="title">{{ $i18n.t('footer.responsibility') }}</p>
                <div class="img_container">
                  <img src="../assets/footer_img/18+.png">
                </div>
                <div class="content">{{ $i18n.t('footer.responsibility_Info') }}</div>
              </div>
              <div class="NavBottomItem">
                <p class="title">{{ $i18n.t('footer.authentication') }}</p>
                <div class="img_container">
                  <img src="../assets/footer_img/itech-labs.png">
                </div>
                <div class="content">
                  {{ $i18n.t('footer.authentication_Info') }}
                  <br>
                  <a
                    href="https://itechlabs.com/certificates/BoleGaming/RNG_Certificate_BoleGaming_28122018.pdf"
                    target="_blank"
                  >{{ $i18n.t('footer.serial_number') }}: ITL1802045</a>
                </div>
              </div>
              <div class="NavBottomItem">
                <p class="title">{{ $i18n.t('footer.workshop') }}</p>
                <div class="img_container">
                  <img src="../assets/footer_img/ice-01.png">
                  <img src="../assets/footer_img/Ipage.png">
                  <img src="../assets/footer_img/G2E.png">
                </div>
                <div class="content">{{ $i18n.t('footer.workshop_Info') }}</div>
              </div>
<!--               <div class="NavBottomItem">
                <p class="title">{{ $i18n.t('footer.award') }}</p>
                <div class="img_container">
                  <img src="../assets/footer_img/e_gaming.png">
                </div>
                <div class="content">{{ $i18n.t('footer.award_Info') }}</div>
              </div> -->
            </div>
          </div>
          <div class="navMobile">
            <div class="navigationBottom row">
              <el-collapse style="width:100%;border-top:transparent;">
                <el-collapse-item :title="$i18n.t('footer.lesen')">
                  <img
                    src="../assets/footer_img/pagcor_logo.png"
                    style="width:11vw;margin-bottom:1rem;margin-right:1rem;"
                  >
                  <img
                    src="../assets/footer_img/footer_common_icon_gibraltar_white@2x.456dd7c.png"
                    style="width:11vw;margin-bottom:1rem;"
                  >
                  <div class="content">{{ $i18n.t('footer.lesen_Info') }}</div>
                </el-collapse-item>
                <el-collapse-item :title="$i18n.t('footer.responsibility')">
                  <img
                    src="../assets/footer_img/18+.png"
                    style="width:11vw;margin-bottom:1.2rem;margin-right:1rem;"
                  >
                  <div class="content">{{ $i18n.t('footer.responsibility_Info') }}</div>
                </el-collapse-item>
                <el-collapse-item :title="$i18n.t('footer.authentication')">
                  <img
                    src="../assets/footer_img/itech-labs.png"
                    style="width:11vw;margin-bottom:1.2rem;margin-right:1rem;"
                  >
                  <div class="content">
                    {{ $i18n.t('footer.authentication_Info') }}
                    <br>
                    <a
                      href="https://itechlabs.com/certificates/BoleGaming/RNG_Certificate_BoleGaming_28122018.pdf"
                      target="_blank"
                    >{{ $i18n.t('footer.serial_number') }}：ITL1802045</a>
                  </div>
                </el-collapse-item>
                <el-collapse-item :title="$i18n.t('footer.workshop')">
                  <img
                    src="../assets/footer_img/ice-01.png"
                    style="width:60px;margin-bottom:1.5rem;margin-top:0.5rem;margin-right:1rem;"
                  >
                  <img
                    src="../assets/footer_img/Ipage.png"
                    style="width:100px;margin-bottom:1.5rem;margin-top:0.5rem;margin-right:1rem;"
                  >
                  <img
                    src="../assets/footer_img/G2E.png"
                    style="width:70px;margin-bottom:1.5rem;margin-top:0.5rem;"
                  >
                  <div class="content">{{ $i18n.t('footer.workshop_Info') }}</div>
                </el-collapse-item>
                <el-collapse-item :title="$i18n.t('footer.award')">
                  <img
                    src="../assets/footer_img/e_gaming.png"
                    style="width:90px;margin-bottom:1rem;margin-right:1rem;"
                  >
                  <div class="content">{{ $i18n.t('footer.award_Info') }}</div>
                </el-collapse-item>
                <el-collapse-item :title="$i18n.t('footer.partner')">
                  <div
                    style="display:grid;grid-template-columns:25% 25% 25% 25%;align-items:center;"
                  >

                    <img src="../assets/partners_logo/abc.png" style="width:80%">

                    <img src="../assets/partners_logo/APLUS_logo.png" style="width:80%">

                    <img src="../assets/partners_logo/eveb.png" style="width:80%">

                    <img src="../assets/partners_logo/fhlm.png" style="width:80%">

                    <img src="../assets/partners_logo/gamingsoft_logo.png" style="width:80%">

                    <!-- <img src="../assets/partners_logo/itgo-LOGO.png" style="width:80%"> -->

                    <img src="../assets/partners_logo/bymedia.png" style="width:80%">

                    <img src="../assets/partners_logo/logo_main_whitetxt.svg" style="width:80%">

                    <img src="../assets/partners_logo/tlc.png"style="width:80%">

                    <img src="../assets/partners_logo/ug.png"style="width:80%">

                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </div>
      </div>

      <div id="swipperWeb">
        <hr>
        <div class="bottom_advertisement">
          <div class="bottom_advertisement_left">
            <span class="title">{{ $i18n.t('footer.partner') }}</span>
            <span class="content">
              <img src="../assets/partners_logo/abc.png">
              <img src="../assets/partners_logo/APLUS_logo.png">
              <img src="../assets/partners_logo/eveb.png">
              <img src="../assets/partners_logo/fhlm.png">
              <img src="../assets/partners_logo/gamingsoft_logo.png">
              <!-- <img src="../assets/partners_logo/itgo-LOGO.png"> -->
              <img src="../assets/partners_logo/bymedia.png">
              <img src="../assets/partners_logo/logo_main_whitetxt.svg">
              <img src="../assets/partners_logo/tlc.png">
              <img src="../assets/partners_logo/ug.png">
            </span>
          </div>
          <div class="bottom_advertisement_Right">
            <span class="title">{{ $i18n.t('footer.otherlink') }}</span>
            <span class="content">
              <img
                class="hvr-bob"
                src="../assets/socialmedia_icon/facebook.svg"
                @click="locationHref('https://www.facebook.com/bolegaming')"
              >
              <img
                class="hvr-bob"
                src="../assets/socialmedia_icon/telegram.svg"
                @click="locationHref('https://t.me/Bole_channel')"
              >
              <img
                class="hvr-bob"
                src="../assets/socialmedia_icon/twitter.svg"
                @click="locationHref('https://twitter.com/bolegaming')"
              >
              <img
                class="hvr-bob"
                src="../assets/socialmedia_icon/youtube.svg"
                @click="locationHref('https://www.youtube.com/channel/UCXP9Vju7Eo9DhNWckhmANrQ')"
              >
            </span>
          </div>
        </div>
      </div>
      <div id="swipperMobile" style="width:75%;margin:0 auto;padding:10.9vw 0 7.1vw 0;">
        <div
          class="footer-share-icons"
          style="width:100%;height:45px;display:flex;justify-content:space-around;"
        >
          <img
            src="../assets/socialmedia_icon/facebook.svg"
            style="height:100%;"
            @click="locationHref('https://www.facebook.com/bolegaming')"
          >
          <img
            src="../assets/socialmedia_icon/instagram.svg"
            style="height:100%;"
            @click="locationHref('https://www.instagram.com/bolegaming/')"
          >
          <img
            src="../assets/socialmedia_icon/twitter.svg"
            style="height:100%;"
            @click="locationHref('https://twitter.com/bolegaming')"
          >
          <img
            src="../assets/socialmedia_icon/youtube.svg"
            style="height:100%;"
            @click="locationHref('https://www.youtube.com/channel/UCXP9Vju7Eo9DhNWckhmANrQ')"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  data() {
    return {
      swiperOption: {
        direction: 'horizontal',
        slidesPerView: 'auto',
        centeredSlides: false,
        spaceBetween: 30,
        initialSlide: 1,
        autoplay: true
      },
      swiperOption2: {
        direction: 'horizontal',
        slidesPerView: 'auto',
        centeredSlides: false,
        spaceBetween: 30,
        initialSlide: 1,
        autoplay: true,
        observer: true,
        loop: true
      },
      activeMobile: false,
      activeWeb: false,
      data: {}
    };
  },

  components: {
    swiper,
    swiperSlide
  },

  mounted() {
    this.data = this.$i18n.t('basic_Info');
  },

  methods: {
    locationHref(url) {
      if (window.app && typeof window.app.openurl == 'function') {
        window.app.openurl(url);
      } else {
        window.open(url);
      }
    },
    scrollTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  },

  watch: {
    '$i18n.locale'(val) {
      this.data = this.$i18n.t('basic_Info');
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('hover.css/css/hover.css');

@import "../styles/footer.scss"
</style>
<style lang="scss">
.footer {
  .el-collapse-item__header {
    background-color: #1b1b1b;
    height: 8.3vw;
    font-size: 3.7vw;
    border-bottom: 1px solid #707070;
    color: white;
  }
  .el-collapse-item__header.is-active {
    border-bottom: transparent !important;
  }
  .el-collapse-item__wrap {
    background-color: #1b1b1b;
    .el-collapse-item__content {
      color: white !important;
      padding-bottom: 3vw;
    }
  }
}
.bottom_advertisement_Right .content img {
  cursor: pointer;
}

</style>
