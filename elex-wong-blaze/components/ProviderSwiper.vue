<template>
  <div class="provider-swiper">
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
      <div v-swiper:mySwiper="swiperOption" class="swiper swiper-provider" :class="{'game-detail': gameDetail}">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in list"
            :key="index"
            @click="
              handleUrl('providers/' + (item.gameChannelName || item.name))
            "
          >
            <div v-if="item.logo == null || item.logo == ''" class="title">{{ item.gameChannelName || item.name }}</div>
            <div v-else class="image">
              <img :src="item.logo">
            </div>
            <div class="total">
              {{ item.gameNum || item.num }} {{ $tt("games") }}
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
        <div v-if="gameDetail != true" class="game-view-all" @click="handleUrl(url)">
          {{ $tt("view_all") }} <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="game-list">
        <div
          class="game-item"
          v-for="(item, index) in list"
          :key="index"
          @click="handleUrl('providers/' + (item.gameChannelName || item.name))"
        >
          <div v-if="item.logo == null || item.logo == ''" class="title">{{ item.gameChannelName || item.name }}</div>
          <div v-else class="image">
            <img :src="item.logo">
          </div>
          <div class="total">
            {{ item.gameNum || item.num }} {{ $tt("games") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProviderSwiper",
  props: ["list", "leftButton", "rightButton", "title", "url", "gameDetail"],
  data() {
    return {
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
    };
  },
  methods: {
    handleUrl(url) {
      this.$router.push(this.localePath("/games") + "/" + url);
      // window.newRouter("games/" + url);
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/web/providerSwiper.scss";
@import "/assets/scss/mobile/providerSwiper.scss";
</style>
