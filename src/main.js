import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import vueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(vueAxios,Axios)
//导航守卫，全局前置守卫
// router.beforeEach((to,from,next)=>{
//   let token = 
//   if(to.name !== "Login" && to.isAuth && isLogined) next({name:"Login"})
//   else next()
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
