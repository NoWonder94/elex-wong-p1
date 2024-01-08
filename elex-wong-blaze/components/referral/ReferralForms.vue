<template>
  <div class="referral-forms">
    <div class="referral-forms-header">
      <div class="referral-forms-header-left">
        <div class="choose-type">
          <el-select v-model="type" @change="handleChange">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="choose-date">
          <el-date-picker
            v-model="date"
            type="daterange"
            start-placeholder="Start date"
            end-placeholder="End date"
            value-format="yyyy-MM-dd"
            @change="handleChange"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="referral-forms-header-right">
        <div class="choose-page-size">
          <el-select v-model="pageSize" @change="handleChange">
            <el-option
              v-for="item in pageSizeOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="referral-forms-content">
      <div v-if="isLoading" v-loading="isLoading"></div>
      <div v-else class="list-content">
        <div v-if="totalList > 0">
          <table>
            <tr>
              <th>{{ $tt("referral.time") }}</th>
              <th>{{ $tt("referral.user") }}</th>
              <th>{{ $tt("referral.bonus") }}</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ item.createTime | getReadAbleTime }}</td>
              <td>{{ item.userName }}</td>
              <td>{{ item.money }}</td>
            </tr>
          </table>
          <div class="pagination">
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
        <div v-else class="no-content">
          {{ $tt("referral.no_data") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReferralForms",
  data() {
    return {
      isLoading: false,
      type: "1",
      typeOptions: [
        {
          value: "1",
          label: this.$tt("referral.invitation_bonus"),
        },
        {
          value: "2",
          label: this.$tt("referral.betting_commission"),
        },
      ],
      date: [],
      pageSize: 10,
      pageSizeOptions: [{ value: 10 }, { value: 20 }, { value: 50 }],
      totalList: 0,
      pageNum: 1,
      list: [],
    };
  },
  mounted() {
    var currentDate = new Date().toJSON().slice(0, 10);
    var nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toJSON()
      .slice(0, 10);
    this.date.push(currentDate, nextWeek);
    this.getForms();
  },
  filters: {
    getReadAbleTime(timeStamp) {
      return dayjs(parseInt(timeStamp)).format("YYYY/MM/DD HH:mm:ss");
    },
  },
  methods: {
    getForms() {
      var data = {
        'queryType': this.type, // 1:奖金 2:佣金
        'pageNum': this.pageNum,
        'pageSize': this.pageSize,
        'startTime': this.date[0],
        'endTime': this.date[1],
      };
      this.isLoading = true;

      this.$api
        .requestByPost("/hall/v2/referFriend/forms", data)
        .then((res) => {
          const { code, rows, msg } = res;
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
          this.totalList = this.list.length;
        })
        .catch((error) => {
          this.$notify({
            title: "Warning",
            message: error,
            type: "warning",
            duration: 2000,
          });
          this.loading = false;
        });
    },
    handleChange() {
      this.pageNum = 1;
      this.getForms();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getForms();
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/referralForms.scss";
@import "/assets/scss/mobile/referralForms.scss";
</style>
