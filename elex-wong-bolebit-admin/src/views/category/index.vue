<template>
  <div class="app-container game-category">
    <div class="game-category-table">
      <el-button class="game-category-add-button" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>

      <el-table
        v-loading.lock="gameCateListLoading"
        :data="gameCateList"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="序号"
          width="130"
        />
        <el-table-column
          label="图标(active)"
          align="center"
        >
          <template slot-scope="scope">
            <img style="width:150px" :src="`${imageUrl}${scope.row.active_icon}`">
          </template>
        </el-table-column>
        <el-table-column
          label="图标(inactive)"
          align="center"
        >
          <template slot-scope="scope">
            <img style="width:150px" :src="`${imageUrl}${scope.row.inactive_icon}`">
          </template>
        </el-table-column>
        <el-table-column
          label="分类名称"
          align="center"
        >
          <el-table-column v-for="(item, index) in languages" :key="`label-${index}`" :label="item.language" :prop="`category_name.${item.key}`" align="center" />
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="cateForm" :model="formTempData" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <p class="cateform-title">分类名称</p>
        <div style="display: flex; flex-direction: row;">

          <el-form-item>
            <div>图标(active)</div>
            <el-upload
              ref="activeIcons"
              class="upload-file"
              :action="uploadActionUrl"
              :headers="uploadHeader"
              :on-change="handleChange"
              :limit="1"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              :file-list="activeiconspreview"
              list-type="picture-card"
            >
              <i class="el-icon-plus" />

            </el-upload>
          </el-form-item>
          <el-form-item>
            <div>图标(inactive)</div>
            <el-upload
              ref="inactiveIcons"
              class="upload-file"
              :action="uploadActionUrl"
              :headers="uploadHeader"
              :on-change="handleInactiveIconChange"
              :limit="1"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              :file-list="inactiveiconspreview"
              list-type="picture-card"
            >
              <i class="el-icon-plus" />

            </el-upload>
          </el-form-item>
        </div>
        <el-form-item label="key" prop="key">
          <el-input v-model="formCateKey" />
        </el-form-item>
        <el-form-item v-for="(item, index) in languages" :key="`labels-${index}`" :label="item.language" :prop="item.key">
          <el-input v-model="formTempData[item.key]" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button v-if="isSubmit" type="primary">
          <i class="el-icon-loading" />
        </el-button>
        <el-button v-else type="primary" @click="dialogStatus==='create'?createCate():updateCate()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCateList, createCateList, updateCateList, deleteCateList } from '@/api/category'
import { getUserToken } from '@/utils/auth'
import { mapGetters } from 'vuex'

export default {
  name: 'GameCategory',
  data() {
    return {
      gameCateList: null,
      gameCateListLoading: true,
      // dialog form
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      formCateKey: '',
      formTempData: {},
      activeIcon: '',
      inactiveIcon: '',
      updateId: 0,
      isSubmit: false,
      /* upload */
      uploadActionUrl: `${process.env.VUE_APP_BASE_API}/api/Admin/uploadFile?type=img`,
      uploadHeader: '',
      activeiconspreview: [],
      inactiveiconspreview: [],
      imageUrl: process.env.VUE_APP_BASE_API
    }
  },
  computed: {
    ...mapGetters([
      'languages'
    ])
  },
  created() {
    this.fetchGameCateList()
    this.uploadHeader = {
      'Authorization': 'Bearer ' + getUserToken()
    }
  },
  methods: {
    fetchGameCateList() {
      // const loading = this.$loading({
      //   lock: true
      // })

      this.gameCateListLoading = true
      getCateList().then(res => {
        if (res.status === true) {
          this.gameCateList = res.data
          this.gameCateListLoading = false
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

    resetCateTemp() {
      this.activeiconspreview = []
      this.inactiveiconspreview = []
      this.formTempData = {}
      this.formCateKey = ''
      this.activeIcon = ''
      this.inactiveIcon = ''
    },

    handleChange(file) {
      if (file.response != null) {
        if (file.response.status !== true) {
          this.$refs.activeIcons.clearFiles()
          this.$notify({
            title: '警告',
            message: file.response.msg,
            type: 'warning',
            duration: 2000
          })
        } else {
          this.activeIcon = file.response.data.filePath
          this.uploadSuccesPreview = file.response.data.fileUrl
        }
      }
    },

    handleInactiveIconChange(file) {
      this.frontCoverPreview = ''
      this.uploadSuccesPreview = ''
      if (file.response != null) {
        if (file.response.status !== true) {
          this.$refs.inactiveIcons.clearFiles()
          this.$notify({
            title: '警告',
            message: file.response.msg,
            type: 'warning',
            duration: 2000
          })
        } else {
          this.inactiveIcon = file.response.data.filePath
          this.uploadSuccesPreview = file.response.data.fileUrl
        }
      }
    },

    handleRemove() {
      this.uploadSuccesPreview = ''
    },

    handleExceed(files) {
      this.$notify.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`)
    },

    handleCreate() {
      this.resetCateTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['cateForm'].clearValidate()
      })
    },

    createCate() {
      this.isSubmit = true
      const encodeData = JSON.stringify(this.formTempData)
      createCateList({
        key: this.formCateKey,
        name: encodeData,
        active_icon: this.activeIcon,
        inactive_icon: this.inactiveIcon
      }).then((res) => {
        if (res.status === true) {
          this.isSubmit = false
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: res.msg,
            type: 'success',
            duration: 2000
          })
          this.fetchGameCateList()
        } else {
          this.$notify({
            title: '失败',
            message: res.msg,
            type: 'error',
            duration: 2000
          })
          this.isSubmit = false
        }
      }).catch((e) => {
        this.$notify({
          title: '警告',
          message: e,
          type: 'warning',
          duration: 2000
        })
        console.log(e)
        this.isSubmit = false
      })
    },

    handleUpdate(row) {
      this.resetCateTemp()
      console.log('update: ' + row.id)
      console.log(row)
      this.updateId = row.id
      this.formTempData = Object.assign({}, row.category_name)
      if (row.active_icon !== null) {
        this.activeIcon = row.active_icon
        this.activeiconspreview.push({
          name: 'active_icon',
          url: this.imageUrl + row.active_icon
        })
      }
      if (row.inactive_icon !== null) {
        this.inactiveIcon = row.inactive_icon
        this.inactiveiconspreview.push({
          name: 'inactive_icon',
          url: this.imageUrl + row.inactive_icon
        })
      }
      this.formCateKey = row.key
      this.dialogStatus = 'update'
      this.dialogFormVisible = true

      this.$nextTick(() => {
        this.$refs['cateForm'].clearValidate()
      })
    },

    updateCate() {
      this.isSubmit = true
      const encodeData = JSON.stringify(this.formTempData)
      updateCateList({
        id: this.updateId,
        name: encodeData,
        active_icon: this.activeIcon,
        inactive_icon: this.inactiveIcon
      }).then((res) => {
        if (res.status === true) {
          this.isSubmit = false
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: res.msg,
            type: 'success',
            duration: 2000
          })
          this.fetchGameCateList()
        } else {
          this.$notify({
            title: '失败',
            message: res.msg,
            type: 'error',
            duration: 2000
          })
          this.isSubmit = false
        }
      }).catch((e) => {
        this.$notify({
          title: '警告',
          message: e.msg,
          type: 'warning',
          duration: 2000
        })
        console.log(e)
        this.isSubmit = false
      })
    },

    handleDelete(row) {
      const rowId = row.id
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCateList({ id: rowId }).then((res) => {
          if (res.status === true) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.fetchGameCateList()
        }).catch((e) => {
          this.$notify({
            title: '警告',
            message: e.msg,
            type: 'warning',
            duration: 2000
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.game-category {
  position: relative;

  .game-category-table {
    .game-category-add-button {
      margin-bottom: 20px;
    }
  }

  .cateform-title {
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
