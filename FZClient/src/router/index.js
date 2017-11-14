/*
 * 路由管理
 */

import Vue from 'vue'
import Router from 'vue-router'
import { uiRouter } from './uiRouter'
import { prdRouter } from './prdRouter'
import { tutorialRouter } from './tutorialRouter'
import merchantlib from '../libs/merchantlib'
import accesslib from '../libs/accesslib'

Vue.use(Router)

Router.prototype.go = function (n) {
  this.isBack = true
  window.history.go(n)
};

Router.prototype.goHome = function () {
  this.isBack = true
  this.push({name: '2'})
};

let routerConfig = tutorialRouter.concat(uiRouter).concat(prdRouter)

let router = new Router({
  mode: 'history',
  routes: routerConfig,
})

/**
 *动态载入css文件
 */
let linkCssObj = document.getElementById('classLink');

router.beforeEach((to, from, next) => {
  // console.log('router.before each IN Router.index', to.name, from);

  document.title = to.meta.title
  // let pageId = to.name;
  // // 载入页面css文件
  if (to.meta.class) { //动态载入css文件
    // console.log('load meta class', to.meta.class);
    linkCssObj.href = `/static/css/${to.meta.class}.css`
    linkCssObj.onload = () => {
      console.log('onload');
      next()
    }
  }
  // 页面权限判断
  if (to.meta.requiresAuth && !merchantlib.isLogin()) {
    next({path: '/login'})
  } else {
    next()
  }
  // 判断页面是否有访问权限
  // if (accesslib.can(pageId)) {
  //   // 载入页面css文件
  //   if (to.meta.class) { //动态载入css文件
  //     // console.log('load meta class', to.meta.class);
  //     linkCssObj.href = `/static/css/${to.meta.class}.css`
  //     linkCssObj.onload = () => {
  //       console.log('onload');
  //       next()
  //     }
  //   }
  //
  //   next()
  // } else {  // 没有访问权限
  //   console.log('no access to ', pageId)
  //   Vue.$toast('没有访问权限')
  // }
})

export default router

