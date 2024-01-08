<template>
    <span v-if="type == 'format'">
        {{ timestampByJS | timestampToView(format) }}
    </span>
    <span v-else-if="type == 'year'">
        {{ timestampByJS | timestampToView('YYYY') }}</span>
    <span v-else-if="type == 'month'">
        {{ timestampByJS | timestampToView('YYYY-MM') }}</span>
    <span v-else-if="type == 'day'">
        {{ timestampByJS | timestampToView('YYYY-MM-DD') }}</span>
    <span v-else-if="type == 'hour'">
        {{ timestampByJS | timestampToView('YYYY-MM-DD HH:00') }}</span>
    <span v-else-if="type == 'minute'">
        {{ timestampByJS | timestampToView('YYYY-MM-DD HH:mm') }}</span>
    <span v-else-if="type == 'second'">
        {{ timestampByJS | timestampToView('YYYY-MM-DD HH:mm:ss') }}</span>
    <span v-else>
        {{ timestampByJS | timestampToView('YYYY-MM-DD HH:mm:ss') }}
    </span>
</template>

<script>
    import momentTimezone from 'moment-timezone'

    export default {
        name: "Timestamp",
        props: {
            type: {
                type: String,
                default: 'default'
            },
            timestamp: {
                type: [String, Number],
                default: 0
            },
            format: String,
        },
        computed: {
            timestampByJS: function () {
                // 转换为数字
                let timestamp = Number(this.timestamp);
                // 转换为毫秒
                return timestamp > 10000000000 ? timestamp : timestamp * 1000;
            }
        },
        filters: {
            // 将时间戳转换为PRC可视时间
            timestampToView: function (timestamp, format) {
                return momentTimezone(timestamp).tz('PRC').format(format);
            }
        }
    }
</script>

<style scoped>

</style>