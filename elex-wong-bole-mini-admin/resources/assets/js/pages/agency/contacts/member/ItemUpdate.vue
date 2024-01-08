<template>
    <el-dialog :title="$t('agency.contacts.memberUpdateDialog.title')" width="540px" :visible.sync="dialogVisible" @close="$emit('update:visible', false)">
        <div class="pr-5">
            <el-form :model="dataCache" label-width="120px">
                <el-form-item :label="$t('agency.contacts.memberUpdateDialog.type')" :error="errorType" required>
                    <el-select v-model="dataCache.type">
                        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('agency.contacts.memberUpdateDialog.name')" :error="errorName" required>
                    <el-input v-model="dataCache.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('agency.contacts.memberUpdateDialog.tel')" :error="errorTel">
                    <el-input v-model="dataCache.tel"></el-input>
                </el-form-item>
                <el-form-item :label="$t('agency.contacts.memberUpdateDialog.tele')" :error="errorTele">
                    <el-input v-model="dataCache.tele"></el-input>
                </el-form-item>
                <el-form-item :placeholder="$t('agency.contacts.memberUpdateDialog.pwd')" :error="errorPassword">
                    <el-input v-model="dataCache.password" :placeholder="$t('agency.contacts.memberUpdateDialog.pwdPlaceholder')"></el-input>
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
                typeList: [{
                    id: 2,
                    name: this.$t('form.memberTypes[1].label')
                }, {
                    id: 1,
                    name: this.$t('form.memberTypes[0].label')
                }],
                dialogVisible: false,
                dataCache: {
                    id: 0,
                    type: 1,
                    name: '',
                    tel: '',
                    tele: '',
                    user_id: 0,
                    password: ''
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
            errorName: function () {
                if (this.msg.code == 42000 && this.msg.errors.name) {
                    return this.msg.errors.name[0];
                }
            },
            errorTel: function () {
                if (this.msg.code == 42000 && this.msg.errors.tel) {
                    return this.msg.errors.tel[0];
                }
            },
            errorTele: function () {
                if (this.msg.code == 42000 && this.msg.errors.tele) {
                    return this.msg.errors.tele[0];
                }
            },
            errorPassword: function () {
                if (this.msg.code == 42000 && this.msg.errors.password) {
                    return this.msg.errors.password[0];
                }
            },
        },
        watch: {
            visible: function (n, o) {
                // 变量赋值
                this.dialogVisible = n;
                // 初始化参数
                // n && this.initData(this.data);
                n && this.$nextTick(function () {
                    this.initData(this.data);
                })
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
                this.dataCache.id = data.id;
                this.dataCache.type = data.type;
                this.dataCache.name = data.name;
                this.dataCache.tel = data.tel;
                this.dataCache.tele = data.tele;
                this.dataCache.user_id = data.user_id;
                this.dataCache.password = '';
            },
            onSubmit() {
                this.initMsg();
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/agency/member/saveItem', this.dataCache).then((response) => {
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
