/**
 * 前端和后端
 */

export const routerConfig = [
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
  {
    path: '/tutorials/',
    meta: {
      title: 'tutorials',
    },
    name: 'tests',
    component: r => require.ensure([], () => r(require('../views/tutorials/index.vue')), '1')
  },
  {
    path: '/tutorials/socketio',
    meta: {
      title: 'tutorials',
    },
    name: 'socketio',
    component: r => require.ensure([], () => r(require('../views/tutorials/socketio.vue')), '1')
  },
  {
    path: '/echarts/candlestick',
    meta: {
      title: 'tutorials',
    },
    name: 'candlestick',
    component: r => require.ensure([], () => r(require('../views/echarts/candlestick.vue')), '1')
  },
];

