import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    isAuth:false,
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta:{
      title:"登录"
    }
  },
  {
    path:'/',
    name:'Main',
    component:Main,
    redirect:'/registration-statistics',
    children:[
      {
        path: 'registration-statistics',
        name: 'registration-statistics',
        isAuth:true,
        component: () => import(/* webpackChunkName: "registration-statistics" */ '../views/SignInManagement/RegistrationStatistics.vue'),
        meta:{
          title:"报名统计"
        }
      },
      {
        path: 'sign-in-statistics',
        name: 'sign-in-statistics',
        isAuth:true,
        component: () => import(/* webpackChunkName: "sign-in-statistics" */ '../views/SignInManagement/SignInStatistics.vue'),
        meta:{
          title:"签到统计"
        }
      },
      {
        path: 'create-meeting',
        name: 'create-meeting',
        isAuth:true,
        component: () => import(/* webpackChunkName: "create-meeting" */ '../views/MeetingManagement/CreateMeeting.vue'),
        meta:{
          title:"创建会议"
        }
      },
      {
        path: 'meeting-list',
        name: 'meeting-list',
        isAuth:true,
        component: () => import(/* webpackChunkName: "meeting-list" */ '../views/MeetingManagement/MeetingList.vue'),
        meta:{
          title:"会议列表"
        }
      },
      {
        path: 'create-apply-form',
        name: 'create-apply-form',
        isAuth:true,
        component: () => import(/* webpackChunkName: "create-apply-form" */ '../views/ApplyFormManagement/CreateApplyForm.vue'),
        meta:{
          title:"创建报名表"
        }
      },
      {
        path: 'apply-form-list',
        name: 'apply-form-list',
        isAuth:true,
        component: () => import(/* webpackChunkName: "apply-form-list" */ '../views/ApplyFormManagement/ApplyFormList.vue'),
        meta:{
          title:"历史报名表"
        }
      },
      {
        path: 'edit-account-info',
        name: 'edit-account-info',
        isAuth:true,
        component: () => import(/* webpackChunkName: "edit-account-info" */ '../views/SystemSetting/EditAccountInfo.vue'),
        meta:{
          title:"账号信息"
        }
      },
      {
        path: 'edit-password',
        name: 'edit-password',
        isAuth:true,
        component: () => import(/* webpackChunkName: "edit-password" */ '../views/SystemSetting/EditPassword.vue'),
        meta:{
          title:"修改密码"
        }
      }
    ]
  },
  

]

const router = new VueRouter({
  routes
})

export default router
