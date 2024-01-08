<template>
    <div class="tree-conteiner">
        <div class="p-2" v-if="!orgList.length">
            <component-page-loading :status="orgListLoading"></component-page-loading>
        </div>
        <el-tree highlight-current ref="treeOrg" v-if="orgList.length"
                 node-key="id"
                 :indent="18"
                 :data="orgList"
                 :props="orgProps"
                 :default-expanded-keys="[orgList[0].id]"
                 :expand-on-click-node="false"
                 @current-change="selectNode">
            <div class="org-tree-node" slot-scope="{ node, data }">
                <div class="node-info">
                    <font-awesome-icon icon="folder" class="node-icon"></font-awesome-icon>
                    <span>{{ data.name }}</span>
                </div>
                <el-dropdown class="node-option" v-if="rootOrgId == data.id || rootOrgId == data.parent_id"
                             size="small"
                             trigger="click"
                             placement="bottom"
                             @command="dialogNodeOption"
                             @visible-change="nodeOptionVisibleChange">
                    <i class="el-icon-more" @click.stop="nodeOptionSelectNode(data, node)"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="update">{{ $t('action.edit') }}</el-dropdown-item>
                        <el-dropdown-item command="destroy" :disabled="Boolean(data.children)">{{ $t('action.delete') }}</el-dropdown-item>
                        <el-dropdown-item command="create" v-if="rootOrgId == data.id">{{ $t('action.create') + $t('agency.child') }}</el-dropdown-item>
                        <el-dropdown-item disabled>ID : {{ data.id }}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-tree>
        <el-dialog :title="$t('agency.contacts.createDialog.title')" width="460px" :visible.sync="dialog.visible.create">
            <div class="pr-5">
                <el-form :model="dataCreate" label-width="120px">
                    <el-form-item :label="$t('agency.contacts.createDialog.parentName')">
                        <span class="mr-2">{{ dataCreate.parent_name }}</span>
                        <el-tag type="info" size="mini">{{ dataCreate.parent_id }}</el-tag>
                    </el-form-item>
                    <el-form-item :label="$t('agency.contacts.createDialog.name')" :error="errorName" required>
                        <el-input v-model="dataCreate.name" :placeholder="$t('agency.contacts.createDialog.nameplaceholder')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="treeNodeCreate">{{ $t('action.confirm') }}</el-button>
                        <el-button @click="dialog.visible.create = false">{{ $t('action.cancel') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog :title="$t('agency.contacts.updateDialog.title')" width="460px" :visible.sync="dialog.visible.update">
            <div class="pr-5">
                <el-form :model="dataUpdate" label-width="80px">
                    <el-form-item :label="$t('agency.contacts.updateDialog.sort')" :error="errorSort" required>
                        <el-input v-model="dataUpdate.sort" :placeholder="$t('agency.contacts.updateDialog.sortPlaceholder')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('agency.contacts.updateDialog.name')" :error="errorName" required>
                        <el-input v-model="dataUpdate.name" :placeholder="$t('agency.contacts.updateDialog.nameplaceholder')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="treeNodeUpdate">{{ $t('action.confirm') }}</el-button>
                        <el-button @click="dialog.visible.update = false">{{ $t('action.cancel') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog :title="$t('agency.contacts.destroyDialog.title')" center width="400px" :visible.sync="dialog.visible.destroy">
            <div class="text-center" v-html="$t('agency.contacts.destroyDialog.askText', { name: nodeCache.data.name })"></div>
            <div class="text-center mt-2">{{ $t('agency.contacts.destroyDialog.desc') }}</div>
            <div slot="footer">
                <el-button type="primary" @click="treeNodeDestroy">{{ $t('action.confirm') }}</el-button>
                <el-button @click="dialog.visible.destroy = false">{{ $t('action.cancel') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ContactsOrgTree",
        data() {
            return {
                rootOrgId: 0,
                orgListLoading: 'dle',
                orgList: [],
                orgProps: {
                    label: 'name',
                    children: 'children'
                },
                nodeCache: {
                    data: {},
                    node: {}
                },
                nodePreCache: {
                    node: {},
                    nodeKey: 0
                },
                dialog: {
                    visible: {
                        create: false,
                        update: false,
                        destroy: false
                    }
                },
                dataCreate: {
                    name: '',
                    parent_id: 0,
                    parent_name: 0
                },
                dataUpdate: {
                    id: 0,
                    sort: 0,
                    name: ''
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
            errorSort: function () {
                if (this.msg.code == 42000 && this.msg.errors.sort) {
                    return this.msg.errors.sort[0];
                }
            }
        },
        methods: {
            getOrgList() {
                this.orgListLoading = 'loading';
                axios.get('/agency/org/getList').then((response) => {
                    this.orgList = response.data.resp_data;
                    this.orgListLoading = !this.orgList.length ? 'nodata' : 'dle';
                    // 初始化选中根节点
                    this.$nextTick(function () {
                        this.rootOrgId = this.orgList[0].id;
                        this.$refs.treeOrg.setCurrentKey(this.orgList[0].id);
                        this.selectNode(this.orgList[0]);
                    })
                })
            },
            // 点击选中 tree 节点
            selectNode(data) {
                this.$emit('click', data);
            },
            // 打开 option 弹窗扩展处理
            nodeOptionSelectNode(data, node) {
                // 缓存触发选中节点数据
                this.nodeCache.data = data;
                // 缓存触发选中节点
                this.nodeCache.node = node;
            },
            // 隐藏 option 弹窗扩展处理
            nodeOptionVisibleChange(visible) {
                if (visible) {
                    // 缓存当前选中节点
                    this.nodePreCache.node = this.$refs.treeOrg.getCurrentNode();
                    // 缓存当前选中节点 key
                    this.nodePreCache.nodeKey = this.$refs.treeOrg.getCurrentKey();
                    // 修改当前选中节点
                    this.$refs.treeOrg.setCurrentKey(this.nodeCache.node.key);
                } else {
                    // 还原之前选中节点
                    this.$refs.treeOrg.setCurrentKey(this.nodePreCache.nodeKey);
                }
            },
            // 分发 option 操作选项
            dialogNodeOption(option) {
                switch (option) {
                    case 'create':
                        this.initDataCreate();
                        this.dialog.visible.create = true;
                        break;
                    case 'update':
                        this.initDataUpdate();
                        this.dialog.visible.update = true;
                        break;
                    case 'destroy':
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
            // 初始化新增子节点数据
            initDataCreate() {
                this.initMsg();
                this.dataCreate.name = '';
                this.dataCreate.parent_id = this.nodeCache.data.id;
                this.dataCreate.parent_name = this.nodeCache.data.name;
            },
            // 编初始化辑节点数据
            initDataUpdate() {
                this.initMsg();
                this.dataUpdate.id = this.nodeCache.data.id;
                this.dataUpdate.sort = this.nodeCache.data.sort;
                this.dataUpdate.name = this.nodeCache.data.name;
            },
            // 新增子节点
            treeNodeCreate() {
                this.initMsg();
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/agency/org/saveItem', this.dataCreate).then((response) => {
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
                        // 添加节点到 tree 组件
                        this.$refs.treeOrg.append(response.data.resp_data, this.nodeCache.node)
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
                axios.post('/agency/org/saveItem', this.dataUpdate).then((response) => {
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
                        // 同步数据到 tree 节点
                        this.treeNodeSyncData(response.data.resp_data);
                    } else {
                        this.msg = response.data.resp_msg;
                    }
                })
            },
            // 同步数据到 tree 节点，并排序
            treeNodeSyncData(data) {
                // 更新当前节点
                this.nodeCache.data.name = data.name;
                // 是否重新排序
                if (this.nodeCache.data.sort == data.sort) {
                    return;
                }
                this.nodeCache.data.sort = data.sort;

                // 缓存父级节点
                let parent = this.$refs.treeOrg.getNode(this.nodeCache.node.parent.key);
                // 缓存所有同级数据
                let parentDataChildren = _.cloneDeep(parent.data.children);

                // 同级数据排序
                parentDataChildren.sort(function (a, b) {
                    if (a.sort < b.sort) {
                        return -1;
                    } else if (a.sort > b.sort) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                // 更新同级数据到 tree
                for (var i in parentDataChildren) {
                    this.$refs.treeOrg.remove(parentDataChildren[i].id);
                    this.$refs.treeOrg.append(parentDataChildren[i], parent);
                }
            },
            // 删除节点
            treeNodeDestroy() {
                this.dialog.visible.destroy = false;
                // loading 状态 start
                let loading = this.$loading();
                // 保存数据
                axios.post('/agency/org/destroy', {
                    id: this.nodeCache.data.id
                }).then((response) => {
                    // loading 状态 close
                    loading.close();
                    // 逻辑处理
                    if (response.data.resp_msg.code == 200) {
                        this.$message({
                            type: 'success',
                            message: this.$t('messages.delete-succeeded'),
                            showClose: true,
                            onClose: function () {
                                window.location.reload();
                            }
                        });
                        //  从 tree 组件删除节点
                        // this.$refs.treeOrg.remove(this.nodeCache.node)
                    } else if (response.data.resp_msg.code == 43221) {
                        this.$message({
                            type: 'warning',
                            message: this.$t('messages.delete-agent-failed'),
                            showClose: true
                        });
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
            this.getOrgList();
        }
    }
</script>

<style lang="scss" scoped>
    .org-tree-node {
        display: flex;
        flex-direction: row;
        flex: auto;
        align-items: center;
        font-size: $font-size-third;
    }

    .org-tree-node .node-info {
        flex: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .org-tree-node .node-icon {
        color: #c7daf1;
    }

    .org-tree-node .node-option {
        display: none;
        flex-shrink: 0;
        text-align: center;
        width: 60px;
    }

    .el-tree-node.is-current > .el-tree-node__content .org-tree-node .node-option,
    .el-tree-node__content:hover .node-option {
        display: inline-block;
    }
</style>
