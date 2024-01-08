<template>
    <div class="page-container">
        <div class="page-container-inner flex-center">
            <div class="error">
                <div class="flex-center">
                    <i class="icon el-icon-warning"></i>
                    <span class="info" v-html="$t('error.402')"></span>
                </div>
                <div class="flex-center" style="margin-top: 30px;">
                    <a class="btn btn-primary custom-height" v-bind:href="uri.logout">{{ $t('user.auth.relogin') }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LayoutUser",
        computed: {
            uri: function () {
                return JSON.parse(this.$cookie.get('agency_user')).uri;
            }
        }
    }
</script>

<style scoped>
    .error {
        color: #F56C6C;
    }

    .error .icon {
        font-size: 2rem;
    }

    .error .info {
        margin-left: 1rem;
        font-size: 1.6rem;
    }
</style>
