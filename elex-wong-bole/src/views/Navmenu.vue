<template>
    <el-row class="left-panel" style="height:100%">
        <el-col :span="12" style="width:100%; height:100%; overflow:hidden;">
            <el-menu class="el-menu-vertical-demo" id="navMenu" style="height:100%;">
                <div class="menuList">
                    <el-menu-item class="home" index="1" @click="navigateTo('homepage')" style="padding:0;" :class="{'is-active':this.$route.path=='/member/homepage'?true:false}">
                        <i class="home">
                        </i>
                        <span slot="title" id="title1">
                            <!-- {{ $i18n.t('navbar.home') }} -->
                            主页
                        </span>
                    </el-menu-item>
                    <el-menu-item class="media" index="2" @click="navigateTo('media')" style="padding-left:2.3vw;" :class="{'is-active':this.$route.path=='/member/media'?true:false}">
                        <i class="media">
                        </i>
                        <span slot="title" id="title1">
                            <!-- {{ $i18n.t('navbar.media') }} -->
                            媒体包
                        </span>
                    </el-menu-item>
                    <el-menu-item class="game" index="3" @click="navigateTo('gamelibrary')" style="padding:0;" :class="{'is-active':this.$route.path=='/member/gamelibrary'?true:false}">
                        <i class="game">
                        </i>
                        <span slot="title" id="title1">
                            <!-- {{ $i18n.t('navbar.library') }} -->
                            游戏库
                        </span>
                    </el-menu-item>
                    <el-menu-item class="support" index="4" @click="navigateTo('support')" style="padding:0;" :class="{'is-active':this.$route.path=='/member/support'?true:false}">
                        <i>
                        </i>
                        <span slot="title" id="title1">
                            <!-- {{ $i18n.t('navbar.support') }} -->
                            支持
                        </span>
                    </el-menu-item>
                    <div class="button">
                        <el-button type="button" id="account" @click="navigateTo('change')" :class="{'active':this.$route.path=='/member/change'?true:false}">
                            <!-- {{ $i18n.t('navbar.account') }} -->
                            账户
                        </el-button>
                        <el-button type="button" id="logout">
                            <!-- {{ $i18n.t('navbar.logout') }} -->
                            会员登出
                        </el-button>
                    </div>
                </div>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        name:'',
        methods: {
            navigateTo(panel) {
                if (panel == 'change') {
                    window.location.href = '/member/' + panel;
                } else {
                    this.$router.push({
                        path: '../member/' + panel
                    });
                }
            }
        }
    };
</script>
<style lang="scss">
  @import "../styles/navmenu.scss"
</style>
