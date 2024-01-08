<template>
    <div class="record-container">
        <el-tabs type="card" v-model="activeName">
            <el-tab-pane :label="$t('game.log.classify.play')" name="log-play">
                <log-play :activeName="activeName" :queryParam="queryParam"></log-play>
            </el-tab-pane>
            <el-tab-pane :label="$t('game.log.classify.multi')" name="log-multi">
                <log-multi :activeName="activeName" :queryParam="queryParam"></log-multi>
            </el-tab-pane>
            <el-tab-pane :label="$t('game.log.classify.slot')" name="log-slot">
                <log-slot :activeName="activeName" :queryParam="queryParam"></log-slot>
            </el-tab-pane>
        </el-tabs>
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
            LogSlot,
        },
        data() {
            return {
                activeName: 'name',
                queryParam: {
                    token: '',
                    gameCode: '',
                    playerAccount: '',
                },
            };
        },
        created: function () {
            this.queryParam.gameCode = this.$helper.getQueryString('game_code');
            this.queryParam.playerAccount = this.$helper.getQueryString('player_account');

            let language = this.$helper.getQueryString('lang');
            // 语言
            if (Boolean(language)) {
                if (language == 'en') {
                    this.$i18n.locale = 'en';
                } else {
                    this.$i18n.locale = 'zh-CN';
                }
                this.$cookie.set('lang', this.$i18n.locale, {expires: '1Y'});
            }
        },
        methods: {
            // 获取游戏列表
            getGameList() {
                axios.get('/common/getGameList').then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        let gameList = response.data.resp_data;
                        let type = 1;
                        // 游戏code转game_id
                        if (Boolean(this.queryParam.gameCode)) {
                            for (let i in gameList) {
                                if (gameList[i].code == this.queryParam.gameCode) {
                                    type = gameList[i].type;
                                    break;
                                }
                            }
                        }
                        // 选择标签页
                        this.selectTabName(type);
                    } else if (response.data.resp_msg.code == 401) {
                        this.$message({
                            type: 'error',
                            message: this.$t('error.401'),
                            showClose: true
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: this.$t('error.433002'),
                            showClose: true
                        });
                    }
                })
            },
            // 选择标签页
            selectTabName(type) {
                let tabName = '';
                switch (type) {
                    case 1:
                        tabName = 'log-play';
                        break;
                    case 2:
                        tabName = 'log-multi';
                        break;
                    case 3:
                        tabName = 'log-slot';
                        break;
                    default:
                        tabName = 'log-play';
                }
                // 初始化选中选项卡
                this.$nextTick(function () {
                    this.activeName = tabName;
                })
            }
        },
        mounted: function () {
            // 获取游戏列表
            this.getGameList();
        }
    }
</script>

