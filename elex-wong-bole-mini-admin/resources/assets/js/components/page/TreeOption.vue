<template>
    <el-popover placement="bottom-start" trigger="click"
                popper-class="tree-popper"
                :width="treeSelect.width"
                v-model="treeSelect.status">
        <div class="tree-select" slot="reference" ref="treeSelect"
             @mouseover="treeSelect.hover=true"
             @mouseout="treeSelect.hover=false">
            <div class="tree-input" :class="{'is-focus': treeSelect.status}">
                <input type="text" readonly="readonly" autocomplete="off" :placeholder="$t('form.orgId')" class="tree-input__inner" v-model="dataCache.name">
                <span class="tree-input__suffix" @click.stop="clearSelectNode">
                    <span class="tree-input__suffix-inner">
                        <i class="tree-select__caret tree-input__icon el-icon-arrow-up"
                           :class="{'is-reverse': treeSelect.status,'el-icon-circle-close': Boolean(dataCache.id) && treeSelect.hover}"></i>
                    </span>
                </span>
            </div>
        </div>
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
                        <span>{{ data.name }}(ID:{{ data.id }})</span>
                    </div>
                </div>
            </el-tree>
        </div>
    </el-popover>
</template>

<script>
    export default {
        name: "PageOrgTreeOption",
        props: ['currentOrgId'],
        data() {
            return {
                treeSelect: {
                    status: false,
                    width: 200,
                    hover: false,
                },
                orgListStatus: 'dle',
                orgList: [],
                orgProps: {
                    label: 'name',
                    children: 'children'
                },
                dataList: [],
                dataCache: {
                    id: 0,
                    name: ''
                },
            }
        },
        methods: {
            getOrgList() {
                this.orgListStatus = 'loading';
                axios.get('/common/getOrgTree').then((response) => {
                    if (response.data.resp_msg.code == 200) {
                        this.orgList = response.data.resp_data.dataTree;
                        this.orgListStatus = !this.orgList.length ? 'nodata' : 'dle';
                        this.dataList = response.data.resp_data.dataList;
                        // 初始化当前显示节点
                        if (Boolean(this.currentOrgId)) {
                            this.intShowNode();
                        }
                    } else {
                        this.orgListStatus = 'error';
                    }
                })
            },
            // 初始化当前显示节点
            intShowNode() {
                // 当前显示数据
                for (let i in this.dataList) {
                    if (this.dataList[i].id == this.currentOrgId) {
                        this.dataCache.id = this.dataList[i].id;
                        this.dataCache.name = this.dataList[i].name;
                        break;
                    }
                }
                // 当前选中节点
                this.$nextTick(function () {
                    this.$refs.treeOrg.setCurrentKey(this.currentOrgId);
                })
            },
            // 点击选中 tree 节点
            selectNode(data) {
                this.dataCache.id = data.id;
                this.dataCache.name = data.name;
                // 关闭弹窗
                this.treeSelect.status = false;
                // 对外广播事件
                this.$emit('click', this.dataCache);
            },
            // 取消选中节点
            clearSelectNode() {
                if (this.dataCache.id == 0) {
                    return false;
                }
                this.dataCache.id = 0;
                this.dataCache.name = '';
                // 树取消选中节点
                this.$refs.treeOrg.setCurrentKey(null);
                // 关闭弹窗
                this.treeSelect.status = false;
                // 对外广播事件
                this.$emit('click');
            }
        },
        mounted: function () {
            // 初始化弹窗宽度
            this.treeSelect.width = this.$refs.treeSelect.offsetWidth;
            // 获取树数据
            this.getOrgList();
        }
    }
</script>

<style lang="scss" scoped>
    .tree-select {
        display: inline-block;
        position: relative;
    }

    .tree-select .tree-input {
        display: block;
        position: relative;
        font-size: 14px;
        width: 100%;
    }

    .tree-input__inner {
        display: inline-block;
        appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid $boder-color-first;
        box-sizing: border-box;
        color: $font-color-second;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 30px 0 15px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
        cursor: pointer;
    }

    .tree-input__inner::placeholder {
        color: $font-color-fourth
    }

    .tree-select:hover .tree-input__inner {
        border-color: $font-color-fourth;
    }

    .tree-select .tree-input.is-focus .tree-input__inner {
        border-color: $color-primary;
    }

    .tree-input__suffix {
        position: absolute;
        top: 0;
        right: 5px;
        transition: all .3s;
        height: 100%;
        color: $font-color-fourth;
        text-align: center;
        pointer-events: none;
    }

    .tree-input__suffix-inner {
        pointer-events: all;
    }

    .tree-input__icon {
        height: 100%;
        width: 25px;
        text-align: center;
        transition: all .3s;
        line-height: 40px;
    }

    .tree-select .tree-input .tree-select__caret {
        color: $font-color-fourth;
        font-size: 14px;
        transition: transform .3s;
        transform: rotateZ(180deg);
        cursor: pointer;
    }

    .tree-select .tree-input .tree-select__caret.is-reverse {
        transform: rotateZ(0);
    }

    .tree-select .tree-input .tree-select__caret.el-icon-circle-close:hover:before {
        color: $font-color-third
    }

    .tree-input__icon:after {
        content: '';
        height: 100%;
        width: 0;
        display: inline-block;
        vertical-align: middle;
    }

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
