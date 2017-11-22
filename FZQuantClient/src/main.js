// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/**
 * 全局错误处理
 */
Vue.config.errorHandler = function (err, vm) {
  console.log(vm.title, 'Global error Handler', err, vm);
}

/**
 * FastClick 调用
 */
import FastClick from 'fastclick'

FastClick.attach(document.body)

/**
 * UI组件: Bootstrap
 */
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

/**
 * librray
 */
// import productlib from './libs/productlib'
// Vue.$productlib = Vue.prototype.$productlib = productlib

import utillib from './libs/utillib'
Vue.$utillib = Vue.prototype.$utillib = utillib

import userlib from './libs/userlib'
Vue.$userlib = Vue.prototype.$userlib = userlib

import networklib from './libs/networklib'
Vue.$networklib = Vue.prototype.$networklib = networklib

// import utillib from './libs/utillib'
// Vue.$utillib = Vue.prototype.$utillib = utillib
/**
 * Global Mixin
 */
// import uiMixin from './mixins/uiMixin'
// Vue.mixin(uiMixin)

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
