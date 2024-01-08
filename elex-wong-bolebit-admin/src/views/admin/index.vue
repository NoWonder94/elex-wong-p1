<template>
  <div class="app-container admin-page">
    <!-- {{ adminLists }} -->
    <div v-for="(admin, index) in adminLists" :key="index" class="admin-page-list">
      <el-descriptions :title="`管理员 ID : ${admin.id}`" :column="2" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user" />
            管理员
          </template>
          {{ admin.username }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-claim" />
            登入次数
          </template>
          {{ admin.login_count }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets" />
            备注
          </template>
          <el-tag size="small">管理员</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-lock" />
            状态
          </template>
          <el-tag class="admin-status" :type="admin.status == 1 ? 'success' : 'danger'" @click="onChangeStatus(admin.id)">
            {{ admin.status == 1 ? '开启' : '关闭' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location" />
            登入地址
          </template>
          {{ admin.login_ip != null ? admin.login_ip : '127.0.0.1' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time" />
            上次更新
          </template>
          {{ admin.update_time }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time" />
            上次登入时间
          </template>
          {{ admin.login_time }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time" />
            上次登出时间
          </template>
          {{ admin.logout_time }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>

</template>

<script>
import { getUserList } from '@/api/user'

export default {
  name: 'Admin',
  data() {
    return {
      adminLists: []
    }
  },

  created() {
    this.getUserList()
  },

  methods: {
    getUserList() {
      getUserList().then((res) => {
        if (res.status === true) {
          this.adminLists = res.data
        } else {
          this.$notify({
            title: '失败',
            message: res.msg.name,
            type: 'error',
            duration: 2000
          })
        }
      }).catch(e => {
        this.$notify({
          title: '警告',
          message: e,
          type: 'warning',
          duration: 2000
        })
        console.log(e)
      })
    },

    onChangeStatus(adminId) {
      console.log('change admin status, admin id: ' + adminId)
      this.$notify({
        title: '提醒',
        message: '待开发，与程序员寻求协助',
        type: 'info',
        duration: 2000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-page {
  position: relative;

  .admin-page-list {
    padding-bottom: 20px;

    .admin-status {
      cursor: pointer;
    }
  }
}
</style>
