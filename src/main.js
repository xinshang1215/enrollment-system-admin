import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//导航守卫，全局前置守卫
router.beforeEach((to,from,next)=>{
  let token = 
  if(to.name !== "Login" && to.isAuth && isLogined) next({name:"Login"})
  else next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
