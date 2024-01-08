<template>
  <div class="game-row">
    <div v-if="type == 'game'">
      <div class="web">
        <div v-if="gameDetail == true" class="game-title-row">
          <div class="game-title-left">
            <div class="game-title">{{ title }}</div>
          </div>
          <div class="game-title-left">
            <i :id="this.leftButton" class="el-icon-arrow-left"></i>
            <i :id="this.rightButton" class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div v-else class="game-title-row">
          <div class="game-title-left">
            <div class="game-title">{{ title }}</div>
            <i :id="this.leftButton" class="el-icon-arrow-left"></i>
            <i :id="this.rightButton" class="el-icon-arrow-right"></i>
          </div>
          <div class="game-view-all" @click="handleUrl(url)">
            {{ $tt("view_all") }} <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div
          v-swiper:mySwiper="swiperOption"
          class="swiper"
          :class="{'game-detail': gameDetail}"
          v-loading="isLoading"
        >
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in list"
              :key="index"
            >
              <GameImage
                :img="item.imgPlay"
                :title="item.gameName"
                :desc="item.gameChannelName"
                :playId="item.playId"
                :isDemo="item.isDemo"
                @login="handleModal('login')"
                @deposit="handleModal('deposit')"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mobile">
        <div class="game-title-row">
          <div class="game-title-left">
            <div class="game-title">{{ title }}</div>
          </div>
          <div v-if="gameDetail != true" class="game-view-all" @click="handleUrl(url)">
            {{ $tt("view_all") }} <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="game-list">
          <div class="game-item" v-for="(item, index) in list" :key="index">
            <GameImage
              :img="item.imgPlay"
              :title="item.gameName"
              :desc="item.gameChannelName"
              :playId="item.playId"
              :isDemo="item.isDemo"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="themes">
      <div class="web">
        <div class="game-title-row">
          <div class="game-title-left">
            <div class="game-title">{{ title }}</div>
            <i :id="this.leftButton" class="el-icon-arrow-left"></i>
            <i :id="this.rightButton" class="el-icon-arrow-right"></i>
          </div>
          <!-- <div class="game-view-all" @click="handleUrl(url)">
            View All <i class="el-icon-arrow-right"></i>
          </div> -->
        </div>
        <div v-swiper:mySwiper="themeSwiperOption" class="swiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in themeList"
              :key="index"
              :style="'background-color:' + item.color"
            >
              <div
                class="theme-box"
                @click="handleUrl('category/' + item.name)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mobile">
        <div class="game-title-row">
          <div class="game-title-left">
            <div class="game-title">{{ title }}</div>
          </div>
          <!-- <div class="game-view-all" @click="handleUrl(url)">
            View All <i class="el-icon-arrow-right"></i>
          </div> -->
        </div>
        <div class="game-list">
          <div
            class="game-item"
            v-for="(item, index) in themeList"
            :key="index"
            :style="'background-color:' + item.color"
          >
            <div class="theme-box" @click="handleUrl('category/' + item.name)">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <ShowModal v-if="showModal" :type="cat" @close="showModal = false" />
  </div>
</template>

<script>
export default {
  name: "GameSwiper",
  props: ["list", "leftButton", "rightButton", "title", "url", "type", "gameDetail"],
  data() {
    return {
      isLoading: true,
      swiperOption: {
        slidesPerView: this.gameDetail == true ? 5 : 6,
        slidesPerGroup: this.gameDetail == true ? 5 : 6,
        spaceBetween: 24,
        allowTouchMove: false,
        navigation: {
          nextEl: "#" + this.rightButton,
          prevEl: "#" + this.leftButton,
        },
      },
      themeSwiperOption: {
        slidesPerView: 8,
        slidesPerGroup: 8,
        spaceBetween: 24,
        allowTouchMove: false,
        navigation: {
          nextEl: "#" + this.rightButton,
          prevEl: "#" + this.leftButton,
        },
      },
      themeList: [
        { name: "Sticky Wilds", color: "#ffb639" },
        { name: "Fruit", color: "#6c4beb" },
        { name: "Magic", color: "#5fd1fa" },
        { name: "Horror", color: "#6ce98c" },
        { name: "Egyptian", color: "#ae61f7" },
        { name: "Animals", color: "#ee7963" },
        { name: "TV", color: "#624aec" },
        { name: "Dragon", color: "#d9589d" },
        { name: "Asia", color: "#ffb639" },
      ],
      showModal: false,
      cat: "",
    };
  },
  mounted() {
    this.isLoading = false;
  },
  methods: {
    handleUrl(url) {
      window.newRouter("/games/" + url);
    },
    handleModal(type) {
      this.cat = type;
      this.showModal = true;
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/web/gameSwiper.scss";
@import "/assets/scss/mobile/gameSwiper.scss";
</style>
