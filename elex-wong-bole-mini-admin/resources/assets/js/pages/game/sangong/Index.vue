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
                            <div class="app-option-container">
                                <h4 class="container-title">{{ $t('game.niuniu.index.gameStatus') }}</h4>
                                <div v-loading="loading.gameStatus">
                                    <div class="text-danger-custom flex-center" v-if="error.gameStatus">
                                        <i class="el-icon-error"></i>
                                        {{ $t('messages.loading-failed') }} 
                                        <a href="javascript:;" @click="getGameStatus">{{ $t('refresh') }}</a>
                                    </div>
                                    <el-row :gutter="20" v-else>
                                        <el-col :lg="12">
                                            <el-card shadow="never" class="grid-content">
                                                <div slot="header" class="grid-content-title">{{ $t('game.niuniu.index.onlineTotalPlayer') }}</div>
                                                <span class="grid-content-item">{{ $t('form.sangongScenes[0].label') }}：{{ gameStatus.amount_playing[1001] | numeral('0,0.[0000]') }}</span>
                                                <span class="grid-content-item">{{ $t('form.sangongScenes[1].label') }}：{{ gameStatus.amount_playing[1002] | numeral('0,0.[0000]') }}</span>
                                                <span class="grid-content-item">{{ $t('form.sangongScenes[2].label') }}：{{ gameStatus.amount_playing[1003] | numeral('0,0.[0000]') }}</span>
                                                <span class="grid-content-item">{{ $t('form.sangongScenes[3].label') }}：{{ gameStatus.amount_playing[1004] | numeral('0,0.[0000]') }}</span>
                                                <span class="grid-content-item">{{ $t('form.sangongScenes[4].label') }}：{{ gameStatus.amount_playing[1005] | numeral('0,0.[0000]') }}</span>
                                            </el-card>
                                        </el-col>
                                        <el-col :lg="12">
                                            <el-card shadow="never" class="grid-content">
                                                <div slot="header" class="grid-content-title">{{ $t('game.niuniu.index.AIQuantity') }}</div>
                                                <span class="grid-content-item">{{ $t('form.sangongScenes[0].label') }}：{{ gameStatus.amount_robot[1001] | numeral('0,0.[0000]') }}</span>
                                                <span class="grid-content-item">{{ $t('form.sangongScenes[1].label') }}：{{ gameStatus.amount_robot[1002] | numeral('0,0.[0000]') }}</span>
                                                <span class="grid-content-item">{{ $t('form.sangongScenes[2].label') }}：{{ gameStatus.amount_robot[1003] | numeral('0,0.[0000]') }}</span>
                                                <span class="grid-content-item">{{ $t('form.sangongScenes[3].label') }}：{{ gameStatus.amount_robot[1004] | numeral('0,0.[0000]') }}</span>
                                                <span class="grid-content-item">{{ $t('form.sangongScenes[4].label') }}：{{ gameStatus.amount_robot[1005] | numeral('0,0.[0000]') }}</span>
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                            <!--<div class="app-option-container">
                                <h4 class="container-title">游戏管理</h4>
                                <div class="option-list">
                                    <router-link tag="div" :to="{name: 'game.mohjong.setting'}" class="option-list-item">
                                        <div class="icon icon-red">
                                            <font-awesome-icon fixed-width icon="cog"></font-awesome-icon>
                                        </div>
                                        <div class="name">游戏设置</div>
                                    </router-link>
                                    &lt;!&ndash;<router-link tag="div" :to="{name: 'game.mohjong.log'}" class="option-list-item">
                                        <div class="icon icon-blue">
                                            <font-awesome-icon fixed-width icon="list"></font-awesome-icon>
                                        </div>
                                        <div class="name">游戏记录</div>
                                    </router-link>&ndash;&gt;
                                </div>
                            </div>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: {
                    gameStatus: false,
                },
                error: {
                    gameStatus: false,
                },
                gameStatus: {
                    amount_playing: [],
                    amount_robot: []
                },
            }
        },
        methods: {
            getGameStatus() {
                this.error.gameStatus = false;
                this.loading.gameStatus = true;
                axios.get('/app/game/sangong/index/getGameStatus').then((response) => {
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
            this.getGameStatus();
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
    .game-container {
        padding: 20px;
    }

    .el-row, .el-col {
        margin-bottom: 20px;
    }

    .grid-content {
        font-size: $font-size-third;
        color: $font-color-second;
    }

    .grid-content-title {
        font-size: $font-size-second;
    }

    .grid-content-item {
        min-width: 150px;
        display: inline-block;
    }
</style>
