<template>
  <div class="nav-container">
    <div class="profile">
      <img class="avatar" src="@/assets/avatar-common.png" />
      <span class="welcome-text">欢迎回来, {{ user.name }}</span>
      <router-link to="/login" class="unregister">注销</router-link>
    </div>
    <div style="width: 100%" v-for="item in nav" :key="item.title">
      <div v-if="showNav(item.showType)">
        <router-link :to="item.path" v-if="item.path" class="first-item">{{item.title}}</router-link>
        <p class="first-item no-click" v-else>{{item.title}}</p>
        <router-link
          class="second-item"
          v-for="sItem in item.children"
          :key="sItem.title"
          :to="sItem.path"
        >{{sItem.title}}</router-link>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import data from "@/data.js";
export default {
  computed: {
    ...mapGetters(["user"]),
    nav: () => data.nav,
    isManager: () => this?.user?.isManager,
  },
  methods:{
    showNav(type){
      if(this.user?.isManager && type === 'common') return false
      if(!this.user?.isManager && type === 'manager') return false
      return true
    }
  }
};
</script>


<style lang="less" scoped>
.nav-container {
  width: 400px;
  height: 100%;
  background-color: #333;
  padding: 22px 0;
  color: #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  .profile {
    display: flex;
    align-items: center;
    height: 60px;
    width: 80%;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 80px;
    font-size: 14px;
    color: #777;
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .welcome-text {
      font-size: 20px;
    }
    .unregister {
      color: orange;
      line-height: 50px;
    }
  }

  a,
  p {
    color: #ddd;
    display: block;
    height: 50px;
    line-height: 50px;
  }
  .first-item,
  .second-item {
    width: 100%;
    display: block;
    margin: 5px 0;
  }
  .first-item {
    font-size: 20px;
  }
  .no-click {
    color: #888;
  }
  .second-item {
    font-size: 18px;
    padding-left: 50px;
  }
  a:hover,
  a.router-link-exact-active {
    color: #f40;
    background: #222;
  }
}
</style>