<template>
    <div class="risky-farmer">
        <div class="risky-farmer-container">
          <div class='coinbar' v-if="SHOW_COIN_BAR">
            <CoinBar></CoinBar>
          </div>
            <div class="risky-farmer-page-header">
                <div class="risky-farmer-page-header-title">
                    <img src="../assets/img/risk.png" />
                    <span class="page-title"> {{ $i18n.t('risky') }} {{ currentToken.show }}</span>
                </div>
            </div>
            <div class="upper-content" v-if="riskyToken">
                <div class="risky-farmer-list">
                    <div class="risky-farmer-list-label">{{ currentToken.show }} {{ $i18n.t('balance') }}</div>
                    <div class="risky-farmer-list-value"><a :href="balanceUrl" target="_blank">{{ riskyToken.lamports_show }}</a></div>
                </div>
                <div class="risky-farmer-list">
                    <div class="risky-farmer-list-label">{{ $i18n.t('riskSupply') }} </div>
                    <div class="risky-farmer-list-value"><a :href="supplyUrl" target="_blank">{{ riskyToken.supply_show }}</a></div>
                </div>
                <div class="risky-farmer-list">
                    <div class="risky-farmer-list-label">{{ $i18n.t('riskPrice') }}({{ currentToken.show }}/{{ $i18n.t('risk') }})</div>
                    <div class="risky-farmer-list-value">{{ riskyToken.price }}</div>
                </div>
                <div class="bar-container"></div>
                <div class="risky-farmer-list">
                    <div class="risky-farmer-list-label">{{ $i18n.t('totalDeposit') }} {{ currentToken.show }}</div>
                    <div class="risky-farmer-list-value">{{ riskyToken.total_deposit }}</div>
                </div>
                <div class="risky-farmer-list">
                    <div class="risky-farmer-list-label">{{ $i18n.t('totalWithdraw') }} {{ currentToken.show }}</div>
                    <div class="risky-farmer-list-value">{{ riskyToken.total_withdraw }}</div>
                </div>
                <div class="risky-farmer-list">
                    <div class="risky-farmer-list-label">{{ $i18n.t('totalincome') }} {{ currentToken.show }}</div>
                    <div class="risky-farmer-list-value">{{ riskyToken.total_income }}</div>
                </div>
                <div class="risky-farmer-list">
                    <div class="risky-farmer-list-label">{{ $i18n.t('totalOutlay') }} {{ currentToken.show }}</div>
                    <div class="risky-farmer-list-value">{{ riskyToken.total_outlay }}</div>
                </div>
            </div>
            <div class="lower-content">
                <form class="risky-farmer-form">
                    <div class="form-input">
                        <div class="form-input-label">{{ $i18n.t('yourRisky') }}</div>
                        <input class="form-input-input" type="text" :value="walletRisk.amount"/>
                        <button class="form-input-button" data-toggle="modal" data-target="#buyRiskModal">{{ $i18n.t('buyRisk') }} <i class="fa fa-spinner fa-spin fa-fw" v-if="buyLoading"></i></button>
                    </div>
                    <div class="form-input">
                        <div class="form-input-label">{{ currentToken.show }}</div>
                        <input class="form-input-input" type="text" :value="riskToToken"/>
                        <button class="form-input-button" data-toggle="modal" data-target="#withdrawTokenModal" @click="withdrawRisk = walletRisk.amount">{{ $i18n.t('withdrawRisk') }} <i class="fa fa-spinner fa-spin fa-fw" v-if="withdrawLoading"></i></button>
                    </div>
                </form>
                <div class="risky-farmer-form-button" @click="close">
                    {{ $i18n.t('closeRisky') }} <i class="fa fa-spinner fa-spin fa-fw" v-if="closeLoading"></i>
                </div>
            </div>
        </div>
        <div class="risky-farmer-rules">
            <div class="risky-farmer-rules-title"> {{ $i18n.t('riskRule') }}</div>
            <ul class="risky-farmer-rules-list">
                <li>
                    {{ $i18n.t('riskRule1') }}
                </li>
                <li>
                    {{ $i18n.t('riskRule2') }}
                </li>
                <li>
                    {{ $i18n.t('riskRule3') }}
                </li>
                <li>
                    {{ $i18n.t('riskRule4') }}
                </li>
            </ul>
        </div>
    </div>
    <div class="modal fade" id="buyRiskModal" tabindex="-1" role="dialog" aria-labelledby="buyRiskModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="buyRiskModalLabel"> {{ $i18n.t('buyRisk') }}</h4>
          </div>
          <div class="modal-body">
            <div class="input-group">
              <span class="input-group-addon">{{ currentToken.show }}:</span>
              <input type="text" class="form-control" v-model="depositAmount" placeholder="Please enter the number of sol">
              <span class="input-group-btn">
                <button class="btn btn-success" type="button" @click="deposit">{{ $i18n.t('buy') }}</button>
              </span>
            </div>
            <div style="padding: 5px 0 0 56px; color: #546AFF;">≈ {{ buyRisk }} {{ $i18n.t('risk') }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="withdrawTokenModal" tabindex="-1" role="dialog" aria-labelledby="withdrawTokenModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="withdrawTokenModalLabel">{{ $i18n.t('withdraw') }} {{ currentToken.show }}</h4>
          </div>
          <div class="modal-body">
            <div class="input-group">
              <span class="input-group-addon">{{ $i18n.t('risk') }}:</span>
              <input type="text" class="form-control" v-model="withdrawRisk" placeholder="Please enter the number of risk">
              <span class="input-group-btn">
                <button class="btn btn-success" type="button" @click="withdraw">{{ $i18n.t('withdraw') }}</button>
              </span>
            </div>
            <div style="padding: 5px 0 0 56px; color: #546AFF;">≈ {{ withdrawToken }} {{ currentToken.show }}</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapGetters } from 'vuex';
import CoinBar from '@/components/CoinBar.vue';
import { CONFIG } from "@/defines";
import { Common } from '@/utils';
import { RiskyProgram } from '@/programs';
import jQuery from 'jquery';
import { BigNumber } from "bignumber.js";
import { useToast } from "vue-toastification";

@Options({
  components: {
    CoinBar
  },
  computed: {
    ...mapGetters('common', {
      risky: 'risky'
    }),
    ...mapGetters('account', {
      tokenType: "tokenType",
      currentToken: "currentToken",
      walletRisk: 'walletRisk'
    }),
    riskyToken() {
      if (!this.risky) {
        return null;
      }
      const index = CONFIG.get(`tokens.indexs.${this.tokenType}`);
      return this.risky.tokens[index];
    },
    balanceUrl() {
      return Common.getExplorerAddressUrl(CONFIG.get(`service.risky.fundpools.${this.tokenType}`))
    },
    supplyUrl() {
      return Common.getExplorerTokenUrl(CONFIG.get(`tokens.risks.${this.tokenType}`))
    },
    riskToToken() {
      if (!this.walletRisk || !this.riskyToken || typeof this.riskyToken.lamports == 'undefined') {
        return 0;
      }
      const decimal = CONFIG.get(`decimals.${this.tokenType}`);
      let token = new BigNumber(this.walletRisk.lamports);

      if (this.riskyToken.supply > 0) {
        token = token.multipliedBy(this.riskyToken.lamports).dividedBy(this.riskyToken.supply);
      }
      token = token.dividedBy(decimal.num);
      return parseFloat(token.toFixed(decimal.fixed, 3));
    },
    buyRisk() {
      const amount = Common.formatAmount(this.depositAmount, this.tokenType);
      if (amount == 0 || !this.riskyToken || typeof this.riskyToken.lamports == 'undefined') {
        return 0;
      }
      const decimal = CONFIG.get(`decimals.${this.tokenType}`);
      let token = new BigNumber(amount).multipliedBy(decimal.num);
      if (this.riskyToken.lamports > 0) {
        token = token.multipliedBy(this.riskyToken.supply).dividedBy(this.riskyToken.lamports);
      }
      token = token.dividedBy(decimal.num);
      return parseFloat(token.toFixed(decimal.fixed, 3));
    },
    withdrawToken() {
      const risk = Common.formatAmount(this.withdrawRisk, this.tokenType);
      if (risk <= 0 || !this.riskyToken || typeof this.riskyToken.lamports == 'undefined') {
        return 0;
      }

      const decimal = CONFIG.get(`decimals.${this.tokenType}`);
      let token = new BigNumber(risk).multipliedBy(decimal.num);
      if (this.riskyToken.supply > 0) {
        token = token.multipliedBy(this.riskyToken.lamports).dividedBy(this.riskyToken.supply);
      }
      let amount = parseFloat(token.toFixed(decimal.fixed, 3));
      if (amount > 0) {
        const dev = parseFloat(new BigNumber(amount).multipliedBy(CONFIG.dev.riskyRate).dividedBy(1000).toFixed(decimal.fixed, 3));
        amount = parseFloat(new BigNumber(amount).minus(dev).toFixed(decimal.fixed, 3));
      }
      return Common.lamportToAmount(amount, this.tokenType);
    }
  }
})
export default class RiskyFarmer extends Vue {
  balanceUrl!: string;
  supplyUrl!: string;
  tokenType!: string;
  risky!: any;
  riskyToken!: any;
  walletRisk!: number;
  riskToToken!: number;
  depositAmount: number = 1;
  buyRisk!: number;
  withdrawRisk: number = 1;
  withdrawToken!: number;
  buyLoading: boolean = false;
  withdrawLoading: boolean = false;
  closeLoading: boolean = false;
  toast:any = useToast();

  deposit() {
    jQuery("#buyRiskModal").modal('hide');
    const amount = Common.formatAmount(this.depositAmount, this.tokenType);
    if (amount <= 0) {
      return;
    }
    this.buyLoading = true;
    try {
      RiskyProgram.instance().deposit(amount).then(() => {
        this.buyLoading = false;
      }).catch((e:any) => {
        this.buyLoading = false;
        this.toast.error(e.message);
      });
    } catch(e:any) {
      this.buyLoading = false;
      this.toast.error(e.message);
    }
  }

  withdraw() {
    jQuery("#withdrawTokenModal").modal('hide');
    const risk = parseFloat(this.withdrawRisk + '');
    if (isNaN(risk) || risk <= 0) {
      return;
    }
    this.withdrawLoading = true;
    try {
      RiskyProgram.instance().withdraw(risk).then(() => {
        this.withdrawLoading = false;
      }).catch((e:any) => {
        this.withdrawLoading = false;
        this.toast.error(e.message);
      });
    } catch(e:any) {
      this.withdrawLoading = false;
      this.toast.error(e.message);
    }
  }

  close() {
    this.closeLoading = true;
    try {
      RiskyProgram.instance().close().then(() => {
        this.closeLoading = false;
      }).catch((e:any) => {
        this.closeLoading = false;
        this.toast.error(e.message);
      });
    } catch(e:any) {
      this.closeLoading = false;
      this.toast.error(e.message);
    }
  }
}
</script>
<style src="@/assets/css/riskyfarmer.css" scoped>
</style>