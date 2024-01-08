<template>
    <div class="header-title">
        <img :src="icon" alt="">
        <span>{{title}}</span>
    </div>
</template>
<script>
    export default {
        name: 'HeaderTitle',
        props: ['title', 'icon']
    }
</script>
<style lang="scss" type="text/css">
    @import "/assets/scss/header_title.scss";
</style>