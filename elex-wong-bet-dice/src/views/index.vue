<template>
    <div class="index">
        <div class='coinbar' v-if="SHOW_COIN_BAR">
          <CoinBar></CoinBar>
        </div>
         <div class="bets-container">	
            <ul class="nav nav-pills">
                <li class="tabs active">
                    <a href="#1tab" data-toggle="tab">{{ $i18n.t('manual') }}</a>
                </li>
                <li class="tabs">
                    <a href="#2tab" data-toggle="tab">{{ $i18n.t('auto') }}</a>
                </li>
                <li class="tabs">
                    <a href="#3tab" data-toggle="tab">
                        <img class="nav-logo" src="../assets/img/apps-icon-02.png">
                    </a>
                </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane active" id="1tab">
                   <Manual ref="manual" @update-amount="updateAmount" @update-predict="updatePredict" @update-win-rate="updateWinRate" @update-condition="updateCondition" @play="play"/>
                </div>
                <div class="tab-pane" id="2tab">
                    <Auto ref="auto" @update-amount="updateAmount" @update-predict="updatePredict" @update-win-rate="updateWinRate" @update-condition="updateCondition" @update-type="updateBetDataByType" @play="play"/>
                </div>
                <div class="tab-pane" id="3tab">
                    <Strategy ref="strategy" @update-amount="updateAmount" @update-predict="updatePredict" @update-win-rate="updateWinRate" @update-condition="updateCondition" @update-type="updateBetDataByType" @play="play"/>
                </div>
            </div>

            <div id="showProvablyFair" class="provably-fair">
                <span @click="isShowProvablyFair = true">{{ $i18n.t('provablyFairs.show') }} <i class="fa fa-eye"></i></span>
            </div>
        </div>

        <div id="provablyFairTabs" class="bets-box provably-fair-tabs" v-if="isShowProvablyFair">
            <div class="bets-box-header">
                <span :class="[provablyFairActive == 'code' ? 'active1' : '']" @click="changeProvablyFairTabs('code')">{{ $i18n.t('provablyFairs.title') }}</span>
                <span :class="[provablyFairActive == 'seed' ? 'active2' : '']" @click="changeProvablyFairTabs('seed')">{{ $i18n.t('provablyFairs.seeds') }}</span>
                <span :class="[provablyFairActive == 'verify' ? 'active2' : '']" @click="changeProvablyFairTabs('verify')">{{ $i18n.t('provablyFairs.verify') }}</span>
                <span class="bets-box-header-icon" @click="isShowProvablyFair = false"><img class="livestats-icon" src="../assets/img/X_big.png"></span>
            </div>
            <pre class="bets-box-content provably-fair-code" v-if="provablyFairActive == 'code'">
//<a href='/assets/images/dice-code.jpg' target="_blank">{{ $i18n.t('provablyFairs.log') }}</a>

/**
 * NoncePubkey: {{ $i18n.t('provablyFairs.noncePubkey.name') }}
 * <a href='https://docs.solana.com/offline-signing/durable-nonce' target="_blank">{{ $i18n.t('provablyFairs.doc') }}</a>, <template v-if="!isShowNoncePubkeyCode"><a href="javascript:;" @click="isShowNoncePubkeyCode = true">{{ $i18n.t('provablyFairs.noncePubkey.showRule') }}</a></template><template v-if="isShowNoncePubkeyCode"><a href="javascript:;" @click="isShowNoncePubkeyCode = false">{{ $i18n.t('provablyFairs.noncePubkey.hideRule') }}</a><span v-if="isShowNoncePubkeyCode">
   </span><p style="background: #333; display: inline-block;" v-if="isShowNoncePubkeyCode">PublicKey.createWithSeed(
    WALLET_ADDRESS, 
    'crazydice-bet-nonce-account', 
    SystemProgram.programId
); <a href='https://solana-labs.github.io/solana-web3.js/classes/PublicKey.html#createWithSeed' target="_blank">{{ $i18n.t('provablyFairs.doc') }}</a></p></template>
 * {{ $i18n.t('provablyFairs.noncePubkey.log') }}
 */
let nonce_pubkey = new PublicKey(NoncePubkey);

/**
 * RollNonce: {{ $i18n.t('provablyFairs.rollNonce.name') }}
 * <a href='https://solana-labs.github.io/solana-web3.js/classes/SystemProgram.html#nonceAdvance' target="_blank">{{ $i18n.t('provablyFairs.doc') }}</a>
 * {{ $i18n.t('provablyFairs.rollNonce.log') }}
 */
let roll_nonce = new PublicKey(RollNonce);

/**
 * ClientSeed: {{ $i18n.t('provablyFairs.clientSeed.name') }}
 * {{ $i18n.t('provablyFairs.clientSeed.info1') }}
 * {{ $i18n.t('provablyFairs.clientSeed.info2') }}, <a href="javascript:;" @click="changeProvablyFairTabs('seed', true)">{{ $i18n.t('provablyFairs.clientSeed.click') }}</a>, <a href='https://solana-labs.github.io/solana-web3.js/classes/Keypair.html#generate' target="_blank">{{ $i18n.t('provablyFairs.doc') }}</a>
 * {{ $i18n.t('provablyFairs.clientSeed.log') }}
 */
let client_seed = new PublicKey(ClientSeed);

/**
 * RollClock: {{ $i18n.t('provablyFairs.rollClock.name') }}, <a href='https://docs.solana.com/developing/runtime-facilities/sysvars#clock' target="_blank">{{ $i18n.t('provablyFairs.doc') }}</a>
 * {{ $i18n.t('provablyFairs.rollClock.log') }}
 */
let roll_clock = JSON.parse(RollClock);

/**
 * BetData: {{ $i18n.t('provablyFairs.betData.name') }}
 * predict: {{ $i18n.t('provablyFairs.betData.predict') }}
 * payout : {{ $i18n.t('provablyFairs.betData.payout') }}
 * {{ $i18n.t('provablyFairs.betData.log') }}
 */
let bet_data = JSON.parse(BetData);

/**
 * RollTimes: {{ $i18n.t('provablyFairs.rollTimes.name') }}
 * {{ $i18n.t('provablyFairs.rollTimes.log') }}
 */
let seed_num = roll_clock.unix_timestamp + roll_clock.slot + RollTimes;
let seed_sha = createHash('sha256');
seed_sha.update(client_seed.toBuffer());
seed_sha.update(nonce_pubkey.toBuffer());
seed_sha.update(bet_data.predict.toString());
seed_sha.update(bet_data.payout.toString());
seed_sha.update(seed_num.toString());
let roll_seed = new PublicKey(seed_sha.digest());

let roll_sha = createHash('sha512');
roll_sha.update(roll_seed.toBuffer());
roll_sha.update(roll_nonce.toBuffer());

let roll_hexs  = roll_sha.digest('hex');
let roll_len   = roll_hexs.length;
let roll_index = 0;
let roll_num   = parseInt(roll_hexs.substr(roll_index, 5), 16);

while (roll_num >= 1000000) {
    roll_index += 5;
    if (roll_len - roll_index &lt; 5) {
        roll_num = 9999;
        break;
    }
    roll_num = parseInt(roll_hexs.substr(roll_index, 5), 16);
}

return roll_num % 10000;
            </pre>
            <div class="provably-fair-verfiy" v-if="provablyFairActive == 'seed'">
                <div class="full">
                    <span class="full-label">ClientSeed</span>
                    <div class="full-input">
                        <input type="text" :value="simulateData.clientSeed" readonly />
                    </div>
                </div>
                <button class="button" @click="changeClientSeed">{{ $i18n.t('provablyFairs.clientSeed.change') }}</button>
            </div>
            <div class="provably-fair-verfiy" v-if="provablyFairActive == 'verify'">
                <div class="inputs">
                    <div class="inputs-left">
                        <span class="left-label" v-if="simulateData.condition == 1">BetData.predict (>=)</span>
                        <span class="left-label" v-else>BetData.predict (&lt;)</span>
                        <div class="left-input">
                            <input type="text" v-model="simulateData.predict" @blur="updateSimulatePredict"/>
                            <img class="rollover-icon" src="../assets/img/apps-icon-01.png" @click="updateSimulateCondition"/>
                        </div>
                    </div>
                    <div class="inputs-right">
                        <span class="right-label">BetData.payout</span>
                        <div class="right-input">
                            <input type="text" :value="simulatePayout" readonly />
                        </div>
                    </div>
                </div>
                <div class="bets-range-scroll-bar">
                    <span class="range-num">0</span>
                    <div class="range-box">
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            value="5000"
                            :class="[simulateData.condition == 1 ? 'slider slider-over' : 'slider slider-under']"
                            id="simulateRange" 
                            @change="simulateHandleSlider"
                        />
                        <div id="showSimulateRoll" class="roll-result">
                            <img src="../assets/img/roll.svg">
                            <span>{{ simulateData.roll }}</span>
                        </div>
                    </div>
                    <span class="range-num">10000</span>
                </div>
                <div class="full">
                    <span class="full-label">NoncePubkey</span>
                    <div class="full-input">
                        <input type="text" v-model="simulateData.noncePubkey" />
                    </div>
                </div>
                <div class="full">
                    <span class="full-label">RollNonce</span>
                    <div class="full-input">
                        <input type="text" v-model="simulateData.rollNonce" />
                    </div>
                </div>
                <div class="full">
                    <span class="full-label">ClientSeed</span>
                    <div class="full-input">
                        <input type="text" v-model="simulateData.clientSeed" />
                    </div>
                </div>
                <div class="inputs">
                    <div class="inputs-left">
                        <span class="left-label">RollClock.unix_timestamp</span>
                        <div class="left-input">
                            <input type="text" v-model="simulateData.clockTime"/>
                        </div>
                    </div>
                    <div class="inputs-right">
                        <span class="right-label">RollClock.slot</span>
                        <div class="right-input">
                            <input type="text" v-model="simulateData.clockSlot" />
                        </div>
                    </div>
                </div>
                <div class="full">
                    <span class="full-label">RollTimes</span>
                    <div class="full-input">
                        <input type="text" v-model="simulateData.rollTimes" />
                    </div>
                </div>

                <button class="button" @click="simulate">{{ $i18n.t('provablyFairs.verify') }}</button>
            </div>
        </div>

        <div style="display:none">{{ profit }}</div>

        <div class="bets-range-scroll-bar">
            <span class="range-num">0</span>
            <div class="range-box">
                <input
                    type="range"
                    min="0"
                    max="10000"
                    value="5000"
                    :class="[condition == 1 ? 'slider slider-over' : 'slider slider-under']"
                    id="betRange"
                    @change="handleSlider"
                />
                <div id="showRoll" class="roll-result">
                    <img src="../assets/img/roll.svg">
                    <span>{{ resultRollNum }}</span>
                </div>
            </div>
            <span class="range-num">10000</span>
        </div>
        
        <div class="bets-box">
            <div class="bets-box-header">
                <span class="bets-box-header-icon" @click="resetLiveStatus"><img class="livestats-icon" src="../assets/img/refresh.png"></span>
                <span>{{ $i18n.t('liveStats') }}</span>
                <span class="bets-box-header-icon"></span>
            </div>
            <div class="bets-box-content">
                <div class="content-contanier" v-if="liveStatus">
                    <div>
                        <div class="content-text">{{ $i18n.t('wagered') }}</div>
                        <span  class="content-value"> {{ utilsCommon.lamportToAmount(liveStatus.betAmount, tokenType) }} 
                            <img class="livestats-icon" src="../assets/img/solana.png">
                        </span>
                    </div>
                    <div>
                        <div class="content-text">{{ $i18n.t('profit') }}</div>
                        <span class="content-value" style="color: #00FBC2;"> {{ utilsCommon.lamportToAmount(liveStatus.winAmount, tokenType) }} 
                            <img class="livestats-icon" src="../assets/img/solana.png"/>
                        </span>
                    </div>
                </div>
                <canvas id="chartBox" height="200" width="500" style="margin:15px 0 10px 0"></canvas>
                <div class="content-contanier" v-if="liveStatus">
                    <div class="content-value">{{ $i18n.t('wins') }} 
                        <div class="content-win"> {{ liveStatus.winNum }} </div>
                    </div>
                    <div class="content-value"> {{ $i18n.t('losses') }} 
                        <div class="content-loss"> {{ liveStatus.loseNum }} </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bets-box">
            <div class="bets-box-header">
                <span class="bets-box-header-icon">  </span>
                <span>{{ $i18n.t('liveBet') }}</span>
                <router-link to="/diceBets" style="color:#fff;">{{ $i18n.t('more') }}</router-link>
            </div>
            <div class="bets-box-content" style="padding:0;">
                <table class="table borderless" style="margin:0;">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">{{ $i18n.t('betID') }}</th>
                            <th scope="col">{{ $i18n.t('payer') }}</th>
                            <th scope="col">{{ $i18n.t('bets') }}</th>
                            <th class="text-right" scope="col">{{ $i18n.t('profit') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :class="[transaction.data.win > 0 ? 'tr-win' : 'tr-lose']" v-for="transaction in allTransactionList" :key="transaction.signature">
                            <td><a target="_blank" :href="utilsCommon.getExplorerTxUrl(transaction.signature)">{{ utilsCommon.formatSignature(transaction.signature) }}</a></td>
                            <td><a target="_blank" :href="utilsCommon.getExplorerAddressUrlByStr(transaction.payer)">{{ utilsCommon.formatAddressByStr(transaction.payer) }}</a></td>
                            <td>{{ utilsCommon.lamportToAmount(transaction.data.amount, tokenType) }}</td>
                            <td class="text-right">
                                <span v-if="transaction.data.win > 0">+{{ utilsCommon.lamportToAmount(transaction.data.win, tokenType) }}</span>
                                <span v-else>-{{ utilsCommon.lamportToAmount(transaction.data.amount, tokenType) }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!--<button class="bets-button" @click="navAllBets()">{{ $i18n.t('allBets') }}</button>-->

        <div class="index-rules">
            <div class="index-rules-title">
                {{ $i18n.t('rulesTitle') }} 
            </div>
            <ul class="index-rules-list">
                <li>
                    {{ $i18n.t('rules1') }} 
                </li>
                <li>
                   {{ $i18n.t('rules2') }} 
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { reactive } from 'vue'
import { mapGetters } from 'vuex';
import { Vue, Options } from 'vue-class-component';
import Auto from '@/components/Auto.vue';
import Manual from '@/components/Manual.vue';
import Strategy from '@/components/Strategy.vue';
import CoinBar from '@/components/CoinBar.vue';
import { BigNumber } from "bignumber.js";
import { CONFIG } from '@/defines';
import { Common, Seed } from '@/utils';
import { DiceProgram } from '@/programs';
import { Chart, registerables } from 'chart.js';
import { useToast } from "vue-toastification";
import jQuery from 'jquery';

const betData = reactive({
    amount: 1,
    condition: 1,
    predict: 5000,
    winRate: 0,
    payout: '',
    profit: 1.96,
    isDividend: false,
    isPlay: false,
    playType: 'Manual'
});

@Options({
  components: {
    Auto,
    Manual,
    Strategy,
    CoinBar
  },
  computed: {
    profit() {
        const base = new BigNumber(9800);
        const maxPredict = new BigNumber(10000);
        const predict = new BigNumber(betData.predict);
        let payout, winRate;
        if (betData.condition == 1) {
            winRate = maxPredict.minus(predict).dividedBy(maxPredict).multipliedBy(100);
            payout = base.dividedBy(maxPredict.minus(predict));
        } else {
            winRate = predict.dividedBy(maxPredict).multipliedBy(100);
            payout = base.dividedBy(predict);
        }

        if (this.rang) {
            this.rang.style.backgroundSize = this.getRollPosition(betData.predict) + '% 100%';
        }

        if (winRate.isNaN()) {
            betData.winRate = 0;
        } else {
            betData.winRate = parseFloat(winRate.toFixed(2, 3));
        }

        if (payout.isNaN()) {
            betData.payout = '0';
        } else {
            betData.payout = payout.toFixed(3, 3);
        }

        let profit = new BigNumber(betData.payout).multipliedBy(betData.amount);

        if (profit.isNaN()) {
            betData.profit = 0;
        } else {
            betData.profit = profit.toNumber();
        }
        
        return betData.profit;
    },
    simulatePayout() {
        const base = new BigNumber(9800000);
        const maxPredict = new BigNumber(10000);
        const predict = new BigNumber(this.simulateData.predict);
        let payout, winRate;
        if (this.simulateData.condition == 1) {
            winRate = maxPredict.minus(predict).dividedBy(maxPredict).multipliedBy(100);
            payout = base.dividedBy(maxPredict.minus(predict));
        } else {
            winRate = predict.dividedBy(maxPredict).multipliedBy(100);
            payout = base.dividedBy(predict);
        }

        if (this.simulateRang) {
            this.simulateRang.style.backgroundSize = this.getRollPosition(this.simulateData.predict) + '% 100%';
        } else {
            setTimeout(() => {
                if (this.simulateRang) {
                    this.simulateRang.style.backgroundSize = this.getRollPosition(this.simulateData.predict) + '% 100%';
                }
            }, 50);
        }

        if (winRate.isNaN()) {
            this.simulateData.winRate = 0;
        } else {
            this.simulateData.winRate = parseFloat(winRate.toFixed(2, 3));
        }

        if (payout.isNaN()) {
            this.simulateData.payout = '0';
        } else {
            this.simulateData.payout = parseInt(payout.toString());
        }
        return this.simulateData.payout;
    },
    ...mapGetters('account', {
      tokenType: "tokenType",
      currentToken: "currentToken"
    })
  },
  provide() {
    return {
        'betData': betData
    }
  }
})
export default class Home extends Vue {
    tokenType!: string;
    currentToken!: any;
    profit!: number;
    minPredict = 800;
    maxPredict = 9500;
    minWinRate = 5;
    maxWinRate = 92;
    condition = 1;
    rang!: any;
    showRoll!: any;
    waitSignature = '';
    resultRollNum = -1;
    resultRollData!: any;
    hideRollTimeout!:any;
    liveStatus!: any;
    chart!:any;
    toast:any = useToast();
    utilsCommon:any = Common;
    allTransactionList:any = [];
    allTransactionKeys:any = {};
    transactionTimeout:any = null;
    betAmouts:any = CONFIG.dice.betAmouts as any;
    diceProgram:DiceProgram = DiceProgram.instance();
    isShowProvablyFair = false;
    isShowNoncePubkeyCode = false;
    isDividend = false;
    provablyFairActive = 'code';
    simulateData!:any;
    simulateRang!: any;
    showSimulateRoll!: any;
    simulateMinPredict = 800;
    simulateMaxPredict = 9500;
    simulateRollTimeout!:any;

    mounted() {
        this.simulateData = reactive({
            condition: 1,
            predict: 5000,
            payout: 1960,
            clockTime: 0,
            clockSlot: 0,
            rollTimes: 0,
            winRate:0,
            noncePubkey: null,
            rollNonce: null,
            clientSeed: Seed.get().toBase58(),
            roll: -1
        });
        this.liveStatus = reactive({});
        this.resetLiveStatus();
        this.rang = document.getElementById('betRange');
        this.rang.addEventListener('input', this.handleSlider);
        this.showRoll = document.getElementById('showRoll');
        this.showRoll.addEventListener('animationend', this.rollAnimationEnd);

        (window as any).$bus.on('DiceBet', this.betListener);
        (window as any).$bus.on('TokenTypeChange', this.tokenTypeChange);

        this.getAllTransactions();
        this.transactionTimeoutBegin();
        Chart.register(...registerables);

        this.chart = new Chart('chartBox', {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                      label: 'Profit',
                      data: [],
                      borderColor: '#00fbc2',
                      fill: false,
                      cubicInterpolationMode: 'monotone',
                      tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    displayColors: false,
                    callbacks: {
                       // eslint-disable-next-line no-unused-vars
                       title: function(context){
                          return '';
                       },
                       beforeLabel: (context:any) => {
                          const data = this.liveStatus.list[context.dataIndex];
                          return 'Roll:' + data.roll;
                       },
                       afterLabel: (context:any) => {
                          const data = this.liveStatus.list[context.dataIndex];
                          if (data.win > 0) {
                            return 'Win:' + Common.lamportToAmount(data.win, this.tokenType);
                          } else {
                            return 'Loss:' + Common.lamportToAmount(data.amount, this.tokenType);
                          }
                       }
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      color:'#ffffff'
                    },
                    ticks: {
                      color:'#ffffff'
                    }
                  },
                  y: {
                    grid: {
                      color:'#ffffff'
                    },
                    ticks: {
                      color:'#ffffff'
                    }
                  }
                }
            }
        });
    }

    beforeUnmount() {
        if (this.transactionTimeout != null) {
          clearTimeout(this.transactionTimeout);
        }
        this.rang.removeEventListener('input', this.handleSlider);
        this.showRoll.removeEventListener('animationend', this.rollAnimationEnd);
        (window as any).$bus.off('DiceBet', this.betListener);
        (window as any).$bus.off('WalletConnected', this.walletConnected);
    }

    rollAnimationEnd() {
        this.showRoll.classList.remove('animate__animated', 'animate__bounceIn');
        betData.isPlay = false;
        
        setTimeout(() => {
            (this as any).$refs[betData.playType].playResult(this.resultRollData);
        }, 1500);
        
        this.hideRollTimeout = setTimeout(() => {
            this.showRoll.style.opacity = 0;
        }, 3000);
    }

    getAllTransactions() {
      this.diceProgram.getProgramTransactions('').then((data:any) => {
        this.allTransactionList = this.allTransactionList.concat(data);
      });
    }

    setAllTransactionData(data:any) {
        if (typeof this.allTransactionKeys[data.signature] !== 'undefined') {
          return;
        }

        this.allTransactionKeys[data.signature] = true;

        const list = this.allTransactionList;
        list.unshift(data);
        if (list.length > 30) {
            list.pop(data);
        }

        this.allTransactionList = list;

        this.transactionTimeoutBegin();
    }

    transactionTimeoutBegin() {
        if (this.transactionTimeout != null) {
          clearTimeout(this.transactionTimeout);
        }

        this.transactionTimeout = setTimeout(() => {
          const keys:any = [];
          for (let i = 0; i < this.allTransactionList.length; i++) {
            if (i >= 20) {
              break;
            }
            keys.push(this.allTransactionList[i].signature);
          }

          if (keys.length > 0) {
            this.diceProgram.getProgramTransaction(keys).then((data:any) => {
              if (data) {
                const list = this.allTransactionList;
                list.unshift(data);
                this.allTransactionList = list;
              }
              this.transactionTimeoutBegin();
            }).catch(() => {
              this.transactionTimeoutBegin();
            });
          }
        }, 3000);
    }

    betListener(transaction:any) {
        this.setAllTransactionData(transaction);

        if (transaction.signature !== this.waitSignature) {
            return;
        }
        const data = transaction.data;

        this.liveStatus.betNum++;

        this.waitSignature = '';
        this.resultRollNum = data.roll;
        this.resultRollData = data;
        this.liveStatus.betAmount += data.amount;
        if (data.win > 0) {
            this.liveStatus.winAmount += data.win;
            this.liveStatus.winNum += 1;
        } else {
            this.liveStatus.loseNum += 1;
        }
        this.liveStatus.list.push(data);
        if (this.liveStatus.list.length > 10) {
            this.liveStatus.list.splice(0, 1);
        }

        this.chart.data.labels.push(this.liveStatus.betNum);
        if (this.chart.data.labels.length > 10) {
            this.chart.data.labels.splice(0, 1);
        }
        this.chart.data.datasets[0].data.push(Common.lamportToAmount(this.liveStatus.winAmount - this.liveStatus.betAmount, this.tokenType));
        if (this.chart.data.datasets[0].data.length > 10) {
            this.chart.data.datasets[0].data.splice(0, 1);
        }
        this.chart.update();
        this.showRollAnimation(data.win > 0);
    }

    getRollPosition(roll:number) {
        return roll * 100 / 10000;
    }

    showRollAnimation(isWin:boolean) {
        const position = this.getRollPosition(this.resultRollNum);
        this.showRoll.style.left = position + '%';
        if (isWin) {
            this.showRoll.style.color = '#02d8a7';
        } else {
            this.showRoll.style.color = '#EE04FE';
        }
        this.showRoll.style.opacity = 1;
        this.showRoll.classList.add('animate__animated', 'animate__bounceIn');
    }

    navAllBets(){
        this.$router.push('/bets');
    }

    resetLiveStatus() {
        this.liveStatus.betAmount = 0;
        this.liveStatus.winAmount = 0;
        this.liveStatus.betNum = 0;
        this.liveStatus.winNum = 0;
        this.liveStatus.loseNum = 0;
        this.liveStatus.list = [];

        if (this.chart) {
            this.chart.data.labels = [];
            this.chart.data.datasets[0].data = [];
            this.chart.update();
        }
    }

    tokenTypeChange() {
        this.resetLiveStatus();
        this.setAmount(betData.amount);
    }

    updatePredict() {
        this.setPredict(betData.predict);
    }

    updateCondition() {
        if (betData.condition == 1) {
            betData.condition = 0;
            this.minPredict = 500;
            this.maxPredict = 9200;
        } else {
            betData.condition = 1;
            this.minPredict = 800;
            this.maxPredict = 9500;
        }
        this.condition = betData.condition;
        this.setWinRate(betData.winRate);
    }

    updateAmount(type:string) {
        let val = betData.amount;
        switch (type) {
          case "1/2":
            val = parseFloat((betData.amount / 2).toFixed(this.betAmouts[this.tokenType].fixed));
          break;

          case "2x":
            val = betData.amount * 2;
          break;

          case "max":
            val = this.betAmouts[this.tokenType].max;
          break;
        }
        this.setAmount(val);
    }

    setAmount(amount:number) {
        if (amount < this.betAmouts[this.tokenType].min) {
          amount = this.betAmouts[this.tokenType].min;
        } else if (amount > this.betAmouts[this.tokenType].max) {
          amount = this.betAmouts[this.tokenType].max;
        }
        betData.amount = amount;
    }

    setPredict(predict:number) {
        if (predict > this.maxPredict) {
          predict = this.maxPredict;
        } else if (predict < this.minPredict) {
          predict = this.minPredict;
        }
        betData.predict = predict;
        if (betData.predict !== this.rang.value) {
            this.rang.value = betData.predict;
        }
    }

    updateWinRate() {
        this.setWinRate(betData.winRate);
    }

    setWinRate(rate:number) {
        if (rate < this.minWinRate) {
          rate = this.minWinRate;
        } else if (rate > this.maxWinRate) {
          rate = this.maxWinRate;
        }

        const maxPredict = new BigNumber(10000);
        const winRate = new BigNumber(rate);

        let predict;

        if (betData.condition == 1) {
            predict = parseInt(maxPredict.minus(winRate.multipliedBy(maxPredict).dividedBy(100)).toFixed(0, 3));
        } else {
            predict = parseInt(winRate.multipliedBy(maxPredict).dividedBy(100).toFixed(0, 3));
        }

        this.setPredict(predict);
    }

    handleSlider() {
        this.setPredict(this.rang.value);
    }

    updateBetDataByType(data:any) {
        const funs:any = {
            amountIncPercentage: () => {
                const amount = new BigNumber(betData.amount);
                this.setAmount(parseFloat(amount.plus(amount.multipliedBy(data.num).dividedBy(100)).toFixed(9, 3)));
            },
            amountDecPercentage: () => {
                const amount = new BigNumber(betData.amount);
                this.setAmount(parseFloat(amount.minus(amount.multipliedBy(data.num).dividedBy(100)).toFixed(9, 3)));
            },
            amountIncNum: () => {
                const amount = new BigNumber(betData.amount);
                this.setAmount(parseFloat(amount.plus(data.num).toFixed(9, 3)));
            },
            amountDecNum: () => {
                const amount = new BigNumber(betData.amount);
                this.setAmount(parseFloat(amount.minus(data.num).toFixed(9, 3)));
            },
            amountSet: () => {
                this.setAmount(data.num);
            },
            winRateIncPercentage: () => {
                const winRate = new BigNumber(betData.winRate);
                this.setWinRate(parseFloat(winRate.plus(winRate.multipliedBy(data.num).dividedBy(100)).toFixed(2, 3)));
            },
            winRateDecPercentage: () => {
                const winRate = new BigNumber(betData.winRate);
                this.setWinRate(parseFloat(winRate.minus(winRate.multipliedBy(data.num).dividedBy(100)).toFixed(2, 3)));
            },
            winRateIncNum: () => {
                const winRate = new BigNumber(betData.winRate);
                this.setWinRate(parseFloat(winRate.plus(data.num).toFixed(2, 3)));
            },
            winRateDecNum: () => {
                const winRate = new BigNumber(betData.winRate);
                this.setWinRate(parseFloat(winRate.minus(data.num).toFixed(2, 3)));
            },
            winRateSet: () => {
                this.setWinRate(data.num);
            },
            conditionSwitch: () => {
                this.updateCondition();
            }
        };

        funs[data.action]();
    }

    play(type:string) {
        if (betData.isPlay) {
            return;
        }

        this.setAmount(betData.amount);
        this.setWinRate(betData.winRate);

        if (betData.amount > this.currentToken.amount) {
            this.toast.error(this.$t('insufficientBalance'));
            (this as any).$refs[type].playResult(null);
            return;
        }

        betData.playType = type;
        betData.isPlay = true;
        clearTimeout(this.hideRollTimeout);
        this.showRoll.style.opacity = 0;

        try {
          this.diceProgram.bet(Common.amountToLamport(betData.amount, this.tokenType), betData.predict, betData.condition).then((signature) => {
            this.waitSignature = signature;
            this.diceProgram.getTransactionBySignature(signature, (signature:string) => {
                return this.waitSignature == signature;
            });
          }).catch((e:any) => {
            this.toast.error(e.message);
            betData.isPlay = false;
            (this as any).$refs[type].playResult(null);
          });
        } catch(e:any) {
          this.toast.error(e.message);
          betData.isPlay = false;
          (this as any).$refs[type].playResult(null);
        }
    }

    walletConnected() {
        try {
          this.diceProgram.getSimulateNonces(this.simulateData).catch((e:any) => {
            this.toast.error(e.message);
          });
        } catch(e:any) {
          this.toast.error(e.message);
        }
    }

    changeProvablyFairTabs(type:string, isView:boolean) {
        if (this.provablyFairActive == type) {
            return;
        }

        this.provablyFairActive = type;

        if(type == 'verify') {
            try {
              this.diceProgram.getSimulateSeeds(this.simulateData).catch((e:any) => {
                this.toast.error(e.message);
              });
            } catch(e:any) {
              this.toast.error(e.message);
            }

            (window as any).$bus.on('WalletConnected', this.walletConnected);

            setTimeout(() => {
                this.simulateRang = document.getElementById('simulateRange');
                this.simulateRang.addEventListener('input', this.simulateHandleSlider);
                this.showSimulateRoll = document.getElementById('showSimulateRoll');
            }, 100);
        } else {
            if (this.simulateRang) {
                this.simulateRang.removeEventListener('input', this.simulateHandleSlider);
                this.simulateRang = null;
            }
            this.showSimulateRoll = null;
            (window as any).$bus.off('WalletConnected', this.walletConnected);
        }

        if (isView) {
            jQuery('#showProvablyFair').get(0).scrollIntoView(true);
        }
    }

    updateSimulateCondition() {
        if (this.simulateData.condition == 1) {
            this.simulateData.condition = 0;
            this.simulateMinPredict = 500;
            this.simulateMaxPredict = 9200;
        } else {
            this.simulateData.condition = 1;
            this.simulateMinPredict = 800;
            this.simulateMaxPredict = 9500;
        }
        this.setSimulateWinRate(this.simulateData.winRate);
    }

    updateSimulatePredict() {
        this.setSimulatePredict(this.simulateData.predict);
    }

    setSimulatePredict(predict:number) {
        if (predict > this.simulateMaxPredict) {
          predict = this.simulateMaxPredict;
        } else if (predict < this.simulateMinPredict) {
          predict = this.simulateMinPredict;
        }
        this.simulateData.predict = predict;
        if (this.simulateData.predict !== this.simulateRang.value) {
            this.simulateRang.value = this.simulateData.predict;
        }
    }

    setSimulateWinRate(rate:number) {
        if (rate < this.minWinRate) {
          rate = this.minWinRate;
        } else if (rate > this.maxWinRate) {
          rate = this.maxWinRate;
        }

        const maxPredict = new BigNumber(10000);
        const winRate = new BigNumber(rate);

        let predict;
        if (this.simulateData.condition == 1) {
            predict = parseInt(maxPredict.minus(winRate.multipliedBy(maxPredict).dividedBy(100)).toFixed(0, 3));
        } else {
            predict = parseInt(winRate.multipliedBy(maxPredict).dividedBy(100).toFixed(0, 3));
        }
        this.setSimulatePredict(predict);
    }

    simulateHandleSlider() {
        this.setSimulatePredict(this.simulateRang.value);
    }

    changeClientSeed() {
        this.simulateData.clientSeed = Seed.reset();
    }

    simulate() {
        if (this.simulateRollTimeout != null) {
            clearTimeout(this.simulateRollTimeout);
        }
        this.showSimulateRoll.style.opacity = 0;
        this.showSimulateRoll.classList.remove('animate__animated', 'animate__bounceIn');

        let roll = 0;
        try {
          roll = this.diceProgram.simulate(this.simulateData);
        } catch(e:any) {
          this.toast.error(e.message);
          return;
        }

        let isWin = false;
        if (this.simulateData.condition == 1) {
            isWin = roll >= this.simulateData.predict; 
        } else {
            isWin = roll < this.simulateData.predict; 
        }

        const position = this.getRollPosition(roll);
        this.showSimulateRoll.style.left = position + '%';
        if (isWin) {
            this.showSimulateRoll.style.color = '#02d8a7';
        } else {
            this.showSimulateRoll.style.color = '#EE04FE';
        }
        jQuery('#showProvablyFair').get(0).scrollIntoView(true);
        this.simulateData.roll = roll;
        this.showSimulateRoll.style.opacity = 1;
        this.showSimulateRoll.classList.add('animate__animated', 'animate__bounceIn');

        this.simulateRollTimeout = setTimeout(() => {
            if (this.showSimulateRoll) {
                this.showSimulateRoll.classList.remove('animate__animated', 'animate__bounceIn');
                this.showSimulateRoll.style.opacity = 0;
            }
        }, 3000);
    }
}
</script>
<style src="@/assets/css/index.css" scoped></style>