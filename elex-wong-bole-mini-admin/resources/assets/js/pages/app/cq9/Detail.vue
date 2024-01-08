<template>
    <div class="container">
        <div class="record-container" v-loading="loading">
            <h3 class="page-title">{{ $t('game.cq9.detail.title.page') }}</h3>
            <div class="page-content" v-if="data.item">
                <div class="content-title">{{ $t('game.cq9.detail.title.gameName') }}{{ $t('games.'+data.item.game_id) }}</div>
                <div class="user-info">
                    <el-row :gutter="20">
                        <el-col :span="6">{{ $t('game.cq9.detail.userInfo.roundid') }}{{ data.cq9.data.roundid }}</el-col>
                        <el-col :span="6">{{ $t('game.cq9.detail.userInfo.gainGold') }}{{ data.item.gain_gold | numeral('0,0.[0000]') }}</el-col>
                        <el-col :span="6">{{ $t('game.cq9.detail.userInfo.account') }}{{ data.cq9.data.account }}</el-col>
                        <el-col :span="6">{{ $t('game.cq9.detail.userInfo.paccount') }}{{ data.cq9.data.paccount }}</el-col>
                    </el-row>
                </div>
            </div>
            <div class="page-content">
                <div class="content-title">{{ $t('game.cq9.detail.title.gameBills') }}</div>
                <item-bills :data="data.item" v-if="data.item"></item-bills>
            </div>
            <div class="page-content">
                <div class="content-title">{{ $t('game.cq9.detail.title.gameImg') }}</div>
                <div class="results-container" v-if="!Boolean(base64String) && resultsStatus.loading!='dle'">
                    <component-page-loading
                            :status="resultsStatus.loading"
                            :errorMsg="resultsStatus.message">
                    </component-page-loading>
                </div>
                <iframe class="iframe-container" ref="iframeResults"
                        :style="iframeStyleObject"
                        :src="'/cq9/index.html?base64String='+base64String"
                        v-if="Boolean(base64String)">
                </iframe>
            </div>
            <div class="page-content">
                <div class="content-title">{{ $t('game.cq9.detail.title.gamePlayback') }}</div>
                <item-playback-mahjong
                        :data="data.item"
                        @error="playbackError"
                        @finish="initIframeLink"
                        v-if="data.item">
                </item-playback-mahjong>
            </div>
        </div>
    </div>
</template>

<script>
    import ItemBills from './ItemBills.vue'
    import ItemPlaybackMahjong from './ItemPlaybackMahjong.vue'

    export default {
        components: {
            ItemBills,
            ItemPlaybackMahjong,
        },
        data() {
            return {
                iframeStyleObject: {
                    height: 'auto'
                },
                loading: false,
                data: {},
                base64String: '',
                resultsStatus: {
                    loading: 'dle',
                    message: '',
                }
            }
        },
        // created: function () {
        //     let language = this.$helper.getQueryString('language');
        //     // 语言
        //     if (language == 'zh-cn') {
        //         this.$i18n.locale = 'zh-cn';
        //     } else {
        //         this.$i18n.locale = 'en';
        //     }
        //     this.$cookie.set('lang', this.$i18n.locale, {expires: '1Y'});
        // },
        methods: {
            getData() {
                this.loading = true;
                axios.get('/cq9/detail/getInfo').then((response) => {
                    this.loading = false;
                    if (response.data.resp_msg.code == 200) {
                        this.data = response.data.resp_data;
                        // 游戏图片加载
                        this.resultsStatus.loading = 'loading';
                    } else {
                        this.$message({
                            type: 'error',
                            message: response.data.resp_msg.message + '， ' + this.$t('error.433001'),
                            showClose: true
                        });
                    }
                })
            },
            playbackError(data) {
                this.resultsStatus = data;
            },
            initIframeLink(data) {
                this.base64String = Base64.encode(JSON.stringify(data));
                this.$nextTick(function () {
                    // 初始化 iframe 高度
                    this.iframeStyleObject.height = (720 / 1280) * this.$refs.iframeResults.offsetWidth + 'px';
                    // 浏览器窗口改变
                    window.onresize = () => {
                        // 改变 iframe 高度
                        this.iframeStyleObject.height = (720 / 1280) * this.$refs.iframeResults.offsetWidth + 'px';
                    };
                });
            }
        },
        mounted: function () {
            // 获取游戏详情
            this.getData();
        }
    }
</script>
