<template>
  <div class="index">
    <div class="banner">
      <ParticlesEffect />
      <div class="banner-words template">
        <div class="blinking-words">
          {{ $t("index.title") }}
        </div>
        <div class="subtitle">
          {{ $t("index.subtitle") }}
        </div>
        <div class="banner-list">
          <div v-swiper:mySwiper3="bannerSwiperOption" class="swiper">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(item, index) in bannerList"
                :key="index"
              >
                <nuxt-link :to="localePath('/boleBitNew')">
                  <img :src="item.src" />
                </nuxt-link>
              </div>
            </div>
          </div>
          <div id="bannerPrevBtn" class="swiper-button-prev"></div>
          <div id="bannerNextBtn" class="swiper-button-next"></div>
        </div>
        <div class="game-list">
          <div v-swiper:mySwiper1="gameSwiperOption" class="swiper">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide game-swiper-slide"
                v-for="(item, index) in gameList"
                :key="index"
              >
                <img :src="item.src" />
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="game-type">
          <span>{{ $t("index.gameType.type1") }}</span>
          <span>{{ $t("index.gameType.type2") }}</span>
          <span>{{ $t("index.gameType.type3") }}</span>
          <span>{{ $t("index.gameType.type4") }}</span>
        </div> -->
        <div class="play">
          <nuxt-link :to="localePath('/game')">
            <div class="blinking-words-hoverable">
              {{ $t("index.play") }}
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="content template">
      <div class="content-box">
        <div class="title">
          {{ $t("index.info") }}
        </div>
        <div class="info-content">
          <div v-swiper:mySwiper2="swiperOption" class="swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in list" :key="item.id">
                <div class="info-box" @click="navigateToPage(item.id)">
                  <img :src="item.img" />
                  <div class="info-box-detail">
                    <div class="info-box-title">{{ item.content.title }}</div>
                    <div class="info-box-content">
                      {{ item.content.summary }}
                    </div>
                    <div class="info-box-more" @click="navigateToPage(item.id)">
                      {{ $t("index.more") }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="swiper-pagination my-pagination"
              slot="pagination"
            ></div>
          </div>
          <div id="prevBtn" class="swiper-button-prev"></div>
          <div id="nextBtn" class="swiper-button-next"></div>
        </div>
      </div>
      <div class="content-box recognition">
        <div class="title">
          {{ $t("index.iTech.title") }}
        </div>
        <div class="subtitle">
          {{ $t("index.iTech.description1") }}<br />
          {{ $t("index.iTech.description2") }}<br />
          {{ $t("index.iTech.description3") }}<br />
          {{ $t("index.iTech.description4") }}
        </div>
        <img src="../assets/img/itech_logo.png" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Index",
  head() {
    return {
      title: this.$t("navList.index"),
    };
  },
  data() {
    return {
      bannerSwiperOption: {
        loop: false,
        noNextTick: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: "#bannerNextBtn",
          prevEl: "#bannerPrevBtn",
        },
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      gameSwiperOption: {
        loop: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        slidesPerView: 6,
        spaceBetween: 5,
        breakpointsInverse: true,
        breakpoints: {
          1100: {
            slidesPerView: 8,
            spaceBetween: 5,
          },
          1300: {
            slidesPerView: 10,
            spaceBetween: 5,
          },
        },
        on: {
          slideChange: function () {
            $(".game-swiper-slide").removeClass("half-blur");
            $(".game-swiper-slide").removeClass("full-blur");
            let active = this.activeIndex;

            var width = $(window).width();
            if (width >= 1300) {
              $(".game-swiper-slide:eq(" + (active + 8) + ")").addClass(
                "half-blur"
              );
              $(".game-swiper-slide:eq(" + (active + 9) + ")").addClass(
                "full-blur"
              );
              $(".game-swiper-slide:eq(" + (active + 10) + ")").addClass(
                "full-blur"
              );
            } else if (width >= 1100) {
              $(".game-swiper-slide:eq(" + (active + 6) + ")").addClass(
                "half-blur"
              );
              $(".game-swiper-slide:eq(" + (active + 7) + ")").addClass(
                "full-blur"
              );
              $(".game-swiper-slide:eq(" + (active + 8) + ")").addClass(
                "full-blur"
              );
            } else {
              $(".game-swiper-slide:eq(" + (active + 4) + ")").addClass(
                "half-blur"
              );
              $(".game-swiper-slide:eq(" + (active + 5) + ")").addClass(
                "full-blur"
              );
              $(".game-swiper-slide:eq(" + (active + 6) + ")").addClass(
                "full-blur"
              );
            }
          },
        },
      },
      swiperOption: {
        noNextTick: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: "#nextBtn",
          prevEl: "#prevBtn",
        },
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 5,
        breakpointsInverse: true,
        breakpoints: {
          700: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 6,
          },
        },
      },
      bannerList: [],
      gameList: [
        { src: require("../assets/img/game_list/1.png") },
        { src: require("../assets/img/game_list/2.png") },
        { src: require("../assets/img/game_list/3.png") },
        { src: require("../assets/img/game_list/4.png") },
        { src: require("../assets/img/game_list/5.png") },
        { src: require("../assets/img/game_list/6.png") },
        { src: require("../assets/img/game_list/7.png") },
        { src: require("../assets/img/game_list/8.png") },
        { src: require("../assets/img/game_list/9.png") },
        { src: require("../assets/img/game_list/10.png") },
        { src: require("../assets/img/game_list/11.png") },
        { src: require("../assets/img/game_list/12.png") },
        { src: require("../assets/img/game_list/13.png") },
        { src: require("../assets/img/game_list/14.png") },
        { src: require("../assets/img/game_list/15.png") },
        { src: require("../assets/img/game_list/16.png") },
        { src: require("../assets/img/game_list/17.png") },
        { src: require("../assets/img/game_list/18.png") },
        { src: require("../assets/img/game_list/19.png") },
        { src: require("../assets/img/game_list/20.png") },
        { src: require("../assets/img/game_list/21.png") },
        { src: require("../assets/img/game_list/22.png") },
        { src: require("../assets/img/game_list/23.png") },
        { src: require("../assets/img/game_list/24.png") },
        { src: require("../assets/img/game_list/25.png") },
      ],
      list: [],
      lang: "chinese",
    };
  },
  mounted() {
    this.getNews();
    this.getBanner();
    this.lang = localStorage.getItem("lang");
    window.addEventListener("resize", this.getBanner);

    //解决 rendering 问题
    setTimeout(function () {
      $(".game-list").css("display", "block");
      $(".play").css("display", "block");
    }, 500);
  },
  methods: {
    getNews() {
      this.$api
        .request("Info/getList?pageSize=50")
        .then(({ data }) => {
          this.list = data.list;
        })
        .catch((error) => {
          this.$message.error(error ? error : this.$t("error"));
        });
    },
    navigateToPage(id) {
      this.$router.push({ path: "post", query: { id: id } });
    },
    getBanner() {
      this.lang = localStorage.getItem("lang");
      if (window.innerWidth > 700) {
        this.bannerList = [
          { src: require("../assets/img/banner1_" + this.lang + ".png") },
        ];
      } else {
        this.bannerList = [
          {
            src: require("../assets/img/mobile/banner1_" + this.lang + ".png"),
          },
        ];
      }
    },
    handleUrl() {
      window.open(this.$globalParams.url.boleBitPlay);
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getBanner);
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/web/index.scss";
@import "/assets/scss/mobile/index.scss";
</style>
