<template>
  <div id="app">
    <navbar
      @signin="signin"
      @signout="signout"
      @showlinkmng="linkmngmodalshow=true"
      @changepassword="changepswmodalshow=true"
      :links="links"
      :showsigninloading="showsigninloading"
      :user="user"
      :logintip="logintip"
    ></navbar>
    <loading :title="loadbacktitle" :show="showloadingback"></loading>
    <linkmng
      :show="linkmngmodalshow"
      :user="user"
      @hidden="linkmngmodalshow=false"
      @showloading="showloading"
    ></linkmng>
    <div style="width:550px;height:367px;margin:20px auto;background-color:#eeeeee;">
      <focus></focus>
      <changepsw
        :show="changepswmodalshow"
        @hidden="changepswmodalshow=false"
      ></changepsw>
    </div>
  </div>
</template>

<script>
import navbar from "./component/navbar.vue";
import loading from "./component/loading.vue";
import linkmng from "./component/linklist.vue";
import focus from "./component/focus.vue";
import changepsw from "./component/changepsw.vue";
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      showsigninloading: false,
      changepswmodalshow: false,
      logintip: {
        status: false,
        message: "default"
      },
      user: undefined,
      loadbacktitle: "正在保存...",
      showloadingback: false,
      linkmngmodalshow: false,
      links: []
    };
  },
  components: {
    navbar,
    loading,
    linkmng,
    focus,
    changepsw
  },
  mounted() {
    this.whenrefresh();
    this.getlinks();
  },
  methods: {
    //获取链接
    getlinks() {
      let self = this;
      this.showloading("加载数据...", true);
      axios
        .get("/sitenav/getlinks")
        .then(this.getlinks_cb)
        .catch(function(error) {
          self.showloading();
          self.logintip = {
            status: true,
            message: "系统故障：" + error.message
          };
        });
    },
    //获取链接回调
    getlinks_cb(res) {
      this.showloading();
      if (res.data.error) {
        this.showalert("加载链接失败！错误原因：" + res.data.message, "danger");
        return;
      }
      this.links = res.data.linklist;
    },
    //用户登录
    signin(userinfo) {
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
      // console.log(sessionStorage.getItem("user"));
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
    }
  }
};
</script>

<style>
.margin_l {
  margin-left: 5px;
}
</style>
