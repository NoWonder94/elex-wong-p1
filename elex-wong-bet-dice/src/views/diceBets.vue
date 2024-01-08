<template>

    <div class="bets-container">    
        <ul class="nav nav-pills">
            <li class="tabs active">
                <a href="#1tab" data-toggle="tab" @click="changeStatistics('all', false)">{{ $i18n.t('allBets') }}</a>
            </li>
            <li class="tabs" v-if="connected">
                <a href="#2tab" data-toggle="tab" @click="changeStatistics('my', false)">{{ $i18n.t('myBets') }}</a>
            </li>
            <li class="tabs">
                <a href="#3tab" data-toggle="tab" @click="changeStatistics('win', false)">{{ $i18n.t('highRoll') }}</a>
            </li>
            <li class="tabs">
                <a href="#4tab" data-toggle="tab" @click="changeStatistics('rank', false)">{{ $i18n.t('rank') }}</a>
            </li>
        </ul>
    </div>
    <div class="bets">
       <table class="table borderless">
            <thead class="thead-dark">
                <tr>
                    <th scope="col"><sapn v-if="listShowType != 'rank'">{{ $i18n.t('betID') }}</sapn></th>
                    <th scope="col">{{ $i18n.t('payer') }}</th>
                    <th scope="col">{{ $i18n.t('bets') }}</th>
                    <th class="text-right" scope="col">{{ $i18n.t('profit') }}</th>
                </tr>
            </thead>
            <tbody v-if="listShowType == 'all'">
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
            <tbody v-if="listShowType == 'my'">
                <tr :class="[transaction.data.win > 0 ? 'tr-win' : 'tr-lose']" v-for="transaction in walletTransactionList" :key="transaction.signature">
                    <td><a target="_blank" :href="utilsCommon.getExplorerTxUrl(transaction.signature)">{{ utilsCommon.formatSignature(transaction.signature) }}</a></td>
                    <td><a target="_blank" :href="utilsCommon.getExplorerAddressUrlByStr(transaction.payer)">{{ utilsCommon.formatAddressByStr(transaction.payer) }}</a></td>
                    <td>{{ utilsCommon.lamportToAmount(transaction.data.amount, transaction.data.token) }}</td>
                     <td class="text-right">
                        <span v-if="transaction.data.win > 0">+{{ utilsCommon.lamportToAmount(transaction.data.win, transaction.data.token) }}</span>
                        <span v-else>-{{ utilsCommon.lamportToAmount(transaction.data.amount, transaction.data.token) }}</span>
                    </td>
                </tr>
            </tbody>
            <tbody v-if="listShowType == 'win'">
                <tr :class="[transaction.data.win > 0 ? 'tr-win' : 'tr-lose']" v-for="transaction in winTransactionList" :key="transaction.signature">
                    <td><a target="_blank" :href="utilsCommon.getExplorerTxUrl(transaction.signature)">{{ utilsCommon.formatSignature(transaction.signature) }}</a></td>
                    <td><a target="_blank" :href="utilsCommon.getExplorerAddressUrlByStr(transaction.payer)">{{ utilsCommon.formatAddressByStr(transaction.payer) }}</a></td>
                    <td>{{ utilsCommon.lamportToAmount(transaction.data.amount, transaction.data.token) }}</td>
                     <td class="text-right">
                        <span v-if="transaction.data.win > 0">+{{ utilsCommon.lamportToAmount(transaction.data.win, transaction.data.token) }}</span>
                        <span v-else>-{{ utilsCommon.lamportToAmount(transaction.data.amount, transaction.data.token) }}</span>
                    </td>
                </tr>
            </tbody>
            <tbody v-if="listShowType == 'rank'">
                <tr v-for="(rankItem, rankIndex) in rankList" :key="rankItem.payer">
                    <td>#{{ rankIndex + 1 }}</td>
                    <td><a target="_blank" :href="utilsCommon.getExplorerAddressUrlByStr(rankItem.payer)" style="color:#6192F1">{{ utilsCommon.formatAddressByStr(rankItem.payer) }}</a></td>
                    <td>{{ utilsCommon.lamportToAmount(rankItem.bets, rankItem.token) }}</td>
                    <td class="text-right">
                        {{ utilsCommon.lamportToAmount(rankItem.wins, rankItem.token) }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div style="margin-bottom: 20px; text-align: center;" v-if="showAllLoadMore && listShowType == 'all'">
          <button type="button" class="btn btn-primary btn-sm" :disabled="isLoadMore" @click="loadMore()">{{ $i18n.t('loadMore') }} <i class="fa fa-spinner fa-spin fa-fw" v-if="isLoadMore"></i></button>
        </div>
        <div style="margin-bottom: 20px; text-align: center;" v-if="showMyLoadMore && listShowType == 'my'">
          <button type="button" class="btn btn-primary btn-sm" :disabled="isLoadMore" @click="loadMore()">{{ $i18n.t('loadMore') }} <i class="fa fa-spinner fa-spin fa-fw" v-if="isLoadMore"></i></button>
        </div>
        <div style="margin-bottom: 20px; text-align: center;" v-if="showWinLoadMore && listShowType == 'win'">
          <button type="button" class="btn btn-primary btn-sm" :disabled="isLoadMore" @click="loadMore()">{{ $i18n.t('loadMore') }} <i class="fa fa-spinner fa-spin fa-fw" v-if="isLoadMore"></i></button>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapGetters } from 'vuex';
import { Common } from '@/utils';
import { DiceProgram } from '@/programs';
import { useToast } from "vue-toastification";

@Options({
  computed: mapGetters('account', {
    walletKey: 'walletPublicKey',
    connected: 'isConnected'
  }),
  watch: {
    walletKey() {
      this.walletTransactionList = [];
      this.walletTransactionKeys = {};
      this.showMyLoadMore = true;
      this.walletTransactionLast = '';
    }
  }
})
export default class Bets extends Vue {
  walletKey!: any;
  connected!:boolean;
  listShowType = "all";
  allTransactionList:any = [];
  allTransactionKeys:any = {};
  walletTransactionList:any = [];
  walletTransactionKeys:any = {};
  winTransactionList:any = [];
  winTransactionPage = 0;
  rankList:any = [];
  utilsCommon:any = Common;
  toast:any = useToast();
  isLoadMore:boolean = true;
  showAllLoadMore:boolean = true;
  showMyLoadMore:boolean = true;
  showWinLoadMore:boolean = true;
  allTransactionLast:string = "";
  walletTransactionLast:string = "";
  transactionTimeout:any = null;
  diceProgram:DiceProgram = DiceProgram.instance();

  mounted() {
    this.changeStatistics('all', true);
    (window as any).$bus.on('DiceBet', this.setAllTransactionData);
    this.transactionTimeoutBegin();
  }

  beforeUnmount() {
    if (this.transactionTimeout != null) {
      clearTimeout(this.transactionTimeout);
    }
    (window as any).$bus.off('DiceBet', this.setAllTransactionData);
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

  checkAllTransactionExist(signature:string) {
    return typeof this.allTransactionKeys[signature] !== 'undefined';
  }

  setAllTransactionData(data:any) {
    if (data.payer == this.walletKey) {
      this.setWalletTransactionData(data)
    }

    if (this.checkAllTransactionExist(data.signature)) {
      return;
    }

    this.allTransactionKeys[data.signature] = true;

    const list = this.allTransactionList;
    list.unshift(data);

    this.allTransactionList = list;

    this.transactionTimeoutBegin();
  }

  checkWalletTransactionExist(signature:string) {
    return typeof this.walletTransactionKeys[signature] !== 'undefined';
  }

  setWalletTransactionData(data:any) {
    if (this.checkWalletTransactionExist(data.signature)) {
      return;
    }

    this.walletTransactionKeys[data.signature] = true;

    const list = this.walletTransactionList;
    list.unshift(data);

    this.walletTransactionList = list;
  }

  loadMore() {
    this.isLoadMore = true;
    try {
      switch(this.listShowType) {
        case "my":
          this.diceProgram.getWalletTransactions(this.walletTransactionLast).then((data:any) => {
            this.isLoadMore = false;
            this.showMyLoadMore = data.length == 30;
            this.walletTransactionList = this.walletTransactionList.concat(data);
            this.walletTransactionLast = this.walletTransactionList.length > 0 ? this.walletTransactionList[this.walletTransactionList.length - 1].signature : '';
          }).catch(() => {
            this.isLoadMore = false;
          });
        break;

        case "win":
          this.diceProgram.getProgramTransactionWins(this.winTransactionPage).then((data:any) => {
            this.isLoadMore = false;
            if (data.length == 30) {
              this.winTransactionPage++;
              this.showWinLoadMore = true;
            } else {
              this.showWinLoadMore = false;
            }
            this.winTransactionList = this.winTransactionList.concat(data);
          }).catch(() => {
            this.isLoadMore = false;
          });
        break;

        case "rank":
          this.diceProgram.getProgramRanks().then((data:any) => {
            this.isLoadMore = false;
            this.rankList = data;
          }).catch(() => {
            this.isLoadMore = false;
          });
        break;
          
        default:
          this.diceProgram.getProgramTransactions(this.allTransactionLast).then((data:any) => {
            this.isLoadMore = false;
            this.showAllLoadMore = data.length == 30;
            this.allTransactionList = this.allTransactionList.concat(data);
            this.allTransactionLast = this.allTransactionList.length > 0 ? this.allTransactionList[this.allTransactionList.length - 1].signature : '';
          }).catch(() => {
            this.isLoadMore = false;
          });
        break;
      }
    } catch(e:any) {
      this.toast.error(e.message);
      this.isLoadMore = false;
    }
  }

  changeStatistics(type:string, isEnforce: boolean) {
    if (this.listShowType == type && !isEnforce) {
        return;
    }

    if (type == 'win') {
      this.winTransactionPage = 0;
      this.winTransactionList = [];
    }

    this.listShowType = type;
    this.loadMore();
  }
}
</script>
<style src="@/assets/css/bets.css" scoped>
</style>