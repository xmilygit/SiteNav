<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">桂林市凤集小学</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
    </ul>
    <!-- <button class="btn btn-outline-success my-2 my-sm-0" @click="showpop=!showpop">open/close</button> -->
    <form class="form-inline my-2 my-lg-0" action="https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu">
      <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> -->
      <div class="input-group">
          <!-- <div class="input-group-prepend">    
              <span class="input-group-text"><i class="fas fa-search"></i></span>
          </div> -->
      <input class="form-control" type="search" placeholder="百度搜索" name="wd">
      <div class="input-group-append">
      <button class="btn btn-outline-success" type="submit"><i class="fas fa-search"></i></button>
      </div>
      </div>
    </form>
    <ul class="navbar-nav" style="margin-left:10px;">
      <li class="nav-item" v-if="!user">
        <button class="btn btn-outline-success" type="button" @click="$emit('login')" key="b1">登录</button>
      </li>
      <li class="nav-item dropdown dropleft" v-else>
        <button class="btn btn-outline-success dropdown-toggle" type="button" key="b2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{user.info.username}}
        </button>
        <div class="dropdown-menu dropdown-menu-lg-left" aria-labelledby="navbarDropdown">
          <button class="dropdown-item" type="button" v-show="user.info.admin">添加链接</button>
          <div class="dropdown-divider" v-show="user.info.admin"></div>
          <button class="dropdown-item" type="button" @click="$emit('logout')">退出</button>
        </div>
      </li>
    </ul>
    
  </div>

</nav>
</template>


<script>
$(function () {
  $('[data-toggle="popover"]').popover()
})
export default {
    data(){
        return{
            showpop:true
        }
    },
    props:['user'],
    methods:{
    }
}
</script>

