import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)


// 导航守卫，全局前置守卫
router.beforeEach((to, from, next) => {
  let token = store.state.token
  // if(to.name !== "Login" && to.meta.isAuth && !token){
  //   next({name:"Login"})
  // }else if(to.name !== "Login" && to.meta.isAuth && token){
  //   next()
  // }else{
  //   next()
  // }
  if (to.matched.some(record => record.meta.isAuth)) {
    if (!token) {
      next({
        name: "Login"
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(to => {
  document.title = to.meta.title + "--会议报名管理系统"
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')