<template>
    <el-dialog class="dialog-bills" :title="$t('game.user.dialog.title')" width="960px" :visible.sync="dialogVisible" @close="$emit('update:visible', false)">
        <!-- vbar滚动条 -->
        <div class="vuebar-element" v-bar>
            <div> <!-- vbar container -->
                <div class="detail-container">
                    <div class="more-container">
                        <div class="more-container-title">{{ $t('game.user.dialog.info') }}</div>
                        <el-row>
                            <el-col :span="12">
                                <el-form label-width="100px">
                                    <el-form-item :label="$t('game.user.thLable.accountId')">
                                        <span>{{ dataDetail.account_id }}</span>
                                    </el-form-item>
                                    <el-form-item :label="$t('game.user.thLable.coinsHave')">
                                        <span>{{ dataDetail.gold | numeral('0,0.[0000]') }}</span>
                                    </el-form-item>
                                    <el-form-item :label="$t('game.user.thLable.gainGold')">
                                        <span>{{ dataDetail.income_gold > 0 ? '+' : '' }}{{ dataDetail.income_gold | numeral('0,0.[0000]') }}</span>
                                    </el-form-item>
                                    <el-form-item :label="$t('game.user.thLable.loginCount')">
                                        <span>{{ dataDetail.login_count }}</span>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="12">
                                <el-form label-width="100px">
                                    <el-form-item :label="$t('game.user.thLable.createIp')">
                                        <span>{{ dataDetail.create_ip }}</span>
                                    </el-form-item>
                                    <el-form-item :label="$t('game.user.thLable.createTime')">
                                        <span v-if="dataDetail.create_time">
                                            <component-page-timestamp :timestamp="dataDetail.create_time"></component-page-timestamp>
                                        </span>
                                        <span v-else>----</span>
                                    </el-form-item>
                                    <el-form-item :label="$t('game.user.thLable.loginIp')">
                                        <span>{{ dataDetail.login_ip }}</span>
                                    </el-form-item>
                                    <el-form-item :label="$t('game.user.thLable.loginTime')">
                                        <span v-if="dataDetail.login_time">
                                            <component-page-timestamp :timestamp="dataDetail.login_time"></component-page-timestamp>
                                        </span>
                                        <span v-else>----</span>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="more-container">
                        <div class="more-container-title">{{ $t('game.user.dialog.login-log') }}
                            <router-link :to="{name: 'game.login-log.account', params: { accountId: dataDetail.account_id }}" target="_blank">
                                <small>{{ $t('action.more') }}<i class="el-icon-d-arrow-right"></i></small>
                            </router-link>
                        </div>
                        <component-page-loading :status="playerLoginStatus" @reload="getLoginList"></component-page-loading>
                        <el-table style="width: 100%" :data="playerLogin" v-if="playerLoginStatus == 'dle' && playerLogin.length">
                            <el-table-column min-width="170" :label="$t('game.user.thLable.time')">
                                <template slot-scope="scope">
                                    <component-page-timestamp :timestamp="scope.row.create_time"></component-page-timestamp>
                                </template>
                            </el-table-column>
                            <el-table-column min-width="160" :label="$t('game.user.thLable.gameId')">
                                <template slot-scope="scope">{{ scope.row.game_id > 0 ? scope.row.game_name : $t('gameLobby') }}</template>
                            </el-table-column>
                            <el-table-column min-width="170" :label="$t('game.user.thLable.address')" show-overflow-tooltip>
                                <template slot-scope="scope">{{ scope.row.country }} {{ scope.row.province }} {{ scope.row.city }}</template>
                            </el-table-column>
                            <el-table-column min-width="120" :label="$t('game.user.thLable.ip')" prop="ip"></el-table-column>
                            <el-table-column min-width="100" :label="$t('game.user.thLable.devices')" prop="devices"></el-table-column>
                            <el-table-column min-width="100" :label="$t('game.user.thLable.browser')" prop="browser"></el-table-column>
                        </el-table>
                    </div>
                    <div class="more-container">
                        <div class="more-container-title">{{ $t('game.user.dialog.order-log') }}
                            <router-link :to="{name: 'order.game.account', params: { accountId: dataDetail.account_id }}" target="_blank">
                                <small>{{ $t('action.more') }}<i class="el-icon-d-arrow-right"></i></small>
                            </router-link>
                        </div>
                        <component-page-loading :status="playerOrderStatus" @reload="getOrderList"></component-page-loading>
                        <el-table style="width: 100%" :data="playerOrder" v-if="playerOrderStatus == 'dle' && playerOrder.length">
                            <el-table-column min-width="160" :label="$t('game.user.thLable.time')">
                                <template slot-scope="scope">
                                    <component-page-timestamp :timestamp="scope.row.created"></component-page-timestamp>
                                </template>
                            </el-table-column>
                            <el-table-column min-width="90" :label="$t('game.user.thLable.type')">
                                <template slot-scope="scope">
                                    <el-tag size="medium" v-if="scope.row.type==1">{{ $t('form.transferTypes[0].label') }}</el-tag>
                                    <el-tag size="medium" v-else-if="scope.row.type==2" type="warning">{{ $t('form.transferTypes[1].label') }}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column min-width="90" :label="$t('game.user.thLable.amount')">
                                <template slot-scope="scope">{{ scope.row.type==1 ? '+' : '-' }}{{ scope.row.amount | numeral('0,0.[0000]') }}</template>
                            </el-table-column>
                            <el-table-column min-width="90" :label="$t('game.user.thLable.status')">
                                <template slot-scope="scope">
                                    <el-tag size="medium" v-if="scope.row.status==1">{{ $t('form.gameOrderStatusList[0].label') }}</el-tag>
                                    <el-tag size="medium" v-else-if="scope.row.status==2" type="success">{{ $t('form.gameOrderStatusList[1].label') }}</el-tag>
                                    <el-tag size="medium" v-else-if="scope.row.status==3 && !Boolean(scope.row.error_cause)" type="danger">{{ $t('form.gameOrderStatusList[2].label') }}</el-tag>
                                    <el-tooltip placement="top" :content="scope.row.error_cause" v-else-if="scope.row.status==3 && Boolean(scope.row.error_cause)">
                                        <el-tag size="medium" type="danger">{{ $t('form.gameOrderStatusList[2].label') }}</el-tag>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column min-width="160" :label="$t('game.user.thLable.sn')" prop="sn"></el-table-column>
                        </el-table>
                    </div>
                    <div class="more-container">
                        <div class="more-container-title">{{ $t('game.user.dialog.game-log') }}
                            <router-link :to="{name: 'game.log.account', params: { accountId: dataDetail.account_id }}" target="_blank">
                                <small>{{ $t('action.more') }}<i class="el-icon-d-arrow-right"></i></small>
                            </router-link>
                        </div>
                        <component-page-loading :status="playerGameStatus" @reload="getGameList"></component-page-loading>
                        <el-table style="width: 100%" :data="playerGame" v-if="playerGameStatus == 'dle' && playerGame.length">
                            <el-table-column min-width="170" :label="$t('game.user.thLable.time')">
                                <template slot-scope="scope">
                                    <component-page-timestamp :timestamp="scope.row.create_time"></component-page-timestamp>
                                </template>
                            </el-table-column>
                            <el-table-column min-width="160" :label="$t('game.user.thLable.gameId')">
                                <template slot-scope="scope">
                                    {{ $t('games.'+scope.row.game_id) }}
                                </template>
                            </el-table-column>
                            <el-table-column min-width="100" :label="$t('game.user.thLable.roomId')" prop="room_id"></el-table-column>
                            <el-table-column min-width="100" :label="$t('game.user.thLable.sceneId')">
                                <template slot-scope="scope">
                                    <component-page-game-scenes :game-id="scope.row.game_id" :scenes-id="scope.row.scene_id"></component-page-game-scenes>
                                </template>
                            </el-table-column>
                            <el-table-column min-width="70" :label="$t('game.user.thLable.betBase')" prop="bet_base"></el-table-column>
                            <el-table-column min-width="100" :label="$t('game.user.thLable.gainGold')">
                                <template slot-scope="scope">{{ scope.row.gain_gold > 0 ? '+' : '' }}{{ scope.row.gain_gold | numeral('0,0.[0000]') }}</template>
                            </el-table-column>
                            <el-table-column min-width="100" :label="$t('game.user.thLable.platformCommission')">
                                <template slot-scope="scope">{{ scope.row.income_gold > 0 ? '+' : '' }}{{ scope.row.income_gold | numeral('0,0.[0000]') }}
                                </template>
                            </el-table-column>
                            <el-table-column min-width="100" :label="$t('game.user.thLable.ownGold')">
                                <template slot-scope="scope">{{ scope.row.own_gold | numeral('0,0.[0000]') }}</template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "ItemDetail",
        props: ['visible', 'data'],
        data() {
            return {
                dialogVisible: false,
                dataDetail: {},
                playerLoginStatus: 'dle',
                playerLogin: [],
                playerLoginList: [],
                playerOrderStatus: 'dle',
                playerOrder: [],
                playerOrderList: [],
                playerGameStatus: 'dle',
                playerGame: [],
                playerGameList: [],
            }
        },
        watch: {
            visible: function (n, o) {
                // 初始化参数
                n && this.initData(this.data);
                // 变量赋值
                this.dialogVisible = n;
            }
        },
        methods: {
            initData(data) {
                this.dataDetail = _.cloneDeep(data);
                // 缓存key
                let key = data.id;
                // 登录记录
                if (this.playerLoginList[key]) {
                    this.playerLogin = this.playerLoginList[key];
                    this.playerLoginStatus = !this.playerLogin.length ? 'nodata' : 'dle';
                } else {
                    this.getLoginList(key, data);
                }
                // 玩家订单
                if (this.playerOrderList[key]) {
                    this.playerOrder = this.playerOrderList[key];
                    this.playerOrderStatus = !this.playerOrder.length ? 'nodata' : 'dle';
                } else {
                    this.getOrderList(key, data);
                }
                // 游戏记录
                if (this.playerGameList[key]) {
                    this.playerGame = this.playerGameList[key];
                    this.playerGameStatus = !this.playerGame.length ? 'nodata' : 'dle';
                } else {
                    this.getGameList(key, data);
                }
            },
            // 获取登录记录
            getLoginList(key, data) {
                this.playerLoginStatus = 'loading';
                axios.get('/app/login-log/getList', {
                    params: {
                        keyword: data.account_id,
                        page: 1,
                        page_size: 10,
                        order: 2
                    }
                }).then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.playerLoginList[key] = response.data.resp_data.data;
                        this.playerLogin = response.data.resp_data.data;
                        this.playerLoginStatus = !this.playerLogin.length ? 'nodata' : 'dle';
                    } else {
                        this.playerLoginStatus = 'error';
                    }
                })
            },
            // 获取玩家订单
            getOrderList(key, data) {
                this.playerOrderStatus = 'loading';
                axios.get('/order/game/getList', {
                    params: {
                        keyword: data.account_id,
                        page: 1,
                        page_size: 10,
                        order: 2
                    }
                }).then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.playerOrderList[key] = response.data.resp_data.data;
                        this.playerOrder = response.data.resp_data.data;
                        this.playerOrderStatus = !this.playerOrder.length ? 'nodata' : 'dle';
                    } else {
                        this.playerOrderStatus = 'error';
                    }
                })
            },
            // 获取游戏记录
            getGameList(key, data) {
                this.playerGameStatus = 'loading';
                axios.get('/app/log/getList', {
                    params: {
                        keyword: data.account_id,
                        keyword_type: 1,
                        page: 1,
                        page_size: 10,
                        order: 2
                    }
                }).then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.playerGameList[key] = response.data.resp_data.data;
                        this.playerGame = response.data.resp_data.data;
                        this.playerGameStatus = !this.playerGame.length ? 'nodata' : 'dle';
                    } else {
                        this.playerGameStatus = 'error';
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog__body {
        padding: 0;
        overflow: auto;
        height: 700px;
    }

    .detail-container {
        padding: 15px 20px 30px;
    }

    .detail-container /deep/ label {
        color: $font-color-third;
    }

    .detail-container /deep/ .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
    }

    .more-container + .more-container {
        margin-top: 40px;
    }

    .more-container-title {
        margin-bottom: 20px;
        border-bottom: 1px solid $boder-color-third;
        padding-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $font-color-first;
        font-size: $font-size-second;
    }

</style>
