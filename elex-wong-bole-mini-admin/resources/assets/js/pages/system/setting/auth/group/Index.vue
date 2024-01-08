<template>
    <div class="group-container">
        <div class="p-2" v-if="!groupList.length">
            <component-page-loading :status="groupListLoading"></component-page-loading>
        </div>
        <div class="group-list" v-if="groupList.length">
            <div class="group-list-item"
                 v-for="(item, index) in groupList" :key="index"
                 :class="{'active': index == current.index}"
                 @click="selectNode(item, index)">
                <div class="item-info text-truncate">
                    <span class="item-icon">
                        <font-awesome-icon fixed-width icon="folder"></font-awesome-icon>
                    </span>
                    <span>{{item.name}}</span>
                </div>
                <div class="item-option">
                    <div class="option-icon" @click.stop="dialogNodeOption('update', item, index)">
                        <i class="el-icon-edit-outline"></i>
                    </div>
                    <div class="option-icon" @click.stop="dialogNodeOption('destroy', item, index)">
                        <i class="el-icon-delete"></i>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :title="$t('system.setting.auth.createDialog.title')" width="460px" :visible.sync="dialog.visible.create" @close="create.visible = false">
            <div class="pr-5">
                <el-form :model="dataCreate" label-width="80px">
                    <el-form-item :label="$t('system.setting.auth.createDialog.name')" :error="errorName" required>
                        <el-input v-model="dataCreate.name"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('system.setting.auth.createDialog.desc')" :error="errorDesc">
                        <el-input v-model="dataCreate.desc" type="textarea" :rows="2"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="treeNodeCreate">{{ $t('action.confirm') }}</el-button>
                        <el-button @click="dialog.visible.create = false">{{ $t('action.cancel') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog :title="$t('system.setting.auth.updateDialog.title')" width="500px" :visible.sync="dialog.visible.update">
            <div class="pr-5">
                <el-form :model="dataUpdate" label-width="80px">
                    <el-form-item :label="$t('system.setting.auth.updateDialog.sort')" :error="errorSort" required>
                        <el-input v-model="dataUpdate.sort" :placeholder="$t('system.setting.auth.updateDialog.sortPlaceholder')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('system.setting.auth.updateDialog.name')" :error="errorName" required>
                        <el-input v-model="dataUpdate.name"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('system.setting.auth.updateDialog.desc')" :error="errorDesc">
                        <el-input v-model="dataUpdate.desc" type="textarea" :rows="2"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="treeNodeUpdate">{{ $t('action.confirm') }}</el-button>
                        <el-button @click="dialog.visible.update = false">{{ $t('action.cancel') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog :title="$t('system.setting.auth.destroyDialog.title')" center width="400px" :visible.sync="dialog.visible.destroy">
            <div class="text-center" v-html="$t('system.setting.auth.destroyDialog.askText', { name: nodeCache.data.name })"></div>
            <div slot="footer">
                <el-button @click="dialog.visible.destroy = false">{{ $t('action.cancel') }}</el-button>
                <el-button type="primary" @click="treeNodeDestroy">{{ $t('action.save') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AuthGroup",
        props: ['create'],
        data() {
            return {
                current: {
                    data: {},
                    index: -1
                },
                groupListLoading: 'dle',
                groupList: [],
                dialog: {
                    visible: {
                        create: false,
                        update: false,
                        destroy: false
                    }
                },
                nodeCache: {
                    data: {},
                    index: -1
                },
                dataCreate: {
                    name: '',
                    desc: ''
                },
                dataUpdate: {
                    id: 0,
                    sort: 0,
                    name: '',
                    desc: ''
                },
                msg: {
                    code: 200,
                    message: '',
                    errors: {},
                }
            }
        },
        computed: {
            errorName: function () {
                if (this.msg.code == 42000 && this.msg.errors.name) {
                    return this.msg.errors.name[0];
                }
            },
            errorDesc: function () {
                if (this.msg.code == 42000 && this.msg.errors.desc) {
                    return this.msg.errors.desc[0];
                }
            },
            errorSort: function () {
                if (this.msg.code == 42000 && this.msg.errors.sort) {
                    return this.msg.errors.sort[0];
                }
            }
        },
        watch: {
            create: {
                deep: true,
                handler(n, o) {
                    n.visible && this.dialogNodeOption('create');
                }
            }
        },
        methods: {
            getGroupList() {
                this.groupListLoading = 'loading';
                axios.get('/auth/group/getList').then((response) => {
                    this.groupList = response.data.resp_data;
                    this.groupListLoading = !this.groupList.length ? 'nodata' : 'dle';
                    // 初始化选中第一个节点
                    if (this.groupList.length) {
                        this.selectNode(this.groupList[0], 0);
                    }
                })
            },
            // 点击选中节点
            selectNode(data, index) {
                this.current.data = data;
                this.current.index = index;
                this.$emit('click', data);
            },
            // 分发 option 操作选项
            dialogNodeOption(option, data, index) {
                switch (option) {
                    case 'create':
                        this.initDataCreate();
                        this.dialog.visible.create = true;
                        break;
                    case 'update':
                        this.nodeCache.data = data;
                        this.nodeCache.index = index;
                        this.initDataUpdate();
                        this.dialog.visible.update = true;
                        break;
                    case 'destroy':
                        this.nodeCache.data = data;
                        this.nodeCache.index = index;
                        this.dialog.visible.destroy = true;
                        break;
                }
            },
            // 初始化参数
            initMsg() {
                this.msg.code = 200;
                this.msg.message = '';
                this.msg.errors = {};
            },
            // 初始化新增节点数据
            initDataCreate() {
                this.initMsg();
                this.dataCreate.name = '';
                this.dataCreate.desc = '';
            },
            // 编初始化辑节点数据
            initDataUpdate() {
                this.initMsg();
                this.dataUpdate.id = this.nodeCache.data.id;
                this.dataUpdate.sort = this.nodeCache.data.sort;
                this.dataUpdate.name = this.nodeCache.data.name;
                this.dataUpdate.desc = this.nodeCache.data.desc;
            },
            // 新增节点
            treeNodeCreate() {
                this.initMsg();
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/auth/group/saveItem', this.dataCreate).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        this.$message({
                            type: 'success',
                            message: this.$t('messages.save-succeeded'),
                            showClose: true
                        });
                        this.dialog.visible.create = false;
                        // 添加节点到列表
                        this.groupList.push(response.data.resp_data);
                    } else {
                        this.msg = response.data.resp_msg;
                    }
                })
            },
            // 编辑节点
            treeNodeUpdate() {
                this.initMsg();
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/auth/group/saveItem', this.dataUpdate).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        this.$message({
                            type: 'success',
                            message: this.$t('messages.save-succeeded'),
                            showClose: true
                        });
                        this.dialog.visible.update = false;
                        // 同步数据到列表
                        this.treeNodeSyncData(response.data.resp_data);
                    } else {
                        this.msg = response.data.resp_msg;
                    }
                })
            },
            // 同步数据到列表，并排序
            treeNodeSyncData(data) {
                // 同步数据
                Vue.set(this.groupList, this.nodeCache.index, data);
                // 列表排序
                this.groupList = _.orderBy(this.groupList, ['sort'], ['asc']);
                // 暴露到父级
                if (this.nodeCache.index == this.current.index) {
                    this.selectNode(data, this.current.index);
                }
            },
            // 删除节点
            treeNodeDestroy() {
                this.dialog.visible.destroy = false;
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/auth/group/destroy', {
                    id: this.nodeCache.data.id
                }).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        this.$message({
                            type: 'success',
                            message: this.$t('messages.delete-succeeded'),
                            showClose: true
                        });
                        //  从列表删除节点数据
                        this.groupList.splice(this.nodeCache.index, 1);
                    } else {
                        this.$message({
                            type: 'error',
                            message: this.$t('messages.delete-failed'),
                            showClose: true
                        });
                    }
                })
            }
        },
        mounted: function () {
            this.getGroupList();
        }
    }
</script>

<style lang="scss" scoped>
    .group-list-item {
        position: relative;
    }

    .group-list-item {
        font-size: $font-size-third;
        cursor: pointer;
        height: 36px;
        line-height: 36px;
    }

    .group-list-item:hover {
        background-color: #f5f7fa;
    }

    .group-list-item.active {
        background-color: #f0f7ff;
    }

    .group-list-item .item-info {
        position: relative;
        padding-right: 50px;
    }

    .group-list-item .item-icon {
        color: #c7daf1;
        margin: 0 1px 0 15px;
    }

    .group-list-item .item-option {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 50px;
        opacity: 0;
        display: flex;
    }

    .group-list-item:hover .item-option {
        opacity: 1;
    }

    .group-list-item .item-option .option-icon {
        flex: auto;
        color: #909399;
    }

    .group-list-item .item-option .option-icon:hover {
        color: #606266;
    }
</style>
