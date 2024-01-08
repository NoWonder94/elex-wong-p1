<template>
  <div class="app-container banner">
    <div class="Banner-table">
      <el-button class="Banner-add-button" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>

      <el-table
        v-loading.lock="bannerListLoading"
        :data="bannerList"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="序号"
          width="130"
        />
        <el-table-column
          prop="link"
          label="林克"
          width="130"
        >
          <template slot-scope="scope">
            <a target="_blank" :href="`${scope.row.link}`">{{ scope.row.link }}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="横幅(pc)"
          align="center"
        >
          <template slot-scope="scope">
            <img style="width:150px" :src="`${imageUrl}${scope.row.img}`">
          </template>
        </el-table-column>
        <el-table-column
          label="横幅(mobile)"
          align="center"
        >
          <template slot-scope="scope">
            <img style="width:150px" :src="`${imageUrl}${scope.row.m_img}`">
          </template>
        </el-table-column>
        <el-table-column
          prop="sort_index"
          label="排序"
          width="130"
          sortable
        />
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
        <el-form-item label="横幅上传(pc)">
          <el-upload
            ref="banners"
            class="upload-file"
            :action="uploadActionUrl"
            :headers="uploadHeader"
            :on-change="handleChange"
            :limit="1"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :file-list="bannerpreview"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />

          </el-upload>
        </el-form-item>
        <el-form-item label="横幅上传(mobile)">
          <el-upload
            ref="mobileBanner"
            class="upload-file"
            :action="uploadActionUrl"
            :headers="uploadHeader"
            :on-change="handleChangeMobile"
            :limit="1"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :file-list="bannerMobilepreview"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />

          </el-upload>
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="formTempData.link" />
        </el-form-item>
        <el-form-item label="sort">
          <el-input v-model="formTempData.sort_index" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button v-if="isSubmit" type="primary">
          <i class="el-icon-loading" />
        </el-button>
        <el-button v-else type="primary" @click="dialogStatus==='create'?createBanner():updateBanner()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBannerList, createBannerList, updateBannerList, deleteBannerList } from '@/api/banner'
import { getUserToken } from '@/utils/auth'

export default {
  name: 'Banner',
  data() {
    return {
      bannerList: null,
      bannerListLoading: true,
      // dialog form
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      updateId: 0,
      formTempData: {
        img: '',
        link: '',
        sort_index: 1
      },
      isSubmit: false,
      /* upload */
      uploadActionUrl: `${process.env.VUE_APP_BASE_API}/api/Admin/uploadFile?type=img`,
      uploadHeader: '',
      bannerpreview: [],
      bannerMobilepreview: [],
      imageUrl: process.env.VUE_APP_BASE_API
    }
  },
  created() {
    this.fetchBannerList()
    this.uploadHeader = {
      'Authorization': 'Bearer ' + getUserToken()
    }
  },
  methods: {
    fetchBannerList() {
      // const loading = this.$loading({
      //   lock: true
      // })

      this.bannerListLoading = true
      getBannerList().then(res => {
        if (res.status === true) {
          this.bannerList = res.data
          this.bannerListLoading = false
        } else {
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning',
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

    resetCateTemp() {
      this.bannerpreview = []
      this.bannerMobilepreview = []
      this.formTempData = {
        img: '',
        link: '',
        sort_index: 1
      }
    },

    handleChange(file) {
      if (file.response != null) {
        if (file.response.status !== true) {
          this.$refs.banner.clearFiles()
          this.$notify({
            title: '警告',
            message: file.response.msg,
            type: 'warning',
            duration: 2000
          })
        } else {
          this.formTempData['img'] = file.response.data.filePath
          this.uploadSuccesPreview = file.response.data.fileUrl
        }
      }
    },

    handleChangeMobile(file) {
      if (file.response != null) {
        if (file.response.status !== true) {
          this.$refs.mobileBanner.clearFiles()
          this.$notify({
            title: '警告',
            message: file.response.msg,
            type: 'warning',
            duration: 2000
          })
        } else {
          this.formTempData['m_img'] = file.response.data.filePath
          this.uploadSuccesMobilePreview = file.response.data.fileUrl
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

    createBanner() {
      this.isSubmit = true
      createBannerList(this.formTempData).then((res) => {
        if (res.status === true) {
          this.isSubmit = false
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: res.msg,
            type: 'success',
            duration: 2000
          })
          this.fetchBannerList()
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
      this.formTempData = Object.assign({}, row)
      console.log('update: ' + row.id)
      console.log(row)
      this.updateId = row.id
      if (row.img !== null) {
        this.bannerpreview.push({
          name: 'banner',
          url: this.imageUrl + row.img
        })
      }
      if (row.m_img !== null) {
        this.bannerMobilepreview.push({
          name: 'banner',
          url: this.imageUrl + row.m_img
        })
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['cateForm'].clearValidate()
      })
    },

    updateBanner() {
      this.isSubmit = true
      updateBannerList({
        id: this.updateId,
        ...this.formTempData
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
          this.fetchBannerList()
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
        deleteBannerList({ id: rowId }).then((res) => {
          if (res.status === true) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.fetchBannerList()
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
.banner {
  position: relative;
}
</style>
