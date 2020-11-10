import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)


export default new Vuex.Store({
  plugins:[persistedstate({storage:window.sessionStorage})],
  state: {
    token:'',
    user:{},
    menus:[],
  },
  mutations: {
    tokenM:(state,payload)=>{
      state.token = payload
    },
    userM:(state,playload)=>{
      state.user = playload
    },
    menusM:(state,playload)=>{
      state.menus = [...playload]
    }
  },
  actions: {
  },
  modules: {
  }
})
