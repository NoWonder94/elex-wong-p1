<template>
    <div class="menu-container">
        <div class="menu-list">
            <router-link class="menu-list-item" :to="{name:item.route}" v-for="(item, index) in menus" :key="index">
                <font-awesome-icon fixed-width :icon="item.icon"></font-awesome-icon>
                <span class="ml-2">{{ $t('menu.'+item.code) }}</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LayoutMenu",
        computed: {
            menus: function () {
                return JSON.parse(this.$cookie.get('agency_policy'));
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menu-container {
    }

    .menu-list {
        position: relative;
        font-size: 1rem;
    }

    .menu-list-item {
        display: block;
        padding: 15px 30px;
        text-decoration: none;
        border-left: 3px solid transparent;
        color: #bec5d4;
    }

    .menu-list-item:hover {
        color: #ffffff;
    }

    .menu-list-item.router-link-active {
        background-color: $layout-background-color-hover;
        border-left-color: #ffffff;
        color: #ffffff;
    }
</style>
