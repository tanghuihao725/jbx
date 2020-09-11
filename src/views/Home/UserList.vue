<template>
  <div class="user-list">
    <div class="container">
      <h1>用户列表</h1>
      <el-table :data="authTableData" border style="width: 100%">
        <el-table-column prop="username" label="用户名" align="center" width="150"></el-table-column>
        <el-table-column prop="password" label="密码" align="center" width="250"></el-table-column>
        <el-table-column label="已有权限" align="center">
          <template slot-scope="scope">
            <el-tag
              class="tag"
              type="success"
              v-for="auth in scope.row.auth"
              :key="auth.id"
            >{{auth.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请中权限" align="center">
          <template slot-scope="scope">
            <el-tag
              class="tag"
              type="warning"
              v-for="auth in scope.row.applyingAuth"
              :key="auth.id"
            >{{auth.name}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
    authTableData() {
      const { spaceIndex, userData } = this;
      const users = userData?.commonUsers;
      return Object.keys(users).map((username) => {
        return {
          username,
          password: users[username].password,
          auth: users[username]?.auth[spaceIndex]?.map(
            (authId) => this.authMap[authId]
          ),
          applyingAuth: users[username]?.applyingAuth[spaceIndex]?.map(
            (authId) => this.authMap[authId]
          ),
        };
      });
    },
  },
};
</script>


<style lang="less" scoped>
.container {
  padding: 30px 40px;
  width: 100%;

  .tag{
      margin: 3px 4px;
  }
}
</style>