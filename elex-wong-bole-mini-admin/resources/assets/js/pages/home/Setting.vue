<template>
    <div class="page-container">
        <div class="page-container-inner">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="$t('home.basicinfo')" name="basicinfo">
                    <setting-basicinfo></setting-basicinfo>
                </el-tab-pane>
                <el-tab-pane :label="$t('home.password')" name="password">
                    <setting-password></setting-password>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import SettingBasicinfo from './SettingBasicinfo.vue'
    import SettingPassword from './SettingPassword.vue'

    export default {
        components: {
            SettingBasicinfo,
            SettingPassword
        },
        data() {
            return {
                activeName: 'basicinfo'
            };
        }
    }
</script>

<style scoped>
    .page-container-inner {
        padding-top: 10px;
    }
</style>