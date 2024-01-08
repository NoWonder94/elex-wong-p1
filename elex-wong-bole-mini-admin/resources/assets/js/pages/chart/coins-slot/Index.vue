<template>
    <div class="page-layout">
        <div class="page-layout-header">
            <div class="header-main">
                <div class="back">
                    <a class="btn btn-light btn-sm" href="javascript:history.go(-1);">
                        <font-awesome-icon icon="chevron-left"></font-awesome-icon>
                        {{ $t('back') }}
                    </a>
                </div>
                <div class="title">{{ $t($route.meta.title) }}</div>
                <div class="option"></div>
            </div>
        </div>
        <div class="page-layout-body">
            <div class="body-main">
                <!-- vbar滚动条 -->
                <div class="vuebar-element" v-bar>
                    <div> <!-- vbar container -->
                        <div class="page-container-inner">
                            <div class="page-chart-time">
                                <el-radio-group v-model="activeTime" size="small">
                                    <el-radio-button label="day">{{ $t('chart.totalDay') }}</el-radio-button>
                                    <el-radio-button label="month">{{ $t('chart.totalMonth') }}</el-radio-button>
                                </el-radio-group>
                            </div>
                            <el-tabs type="card" v-model="activeName">
                                <el-tab-pane :label="$t('chart.use')" name="coin">
                                    <div v-show="activeTime=='day'">
                                        <chart-coin :activeTime="activeTime" :activeName="activeName"></chart-coin>
                                    </div>
                                    <div v-show="activeTime=='month'">
                                        <chart-coin-month :activeTime="activeTime" :activeName="activeName"></chart-coin-month>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane :label="$t('chart.agent')" name="agency">
                                    <div v-show="activeTime=='day'">
                                        <chart-agency :activeTime="activeTime" :activeName="activeName"></chart-agency>
                                    </div>
                                    <div v-show="activeTime=='month'">
                                        <chart-agency-month :activeTime="activeTime" :activeName="activeName"></chart-agency-month>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane :label="$t('chart.games')" name="game">
                                    <div v-show="activeTime=='day'">
                                        <chart-game :activeTime="activeTime" :activeName="activeName"></chart-game>
                                    </div>
                                    <div v-show="activeTime=='month'">
                                        <chart-game-month :activeTime="activeTime" :activeName="activeName"></chart-game-month>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ChartCoin from './coin/Index.vue'
    import ChartAgency from './agency/Index.vue'
    import ChartGame from './game/Index.vue'
    import ChartCoinMonth from './coin/Month.vue'
    import ChartAgencyMonth from './agency/Month.vue'
    import ChartGameMonth from './game/Month.vue'

    export default {
        components: {
            ChartCoin,
            ChartAgency,
            ChartGame,
            ChartCoinMonth,
            ChartAgencyMonth,
            ChartGameMonth
        },
        data() {
            return {
                activeTime: 'day',
                activeName: 'name'
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.activeName = 'coin';
            })
        }
    }
</script>


<style scoped>
    .page-container-inner {
        position: relative;
        border-radius: 0;
    }

    .page-chart-time {
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 11;
    }
</style>