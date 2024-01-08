<template>
  <div class="game-image">
    <div class="web web-game-image">
      <img :src="img" v-if="img != '' && img != null" />
      <div class="no-data-img" v-else>
        <img :src="miniLogo" alt="" />
        <h3>{{ $config.site_name }}</h3>
      </div>
      <!-- <div class="game-text">
        <div class="game-text-title">
          {{ title }}
        </div>
        <div class="game-text-desc">
          {{ desc }}
        </div>
      </div> -->
      <div class="overlay">
        <div class="overlay-text">
          <div class="login" v-if="isLogin" @click="handleGame(1)">
            <i class="el-icon-caret-right"></i> {{ $tt("play") }}
          </div>
          <div class="login" v-else @click="login">
            <i class="el-icon-caret-right"></i> {{ $tt("sign_in") }}
          </div>
          <div class="play" v-if="isDemo == 1"  @click="handleGame(2)">
            <img src="@/assets/img/play.png" /> {{ $tt("fun_play") }}
          </div>
          <!-- <div class="bottom-text">{{ $tt("play_for_fun") }}</div> -->
        </div>
      </div>
    </div>
    <div class="mobile mobile-game-image">
      <div class="image" @click="handleDetail">
        <img :src="img" v-if="img != '' && img != null" />
        <div class="no-data-img" v-else>
          <img class="no-img" :src="miniLogo" />
          <h3>{{ $config.site_name }}</h3>
        </div>
        <!-- <div class="game-text">
          <div class="game-text-title">
            {{ title }}
          </div>
          <div class="game-text-desc">
            {{ desc }}
          </div>
        </div> -->
      </div>
      <div class="detail" v-if="showDetail">
        <div class="detail-text">
          <i class="el-icon-close" @click="handleDetail"></i>
          <div class="detail-text-title">
            {{ title }}
          </div>
          <div class="detail-text-desc">
            {{ desc }}
          </div>
          <div class="detail-text-image">
            <img :src="img" v-if="img != '' && img != null" />
            <img :src="getChannelInfo.logoMini" v-else />
          </div>
          <div class="detail-text-button play-button" v-if="isLogin" @click="handleGame(1)">
            <i class="el-icon-caret-right"></i> {{ $tt("play") }}
          </div>
          <div class="detail-text-button" v-else @click="handleModal('login')">
            {{ $tt("login_register") }}
          </div>
          <div class="detail-text-button play-button" v-if="isDemo == 1" @click="handleGame(2)">
            <img src="@/assets/img/play.png" /> {{ $tt("fun_play") }}
          </div>
          <!-- <div class="detail-text-play">
            {{ $tt("play_for_fun") }}
          </div> -->
        </div>
      </div>
    </div>
    <ShowModal v-if="showModal" :type="type" @close="showModal = false" />
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { mapState, mapGetters } from "vuex";

export default {
  name: "GameImage",
  props: ["img", "title", "desc", "playId", "isDemo"],
  data() {
    return {
      showDetail: false,
      showModal: false,
      type: "",
    };
  },
  methods: {
    handleUrl(url) {
      window.newRouter(url);
    },
    handleDetail() {
      if (this.isDemo != 1) {
        if (this.isLogin) {
          this.handleGame(1);
        } else {
          this.showDetail = !this.showDetail;
        }
      } else {
        this.showDetail = !this.showDetail;
      }
    },
    handleGame(type) {
      // 1: real game, 2: fun play
      var route = "/games/" + this.playId + "-" + type + "-" + this.title.replace(/\s+/g, "-").toLowerCase();

      if (type == 2) {
        window.newRouter(route);
      } else {
        if ((parseFloat(this.getCoin.money) + parseFloat(this.getCoin.lockMoney)) > 0) {
          this.$AdjustEvent.startGame();
          if (this.playId == "90009") {
            window.newRouter("/Originals/Crash?playId=90009");
            return;
          }
          window.newRouter(route);
        } else {
          if (window.innerWidth > 1200) {
            // web deposit
            this.$emit("deposit");
          } else {
            this.handleModal("deposit");
          }
        }
      }
    },
    handleModal(type) {
      this.type = type;
      this.showModal = true;
    },
    // web login
    login(action) {
      this.$emit("login", action);
    },
  },
  computed: {
    ...mapGetters(["getChannelInfo", "getCoin"]),
    ...mapState(["isLogin"]),
    miniLogo() {
      var cacheLogoUrl = Cookie.get("mini_logo_url");
      if (cacheLogoUrl) {
        return cacheLogoUrl;
      }
      return this.getChannelInfo.logoMini;
    },
  },
  watch: {
    isLogin(newValue, oldValue) {
      if (this.isLogin) {
        this.showDetail = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/web/gameImage.scss";
@import "/assets/scss/mobile/gameImage.scss";
</style>
