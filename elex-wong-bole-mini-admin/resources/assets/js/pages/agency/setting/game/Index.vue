<template>
    <div class="container-content pt-5">
        <div class="container-content-title">{{ $t('agency.setting.game') }}</div>
        <component-page-loading :status="dataListStatus" @reload="getDataList"></component-page-loading>
        <div class="game-list" v-if="dataListStatus == 'dle' && dataList.length">
            <div class="game-list-item" v-for="(item, index) in dataList" :key="index" v-if="shieldIds.indexOf(item.id) == -1">
                <div class="game-card">
                    <div class="game-card-body">
                        <div class="card-img">
                            <img class="img-fluid" :src="item.icon">
                            <div class="mask-layer flex-center" v-if="item.status == 2">
                                <i class="icon el-icon-warning"></i>
                                <span class="info">{{ $t('action.disabled') }}</span>
                            </div>
                        </div>
                        <div class="card-info text-truncate text-center" :title="$t('games.'+item.id)">{{ $t('games.'+item.id) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SettingGame",
        props: ['org', 'rootOrgId'],
        data() {
            return {
                dataListStatus: 'dle',
                shieldIds: [],
                dataList: []
            }
        },
        watch: {
            org: {
                deep: true,
                handler(n, o) {
                    this.initData();
                    this.getDataList();
                }
            }
        },
        methods: {
            initData() {
                this.shieldIds = [];
                this.dataList = [];
            },
            getDataList() {
                this.dataListStatus = 'loading';
                axios.get('/agency/game/getList', {
                    params: {
                        orgId: this.org.id
                    }
                }).then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.shieldIds = response.data.resp_data.shieldIds;
                        this.dataList = response.data.resp_data.gameList;
                        this.dataListStatus = !this.dataList.length ? 'nodata' : 'dle';
                    } else {
                        this.dataListStatus = 'error';
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .game-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: -10px;
    }

    .game-list-item {
        padding: 10px;
        width: 200px;
        position: relative;
    }

    .game-card {
        overflow: hidden;
        border-radius: 7px;
        background-color: #fff;
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, .1);
    }
/*
    .game-card:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }
*/
    .game-card-body {
        padding: 15px;
    }

    .game-card-body .card-img {
        position: relative;
        overflow: hidden;
        width: 100%;
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

    .game-card-body .card-info {
        padding-top: 10px;
    }
</style>