<template>
    <div class="tree-conteiner">
        <div class="p-2" v-if="!orgList.length">
            <component-page-loading :status="orgListStatus" @reload="getOrgList"></component-page-loading>
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
            </div>
        </el-tree>
    </div>
</template>

<script>
    export default {
        name: "PageOrgTree",
        props: {
            currentRoot: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                orgListStatus: 'dle',
                orgList: [],
                orgProps: {
                    label: 'name',
                    children: 'children'
                }
            }
        },
        methods: {
            getOrgList() {
                this.orgListStatus = 'loading';
                axios.get('/agency/org/getList').then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.orgList = response.data.resp_data;
                        this.orgListStatus = !this.orgList.length ? 'nodata' : 'dle';
                        // 初始化选中根节点
                        if (this.orgList.length && this.currentRoot) {
                            this.$nextTick(function () {
                                this.$refs.treeOrg.setCurrentKey(this.orgList[0].id);
                                this.selectNode(this.orgList[0]);
                            })
                        }
                    } else {
                        this.orgListStatus = 'error';
                    }
                })
            },
            // 点击选中 tree 节点
            selectNode(data) {
                this.$emit('click', data);
            },
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
</style>