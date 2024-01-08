<template>
  <div class="memberList">
    <div class="memberList-back web">
      <i class="el-icon-back back-icon" @click="back"></i>
      {{ $t("memberList.title") }}
    </div>
    <div class="back-title mobile" @click="back">
      <i class="el-icon-back"></i>
      {{ $t("memberList.title") }}
    </div>

    <div class="memberList-wrapping-mobile">
      <div class="mobile">
        <ContentTitle :text="$t('memberList.commissionDetails')" />
      </div>
      <div class="memberList-label-bar">
        <div class="web">
          <ContentTitle :text="$t('memberList.commissionDetails')" />
        </div>

        <div class="memberList-filter-input">
          <div class="filter-input-label">{{ $t("memberList.memberId") }}</div>
          <input
            v-model="userID"
            class="filter-input"
            type="text"
            :placeholder="$t('memberList.plsEnterMemberID')"
          />
          <div
            class="greenGradientButtonBg filter-input-submit"
            @click="getProxyUser"
          >
            {{ $t("memberList.check") }}
          </div>
        </div>
      </div>

      <div class="memberList-details-table">
        <el-table :data="memberLists" height="400" style="width: 100%">
          <el-table-column
            prop="user_id"
            :label="$t('memberList.account')"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="bet"
            :label="$t('memberList.betAmount')"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="deposit"
            :label="$t('memberList.depositAmount')"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="win"
            :label="$t('memberList.loseAmount')"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="commission_money"
            :label="$t('memberList.commissionAmount')"
            align="center"
          ></el-table-column>
          <template slot="empty">
            <div class="memberList-table-nodata" v-if="memberLists.length == 0">
              <img src="../../../assets/img/no_data.png" />
              <div>{{ $t("no_data") }}</div>
            </div>
          </template>
        </el-table>
      </div>

      <div class="memberList-details-pagination" v-if="memberLists.length != 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="20"
          :total="totalCount"
          :current-page="memberListPage"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ContentTitle from "../../../components/ContentTitle.vue";
export default {
  name: "MemberList",
  head() {
    return {
      title: this.$t("memberList.title"),
    };
  },
  components: { ContentTitle },
  data() {
    return {
      userID: "",
      memberLists: [],
      memberListPage: 1,
      totalCount: 0,
    };
  },
  mounted() {
    this.getProxyUser();
  },
  methods: {
    back() {
      this.$router.back();
    },

    getProxyUser() {
      let params = { user_id: this.userID, page: this.memberListPage };

      this.$api
        .requestByPost("Proxy/users", params)
        .then((result) => {
          if (result.status == true) {
            this.memberLists = result.data.list;
            this.totalCount = result.data.count;
          } else {
            this.$notiflix.Notify.failure(
              result.msg ? result.msg : this.$t("message.error"),
              {
                showOnlyTheLastOne: true,
              }
            );
          }
        })
        .catch((error) => {
          this.$notiflix.Notify.failure(this.$t("message.error"), {
            showOnlyTheLastOne: true,
          });
        });
    },

    handleCurrentChange(val) {
      this.memberListPage = val;
      this.getProxyUser();
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/pc/memberList.scss";
@import "/assets/scss/mobile/memberList.scss";
</style>
