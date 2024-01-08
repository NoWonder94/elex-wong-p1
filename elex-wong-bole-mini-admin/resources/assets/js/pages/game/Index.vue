<template>
    <div class="page-container">
        <div class="page-container-inner">
            <div class="app-option-container">
                <h4 class="container-title">{{ $t('title.game.index') }}</h4>
                <div class="option-list">
                    <router-link tag="div" :to="{name: 'game.user'}" class="option-list-item">
                        <div class="icon icon-red">
                            <font-awesome-icon fixed-width icon="user"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.game.user') }}</div>
                    </router-link>
                    <router-link tag="div" :to="{name: 'game.log'}" class="option-list-item">
                        <div class="icon icon-blue">
                            <font-awesome-icon fixed-width icon="list"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.game.log') }}</div>
                    </router-link>
                    <router-link tag="div" :to="{name: 'game.login-log'}" class="option-list-item">
                        <div class="icon icon-green">
                            <font-awesome-icon fixed-width icon="clipboard"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.game.login-log') }}</div>
                    </router-link>
                    <router-link tag="div" :to="{name: 'game.player-bet'}" class="option-list-item">
                        <div class="icon">
                            <font-awesome-icon fixed-width icon="coins"></font-awesome-icon>
                        </div>
                        <div class="name">{{ $t('title.game.player-bet') }}</div>
                    </router-link>
                </div>
            </div>
            <div v-loading="loading">
                <div class="app-option-container mb-5" v-if="playList.length > 0">
                    <h4 class="container-title">{{ $t('title.game.list-play') }}</h4>
                    <div class="game-list">
                        <router-link tag="div" class="game-list-item" :to="{name: item.route}"
                                     v-for="(item, index) in playList" v-bind:key="index">
                            <div class="game-card">
                                <div class="game-card-body">
                                    <div class="card-img">
                                        <img class="img-fluid" :src="item.icon">
                                        <div class="mask-layer flex-center" v-if="item.status == 2">
                                            <i class="icon el-icon-warning"></i>
                                            <span class="info">{{ $t('game.index.disabled') }}</span>
                                        </div>
                                    </div>
                                    <div class="pt-3 text-truncate text-center" :title="$t('games.'+item.id)">{{ $t('games.'+item.id) }}</div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="app-option-container mb-5" v-if="multiList.length > 0">
                    <h4 class="container-title">{{ $t('title.game.list-multi') }}</h4>
                    <div class="game-list">
                        <router-link tag="div" class="game-list-item" :to="{name: item.route}"
                                     v-for="(item, index) in multiList" v-bind:key="index">
                            <div class="game-card">
                                <div class="game-card-body">
                                    <div class="card-img">
                                        <img class="img-fluid" :src="item.icon">
                                        <div class="mask-layer flex-center" v-if="item.status == 2">
                                            <i class="icon el-icon-warning"></i>
                                            <span class="info">{{ $t('game.index.disabled') }}</span>
                                        </div>
                                    </div>
                                    <div class="pt-3 text-truncate text-center" :title="$t('games.'+item.id)">{{ $t('games.'+item.id) }}</div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="app-option-container mb-5" v-if="slotList.length > 0">
                    <h4 class="container-title">{{ $t('title.game.list-slot') }}</h4>
                    <div class="game-list">
                        <router-link tag="div" class="game-list-item" :to="{name: item.route}"
                                     v-for="(item, index) in slotList" v-bind:key="index">
                            <div class="game-card">
                                <div class="game-card-body">
                                    <div class="card-img">
                                        <img class="img-fluid" :src="item.icon">
                                        <div class="mask-layer flex-center" v-if="item.status == 2">
                                            <i class="icon el-icon-warning"></i>
                                            <span class="info">{{ $t('game.index.disabled') }}</span>
                                        </div>
                                    </div>
                                    <div class="pt-3 text-truncate text-center" :title="$t('games.'+item.id)">{{ $t('games.'+item.id) }}</div>
                                </div>
                            </div>
                        </router-link>
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
                loading: true,
                shieldIds: [],
                dataList: []
            }
        },
        computed: {
            playList: function () {
                let data = [];
                for (let v of this.dataList) {
                    if (v.type == 1 && this.shieldIds.indexOf(v.id) == -1) {
                        data.push(v);
                    }
                }
                return data;
            },
            multiList: function () {
                let data = [];
                for (let v of this.dataList) {
                    if (v.type == 2 && this.shieldIds.indexOf(v.id) == -1) {
                        data.push(v);
                    }
                }
                return data;
            },
            slotList: function () {
                let data = [];
                for (let v of this.dataList) {
                    if (v.type == 3 && this.shieldIds.indexOf(v.id) == -1) {
                        data.push(v);
                    }
                }
                return data;
            },
        },
        methods: {
            getList() {
                axios.get('/game/getList').then((response) => {
                    this.shieldIds = response.data.resp_data.shieldIds;
                    this.dataList = response.data.resp_data.gameList;
                    this.loading = false;
                })
            },
        },
        mounted: function () {
            this.getList();
        }
    }
</script>

<style lang="scss" scoped>
    .game-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: -10px;
    }

    .game-list-item {
        padding: 10px;
        width: 240px;
        position: relative;
    }

    .game-card {
        overflow: hidden;
        border-radius: 7px;
        background-color: #fff;
        border: 1px solid $boder-color-fourth;
        transition: .3s;
        cursor: pointer;
    }

    .game-card:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }

    .game-card-body {
        padding: 20px;
        color: $font-color-first;
    }

    .game-card-body .card-img {
        position: relative;
        overflow: hidden;
    }

    .game-card-body .card-img .mask-layer {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .4);
        color: #fff;
    }

    .game-card-body .mask-layer .icon {
        font-size: 1.75rem;
    }

    .game-card-body .mask-layer .info {
        font-size: 1.25rem;
        margin-left: 10px;
    }
</style>