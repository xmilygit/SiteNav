<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">桂林市凤集小学</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="#" @click="$emit('showtraningrecord')" v-show="user">我的成绩列表</b-nav-item>
        <b-nav-item href="#" @click="$emit('showtraningrank')">查看排名</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form target="_blank" action="https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu">
          <b-form-input
            required
            size="sm"
            class="mr-sm-2"
            type="text"
            placeholder="百度搜索"
            name="wd"
          />
          <b-button size="sm" type="submit" class="my-2 my-sm-0">
            百度一下
          </b-button>
          <b-button id="loginbutt" variant="secondary" size="sm" class="margin_l" :disabled="loginpopshow">登录</b-button>
        </b-nav-form> 
      </b-navbar-nav>
    </b-collapse>
    <b-popover target="loginbutt"
               triggers="click"
               :show.sync="loginpopshow"
               placement="bottom"
               ref="popover"
               @show="popshow"
               @hidden="pophidden"
              >
      <template slot="title">
        <b-btn @click="loginpopshow=false" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-btn>
        登录
      </template>
      <div>
        <b-form @submit="signin">
          <b-form-group 
                    label="用户名："
                    label-for="username"
                    description="请输入用户名">
          <b-form-input
            id="username"
            required
            size="sm"
            class="mr-sm-2"
            type="text"
            ref="username"
            placeholder="用户名"
          />
          </b-form-group>

          <b-form-group  
                    label="密码"
                    label-for="password"
                    description="请输入密码">
          <b-form-input
            id="password"
            required
            size="sm"
            class="mr-sm-2"
            type="password"
            ref="password"
            placeholder="密码"
          />
          </b-form-group>
          <b-button size="sm" type="submit" class="my-2 my-sm-0" id="loginbutton" variant="success">
            <img
              v-show="showsigninloading"
              src="src/assets/loading.gif"
              style="width:20px;height:20px;margin-right:10px;"
            >登录
          </b-button>
          <b-button size="sm" variant="secondary" @click="loginpopshow=false">取消</b-button>
          <b-popover
            disabled
            target="loginbutton"
            :show="logintip.status"
            @shown="logintipshow"
            placement="bottomleft"
          >{{logintip.message}}</b-popover> -->
          <!--  -->
        </b-form>
        <!-- <b-btn @click="onClose" size="sm" variant="danger">Cancel</b-btn>
        <b-btn @click="onOk" size="sm" variant="primary">Ok</b-btn> -->
      </div>
    </b-popover>
  </b-navbar>
</template>


<script>
export default {
  data() {
    return {
    };
  },
  props:['lessonlist','showsigninloading','logintip','user'],

  methods: {
     signin(evt) {
      evt.preventDefault();
      let userinfo={
        username:this.$refs.username.localValue,
        password:this.$refs.password.localValue
      }
      this.$emit('signin',userinfo)
    },
    logintipshow() {
      setTimeout(() => {
        this.logintip.status = false;
      }, 5000);
    },
  }
};
</script>
