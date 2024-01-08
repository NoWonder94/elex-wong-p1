<template>
  <div class="level">
    <div class="level-title web">
      {{ $t("myLevel.title") }}
    </div>
    <div class="back-title mobile" @click="back">
      <i class="el-icon-back"></i>
      {{ $t("myLevel.title") }}
    </div>
    <div class="level-banner web">
      <el-carousel
        :interval="5000"
        arrow="always"
        trigger="click"
        :autoplay="false"
        ref="carousel"
      >
        <el-carousel-item v-for="(level, index) in levelList" :key="index">
          <div class="level-image-container greenGradientButtonBg">
            <div class="level-image-center">
              <img v-if="level.icon" :src="level.icon" />
              <div class="level-image-content">{{ level.name }}</div>
            </div>
          </div>
          <div class="level-content-container">
            <div class="level-content">
              <div class="level-content-title">
                <ContentTitle :text="$t('myLevel.benefit')" />
              </div>
              <div class="level-content-item-container">
                <div class="level-content-item">
                  <div class="level-content-item-title">
                    {{ $t("myLevel.bonusRatio") }}
                  </div>
                  <div class="level-content-item-value">
                    {{ level.bonus_ratio }}
                  </div>
                </div>

                <div class="level-content-item">
                  <div class="level-content-item-title">
                    {{ $t("myLevel.betIntegralRatio") }}
                  </div>
                  <div class="level-content-item-value">
                    {{ level.bet_integral_ratio }}
                  </div>
                </div>

                <div class="level-content-item">
                  <div class="level-content-item-title">
                    {{ $t("myLevel.integralExchangeRatio") }}
                  </div>
                  <div class="level-content-item-value">
                    {{ level.integral_exchange_ratio }}
                  </div>
                </div>

                <div class="level-content-item">
                  <div class="level-content-item-title">
                    {{ $t("myLevel.diamondExchangeRatio") }}
                  </div>
                  <div class="level-content-item-value">
                    {{ level.diamond_exchange_ratio }}
                  </div>
                </div>

                <div class="level-content-item">
                  <div class="level-content-item-title">
                    {{ $t("myLevel.levelCondition") }}
                  </div>
                  <div class="level-content-item-value">
                    {{ level.level_condition }}
                  </div>
                </div>

                <div class="level-content-item">
                  <div class="level-content-item-title">
                    {{ $t("myLevel.keepCondition") }}
                  </div>
                  <div class="level-content-item-value">
                    {{ level.keep_condition }}
                  </div>
                </div>

                <div class="level-content-item">
                  <div class="level-content-item-title">
                    {{ $t("myLevel.keepTime") }}
                  </div>
                  <div class="level-content-item-value">
                    {{ level.keep_time }}
                  </div>
                </div>

                <div class="level-content-item">
                  <div class="level-content-item-title">
                    {{ $t("myLevel.withdrawalLimits") }}
                  </div>
                  <div class="level-content-item-value">
                    {{ level.withdrawal_limit }}
                  </div>
                </div>
              </div>
            </div>
            <div class="line"></div>
            <div class="level-content">
              <div class="level-content-title">
                <ContentTitle :text="$t('myLevel.moneyLimits')" />
              </div>
              <div
                class="level-content-item-container"
                v-if="level.money_limits"
              >
                <div class="level-content-item">
                  <div class="level-content-item-title">
                    {{ $t("myLevel.maxDeposit") }}
                  </div>
                  <div class="level-content-item-value">
                    {{ level.money_limits.max_deposit }}
                  </div>
                </div>

                <div class="level-content-item">
                  <div class="level-content-item-title">
                    {{ $t("myLevel.minDeposit") }}
                  </div>
                  <div class="level-content-item-value">
                    {{ level.money_limits.min_deposit }}
                  </div>
                </div>

                <div class="level-content-item">
                  <div class="level-content-item-title">
                    {{ $t("myLevel.maxWithdrawal") }}
                  </div>
                  <div class="level-content-item-value">
                    {{ level.money_limits.max_withdrawal }}
                  </div>
                </div>

                <div class="level-content-item">
                  <div class="level-content-item-title">
                    {{ $t("myLevel.minWithdrawal") }}
                  </div>
                  <div class="level-content-item-value">
                    {{ level.money_limits.min_withdrawal }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="level-banner-mobile mobile">
      <div class="level-image-list-container">
        <el-carousel
          :interval="5000"
          arrow="always"
          trigger="click"
          :autoplay="false"
          @change="onCarouselChange"
        >
          <el-carousel-item v-for="(level, index) in levelList" :key="index">
            <div class="level-image-container greenGradientButtonBg">
              <div class="level-image-center">
                <img v-if="level.icon" :src="level.icon" />
                <div class="level-image-content">{{ level.name }}</div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="level-content-container" v-if="currentLevel">
        <div class="level-content">
          <div class="level-content-title">
            <ContentTitle :text="$t('myLevel.benefit')" />
          </div>
          <div class="level-content-item-container">
            <div class="level-content-item">
              <div class="level-content-item-title">
                {{ $t("myLevel.bonusRatio") }}
              </div>
              <div class="level-content-item-value">
                {{ currentLevel.bonus_ratio }}
              </div>
            </div>

            <div class="level-content-item">
              <div class="level-content-item-title">
                {{ $t("myLevel.betIntegralRatio") }}
              </div>
              <div class="level-content-item-value">
                {{ currentLevel.bet_integral_ratio }}
              </div>
            </div>

            <div class="level-content-item">
              <div class="level-content-item-title">
                {{ $t("myLevel.integralExchangeRatio") }}
              </div>
              <div class="level-content-item-value">
                {{ currentLevel.integral_exchange_ratio }}
              </div>
            </div>

            <div class="level-content-item">
              <div class="level-content-item-title">
                {{ $t("myLevel.diamondExchangeRatio") }}
              </div>
              <div class="level-content-item-value">
                {{ currentLevel.diamond_exchange_ratio }}
              </div>
            </div>

            <div class="level-content-item">
              <div class="level-content-item-title">
                {{ $t("myLevel.levelCondition") }}
              </div>
              <div class="level-content-item-value">
                {{ currentLevel.level_condition }}
              </div>
            </div>

            <div class="level-content-item">
              <div class="level-content-item-title">
                {{ $t("myLevel.keepCondition") }}
              </div>
              <div class="level-content-item-value">
                {{ currentLevel.keep_condition }}
              </div>
            </div>

            <div class="level-content-item">
              <div class="level-content-item-title">
                {{ $t("myLevel.keepTime") }}
              </div>
              <div class="level-content-item-value">
                {{ currentLevel.keep_time }}
              </div>
            </div>

            <div class="level-content-item">
              <div class="level-content-item-title">
                {{ $t("myLevel.withdrawalLimits") }}
              </div>
              <div class="level-content-item-value">
                {{ currentLevel.withdrawal_limit }}
              </div>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="level-content">
          <div class="level-content-title">
            <ContentTitle :text="$t('myLevel.moneyLimits')" />
          </div>
          <div
            class="level-content-item-container"
            v-if="currentLevel.money_limits"
          >
            <div class="level-content-item">
              <div class="level-content-item-title">
                {{ $t("myLevel.maxDeposit") }}
              </div>
              <div class="level-content-item-value">
                {{ currentLevel.money_limits.max_deposit }}
              </div>
            </div>

            <div class="level-content-item">
              <div class="level-content-item-title">
                {{ $t("myLevel.minDeposit") }}
              </div>
              <div class="level-content-item-value">
                {{ currentLevel.money_limits.min_deposit }}
              </div>
            </div>

            <div class="level-content-item">
              <div class="level-content-item-title">
                {{ $t("myLevel.maxWithdrawal") }}
              </div>
              <div class="level-content-item-value">
                {{ currentLevel.money_limits.max_withdrawal }}
              </div>
            </div>

            <div class="level-content-item">
              <div class="level-content-item-title">
                {{ $t("myLevel.minWithdrawal") }}
              </div>
              <div class="level-content-item-value">
                {{ currentLevel.money_limits.min_withdrawal }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContentTitle from "../../components/ContentTitle.vue";
export default {
  name: "my-level",
  // head() {
  //   return {
  //     title: this.$t("myLevel.title"),
  //   };
  // },
  mounted() {
    this.initialize();
  },
  data() {
    return {
      levelList: [],
      currentLevel: {},
    };
  },
  methods: {
    initialize() {
      this.$api
        .requestByPost("System/groups", null)
        .then((result) => {
          if (result.status == true) {
            this.levelList = result.data;
            this.currentLevel = this.levelList[0];
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
    back() {
      this.$router.back();
    },
    onCarouselChange(index) {
      this.currentLevel = this.levelList[index];
    },
  },
  components: { ContentTitle },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/myLevel.scss";
@import "/assets/scss/mobile/myLevel.scss";
</style>
