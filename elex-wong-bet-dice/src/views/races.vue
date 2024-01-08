<template>
    <div class="races">
        <div class="races-container">
            <div class="races-page-header">
                <div class="races-page-header-title">
                    <img src="../assets/img/race_1.png" />
                    <span class="page-title"> {{ $i18n.t('race') }}</span>
                </div>
            </div>
            <div class="upper-content" v-if="today.time">
                <span class="upper-content-title">{{ $i18n.t('races.today.title') }}</span>
                <div class="bar-container"></div>
                <div class="upper-content-form flex-row">
                    <div class="form-ref">
                        <span class="form-ref-title">{{ $i18n.t('races.today.time') }}(UTC)</span>
                        <input class="form-ref-input" type="text" :value="utilsCommon.formatDate(today.time)" readonly/>
                    </div>
                    <div class="form-ref">
                        <span class="form-ref-title">{{ $i18n.t('races.today.end') }}</span>
                        <input class="form-ref-input" type="text" :value="endTimeStr" readonly/>
                    </div>
                </div>
                <div class="upper-content-form flex-row" style="margin-top:0;" v-if="today.wallet">
                    <div class="form-ref">
                        <span class="form-ref-title">{{ $i18n.t('races.you_rank') }}</span>
                        <input class="form-ref-input" type="text" :value="today.wallet.rank" readonly/>
                    </div>
                    <div class="form-ref">
                        <span class="form-ref-title">{{ $i18n.t('races.you_prize') }}(USD)</span>
                        <input class="form-ref-input" type="text" :value="today.wallet.prize" readonly/>
                    </div>
                </div>
            </div>
            <div class="lower-content" v-if="yesterday.time">
                <span class="lower-content-title">
                    {{ $i18n.t('races.yesterday.title') }}({{ utilsCommon.formatDate(yesterday.time) }})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a v-if="yesterday.transfer" target="_blank" :href="utilsCommon.getExplorerTxUrl(yesterday.transfer.signature)">{{ $i18n.t('races.yesterday.status1') }}</a>
                    <span v-else>{{ $i18n.t('races.yesterday.status0') }}</span>
                </span>
                <div class="bar-container"></div>
                <div class="races-form flex-row" v-if="yesterday.wallet">
                    <div class="form-content">
                        <span class="form-content-title">{{ $i18n.t('races.you_rank') }}</span>
                        <div class="form-content-input">
                            <input type="text" :value="yesterday.wallet.rank" readonly/>
                        </div>
                    </div>
                    <div class="form-content">
                        <span class="form-content-title">{{ $i18n.t('races.you_prize') }}(USD)</span>
                        <div class="form-content-input">
                            <input type="text" :value="yesterday.wallet.prize" readonly/>
                        </div>
                    </div>
                </div>
                <div class="races-form flex-row" v-if="yesterday.transfer" style="margin-top:0;">
                    <div class="form-content">
                        <span class="form-content-title">{{ $i18n.t('races.sol_price') }}</span>
                        <div class="form-content-input">
                            <input type="text" :value="yesterday.transfer.price" readonly/>
                        </div>
                    </div>
                    <div class="form-content">
                        <span class="form-content-title">{{ $i18n.t('races.you_prize') }}(SOL)</span>
                        <div class="form-content-input">
                            <input type="text" :value="utilsCommon.lamportToAmount(yesterday.wallet.sol, 'sol')" readonly v-if="yesterday.wallet.sol > 0" />
                            <input type="text" value="--" readonly v-else />
                        </div>
                    </div>
                </div>
            </div>
            <div class="races-list">
                <div class="box-header">
                    <span :class="[show == 'today' ? 'active' : '']" @click="show = 'today'">{{ $i18n.t('races.today.rank') }}</span>
                    <span :class="[show == 'yesterday' ? 'active' : '']" @click="show = 'yesterday'">{{ $i18n.t('races.yesterday.rank') }}</span>
                </div>
                <div class="box-content">
                    <table class="table borderless" style="margin:0;">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col"> </th>
                                <th scope="col" style="width: 30%;">{{ $i18n.t('races.payer') }}</th>
                                <th class="text-right" style="width: 30%;" scope="col">{{ $i18n.t('races.bets') }}</th>
                                <th class="text-right" style="width: 30%;" scope="col">{{ $i18n.t('races.prize') }}&nbsp;&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody v-if="show == 'today'">
                          <tr v-for="(item, index) in today.list" :key="item.payer">
                            <td>&nbsp;&nbsp;#{{ index + 1 }}</td>
                            <td><a target="_blank" :href="utilsCommon.getExplorerAddressUrlByStr(item.payer)">{{ utilsCommon.formatAddressByStr(item.payer) }}</a></td>
                            <td class="text-right">{{ utilsCommon.lamportToAmount(item.bets, 'sol') }}</td>
                            <td class="text-right">{{ item.prize }}&nbsp;&nbsp;</td>
                          </tr>
                        </tbody>
                        <tbody v-if="show == 'yesterday'">
                          <tr v-for="(item, index) in yesterday.list" :key="item.payer">
                            <td>&nbsp;&nbsp;#{{ index + 1 }}</td>
                            <td><a target="_blank" :href="utilsCommon.getExplorerAddressUrlByStr(item.payer)">{{ utilsCommon.formatAddressByStr(item.payer) }}</a></td>
                            <td class="text-right">{{ utilsCommon.lamportToAmount(item.bets, 'sol') }}</td>
                            <td class="text-right">{{ item.prize }}&nbsp;&nbsp;</td>
                          </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="races-rules">
                <div class="races-rules-title">{{ $i18n.t('races.tips.title') }}</div>
                <ol class="races-rules-list">
                    <li>
                      {{ $i18n.t('races.tips.rules') }}:<br/>
                      {{ $i18n.t('races.tips.ruleitem', [1, 50]) }}<br/>
                      {{ $i18n.t('races.tips.ruleitem', [2, 25]) }}<br/>
                      {{ $i18n.t('races.tips.ruleitem', [3, 13]) }}<br/>
                      {{ $i18n.t('races.tips.ruleitem', [4, 6]) }}<br/>
                      {{ $i18n.t('races.tips.ruleitem', ['5 - 10', 1]) }}
                    </li>
                    <li>
                      {{ $i18n.t('races.tips.send') }}
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { reactive } from 'vue';
import { mapGetters } from 'vuex';
import { Common, Api } from '@/utils';
import { useToast } from "vue-toastification";

@Options({
  computed: {
    ...mapGetters('account', {
      publicKey: 'walletPublicKey'
    })
  },
  watch: {
    publicKey() {
      this.getToday();
      this.getYesterday();
    }
  }
})
export default class Races extends Vue {
  publicKey!: string;
  show = 'today';
  today:any = reactive({});
  yesterday:any = reactive({});
  utilsCommon:any = Common;
  endTime = 0;
  endTimeout!:any;
  endTimeStr = '';
  todayTimeout!:any;
  yesterdayTimeout!:any;
  toast:any = useToast();

  mounted() {
    this.getToday();
  }

  beforeUnmount() {
    if (this.endTimeout) {
        clearTimeout(this.endTimeout);
    }

    if (this.todayTimeout) {
        clearTimeout(this.todayTimeout);
    }

    if (this.yesterdayTimeout) {
        clearTimeout(this.yesterdayTimeout);
    }
  }

  getToday() {
    if (this.todayTimeout) {
        clearTimeout(this.todayTimeout);
    }

    try {
        Api.post('Race/today', {
            payer: this.publicKey
        }).then((data:any) => {
            Object.assign(this.today, data);
            const endTime = this.today.time + 86400;
            if (this.endTime < endTime) {
                this.endTime = endTime;
                this.getEndTimeStr();
                this.getYesterday();
            }

            this.todayTimeout = setTimeout(() => {
                this.getToday();
            }, 5000);
        });
    } catch(e:any) {
        this.toast.error(e.message);
        this.todayTimeout = setTimeout(() => {
            this.getToday();
        }, 30000);
    }
  }

  getYesterday() {
    if (this.yesterdayTimeout) {
        clearTimeout(this.yesterdayTimeout);
    }

    try {
        Api.post('Race/yesterday', {
            payer: this.publicKey
        }).then((data:any) => {
            Object.assign(this.yesterday, data);
            if (!this.yesterday.transfer) {
                this.yesterdayTimeout = setTimeout(() => {
                    this.getYesterday();
                }, 5000);
            }
        });
    } catch(e:any) {
        this.toast.error(e.message);
        this.yesterdayTimeout = setTimeout(() => {
            this.getYesterday();
        }, 30000);
    }
  }

  getEndTimeStr() {
    if (this.endTimeout) {
        clearTimeout(this.endTimeout);
    }

    const nowTime = Math.floor(new Date().getTime() / 1000);
    let time = this.endTime - nowTime;
    let str = '';
    const h = Math.floor(time / 3600);
    time = time % 3600;
    if (h < 10) {
        str += '0' + h;
    } else {
        str += h;
    }

    const m = Math.floor(time / 60);
    time = time % 60;
    if (m < 10) {
        str += ':0' + m;
    } else {
        str += ':' + m;
    }

    if (time < 10) {
        str += ':0' + time;
    } else {
        str += ':' + time;
    }
    this.endTimeStr = str;

    this.endTimeout = setTimeout(() => {
        this.getEndTimeStr();
    }, 1000);
  }
}
</script>
<style src="@/assets/css/races.css" scoped>
</style>