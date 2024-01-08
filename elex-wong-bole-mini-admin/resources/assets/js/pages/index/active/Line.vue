<template>
    <div class="chart-line-card" v-loading="loading">
        <div class="text-danger-custom flex-center" v-if="loadingError">
            <i class="el-icon-error"></i>
            {{ $t('messages.loading-failed') }} 
            <a href="javascript:;" @click="getDataList">{{ $t('refresh') }}</a>
        </div>
        <div v-else class="chart-content chart-line" id="chart-line-active"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name: "ChartEarn",
        props: ['windowSize'],
        data() {
            return {
                loading: false,
                loadingError: false,
                dataList: [],
                chartLine: {}
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
                    legend: {
                        data: []
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
                        name: this.$t('index.line-active.day'),
                        data: []
                    },
                    yAxis: {
                        type: 'value',
                        name: this.$t('index.line-active.number')
                    },
                    dataZoom: [{
                        type: 'inside'
                    }, {
                        type: 'slider'
                    }],
                    series: []
                };
                let seriesInit = {
                    name: this.$t('index.line-active.gameName'),
                    type: 'line',
                    hoverAnimation: false,
                    smooth: true,
                    smoothMonotone: 'x',
                    data: [],
                };
                let seriesList = [];
                for (let gameId in this.dataList) {
                    seriesList[gameId] = _.cloneDeep(seriesInit);
                    //seriesList[gameId].name = this.dataList[gameId].name;
                    // 游戏名称
                    //option.legend.data.push(this.dataList[gameId].name);
                    if (gameId != 0) {
                        seriesList[gameId].name = this.$t('games.'+gameId);
                        // 游戏名称
                        option.legend.data.push(this.$t('games.'+gameId));
                    } else {
                        seriesList[gameId].name = this.$t('form.summaryText');
                        // 游戏名称
                        option.legend.data.push(this.$t('form.summaryText'));
                    }
                }
                for (let i in this.dataList[0].data) {
                    for (let gameId in seriesList) {
                        let amount = 0;
                        for (let j in this.dataList[gameId].data) {
                            if (this.dataList[gameId].data[j].timed == this.dataList[0].data[i].timed) {
                                amount = this.dataList[gameId].data[j].amount;
                                break;
                            }
                        }
                        seriesList[gameId].data.unshift(amount);
                    }
                    option.xAxis.data.unshift(this.$helper.makeTimestampToDatetime(this.dataList[0].data[i].timed, 'YYYY.MM.DD'));
                }
                // 数据完成
                for (let gameId in seriesList) {
                    option.series.push(seriesList[gameId]);
                }
                return option;
            }
        },
        watch: {
            windowSize: {
                deep: true,
                handler(n, o) {
                    // 修改图表大小
                    this.chartLine.resize();
                }
            }
        },
        methods: {
            getDataList() {
                this.loadingError = false;
                this.loading = true;
                axios.get('/index/getActiveLine').then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.dataList = response.data.resp_data;
                        this.$nextTick(function () {
                            this.initChartLine();
                            this.loading = false;
                        })
                    } else {
                        this.loadingError = true;
                        this.loading = false;
                    }
                })
            },
            initChartLine() {
                // 绘制图表
                this.chartLine = echarts.init(document.getElementById('chart-line-active'));
                this.chartLine.setOption(this.lineOption);
            }
        },
        mounted: function () {
            this.getDataList();
        }
    }
</script>


<style scoped>
    .chart-line-card {
        padding: 20px 0 40px;
    }

    .chart-content {
        width: 100%;
    }

    .chart-content.chart-line {
        height: 540px;
    }
</style>