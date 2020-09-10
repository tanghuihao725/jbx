import Vue from 'vue'
import Vuex from 'vuex'
import data from '@/data.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: ""
    },
    spaceIndex: 0,
    // 本地文件
    userData: data.users,
    spaceData: data.spaceData,
    
  },
  getters: {
    user: state => state.user,
    spaceIndex: state => state.spaceIndex,
    userData: state => state.userData,
    spaceData: state => state.spaceData,
  },
  mutations: {
    setSpaceIndex: (state, { spaceIndex }) => state.spaceIndex = spaceIndex,
    setUser: (state, userInfo) => state.user = userInfo,
    unLogin: state => state.user = { name: '' },
    applyAuth: (state, { authId }) => {
      const { name, isManager } = state.user
      state.userData[isManager?"manager":"commonUsers"][name].applyingAuth[state.spaceIndex].push(authId)
    }
  },
  actions: {
    doLogin: ({ commit }, { name, password, isManager }) => {
      const users = isManager ? data.users.manager : data.users.commonUsers
      if (!users[name])
        return Promise.reject('用户名不存在')
      else if (users[name].password !== password)
        return Promise.reject('密码错误')
      commit('setUser', {
        name,
        isManager,
        ...users[name]
      })
      return Promise.resolve()
    },
    applyAuth: ({ commit }, { authId }) => {

    }
  },
  modules: {
  }
})


