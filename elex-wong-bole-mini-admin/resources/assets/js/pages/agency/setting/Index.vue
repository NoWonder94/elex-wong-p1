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
                <div class="option"></div>
            </div>
            <div class="header-main">
                <div class="title">{{ $t($route.meta.title) }}</div>
            </div>
        </div>
        <div class="page-layout-body">
            <div class="body-aside pb-1" style="padding-right: 1px">
                <!-- vbar滚动条 -->
                <div class="vuebar-element" v-bar>
                    <div> <!-- vbar container -->
                        <component-page-org-tree current-root @click="orgSelect"></component-page-org-tree>
                    </div>
                </div>
            </div>
            <div class="body-main pb-1">
                <!-- vbar滚动条 -->
                <div class="vuebar-element" v-bar>
                    <div> <!-- vbar container -->
                        <div class="setting-container">
                            <div class="text-center p-2" v-show="org.id == 1">
                                <component-page-loading status="nodata"></component-page-loading>
                            </div>
                            <div v-show="org.id > 1">
                                <setting-info :org="org" :root-org-id="rootOrgId"></setting-info>
                                <setting-avail-ip :org="org" :root-org-id="rootOrgId"></setting-avail-ip>
                                <setting-secret :org="org" :root-org-id="rootOrgId"></setting-secret>
                                <setting-game :org="org" :root-org-id="rootOrgId"></setting-game>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SettingInfo from './info/Index.vue'
    import SettingGame from './game/Index.vue'
    import SettingSecret from './secret/Index.vue'
    import SettingAvailIp from "./avail-ip/Index";

    export default {
        components: {
            SettingInfo,
            SettingGame,
            SettingSecret,
            SettingAvailIp
        },
        data() {
            return {
                rootOrgId: 0,
                org: {
                    id: 0,
                    name: '',
                    parent_id: 0
                }
            }
        },
        methods: {
            orgSelect(data) {
                if (!this.rootOrgId) {
                    this.rootOrgId = data.id;
                }
                this.org.id = data.id;
                this.org.name = data.name;
                this.org.parent_id = data.parent_id;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .setting-container {
        min-height: 700px;
        padding: 20px;
    }

    /deep/ .container-content {
        padding: 20px;
    }

    /deep/ .container-content-title {
        margin-bottom: 20px;
        border-bottom: 1px solid $boder-color-third;
        padding-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $font-color-first;
    }

    /deep/ .form-detail .el-form-item {
        margin-bottom: 10px;
    }

    /deep/ .form-detail .el-form-item__label {
        color: $font-color-third;
    }
</style>
