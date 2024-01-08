<template>
  <div class="api">
    <AccountHeader title="TOKEN CREATION" />
    <div class="content">
      <div class="api-box">
        <div class="title">
          {{ $tt("token_creation") }}
        </div>
        <div class="desc">
          {{ $tt("token_creation_disclaimer") }}
        </div>
        <div class="desc">
          {{ $tt("token") }}
        </div>
        <div class="token">
          <el-input placeholder=" " v-model="token" :disabled="isDisable">
            <template slot="append">
              <i @click="copy" class="el-icon-copy-document"></i>
            </template>
          </el-input>
        </div>
      </div>
      <div class="api-box share">
        <div class="left">
          {{ $tt("do_not_share_this") }}
        </div>
        <div
          class="right"
          :class="isReveal ? 'revealed' : ''"
          @click="handleReveal"
        >
          {{ $tt("reveal") }}
        </div>
      </div>
      <div class="api-box active-token" v-if="isReveal">
        <div class="title">
          {{ $tt("active_tokens") }}
        </div>
        <div class="desc">
          {{ $tt("active_token_desc") }}
        </div>
        <div class="token-table">
          <table>
            <tr>
              <th>{{ $tt("device") }}</th>
              <th>{{ $tt("ip_address") }}</th>
              <th>{{ $tt("created") }}</th>
              <th>{{ $tt("updated") }}</th>
              <th></th>
            </tr>
            <tr v-for="(item, index) in tokenList" :key="index">
              <td>{{ item.device }}</td>
              <td>{{ item.ip }}</td>
              <td>{{ item.created }}</td>
              <td>{{ item.updated }}</td>
              <td class="deactivate">
                <div class="button">
                  {{ $tt("deactivate") }}
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="desc center">
          {{ $tt("deactivate_desc") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "API",
  meta: {
    auth: true,
  },
  data() {
    return {
      token: "",
      isReveal: false,
      isDisable: true,
      tokenList: [
        {
          device:
            "Mozilla/5.0 (Windows NT 10.0; Win64; X64) AppleWebKit/537.36 (KHTML, Like Gecko) Chrome/111.0.0.0 Safari/537.36",
          ip: "45.121.37.90",
          created: "3/20/2023, 10:06:26 AM",
          updated: "3/20/2023, 10:06:26 AM",
        },
      ],
    };
  },
  methods: {
    handleReveal() {
      this.isReveal = true;
      this.isDisable = false;
      this.token = "abcdefghijklmnopqr";
    },
    copy() {
      var copyText = this.token;
      if (this.isReveal) {
        navigator.clipboard.writeText(copyText);
      }
    },
  },
};
</script>

<style lang="scss" type="text/css">
@import "/assets/scss/web/api.scss";
@import "/assets/scss/mobile/api.scss";
</style>
