<template>
  <div class="header-container">
    <div class="left-area">
      <img class="logo" src="@/assets/logo.png" alt />
      <span class="title">数据共享平台</span>
    </div>
    <div class="right-area">
      <span>用户名：{{ user.name || '未登录'}}</span>
      <div class="space">
        <el-select v-model="value" @change="handleSpaceChange">
          <el-option
            v-for="(item, index) in spaceData"
            :key="item.spaceName"
            :label="item.spaceName"
            :value="index"
          ></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      value: 0,
    };
  },
  computed: {
    ...mapGetters(["user", "spaceIndex", "spaceData"]),
  },
  methods: {
    ...mapMutations(['setSpaceIndex']),
    handleSpaceChange(spaceIndex) {
      this.setSpaceIndex({ spaceIndex })
    }
  }
};
</script>

<style lang="less" scoped>
.header-container {
  height: 60px;
  background-color: black;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left-area {
    height: 30px;
    display: flex;
    margin-left: 50px;

    .logo {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .title {
      font-size: 20px;
      margin: 0 0 0 15px;
    }
  }

  .right-area {
    display: flex;
    margin-right: 50px;
    height: 50px;
    line-height: 50px;

    .space {
      color: #ff4400;
      margin-left: 30px;
    }
  }
}
</style>