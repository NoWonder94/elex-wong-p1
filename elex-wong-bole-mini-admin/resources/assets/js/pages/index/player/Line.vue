<template>
    <div class="chart-line-card" v-loading="loading">
        <div class="text-danger-custom flex-center" v-if="loadingError">
            <i class="el-icon-error"></i>
            {{ $t('messages.loading-failed') }} 
            <a href="javascript:;" @click="getDataList">{{ $t('refresh') }}</a>
        </div>
        <div v-else class="chart-content chart-line" id="chart-line-player"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name: "ChartPlayer",
        props: ['activeTime', 'activeName', 'windowSize'],
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
                        name: this.$t('index.line-player.new')
                    },
                    dataZoom: [{
                        type: 'inside'
                    }, {
                        type: 'slider'
                    }],
                    series: [{
                        name: this.$t('index.line-player.new'),
                        type: 'line',
                        hoverAnimation: false,
                        smooth: true,
                        smoothMonotone: 'x',
                        data: [],
                        areaStyle: {}
                    }]
                };
                for (let i in this.dataList) {
                    option.xAxis.data.unshift(this.$helper.makeTimestampToDatetime(this.dataList[i].timed, 'YYYY.MM.DD'));
                    option.series[0].data.unshift(this.dataList[i].newly);
                }
                return option;
            }
        },
        watch: {
            activeTime: function (n, o) {
                // 初始化数据
                if (this.activeTime == 'day' && this.activeName == 'player' && !this.dataList.length) {
                    this.getDataList();
                }
            },
            activeName: function (n, o) {
                // 初始化数据
                if (this.activeTime == 'day' && this.activeName == 'player' && !this.dataList.length) {
                    this.getDataList();
                }
            },
            windowSize: {
                deep: true,
                handler(n, o) {
                    // 修改图表大小
                    if (this.activeTime == 'day' && this.activeName == 'player' && this.dataList.length) {
                        this.chartLine.resize();
                    }
                }
            }
        },
        methods: {
            getDataList() {
                this.loadingError = false;
                this.loading = true;
                axios.get('/index/getPlayerLine').then((response) => {
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
                this.chartLine = echarts.init(document.getElementById('chart-line-player'));
                this.chartLine.setOption(this.lineOption);
            }
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