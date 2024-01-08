<template>
    <div class="page-container">
        <div class="page-container-inner">
            <div class="app-option-container">
                <h4 class="container-title">{{ $t('title.agency.index') }}</h4>
                <div class="option-list">
                    <router-link tag="div" :to="{name: 'agency.contacts'}" class="option-list-item">
                        <div class="icon">
                            <font-awesome-icon fixed-width icon="sitemap"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.agency.contacts.titleSide') }}</div>
                    </router-link>
                    <router-link tag="div" :to="{name: 'agency.setting'}" class="option-list-item">
                        <div class="icon icon-red">
                            <font-awesome-icon fixed-width icon="cog"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.agency.setting') }}</div>
                    </router-link>
                </div>
            </div>
            <!--<div class="app-chart-container">
                <h4 class="container-title">统计分析</h4>
                <div class="chart-list">
                    <div class="chart-list-item">
                        <div class="chart">
                            <router-link tag="div" class="chart-link" :to="{name: 'agency.chart'}">
                                <div class="chart-hover">
                                    <h4 class="chart-title">代理统计走势图</h4>
                                    <div class="chart-subtitle">点击查看详情</div>
                                </div>
                                <div class="chart-hover-bg"></div>
                                <img class="chart-area" src="/img/game/app/chart-line.png">
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>-->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>