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
              {{ user.name }} <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a-icon type="setting" />修改信息
              </a-menu-item>
              <a-menu-item key="2" @click="logOut">
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
            :default-open-keys="['sub0','sub1','sub2']"
            :style="{ height: '100%', borderRight: 0 }"
          >
            <a-menu-item key="1" @click="clickMenu('home')">
              <a-icon type="home" />
              <span>首页</span>
            </a-menu-item>
            <a-sub-menu v-for="menu in menus" :key="menu.key">
              <span slot="title"
                ><a-icon :type="menu.icon" />{{ menu.name }}</span
              >
              <a-menu-item
                v-for="item in menu.submenu"
                :key="item.key"
                @click="clickMenu(item.link)"
              >
                {{ item.name }}
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 0 24px;overflow:hidden" >
          <a-breadcrumb style="margin: 16px 0" v-if="!isHome">
            <a-breadcrumb-item
              ><a-icon
                :type="breadcrumb.icon"
                style="margin-right:6px;"
                v-if="Object.keys(breadcrumb).length !== 0"
              />{{ breadcrumb.parent }}</a-breadcrumb-item
            >
            <a-breadcrumb-item>{{ breadcrumb.son }}</a-breadcrumb-item>
          </a-breadcrumb>
          <a-breadcrumb style="margin: 16px 0" v-else>
            <a-breadcrumb-item
              ><a-icon
                type="home"
                style="margin-right:6px;"
              />首页</a-breadcrumb-item
            >
          </a-breadcrumb>
          <a-layout-content
            :style="{
              background: '#fff',
              margin: 0,
              minHeight: '480px',
              overflowY:'auto'
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
Vue.use(Layout)
  .use(Menu)
  .use(Dropdown)
  .use(Icon)
  .use(Breadcrumb);
export default {
  name: "Main",
  data() {
    return {
      collapsed: false,
      menus: [],
      user: {},
      routerName: "",
      breadcrumb: {},
    };
  },
  computed: {
    isHome: function(){
      let r = this.$route.name,c=false
      if (r === "home") {
        c = true
      }else{
        c=false
      }
      return c
    }
  },
  created() {
    this.user = this.$store.state.user;
    this.menus = this.$store.state.menus;
    this.routerName = this.$route.name;

    if (this.menus.length === 0) {
      this.getMenuList();
    } else {
      this.getBread(this.routerName);
    }
  },
  methods: {
    getMenuList: function() {
      let token = this.$store.state.token;
      this.axios
        .get("/getmenus", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          let data = res.data.data;
          this.$store.commit("menusM", data);
          this.menus = this.$store.state.menus;
          this.getBread(this.routerName);
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    },

    clickMenu: function(val) {
      this.$router.push({ name: val });
      this.getBread(val);
    },

    getBread: function(val) {
      let parent = "",
        icon = "",
        son = "";
      this.menus.find((item) => {
        item.submenu.find((record) => {
          if (record.link === val) {
            parent = item.name;
            icon = item.icon;
            son = record.name;
          }
        });
      });
      this.breadcrumb = {
        parent: parent,
        icon: icon,
        son: son,
      };
    },

    logOut: function() {
      this.$store.commit("tokenM", "");
      sessionStorage.removeItem("vuex");
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
.main {
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
    border-radius: 50%;
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
