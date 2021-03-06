/**
 * 前端和后端
 */

export const routerConfig = [
  {
    path: '/',
    redirect: '/stock_indexes'
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
    path: '/users',
    meta: {
      title: '用户首页',
    },
    name: '用户首页',
    component: r => require.ensure([], () => r(require('../views/users/login.vue')), '1')
  },
  {
    path: '/stock_indexes',
    meta: {
      title: '股票指数列表',
    },
    name: '股票指数列表',
    component: r => require.ensure([], () => r(require('../views/stock_indexes.vue')), '1')
  },
  {
    path: '/stock_index/:id',
    meta: {
      title: '股票指数列表',
    },
    name: 'stock_index',
    component: r => require.ensure([], () => r(require('../views/stock_index.vue')), '1')
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

