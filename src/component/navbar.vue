<template>
  <b-navbar toggleable="md" type="dark" variant="info" id="navbar">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">桂林市凤集小学</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item v-for="(link,index) in links" :href="link.url" :key="index">{{link.title}}</b-nav-item>
        <!-- <b-nav-item href="#" @click="$emit('showtraningrank')">查看排名</b-nav-item> -->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form
          target="_blank"
          action="https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu"
        >
          <b-input-group>
            <b-form-input size="sm" type="text" placeholder="百度搜索" name="wd"/>
            <b-input-group-append>
              <b-button size="sm" type="submit">
                <i class="fas fa-search"></i>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-nav-form>
        <div v-show="user">
          <b-dropdown
            v-if="user"
            id="ddown-sm"
            size="sm"
            :text="user.info.username"
            class="m-2"
            right
          >
            <b-dropdown-item v-show="user.info.admin" @click="$emit('showlinkmng')">管理链接</b-dropdown-item>
            <b-dropdown-divider v-show="user.info.admin"></b-dropdown-divider>
            <b-dropdown-item @click="$emit('signout')">退出</b-dropdown-item>
          </b-dropdown>
        </div>
        <b-btn
          v-show="!user"
          id="loginbutt"
          variant="secondary"
          size="sm"
          style="margin-left:10px;"
          :disabled="loginpopshow"
        >登录</b-btn>
      </b-navbar-nav>
    </b-collapse>
    <b-popover
      container="navbar"
      target="loginbutt"
      :show.sync="loginpopshow"
      placement="bottom"
      ref="popover"
    >
      <template slot="title">
        <b-btn @click="loginpopshow=false" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-btn>登录
      </template>
      <div>
        <b-form @submit="signin">
          <b-form-group label="用户名：" label-for="username" description="请输入用户名">
            <b-form-input
              required
              size="sm"
              class="mr-sm-2"
              type="text"
              v-model="userinfo.username"
              placeholder="用户名"
            />
          </b-form-group>

          <b-form-group label="密码" label-for="password" description="请输入密码">
            <b-form-input
              required
              size="sm"
              class="mr-sm-2"
              type="password"
              v-model="userinfo.password"
              placeholder="密码"
            />
          </b-form-group>
          <b-button
            v-show="showsigninloading"
            size="sm"
            type="button"
            class="my-2 my-sm-0"
            variant="success"
          >
            <img src="src/assets/loading.gif" style="width:20px;height:20px;margin-right:10px;">
          </b-button>
          <b-button
            v-show="!showsigninloading"
            size="sm"
            type="submit"
            class="my-2 my-sm-0"
            id="loginbutton"
            variant="success"
          >登录</b-button>
          <b-button size="sm" variant="secondary" @click="loginpopshow=false">取消</b-button>
          <b-popover
            disabled
            target="loginbutton"
            :show="logintip.status"
            @shown="logintipshow"
            placement="bottomleft"
          >{{logintip.message}}</b-popover>
          <!--  -->
        </b-form>
        <!-- <b-btn @click="onClose" size="sm" variant="danger">Cancel</b-btn>
        <b-btn @click="onOk" size="sm" variant="primary">Ok</b-btn>-->
      </div>
    </b-popover>
  </b-navbar>
</template>


<script>
export default {
  data() {
    return {
      loginpopshow: false,
      userinfo: {
        username: "",
        password: ""
      }
    };
  },
  props: ["showsigninloading", "logintip", "user","links"],

  methods: {
    signin(evt) {
      evt.preventDefault();
      // let userinfo = {
      //   username: this.$refs.username.value ,
      //   password: this.$refs.password.value
      // };
      this.$emit("signin", this.userinfo);
    },
    logintipshow() {
      setTimeout(() => {
        this.logintip.status = false;
      }, 5000);
    },
  }
};
</script>
