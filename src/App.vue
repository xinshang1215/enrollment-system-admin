<template>
  <div id="app">
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
              <span slot="title"><a-icon type="user" />subnav 1</span>
              <a-menu-item key="1"> option1 </a-menu-item>
              <a-menu-item key="2"> option2 </a-menu-item>
              <a-menu-item key="3"> option3 </a-menu-item>
              <a-menu-item key="4"> option4 </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title"><a-icon type="laptop" />subnav 2</span>
              <a-menu-item key="5"> option5 </a-menu-item>
              <a-menu-item key="6"> option6 </a-menu-item>
              <a-menu-item key="7"> option7 </a-menu-item>
              <a-menu-item key="8"> option8 </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <span slot="title"><a-icon type="notification" />subnav 3</span>
              <a-menu-item key="9"> option9 </a-menu-item>
              <a-menu-item key="10"> option10 </a-menu-item>
              <a-menu-item key="11"> option11 </a-menu-item>
              <a-menu-item key="12"> option12 </a-menu-item>
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
  name: "App",
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
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
    border-radius: 6px;
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
