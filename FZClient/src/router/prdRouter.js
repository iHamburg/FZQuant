export const prdRouter = [
  {
    path: '/',
    redirect: '/index'
  },
  { path: '/home',
    component: resolve => require(['../views/merchant/2_home'], resolve),
    children: [
      {
        path: '/cloudStoreIndex',
        meta: {
          title: '首页入口',
          requiresAuth: true,
        },
        name: '2',
        component: r => require.ensure([], () => r(require('../views/merchant/2_cloudStoreIndex')), '2')
      },
      {
        path: '/message',
        meta: {
          title: '消息',
        },
        name: '7.1',
        component: r => require.ensure([], () => r(require('../views/message/7_1')), '7.1')
      }
    ]
  },
  {
    path: '/index',
    meta: {
      title: 'index'
    },
    name: 'index',
    component: r => require.ensure([], () => r(require('../views/index2')), 'index')
  },
  {
    path: '/components',
    meta: {
      title: '组件'
    },
    component: r => require.ensure([], () => r(require('../components/components')), 'components')
  },
  /* 1 商户密码登陆 */
  {
    path: '/login',
    meta: {
      title: '登陆',
    },
    name: '1',
    component: r => require.ensure([], () => r(require('../views/merchant/1_userLogin')), 'login')
  },
  /**
   * =============  其他 ============
   */
  {
    path: '/cms/api',
    meta: {
      title: '测试api',
    },
    name: 'api',
    component: r => require.ensure([], () => r(require('../views/cms/api.vue')), 'api')
  },
]
