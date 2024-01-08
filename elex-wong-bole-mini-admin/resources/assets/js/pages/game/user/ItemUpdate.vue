<template>
    <el-dialog :title="$t('game.user.dialogUpdate.title')" width="440px" :visible.sync="dialogVisible" @close="$emit('update:visible', false)">
        <div class="pr-5">
            <el-form :model="dataCache" label-width="80px">
                <el-form-item :label="$t('game.user.dialogUpdate.accountId')">
                    {{ dataCache.account_id }}
                </el-form-item>
                <el-form-item :label="$t('game.user.dialogUpdate.role')" :error="Boolean(msg.errors['role']) ? msg.errors['role'][0] : ''">
                    <el-select v-model="dataCache.role">
                        <el-option v-for="item in playerRoleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('game.user.dialogUpdate.access')" :error="Boolean(msg.errors['access']) ? msg.errors['access'][0] : ''">
                    <el-select v-model="dataCache.access">
                        <el-option v-for="item in playerAccessList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-checkbox false-label="0" true-label="1" v-model="dataCache.isKick" v-if="dataCache.access==2">{{ $t('game.user.dialogUpdate.isKick') }}</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">{{ $t('action.save') }}</el-button>
                    <el-button @click="dialogVisible = false">{{ $t('action.cancel') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "ItemUpdate",
        props: ['visible', 'data'],
        data() {
            return {
                playerRoleList: [{
                    label: this.$t('form.playerRoleList[0].label'),
                    value: 1
                }, {
                    label: this.$t('form.playerRoleList[1].label'),
                    value: 2
                }],
                playerAccessList: [{
                    label: this.$t('form.playerAccessList[0].label'),
                    value: 1
                }, {
                    label: this.$t('form.playerAccessList[1].label'),
                    value: 2
                }],
                dialogVisible: false,
                dataCache: {
                    operator_id: null,
                    account_id: null,
                    role: null,
                    access: null,
                    isKick: 0,
                },
                msg: {
                    code: 200,
                    message: '',
                    errors: {},
                }
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
            initMsg() {
                this.msg.code = 200;
                this.msg.message = '';
                this.msg.errors = {};
            },
            initData(data) {
                this.initMsg();
                this.dataCache.operator_id = data.operator_id;
                this.dataCache.account_id = data.account_id;
                this.dataCache.role = data.role;
                this.dataCache.access = data.access;
                this.dataCache.isKick = 0;
            },
            onSubmit() {
                this.initMsg();
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/app/user/save', this.dataCache).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        this.$message({
                            type: 'success',
                            message: this.$t('messages.save-succeeded'),
                            showClose: true
                        });
                        this.dialogVisible = false;
                        // 同步数据到父组件
                        this.$emit('update', this.dataCache);
                    } else {
                        this.msg = response.data.resp_msg;
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
