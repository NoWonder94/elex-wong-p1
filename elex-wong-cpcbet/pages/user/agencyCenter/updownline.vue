<template>
  <div class="updownline">
    <div class="upline">
      <div class="upline-back back-title">
        <span @click="back">
          <i class="el-icon-back"></i>{{ $t("updownline.title") }}
        </span>
      </div>
      <div class="upline-wrapping-mobile">
        <div class="upline-title">
          <ContentTitle :text="$t('updownline.myUpline')" />
        </div>
        <div class="upline-content">
          <div class="upline-content-exist" v-if="upline != null">
            <div class="upline-content-exist-item">
              {{ $t("updownline.nickName") }}: {{ upline.nick_name }}
            </div>
            <div class="upline-content-exist-item">ID: {{ upline.id }}</div>
          </div>
          <div class="upline-content-none" v-if="upline == null">
            {{ $t("updownline.noUpline") }}
          </div>
        </div>
      </div>
    </div>
    <div class="myname-card">
      <div class="myname-card-title">
        <ContentTitle :text="$t('updownline.myNameCard')" />
      </div>
      <!-- <div class="myname-card-edit-button">编辑名片</div> -->
      <div class="myname-card-content" v-if="user">
        <div class="myname-card-image-container">
          <!-- <img src="../../../assets/img/bank1_bg.png" alt="" /> -->
          <img
            :src="userAvatar"
            v-if="user.avatar != ''"
            class="userAvatarExist"
          />
          <img src="../../../assets/img/default_pic2.png" v-else />
        </div>
        <div class="myname-card-content-grid">
          <div class="myname-card-grid-item">
            {{ $t("updownline.nickName") }}: {{ user.name }}
          </div>
          <div class="myname-card-grid-item padding-top">ID: {{ user.id }}</div>
          <div class="myname-card-grid-item">
            {{ $t("updownline.codeId") }}: {{ user.codeId }}
          </div>
          <div class="myname-card-grid-item">
            {{ $t("updownline.phone") }}:
            {{ user.phone == "" ? "not set" : user.phone }}
          </div>
        </div>
      </div>
      <!-- <div class="myname-card-copy-button">复制名片</div> -->
    </div>
    <div class="downline">
      <div class="downline-content">
        <div class="downline-title">
          <ContentTitle :text="$t('updownline.myDownlineDefault')" />
        </div>
        <div class="downline-item-container">
          <!-- <div class="downline-item">
              <div class="downline-item-title">直播佣金分成比例%</div>
              <div class="downline-item-value">70</div>
            </div>
            <hr /> -->
          <div class="downline-item">
            <div class="downline-item-title">
              {{ $t("updownline.gameCommissionPercentage") }}
            </div>
            <div class="downline-item-value">
              <el-input v-model="gamePercent"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="downline-content">
        <div class="downline-button-group">
          <div class="downline-button green-border-box" @click="downlinecheck">
            {{ $t("updownline.downlineCommissionPlan") }}
          </div>
          <div class="downline-button greenGradientButtonBg" @click="binding">
            {{ $t("updownline.bind") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContentTitle from "../../../components/ContentTitle.vue";

export default {
  name: "Updownline",
  head() {
    return {
      title: this.$t("updownline.title"),
    };
  },
  data() {
    return {
      upline: null,
      gamePercent: 0,
      user: {
        name: "",
        id: "",
        codeId: "",
        phone: "",
      },
      userAvatar: "",
    };
  },
  mounted() {
    this.init();
    this.getUser();
  },
  methods: {
    back() {
      this.$router.back();
    },

    getUser() {
      this.$api
        .requestByPost("User/get", null)
        .then((result) => {
          if (result.status) {
            this.userAvatar = result.data.avatar;
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

    init() {
      this.$api
        .requestByPost("/Proxy/relation", null)
        .then((result) => {
          if (result.status == true) {
            if (result.data.proxy != null) {
              this.upline = result.data.proxy;
            }

            if (result.data.user != null) {
              this.user.id = result.data.user.id;
              this.user.name = result.data.user.nick_name;
              this.user.codeId = result.data.user.code;
              this.user.phone = result.data.user.mobile;
              this.gamePercent = result.data.user.bet_commission_rate;
            }
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

    downlinecheck() {
      this.$router.push({ path: "/user/agencyCenter/commissionPlan" });
    },

    binding() {
      let params = { bet_rate: this.gamePercent };

      this.$api
        .requestByPost("/Proxy/saveRate", params)
        .then((result) => {
          if (result.status == true) {
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );
            this.init();
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
  components: { ContentTitle },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/updownline.scss";
@import "/assets/scss/mobile/updownline.scss";
</style>
