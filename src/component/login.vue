<template>
  <form
    class="modal fade"
    id="loginform"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    @submit.stop.prevent="submitform"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">登录</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

<div id="alert1" class="alert alert-danger alert-dismissible fade show" v-show="logintip.status" role="alert">
  {{logintip.message}}
  <button type="button" class="close" @click="logintip.status=false" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
          <!-- <form id="form1"> -->
  <div class="form-group">
    <label for="username">用户名</label>
    <input type="text" required class="form-control" id="username" name="username" placeholder="请输入用户名">
  </div>
  <div class="form-group">
    <label for="password">密码</label>
    <input type="password" class="form-control" id="password" name="password" placeholder="密码" required>
  </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          <button v-show="showsigninloading" class="btn btn-primary" type="button">
          <img
              src="../assets/loading.gif"
              style="width:20px;height:20px;"
            ></button>
          <button class="btn btn-primary" type="submit" id="loginbutton" v-show="!showsigninloading">登录</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    let self = this;
    $("#loginform").on("hidden.bs.modal", function(e) {
      self.$emit("hidden");
    });
    $("#alert1").on('closed.bs.alert',function(){
        self.logintip.status=false
    })
  },
  props: ["show",'showsigninloading','logintip','user'],
  watch: {
    show: function(val, oldval) {
      if (val) {
        $("#loginform").modal("toggle");
      }
    },
    user:function(val,oldval){
      if(val){
        $("#loginform").modal("hide");
      }
    }
  },
  methods: {
    submitform(evt) {
        let formdata={
            username:$("#username").val(),
            password:$("#password").val()
        }
        this.$emit('login',formdata)      
    },
  }
};
</script>
