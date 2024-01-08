<template>
  <div class="left-bar" :class="{ 'is-collapsed': isCollapsed }">
    <div class="earn-button" @click="handleBeforeLogin">
      💵 <span v-show="!isCollapsed">{{ $tt("earn_free_money") }}</span>
    </div>
    <div class="menu-list">
      <div class="menu" v-if="originalGameList.length > 0">
        <div
          class="menu-row"
          v-show="!isCollapsed"
          @click="showBlazeMenu = !showBlazeMenu"
        >
          <span>{{ $tt("blaze_original") }}</span>
          <i :class="menuArrow(showBlazeMenu)"></i>
        </div>
        <!-- <div
          class="child-menu-list"
          :class="{ 'is-Hide': !showBlazeMenu }"
          v-if="isLogin"
        >
          <div class="child-menu">
            <div class="child-menu-icon">
              <Recently />
            </div>
            <div class="child-menu-title" v-show="!isCollapsed">
              {{ $tt("recently_play") }}
            </div>
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
              <!-- <img :src="blaze.imgPlay" style="width: 20px;" /> -->
            </div>
            <div class="child-menu-title" v-show="!isCollapsed">
              {{ blaze.gameName }}
            </div>
          </div>
        </div>
      </div>
      <hr class="leftbar-hr" v-show="!isCollapsed" />
      <div class="menu">
        <div
          class="menu-row"
          v-show="!isCollapsed"
          @click="showCasinoMenu = !showCasinoMenu"
        >
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
            <div class="child-menu-title" v-show="!isCollapsed">
              {{ casino.title }}
            </div>
          </div>
        </div>
      </div>
      <hr class="leftbar-hr" v-show="!isCollapsed" />
      <div class="menu">
        <div
          class="menu-row"
          v-show="!isCollapsed"
          @click="showSportMenu = !showSportMenu"
        >
          <span> {{ $tt("_sports") }}</span>
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
            <div class="child-menu-title" v-show="!isCollapsed">
              {{ sport.gameName }}
            </div>
          </div>
        </div>
      </div>
      <hr class="leftbar-hr" v-show="!isCollapsed" />
      <div class="menu nav-menu" v-show="!isCollapsed">
        <div class="leftbar-child-menu-list">
          <div class="leftbar-child-menu" @click="openLiveSupport">
            <span> {{ $tt("live_support") }} </span>
          </div>
          <div class="leftbar-child-menu" @click="openPage('/promotion')">
            <span> {{ $tt("_promotions") }} </span>
          </div>
          <div class="leftbar-child-menu" @click="handleBeforeLogin">
            <span> {{ $tt("referFriend") }}</span>
          </div>
          <div class="leftbar-child-menu" @click="openPage('/vip/vipClub')">
            <span> {{ $tt("vip_club") }} </span>
          </div>
          <div class="leftbar-menu-row" @click="showSponsors = !showSponsors">
            <span> {{ $tt("sponsorships") }} </span>
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
/* icon */
import { mapGetters, mapState } from "vuex";
import Recently from "~/components/svg/leftbar/Recently.vue";
import SolidFutbol from "~/components/svg/leftbar/SolidFutbol.vue";

export default {
  name: "LeftBar",
  props: {
    isCollapsed: {
      type: Boolean,
    },
  },
  components: {
    Recently,
    SolidFutbol,
  },
  data() {
    return {
      showModal: false,
      type: "",
      showBlazeMenu: true,
      showCasinoMenu: true,
      showSportMenu: false,
      showSponsors: false,
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
    ...mapGetters(["getSportChannel", "getOriginalGames", "getCoin"]),
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
    originalGameList() {
      var data = this.getOriginalGames;
      if (data == null) {
        return [];
      }
      return data;
    },
    /* sport list end */
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
      // if (route == "/promotion") {
      //   if (!this.isLogin) {
      //     this.type = "login";
      //     this.showModal = true;
      //     return false;
      //   }
      // }
      window.newRouter(route);
    },

    handleBeforeLogin() {
      if (this.isLogin) {
        // window.newRouter("/referral");
        this.handleModal("refer");
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
      window.openChat && window.openChat();
      // activate live chat
      // LC_API.open_chat_window();
      // another live chat
      // window.open(
      //   "https://vue.livehelp100service.com/chatwindow.aspx?siteId=65000839&planId=54e8c5fd-d2c7-4629-8e93-335f95e65988"
      // );
    },
  },
  watch: {
    isCollapsed(newValue, oldValue) {
      if (newValue == true) {
        this.showBlazeMenu = true;
        this.showCasinoMenu = true;
        this.showSportMenu = true;
      } else {
        this.showBlazeMenu = true;
        this.showCasinoMenu = true;
        this.showSportMenu = false;
      }
    },

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
@import "@/assets/scss/base.scss";

.left-bar {
  position: relative;
  left: 0;
  width: 244px;
  height: calc(100vh - 66px);
  border-right: 1px solid #323b45;
  overflow: hidden;
  overflow-y: auto;
  background: $darkBackground;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
  transition: all 0.3s ease;

  .earn-button {
    margin: 18px 23px 15px;
    padding: 10px;
    display: flex;
    background-color: #f12c4c;
    border: 1px solid #f12c4c;
    border-radius: 4px;
    color: #fff;
    font-family: SofiaPro, "Roboto", sans-serif, Nasalization !important;
    font-size: 13px;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;

    &:hover {
      background-color: initial;
      border: 1px solid #323b45;
      transition: all 0.5s;
      cursor: pointer;
    }
  }

  .menu-list {
    .leftbar-hr {
      border: 1px solid #323b45;
    }

    .menu {
      padding: 0 34px;
      color: #bcbfc7;
      font-size: 12px;

      .menu-row {
        display: flex;
        height: 60px;
        font-weight: 700;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
      }

      .child-menu-list {
        transition: all 0.5s ease;

        .child-menu {
          padding: 8px 0;
          font-size: 14px;
          gap: 10px;
          display: flex;

          .child-menu-icon {
            font-size: 14px;
          }

          .child-menu-title {
            font-weight: 500;
          }

          &:hover {
            .child-menu-icon {
              filter: brightness(0) saturate(100%) invert(100%) sepia(0%)
                saturate(0%) hue-rotate(130deg) brightness(104%) contrast(107%);
            }
          }

          &:hover {
            color: #fff;
            cursor: pointer;
          }
        }
      }

      .leftbar-child-menu-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        .leftbar-menu-row {
          width: 100%;
          margin-left: -10px;
          padding: 10px;
          color: $white;
          font-size: 12px;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          cursor: pointer;

          &:hover {
            background-color: #1a242d;
          }
        }

        .leftbar-child-menu {
          width: 100%;
          height: 40px;
          margin-left: -10px;
          padding-left: 10px;
          color: $white;
          font-size: 12px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          // background-color: #1a242d;
          cursor: pointer;
          text-transform: uppercase;

          .leftbar-child-menu-icon {
            padding-left: 10px;
            padding-right: 10px;
          }

          .leftbar-child-menu-title {
            width: 100%;
            text-align: left;
          }

          &:hover {
            background-color: #1a242d;
          }
        }
      }
    }

    .nav-menu {
      // padding: 0;
      margin: 22px auto;
      text-align: center;
    }
  }
}

/* Collapse Side Bar */
.is-collapsed {
  width: 83px;
}

/* Hide scrollbar for Chrome, Safari, and Opera */
::-webkit-scrollbar {
  display: none;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

/* Hide scrollbar for Firefox */
body {
  scrollbar-width: none;
}

/* collapsed side bar menu */
.is-Hide {
  height: 0;
  opacity: 0;
  transform: translateY(-100%);
  overflow: hidden;
}
</style>
