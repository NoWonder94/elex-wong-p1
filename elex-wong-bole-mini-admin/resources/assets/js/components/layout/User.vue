<template>
    <div class="user-container">
        <div class="user-info">
            <!--<img class="icon" src="avatar">-->
            <i class="icon flex-center">
                <font-awesome-icon icon="user-tie"></font-awesome-icon>
            </i>
            <span class="name text-truncate" :title="user.name">{{ user.name }}</span>
            <i class="el-icon-caret-bottom"></i>
        </div>
        <div class="menu-list">
            <a class="menu-list-item" @click="changeLocale()">
                <font-awesome-icon fixed-width icon="language"></font-awesome-icon>
                <span class="ml-2">{{ $t('topMenu.language') }}</span>
            </a>
            <a class="menu-list-item" href="#/home/setting">
                <font-awesome-icon fixed-width icon="cog"></font-awesome-icon>
                <span class="ml-2">{{ $t('topMenu.setting') }}</span>
            </a>
            <a class="menu-list-item" v-bind:href="uri.logout">
                <font-awesome-icon fixed-width icon="sign-out-alt"></font-awesome-icon>
                <span class="ml-2">{{ $t('topMenu.logout') }}</span>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LayoutUser",
        computed: {
            user: function () {
                return JSON.parse(this.$cookie.get('agency_user')).user;
            },
            uri: function () {
                return JSON.parse(this.$cookie.get('agency_user')).uri;
            }
        },
        methods: {
            // 设置语言
            changeLocale() {
                if(this.$i18n.locale === 'zh-CN') {
                    this.$i18n.locale = 'en';
                } else if(this.$i18n.locale === 'en') {
                    this.$i18n.locale = 'zh-CN';
                }
                this.$cookie.set('lang', this.$i18n.locale, { expires: '1Y' });
            },
        },
    }
</script>

<style lang="scss" scoped>
    .user-container {
        display: inline-block;
        position: relative;
        width: 160px;
        height: 100%;
        z-index: 2001;
        cursor: pointer;
        color: #fff;
    }

    .user-container:hover {
        background-color: $layout-background-color-hover;
    }

    .user-info {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .user-info .icon {
        width: 32px;
        height: 32px;
        border-radius: 50% !important;
        background-color: #a7bad0;
        color: #e9f3ff;
        font-size: 1.15em;
    }

    .user-info .name {
        max-width: 80px;
        margin: 0 3px 0 5px;
    }

    .user-container .menu-list {
        display: none;
        line-height: 50px;
    }

    .user-container:hover .menu-list {
        display: block;
    }

    .menu-list-item {
        display: block;
        text-align: center;
        text-decoration: none;
        background-color: $layout-background-color-hover;
        color: #fff;
    }

    .menu-list-item:hover {
        background-color: $layout-background-color;
    }
</style>
