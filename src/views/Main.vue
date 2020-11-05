<template>
  <div class="main">
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout-header class="header">
        <div class="logo-text">
          <span>会</span>
          <h3>议报名系统</h3>
        </div>
        <div class="user-info-box">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              超级管理员 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a-icon type="setting" />修改信息
              </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="poweroff" />退出登录
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            :style="{ height: '100%', borderRight: 0 }"
          >
          <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="user" />签到管理</span>
              <a-menu-item key="1"> 报名统计 </a-menu-item>
              <a-menu-item key="2"> 签到统计 </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title"><a-icon type="appstore" />会议管理</span>
              <a-menu-item key="3"> 会议列表 </a-menu-item>
              <a-menu-item key="4"> 创建会议 </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <span slot="title"><a-icon type="flag" />报名表管理</span>
              <a-menu-item key="5"> 创建报名表 </a-menu-item>
              <a-menu-item key="6"> 历史报名表 </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub4">
              <span slot="title"><a-icon type="setting" />系统管理</span>
              <a-menu-item key="7"> 账号信息 </a-menu-item>
              <a-menu-item key="8"> 修改密码 </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>List</a-breadcrumb-item>
            <a-breadcrumb-item>App</a-breadcrumb-item>
          </a-breadcrumb>
          <a-layout-content
            :style="{
              background: '#fff',
              padding: '24px',
              margin: 0,
              minHeight: '280px',
            }"
          >
            <router-view />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Vue from "vue";
import { Layout, Menu, Dropdown, Icon, Breadcrumb } from "ant-design-vue";
Vue.use(Layout).use(Menu).use(Dropdown).use(Icon).use(Breadcrumb);
export default {
  name: "Main",
  data() {
    return {
      collapsed: false,
      menus:[]
    };
  },
  created(){
    this.getMenuList()

  },
  methods:{
    getMenuList:function(){
      let token = sessionStorage.getItem("token")
      this.axios.get('/getmenus',{
        header:{
          Authorization: "Bear " + token
        }
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(JSON.stringify(err))
      })
    }
  }
};
</script>

<style lang="scss">
.main{
  height:100%;
}
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
.ant-layout {
  height: 100%;
}
.ant-layout-header {
  padding: 0 20px;
}
.logo-text {
  float: left;
  h3 {
    color: rgba(255, 255, 255, 0.85);
    font-weight: bold;
    font-size: 20px;
    padding-left: 45px;
  }
  span {
    float: left;
    height: 40px;
    width: 40px;
    margin-top: 12px;
    border-radius:50%;
    background: rgba(255, 255, 255, 0.85);
    color: #001529;
    font-size: 24px;
    font-weight: bold;
    line-height: 40px;
    text-align: center;
  }
}
.user-info-box {
  float: right;
}
.ant-dropdown-link {
  color: rgba(255, 255, 255, 0.8);
}
</style>