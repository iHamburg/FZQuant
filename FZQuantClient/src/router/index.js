/**
 * 前端和后端
 */
import Vue from 'vue'
import Router from 'vue-router'
import userlib from '../libs/userlib'
import { routerConfig } from './routerConfig'

Vue.use(Router)

let router = new Router({
  // mode: 'history',
  routes: routerConfig,
})

router.beforeEach((to, from, next) => {
  // console.log('router.before each IN Router.index', to.name, from);

  document.title = to.meta.title

  // 页面权限判断
  if (to.meta.requiresAuth && !userlib.isLogin()) {
    next({path: '/login'})
  } else {
    next()
  }
})

export default router
