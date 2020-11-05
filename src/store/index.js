import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)


export default new Vuex.Store({
  plugins:[persistedstate({storage:window.sessionStorage})],
  state: {
    isLogin:false,
    token:'',
    menus:[]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
