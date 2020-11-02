import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    isAuth:false,
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    isAuth:true,
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
