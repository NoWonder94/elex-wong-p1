<template>
    <div class="referral">
        <div class="referral-container">
            <div class="referral-page-header">
                <div class="referral-page-header-title">
                    <img src="../assets/img/referral.png" />
                    <span class="page-title"> {{ $i18n.t('referral') }} </span>
                </div>
                <span class="close-button" @click="nav('')">{{ $i18n.t('close') }}</span>
            </div>
            <div class="upper-content">
                <span class="upper-content-title">{{ $i18n.t('earn') }}</span>
                <div class="bar-container"></div>
                <div class="upper-content-form">
                    <div class="form-ref">
                        <span class="form-ref-title">{{ $i18n.t('fromRefBets') }}</span>
                        <input class="form-ref-input" type="text" value="0.1%" readonly/>
                    </div>
                    <div class="form-ref">
                        <span class="form-ref-title">{{ $i18n.t('fromRefMining') }}</span>
                        <input class="form-ref-input" type="text" value="4%" readonly/>
                    </div>
                </div>
            </div>
            <div class="lower-content">
                <div class="lower-content-title">
                    <span>{{ $i18n.t('myReferrals') }}</span>
                </div>
                <div class="lower-content-form">
                    <template v-if="walletData">
                        <div class="referrals-form">
                            <span class="referrals-form-title">{{ $i18n.t('count') }}</span>
                            <input class="referrals-form-input" type="text" :value="walletData.referral_count" readonly/>
                        </div>
                        <div class="referrals-form">
                            <span class="referrals-form-title">{{ $i18n.t('profitFromRefBets') }}</span>
                            <template v-for="(reward, name) in referralRewards" :key="name">
                            <div class="input-group" v-if="name == 'sol'">
                              <input type="text" class="form-control" :value="reward + ' ' + name.toUpperCase()" readonly>
                              <span class="input-group-btn">
                                <button class="btn btn-default" type="button" @click="withdraw(name)" :disabled="reward == 0">{{ $i18n.t('withdraw') }}<i class="fa fa-spinner fa-spin fa-fw" v-if="withdrawLoadings[name]"></i></button>
                              </span>
                            </div>
                            </template>
                        </div>
                    </template>
                    <template v-if="publicKey">
                    <div class="referrals-form" v-if="accounts && (!accounts.data_account || accounts.lcd_nulls > 0)">
                        <div style="color: #fff; padding-bottom: 10px;" v-if="!accounts.data_account" v-html="$t('referralTips.tip1', [accounts.data_lamports])"></div>
                        <template v-if="accounts.lcd_nulls > 0">
                        <div style="color: #fff; padding-bottom: 10px;" v-html="$t('referralTips.tip2')"></div>
                        <ul class="lcds" style="padding-bottom: 10px;">
                            <template v-for="(lcd, name) in accounts.lcd_accounts" :key="name">
                            <li v-if="name == 'sol'" :class="[createLcds[name] ? 'add' : '', lcd ? 'check' : '']" @click="selectLcdType(name)">
                                <span>{{ name.toUpperCase() }}</span>
                            </li>
                            </template>
                        </ul>
                        </template>
                        <div class="referrals-form-submit" @click="init">
                            <template v-if="!accounts.data_account">
                            {{ $i18n.t('createAccount') }} <i class="fa fa-spinner fa-spin fa-fw" v-if="initLoading"></i>
                            </template>
                            <template v-else>
                            {{ $i18n.t('updateAccount') }} <i class="fa fa-spinner fa-spin fa-fw" v-if="initLoading"></i>
                            </template>
                        </div>
                    </div>
                    </template>
                    <template v-else>
                    <div class="referrals-form" style="color:#fff">
                        {{ $i18n.t('loginWallet') }}
                    </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { reactive, toRaw } from 'vue';
import { Vue, Options } from 'vue-class-component';
import { mapGetters } from 'vuex';
import { Common } from '@/utils';
import { ServiceProgram } from '@/programs';
import { CONFIG } from '@/defines';
import { useToast } from "vue-toastification";

@Options({
    computed: {
        ...mapGetters('account', {
            publicKey: 'walletPublicKey',
            walletData: "walletData",
            walletTokens: 'walletTokens'
        }),
        referralRewards() {
            const rewards:any = {};
            const indexs = CONFIG.tokens.indexs as any;
            for(const name in CONFIG.tokens.moneys) {
                const index = indexs[name];
                rewards[name] = this.walletData ? Common.lamportToAmount(this.walletData.referral_rewards[index],name) : 0;
            }
            return rewards;
        },
        withdrawLoadings() {
            const data:any = {};
            for(const name in CONFIG.tokens.moneys) {
                data[name] = false;
            }
            return reactive(data);
        }
    },
    watch: {
        publicKey() {
            this.getAccounts();
        }
    }
})

export default class Referral extends Vue {
    publicKey!: string;
    walletData!: any;
    walletTokens!: any;
    referralRewards!:any;
    initLoading:boolean = false;
    withdrawLoadings!:any;
    lcds:any = CONFIG.tokens.lcds;
    createLcds:any = reactive({sol: true});
    accounts:any = reactive({});
    toast:any = useToast();

    mounted() {
        this.getAccounts();
    }

    nav(page:any) {
        this.$router.push({path: '/' + page});
    }

    getAccounts() {
        ServiceProgram.instance().getAccounts(this.accounts);
    }

    selectLcdType(name:string) {
        if (this.accounts.lcd_accounts[name]) {
            return;
        }
        const status = this.createLcds[name]
        this.createLcds[name] = !status;
    }

    init() {
        this.initLoading = true;
        try {
            ServiceProgram.instance().referralInit(toRaw(this.accounts), toRaw(this.createLcds), () => {
                this.initLoading = false;
                this.getAccounts();
            }).catch((e:any) => {
                this.initLoading = false;
                this.toast.error(e.message);
            });
        } catch(e:any) {
            this.initLoading = false;
            this.toast.error(e.message);
        }
    }

    withdraw(name:string) {
        this.withdrawLoadings[name] = true;
        try {
            ServiceProgram.instance().referralRewardWithdraw(name, this.walletTokens).then((err:any) => {
                this.withdrawLoadings[name] = false;
                if (err) {
                    this.toast.error(err.message);
                }
            }).catch((e:any) => {
                this.withdrawLoadings[name] = false;
                this.toast.error(e.message);
            });
        } catch(e:any) {
            this.withdrawLoadings[name] = false;
            this.toast.error(e.message);
        }
    }
}
</script>
<style src="@/assets/css/referral.css" scoped>
</style>