<template>
  <div class="aboutUs template">
    <div class="aboutUs-title">
      <div class="blinking-words">{{ $t("aboutUs.title") }}</div>
      <div class="aboutUs-title-subtitle">{{ $t("aboutUs.subtitle") }}</div>
    </div>
    <div class="aboutUs-content">
      <div
        class="aboutUs-content-card"
        v-for="about in abouts"
        :key="about.key"
      >
        <div class="aboutUs-card-image">
          <img :src="about.image" alt="aboutUs-img" />
        </div>
        <div class="aboutUs-card-descript">
          <div class="aboutUs-card-descript-title">
            {{ about.title }}
          </div>
          <div class="aboutUs-card-descript-description">
            {{ about.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="aboutUs-map">
      <p class="aboutUs-map-title">{{ $t("aboutUs.map.title") }}</p>
      <p class="aboutUs-map-subtitle">
        {{ $t("aboutUs.map.subtitle") }}
      </p>
      <p class="aboutUs-map-subtitle-mobile">
        {{ $t("aboutUs.map.subtitle") }}
      </p>
      <div class="aboutUs-map-mapbg-container">
        <!-- mobile map bg  -->
        <img
          class="aboutUs-map-mapbg-mobile"
          src="~/assets/img/mobile/map_small.png"
          alt="mapBG"
        />
        <!-- dektop map bg  -->
        <img
          class="aboutUs-map-mapbg"
          src="~/assets/img/map_bg.png"
          alt="mapBG"
        />
        <!-- dektop plot -->
        <div
          class="web-map-item"
          v-for="location in locations"
          :key="location.key"
        >
          <img
            src="~/assets/img/point.png"
            class="map-plot"
            :id="'location-dot-' + location.id"
          />
          <div :id="'location-' + location.id">
            <img :src="location.image" class="location-plot" />
            <div class="location-information">
              <div class="location-title">
                {{ location.location_title }}
              </div>
              <div class="location-subtitle">
                {{ location.location_subtitle }}
              </div>
            </div>
          </div>
        </div>
        <!-- mobile plot -->
        <div
          class="mobile-map-item"
          v-for="location in locations"
          :key="location.key"
        >
          <img
            src="~/assets/img/point.png"
            class="map-plot-mobile"
            :id="'location-dot-' + location.id"
            @click="handleOnToggle(location.id)"
          />
          <div
            :id="'location-overlay-' + location.id"
            class="overlay-block"
            @click="closeOverlay(location.id)"
          >
            <img
              :src="location.image"
              class="location-plot"
              :id="'location-' + location.id"
            />
            <div class="location-information">
              <div class="location-title">
                {{ location.location_title }}
              </div>
              <div class="location-subtitle">
                {{ location.location_subtitle }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
  head() {
    return {
      title: this.$t("navList.aboutUs"),
    };
  },
  data() {
    return {
      abouts: [
        {
          image: require("~/assets/img/img1.png"),
          title: this.$t("aboutUs.aboutUs1.title"),
          description: this.$t("aboutUs.aboutUs1.description"),
        },
        {
          image: require("~/assets/img/img2.png"),
          title: this.$t("aboutUs.aboutUs2.title"),
          description: this.$t("aboutUs.aboutUs2.description"),
        },
      ],
      locations: [
        {
          id: 1,
          name: "cyprus",
          image: require("~/assets/img/location5.png"),
          location_title: this.$t("aboutUs.location1.title"),
          location_subtitle: this.$t("aboutUs.location1.subtitle"),
        },
        {
          id: 2,
          name: "taiwan",
          image: require("~/assets/img/location6.png"),
          location_title: this.$t("aboutUs.location2.title"),
          location_subtitle: this.$t("aboutUs.location2.subtitle"),
        },
        {
          id: 3,
          name: "philippine",
          image: require("~/assets/img/location7.png"),
          location_title: this.$t("aboutUs.location3.title"),
          location_subtitle: this.$t("aboutUs.location3.subtitle"),
        },
        {
          id: 4,
          name: "singapore",
          image: require("~/assets/img/location8.png"),
          location_title: this.$t("aboutUs.location4.title"),
          location_subtitle: this.$t("aboutUs.location4.subtitle"),
        },
      ],
    };
  },
  methods: {
    handleOnToggle(id) {
      for (let i = 0; i < this.locations.length; i++) {
        var index = i + 1;
        if (index == id) {
          $("#location-dot-" + index).addClass("active");
          $("#location-" + index).show();
          $("#location-overlay-" + index).show();
        } else {
          $("#location-dot-" + index).removeClass("active");
          $("#location-" + index).hide();
          $("#location-overlay-" + index).hide();
        }
      }
    },
    closeOverlay(id) {
      $("#location-dot-" + id).removeClass("active");
      $(".overlay-block").css("display", "none");
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/web/aboutUs.scss";
@import "/assets/scss/mobile/aboutUs.scss";
</style>
