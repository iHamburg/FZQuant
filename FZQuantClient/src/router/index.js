/**
 * 前端和后端
 */
import Vue from 'vue'
import Router from 'vue-router'
import userlib from '../libs/userlib'

Vue.use(Router)

let routes = [
  {
    path: '/',
    redirect: '/index'
  },
  /* 商品上线index */
  {
    path: '/index',
    meta: {
      title: '首页',
      requiresAuth: true
    },
    component: r => require.ensure([], () => r(require('../views/index')), 'index')
  },
  {
    path: '/admin/users',
    meta: {
      title: '用户列表',
    },
    name: '1.1',
    component: r => require.ensure([], () => r(require('../views/users/1_1.vue')), '1')
  },
  {
    path: '/login',
    meta: {
      title: '用户登录',
    },
    name: '用户登录',
    component: r => require.ensure([], () => r(require('../views/users/login.vue')), '1')
  },

];

let router = new Router({
  // mode: 'history',
  routes,
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
