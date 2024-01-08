<template>
    <el-dialog :title="$t('agency.contacts.memberCreateDialog.title')" width="640px" :visible.sync="dialogVisible" @close="$emit('update:visible', false)">
        <div class="pr-5">
            <el-form :model="dataCache" label-width="120px">
                <el-form-item :label="$t('agency.contacts.memberCreateDialog.orgName')">
                    <span class="mr-2">{{ dataCache.org_name }}</span>
                    <el-tag type="info" size="mini">{{ dataCache.org_id }}</el-tag>
                </el-form-item>
                <el-form-item :label="$t('agency.contacts.memberCreateDialog.email')" :error="errorNewEmail" required>
                    <el-input v-model="dataCache.email" :placeholder="$t('agency.contacts.memberCreateDialog.emailPlaceholder')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('agency.contacts.memberCreateDialog.pwd')" :error="errorNewPassword" required>
                    <el-input v-model="dataCache.password" :placeholder="$t('agency.contacts.memberCreateDialog.pwdPlaceholder')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('agency.contacts.memberCreateDialog.type')" :error="errorType" required>
                    <el-select v-model="dataCache.type">
                        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('agency.contacts.memberCreateDialog.name')" :error="errorName" required>
                    <el-input v-model="dataCache.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('agency.contacts.memberCreateDialog.tel')" :error="errorTel">
                    <el-input v-model="dataCache.tel"></el-input>
                </el-form-item>
                <el-form-item :label="$t('agency.contacts.memberCreateDialog.tele')" :error="errorTele">
                    <el-input v-model="dataCache.tele"></el-input>
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
        name: "ItemCreate",
        props: ['visible', 'org'],
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
                    org_id: 0,
                    org_name: '',
                    email: '',
                    password: '',
                    type: '',
                    name: '',
                    tel: '',
                    tele: ''
                },
                msg: {
                    code: 200,
                    message: '',
                    errors: {},
                }
            }
        },
        computed: {
            errorNewEmail: function () {
                if (this.msg.code == 42000 && this.msg.errors.email) {
                    return this.msg.errors.email[0];
                } else if (this.msg.code == 43202) {
                    return this.msg.message;
                }
            },
            errorNewPassword: function () {
                if (this.msg.code == 42000 && this.msg.errors.password) {
                    return this.msg.errors.password[0];
                }
            },
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
                this.dataCache.org_id = org.id;
                this.dataCache.org_name = org.name;
                this.dataCache.email = '';
                this.dataCache.password = '';
                this.dataCache.type = '';
                this.dataCache.name = '';
                this.dataCache.tel = '';
                this.dataCache.tele = '';
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
    >>> .el-dialog__body {
        padding-top: 20px;
    }
</style>
