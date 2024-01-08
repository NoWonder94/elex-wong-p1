<template>
  <div class="withdraw">
    <div class="title-section">
      <div class="title-section-wrap">
        <div class="back-title title" @click="handleRoute">
          <img src="../assets/img/back.svg" />
          {{ $t("withdraw") }}
        </div>
        <div class="edit" @click="handleRouteToDetail">{{ $t("Edit") }}</div>
      </div>
    </div>

    <div class="withdraw-content">
      <div class="withdraw-content-title">{{ $t("account") }}</div>
      <div class="card-list">
        <div v-swiper:mySwiper="swiperOption" class="swiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide card-box"
              v-for="(item, index) in cardList"
              :key="index"
              @click="handleCard(item.id)"
            >
              <img
                class="card-background"
                :src="require('../assets/img/bank' + (index + 1) + '_bg.png')"
              />
              <div class="card-content">
                <div class="card-content-num">
                  {{ "Account" + " " + (index + 1) }}
                </div>
                <div class="card-content-detail">
                  <div class="card-content-detail-name">
                    {{ item.bank_account }}
                  </div>
                  <div class="card-content-detail-bank">
                    {{ item.bank_name }}
                  </div>
                </div>
                <div class="selected">
                  <div v-if="card == item.id">
                    {{ $t("withdraws.selected") }}
                  </div>
                  <div v-else></div>
                  <div class="tick">
                    <img
                      v-if="card == item.id"
                      src="../assets/img/verification.png"
                    />
                    <div v-else class="empty-tick-space"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="cardList.length == 0"
              class="swiper-slide card-box"
              @click="handleRouteToDetail"
            >
              <img
                class="card-background"
                :src="require('../assets/img/bank_default_bg.png')"
              />
              <div class="card-content">
                <div class="card-content-num">
                  {{ "Account" + " 1" }}
                </div>
                <div class="card-content-detail">
                  <div>+</div>
                  <div>{{ $t("withdraws.add_new_card") }}</div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div id="prevBtn" class="swiper-button-prev"></div>
        <div id="nextBtn" class="swiper-button-next"></div>
        <div class="gradient-left"></div>
        <div class="gradient-right"></div>
      </div>
      <div class="withdraw-details">
        <div class="withdraw-section">
          <div class="withdraw-section-title">{{ $t("amount") }}</div>
          <el-input
            v-model="amount"
            :placeholder="$t('withdraws.amount_withdraw')"
          ></el-input>
        </div>
        <div class="withdraw-section">
          <div class="withdraw-section-title">{{ $t("withdraws.note") }}</div>
          <el-input
            v-model="remark"
            :placeholder="$t('withdraws.note')"
          ></el-input>
        </div>
        <div class="withdraw-section">
          <div class="withdraw-section-button fill-box" @click="handleSubmit">
            {{ $t("submit") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Withdraw",
  data() {
    return {
      card: 1,
      cardList: [],
      amount: "",
      remark: "",
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
  mounted() {
    this.getWithdrawAccount();
  },
  methods: {
    handleRoute() {
      this.$router.back();
    },
    handleRouteToDetail() {
      this.$router.push("/withdrawDetail");
    },
    handleCard(id) {
      this.card = id;
    },
    handleSubmit() {
      this.isLoading = true;
      let form = {
        money: this.amount,
        remark: this.remark,
        bank_id: this.card,
      };
      this.$api
        .requestByPost("/Withdraw/submit", form)
        .then((result) => {
          if (result.status == true) {
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
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
    getWithdrawAccount() {
      this.isLoading = true;
      this.$api
        .requestByPost("/Bank/lists", null)
        .then((result) => {
          if (result.status == true) {
            if (result.data.length > 0) {
              this.card = result.data[0].id;
            }
            this.cardList = result.data;
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
          this.$notiflix.Notify.failure(error ?? this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/withdraw.scss";
@import "/assets/scss/mobile/withdraw.scss";
</style>
