<template>
  <div class="game-history">
    <AccountHeader title="GAME HISTORY" />
    <div class="content">
      <div class="title">
        {{ $tt("game_history") }}
      </div>

      <div v-loading="isLoading" v-if="isLoading"></div>
      <div class="game-history-list" v-else>
        <div class="list-content" v-if="list.length > 0 && totalList != 0">
          <table>
            <tr>
              <th>{{ $tt("game_history_table.game_type") }}</th>
              <th>{{ $tt("game_history_table.game_name") }}</th>
              <th>{{ $tt("game_history_table.bet_money") }}</th>
              <th>{{ $tt("game_history_table.gain") }}</th>
              <th>{{ $tt("game_history_table.bet_time") }}</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ item.gameType }}</td>
              <td>{{ item.gameName }}</td>
              <td>{{ item.betMoney }}</td>
              <td :class="isNegative(item.winMoney) ? 'negative' : 'positive'">
                {{ item.winMoney }}
              </td>
              <td>{{ item.betTime | getReadAbleTime }}</td>
            </tr>
          </table>
          <div class="list-pagenation">
            <el-pagination
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="totalList"
              :current-page="pageNum"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
        <div class="desc" v-else>
          {{ $tt("no_gameHistory_found") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "GameHistory",
  meta: {
    auth: true,
  },
  data() {
    return {
      isLoading: false,
      list: [],
      totalList: 0,
      pageSize: 15,
      pageNum: 1,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.getGameHistory();
  },
  filters: {
    getReadAbleTime(timeStamp) {
      // const milliseconds = timeStamp;
      // const date = new Date(milliseconds);
      // const readableTime = date.toLocaleString();
      return dayjs(parseInt(timeStamp)).format("YYYY/MM/DD HH:mm:ss");
    },
  },
  methods: {
    getGameHistory() {
      if (this.user) {
        var userId = this.user.id;
      }
      this.isLoading = true;
      this.$api
        .requestByPost("/hall/v2/evoGame/getGameHistory", {
          userId: userId,
          pageSize: this.pageSize,
          pageNum: this.pageNum,
        })
        .then((res) => {
          const { code, msg, rows, total } = res;
          this.isLoading = false;

          if (code != 200) {
            this.$notify({
              title: "Warning",
              message: msg,
              type: "warning",
              duration: 2000,
            });
            return false;
          }

          this.list = rows;
          this.totalList = total;
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
          this.isLoading = false;
        });
    },

    isNegative(v) {
      if (v < 0) {
        return true;
      } else {
        return false;
      }
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.getGameHistory();
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/gameHistory.scss";
@import "/assets/scss/mobile/gameHistory.scss";
</style>
