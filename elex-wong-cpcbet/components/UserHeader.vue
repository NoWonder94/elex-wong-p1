<template>
  <div class="user-header">
    <div class="left-header web" v-if="user">
      <div class="coin">
        <el-select v-model="currency" @change="onSelectCurrency">
          <el-option
            v-for="(item, index) in currencyList"
            :key="index"
            :value="item.code"
            :label="item.code"
            >{{ item.code }}</el-option
          >
        </el-select>
      </div>
      <div class="profile">
        <div class="profile-image" v-if="user.avatar != ''">
          <img :src="user.avatar" />
        </div>

        <div class="profile-image" v-else>
          <img src="../assets/img/profile_default.png" />
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
            <img src="../assets/img/my_level.png" v-else />
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
        <!-- <div
          class="icon-img"
          @click="handleRoute('deposit')"
          v-if="user.is_deposit"
        >
          <img src="../assets/img/deposit.svg" />
        </div>
        <div class="icon-img" @click="handleRoute('withdraw')">
          <img src="../assets/img/withdraw.svg" />
        </div> -->
        <!-- <div class="icon-img" @click="handleRoute('transfer')">
          <img src="../assets/img/transfer.png">
        </div> -->
        <div class="icon-img" @click="handleRoute('user')">
          <img src="../assets/img/profile.svg" />
        </div>
      </div>
      <hr class="line" />
      <div class="menu">
        <div
          v-for="(item, index) in menuList"
          :key="index"
          :class="['menu-item', active_path == item.link ? 'active' : '']"
          @click="handleRoute(item.link)"
        >
          <img v-if="active_path == item.link" :src="item.img_active" />
          <img v-else :src="item.img" />
          {{ item.title }}
        </div>
      </div>
    </div>
    <div class="right-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UserHeader",
  data() {
    return {
      userGroup: {},
      currency: null,
      active_path: "",
      menuList: [
        {
          title: this.$t("user.betHistory"),
          link: "betHistory",
          img_active: require("../assets/img/games.svg"),
          img: require("../assets/img/games.svg"),
        },
        {
          title: this.$t("user.bonus"),
          link: "bonus",
          img_active: require("../assets/img/agency.svg"),
          img: require("../assets/img/agency.svg"),
        },
        // {
        //   title: this.$t("user.agencyCenter"),
        //   link: "agencyCenter",
        //   img_active: require("../assets/img/agency.svg"),
        //   img: require("../assets/img/agency.svg"),
        // },
        // {title: this.$t('user.message'), link: 'myMessage', img_active: require('../assets/img/my_message_1.png'), img: require('../assets/img/my_message.png')},
        {
          title: this.$t("user.level"),
          link: "myLevel",
          img_active: require("../assets/img/level.svg"),
          img: require("../assets/img/level.svg"),
        },
        {
          title: this.$t("user.integral"),
          link: "integral",
          img_active: require("../assets/img/level.svg"),
          img: require("../assets/img/level.svg"),
        },
        // {title: this.$t('user.post'), link: 'myPost', img_active: require('../assets/img/my_post_1.png'), img: require('../assets/img/my_post.png')},
        // {title: this.$t('user.verification'), link: 'verification', img_active: require('../assets/img/verification_1.png'), img: require('../assets/img/verification.png')},
        {
          title: this.$t("user.setting"),
          link: "setting",
          img_active: require("../assets/img/setting.svg"),
          img: require("../assets/img/setting.svg"),
        },
      ],
      isLoading: false,
    };
  },
  computed: {
    ...mapState(["currencyList", "user"]),
  },
  mounted() {
    this.init();
    this.getUser();
    this.getPath();
  },
  methods: {
    onSelectCurrency() {
      this.$store.dispatch("updateCurrency", this.currency);
      window.location.reload();
    },
    init() {
      var selected_currency = localStorage.getItem("selected_currency");
      this.currency = selected_currency;
    },
    getPath() {
      let path = this.$route.path;
      if (path) {
        let array = path.split("/");
        if (array.length >= 3) {
          if (array[1] == "user") {
            this.active_path = array[2];
          }
        }
      }
    },
    handleRoute(link) {
      this.$router.push({ path: "/user/" + link });
    },
    getUser() {
      this.$api
        .requestByPost("User/get", null)
        .then((result) => {
          if (result.status) {
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
  watch: {
    $route(to, from) {
      this.getPath();
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/userHeader.scss";
@import "/assets/scss/mobile/userHeader.scss";
</style>
