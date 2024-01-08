<template>
  <div class="profile-menu">
    <div class="mobile-header">
      <i class="el-icon-arrow-left" @click="back"></i>
      <div class="title" :class="desc == '' ? 'title-padding' : ''">
        {{ title }}
      </div>
      <div class="desc" v-if="desc">
        {{ desc }}
      </div>
    </div>
    <div class="menu-list">
      <div
        class="menu-item"
        v-for="(item, index) in list"
        :key="index"
        @click="handleUrl(item.url)"
      >
        <div class="menu-item-left">
          <div class="menu-item-title">
            {{ item.title }}
          </div>
          <div class="menu-item-desc">
            {{ item.desc }}
          </div>
        </div>
        <div class="menu-item-right" v-if="item.isMore">
          <i class="el-icon-caret-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileMenu",
  meta: {
    auth: true,
  },
  data() {
    return {
      params: "",
      name: "",
      title: "",
      desc: "",
      list: [],
      accountMenuList: [
        {
          title: this.$tt("accountInfo"),
          desc: this.$tt("account_info_desc"),
          isMore: false,
          url: "account/accountInfo",
        },
        {
          title: this.$tt("personalInfo"),
          desc: this.$tt("personal_info_desc"),
          isMore: false,
          url: "account/personalInfo",
        },
        {
          title: this.$tt("documents"),
          desc: this.$tt("documents_desc"),
          isMore: true,
          name: "documents",
          url: "profileMenu?name=documents",
        },
        {
          title: this.$tt("preferences"),
          desc: this.$tt("preferences_desc"),
          isMore: false,
          url: "preferences",
        },
        // {title: this.$tt("chat_ignores"), desc: this.$tt("chat_ignores_desc"), isMore: false, url:'chatIgnores'},
        {
          title: this.$tt("restrictions"),
          desc: this.$tt("restriction_desc"),
          isMore: true,
          name: "restriction",
          url: "profileMenu?name=restrictions",
        },
      ],
      documentMenuList: [
        {
          title: this.$tt("proofOfIdentification"),
          desc: this.$tt("identification_proof_desc"),
          isMore: false,
          url: "documents/identificationProof",
        },
        {
          title: this.$tt("proofOfAddress"),
          desc: this.$tt("address_proof_desc"),
          isMore: false,
          url: "documents/addressProof",
        },
      ],
      restrictionMenuList: [
        {
          title: this.$tt("suspension"),
          desc: this.$tt("suspension_desc"),
          isMore: false,
          url: "restrictions/suspension",
        },
      ],
      gameHistoryMenuList: [
        // {
        //   title: this.$tt("transaction_history"),
        //   desc: this.$tt("transaction_history_desc"),
        //   isMore: false,
        //   url: "transactions",
        // },
        {
          title: this.$tt("game_provider_history"),
          desc: this.$tt("game_provider_history_desc"),
          isMore: false,
          url: "gameHistory",
        },
        {
          title: this.$tt("deposit_history"),
          desc: this.$tt("deposit_history_desc"),
          isMore: false,
          url: "transactions/deposits",
        },
        {
          title: this.$tt("withdrawal_history"),
          desc: this.$tt("withdrawal_history_desc"),
          isMore: false,
          url: "transactions/withdrawals",
        },
      ],

      width: 0,
    };
  },
  mounted() {
    this.getUrl();
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    getUrl() {
      this.params = new URLSearchParams(window.location.search);
      this.name = this.params.get("name");
      this.getList(this.name);
    },
    getList(name) {
      switch (name) {
        case "account":
          this.title = this.$tt("account");
          this.desc = "";
          this.list = this.accountMenuList;
          break;
        case "documents":
          this.title = this.$tt("documents");
          this.desc = this.$tt("documents_desc");
          this.list = this.documentMenuList;
          break;
        case "restrictions":
          this.title = this.$tt("restrictions");
          this.desc = this.$tt("restriction_desc");
          this.list = this.restrictionMenuList;
          break;
        case "history":
          this.title = this.$tt("history");
          this.desc = "";
          this.list = this.gameHistoryMenuList;
          break;
        default:
          break;
      }
    },
    handleUrl(url) {
      window.newRouter("/profile/" + url);
    },
    back() {
      this.$router.back();
    },
    onResize() {
      this.width = window.innerWidth;
      if (this.width > 1200) {
        if (this.name == "account") {
          this.$router.replace(this.localePath("/profile/account/accountInfo"));
        } else if (this.name == "history") {
          this.$router.replace(this.localePath("/profile/gameHistory"));
        }
      }
    },
  },
  watch: {
    $route(newValue, oldValue) {
      this.getUrl();
      this.onResize();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base.scss";

@media only screen and (max-width: 1200px) {
  .profile-menu {
    position: relative;
    color: $white;
    min-height: 90vh;

    .mobile-header {
      position: relative;
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      padding: 15px 0;
      border-bottom: 1px solid $separator;
      line-height: 1.7;
      height: 70px;

      i {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 20px;
        font-size: 18px;
      }

      .title {
        text-transform: uppercase;
      }

      .title-padding {
        padding-top: 10px;
      }

      .desc {
        color: $lightGrey;
        font-size: 12px;
      }
    }

    .menu-list {
      .menu-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        line-height: 1.6;
        border-bottom: 1px solid $separator;
        font-size: 12px;

        .menu-item-title {
          font-weight: bold;
        }

        .menu-item-desc {
          color: $lightGrey;
        }
      }
    }
  }
}
</style>
