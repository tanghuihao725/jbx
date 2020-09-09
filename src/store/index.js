import Vue from 'vue'
import Vuex from 'vuex'
import data from '@/data.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { 
      name: "THH"
    },
    spaceIndex: 0,
  },
  getters: {
    user:state =>state.user,
    spaceIndex: state => state.spaceIndex,
    // 本地文件
    userData: () => data.users,
    spaceData: () => data.spaceData,
    
  },
  mutations: {
    setSpaceIndex: (state, { spaceIndex }) => state.spaceIndex = spaceIndex,
  },
  actions: {
  },
  modules: {
  }
})
