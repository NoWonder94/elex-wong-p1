<template>
    <el-dialog class="dialog-detail-rbwar" :title="$t('game.log.detailSlot.title')" width="560px" :visible.sync="dialogVisible" @close="$emit('update:visible', false)">
        <div style="min-height: 300px" v-loading="recordLoading">
            <iframe class="iframe-container" ref="iframeResults"
                    :src="'/ges/slot/index.html?base64String='+base64String"
                    v-if="Boolean(base64String)">
            </iframe>
            <el-row :gutter="20" class="mt-3">
                <el-col :span="12">
                    {{ $t('game.log.detailSlot.freeGame') }}：{{data.spin_type==1? $t('game.log.detailSlot.yes') : $t('game.log.detailSlot.no')}}
                </el-col>
                <el-col :span="12">
                    {{ $t('game.log.detailSlot.freeGameTrigger') }}：{{data.sactter==1? $t('game.log.detailSlot.yes') : $t('game.log.detailSlot.no')}}
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mt-3" v-if="recordData.uid">
                <el-col :span="12">
                    {{ $t('game.log.detailSlot.freeMulti') }}：{{recordData.spinRes.freeMul}}
                </el-col>
                <el-col :span="12">
                    {{ $t('game.log.detailSlot.freeGameTimes') }}：{{ data.free_game_times }}
                </el-col>
            </el-row>
            <div class="list-space mt-3"></div>
            <el-row :gutter="20" class="mt-3" v-if="recordData.uid">
                <el-col :span="12">{{ $t('game.log.detailSlot.betNumTotal') }}：{{ data.bet_num | numeral('0,0.[0000]') }}</el-col>
                <el-col :span="12">{{ $t('game.log.detailSlot.totalWin') }}：{{ recordData.spinRes.winGold | numeral('0,0.[0000]') }}</el-col>
            </el-row>
            <el-row :gutter="20" class="mt-3">
                <el-col :span="12">{{ $t('game.log.detailSlot.gainGold') }}：{{ data.gain_gold > 0 ? '+' : '' }}{{ data.gain_gold | numeral('0,0.[0000]') }}</el-col>
                <el-col :span="12">{{ $t('game.log.detailSlot.platformGold') }}：{{ data.income_gold > 0 ? '+' : '' }}{{ data.income_gold | numeral('0,0.[0000]') }}</el-col>
            </el-row>
            <el-row :gutter="20" class="mt-3">
                <el-col :span="12" v-if="data.ext">
                    {{ $t('game.log.detailSlot.initGold') }}：
                    <span v-if="typeof(data.ext.init_gold) == 'undefined'">----</span>
                    <span v-else>{{ data.ext.init_gold | numeral('0,0.[0000]') }}</span>
                </el-col>
                <el-col :span="12">{{ $t('game.log.detailSlot.ownGold') }}：{{ data.own_gold | numeral('0,0.[0000]') }}</el-col>
            </el-row>
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
                recordLoading: false,
                recordData: {},
                recordDataLIst: [],
                base64String: '',
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
            t(...params) {
                return this.$t.apply(this, params)
            },
            initData(data) {
                // 读取缓存数据
                let key = data.report_id;
                if (this.recordDataLIst[key]) {
                    this.recordData = this.recordDataLIst[key];
                    this.initIframeLink(this.recordData);
                    return
                }
                // 获取游戏详情
                this.getRecordDetails(key, data);
            },
            getRecordDetails(key, data) {
                this.recordLoading = true;
                axios.get('/app/log/slot/getRecordDetails', {
                    params: {
                        report_id: data.report_id,
                    }
                }).then((response) => {
                    this.recordLoading = false;
                    if (response.data.resp_msg.code == 200) {
                        this.recordDataLIst[key] = response.data.resp_data;
                        this.recordData = response.data.resp_data;
                        this.initIframeLink(this.recordData);
                    } else {
                        this.$message({
                            type: 'error',
                            message: response.data.resp_msg.message,
                            showClose: true
                        });
                    }
                })
            },
            initIframeLink(recordData) {
                this.$nextTick(function () {
                    // Base64处理数据
                    this.base64String = Base64.encode(JSON.stringify({
                        sceneId: this.data.scene_id,
                        data: recordData
                    }));
                });
            }
        }
    }
</script>

<style scoped>
    .dialog-detail-rbwar >>> .el-dialog__body {
        /*padding: 0;*/
        /*height: 470px;*/
    }

    .iframe-container {
        border: 0 none;
        width: 100%;
        height: 293px;
    }
</style>