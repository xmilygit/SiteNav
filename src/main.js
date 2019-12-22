import Vue from 'vue'
import 'babel-polyfill'
import App from './App.vue'
/*bootstrap*/
/*
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
*/
import BootstrapVue from "bootstrap-vue"
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
const host=window.location.host
axios.defaults.baseURL="http://192.168.123.151:3000";//"http://"+host//"http://188.188.3.2:8008";//"http://188.188.1.15:3000";//'http://localhost:3000/'
Vue.prototype.$ajax=axios


new Vue({
  el: '#app',
  render: h => h(App)
})
