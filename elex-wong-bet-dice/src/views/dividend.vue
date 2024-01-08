<template>
    <div class="dividend">
        <div class="dividend-container">
            <div class='coinbar' v-if="SHOW_COIN_BAR">
                <CoinBar></CoinBar>
            </div>
            <div class="dividend-page-header">
                <div class="dividend-page-header-title">
                    <img src="../assets/img/dividend.png" />
                    <span class="page-title"> {{ $i18n.t('theDividend') }} {{ currentToken.show }}</span>
                </div>
            </div>
            <div class="upper-content">
                <span class="upper-content-title">{{ $i18n.t('runningPool') }}</span>
                <div class="bar-container"></div>
                <div class="upper-content-form" v-if="tokenDividend">
                    <div class="form-ref">
                        <span class="form-ref-title">{{ $i18n.t('period') }}</span>
                        <input class="form-ref-input" type="text" :value="utilsCommon.formatTimestamp(tokenDividend.today.timestamp)" readonly/>
                    </div>
                    <div class="form-ref">
                        <span class="form-ref-title">{{ $i18n.t('dividend') }}</span>
                        <input class="form-ref-input" type="text" :value="utilsCommon.lamportToAmount(tokenDividend.today.lamports, tokenType) + ' ' + currentToken.show" readonly/>
                    </div>
                    <div class="form-ref">
                        <span class="form-ref-title">{{ $i18n.t('frozenToken') }}</span>
                        <input class="form-ref-input" type="text" :value="utilsCommon.lamportToAmount(tokenDividend.today.frozen, tokenType) + ' ' + $i18n.t('LCD')" readonly/>
                    </div>
                </div>
                <div class="upper-content-form" v-else>
                    <div class="form-ref">
                        <span class="form-ref-title">{{ $i18n.t('period') }}</span>
                        <input class="form-ref-input" type="text" value="" readonly/>
                    </div>
                    <div class="form-ref">
                        <span class="form-ref-title">{{ $i18n.t('dividend') }}</span>
                        <input class="form-ref-input" type="text" :value="'0 ' + currentToken.show" readonly/>
                    </div>
                    <div class="form-ref">
                        <span class="form-ref-title">{{ $i18n.t('frozenToken') }}</span>
                        <input class="form-ref-input" type="text" value="0 LCD" readonly/>
                    </div>
                </div>
            </div>
            <div class="lower-content" v-if="walletDividend">
                <div class="dividend-form">
                    <div class="form-content">
                        <span class="form-content-title">{{ $i18n.t('myToken') }}</span>
                        <div class="form-content-input">
                            <input type="text" :value="lcd.amount + ' ' + $i18n.t('LCD')" readonly/>
                            <div class="freeze-button" @click="freeze">{{ $i18n.t('freeze') }} <i class="fa fa-spinner fa-spin fa-fw" v-if="freezeLoading"></i></div>
                        </div>
                    </div>
                    <div class="form-content">
                        <span class="form-content-title">{{ $i18n.t('frozen') }}</span>
                        <div class="form-content-input">
                            <input type="text" :value="utilsCommon.lamportToAmount(walletDividend.frozen, tokenType) + ' ' + $i18n.t('LCD')" readonly/>
                            <div class="release-button" @click="unfreeze">{{ $i18n.t('release') }} <i class="fa fa-spinner fa-spin fa-fw" v-if="unfreezeLoading"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dividend-history" v-if="tokenDividend && tokenDividend.before1_day">
                <span class="dividend-history-date">
                    {{ $i18n.t('yesterday') }} ({{ utilsCommon.formatTimestamp(tokenDividend.before1_day.timestamp) }})
                </span>
                <div class="dividend-history-info">
                    <div class="history-info">
                        <span class="history-info-title">
                           {{ $i18n.t('dividendCollected') }}
                        </span>
                        <span class="history-info-title">
                            ({{ currentToken.show }})
                        </span>
                        <span class="history-info-amount">
                            {{ utilsCommon.lamportToAmount(tokenDividend.before1_day.lamports, tokenType) }}
                        </span>
                    </div>
                    <div class="history-info">
                        <span class="history-info-title">
                            {{ $i18n.t('totalFrozen') }}
                        </span>
                        <span class="history-info-title">
                            ({{ $i18n.t('LCD') }})
                        </span>
                        <span class="history-info-amount" v-if="walletDividend">
                            {{ utilsCommon.lamportToAmount(walletDividend.amount, tokenType) }} / {{ utilsCommon.lamportToAmount(tokenDividend.before1_day.frozens, tokenType) }}
                        </span>
                        <span class="history-info-amount" v-else>
                            0 / {{ utilsCommon.lamportToAmount(tokenDividend.before1_day.frozens, tokenType) }}
                        </span>
                    </div>
                </div>
                <hr class="dividend-history-divider" v-if="walletDividend"/>
                <div class="dividend-history-form" v-if="walletDividend">
                    <span class="dividend-history-form-label">{{ $i18n.t('myDividend') }} ({{ currentToken.show }})</span>
                    <div class="dividend-history-form-input">
                        <input type="text" :value="utilsCommon.dividendCompute(walletDividend.amount, tokenDividend.before1_day.frozens, tokenDividend.before1_day.lamports, tokenType)" readonly/>
                        <div class="claim-button" @click="claim">{{ $i18n.t('claim') }}! <i class="fa fa-spinner fa-spin fa-fw" v-if="claimLoading"></i></div>
                    </div>
                </div>
            </div>
            <div class="dividend-rules">
                <div class="dividend-rules-title"> {{ $i18n.t('dividendrule') }}</div>
                <ol class="dividend-rules-list">
                    <li>
                        {{ $i18n.t('dividendruleA1') }}<br>{{ $i18n.t('dividendruleA2') }}
                    </li>
                    <li>
                        {{ $i18n.t('dividendruleB1') }}<br>{{ $i18n.t('dividendruleB2') }}<br>{{ $i18n.t('dividendruleB3') }}<br>{{ $i18n.t('dividendruleB4') }}
                    </li>
                    <li>
                        {{ $i18n.t('dividendruleC1') }}<br>{{ $i18n.t('dividendruleC2') }}<br>{{ $i18n.t('dividendruleC3') }}
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapGetters } from 'vuex';
import { CONFIG } from "@/defines";
import { Common, Toast } from '@/utils';
import { DividendProgram } from '@/programs';
import CoinBar from '@/components/CoinBar.vue';
@Options({
    components: {
        CoinBar,
    },
    computed: {
        ...mapGetters('common', {
            dividend: 'dividend'
        }),
        ...mapGetters('account', {
            walletData: 'walletData',
            tokenType: "tokenType",
            currentToken: "currentToken",
            lcd: 'walletLcd'
        }),
        programKey() {
            return Common.formatAddress(CONFIG.get(`tokens.lcds.${this.tokenType}`))
        },
        programUrl() {
            // return Common.getExplorerAddressUrl(CONFIG.tokens.lcd)
        },
        walletDividend() {
            if (!this.tokenDividend || !this.walletData) {
                return null;
            }
            const index = CONFIG.get(`tokens.indexs.${this.tokenType}`);

            const walletDividend = this.walletData.dividends[index];
            const wdTimestamp = walletDividend.timestamp;
            const dTimestamp = this.dividend.current_timestamp;

            if (wdTimestamp < dTimestamp) {
                walletDividend.amount = walletDividend.amount.add(walletDividend.frozen);
                walletDividend.frozen = 0;
                walletDividend.timestamp = dTimestamp;
            }

            return walletDividend;
        },
        tokenDividend() {
            if (!this.dividend) {
                return null;
            }
            return this.dividend.tokens[CONFIG.get(`tokens.indexs.${this.tokenType}`)];
        }
    }
})

export default class Dividend extends Vue {
    utilsCommon:any = Common;
    programKey!: string;
    programUrl!: string;
    dividend!:any;
    tokenDividend!:any;
    currentToken!:any;
    lcd!: any;
    walletData!:any;
    walletDividend!:any;
    freezeLoading:boolean = false;
    unfreezeLoading:boolean = false;
    claimLoading:boolean = false;
    dividendProgram:DividendProgram = DividendProgram.instance();

    nav(page:any) {
        this.$router.push({path: '/' + page});
    }

    freeze() {
        this.freezeLoading = true;
        try {
            this.dividendProgram.freeze().then(() => {
                this.freezeLoading = false;
            });
        } catch(e:any) {
            this.freezeLoading = false;
            Toast.error(e.message);
        }
    }

    unfreeze() {
        this.unfreezeLoading = true;
        try {
            this.dividendProgram.unfreeze().then(() => {
                this.unfreezeLoading = false;
            });
        } catch(e:any) {
            this.unfreezeLoading = false;
            Toast.error(e.message);
        }
    }

    claim() {
        this.claimLoading = true;
        try {
            this.dividendProgram.claim().then(() => {
                this.claimLoading = false;
            });
        } catch(e:any) {
            this.claimLoading = false;
            Toast.error(e.message);
        }
    }
}
</script>
<style src="@/assets/css/dividend.css" scoped>
</style>