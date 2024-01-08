<template>
  <div class="error404">
    <el-card shadow="hover">
      <div class="title">
        4<span><i class="s-icon-navigate-outline"></i></span>4
      </div>
      <p class="info">您访问的页面不存在.</p>
      <div class="btn-box">
        <el-button plain @click="$router.replace('/index')">返回首页</el-button>
        <el-button type="primary" @click="$router.back()">返回上一页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {}
};
</script>

<style lang="scss" type="text/css">
@import '../styles/notfound.scss';
</style>
