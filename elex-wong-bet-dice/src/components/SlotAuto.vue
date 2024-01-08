<template>
    <div class="auto">
        <form >
            <!--  Bets Amount -->
            <div class="auto-bet-amount">
                <div class="auto-bet-amount-label">
                    <span>{{ $i18n.t('betsAmount') }}</span>
                    <span>{{ $i18n.t('balance') }}:{{ currentToken.amount }}</span>
                </div>
                <div class="auto-bet-amount-input">
                    <div class="bet-amount-input">
                        <input type="text" v-model="betData.amount" @input="$emit('updateAmount', '')">
                        <img class="bet-amount-icon" :src="currentToken.image" />
                    </div>
                    <div class="bet-amount-option">
                        <button @click="$emit('updateAmount', '1/2')">½</button>
                        <button @click="$emit('updateAmount', '2x')">2x</button>
                    </div>
                </div>
            </div>
            <!-- End Bets Amount -->

            <div class="auto-bet-type">
                <div class="auto-bet-type-left">
                    <span class="left-label">
                        {{ $i18n.t('numberOfBets') }}
                    </span>
                    <div class="left-input">
                        <input type="text" v-model="betNum" />
                        <img class="infinite-icon" src="../assets/img/infinite.png" />
                    </div>
                </div>
            </div>

            <!--  Stop on Profit -->
            <div class="auto-bet-type">
                <div class="auto-bet-type-left">
                    <span class="left-label">
                       {{ $i18n.t('stopOnProfit') }}
                    </span>
                    <div class="left-input">
                        <input type="text" v-model="winStop" >
                        <img class="bet-amount-icon" src="../assets/img/solana.png" />
                    </div>
                </div>
                <div class="auto-bet-type-right">
                    <span class="right-label">
                        {{ $i18n.t('stopOnLoss') }}
                    </span>
                    <div class="right-input">
                        <input type="text" v-model="lossStop" >
                        <img class="bet-amount-icon" src="../assets/img/solana.png" />
                    </div>
                </div>
            </div>
            <!-- End Stop on Profit -->
            
            <!-- final button -->
            <button class="roll-dice-button" v-if="isStop" @click="startAuto">{{ $i18n.t('startAutobet') }}</button>
            <button class="roll-dice-button" v-else @click="stopAuto">{{ $i18n.t('stopAutoBet') }} ( {{ playNum }} ) <i class="fa fa-spinner fa-spin fa-fw" v-if="betData.isPlay"></i></button>
            <!-- final button -->
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapGetters } from 'vuex';
import { Common } from '../utils';

@Options({
  inject: ['betData'],
  computed: mapGetters('account', {
    currentToken: "currentToken",
    tokenType: "tokenType"
  })
})
export default class SlotAuto extends Vue {
  currentToken!: any;
  tokenType!: string;
  betNum = 10;
  winInc = 0;
  lossInc = 0;
  winStop = 0;
  lossStop = 0;
  isStop = true;
  playNum = 0;
  totalBet = 0;
  totalWin = 0;
  totalLoss = 0;

  mounted() {
    console.log('Auto mounted');
    //(window as any).$bus.on('AutoRollResult', this.playResult);
  }

  beforeUnmount() {
    console.log('Auto beforeUnmount');
    //(window as any).$bus.off('AutoRollResult', this.playResult);
  }

  playResult(data:any) {
    if (data == null) {
        this.isStop = true;
        return;
    }

    this.totalBet += data.amount;
    this.totalWin += data.win;
    let realWin = this.totalWin - this.totalBet;

    //console.log('totalBet', this.totalBet);
    //console.log('totalWin', this.totalWin);
    //console.log('realWin', realWin);
    if (this.winStop > 0 && this.winStop <= Common.lamportToAmount(realWin, this.tokenType)) {
        this.isStop = true;
        return;
    }

    let realLoss = this.totalBet - this.totalWin;
    //console.log('realLoss', realLoss);
    if (this.lossStop > 0 && this.lossStop <= Common.lamportToAmount(realLoss, this.tokenType)) {
        this.isStop = true;
        return;
    }

    if (data.win > 0 && this.winInc > 0) {
        this.$emit('updateType', {'action': 'amountIncPercentage', 'num': this.winInc});
    }

    if (data.win == 0 && this.lossInc > 0) {
        this.$emit('updateType', {'action': 'amountIncPercentage', 'num': this.lossInc});
    }

    setTimeout(this.playAuto, 1000);
  }

  startAuto() {
    this.isStop = false;
    this.playNum = 0;
    this.totalBet = 0;
    this.totalWin = 0;
    this.playAuto();
  }

  playAuto() {
    if (this.playNum >= this.betNum) {
      this.isStop = true;
    }

    if (this.isStop) {
      return;
    }

    this.playNum++;
    this.$emit('play', 'auto');
  }

  stopAuto() {
    this.isStop = true;
  }
}
</script>
<style src="@/assets/css/slotAuto.css" scoped>
</style>