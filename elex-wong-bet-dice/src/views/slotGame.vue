<template>
    <div class="slotGame">
        <div class='coinbar' v-if="SHOW_COIN_BAR">
          <CoinBar></CoinBar>
        </div>

        <div class="machine">
           <Machine ref="machine"></Machine>
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
                    <a href="#3tab" data-toggle="tab">{{ $i18n.t('game_rule') }}</a>
                </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane active" id="1tab">
                   <SlotManual ref="manual" @update-amount="updateAmount" @play="play"/>
                </div>
                <div class="tab-pane" id="2tab">
                    <SlotAuto ref="auto" @update-amount="updateAmount" @play="play"/>
                </div>
                <div class="tab-pane" id="3tab" style="text-align: center;">
                    <div class="ethercontent">
                        <div class="ethergroup">
                            <img class="mask" src="../assets/img/ether_2.png"/>
                            <img class="mask" src="../assets/img/ether_2.png"/>
                            <img class="mask" src="../assets/img/ether_2.png"/>
                              = <span class="green">x 30</span>
                        </div>
                        <div class="ethergroup">
                            <img class="mask" src="../assets/img/ether_1.png"/>
                            <img class="mask" src="../assets/img/ether_2.png"/>
                            <img class="mask" src="../assets/img/ether_1.png"/>
                              = <span class="green">x 25</span>
                        </div>
                        <div class="ethergroup">
                            <img class="mask" src="../assets/img/ether_3.png"/>
                            <img class="mask" src="../assets/img/ether_3.png"/>
                            <img class="mask" src="../assets/img/ether_3.png"/>
                              = <span class="green">x 20</span>
                        </div>
                        <div class="ethergroup">
                            <img class="mask" src="../assets/img/ether_4.png"/>
                            <img class="mask" src="../assets/img/ether_4.png"/>
                            <img class="mask" src="../assets/img/ether_4.png"/>
                              = <span class="green">x 15</span>
                        </div>
                        <div class="ethergroup">
                            <img class="mask" src="../assets/img/ether_5.png"/>
                            <img class="mask" src="../assets/img/ether_5.png"/>
                            <img class="mask" src="../assets/img/ether_5.png"/>
                              = <span class="green">x 10</span>
                        </div>
                        <div class="ethergroup">
                            <img class="mask" src="../assets/img/ether_6.png"/>
                            <img class="mask" src="../assets/img/ether_6.png"/>
                            <img class="mask" src="../assets/img/ether_6.png"/>
                              = <span class="green">x 5 </span>
                        </div>
                        <div class="ethergroup">
                            {{ $i18n.t('twosameicon') }} = <span class="green">x 1.2</span>
                        </div>
                   </div>
                </div>
            </div>

            <div class="provably-fair">
                <span @click="isShowProvablyFair = true">{{ $i18n.t('provablyFairs.show') }} <i class="fa fa-eye"></i></span>
            </div>
        </div>

        <div class="bets-box" v-if="isShowProvablyFair">
            <div class="bets-box-header">
                <span class="bets-box-header-icon">  </span>
                <span>{{ $i18n.t('provablyFairs.title') }}</span>
                <span class="bets-box-header-icon" @click="isShowProvablyFair = false"><img class="livestats-icon" src="../assets/img/X_big.png"></span>
            </div>
            <pre class="bets-box-content provably-fair-code">
//<a href='/assets/images/slot-code.jpg' target="_blank">{{ $i18n.t('provablyFairs.log') }}</a>

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
 * RollClock: {{ $i18n.t('provablyFairs.rollClock.name') }}, <a href='https://docs.solana.com/developing/runtime-facilities/sysvars#clock' target="_blank">{{ $i18n.t('provablyFairs.doc') }}</a>
 * {{ $i18n.t('provablyFairs.rollClock.log') }}
 */
let roll_clock = JSON.parse(RollClock);

/**
 * RollTimes: {{ $i18n.t('provablyFairs.rollTimes.name') }}
 * {{ $i18n.t('provablyFairs.rollTimes.log') }}
 */
let seed_num = roll_clock.unix_timestamp + roll_clock.slot + RollTimes;
let seed_sha = createHash('sha256');
seed_sha.update(nonce_pubkey.toBuffer());
seed_sha.update(seed_num.toString());
let roll_seed = new PublicKey(seed_sha.digest());

let roll_sha = createHash('sha512');
roll_sha.update(roll_seed.toBuffer());
roll_sha.update(roll_nonce.toBuffer());

let roll_hexs  = roll_sha.digest('hex');
let roll_len   = roll_hexs.length;
let roll_index = 0;
let roll_nums  = [];

while (true) {
    if (roll_nums.length >= 3) {
        break;
    }

    if (roll_len - roll_index &lt; 2) {
        break;
    }

    let roll_num = parseInt(roll_hexs.substr(roll_index, 2), 16) % 10;
    if (roll_num > 0 && roll_num &lt; 7) {
        roll_nums.push(roll_num);
    }
    roll_index += 2;
}

if (roll_nums.length &lt; 3) {
    let for_num = 3 - roll_nums.length;
    for (let i = 0; i &lt; for_num; i++) {
        let begin = i * 3;
        let roll_num = parseInt(roll_hexs.substr(begin, 3), 16);
        roll_num = roll_num % 6 + 1;
        roll_nums.push(roll_num);
    }
}
return {roll1:roll_nums[0], roll2:roll_nums[1], roll3:roll_nums[2]};
            </pre>
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
                <router-link to="/slotBets" style="color:#fff;">{{ $i18n.t('more') }}</router-link>
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
                            <td>{{ utilsCommon.lamportToAmount(transaction.data.amount, transaction.data.token) }}</td>
                            <td class="text-right">
                                <span v-if="transaction.data.win > 0">+{{ utilsCommon.lamportToAmount(transaction.data.win, transaction.data.token) }}</span>
                                <span v-else>-{{ utilsCommon.lamportToAmount(transaction.data.amount, transaction.data.token) }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { reactive } from 'vue'
import { mapGetters } from 'vuex';
import { Vue, Options } from 'vue-class-component';
import SlotAuto from '@/components/SlotAuto.vue';
import SlotManual from '@/components/SlotManual.vue';
import Machine from '@/components/Machine.vue';
import CoinBar from '@/components/CoinBar.vue';
import { CONFIG } from '@/defines';
import { Common } from '@/utils';
import { SlotProgram } from '@/programs';
import { Chart, registerables } from 'chart.js';
import { useToast } from "vue-toastification";

const betData = reactive({
    amount: 1,
    isPlay: false,
    playType: 'Manual'
});

@Options({
  components: {
    SlotAuto,
    SlotManual,
    Machine,
    CoinBar,
  },
  computed: {
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
export default class slotGame extends Vue {
    tokenType!: string;
    currentToken!:any;
    betAmouts:any = CONFIG.slot.betAmouts as any;
    waitSignature = '';
    walletAmount!:number;
    liveStatus!: any;
    chart!:any;
    toast:any = useToast();
    utilsCommon:any = Common;
    allTransactionList:any = [];
    allTransactionKeys:any = {};
    transactionTimeout:any = null;
    slotProgram:SlotProgram = SlotProgram.instance();
    isShowProvablyFair = false;
    isShowNoncePubkeyCode = false;

    mounted() {
        this.liveStatus = reactive({});
        this.resetLiveStatus();
        (window as any).$bus.on('SlotBet', this.betListener);
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
        (window as any).$bus.off('SlotBet', this.betListener);
        (window as any).$bus.off('TokenTypeChange', this.tokenTypeChange);
    }

    getAllTransactions() {
      this.slotProgram.getProgramTransactions('').then((data:any) => {
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
            this.slotProgram.getProgramTransaction(keys).then((data:any) => {
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
        
        setTimeout(() => {
            (this as any).$refs[betData.playType].playResult(data);
            betData.isPlay = false;
        }, 1500);

        (this as any).$refs['machine'].rollResult(data);

        this.liveStatus.betNum++;

        this.waitSignature = '';
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
    }

    navAllBets(){
        this.$router.push('/slotBets');
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

    play(type:string) {
        if (betData.isPlay) {
            return;
        }
        
        this.setAmount(betData.amount);
        if (betData.amount > this.currentToken.amount) {
            this.toast.error(this.$t('insufficientBalance'));
            (this as any).$refs[type].playResult(null);
            return;
        }

        betData.playType = type;
        betData.isPlay = true;
        (this as any).$refs['machine'].startRoll();

        try {
          this.slotProgram.bet(Common.amountToLamport(betData.amount, this.tokenType)).then((signature) => {
            this.waitSignature = signature;
            this.slotProgram.getTransactionBySignature(signature, (signature:string) => {
                return this.waitSignature == signature;
            });
          });
        } catch(e:any) {
          console.log(e);
          this.toast.error(e.message);
          betData.isPlay = false;
          (this as any).$refs['machine'].stopRoll();
          (this as any).$refs[type].playResult(null);
        }
    }
}
</script>
<style src="@/assets/css/slotGame.css" scoped></style>