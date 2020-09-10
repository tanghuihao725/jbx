<template>
  <div class="auth-list">
    <h1 class="title">权限服务</h1>
    <el-table :data="tableData" border style="width: 90%">
      <el-table-column fixed prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="name" label="属性名" align="center"></el-table-column>
      <el-table-column prop="desc" label="属性描述" align="center"></el-table-column>
      <el-table-column prop="comId" label="组织ID" align="center"></el-table-column>
      <el-table-column prop="statu" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.statu === 'auth'" type="success">已申请</el-tag>
          <el-tag v-if="scope.row.statu === 'applying'" type="warning">申请中</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.statu" @click="applyAuth({authId: scope.row.id})">申请</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["user", "spaceIndex", "userData", "spaceData"]),
    tableData() {
      return this.spaceData[this.spaceIndex].auth.map((authData) => ({
        ...authData,
        statu: this.authStatu[authData.id],
      }));
    },
    authStatu() {
      // 权限映射
      const authMap = {};
      const { name, isManager } = this.user;
      if (!name || !this.userData) return {};
      const { auth, applyingAuth } = this.userData[
        isManager ? "manager" : "commonUsers"
      ][name];
      auth[this.spaceIndex].forEach((authId) => (authMap[authId] = "auth"));
      applyingAuth[this.spaceIndex].forEach(
        (authId) => (authMap[authId] = "applying")
      );
      return authMap;
    },
  },
  methods: {
    ...mapMutations(["applyAuth"]),
    doApplyAuth() {

    },
  },
};
</script>

<style lang="less" scoped>
.auth-list {
  display: flex;
  flex-direction: column !important;

  .title{
      margin: 60px 0;
  }
}
</style>