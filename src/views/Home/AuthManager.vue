<template>
  <div class="auth-manager">
    <div class="container">
      <h1>权限列表</h1>
      <div class="table-list obtained-auth">
        <h3 class="table-title">已授权列表</h3>
        <el-table :data="obtainedAuthMapArr.arr" border style="width: 100%">
          <el-table-column prop="username" label="属于者" align="center"></el-table-column>
          <el-table-column prop="id" label="权限id" align="center"></el-table-column>
          <el-table-column prop="name" label="权限名称" align="center"></el-table-column>
          <el-table-column prop="desc" label="权限描述" align="center"></el-table-column>
          <el-table-column prop="comId" label="组织ID" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="160">
            <template slot-scope="scope">
              <el-button @click="handleWithdraw(scope.row, 'auth')" type="danger" size="small">收回</el-button>
            </template>
          </el-table-column>
        </el-table>
        <h3 class="table-title">申请中列表</h3>
        <el-table :data="applyingAuthMapArr.arr" border style="width: 100%">
          <el-table-column prop="username" label="申请人" align="center"></el-table-column>
          <el-table-column prop="id" label="权限id" align="center"></el-table-column>
          <el-table-column prop="name" label="权限名称" align="center"></el-table-column>
          <el-table-column prop="desc" label="权限描述" align="center"></el-table-column>
          <el-table-column prop="comId" label="组织ID" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="160">
            <template slot-scope="scope">
              <el-button @click="handlePass(scope.row)" type="success" size="small">通过</el-button>
              <el-button
                @click="handleWithdraw(scope.row, 'applyingAuth')"
                type="warning"
                size="small"
              >拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      fresh: 0,
    };
  },
  computed: {
    ...mapGetters(["user", "spaceIndex", "userData", "spaceData"]),
    authMap() {
      const { spaceIndex, spaceData } = this;
      const map = {};
      const authData = spaceData[spaceIndex]?.auth;
      authData.forEach((auth) => {
        map[auth?.id] = auth;
      });
      return map;
    },
    obtainedAuthMapArr() {
      const { spaceIndex, userData } = this;
      const map = {},
        arr = [];
      const users = userData?.commonUsers;
      Object.keys(users).forEach((username) => {
        const tempArr = users[username]?.auth[spaceIndex]?.map(
          (authId) => this.authMap[authId]
        );
        map[username] = tempArr;
        arr.push(...tempArr.map((auth) => ({ username, ...auth })));
      });
      return { map, arr, fresh: this.fresh };
    },
    applyingAuthMapArr() {
      const { spaceIndex, userData } = this;
      const map = {},
        arr = [];
      const users = userData?.commonUsers;
      Object.keys(users).forEach((username) => {
        const tempArr = users[username]?.applyingAuth[spaceIndex]?.map(
          (authId) => this.authMap[authId]
        );
        map[username] = tempArr;
        arr.push(...tempArr.map((auth) => ({ username, ...auth })));
      });
      return { map, arr, fresh: this.fresh };
    },
  },
  methods: {
    ...mapMutations(["withdrawAuth", "passAuth"]),
    handleWithdraw(data, type = "auth") {
      const { username, id } = data;
      this.withdrawAuth({ username, authId: id, type });
    },
    handlePass(data) {
      const { username, id } = data;
      this.passAuth({ username, authId: id });
    },
    freshTable() {
      this.fresh += 1;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  flex-direction: column;
  padding: 30px 0;
  width: 100%;
  height: 1200px;
  overflow: auto;
}
.table-list {
  padding: 60px 150px;
  text-align: left;

  .table-title {
    margin: 30px 0;
  }
}
</style>