<template>
  <div class="history">
    <LottieLoading v-if="isLoading" />
    <div class="history-table" v-else>
      <el-table
        :data="historyLists"
        style="width: 100%"
        border
        height="70vh"
        >
        <el-table-column
          prop="chi_name"
          label="游戏名"
          width="180"
          fixed>
        </el-table-column>

        <el-table-column
          prop="currency_title"
          label="币种"
          width="100">
        </el-table-column>

        <el-table-column
          prop="before_gold"
          label="金额（前）"
          width="150">
        </el-table-column>

        <el-table-column
          prop="type_msg"
          label="上下分"
          width="100">
        </el-table-column>

        <el-table-column
          prop="after_gold"
          label="金额（后）"
          width="150">
        </el-table-column>

        <el-table-column
          align="center"
          prop="json"
          label="操作"
          width="140"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-document"
              @click="handleClick(scope.row)"
            >
              详情
            </el-button>

          </template>
        </el-table-column>
      </el-table>

      <div class="history-table-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="costPage"
          :page-sizes="[20, 50, 100, 200, 300]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalList">
        </el-pagination>
      </div>
    </div>

    <MiddleModal v-show="isMiddleModalShow" @close="closeModal">
      <div class="modal-title"> 消耗记录 </div>
      <hr>
      <div class="modal-json">
        <json-viewer
          :expand-depth=2
          copyable
          expanded
          :value="jsonData"
        ></json-viewer>
      </div>

    </MiddleModal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isLoading: false,
        isMiddleModalShow: false,
        historyLists: [],
        jsonData: '',
        costPage: 1,
        pageSize: 20,
        totalList: 0,
      }
    },

    mounted () {
      this.getNewCost();
    },

    methods: {
      getNewCost() {
        this.isLoading = true;
        let params = {
          page: this.costPage,
          page_size: this.pageSize,
        };

        this.$api
          .requestByPost("user/User/newcost", params)
          .then((result) => {
            if (result.status == true) {
              console.log(result.data);
              this.historyLists = result.data.data;
              this.totalList = result.data.total;
              this.isLoading = false;
            }
            this.isLoading = false;
          })
          .catch((error) => {
            console.log(error);
            this.$notiflix.Notify.failure(this.$t("message.error"), {
              showOnlyTheLastOne: true,
            });
          });
      },

      handleClick(row) {
        this.isMiddleModalShow = true;
        console.log(row.json);
        this.jsonData = JSON.parse(row.json);
        // if(row.json != '') {
        //   this.jsonData = JSON.parse(row.jsonData)
        // } else {
        //   this.jsonData = '暂无资料';
        // }
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.costPage = 1;
        this.getNewCost();
      },

      handleCurrentChange(val) {
        this.costPage = val;
        this.getNewCost();
      },

      closeModal() {
        this.isMiddleModalShow = false;
      },
    },
  }
</script>

<style lang="scss">
  @import "/assets/scss/pc/history.scss";
</style>
