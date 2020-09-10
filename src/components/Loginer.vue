<template>
  <div class="loginer-container">
    <el-card class="login-card">
      <div class="tab-wrapper">
        <div :class="{ tab: true, active: tab === 0 }" @click="tab=0">普通用户</div>
        <div :class="{ tab: true, active: tab === 1 }" @click="tab=1">管理员</div>
      </div>
      <div class="form-wrapper">
        <form class="form">
          <div class="form-item">
            <span>用户名:</span>
            <input v-model="loginForm.name" type="text" autocomplete="off" />
          </div>
          <div class="form-item">
            <span>密码:</span>
            <input v-model="loginForm.password" type="password" autocomplete="off" @keydown.enter="handleLogin"/>
          </div>

          <div class="form-item">
            <LoginButton style="marginTop: 20px;" @click="handleLogin">登录</LoginButton>
          </div>
        </form>
      </div>
    </el-card>
  </div>
</template>

<script>
import LoginButton from "@/components/LoginButton.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        name: "",
        password: "",
      },
      tab: 0,
    };
  },
  methods: {
    ...mapActions(["doLogin"]),
    handleLogin() {
      const { loginForm, tab } = this;
      const { name, password } = loginForm;
      if (!name || !password) return;
      this.doLogin({ name, password, isManager: tab === 1 })
      .then(()=> {
        this.$router.push('/system')
       })
      .catch(message => this.$notify.error({ title: "Failed", message}))
    },
  },
  components: {
    LoginButton,
  },
};
</script>


<style lang="less">
@base-theme: #f40;
.loginer-container {
  box-sizing: border-box;
  .login-card {
    .tab-wrapper {
      display: flex;
      .tab {
        width: 50%;
        height: 50px;
        text-align: center;
        background-color: #999;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        cursor: pointer;
      }
      .active {
        background-color: #fff;
        color: @base-theme;
      }
    }
    .form-wrapper {
      display: flex;
      flex-direction: column;
      padding: 10px 0;
    }
    .form-item {
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      margin: 15px 0;
      span {
        font-size: 1rem;
        color: #aaa;
        margin-bottom: 10px;
      }
      input {
        outline: none;
        font-size: 1rem;
        line-height: 2rem;
        height: 2.5rem;
        padding: 0 8px;
        border-radius: 5px;
        border: 2px solid #aaa;
        transition: border 0.5s;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      input[type="number"] {
        -moz-appearance: textfield;
      }
      input:focus {
        border: 2px solid #f40;
      }
    }
  }
  .el-card {
    border: none;
    border-radius: 10px;
  }
  .el-card__body {
    padding: 0 0 10px 0;
    border-radius: 4px;
  }
}
</style>