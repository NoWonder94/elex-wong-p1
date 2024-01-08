<template>
    <div class="manual">
        <form >
            <!--  Bets Amount -->
            <div class="manual-bet-amount">
                <div class="manual-bet-amount-label">
                    <span>{{ $i18n.t('betsAmount') }}</span>
                    <span>{{ $i18n.t('balance') }}:{{ currentToken.amount }}</span>
                </div>
                <div class="manual-bet-amount-input">
                    <div class="bet-amount-input">
                        <input type="text" v-model="betData.amount" @change="$emit('updateAmount', '')">
                        <img class="bet-amount-icon" :src="currentToken.image" />
                    </div>
                    <div class="bet-amount-option">
                        <button @click="$emit('updateAmount', '1/2')">½</button>
                        <button @click="$emit('updateAmount', '2x')">2x</button>
                        <button @click="$emit('updateAmount', 'max')">{{ $i18n.t('max') }}</button>
                    </div>
                </div>
            </div>
            <!-- End Bets Amount -->
            <!-- Profit on Win row -->
            <div class="manual-bet-type">
                <div class="manual-bet-type-left">
                    <span class="left-label">
                        {{ $i18n.t('profitOnWin') }}
                    </span>
                    <div class="left-input">
                        <input type="text" :value="betData.profit" readonly />
                        <img class="infinite-icon" src="../assets/img/infinite.png" />
                    </div>
                </div>
                <div class="manual-bet-type-right">
                    <span class="right-label" v-if="betData.condition == 1">{{ $i18n.t('rollOver') }} (>=)</span>
                    <span class="right-label" v-else>{{ $i18n.t('rollUnder') }} (&lt;)</span>
                    <div class="right-input">
                        <input type="text" v-model="betData.predict" @change="$emit('updatePredict')"/>
                        <img class="rollover-icon" src="../assets/img/apps-icon-01.png"  @click="$emit('updateCondition')" />
                    </div>
                </div>
            </div>
            <!-- End Number of Bets row -->
            <!-- Multiplier row -->
            <div class="manual-bet-type">
                <div class="manual-bet-type-left">
                    <span class="left-label">
                        {{ $i18n.t('multiplier') }}
                    </span>
                    <div class="left-input">
                        <input type="text" :value="betData.payout" readonly />
                        <img class="cross-icon" src="../assets/img/x_small.png" />
                    </div>
                </div>
                <div class="manual-bet-type-right">
                    <span class="right-label">
                         {{ $i18n.t('winChance') }}
                    </span>
                    <div class="right-input">
                        <input type="text" v-model="betData.winRate" @change="$emit('updateWinRate')"/>
                        <img class="percent-icon" src="../assets/img/percent.png" />
                    </div>
                </div>
            </div>
             <!-- End Multiplier row -->
            <!-- final button -->
            <button class="roll-dice-button" :disabled="betData.isPlay" @click="$emit('play', 'manual')">{{ $i18n.t('rollDice') }} <i class="fa fa-spinner fa-spin fa-fw" v-if="betData.isPlay"></i></button>
            <!-- final button -->
        </form>
    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapGetters } from 'vuex';

@Options({
  inject: ['betData'],
  computed: mapGetters('account', {
    currentToken: "currentToken"
  })
})
export default class Manual extends Vue {
  currentToken!: any

  // eslint-disable-next-line no-unused-vars
  playResult(data:any) {
    
  }
}
</script>
<style src="@/assets/css/manual.css" scoped></style>