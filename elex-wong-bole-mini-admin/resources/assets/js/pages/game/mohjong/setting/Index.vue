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
                                <el-tab-pane label="平民场" name="first">
                                    <setting-first :activeName="activeName"></setting-first>
                                </el-tab-pane>
                                <el-tab-pane label="小资场" name="second">
                                    <setting-second :activeName="activeName"></setting-second>
                                </el-tab-pane>
                                <el-tab-pane label="白领场" name="third">
                                    <setting-third :activeName="activeName"></setting-third>
                                </el-tab-pane>
                                <el-tab-pane label="富豪场" name="fourth">
                                    <setting-fourth :activeName="activeName"></setting-fourth>
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
    import SettingFirst from './First.vue'
    import SettingSecond from './Second.vue'
    import SettingThird from './Third.vue'
    import SettingFourth from './Fourth.vue'

    export default {
        components: {
            SettingFirst,
            SettingSecond,
            SettingThird,
            SettingFourth
        },
        data() {
            return {
                activeName: 'name'
            };
        },
        mounted() {
            // 初始化选中选项卡
            this.activeName = 'first';
        }
    }
</script>

<style lang="scss" scoped>
    .game-container {
        padding: 20px;
    }

    /deep/ .setting-card {
        position: relative;
        max-width: 700px;
    }

    /deep/ .setting-card__header {
        padding: 10px 0;
        border-bottom: 1px solid $boder-color-third;
        font-size: $font-size-second;
        color: $font-color-first;
    }

    /deep/ .setting-card__body {
        padding-top: 20px;
    }

    /deep/ .input-item {
        width: 240px;
    }
</style>
