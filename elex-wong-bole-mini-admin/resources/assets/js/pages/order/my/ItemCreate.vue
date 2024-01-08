<template>
    <el-dialog :title="$t('order.my.dialog.title')" width="460px" :visible.sync="dialogVisible" @close="$emit('update:visible', false)">
        <div class="pr-5">
            <el-form :model="dataCache" label-width="120px" class="form-content">
                <!--<el-form-item label="类型" :error="errorType" required>
                    <el-select v-model="dataCache.type">
                        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item :label="$t('order.my.dialog.amount')" :error="errorAmount" required>
                    <el-input v-model="dataCache.amount" :placeholder="$t('order.my.dialog.amountPlaceholder')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">{{ $t('action.save') }}</el-button>
                    <el-button @click="dialogVisible = false">{{ $t('action.cancel') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--<el-alert type="warning" show-icon title="转入和转出将会立即到账，请认真确认具体数据"></el-alert>-->
    </el-dialog>
</template>

<script>
    export default {
        name: "ItemCreate",
        props: ['visible'],
        data() {
            return {
                typeList: [{
                    id: 1,
                    name: this.$t('form.transferTypes[0].label')
                }, {
                    id: 2,
                    name: this.$t('form.transferTypes[1].label')
                }],
                dialogVisible: false,
                dataCache: {
                    type: 1,
                    amount: ''
                },
                msg: {
                    code: 200,
                    message: '',
                    errors: {},
                }
            }
        },
        computed: {
            errorType: function () {
                if (this.msg.code == 42000 && this.msg.errors.type) {
                    return this.msg.errors.type[0];
                }
            },
            errorAmount: function () {
                if (this.msg.code == 42000 && this.msg.errors.amount) {
                    return this.msg.errors.amount[0];
                } else if (this.msg.code == 43801) {
                    return this.$t('error.43801', { type: $t('order.my.type.you') });
                } else if (this.msg.code == 43802) {
                    return this.$t('error.43802', { type: $t('order.my.type.you') });
                }
            }
        },
        watch: {
            visible: function (n, o) {
                // 变量赋值
                this.dialogVisible = n;
                // 初始化参数
                n && this.initData(this.org);
            }
        },
        methods: {
            initMsg() {
                this.msg.code = 200;
                this.msg.message = '';
                this.msg.errors = {};
            },
            initData(org) {
                this.initMsg();
                // this.dataCache.type = '';
                this.dataCache.amount = '';
            },
            onSubmit() {
                this.initMsg();
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/order/my/create', this.dataCache).then((response) => {
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
                        // 广播事件到父组件
                        this.$emit('create');
                    } else {
                        this.msg = response.data.resp_msg;
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .form-content .el-select {
        display: block;
    }
</style>
