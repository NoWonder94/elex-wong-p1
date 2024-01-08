<template>
    <div id="Member_Id" class="Member_CN">
        <el-container>
            <el-aside width="23.4vw">
                <navmenu>
                </navmenu>
            </el-aside>
            <el-main>
                <router-view>
                </router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import NavMenu from '@/views/Navmenu';

    export default {
        name: 'app',
        components: {
            'navmenu': NavMenu
        }
    };
</script>
<style lang="scss">
  @media only screen and (min-width:769px) {
    @import "../styles/pc/member.scss";
  }

  @media only screen and (max-width:769px) {
    @import "../styles/mobile/member.scss";
  }
</style>
