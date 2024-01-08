<template>
  <div class="header">
    <div class="headers" v-if="isWallet == true">
      <div class="header-wallet" @click="routeToWallet">
        <img class="header-wallet-icon" src="../assets/img/wallet.svg" />
        <p class="header-wallet-label">{{ headerTitle }}</p>
      </div>
      <div class="header-close" @click="routeToDashboard">
        <img class="header-close-icon" src="../assets/img/wrong.svg" />
      </div>
    </div>
    <div class="headers" v-else>
      <div class="header-brand-nav">
        <img class="header-branding-icon" :src="logo" v-if="logo" />
        <img class="header-branding-icon" src="../assets/img/logo.png" v-else />

        <el-select
          class="header-nav-options"
          :popper-append-to-body="false"
          @change="onPageSelect"
          v-model="headerOption"
          placeholder="select"
        >
          <el-option
            class="header-nav-optionsList"
            v-for="item in headers"
            :key="item.id"
            :value="item.nav"
            :label="item.label"
          ></el-option>
        </el-select>
      </div>

      <div class="header-wallet" @click="routeToWallet">
        <p class="header-wallet-label">Wallet</p>
        <img class="header-wallet-icon" src="../assets/img/wallet.svg" />
      </div>
      <div class="header-user" v-if="this.isLogin && this.user.account">
        <img class="header-user-icon" src="../assets/img/player.svg" />
        <p>{{ this.user.account.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      headers: [],
      headerOption: "/",
      agentId: null,
      isWallet: false,
    };
  },
  props: ["logo"],
  mounted() {
    this.initRoute();
    this.checkPage();
    var authToken = localStorage.getItem("authToken");
    this.getHeader();
    if (authToken) {
      this.getUser();
    }
  },
  computed: {
    ...mapState(["user", "isLogin"]),
  },
  methods: {
    getHeader() {
      var isFirstAgent = localStorage.getItem("agentLevel");
      if (isFirstAgent == 1) {
        this.headers = [
          { id: "fa1", label: "Dashboard", nav: "/" },
          { id: "fa2", label: "Agent", nav: "/agent" },
          { id: "fa3", label: "Players", nav: "/players" },
          // { id: "fa4", label: "Commission", nav: "/commission" },
          { id: "fa5", label: "Profile", nav: "/profile" },
          { id: "fa6", label: "Funds Log", nav: "/fundsLog" },
          { id: "fa7", label: "Report", nav: "/report" },
          { id: "fa8", label: "Player Report", nav: "/playersReport" },
          { id: "fa9", label: "Game Bet History", nav: "/betHistory" },
          { id: "fa10", label: "Products", nav: "/products" },
          { id: "fa11", label: "Logout", nav: "/logout" },
        ];
      } else {
        this.headers = [
          { id: "1", label: "Dashboard", nav: "/" },
          { id: "2", label: "Agent", nav: "/agent" },
          { id: "3", label: "Players", nav: "/players" },
          { id: "5", label: "Profile", nav: "/profile" },
          { id: "6", label: "Funds Log", nav: "/fundsLog" },
          { id: "7", label: "Report", nav: "/report" },
          { id: "8", label: "Player Report", nav: "/playersReport" },
          { id: "9", label: "Game Bet History", nav: "/betHistory" },
          { id: "10", label: "Products", nav: "/products" },
          { id: "11", label: "Logout", nav: "/logout" },
        ];
      }
    },

    routeToWallet() {
      this.$router.push("/wallet");
    },

    routeToDashboard() {
      this.$router.back();
    },

    checkPage() {
      if (this.headerOption == "/wallet") {
        this.isWallet = true;
        this.headerTitle = "Wallet";
      } else {
        this.isWallet = false;
      }

      if (
        this.headerOption == "/transfer" ||
        this.headerOption == "/addAgentPlayer" ||
        this.headerOption == "/withdraw" ||
        this.headerOption == "/withdrawDetail" ||
        this.headerOption == "/withdrawRequest" ||
        this.headerOption == "/deposit" ||
        this.headerOption == "/depositRequest" ||
        this.headerOption == "/transferRequest"
      ) {
        $(".header").css("display", "none");
      } else {
        $(".header").css("display", "block");
      }
    },

    onPageSelect(event) {
      if (event == "/logout") {
        sessionStorage.setItem("is_login", "false");
        localStorage.removeItem("roleAccess");
        localStorage.removeItem("authToken");
        localStorage.removeItem("agentId");
        localStorage.removeItem("gameType");
        localStorage.removeItem("agentLevel");
        this.$store.dispatch("updateUserInfo", {});
        this.$notiflix.Notify.success(this.$t("message.logout"), {
          showOnlyTheLastOne: true,
        });
        this.$router.push("/");
        window.location.reload();
        return;
      }
      if (event == "/profile") {
        this.$router.push({ path: "/agent/" + this.agentId });
      } else {
        this.$router.push(this.headerOption);
      }
    },

    initRoute() {
      this.headerOption = "/" + this.$route.path.split("/")[1];
    },
    getUser() {
      this.$api
        .requestByPost("/Account/get", null)
        .then((result) => {
          if (result.status == true) {
            this.agentId = result.data.id;
            this.$store.dispatch("updateUserInfo", result.data);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
  },

  watch: {
    // Watch for route changes
    $route(route) {
      // Change the value of the selected option
      if (route) this.headerOption = route.path;
      if (route.path.split("/").length > 2) {
        this.headerOption = "/" + route.path.split("/")[1];
      }
      this.checkPage();
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/header.scss";
@import "/assets/scss/mobile/header.scss";
</style>
