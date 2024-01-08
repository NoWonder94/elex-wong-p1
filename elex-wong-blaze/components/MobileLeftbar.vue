<template>
  <div class="mobile-left-bar" :class="{ 'is-showNav': isShowMobileNav }">
    <div class="mobile-leftbar-header">
      <div class="header-blaze-icon">
        <img :src="getChannelInfo.logoSmall" />
      </div>
      <div class="header-close-icon" @click="closeNav">
        <i class="el-icon-close"></i>
      </div>
    </div>
    <div class="header-child-menu-list">
      <div
        :class="['header-child-menu', $route.path == '/' ? 'selected' : '']"
        @click="openPage('/')"
      >
        <div class="header-child-menu-container">
          <div class="header-child-menu-icon">
            <Casino />
          </div>
          <div class="header-child-menu-title">{{ $tt("casino") }}</div>
        </div>
      </div>
      <div
        :class="[
          'header-child-menu',
          $route.path == '/sports' ? 'selected' : '',
        ]"
        @click="openPage('/sports')"
      >
        <div class="header-child-menu-container">
          <div class="header-child-menu-icon">
            <Sports />
          </div>
          <div class="header-child-menu-title">{{ $tt("_sports") }}</div>
        </div>
      </div>
    </div>
    <div class="earn-button" @click="handleBeforeLogin">
      💵 <span>{{ $tt("earn_free_money") }}</span>
    </div>
    <div class="menu-list">
      <div class="menu" v-if="originalGameList.length > 0">
        <div class="menu-row" @click="showBlazeMenu = !showBlazeMenu">
          <span>{{ $tt("blaze_original") }}</span>
          <i :class="menuArrow(showBlazeMenu)"></i>
        </div>
        <!-- <div class="child-menu-list" :class="{ 'is-Hide': !showBlazeMenu }">
          <div class="child-menu">
            <div class="child-menu-icon">
              <Recently />
            </div>
            <div class="child-menu-title">{{ $tt("recently_play") }}</div>
          </div>
        </div> -->
        <div
          class="child-menu-list"
          v-for="blaze in originalGameList"
          :key="blaze.id"
          :class="{ 'is-Hide': !showBlazeMenu }"
        >
          <div class="child-menu" @click="handleGame(1, blaze)">
            <div class="child-menu-icon">
              <!-- <img :src="require(`@/assets/img/${blaze.icon}`)" /> -->
            </div>
            <div class="child-menu-title">
              {{ blaze.gameName }}
            </div>
          </div>
        </div>
      </div>
      <hr class="leftbar-hr" />
      <div class="menu">
        <div class="menu-row" @click="showCasinoMenu = !showCasinoMenu">
          <span>{{ $tt("casino") }}</span>
          <i :class="menuArrow(showCasinoMenu)"></i>
        </div>
        <div
          class="child-menu-list"
          v-for="casino in casinos"
          :key="casino.id"
          :class="{ 'is-Hide': !showCasinoMenu }"
        >
          <!-- v-show="showCasinoMenu" -->
          <div class="child-menu" @click="openPage(casino.url)">
            <div class="child-menu-icon">
              <img :src="require(`@/assets/img/${casino.icon}`)" />
            </div>
            <div class="child-menu-title">
              {{ casino.title }}
            </div>
          </div>
        </div>
      </div>
      <hr class="leftbar-hr" />
      <div class="menu">
        <div class="menu-row" @click="showSportMenu = !showSportMenu">
          <span>{{ $tt("_sports") }}</span>
          <i :class="menuArrow(showSportMenu)"></i>
        </div>
        <div
          class="child-menu-list"
          v-for="sport in sportList"
          :key="sport.id"
          :class="{ 'is-Hide': !showSportMenu }"
        >
          <!-- v-show="showSportMenu" -->
          <div class="child-menu" @click="handleGame(1, sport)">
            <div class="child-menu-icon">
              <img :src="require(`@/assets/img/${sport.icon}`)" />
            </div>
            <div class="child-menu-title">
              {{ sport.gameName }}
            </div>
          </div>
        </div>
      </div>
      <hr class="leftbar-hr" />
      <div class="menu nav-menu">
        <div class="leftbar-child-menu-list">
          <div class="leftbar-child-menu" @click="openLiveSupport">
            <span>{{ $tt("live_support") }} </span>
          </div>
          <div class="leftbar-child-menu" @click="openPage('/promotion')">
            <span> {{ $tt("_promotions") }} </span>
          </div>
          <div class="leftbar-child-menu" @click="handleBeforeLogin">
            <span> {{ $tt("referFriend") }}</span>
          </div>
          <div class="leftbar-child-menu" @click="openPage('/vip/vipClub')">
            <span> {{ $tt("vip_club") }}</span>
          </div>
          <div class="leftbar-menu-row" @click="showSponsors = !showSponsors">
            <span> {{ $tt("sponsorships") }}</span>
            <i class="fas fas fa-angle-down menu-collapse-icon"></i>
          </div>
          <div
            class="leftbar-child-menu-list"
            v-for="sponsor in sponsors"
            :key="sponsor.id"
            :class="{ 'is-Hide': !showSponsors }"
            @click="openPage(sponsor.url)"
          >
            <div class="leftbar-child-menu">
              <div class="leftbar-child-menu-icon">
                <SolidFutbol />
              </div>
              <div class="leftbar-child-menu-title">{{ sponsor.title }}</div>
            </div>
          </div>
          <!-- <div class="leftbar-child-menu">
            <span> {{ $tt("faq") }} </span>
          </div> -->
        </div>
      </div>
    </div>
    <ShowModal v-if="showModal" :type="type" @close="showModal = false" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
/* icon */
import Recently from "~/components/svg/leftbar/Recently.vue";
import SolidFutbol from "~/components/svg/leftbar/SolidFutbol.vue";
import Sports from "~/components/svg/Sports.vue";
import Casino from "~/components/svg/Casino.vue";

export default {
  name: "MobileLeftBar",
  components: {
    Recently,
    SolidFutbol,
    Sports,
    Casino,
  },
  props: {
    isShowMobileNav: {
      type: Boolean,
    },
  },
  data() {
    return {
      showBlazeMenu: true,
      showCasinoMenu: true,
      showSportMenu: false,
      showSponsors: false,
      showModal: false,
      type: "",
      blazes: [
        // {
        //   id: 1,
        //   icon: "blaze.svg",
        //   url: "",
        //   title: "Crash",
        //   url: "/Originals/Crash?playId=90009",
        // },
        // { id: 2, icon: "double.svg", url: "", title: "Double" },
        // { id: 3, icon: "mines.svg", url: "", title: "Mines" },
        // { id: 4, icon: "dice.svg", url: "", title: "Dice" },
        // { id: 5, icon: "plinko.svg", url: "", title: "Plinko" },
      ],
      casinos: [
        {
          id: 6,
          icon: "slot.svg",
          url: "/games/category/slots",
          title: this.$tt("slots"),
        },
        {
          id: 7,
          icon: "casino.svg",
          url: "/games/category/liveCasino",
          title: this.$tt("live_casino"),
        },
        {
          id: 8,
          icon: "game show.svg",
          url: "/games/category/gameShows",
          title: this.$tt("game_shows"),
        },
        // { id: 9, icon: "tableGame.svg", url: "", title: "Table Games" },
        // { id: 10, icon: "bonusBuy.svg", url: "", title: "Bonus Buy" },
        {
          id: 11,
          icon: "provider.svg",
          url: "/games/providers",
          title: this.$tt("providers"),
        },
        // { id: 12, icon: "spinner.svg", url: "", title: "Spinner" },
      ],

      sports: [],

      sponsors: [
        {
          id: 18,
          icon: "google.svg",
          url: "/article/Neymar",
          title: "Neymar Jr.",
        },
      ],
    };
  },

  computed: {
    ...mapGetters([
      "getChannelInfo",
      "getSportChannel",
      "getOriginalGames",
      "getCoin",
    ]),
    ...mapState(["isLogin"]),

    /* sport list */
    /**
     * example
       sports: [
        { id: 13, icon: "soccer.svg", url: "", title: "Soccer" },
        { id: 14, icon: "soccer.svg", url: "", title: "FIFA" },
        { id: 15, icon: "soccer.svg", url: "", title: "Primeira Liga" },
        { id: 16, icon: "laliga.svg", url: "", title: "La Liga" },
        { id: 17, icon: "uefa.svg", url: "", title: "UEFA Champions" },
      ],
    **/
    sportList() {
      var data = this.getSportChannel;
      if (data == null) {
        return [];
      }
      return [
        {
          id: data.id,
          icon: "soccer.svg",
          url: "",
          gameName: data.name,
          playId: data.playId,
        },
      ];
    },
    /* sport list end */
    originalGameList() {
      var data = this.getOriginalGames;
      if (data == null) {
        return [];
      }
      return data;
    },
  },
  methods: {
    menuArrow(v) {
      if (v) {
        return "fas fas fa-angle-up menu-collapse-icon";
      } else {
        return "fas fas fa-angle-down menu-collapse-icon";
      }
    },
    openPage(route) {
      if (route == "/sports") {
        if (!this.isLogin) {
          this.type = "login";
          this.showModal = true;
          return false;
        }
        if (this.sportList.length > 0) {
          this.handleGame(1, this.sportList[0]);
        }
      } else {
        window.newRouter(route);
      }
      /*
      else if (route == "/promotion") {
        if (!this.isLogin) {
          this.type = "login";
          this.showModal = true;
          return false;
        } else {
          window.newRouter(route);
        }
      }
      */
      this.closeNav();
    },
    closeNav() {
      this.$emit("handle-close", false);
    },
    handleBeforeLogin() {
      if (this.isLogin) {
        // window.newRouter("/referral");
        this.handleModal("refer");
        // this.closeNav();
      } else {
        this.handleModal("register");
      }
    },
    handleModal(type) {
      this.type = type;
      this.showModal = true;
    },

    handleGame(type, game) {
      if (!this.isLogin) {
        this.type = "login";
        this.showModal = true;
        return false;
      }
      this.$emit("handle-close", false);
      // 1: real game, 2: fun play
      var route =
        "/games/" +
        game.playId +
        "-" +
        type +
        "-" +
        game.gameName.replace(/\s+/g, "-").toLowerCase();

      if (type == 2) {
        window.newRouter(route);
      } else {
        if (
          parseFloat(this.getCoin.money) + parseFloat(this.getCoin.lockMoney) >
          0
        ) {
          this.$AdjustEvent.startGame();
          // REAL ORIGINAL GAME HANDLE
          if (game.playId == "90009") {
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

    openLiveSupport() {
      this.closeNav();
      window.openChat && window.openChat();
      // LC_API.open_chat_window();
      // another live chat
      // window.open(
      //   "https://vue.livehelp100service.com/chatwindow.aspx?siteId=65000839&planId=54e8c5fd-d2c7-4629-8e93-335f95e65988"
      // );
    },
  },
  watch: {
    "$i18n.locale"(newValue) {
      if (newValue) {
        (this.casinos = [
          {
            id: 6,
            icon: "slot.svg",
            url: "/games/category/slots",
            title: this.$tt("slots"),
          },
          {
            id: 7,
            icon: "casino.svg",
            url: "/games/category/liveCasino",
            title: this.$tt("live_casino"),
          },
          {
            id: 8,
            icon: "game show.svg",
            url: "/games/category/gameShows",
            title: this.$tt("game_shows"),
          },
          // { id: 9, icon: "tableGame.svg", url: "", title: "Table Games" },
          // { id: 10, icon: "bonusBuy.svg", url: "", title: "Bonus Buy" },
          {
            id: 11,
            icon: "provider.svg",
            url: "/games/providers",
            title: this.$tt("providers"),
          },
          // { id: 12, icon: "spinner.svg", url: "", title: "Spinner" },
        ]),
          this.$forceUpdate();
      }
    },
  },
};
</script>

<style lang="scss" type="text/css" scoped>
@import "@/assets/scss/mobile/mobileLeftBar.scss";
</style>
