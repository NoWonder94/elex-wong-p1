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
                        <div class="game-container">
                            <el-tabs type="card" v-model="activeName">
                                <el-tab-pane :label="$t('game.player-bet.betHour')" name="bet-hour">
                                    <bet-hour :activeName="activeName"></bet-hour>
                                </el-tab-pane>
                                <el-tab-pane :label="$t('game.player-bet.betDay')" name="bet-day">
                                    <bet-day :activeName="activeName"></bet-day>
                                </el-tab-pane>
                                <el-tab-pane :label="$t('game.player-bet.betMonth')" name="bet-month">
                                    <bet-month :activeName="activeName"></bet-month>
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
    import BetHour from './bet-hour/Index.vue'
    import BetDay from './bet-day/Index.vue'
    import BetMonth from './bet-month/Index.vue'

    export default {
        components: {
            BetHour,
            BetDay,
            BetMonth,
        },
        data() {
            return {
                activeName: 'name'
            };
        },
        mounted() {
            // 初始化选中选项卡
            this.$nextTick(function () {
                this.activeName = 'bet-hour';
            })
        }
    }
</script>

<style scoped>
    .game-container {
        padding: 20px;
    }
</style>
