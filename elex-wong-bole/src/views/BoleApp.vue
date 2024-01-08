<template>
  <div class="page-container" style="position:relative; z-index:13;">
    <div id="AppWeb">
      <div class="navigation">
        <a @click="handleRoute('/index')">
            <div class="logo">
              <img src="../assets/boleapp_new/BT_01.png">
            </div>
          </a>
          <div class="contactRow">
            <a href="mailto:Info@bolegaming.com" target="_top">
              <div class="contact" style="margin-top: 0.3vw; margin-right: 5vw;">
                <img src="../assets/boleapp_new/BT_04.png" style="width: 15vw;">
              </div>
            </a>
            <a href="https://t.me/bolegaming" target="_blank">
              <div class="contact">
                <img src="../assets/boleapp_new/BT_03.png">
              </div>
            </a>
            <a href="skype:live:bolegaming?chat">
              <div class="contact">
                <img src="../assets/boleapp_new/BT_02.png">
              </div>
            </a>
            <!-- <a
              href="https://wpa.qq.com/msgrd?v=3&uin=2354679497&site=qq&menu=yes"
              target="_blank"
            >
            <div class="contact">
              <img src="../assets/boleapp/BT_07.png">
              <p>2354679497</p>
            </div>
            </a> -->
          </div>
      </div>
      <div class="firstBG">
        <div class="firstBG-row">
          <div class="gamephoto">
            <!-- 轮播图 -->
            <div class="banner-place">
              <div class="banner-image-position">
                <el-carousel
                  arrow="never"
                  :interval="3000"
                  trigger="click"
                  height="17.30vw">
                  <el-carousel-item v-for="(image, index) in bannerArray" :key="index">
                    <img :src="image.url" width="100%"/>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
            <!-- //轮播图 -->
            <div class="arrow">
              <img class="swing2" src="../assets/boleapp_new/ITEM_03.png">
            </div>
            <div class="imageRow">
              <img src="../assets/boleapp_new/item_09.png">
              <img src="../assets/boleapp_new/item_10.png">
              <img src="../assets/boleapp_new/item_11.png">
            </div>
          </div>
        </div>
      </div>
      <div class="secondBG">
        <div class="secondBG-row">
          <img src="../assets/boleapp_new/item_12.png" style=" width: 98.5vw; position: relative; top: 1vw;">
          <div class="more-info-position">
            <a href="#contact-info">
              <img src="../assets/boleapp_new/BT_05.png" />
            </a>
          </div>
        </div>
      </div>
      <div class="thirdBG">
        <div class="thirdBG-row">
          <img src="../assets/boleapp_new/item_13.png" style="width: 100vw; position: relative; top: 1vw;">
        </div>
      </div>
      <div class="contactBanner">
        <div class="title">
          <img src="../assets/boleapp_new/item_14.png">
        </div>
        <div class="content" id="contact-info" style="margin: 0 auto; text-align: center;">
          <a href="skype:live:bolegaming?chat">
            <img src="../assets/boleapp_new/BT_06.png">
          </a>
          <a href="https://t.me/bolegaming" target="_blank">
            <img src="../assets/boleapp_new/BT_07.png">
          </a>
          <a href="mailto:Info@bolegaming.com" target="_top">
            <img src="../assets/boleapp_new/BT_08.png">
          </a>
        </div>
      </div>
    </div>
    <div id="AppWap">
      <div class="navigation">
        <a @click="handleRoute('/index')">
            <div class="logo">
              <img src="../assets/boleapp_new/mobile/MB_BT_05.png">
            </div>
          </a>
          <div class="contactRow">
            <a href="https://t.me/bolegaming" target="_blank">
              <div class="contact">
                <img src="../assets/boleapp_new/mobile/MB_BT_07.png">
              </div>
            </a>
            <a href="skype:live:bolegaming?chat">
              <div class="contact">
                <img src="../assets/boleapp_new/mobile/MB_BT_06.png">
              </div>
            </a>
            <br>
            <a href="mailto:Info@bolegaming.com" target="_top">
              <div class="contact">
                <img src="../assets/boleapp_new/mobile/MB_BT_08.png" style="width: 39vw;">
              </div>
            </a>
          </div>
      </div>
      <div class="firstBG">
        <div class="firstBG-row">
          <div class="gamephoto">
            <!-- 轮播图 -->
            <div class="banner-place">
              <div class="banner-image-position">
                <el-carousel
                  arrow="never"
                  :interval="3000"
                  trigger="click"
                  height="33.30vw">
                  <el-carousel-item v-for="(image, index) in mobileArray" :key="index">
                    <img :src="image.url" width="100%"/>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
            <!-- //轮播图 -->
            <div class="imageRow">
              <div class="imageRow-position">
                <el-carousel
                  arrow="always"
                  :interval="3500"
                  indicator-position ="none"
                  trigger="click"
                  height="92vw" style="overflow-x: visible;">
                  <el-carousel-item v-for="(image, index) in photo" :key="index">
                    <img :src="image.url" width="100%"/>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="secondBG">
        <div class="secondBG-row" style="text-align:center;">
          <img src="../assets/boleapp_new/mobile/MB_ITEM_12.png" style=" width: 62vw; position: relative; top: 8vw;">
          <div class="gameList">
            <div class="gameRow">
              <div class="gameRow-position">
                <el-carousel
                  arrow="always"
                  :interval="4000"
                  indicator-position ="none"
                  trigger="click"
                  height="40vw" style="overflow-x: visible;">
                  <el-carousel-item v-for="(image, index) in gameList" :key="index">
                    <img :src="image.url" width="100%"/>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
          <div class="more-info-position">
            <a href="#contact-link">
              <img src="../assets/boleapp_new/mobile/MB_BT_01.png" />
            </a>
          </div>
          <img src="../assets/boleapp_new/mobile/MB_ITEM_21.png" style="width: 88%; margin-top: 27vw;">
        </div>
      </div>
      <div class="contactBanner">
        <div class="title">
          <img src="../assets/boleapp_new/mobile/MB_ITEM_22.png">
        </div>
        <div class="content" id="contact-link" style="margin: 0 auto; text-align: center;">
          <a href="skype:live:bolegaming?chat">
            <img src="../assets/boleapp_new/mobile/MB_BT_02.png">
          </a>
          <a href="https://t.me/bolegaming" target="_blank">
            <img src="../assets/boleapp_new/mobile/MB_BT_03.png">
          </a>
          <a href="mailto:Info@bolegaming.com" target="_top">
            <img src="../assets/boleapp_new/mobile/MB_BT_04.png">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerArray: [
        { url: require('../assets/boleapp_new/item_04.png') },
        { url: require('../assets/boleapp_new/item_05.png') },
        { url: require('../assets/boleapp_new/item_06.png') },
        { url: require('../assets/boleapp_new/item_07.png') },
        { url: require('../assets/boleapp_new/item_08.png') },
      ],
      mobileArray: [
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_02.png') },
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_03.png') },
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_04.png') },
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_05.png') },
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_06.png') },
      ],
      photo: [
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_07.png') },
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_08.png') },
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_09.png') },
      ],
      gameList: [
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_13.png') },
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_14.png') },
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_15.png') },
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_16.png') },
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_17.png') },
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_18.png') },
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_19.png') },
        { url: require('../assets/boleapp_new/mobile/MB_ITEM_20.png') },
      ]
    }
  },

  methods: {
    handleRoute(path) {
      if (path == this.$route.path) {
        if (this.Active) {
          this.handleMenuDisplay();
        }
      } else {
        this.$router.push({ path: path });
      }
    },
  }
};
</script>

<style lang="scss" type="text/css" scoped>

@media only screen and (max-width: 768px) {
  @import "../styles/mobile/BoleApp.scss";
}


@media only screen and (min-width: 768px) {
  @import "../styles/pc/BoleApp.scss";
}
</style>

<style lang="scss" type="text/css">
  .el-carousel__button {
    width: 10px !important;
    height: 10px !important;
    border-radius: 50% !important;
  }

  .imageRow {
    .el-carousel__arrow {
      font-size: 9vw !important;
      background-color: transparent !important;
    }

    .el-carousel__arrow--left {
      left: -5vw !important;
    }

    .el-carousel__arrow--right {
      right: -5vw !important;
    }
  }

  .gameRow {
    .el-carousel__arrow {
      font-size: 9vw !important;
      background-color: transparent !important;
    }

    .el-carousel__arrow--left {
      left: -5.5vw !important;
    }

    .el-carousel__arrow--right {
      right: -5.5vw !important;
    }
  }
</style>
