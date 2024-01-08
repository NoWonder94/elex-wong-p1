<template>
  <div>
    <div class="cashout-modal">
      <div class="total">{{ winMoneyObj.winMoney }} {{ coinType }}</div>
      <div class="rate">{{ winMoneyObj.winRatio }}x</div>
    </div>
  </div>
</template>
<script>
// 里面统一接收 winMoney winRatio i参数
import { mapGetters } from "vuex";
export default {
  props: ["winMoneyObj", "currencyId"],
  computed: {
    ...mapGetters(["getCoin"]),
  },
  data() {
    return {
      coinType: "",
    };
  },
  watch: {
    getCoin: {
      handler(val) {
        if (val.currencyName) {
          this.coinType = val.currencyName;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    // console.log('getUserCoinInfo getUserCoinInfo',this.winMoneyObj)
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.cashout-modal {
  @media only screen and (min-width: 752px) and (max-width: 5120px) {
    min-width: 150px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border: 5px solid #31343c;
    border-radius: 5px;
    background: #23262b;
    font-weight: 800;
    font-size: 28px;
    line-height: 40px;
    z-index: 2;
    color: white;
    white-space: nowrap;
    .total {
      color: #43b30a;
    }
  }
  @media only screen and (min-width: 0px) and (max-width: 750px) {
    min-width: 150px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    border: 10px solid #31343c;
    border-radius: 15px;
    background: #23262b;
    font-weight: 800;
    font-size: 20px;
    line-height: 40px;
    z-index: 2;
    color: white;
    white-space: nowrap;
    .total {
      color: #43b30a;
    }
  }
}
</style>
