<template>
    <div class="page-container">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="grid-content" v-loading="loading.coinStats">
                    <div class="text-danger-custom flex-center" v-if="error.coinStats">
                        <i class="el-icon-error"></i>
                        {{ $t('messages.loading-failed') }} 
                        <a href="javascript:;" @click="getCoinStats">{{ $t('refresh') }}</a>
                    </div>
                    <div v-else>
                        <h4>游戏收益</h4>
                        <div class="mt-2">金币收益累计：{{ parseFloat(coinStats.amount_total) }}</div>
                        <div class="mt-2">当月金币收益：{{ parseFloat(coinStats.amount_month_current) }}</div>
                        <div class="mt-2">上月金币收益：{{ parseFloat(coinStats.amount_month_last) }}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="grid-content" v-loading="loading.coinAgency">
                    <div class="text-danger-custom flex-center" v-if="error.coinAgency">
                        <i class="el-icon-error"></i>
                        加载失败，点击
                        <a href="javascript:;" @click="getCoinAgency">刷新</a>
                    </div>
                    <div v-else>
                        <h4>代理金币</h4>
                        <div class="mt-2">发放代理累计：{{ parseFloat(coinAgency.total_in) }}</div>
                        <div class="mt-2">代理转出累计：{{ parseFloat(coinAgency.total_out) }}</div>
                        <div class="mt-2">代理持有金币：{{ parseFloat(coinAgency.current) }}</div>
                        <div class="mt-2">发放子代金币：{{ parseFloat(coinAgency.agency) }}</div>
                        <div class="mt-2">发放游戏金币：{{ parseFloat(coinAgency.game) }}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="grid-content" v-loading="loading.gamePlayer">
                    <div class="text-danger-custom flex-center" v-if="error.gamePlayer">
                        <i class="el-icon-error"></i>
                        加载失败，点击
                        <a href="javascript:;" @click="getGamePlayer">刷新</a>
                    </div>
                    <div v-else>
                        <h4>游戏玩家</h4>
                        <div class="mt-2">游戏玩家总计：{{ parseFloat(gamePlayer.player_total) }}</div>
                        <div class="mt-2">当月新增玩家：{{ parseFloat(gamePlayer.player_month_current) }}</div>
                        <div class="mt-2">上月新增玩家：{{ parseFloat(gamePlayer.player_month_last) }}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-card class="chart-line-card" v-loading="loading.chartLine">
            <div class="text-danger-custom flex-center" v-if="error.chartLine">
                <i class="el-icon-error"></i>
                加载失败，点击
                <a href="javascript:;" @click="getChartLine">刷新</a>
            </div>
            <div v-else class="chart-content chart-line" id="chart-line"></div>
        </el-card>
    </div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        data() {
            return {
                loading: {
                    coinStats: false,
                    coinAgency: false,
                    gamePlayer: false,
                    chartLine: false
                },
                error: {
                    coinStats: false,
                    coinAgency: false,
                    gamePlayer: false,
                    chartLine: false
                },
                coinStats: {},
                coinAgency: {},
                gamePlayer: {},
                chartLine: [],
            }
        },
        computed: {
            lineOption: function () {
                let option = {
                    title: {
                        show: false
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show: false
                    },
                    grid: {
                        show: true,
                        top: 50,
                        right: 80,
                        bottom: 100,
                        left: 80,
                        borderWidth: 0
                    },
                    xAxis: {
                        type: 'category',
                        name: '时间（天）',
                        data: []
                    },
                    yAxis: {
                        type: 'value',
                        name: '金币收益'
                    },
                    dataZoom: [{
                        type: 'inside'
                    }, {
                        type: 'slider'
                    }],
                    series: [{
                        name: '平台抽水',
                        type: 'line',
                        hoverAnimation: false,
                        smooth: true,
                        smoothMonotone: 'x',
                        data: []
                    }, {
                        name: '机器人盈亏',
                        type: 'line',
                        hoverAnimation: false,
                        smooth: true,
                        smoothMonotone: 'x',
                        data: []
                    }, {
                        name: '总计',
                        type: 'line',
                        hoverAnimation: false,
                        smooth: true,
                        smoothMonotone: 'x',
                        data: []
                    }]
                };
                for (let i in this.chartLine) {
                    option.xAxis.data.push(this.$helper.makeTimestampToDatetime(this.chartLine[i].timed, 'YYYY.MM.DD'));
                    option.series[0].data.push(this.chartLine[i].total_income);
                    option.series[1].data.push(this.chartLine[i].total_robot_gain);
                    option.series[2].data.push(this.chartLine[i].total_amount);
                }
                return option;
            }
        },
        methods: {
            getCoinStats() {
                this.error.coinStats = false;
                this.loading.coinStats = true;
                axios.get('/stats/index/getCoinStats').then((response) => {
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
                axios.get('/stats/index/getCoinAgency').then((response) => {
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
                axios.get('/stats/index/getGamePlayer').then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.gamePlayer = response.data.resp_data;
                    } else {
                        this.error.gamePlayer = true;
                    }
                    this.loading.gamePlayer = false;
                })
            },
            getChartLine() {
                this.error.chartLine = false;
                this.loading.chartLine = true;
                axios.get('/stats/index/getChartLine').then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.chartLine = response.data.resp_data;
                        this.$nextTick(function () {
                            this.initChartLine();
                        })
                    } else {
                        this.error.chartLine = true;
                    }
                    this.loading.chartLine = false;
                })
            },
            initChartLine() {
                // 绘制图表
                let chartLine = echarts.init(document.getElementById('chart-line'));
                chartLine.setOption(this.lineOption);
                //改变窗口
                window.onresize = function () {
                    chartLine.resize();
                };
            }
        },
        mounted() {
            this.getCoinStats();
            this.getCoinAgency();
            this.getGamePlayer();
            this.getChartLine();
        }
    }
</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        min-height: 240px;
    }

    .chart-content {
        width: 100%;
    }

    .chart-content.chart-line {
        height: 540px;
    }
</style>
