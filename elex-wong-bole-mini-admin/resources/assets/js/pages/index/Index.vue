<template>
    <div class="page-container">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="grid-content" v-loading="loading.coinStats">
                    <div slot="header" class="font-size-first">{{ $t('index.coinsUse') }}</div>
                    <div class="text-danger-custom flex-center" v-if="error.coinStats">
                        <i class="el-icon-error"></i>
                        {{ $t('messages.loading-failed') }} 
                        <a href="javascript:;" @click="getCoinStats">{{ $t('refresh') }}</a>
                    </div>
                    <div v-else>
                        <div class="mb-3">{{ $t('index.totalUse') }}：{{ coinStats.amount_total | numeral('0,0.[0000]') }}</div>
                        <div class="mb-3">{{ $t('index.currentUse') }}：{{ coinStats.amount_month_current | numeral('0,0.[0000]') }}</div>
                        <div class="mb-3">{{ $t('index.previousUse') }}：{{ coinStats.amount_month_last | numeral('0,0.[0000]') }}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="grid-content" v-loading="loading.coinAgency">
                    <div slot="header" class="font-size-first">{{ $t('index.coins') }}</div>
                    <div class="text-danger-custom flex-center" v-if="error.coinAgency">
                        <i class="el-icon-error"></i>
                        {{ $t('messages.loading-failed') }} 
                        <a href="javascript:;" @click="getCoinAgency">{{ $t('refresh') }}</a>
                    </div>
                    <div v-else>
                        <div class="mb-3">{{ $t('index.coinsTotal') }}：{{ coinAgency.total_in | numeral('0,0.[0000]') }}</div>
                        <div class="mb-3">{{ $t('index.coinsGive') }}：{{ Number(coinAgency.agency)+Number(coinAgency.game) | numeral('0,0.[0000]') }}</div>
                        <div class="mb-3">{{ $t('index.coinsHave') }}：{{ coinAgency.current | numeral('0,0.[0000]') }}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="grid-content" v-loading="loading.gamePlayer">
                    <div slot="header" class="font-size-first">{{ $t('index.player') }}</div>
                    <div class="text-danger-custom flex-center" v-if="error.gamePlayer">
                        <i class="el-icon-error"></i>
                        {{ $t('messages.loading-failed') }} 
                        <a href="javascript:;" @click="getGamePlayer">{{ $t('refresh') }}</a>
                    </div>
                    <div v-else>
                        <div class="mb-3">{{ $t('index.totalPlayer') }}：{{ gamePlayer.player_total | numeral('0,0') }}</div>
                        <div class="mb-3">{{ $t('index.currentPlayer') }}：{{ gamePlayer.player_month_current | numeral('0,0') }}</div>
                        <div class="mb-3">{{ $t('index.previousPlayer') }}：{{ gamePlayer.player_month_last | numeral('0,0') }}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-card class="grid-content" v-loading="loading.gameStatus">
                <div class="text-danger-custom flex-center" v-if="error.gameStatus">
                    <i class="el-icon-error"></i>
                    {{ $t('messages.loading-failed') }} 
                    <a href="javascript:;" @click="getGameStatus">{{ $t('refresh') }}</a>
                </div>
                <div class="text-left" v-else>
                    <span class="mr-5">{{ $t('index.onlineTotalPeople') }}：{{ gameStatus.amount_online | numeral('0,0.[0000]') }}</span>
                    <span class="mr-5">{{ $t('index.onlineTotalPlayer') }}：{{ gameStatus.amount_playing | numeral('0,0.[0000]') }}</span>
                    <span class="mr-5">{{ $t('index.onlineTotalPlayer') }}：{{ gameStatus.amount_robot | numeral('0,0.[0000]') }}</span>
                </div>
            </el-card>
        </el-row>
        <el-row>
            <div class="page-chart-time">
                <el-radio-group v-model="activeTime" size="mini">
                    <el-radio-button label="day">{{ $t('chart.totalDay') }}</el-radio-button>
                    <el-radio-button label="month">{{ $t('chart.totalMonth') }}</el-radio-button>
                </el-radio-group>
            </div>
            <el-tabs type="border-card" v-model="activeName">
                <el-tab-pane :label="$t('chart.use')" name="coin">
                    <div v-show="activeTime=='day'">
                        <chart-coin :activeTime="activeTime" :activeName="activeName" :windowSize="windowSize"></chart-coin>
                    </div>
                    <div v-show="activeTime=='month'">
                        <chart-coin-month :activeTime="activeTime" :activeName="activeName" :windowSize="windowSize"></chart-coin-month>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="$t('chart.player')" name="player">
                    <div v-show="activeTime=='day'">
                        <chart-player :activeTime="activeTime" :activeName="activeName" :windowSize="windowSize"></chart-player>
                    </div>
                    <div v-show="activeTime=='month'">
                        <chart-player-month :activeTime="activeTime" :activeName="activeName" :windowSize="windowSize"></chart-player-month>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-row>
        <el-tabs type="border-card">
            <el-tab-pane :label="$t('chart.activeNo')">
                <chart-active :windowSize="windowSize"></chart-active>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import ChartCoin from './coin/Line.vue'
    import ChartPlayer from './player/Line.vue'
    import ChartCoinMonth from './coin/LineMonth.vue'
    import ChartPlayerMonth from './player/LineMonth.vue'
    import ChartActive from './active/Line.vue'

    export default {
        components: {
            ChartCoin,
            ChartPlayer,
            ChartCoinMonth,
            ChartPlayerMonth,
            ChartActive,
        },
        data() {
            return {
                windowSize: {
                    width: 0,
                    height: 0
                },
                activeTime: 'day',
                activeName: 'name',
                loading: {
                    coinStats: false,
                    coinAgency: false,
                    gamePlayer: false,
                    gameStatus: false,
                },
                error: {
                    coinStats: false,
                    coinAgency: false,
                    gamePlayer: false,
                    gameStatus: false,
                },
                coinStats: {},
                coinAgency: {},
                gamePlayer: {},
                gameStatus: {},
            }
        },
        methods: {
            getCoinStats() {
                this.error.coinStats = false;
                this.loading.coinStats = true;
                axios.get('/index/getCoinStats').then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.coinStats = response.data.resp_data;
                    } else {
                        this.error.coinStats = true;
                    }
                    this.loading.coinStats = false;
                })
            },
            getCoinAgency() {
                this.error.coinAgency = false;
                this.loading.coinAgency = true;
                axios.get('/index/getCoinAgency').then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.coinAgency = response.data.resp_data;
                    } else {
                        this.error.coinAgency = true;
                    }
                    this.loading.coinAgency = false;
                })
            },
            getGamePlayer() {
                this.error.gamePlayer = false;
                this.loading.gamePlayer = true;
                axios.get('/index/getGamePlayer').then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.gamePlayer = response.data.resp_data;
                    } else {
                        this.error.gamePlayer = true;
                    }
                    this.loading.gamePlayer = false;
                })
            },
            getGameStatus() {
                this.error.gameStatus = false;
                this.loading.gameStatus = true;
                axios.get('/index/getGameStatus').then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.gameStatus = response.data.resp_data;
                    } else {
                        this.error.gameStatus = true;
                    }
                    this.loading.gameStatus = false;
                })
            },
        },
        mounted() {
            this.getCoinStats();
            this.getCoinAgency();
            this.getGamePlayer();
            this.getGameStatus();
            // 初始化选中选项卡
            this.activeName = 'coin';
            // 浏览器窗口改变
            window.onresize = () => {
                this.windowSize.width = window.innerWidth;
                this.windowSize.height = window.innerHeight;
            };
            // 定时更新在线人数
            this.intervalId = setInterval(() => {
                if (!this.loading.gameStatus) {
                    this.getGameStatus();
                }
            }, 10000);
        },
        beforeDestroy() {
            clearInterval(this.intervalId);
        }
    }
</script>

<style lang="scss" scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        color: $font-color-second;
    }

    .page-chart-time {
        position: absolute;
        top: 6px;
        right: 6px;
        z-index: 11;
    }
</style>
