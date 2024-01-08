<template>
    <div class="page-layout">
        <div class="page-layout-header">
            <div class="header-aside">
                <div class="back">
                    <a class="btn btn-light btn-sm" href="javascript:history.go(-1);">
                        <font-awesome-icon icon="chevron-left"></font-awesome-icon>
                        {{ $t('back') }}
                    </a>
                </div>
                <div class="title">{{ $t($route.meta.titleSide) }}</div>
                <div class="option">
                    <div class="icon" :title="$t('system.setting.auth.addPolicyGroup')" @click="group.create.visible = true">
                        <i class="el-icon-plus"></i>
                    </div>
                </div>
            </div>
            <div class="header-main">
                <div class="title">{{ $t($route.meta.title) }}</div>
            </div>
        </div>
        <div class="page-layout-body">
            <div class="body-aside">
                <!-- vbar滚动条 -->
                <div class="vuebar-element" v-bar>
                    <div> <!-- vbar container -->
                        <!--权限组-->
                        <auth-group @click="groupSelect" :create="group.create"></auth-group>
                    </div>
                </div>
            </div>
            <div class="body-main">
                <!-- vbar滚动条 -->
                <div class="vuebar-element" v-bar>
                    <div> <!-- vbar container -->
                        <div class="flex-center p-2" v-if="!group.data.id">
                            <component-page-loading status="nodata"></component-page-loading>
                        </div>
                        <div class="container" v-else>
                            <div class="role-container">
                                <!-------------------管理人名---------------->
                                <div class="row role-item">
                                    <div class="col-2">
                                        <div class="item-title">{{ $t('system.setting.auth.policyGroup') }}</div>
                                    </div>
                                    <div class="col-10">
                                        <div class="item-group-name">{{group.data.name}}</div>
                                        <div class="item-group-desc">{{group.data.desc}}</div>
                                    </div>
                                </div>
                                <!-------------------授权用户---------------->
                                <div class="row role-item">
                                    <div class="col-2">
                                        <div class="item-title">{{ $t('system.setting.auth.groupUser') }}</div>
                                    </div>
                                    <div class="col-8">
                                        <component-page-loading :status="groupMember.dataListStatus"></component-page-loading>
                                        <div class="nub-list" v-if="groupMember.dataListStatus == 'dle' && groupMember.dataList.length">
                                            <div class="nub-item" v-for="(item, index) in groupMember.dataList" :key="index">
                                                <div class="nub-icon icon-user">
                                                    <font-awesome-icon icon="user-tie"></font-awesome-icon>
                                                </div>
                                                <div class="nub-text">{{item.name}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-2 text-right">
                                        <a class="role-item-option" href="javascript:;" @click="dialog.visible.member = true">{{ $t('action.modify') }}</a>
                                    </div>
                                </div>
                                <!-------------------授权策略---------------->
                                <div class="row role-item">
                                    <div class="col-2">
                                        <div class="item-title">{{ $t('system.setting.auth.groupPolicy') }}</div>
                                    </div>
                                    <div class="col-8">
                                        <component-page-loading :status="groupPolicy.dataListStatus"></component-page-loading>
                                        <div class="nub-list" v-if="groupPolicy.dataListStatus == 'dle' && groupPolicy.dataList.length">
                                            <div class="nub-item" v-for="(item, index) in groupPolicy.dataList" :key="index">
                                                <div class="nub-icon icon-user">
                                                    <font-awesome-icon icon="star" size="sm"></font-awesome-icon>
                                                </div>
                                                <div class="nub-text">{{ $t(`system.setting.menu.${item.id}.name`) }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-2 text-right">
                                        <a class="role-item-option" href="javascript:;" @click="dialog.visible.policy = true">{{ $t('action.modify') }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--授权用户-->
                        <auth-member
                                :visible.sync="dialog.visible.member"
                                :data-list="groupMember.dataList"
                                :group-id="group.data.id"
                                @update="syncGroupMemberData">
                        </auth-member>
                        <!--权限策略-->
                        <auth-policy
                                :visible.sync="dialog.visible.policy"
                                :data-list="groupPolicy.dataList"
                                :group-id="group.data.id"
                                @update="syncGroupPolicyData">
                        </auth-policy>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AuthGroup from './group/Index.vue'
    import AuthPolicy from './policy/Index.vue'
    import AuthMember from './member/Index.vue'

    export default {
        components: {
            AuthGroup,
            AuthPolicy,
            AuthMember
        },
        data() {
            return {
                group: {
                    create: {
                        visible: false
                    },
                    data: {
                        id: 0,
                        name: '',
                        desc: ''
                    }
                },
                groupMember: {
                    dataListStatus: 'dle',
                    dataList: []
                },
                groupPolicy: {
                    dataListStatus: 'dle',
                    dataList: []
                },
                dialog: {
                    visible: {
                        member: false,
                        policy: false
                    }
                }
            }
        },
        methods: {
            groupCreate() {
                this.group.create.visible = true;
            },
            groupSelect(data) {
                // 获取数据
                if (this.group.data.id != data.id) {
                    this.getGroupMemberList(data.id);
                    this.getGroupPolicyList(data.id);
                }
                // 缓存数据
                this.group.data.id = data.id;
                this.group.data.name = data.name;
                this.group.data.desc = data.desc;
            },
            // 获取权限组用户数据
            getGroupMemberList(groupId) {
                this.groupMember.dataListStatus = 'loading';
                axios.get('/auth/group-member/getList', {
                    params: {
                        group_id: groupId
                    }
                }).then((response) => {
                    this.groupMember.dataList = response.data.resp_data;
                    this.groupMember.dataListStatus = !this.groupMember.dataList.length ? 'nodata' : 'dle';
                })
            },
            // 同步用户数据到列表
            syncGroupMemberData(data) {
                this.groupMember.dataList = data;
                this.groupMember.dataListStatus = !this.groupMember.dataList.length ? 'nodata' : 'dle';
            },
            // 获取权限组策略数据
            getGroupPolicyList(groupId) {
                this.groupPolicy.dataListStatus = 'loading';
                axios.get('/auth/group-policy/getList', {
                    params: {
                        group_id: groupId
                    }
                }).then((response) => {
                    this.groupPolicy.dataList = response.data.resp_data;
                    this.groupPolicy.dataListStatus = !this.groupPolicy.dataList.length ? 'nodata' : 'dle';
                })
            },
            // 同步策略数据到列表
            syncGroupPolicyData(data) {
                this.groupPolicy.dataList = data;
                this.groupPolicy.dataListStatus = !this.groupPolicy.dataList.length ? 'nodata' : 'dle';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header-aside .icon {
        flex-shrink: 0;
        width: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        cursor: pointer;
        color: $font-color-third;
    }

    .header-aside .icon:hover {
        color: $font-color-second;
    }

    .role-container {
        padding: 15px;
        font-size: $font-size-third;
    }

    .role-item {
        padding: 15px 0;
    }

    .role-item + .role-item {
        border-top: 1px solid $boder-color-fourth;
    }

    .role-item .item-group-name {
        color: $font-color-first;
    }

    .role-item .item-group-desc {
        color: $font-color-third;
        padding-top: 5px;
        font-size: 0.8rem;
    }

    .role-item .item-title {
        color: $font-color-first;
    }
</style>
