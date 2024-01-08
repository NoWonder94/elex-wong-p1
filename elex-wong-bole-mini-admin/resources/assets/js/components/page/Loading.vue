<template>
    <div :style="{fontSize: fontSize}" class="text-aux" v-if="status == 'loading'">
        <i class="el-icon-loading"></i>
        {{ $t('messages.loading') }}
    </div>
    <div :style="{fontSize: fontSize}" class="text-aux" v-else-if="status == 'nodata'">
        {{ $t('messages.empty') }}
    </div>
    <div :style="{fontSize: fontSize}" class="text-danger-custom" v-else-if="status == 'error'">
        <i class="el-icon-error"></i>
        {{ $t('messages.loading-failed') }}
        <a href="javascript:;" @click="$emit('reload')">{{ $t('refresh') }}</a>
    </div>
    <div :style="{fontSize: fontSize}" class="text-aux" v-else-if="status == 'error-msg'">
        {{ errorMsg }}
    </div>
</template>

<script>
    export default {
        name: "PageLoading",
        props: {
            status: {
                type: String,
                default: 'dle'
            },
            fontSize: {
                type: String,
                default: '0.875rem'
            },
            errorMsg: {
                type: String,
                default: 'error'
            },
        }
    }
</script>

<style scoped>

</style>
