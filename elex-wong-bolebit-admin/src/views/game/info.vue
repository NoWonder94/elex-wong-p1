<template>
  <div class="app-container game-info">
    <div v-loading.lock="gameInfoLoading">
      <el-form
        ref="gameForm"
        :model="tempData"
        label-position="left"
        label-width="100px"
        class="game-submit-form"
      >
        <p class="gameform-title">游戏名称</p>
        <el-form-item
          v-for="(item, index) in languages"
          :key="`title-${index}`"
          :label="item.language"
        >
          <el-input v-model="tempData.name[item.key]" />
        </el-form-item>
        <div style="height: 15px" />
        <p class="gameform-title">游戏简介</p>
        <el-form-item
          v-for="(item, index) in languages"
          :key="`desc-${index}`"
          :label="item.language"
        >
          <el-input v-model="tempData.desc[item.key]" type="textarea" />
        </el-form-item>

        <div style="height: 15px" />
        <div class="game-form-flex">
          <el-form-item label="游戏编码">
            <el-input v-model="tempData.game_id" />
          </el-form-item>
          <el-form-item label="游戏类型">
            <el-select v-model="tempData.cate_id" placeholder="请选择游戏类型">
              <el-option
                v-for="option in gameCateList"
                :key="option.id"
                :label="option.category_name.ch"
                :value="option.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="tempData.status" />
          </el-form-item>
        </div>

        <div style="height: 15px" />
        <div class="game-form-grid">
          <el-form-item label="热门">
            <el-switch v-model="tempData.hot" />
          </el-form-item>
          <el-form-item label="免费游戏">
            <el-switch v-model="tempData.free_game" />
          </el-form-item>
          <el-form-item label="红利游戏">
            <el-switch v-model="tempData.bonus_game" />
          </el-form-item>
          <el-form-item label="html5">
            <el-switch v-model="tempData.html5" />
          </el-form-item>
          <el-form-item label="Jackpot">
            <el-switch v-model="tempData.progressive_jackpot" />
          </el-form-item>
        </div>

        <div style="height: 15px" />
        <div class="game-form-grid">
          <el-form-item label="中奖线">
            <el-input v-model="tempData.lines" />
          </el-form-item>
          <el-form-item label="卷轴">
            <el-input v-model="tempData.reels" />
          </el-form-item>
          <el-form-item label="RTP">
            <el-input v-model="tempData.rtp" />
          </el-form-item>
          <el-form-item label="Max Bet">
            <el-input v-model="tempData.max_bet" />
          </el-form-item>
        </div>

        <div style="height: 15px" />
        <div class="game-form-flex" style="flex: 1">
          <el-form-item label="mode">
            <el-select
              v-model="tempData.gamble_mode"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择游戏模式"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="tempData.sort_index" />
          </el-form-item>
        </div>

        <div style="height: 15px" />
        <!-- @change="handleCheckedlanguagesChange" -->
        <div class="game-form-flex">
          <el-form-item label="支持语言">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <div v-if="all_languages.length > 0">
              <el-checkbox-group
                v-model="tempData.support_languages"
                @change="handleCheckedlanguagesChange"
              >
                <el-checkbox
                  v-for="(sp_language, index) in all_languages"
                  :key="index"
                  :label="sp_language"
                >
                  <img
                    class="form-flags"
                    :src="require(`@/assets/flags/${sp_language}.png`)"
                    :alt="`${sp_language}.png`"
                  />
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </div>

        <!-- animation cover -->
        <!-- <div style="height: 15px" />
        <div class="game-form-flex">
          <div class="">
            <p class="gameform-title">游戏封面图</p>
            <el-upload
              ref="upload"
              class="upload-file"
              drag
              :action="uploadActionUrl"
              :headers="uploadHeader"
              :on-change="handleChange"
              :limit="1"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">只能上传zip文件</div>
            </el-upload>
            <iframe
              v-if="isEdit && frontCoverPreview != ''"
              :src="`${imageUrl}/${frontCoverPreview}`"
            />
            <iframe
              v-if="uploadSuccesPreview != ''"
              :src="uploadSuccesPreview"
            />
          </div>
          <div class="">
            <p class="gameform-title">游戏封面图（手机）</p>
            <el-upload
              ref="uploadMobile"
              class="upload-file"
              drag
              :action="uploadActionUrl"
              :headers="uploadHeader"
              :on-change="handleChangeMobile"
              :limit="1"
              :on-exceed="handleExceed"
              :on-remove="handleMobileRemove"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">只能上传zip文件</div>
            </el-upload>
            <iframe
              v-if="isEdit && fronCoverMobilePreview != ''"
              :src="`${imageUrl}/${fronCoverMobilePreview}`"
            />
            <iframe
              v-if="uploadSuccesMobilePreview != ''"
              :src="uploadSuccesMobilePreview"
            />
          </div>
        </div> -->

        <!-- picture cover -->
        <div style="height: 15px" />
        <div class="game-form-flex">
          <div class="">
            <p class="gameform-title">游戏封面图</p>
            <el-upload
              ref="upload"
              class="upload-file"
              drag
              :action="uploadImageActionUrl"
              :headers="uploadHeader"
              :on-change="handleChange"
              :limit="1"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">
                只能上传jpeg|jpg|png文件
              </div>
            </el-upload>
            <iframe
              v-if="isEdit && frontCoverPreview != ''"
              :src="`${imageUrl}/${coverImagePreview}`"
            />
            <iframe
              v-if="uploadSuccesPreview != ''"
              :src="uploadSuccesPreview"
            />
          </div>
          <div class="">
            <p class="gameform-title">游戏封面图（手机）</p>
            <el-upload
              ref="uploadMobile"
              class="upload-file"
              drag
              :action="uploadImageActionUrl"
              :headers="uploadHeader"
              :on-change="handleChangeMobile"
              :limit="1"
              :on-exceed="handleExceed"
              :on-remove="handleMobileRemove"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">
                只能上传jpeg|jpg|png文件
              </div>
            </el-upload>
            <iframe
              v-if="isEdit && fronCoverMobilePreview != ''"
              :src="`${imageUrl}/${mobileCoverImagePreview}`"
            />
            <iframe
              v-if="uploadSuccesMobilePreview != ''"
              :src="uploadSuccesMobilePreview"
            />
          </div>
        </div>

        <div style="height: 15px" />
        <p class="gameform-title">游戏截图</p>
        <el-upload
          ref="uploadMultiImages"
          class="upload-file"
          list-type="picture-card"
          multiple
          :action="uploadImageActionUrl"
          :headers="uploadHeader"
          :on-change="handleMultiImageChange"
          :limit="4"
          :on-exceed="handleMultiUploadExceed"
          :file-list="multiArrList"
        >
          <i class="el-icon-plus" />
          <div slot="tip" class="el-upload__tip">只能上传jpeg|jpg|png文件</div>
        </el-upload>
      </el-form>
    </div>

    <div class="footer-submit-buttons">
      <el-button @click="redirectBackToList()"> 取消 </el-button>
      <el-button v-if="isSubmit" type="primary">
        <i class="el-icon-loading" />
      </el-button>
      <el-button
        v-else
        type="primary"
        @click="isEdit ? updateGame() : createGame()"
      >
        确认
      </el-button>
    </div>
  </div>
</template>

<script>
import { getCateList } from "@/api/category";
import { updateGameList, createGameList, getGameDetail } from "@/api/game";
import { getUserToken } from "@/utils/auth";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      gameInfoLoading: false,
      updateGameId: this.$route.params.id,
      /* cate list */
      gameCateList: null,
      /* checkbox for "all" */
      checkAll: false,
      isIndeterminate: true,
      all_languages: [],
      /* form */
      tempData: {
        name: {},
        desc: {},
        game_id: "",
        cate_id: null,
        front_cover: "",
        mobile_front_cover: "",
        cover_image: "",
        mobile_cover_image: "",
        demo_images: [],
        reels: 0,
        lines: null,
        rtp: "0%",
        max_bet: null,
        max_win: null,
        hot: false,
        free_game: false,
        bonus_game: false,
        html5: false,
        progressive_jackpot: false,
        gamble_mode: [],
        sort_index: 1,
        support_languages: [],
        status: true,
      },
      options: [
        {
          value: "buy_free_spin",
          label: "buy_free_spin",
        },
        {
          value: "free_spin_onoff",
          label: "free_spin_onoff",
        },
        {
          value: "buy_bonus",
          label: "buy_bonus",
        },
      ],
      /* upload */
      uploadActionUrl: `${process.env.VUE_APP_BASE_API}/api/Admin/uploadFile?type=gwd`,
      uploadHeader: "",
      uploadSuccesPreview: "",
      uploadSuccesMobilePreview: "",
      /* upload multiple image  */
      uploadImageActionUrl: `${process.env.VUE_APP_BASE_API}/api/Admin/uploadFile?type=img`,
      multiArrList: [],
      /* page route */
      isEdit: false,
      isSubmit: false,
      /* fetch data during edit */
      frontCoverPreview: "",
      fronCoverMobilePreview: "",
      coverImagePreview: "",
      mobileCoverImagePreview: "",
      imageUrl: process.env.VUE_APP_BASE_API,
    };
  },

  computed: {
    ...mapGetters(["languages"]),
  },

  created() {
    if (this.$route.params.type === "create") {
      this.isEdit = false;
    } else if (this.$route.params.type === "update") {
      const type = this.$route.params.type;
      this.isEdit = type === "update";
      const id = this.$route.params.id;
      this.fetchGameData(id);
    } else {
      console.log("empty params");
    }

    this.fetchGameCateList();
    this.getAllLanguagesByKey();
    this.uploadHeader = {
      Authorization: "Bearer " + getUserToken(),
    };
  },

  methods: {
    redirectBackToList() {
      this.resetTemp();
      this.$router.push("/game/index");
    },

    fetchGameCateList() {
      getCateList()
        .then((res) => {
          if (res.status === true) {
            this.gameCateList = res.data;
          }
        })
        .catch((e) => {
          this.$notify({
            title: "警告",
            message: e,
            type: "warning",
            duration: 2000,
          });
          console.log(e);
        });
    },

    fetchGameData(id) {
      this.gameInfoLoading = true;
      this.multiArrList = [];
      getGameDetail(id)
        .then((res) => {
          if (res.status === true) {
            this.tempData = Object.assign({}, res.data);
            res.data.demo_images.forEach((element, index) => {
              const response = {
                status: true,
                data: {
                  filePath: element,
                },
              };
              this.multiArrList.push({
                name: index,
                url: this.imageUrl + element,
                response,
              });
            });
            this.tempMultiImage = this.multiArrList;
            this.frontCoverPreview = res.data.front_cover;
            this.fronCoverMobilePreview = res.data.mobile_front_cover;
            this.coverImagePreview = res.data.cover_image;
            this.mobileCoverImagePreview = res.data.mobile_cover_image;
            this.gameInfoLoading = false;
          } else {
            this.$notify({
              title: "警告",
              message: res.msg,
              type: "warning",
              duration: 2000,
            });
          }
        })
        .catch((e) => {
          this.$notify({
            title: "警告",
            message: e,
            type: "warning",
            duration: 2000,
          });
          console.log(e);
          this.gameInfoLoading = false;
        });
    },

    handleChange(file) {
      this.frontCoverPreview = "";
      this.uploadSuccesPreview = "";
      if (file.response != null) {
        if (file.response.status !== true) {
          this.$refs.upload.clearFiles();
          this.$notify({
            title: "警告",
            message: file.response.msg,
            type: "warning",
            duration: 2000,
          });
        } else {
          // this.tempData.front_cover = file.response.data.filePath;
          this.tempData.cover_image = file.response.data.filePath;
          this.uploadSuccesPreview = file.response.data.fileUrl;
        }
      }
    },

    handleRemove() {
      this.uploadSuccesPreview = "";
    },

    handleChangeMobile(file) {
      this.fronCoverMobilePreview = "";
      this.uploadSuccesMobilePreview = "";
      if (file.response != null) {
        if (file.response.status !== true) {
          this.$refs.uploadMobile.clearFiles();
          this.$notify({
            title: "警告",
            message: file.response.msg,
            type: "warning",
            duration: 2000,
          });
        } else {
          // this.tempData.mobile_front_cover = file.response.data.filePath;
          this.tempData.mobile_cover_image = file.response.data.filePath;
          this.uploadSuccesMobilePreview = file.response.data.fileUrl;
        }
      }
    },

    handleMobileRemove() {
      this.uploadSuccesMobilePreview = "";
    },

    handleMultiImageChange(file, fileList) {
      console.log("file", file);
      console.log("list", fileList);
      this.tempMultiImage = fileList;
    },

    getImageList() {
      var imgList = [];
      if (this.tempMultiImage == null) {
        return [];
      }
      this.tempMultiImage.forEach((element) => {
        if (element.response != null && element.response.status === true) {
          imgList.push(element.response.data.filePath);
        }
      });

      return imgList;
    },

    handleExceed(files) {
      this.$notify.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`
      );
    },

    handleMultiUploadExceed(files) {
      this.$notify.warning(
        `当前限制选择 4 个文件，本次选择了 ${files.length} 个文件`
      );
    },

    resetTemp() {
      this.tempData = {
        name: {},
        desc: {},
        game_id: "",
        cate_id: null,
        front_cover: "",
        mobile_front_cover: "",
        demo_images: [],
        reels: 0,
        lines: null,
        rtp: "0%",
        max_bet: null,
        max_win: null,
        hot: false,
        free_game: false,
        bonus_game: false,
        html5: false,
        progressive_jackpot: false,
        gamble_mode: [],
        sort_index: 0,
        support_languages: [],
        status: true,
      };
      this.uploadSuccesPreview = "";
      this.uploadSuccesMobilePreview = "";
    },

    createGame() {
      this.isSubmit = true;
      const cloneTempData = Object.assign({}, this.tempData);
      cloneTempData.name = JSON.stringify(this.tempData.name);
      cloneTempData.desc = JSON.stringify(this.tempData.desc);
      cloneTempData.demo_images = JSON.stringify(this.getImageList());
      cloneTempData.gamble_mode = JSON.stringify(this.tempData.gamble_mode);
      cloneTempData.support_languages = JSON.stringify(
        this.tempData.support_languages
      );
      createGameList(cloneTempData)
        .then((res) => {
          if (res.status === true) {
            this.isSubmit = false;
            this.$notify({
              title: "成功",
              message: res.msg,
              type: "success",
              duration: 2000,
            });
            this.redirectBackToList();
          } else {
            this.isSubmit = false;
            this.$notify({
              title: "失败",
              message: res.msg,
              type: "error",
              duration: 2000,
            });
          }
        })
        .catch((e) => {
          this.$notify({
            title: "警告",
            message: e,
            type: "warning",
            duration: 2000,
          });
          console.log(e);
          this.isSubmit = false;
        });
    },

    updateGame() {
      this.isSubmit = true;
      const gameId = this.updateGameId;
      const cloneTempData = Object.assign({}, this.tempData);
      cloneTempData.name = JSON.stringify(this.tempData.name);
      cloneTempData.desc = JSON.stringify(this.tempData.desc);
      cloneTempData.demo_images = JSON.stringify(this.getImageList());
      cloneTempData.gamble_mode = JSON.stringify(this.tempData.gamble_mode);
      cloneTempData.support_languages = JSON.stringify(
        this.tempData.support_languages
      );
      const submitData = {
        id: gameId,
        demo_images: JSON.stringify(cloneTempData.demo_images),
        ...cloneTempData,
      };
      updateGameList(submitData)
        .then((res) => {
          if (res.status === true) {
            this.isSubmit = false;
            this.$notify({
              title: "成功",
              message: res.msg,
              type: "success",
              duration: 2000,
            });
            this.redirectBackToList();
          } else {
            this.$notify({
              title: "警告",
              message: res.msg,
              type: "warning",
              duration: 2000,
            });
            console.log(res);
            this.isSubmit = false;
          }
        })
        .catch((e) => {
          this.$notify({
            title: "警告",
            message: e.msg,
            type: "warning",
            duration: 2000,
          });
          console.log(e);
          this.isSubmit = false;
        });
    },

    getAllLanguagesByKey() {
      const arr = [];
      this.languages.forEach((lang) => {
        arr.push(lang.key);
      });

      this.all_languages = arr;
    },

    handleCheckAllChange(val) {
      this.tempData.support_languages = val ? this.all_languages : [];
      this.isIndeterminate = false;
    },

    handleCheckedlanguagesChange(value) {
      var checkedCount = value.length;
      this.checkAll = checkedCount === this.all_languages.length;
      console.log(this.all_languages.length);
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.all_languages.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.game-info {
  position: relative;
  .game-submit-form {
    margin-left: 30px;
    padding-bottom: 100px;

    .gameform-title {
      font-weight: bold;
      font-size: 16px;
    }
    .el-form-item {
      padding-right: 20px;
    }

    .game-form-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(auto, 1fr);
      grid-column-gap: 10px;
      grid-row-gap: 10px;
      text-transform: capitalize;
    }

    .game-form-flex {
      display: flex;
      gap: 20px;
    }

    .form-flags {
      border: 1px solid #000000;
    }

    .edit-image-display-block {
      position: relative;
      margin-top: 10px;
      display: flex;

      .edit-image-block {
        position: relative;
        width: 180px;
        // height: 150px;
        margin-right: 10px;
        transition: 2s;

        &:hover {
          .edit-image-block-overlay {
            opacity: 1;
          }
        }

        .tempdata-image {
          position: relative;
          width: 100%;
        }

        .edit-image-block-overlay {
          position: absolute;
          top: 0;
          opacity: 0;
          width: 180px;
          height: 90px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.7);

          i {
            color: #ffffff;
            font-size: larger;
          }
        }
      }
    }
  }

  .footer-submit-buttons {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    // background-color: #bb3636;
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    /* box shadow */
    box-shadow: 10px -5px 15px -13px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 10px -5px 15px -13px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px -5px 15px -13px rgba(0, 0, 0, 0.75);
  }
}
</style>
