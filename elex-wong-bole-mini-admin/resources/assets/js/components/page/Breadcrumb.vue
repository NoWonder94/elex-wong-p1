<template>
    <div class="page-breadcrumb"v-if="!$route.meta.main && $route.meta.routes">
        <el-breadcrumb>
            <el-breadcrumb-item v-for="(item, index) in $route.meta.routes"
                    :to="{name: item.name, params: $route.params}" :key="index">
                {{item.title}}
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "PageBreadcrumb"
    }
</script>

<style lang="scss" scoped>
    .page-breadcrumb {
        margin-bottom: 15px;
    }

    /deep/ {
        .el-breadcrumb__inner,
        .el-breadcrumb__inner a,
        .el-breadcrumb__inner.is-link,
        .el-breadcrumb__item:last-child .el-breadcrumb__inner,
        .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
        .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
        .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
            color: $theme-font-color;
        }
    }
</style>