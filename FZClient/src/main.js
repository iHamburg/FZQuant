// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'

console.log('初始化 main.js');

/**
 * 全局指令
 */
import scrollRecord from 'src/directives/scroll-record';
Vue.directive('scroll-record', scrollRecord);

/**
 * 全局过滤器
 */
import filters from './filters';
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

/**
 * 全局错误处理
 */
Vue.config.errorHandler = function (err, vm) {
  console.log(vm.title, 'Global error Handler', err, vm);
}

/**
 * 全局components
*/
import components from 'components';
// 公共组件 调用
Object.keys(components).forEach((key) => {
  let name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  Vue.component(`Bl${name}`, components[key])
})

// import blcomponents from 'components/bl-cloudstore-merchant'
// Object.keys(blcomponents).forEach((key) => {
//   let name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
//   Vue.component(`${name}`, blcomponents[key])
// })
//载入组件
import Toast from 'components/bl-cloudstore-merchant/bl-cloudStore-toast'
// import Toast from 'components/BLCloudStoreToast'
// import Modal from 'components/modal'
import Modal from 'components/bl-cloudstore-merchant/bl-cloudStore-alertView'

Vue.$toast = Vue.prototype.$toast = Toast;
Vue.$modal = Vue.prototype.$modal = Modal;

// 二维码插件
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)

/**
 * FastClick
 */
import FastClick from 'fastclick'
// FastClick.attach(document.body)

/**
 * Underscore
 */
import _ from 'underscore'
Vue.$_ = Vue.prototype.$_ = _

/**
 * Lrz
 */
import lrz from 'lrz';
Vue.$lrz = Vue.prototype.$lrz = lrz

/**
 * 全局librarys
 */

// 初始化设置
import bootstraplib from 'libs/bootstraplib'
Vue.$bootstraplib = Vue.prototype.$bootstraplib = bootstraplib

import utillib from 'libs/utillib'
Vue.$utillib = Vue.prototype.$utillib = utillib

import merchantlib from 'libs/merchantlib'
Vue.$merchantlib = Vue.prototype.$merchantlib = merchantlib

import orderlib from 'libs/orderlib'
Vue.$orderlib = Vue.prototype.$orderlib = orderlib

import couponlib from 'libs/couponlib'
Vue.$couponlib = Vue.prototype.$couponlib = couponlib

import goodslib from 'libs/goodslib'
Vue.$goodslib = Vue.prototype.$goodslib = goodslib

import newslib from 'libs/newslib'
Vue.$newslib = Vue.prototype.$newslib = newslib

import imagelib from 'libs/imagelib'
Vue.$imagelib = Vue.prototype.$imagelib = imagelib

import activitylib from 'libs/activitylib'
Vue.$activitylib = Vue.prototype.$activitylib = activitylib

import aftersaleslib from 'libs/aftersaleslib'
Vue.$aftersaleslib = Vue.prototype.$aftersaleslib = aftersaleslib

import servicelib from 'libs/servicelib'
Vue.$servicelib = Vue.prototype.$servicelib = servicelib

import accesslib from 'libs/accesslib'
Vue.$accesslib = Vue.prototype.$accesslib = accesslib

import scheduallib from 'libs/scheduallib'
Vue.$scheduallib = Vue.prototype.$scheduallib = scheduallib

import promotionlib from 'libs/promotionlib'
Vue.$promotionlib = Vue.prototype.$promotionlib = promotionlib

import marketinglib from 'libs/marketinglib'
Vue.$marketinglib = Vue.prototype.$marketinglib = marketinglib

/**
 * jsbridge
 */
import jsbridgelib from 'libs/jsbridgelib'
Vue.$jsbridgelib = Vue.prototype.$jsbridgelib = jsbridgelib

/**
 * Eleme组件 mint
 */
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
