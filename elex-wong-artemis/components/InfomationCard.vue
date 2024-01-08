<template>
    <div class="information-card card-shadow p-3">
        <div class="information-card-title">{{title}}</div>
        <div style="white-space: pre-wrap;" class="information-card-desc pt-1">{{desc}}</div>
    </div>
</template>
<script>
    export default {
        name: 'InformationCard',
        props: ['title', 'desc']
    }
</script>
<style lang="scss" type="text/css">
    @import "/assets/scss/information_card.scss";
</style>
