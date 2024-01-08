<template>
  <div class="withdraw-detail">
    <div class="title-section">
      <div class="back-title title">
        <i class="el-icon-back" @click="handleRoute('withdraw')"></i>
        {{ $t("withdraw.withdrawAccount") }}
      </div>
      <div class="type">
        <div class="type-title">
          {{ $t("withdraw.type") }}
        </div>
        <el-select v-model="type" v-on:change="getWithdrawAccount">
          <el-option
            v-for="(item, index) in types"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="card-list">
      <div v-swiper:mySwiper="swiperOption" class="swiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide card-box"
            v-for="(item, index) in cardList"
            :key="index"
            @click="deleteCard(item.id)"
          >
            <img
              v-if="item.id != -1"
              class="card-background"
              :src="require('../../assets/img/bank' + (index + 1) + '_bg.png')"
            />
            <img
              v-else
              class="card-background"
              :src="require('../../assets/img/bank_default_bg.png')"
            />
            <div class="card-content">
              <div class="card-content-num">
                {{ $t("withdraw.withdrawAccount") + " " + (index + 1) }}
              </div>
              <div class="card-content-detail">
                <div v-if="item.id == -1">+</div>
                <div v-if="item.id == -1">
                  {{ $t("withdraw.addNewAccount") }}
                </div>
                <div class="card-content-detail-name">
                  {{ item.bank_account }}
                </div>
                <div class="card-content-detail-bank">{{ item.bank_name }}</div>
              </div>
              <img
                v-if="item.id != -1"
                class="delete-button"
                :src="require('../../assets/img/delete.svg')"
              />
            </div>
          </div>
        </div>
      </div>
      <div id="prevBtn" class="swiper-button-prev"></div>
      <div id="nextBtn" class="swiper-button-next"></div>
      <div class="gradient-left"></div>
      <div class="gradient-right"></div>
    </div>
    <div v-if="showEdit" class="detail-section">
      <div v-if="type == 0" class="detail-input">
        <div class="detail-box">
          <div class="detail-section-title">
            {{ $t("withdraw.bank") }}
          </div>
          <el-select v-model="code" @change="onSelectBank">
            <el-option
              v-for="(item, index) in bankList"
              :key="index"
              :value="item.code"
              :label="item.name"
              >{{ item.name }}</el-option
            >
          </el-select>
          <!-- <el-input v-model="bankName" :placeholder="$t('withdraw.selectBank')"></el-input> -->
        </div>
        <div class="detail-box">
          <div class="detail-section-title">
            {{ $t("withdraw.bankCard") }}
          </div>
          <el-input v-model="account" placeholder="Sample123"></el-input>
        </div>
        <div class="detail-box">
          <div class="detail-section-title">
            {{ $t("withdraw.name") }}
          </div>
          <el-input
            v-model="realName"
            :placeholder="$t('withdraw.name')"
          ></el-input>
        </div>
        <!-- <div class="detail-box">
          <div class="detail-section-title">
            {{ $t("withdraw.bank_code") }}
          </div>
          <el-input v-model="code" placeholder=""></el-input>
        </div> -->
      </div>
      <div v-if="type == 1" class="detail-input">
        <div class="detail-box">
          <div class="detail-section-title">
            {{ $t("withdraw.crypto_type") }}
          </div>
          <el-select v-model="code">
            <el-option
              v-for="item in coins"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <div class="detail-box">
          <div class="detail-section-title">
            {{ $t("withdraw.crypto_address") }}
          </div>
          <el-input v-model="account" placeholder=""></el-input>
        </div>
      </div>
      <div v-if="type == 2" class="detail-input">
        <div class="detail-box">
          <div class="detail-section-title">
            {{ $t("withdraw.real_name") }}
          </div>
          <el-input
            v-model="realName"
            :placeholder="$t('withdraw.real_name')"
          ></el-input>
        </div>
        <div class="detail-box">
          <div class="detail-section-title">
            {{ $t("withdraw.phone_number") }}
          </div>
          <el-input
            v-model="account"
            :placeholder="$t('withdraw.phone_number')"
          ></el-input>
        </div>
      </div>
      <div class="detail-submit">
        <div class="reminder">
          <ContentTitle :text="$t('withdraw.reminder')" />
          <div class="reminder-subtitle">
            {{ $t("withdraw.reminder1") }}
          </div>
        </div>
        <div class="submit">
          <div class="button greenGradientButtonBg" @click="addCard">
            {{ $t("withdraw.submitAccount") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "WithdrawDetail",
  head() {
    return {
      title: this.$t("withdraw.title"),
    };
  },
  data() {
    return {
      bankList: [],
      cardList: [],
      type: 0,
      realName: "",
      bankName: "",
      account: "",
      name: "",
      code: "",
      types: [
        {
          id: 0,
          name: "Bank Account",
        },
        {
          id: 1,
          name: "Crypto Address",
        },
        {
          id: 2,
          name: "Gcash",
        },
      ],
      showEdit: false,
      swiperOption: {
        noNextTick: true,
        navigation: {
          nextEl: "#nextBtn",
          prevEl: "#prevBtn",
        },
        slidesPerView: "auto",
        slidesPerGroup: 1,
        spaceBetween: 10,
        breakpoints: {
          701: { spaceBetween: 20 },
        },
        on: {
          progress: function (swiper, progress) {
            if (progress < 1) {
              $(".gradient-left").css("display", "none");
              $(".gradient-right").css("display", "block");

              if ($(".swiper .swiper-slide").length < 3) {
                $(".gradient-right").css("display", "none");
              }
            }
          },
          reachEnd: function () {
            if ($(".swiper .swiper-slide").length > 2) {
              $(".gradient-left").css("display", "block");
            }
            $(".gradient-right").css("display", "none");
          },
        },
      },
    };
  },
  computed: {
    ...mapState(["coins"]),
  },
  mounted() {
    this.getBankCodeList();
    this.getWithdrawAccount();
  },
  methods: {
    onSelectBank(v) {
      var a = this.bankList.find((e) => e.code == this.code);
      this.bankName = a.name;
    },
    reset() {
      this.realName = "";
      this.bankName = "";
      this.account = "";
      this.name = "";
      this.code = "";
    },
    toggleEdit() {
      this.showEdit = !this.showEdit;
    },
    handleRoute(url) {
      this.$router.push({ path: "/user/" + url });
    },
    addCard() {
      var params = {
        real_name: this.realName,
        name: this.bankName,
        code: this.code,
        account: this.account,
        info: "",
      };

      var endpoints = ["/Bank/create", "/Bank/createCoin", "/Bank/createGcash"];
      this.$api
        .requestByPost(endpoints[this.type], params)
        .then((result) => {
          if (result.status == true) {
            this.reset();
            this.getWithdrawAccount();
            this.showEdit = false;
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    deleteCard(id) {
      if (id != -1) {
        this.$confirm(
          "This will permanently delete the account. Continue?",
          "Warning",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        )
          .then(() => {
            this.deleteAccount(id);
          })
          .catch(() => {});
      } else {
        this.toggleEdit();
      }
    },
    deleteAccount(id) {
      var params = { id: id };
      this.$api
        .requestByPost("/Bank/delete", params)
        .then((result) => {
          if (result.status == true) {
            this.getWithdrawAccount();
            this.$notiflix.Notify.success(
              result.msg ? result.msg : this.$t("message.success"),
              {
                showOnlyTheLastOne: true,
              }
            );
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    getBankCodeList() {
      this.$api
        .requestByPost("/Bank/codes", null)
        .then((result) => {
          if (result.status == true) {
            this.bankList = result.data;
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
          console.log(error);
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    getWithdrawAccount() {
      this.reset();
      this.$api
        .requestByPost("/Bank/lists", null)
        .then((result) => {
          if (result.status == true) {
            this.cardList = result.data.filter((e) => this.type == e.type);
            this.cardList.push({ id: -1 });
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/withdrawDetail.scss";
@import "/assets/scss/mobile/withdrawDetail.scss";
</style>
