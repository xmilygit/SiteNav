<template>
  <div id="app">
    <navbar @login="showloginmodal=true" @logout="signout" :user="user"></navbar>
    <login
      :show="showloginmodal"
      @hidden="showloginmodal=false"
      @login="login"
      :showsigninloading="showsigninloading"
      :logintip="logintip"
      :user="user"
    ></login>
    <loading :title="loadbacktitle" :show="showloadingback"></loading>
  </div>
</template>

<script>
import axios from 'axios'
import navbar from "./component/navbar.vue";
import login from "./component/login.vue";
import loading from "./component/loading.vue";
export default {
  name: "app",
  data() {
    return {
      showloginmodal: false,
      showsigninloading: false,
      logintip: {
        status: false,
        message: "default",
      },
      user:undefined,
      loadbacktitle:"正在保存...",
      showloadingback:false,
    };
  },
  components: {
    navbar,
    login,
    loading,
  },
  watch: {},
  mounted() {
    this.whenrefresh();
  },
  methods: {
    //用户登录
    login(userinfo) {
      let self = this;
      this.showsigninloading = true;
      axios
        .post("/sys/login", userinfo)
        .then(this.signin_cb)
        .catch(function(err) {
          self.showsigninloading = false;
          self.logintip = {
            status: true,
            message: "系统故障：" + err.message
          };
        });
    },
    //用户登录回调
    signin_cb(res) {
      this.showsigninloading = false;
      if (res.data.error) {
        this.logintip.message = res.data.message;
        this.logintip.status = true;
        return;
      }
      this.user = {
        token: res.data.token,
        info: res.data.userinfo
      };
      sessionStorage.setItem("user", JSON.stringify(this.user));
    },
    //退出用户登录
    signout() {
      sessionStorage.removeItem("user");
      this.user = null;
    },
    //当未退出刷新页面时
    whenrefresh() {
      console.log(sessionStorage.getItem("user"));
      let user = JSON.parse(sessionStorage.getItem("user"));
      let self = this;
      if (user) {
        this.showloading("加载数据...", true);
        axios
          .post("/sys/validsignin", { token: user.token })
          .then(this.whenrefresh_cb)
          .catch(function(error) {
            self.showloading();
            self.user = null;
            sessionStorage.removeItem("user");
          });
      }
    },
    //刷新页面后获取session中的用户信息回调
    whenrefresh_cb(res) {
      this.showloading();
      if (res.data.signin) {
        this.user = JSON.parse(sessionStorage.getItem("user"));
        return;
      } else {
        if (this.user) {
          this.user = null;
          sessionStorage.removeItem("user");
        }
      }
    },
    //显示loading
    showloading(message, show) {
      message = message || "正在保存...";
      this.loadbacktitle = message;
      if (show) this.showloadingback = true;
      else this.showloadingback = false;
    },
  }
};
</script>

<style>
</style>
