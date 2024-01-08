<template>
  <div class="user-profile mobile">
    <div class="coin">
      <el-select v-model="currency" @change="onSelectCurrency">
        <el-option
          v-for="(item, index) in currencyList"
          :key="index"
          :value="item.code"
          :label="item.code"
        >
          {{ item.code }}
        </el-option>
      </el-select>
    </div>
    <div class="content" v-if="user">
      <div class="profile">
        <div class="profile-image" v-if="user.avatar != ''">
          <img :src="user.avatar" />
        </div>
        <div class="profile-image" v-else>
          <img src="../../assets/img/profile_default.png" />
        </div>
        <div class="profile-detail">
          <div class="profile-username">
            {{ user.name }}
          </div>
          <div class="profile-name">
            {{ user.nick_name }}
          </div>
          <div class="profile-level">
            <img :src="userGroup.icon" v-if="userGroup.icon != null" />
            <img src="../../assets/img/my_level.png" v-else />
            {{ userGroup.name }}
          </div>
        </div>
      </div>
      <div class="balance">
        <div class="balance-title">
          {{ $t("user.balance") }}
        </div>
        <div class="balance-amount">{{ currency }} {{ user.balance }}</div>
      </div>
      <div class="icon-row">
        <!-- <div class="icon-item" @click="handleRoute('deposit')">
          <div class="icon-img">
            <img src="../../assets/img/deposit.svg" />
          </div>
          <div class="icon-title">{{ $t("user.deposit") }}</div>
        </div>
        <div class="icon-item" @click="handleRoute('withdraw')">
          <div class="icon-img">
            <img src="../../assets/img/withdraw.svg" />
          </div>
          <div class="icon-title">{{ $t("user.withdraw") }}</div>
        </div> -->
        <div class="icon-item" @click="handleRoute('user')">
          <div class="icon-img">
            <img src="../../assets/img/profile.svg" />
          </div>
          <div class="icon-title">{{ $t("user.user") }}</div>
        </div>
      </div>
      <hr class="line" />
      <div class="menu">
        <div
          v-for="(item, index) in menuList"
          :key="index"
          class="menu-item"
          @click="handleRoute(item.link)"
        >
          <div class="menu-title">
            <img :src="item.img" />
            {{ item.title }}
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Profile",
  // head() {
  //   return {
  //     title: this.$t("user.user"),
  //   };
  // },
  data() {
    return {
      userGroup: {},
      currency: null,
      menuList: [
        {
          title: this.$t("user.betHistory"),
          link: "betHistory",
          img: require("../../assets/img/games.svg"),
        },
        {
          title: this.$t("user.bonus"),
          link: "bonus",
          img: require("../../assets/img/agency.svg"),
        },
        // {
        //   title: this.$t("user.agencyCenter"),
        //   link: "agencyCenter",
        //   img: require("../../assets/img/agency.svg"),
        // },
        {
          title: this.$t("user.level"),
          link: "myLevel",
          img: require("../../assets/img/level.svg"),
        },
        {
          title: this.$t("user.setting"),
          link: "setting",
          img: require("../../assets/img/setting.svg"),
        },
      ],
    };
  },
  computed: {
    ...mapState(["currencyList", "user"]),
  },
  mounted() {
    this.init();
    this.getUser();
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      if (window.innerWidth > 700 && this.$route.path == "/user/profile") {
        this.$router.replace({ path: "/user/deposit" }).catch((error) => {});
      }
    },
    onSelectCurrency() {
      this.$store.dispatch("updateCurrency", this.currency);
      window.location.reload();
    },
    init() {
      var selected_currency = localStorage.getItem("selected_currency");
      this.currency = selected_currency;
    },
    handleRoute(link) {
      this.$router.push({ path: "/user/" + link });
    },
    getUser() {
      this.$api
        .requestByPost("User/get", null)
        .then((result) => {
          if (result == false) {
            return;
          }
          if (result.status) {
            this.$store.dispatch("updateUserInfo", result.data);
            this.userGroup = result.data.user_group;
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/profile.scss";
@import "/assets/scss/mobile/profile.scss";
</style>
