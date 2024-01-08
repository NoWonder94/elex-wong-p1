<template>
    <div class="strategy">
        <form class="strategy-bet-form">
            <!--  Bets Amount -->
            <div class="strategy-bet-amount">
                <div class="strategy-bet-amount-label">
                    <span>{{ $i18n.t('betsAmount') }}</span>
                    <span>{{ $i18n.t('balance') }}:{{ currentToken.amount }}</span>
                </div>
                <div class="strategy-bet-amount-input">
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
            <!-- // Bets Amount -->
            <!-- Number of Bets row -->
            <div class="strategy-bet-type">
                <div class="strategy-bet-type-left">
                    <span class="left-label">
                        {{ $i18n.t('numberOfBets') }}
                    </span>
                    <div class="left-input">
                        <input type="text" v-model="betNum" />
                        <img class="infinite-icon" src="../assets/img/infinite.png" />
                    </div>
                </div>
                <div class="strategy-bet-type-right">
                    <span class="right-label" v-if="betData.condition == 1">{{ $i18n.t('rollOver') }} (>=)</span>
                    <span class="right-label" v-else>{{ $i18n.t('rollUnder') }} (&lt;)</span>
                    <div class="right-input">
                        <input type="text" v-model="betData.predict" @change="$emit('updatePredict')"/>
                        <img class="rollover-icon" src="../assets/img/apps-icon-01.png"  @click="$emit('updateCondition')" />
                    </div>
                </div>
            </div>
            <!-- // Number of Bets row -->
            <!-- Multiplier row -->
            <div class="strategy-bet-type">
                <div class="strategy-bet-type-left">
                    <span class="left-label">
                        {{ $i18n.t('multiplier') }}
                    </span>
                    <div class="left-input">
                        <input type="text" :value="betData.payout" readonly />
                        <img class="cross-icon" src="../assets/img/x_small.png" />
                    </div>
                </div>
                <div class="strategy-bet-type-right">
                    <span class="right-label">
                        {{ $i18n.t('winChance') }}
                    </span>
                    <div class="right-input">
                        <input type="text" v-model="betData.winRate" @change="$emit('updateWinRate')"/>
                        <img class="percent-icon" src="../assets/img/percent.png" />
                    </div>
                </div>
            </div>
            <!-- // Multiplier row  -->
            <!-- strategy option -->
             <div class="strategy-bet-option">
                <span class="strategy-bet-option-label">
                    {{ $i18n.t('selectStrategy') }}
                </span>
                <select class="strategy-bet-option-select" id="strategyOption" v-model="strategyId" @change="strategyChange" :disabled="!isStop">
                    <option value="empty" :selected="strategyId == 'empty'">{{ $i18n.t('chooseStrategy') }}</option>
                    <option v-for="(item, id) in strategyData" :key="id" :value="id" :selected="strategyId == id">{{ item.name }}</option>
                </select>
                <button class="strategy-bet-blue-button" @click="showStrategy('create', -1)" v-if="isStop">
                    {{ $i18n.t('createStrategy') }}
                </button>
             </div>
            <!-- // strategy option -->
            <!-- conditions -->
            <div class="strategy-bet-conditions" v-if="strategyId != 'empty'">
                <span class="strategy-bet-conditions-label">
                   {{ $i18n.t('conditions') }}
                </span>
                <div class="conditions-buttons">
                    <button v-for="(condition, index) in strategySelect.conditions" :key="index" @click="showStrategy('edit', index)">
                        {{ index + 1 }}
                    </button>
                </div>
                <button class="strategy-bet-blue-button" @click="showStrategy('edit', -1)" v-if="isStop">{{ $i18n.t('editStrategy') }}</button>
                <button class="strategy-bet-blue-button" v-if="strategySelect.is_system != 1 && isStop" @click="deleteStrategy">{{ $i18n.t('deleteStrategy') }}</button>
            </div>
            <!-- // conditions -->
            <!-- final button -->
            <button class="autobet-button" v-if="isStop" @click="startAuto">{{ $i18n.t('startAutobet') }}</button>
            <button class="autobet-button" v-else @click="stopAuto">{{ $i18n.t('stopAutoBet') }} ( {{ playNum }} ) <i class="fa fa-spinner fa-spin fa-fw" v-if="betData.isPlay"></i></button>
            <!-- final button -->
        </form>
        
        <!-- modal -->
        <StrategyConditionModal v-if="isModalShow" :strategy-action="strategyAction" :strategy-id="strategyId" :strategy-data="strategySelect" :strategy-index="strategyIndex" @close="closeModal"/>
        <!-- modal -->
    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapGetters } from 'vuex';
import StrategyConditionModal from './StrategyConditionModal.vue';
import { v4 as uuidv4 } from 'uuid';
import { Api } from '@/utils';
import { useToast } from "vue-toastification";

@Options({
  components: {
    StrategyConditionModal
  },
  inject: ['betData'],
  computed: mapGetters('account', {
    currentToken: "currentToken",
    connected: "isConnected",
  })
})

export default class Strategy extends Vue {
    currentToken!: any;
    connected!: boolean;
    betNum = 10;
    isStop = true;
    playNum = 0;
    strategyId = 'empty';
    strategyData:any = {};
    strategySelect:any = {};
    strategyIndex = 0;
    strategyAction = '';
    playStrategyData!:any;
    oldBetData!:any;
    isModalShow = false;
    toast:any = useToast();

    mounted() {
      (window as any).$bus.on('WalletConnected', this.setStrategyData);
      this.setStrategyData(this.connected);
      this.strategyChange();
    }

    beforeUnmount() {
      (window as any).$bus.off('WalletConnected', this.setStrategyData);
    }

    setStrategyData(status:boolean) {
      if (status) {
        Api.get('Strategy/lists').then((data:any) => {
          this.strategyData = data;
        })
      } else {
        this.strategyData = {};
      }
    }

    strategyChange() {
        if (this.strategyId === 'empty') {
            this.strategySelect = {name:'', is_system:0, conditions:[]};
        } else {
            this.strategySelect = this.strategyData[this.strategyId];
        }
    }

    showStrategy(action:string, index:number) {
        this.isModalShow = true;
        this.strategyIndex = index;
        this.strategyAction = action;
        if (action == 'create') {
            this.strategySelect = {name:'', is_system:0, conditions:[]};
        }
    }

    deleteStrategy() {
        if (this.strategyId === 'empty') {
            return;
        }
        delete this.strategyData[this.strategyId];
        this.strategyId = 'empty';
        Api.post('Strategy/save', this.strategyData);
    }

    /* open close modal */
    showModal() {
        this.isModalShow = true;
    }

    closeModal(data:any) {
        this.isModalShow = false;

        if (data.data.conditions.length < 1) {
            return;
        }
        
        if (data.action == 'create') {
            data.id = uuidv4();
        }
        this.strategyData[data.id] = data.data;
        this.strategyId = data.id;
        Api.post('Strategy/save', this.strategyData);
    }
    /* open close modal */

    startAuto() {
        if (this.strategyId === 'empty') {
            this.toast.error(this.$t('chooseStrategy'));
            return;
        }
        
        this.isStop = false;
        this.oldBetData = {
            amount: (this as any).betData.amount + 0,
            winRate: (this as any).betData.winRate + 0
        };

        this.playNum = 0;
        this.playStrategyData = {
            winNum: 0,
            loseNum: 0,
            betNum: 0,
            totalBet: 0,
            totalWin: 0,
            streakOfWinNum: 0,
            streakOfLoseNum: 0,
            streakOfBetNum: 0,
            conditions:{}
        };
        this.playAuto();
    }

    playAuto() {
        if (this.playNum >= this.betNum) {
          this.stopAuto();
        }

        if (this.isStop) {
          return;
        }

        this.playNum++;
        this.$emit('play', 'strategy');
    }

    stopAuto() {
        this.isStop = true;
        this.oldBetData = null;
    }

    playResult(data:any) {
        if (data == null) {
            this.isStop = true;
            return;
        }

        const playStrategy = this.strategyData[this.strategyId];
        this.playStrategyData.betNum++;
        this.playStrategyData.streakOfBetNum++;
        this.playStrategyData.totalBet += data.amount;
        this.playStrategyData.totalWin += data.win;

        if (data.win > 0) {
            this.playStrategyData.winNum++;
            this.playStrategyData.streakOfLoseNum = 0;
            this.playStrategyData.streakOfWinNum++;
        } else {
            this.playStrategyData.loseNum++;
            this.playStrategyData.streakOfWinNum = 0;
            this.playStrategyData.streakOfLoseNum++;
        }

        for(let i = 0; i < playStrategy.conditions.length; i++) {
            if (this.isStop) {
                break;
            }
            this.conditionCompute(i, playStrategy.conditions[i]);
        }

        setTimeout(this.playAuto, 1000);
    }

    conditionCompute(index:number, condition:any) {
        const conditionKey = 'c_' + index;
        let conditionData:any;
        if (typeof this.playStrategyData.conditions[conditionKey] === 'object') {
            conditionData = this.playStrategyData.conditions[conditionKey];
        } else {
            conditionData = {
                winNum:0,
                loseNum:0,
                betNum:0,
                firstStreakOfWin: false,
                firstStreakOfLose: false,
                firstStreakOfBet: false
            };
        }

        const onAmount = condition.on_amount;
        if (condition.type == 'bet' && onAmount <= 0) {
            return;
        }
        
        const conditionFuns:any = {
            bet_every_win: () => {
                console.log('bet_every_win', this.playStrategyData.winNum - conditionData.winNum, onAmount);
                if (this.playStrategyData.winNum - conditionData.winNum >= onAmount) {
                    conditionData.winNum = this.playStrategyData.winNum;
                    return true;
                } else {
                    return false;
                }
            },
            bet_every_lose: () => {
                console.log('bet_every_lose', this.playStrategyData.loseNum - conditionData.loseNum, onAmount);
                if (this.playStrategyData.loseNum - conditionData.loseNum >= onAmount) {
                    conditionData.loseNum = this.playStrategyData.loseNum;
                    return true;
                } else {
                    return false;
                }
            },
            bet_every_bet: () => {
                console.log('bet_every_bet', this.playStrategyData.betNum - conditionData.betNum, onAmount);
                if (this.playStrategyData.betNum - conditionData.betNum >= onAmount) {
                    conditionData.betNum = this.playStrategyData.betNum;
                    return true;
                } else {
                    return false;
                }
            },

            bet_everyStreakOf_win: () => {
                console.log('bet_everyStreakOf_win', this.playStrategyData.streakOfWinNum % onAmount, this.playStrategyData.streakOfWinNum, onAmount);
                if (this.playStrategyData.streakOfWinNum > 0 && this.playStrategyData.streakOfWinNum % onAmount == 0) {
                    return true;
                } else {
                    return false;
                }
            },
            bet_everyStreakOf_lose: () => {
                console.log('bet_everyStreakOf_lose', this.playStrategyData.streakOfWinNum % onAmount, this.playStrategyData.streakOfLoseNum, onAmount);
                if (this.playStrategyData.streakOfLoseNum > 0 && this.playStrategyData.streakOfLoseNum % onAmount == 0) {
                    return true;
                } else {
                    return false;
                }
            },
            bet_everyStreakOf_bet: () => {
                console.log('bet_everyStreakOf_bet', this.playStrategyData.streakOfBetNum % onAmount, this.playStrategyData.streakOfBetNum, onAmount);
                if (this.playStrategyData.streakOfBetNum > 0 && this.playStrategyData.streakOfBetNum % onAmount == 0) {
                    return true;
                } else {
                    return false;
                }
            },

            bet_firstStreakOf_win: () => {
                console.log('bet_firstStreakOf_win', this.playStrategyData.streakOfWinNum % onAmount, this.playStrategyData.streakOfWinNum, onAmount, conditionData.firstStreakOfWin);
                if (this.playStrategyData.streakOfWinNum > 0 && this.playStrategyData.streakOfWinNum % onAmount == 0 && !conditionData.firstStreakOfWin) {
                    conditionData.firstStreakOfWin = true;
                    return true;
                }
                return false;
            },
            bet_firstStreakOf_lose: () => {
                console.log('bet_firstStreakOf_lose', this.playStrategyData.streakOfLoseNum % onAmount, this.playStrategyData.streakOfLoseNum, onAmount, conditionData.firstStreakOfLose);
                if (this.playStrategyData.streakOfLoseNum > 0 && this.playStrategyData.streakOfLoseNum % onAmount == 0 && !conditionData.firstStreakOfLose) {
                    conditionData.firstStreakOfLose = true;
                    return true;
                }
                return false;
            },
            bet_firstStreakOf_bet: () => {
                console.log('bet_firstStreakOf_bet', this.playStrategyData.streakOfBetNum % onAmount, this.playStrategyData.streakOfBetNum, onAmount, conditionData.firstStreakOfBet);
                if (this.playStrategyData.streakOfBetNum > 0 && this.playStrategyData.streakOfBetNum % onAmount == 0 && !conditionData.firstStreakOfBet) {
                    conditionData.firstStreakOfBet = true;
                    return true;
                }
                return false;
            },

            bet_streakGreaterThan_win: () => {
                console.log('bet_streakGreaterThan_win', this.playStrategyData.streakOfWinNum, onAmount);
                return this.playStrategyData.streakOfWinNum > onAmount;
            },
            bet_streakGreaterThan_lose: () => {
                console.log('bet_streakGreaterThan_lose', this.playStrategyData.streakOfLoseNum, onAmount);
                return this.playStrategyData.streakOfLoseNum > onAmount;
            },
            bet_streakGreaterThan_bet: () => {
                console.log('bet_streakGreaterThan_bet', this.playStrategyData.streakOfBetNum, onAmount);
                return this.playStrategyData.streakOfBetNum > onAmount;
            },

            bet_streakLowerThan_win: () => {
                console.log('bet_streakLowerThan_win', this.playStrategyData.streakOfWinNum, onAmount);
                return this.playStrategyData.streakOfWinNum < onAmount;
            },
            bet_streakLowerThan_lose: () => {
                console.log('bet_streakLowerThan_lose', this.playStrategyData.streakOfLoseNum, onAmount);
                return this.playStrategyData.streakOfLoseNum < onAmount;
            },
            bet_streakLowerThan_bet: () => {
                console.log('bet_streakLowerThan_bet', this.playStrategyData.streakOfBetNum, onAmount);
                return this.playStrategyData.streakOfBetNum < onAmount;
            },

            profit_balance_greaterThan: () => {
                return this.currentToken.amount > onAmount;
            },
            profit_balance_greaterThanOrEqualTo: () => {
                return this.currentToken.amount >= onAmount;
            },
            profit_balance_lowerThan: () => {
                return this.currentToken.amount < onAmount;
            },
            profit_balance_lowerThanOrEqualTo: () => {
                return this.currentToken.amount <= onAmount;
            },

            profit_loss_greaterThan: () => {
                return this.playStrategyData.totalBet - this.playStrategyData.totalWin > onAmount;
            },
            profit_loss_greaterThanOrEqualTo: () => {
                return this.playStrategyData.totalBet - this.playStrategyData.totalWin >= onAmount;
            },
            profit_loss_lowerThan: () => {
                return this.playStrategyData.totalBet - this.playStrategyData.totalWin < onAmount;
            },
            profit_loss_lowerThanOrEqualTo: () => {
                return this.playStrategyData.totalBet - this.playStrategyData.totalWin <= onAmount;
            },

            profit_profit_greaterThan: () => {
                return this.playStrategyData.totalWin - this.playStrategyData.totalBet > onAmount;
            },
            profit_profit_greaterThanOrEqualTo: () => {
                return this.playStrategyData.totalWin - this.playStrategyData.totalBet >= onAmount;
            },
            profit_profit_lowerThan: () => {
                return this.playStrategyData.totalWin - this.playStrategyData.totalBet < onAmount;
            },
            profit_profit_lowerThanOrEqualTo: () => {
                return this.playStrategyData.totalWin - this.playStrategyData.totalBet <= onAmount;
            }
        };

        const actionFuns:any = {
            increaseByPercentage: () => {
                console.log('increaseByPercentage', this.oldBetData.amount, new Date());
                this.$emit('updateType', {'action': 'amountIncPercentage', 'num': condition.do_amount});
            },
            decreaseByPercentage: () => {
                console.log('decreaseByPercentage', condition.do_amount, new Date());
                this.$emit('updateType', {'action': 'amountDecPercentage', 'num': condition.do_amount});
            },
            increaseWinChanceBy: () => {
                console.log('increaseWinChanceBy', condition.do_amount, new Date());
                this.$emit('updateType', {'action': 'winRateIncPercentage', 'num': condition.do_amount});
            },
            decreaseWinChanceBy: () => {
                console.log('decreaseWinChanceBy', condition.do_amount, new Date());
                this.$emit('updateType', {'action': 'winRateDecPercentage', 'num': condition.do_amount});
            },
            addToAmount: () => {
                console.log('addToAmount', condition.do_amount, new Date());
                this.$emit('updateType', {'action': 'amountIncNum', 'num': condition.do_amount});
            },
            subtractFromAmount: () => {
                console.log('subtractFromAmount', condition.do_amount, new Date());
                this.$emit('updateType', {'action': 'amountDecNum', 'num': condition.do_amount});
            },
            addToWinChance: () => {
                console.log('addToWinChance', condition.do_amount, new Date());
                this.$emit('updateType', {'action': 'winRateIncNum', 'num': condition.do_amount});
            },
            subtractFromWinChance: () => {
                console.log('subtractFromWinChance', condition.do_amount, new Date());
                this.$emit('updateType', {'action': 'winRateDecNum', 'num': condition.do_amount});
            },
            setAmount: () => {
                console.log('setAmount', condition.do_amount, new Date());
                this.$emit('updateType', {'action': 'amountSet', 'num': condition.do_amount});
            },
            setWinChance: () => {
                console.log('setWinChance', condition.do_amount, new Date());
                this.$emit('updateType', {'action': 'winRateSet', 'num': condition.do_amount});
            },
            switchOverUnder: () => {
                console.log('switchOverUnder', new Date());
                this.$emit('updateType', {'action': 'conditionSwitch'});
            },
            resetAmount: () => {
                console.log('resetAmount', this.oldBetData.amount, new Date());
                this.$emit('updateType', {'action': 'amountSet', 'num': this.oldBetData.amount});
            },
            resetWinChance: () => {
                console.log('resetWinChance', this.oldBetData.winRate, new Date());
                this.$emit('updateType', {'action': 'winRateSet', 'num': this.oldBetData.winRate});
            },
            stop: () => {
                console.log('stop', new Date());
                this.stopAuto();
            }
        }

        const result = conditionFuns[`${condition.type}_${condition.on_type}_${condition.on_term}`]();
        console.log(`${condition.type}_${condition.on_type}_${condition.on_term}`, result);
        if (result) {
            actionFuns[condition.do_action]();
        }

        this.playStrategyData.conditions[conditionKey] = conditionData;
    }
}
</script>
<style src="@/assets/css/strategy.css" scoped>
</style>