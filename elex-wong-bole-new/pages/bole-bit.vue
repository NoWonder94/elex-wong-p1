<template>
  <div class="bolebit">
    <div class="bolebit-title">
      <img
        class="bolebit-title-logo"
        src="../assets/img/BoleBit_logo.png"
        alt=""
      />
      <p class="bolebit-title">
        {{ $t("boleBit.title") }}
      </p>
    </div>
    <div class="bolebit-heading">
      <p class="bolebit-heading-title">{{ $t("boleBit.introTitle") }}</p>
      <div class="bolebit-heading-description">
        {{ $t("boleBit.introDescription") }}
      </div>
      <!-- <div class="bolebit-heading-button" @click="play()">
        {{ $t("boleBit.introTryButton") }}
      </div> -->
      <nuxt-link :to="localePath('/boleBitNew')">
        <div class="bolebit-heading-button">
          {{ $t("boleBit.introTryButton") }}
        </div>
      </nuxt-link>
    </div>
    <div class="bolebit-features">
      <p class="bolebit-features-title">{{ $t("boleBit.features") }}</p>
      <div class="bolebit-features-description">
        <p>{{ $t("boleBit.featuresDescription_1") }}</p>
        <p>{{ $t("boleBit.featuresDescription_2") }}</p>
      </div>
      <div class="bolebit-features-coins">
        <img
          v-for="(coin, index) in featureCoins"
          :key="index"
          :src="coin.image"
          class="bolebit-features-coins-img"
        />
      </div>
    </div>
    <div class="bolebit-advantage">
      <p class="bolebit-advantage-title">{{ $t("boleBit.advantages") }}</p>
      <div class="bolebit-advantage-content">
        <div
          class="bolebit-advantage-card"
          v-for="(advantage, index) in advantages"
          :key="index"
        >
          <img
            class="bolebit-advantage-card-icon"
            :src="advantage.icon"
            alt=""
          />
          <div class="bolebit-advantage-card-content">
            <div class="bolebit-advantage-card-title">
              {{ advantage.title }}
            </div>
            <div class="bolebit-advantage-card-subtitle">
              {{ advantage.subtitle }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bolebit-overview">
      <p class="bolebit-overview-title">{{ $t("boleBit.overviewTitle") }}</p>
      <div class="bolebit-overview-graph">
        <div
          class="bolebit-overview-graph-content"
          v-for="(overview, index) in overviews"
          :key="index"
        >
          <p class="overview-graph-year">{{ overview.year }}</p>
          <img class="overview-graph-arrow" src="../assets/img/arrow_up.png" />
          <div
            class="overview-graph-progress"
            :class="'phase' + (index + 1)"
          ></div>
          <div class="overview-graph-line"></div>
          <div class="overview-graph-about">{{ overview.about }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoleBit",
  head() {
    return {
      title: this.$t("navList.boleBit"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("boleBit.metaDescription"),
        },
      ],
    };
  },
  data() {
    return {
      featureCoins: [
        { image: require("~/assets/img/coin_1.png") },
        { image: require("~/assets/img/coin_2.png") },
        { image: require("~/assets/img/coin_3.png") },
        { image: require("~/assets/img/coin_4.png") },
        { image: require("~/assets/img/coin_5.png") },
        { image: require("~/assets/img/coin_6.png") },
        { image: require("~/assets/img/coin_7.png") },
        { image: require("~/assets/img/coin_8.png") },
      ],
      advantages: [
        {
          icon: require("~/assets/img/icon_cs.png"),
          title: this.$t("boleBit.advantages1.title"),
          subtitle: this.$t("boleBit.advantages1.subtitle"),
        },
        {
          icon: require("~/assets/img/icon_idea.png"),
          title: this.$t("boleBit.advantages2.title"),
          subtitle: this.$t("boleBit.advantages2.subtitle"),
        },
        {
          icon: require("~/assets/img/icon_team.png"),
          title: this.$t("boleBit.advantages3.title"),
          subtitle: this.$t("boleBit.advantages3.subtitle"),
        },
        {
          icon: require("~/assets/img/icon_event.png"),
          title: this.$t("boleBit.advantages4.title"),
          subtitle: this.$t("boleBit.advantages4.subtitle"),
        },
        {
          icon: require("~/assets/img/icon_supplier.png"),
          title: this.$t("boleBit.advantages5.title"),
          subtitle: this.$t("boleBit.advantages5.subtitle"),
        },
        {
          icon: require("~/assets/img/icon_cdn.png"),
          title: this.$t("boleBit.advantages6.title"),
          subtitle: this.$t("boleBit.advantages6.subtitle"),
        },
      ],
      overviews: [
        {
          year: "2017",
          about: this.$t("boleBit.overview1"),
        },
        {
          year: "2018",
          about: this.$t("boleBit.overview2"),
        },
        {
          year: "2019",
          about: this.$t("boleBit.overview3"),
        },
        {
          year: "2020",
          about: this.$t("boleBit.overview4"),
        },
        {
          year: "2022",
          about: this.$t("boleBit.overview5"),
        },
      ],
    };
  },
  methods: {
    play() {
      window.open(this.$globalParams.url.boleBitPlay);
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/web/boleBit.scss";
@import "/assets/scss/mobile/boleBit.scss";
</style>
