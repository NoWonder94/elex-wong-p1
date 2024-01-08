<template>
  <div class="app-container game-list">
    <div class="game-list-table">
      <div class="filter-container">
        <el-button
          class="game-list-add-button"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate()"
        >
          添加
        </el-button>

        <div>
          <el-select
            v-model="filterGameCate"
            placeholder="游戏类型"
            clearable
            style="width: 150px"
            class="filter-item"
            @change="fetchGameList"
          >
            <el-option
              v-for="(item, index) in gameCateList"
              :key="index"
              :label="item.category_name.ch"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>

      <el-table
        v-loading.lock="gameListLoading"
        :data="gameLists"
        style="width: 100%"
        height="80vh"
        border
      >
        <el-table-column
          prop="game_id"
          label="游戏编码"
          width="100"
          align="center"
          fixed
        />
        <el-table-column label="游戏名称" prop="name" align="center">
          <el-table-column
            v-for="(item, index) in languages"
            :key="`title-${index}`"
            :label="item.language"
            :prop="`name.${item.key}`"
            width="130"
            align="center"
          />
        </el-table-column>
        <el-table-column label="游戏叙述" align="center">
          <el-table-column
            v-for="(item, index) in languages"
            :key="`desc-${index}`"
            :label="item.language"
            :prop="`desc.${item.key}`"
            width="250"
          />
        </el-table-column>
        <el-table-column prop="cate" label="游戏类型" align="center" />
        <el-table-column
          prop="front_cover"
          label="游戏封面图"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <!-- <a target="_blank" :href="`${baseUrl}${scope.row.front_cover}`">{{ scope.row.front_cover }}</a> -->
            <a target="_blank" :href="`${baseUrl}${scope.row.cover_image}`">
              <img
                style="width: 100px"
                :src="`${baseUrl}${scope.row.cover_image}`"
              />
            </a>
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile_front_cover"
          label="游戏封面图（手机）"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <!-- <a target="_blank" :href="`${baseUrl}${scope.row.mobile_front_cover}`">{{ scope.row.mobile_front_cover }}</a> -->
            <a
              target="_blank"
              :href="`${baseUrl}${scope.row.mobile_cover_image}`"
            >
              <img
                style="width: 100px"
                :src="`${baseUrl}${scope.row.mobile_cover_image}`"
              />
            </a>
          </template>
        </el-table-column>
        <el-table-column
          prop="demo_images"
          label="游戏截图"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <div v-for="(image, index) in scope.row.demo_images" :key="index">
              <img style="width: 150px" :src="`${baseUrl}${image}`" />
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="free_game" label="免费游戏" align="center">
          <template slot-scope="scope">
            <el-tag
              size="medium"
              :type="scope.row.free_game === 1 ? 'success' : 'info'"
            >
              {{ scope.row.free_game === 1 ? "是" : "否" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="bonus_game" label="红利游戏" align="center">
          <template slot-scope="scope">
            <el-tag
              size="medium"
              :type="scope.row.bonus_game === 1 ? 'success' : 'info'"
            >
              {{ scope.row.bonus_game === 1 ? "是" : "否" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="gamble_mode"
          label="游玩模式"
          align="center"
          width="150"
        />
        <el-table-column prop="hot" label="热门" align="center">
          <template slot-scope="scope">
            <el-tag
              size="medium"
              :type="scope.row.hot === 1 ? 'success' : 'info'"
            >
              {{ scope.row.hot === 1 ? "是" : "否" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="html5" label="支援html5" align="center">
          <template slot-scope="scope">
            <el-tag
              size="medium"
              :type="scope.row.html5 === 1 ? 'success' : 'info'"
            >
              {{ scope.row.html5 === 1 ? "是" : "否" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lines" label="行数" align="center" />
        <el-table-column prop="max_bet" label="最高投注" align="center" />
        <el-table-column
          prop="progressive_jackpot"
          label="progressive jackpot"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              size="medium"
              :type="scope.row.progressive_jackpot === 1 ? 'success' : 'info'"
            >
              {{ scope.row.progressive_jackpot === 1 ? "是" : "否" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="reels" label="卷轴" align="center" />
        <el-table-column prop="rtp" label="玩家回报率 RTP" align="center" />
        <el-table-column
          prop="sort_index"
          label="排序"
          align="center"
          sortable
        />
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
              {{ scope.row.status === 1 ? "开启" : "关闭" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template slot-scope="{ row, $index }">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              编辑
            </el-button>
            <el-button
              v-if="row.status != 'deleted'"
              size="mini"
              type="danger"
              @click="handleDelete(row, $index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getCateList } from "@/api/category";
import { getGameList, deleteGameList } from "@/api/game";
import { mapGetters } from "vuex";

export default {
  name: "GameList",
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      /* cate list */
      gameCateList: null,
      /* game list */
      gameLists: null,
      gameListLoading: true,
      filterGameCate: "",
    };
  },
  computed: {
    ...mapGetters(["languages"]),
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.fetchGameCateList();
      this.fetchGameList();
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

    fetchGameList() {
      this.gameListLoading = true;
      getGameList({ lang: "ch", cate: this.filterGameCate })
        .then((res) => {
          if (res.status === true) {
            this.gameLists = res.data;
            this.gameListLoading = false;
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

    handleCreate() {
      this.$router.push({ name: "GameEditor", params: { type: "create" } });
    },

    handleUpdate(row) {
      this.$router.push({
        name: "GameEditor",
        params: { type: "update", id: row.id },
      });
    },

    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteGameList({ id: row.id }).then((res) => {
            if (res.status === true) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
            this.fetchGameList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.game-list {
  position: relative;

  .filter-container {
    display: flex;
    justify-content: space-between;
  }

  .game-list-table {
    .game-list-add-button {
      margin-bottom: 20px;
    }
  }
}
</style>
