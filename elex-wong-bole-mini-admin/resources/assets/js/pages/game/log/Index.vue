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
                                <el-tab-pane :label="$t('game.log.classify.play')" name="log-play">
                                    <log-play :activeName="activeName"></log-play>
                                </el-tab-pane>
                                <el-tab-pane :label="$t('game.log.classify.multi')" name="log-multi">
                                    <log-multi :activeName="activeName"></log-multi>
                                </el-tab-pane>
                                <el-tab-pane :label="$t('game.log.classify.slot')" name="log-slot">
                                    <log-slot :activeName="activeName"></log-slot>
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
    import LogPlay from './play/Index.vue'
    import LogMulti from './multi/Index.vue'
    import LogSlot from './slot/Index.vue'

    export default {
        components: {
            LogPlay,
            LogMulti,
            LogSlot
        },
        data() {
            return {
                activeName: 'name'
            };
        },
        mounted() {
            // 初始化选中选项卡
            this.$nextTick(function () {
                this.activeName = 'log-play';
            })
        }
    }
</script>

<style scoped>
    .game-container {
        padding: 20px;
    }
</style>
