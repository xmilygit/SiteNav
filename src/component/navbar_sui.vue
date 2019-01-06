<template>
<div class="sui-navbar  navbar-fixed-top">
  <div class="navbar-inner">
    <div class="sui-container"><a href="#" class="sui-brand">桂林市凤集小学</a>
      <ul class="sui-nav">
        <li class="active"><a href="#">首页</a></li>
        <li><a href="#">组件</a></li>
        <li class="sui-dropdown"><a href="javascript:void(0);" data-toggle="dropdown" class="dropdown-toggle">其他 <i class="caret"></i></a>
          <ul role="menu" class="sui-dropdown-menu">
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">关于</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">项目组成员</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">版权</a></li>
          </ul>
        </li>
      </ul>
      
     <ul class="sui-nav pull-right">
      <li><a href="#">登录</a></li>
    </ul>
    <form class="sui-form pull-right" action="https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu">
        <div class="input-control control-right">
        <input type="text" placeholder="百度搜索" name="wd"><i class="sui-icon icon-touch-magnifier myicon" style="top:10px;font-size:18px;"></i>
        </div>
        <button type="submit" class="sui-btn">百度一下</button>
     </form>
    </div>
  </div>
</div>
</template>

<script>
$('#J_set').tooltip({
    animation: false, 
    type: 'confirm',
    okHide: function(){alert('okHide');console.log(this);this.tooltip('hide')},
    hide: function(){console.log(this)}
  })
export default {
    data(){
        return {

        }
    },
    methods:{

    }
}
</script>

<style>
</style>
