import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import imgView from "@/views/imgView";

Vue.use(VueRouter)

//重写Vue-Router原型链上的router.push/router.replace方法，捕获Promise异常
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// const originalPush = VueRouter.prototype.replace;
// VueRouter.prototype.replace = function replace(location) {
//     return originalPush.call(this, location).catch(err => err)
// };

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      title: "登录"
    }
  },
  {
    path: '/img-view',
    name: 'imgView',
    component: imgView,
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/home',
    children: [
      {
        path:'home',
        name:'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        meta:{
          title:'首页',
          isAuth:true
        }
      },
      {
        path: 'registration-statistics',
        name: 'registration-statistics',

        component: () => import(/* webpackChunkName: "registration-statistics" */ '../views/SignInManagement/RegistrationStatistics.vue'),
        meta: {
          title: "报名统计",
          isAuth: true,
        }
      },
      {
        path: 'sign-in-statistics',
        name: 'sign-in-statistics',

        component: () => import(/* webpackChunkName: "sign-in-statistics" */ '../views/SignInManagement/SignInStatistics.vue'),
        meta: {
          title: "签到统计",
          isAuth: true,
        }
      },
      {
        path: 'create-meeting',
        name: 'create-meeting',

        component: () => import(/* webpackChunkName: "create-meeting" */ '../views/MeetingManagement/CreateMeeting.vue'),
        meta: {
          title: "创建会议",
          isAuth: true,
        }
      },
      {
        path: 'meeting-list',
        name: 'meeting-list',

        component: () => import(/* webpackChunkName: "meeting-list" */ '../views/MeetingManagement/MeetingList.vue'),
        meta: {
          title: "会议列表",
          isAuth: true,
        }
      },
      {
        path: 'create-apply-form',
        name: 'create-apply-form',

        component: () => import(/* webpackChunkName: "create-apply-form" */ '../views/ApplyFormManagement/CreateApplyForm.vue'),
        meta: {
          title: "创建报名表",
          isAuth: true,
        }
      },
      {
        path: 'apply-form-list',
        name: 'apply-form-list',

        component: () => import(/* webpackChunkName: "apply-form-list" */ '../views/ApplyFormManagement/ApplyFormList.vue'),
        meta: {
          title: "历史报名表",
          isAuth: true,
        }
      },
      {
        path: 'edit-account-info',
        name: 'edit-account-info',

        component: () => import(/* webpackChunkName: "edit-account-info" */ '../views/SystemSetting/EditAccountInfo.vue'),
        meta: {
          title: "账号信息",
          isAuth: true,
        }
      },
      {
        path: 'edit-password',
        name: 'edit-password',

        component: () => import(/* webpackChunkName: "edit-password" */ '../views/SystemSetting/EditPassword.vue'),
        meta: {
          title: "修改密码",
          isAuth: true,
        }
      }
    ]
  },


]

const router = new VueRouter({
  routes
})

export default router
