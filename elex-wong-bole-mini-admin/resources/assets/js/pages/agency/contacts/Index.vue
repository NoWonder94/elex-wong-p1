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
                        <contacts-org-tree @click="orgSelect"></contacts-org-tree>
                    </div>
                </div>
            </div>
            <div class="body-main pb-1">
                <!-- vbar滚动条 -->
                <div class="vuebar-element" v-bar>
                    <div> <!-- vbar container -->
                        <contacts-member :org="org" :root-org-id="rootOrgId"></contacts-member>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ContactsOrgTree from './org/Tree.vue'
    import ContactsMember from './member/Index.vue'

    export default {
        components: {
            ContactsOrgTree,
            ContactsMember
        },
        data() {
            return {
                rootOrgId: 0,
                org: {
                    id: 0,
                    name: '',
                    parent_id: 0
                }
            };
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
    };
</script>

<style scoped>

</style>
