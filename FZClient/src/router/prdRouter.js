export const prdRouter = [
  {
    path: '/',
    redirect: '/cloudStoreIndex'
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
  /* 1.0.1 商户验证码登陆 */
  {
    path: '/smslogin',
    meta: {
      title: '登陆',
    },
    name: '1.0',
    component: r => require.ensure([], () => r(require('../views/merchant/1_smsLogin')), 'login')
  },
  /* 1.1 忘记密码 */
  {
    path: '/forgetPassword',
    meta: {
      title: '忘记密码',
    },
    name: '1.1',
    component: r => require.ensure([], () => r(require('../views/merchant/1_1_forgetPassword')), 'login')
  },
  /* 1.2 快速注册 */
  {
    path: '/signup',
    meta: {
      title: '快速注册',
    },
    name: '1.2',
    component: r => require.ensure([], () => r(require('../views/merchant/1_2_signup')), 'login')
  },
  /* 1.2.1 完善注册信息 */
  {
    path: '/perfectInfo',
    meta: {
      title: '完善注册信息',
    },
    name: '1.2.1',
    component: r => require.ensure([], () => r(require('../views/merchant/1_2_1.vue')), 'perfectInfo')
  },
  /* 1.2.2 审核结果 */
  {
    path: '/toExamine',
    meta: {
      title: '审核结果',
    },
    name: '1.2.2',
    component: r => require.ensure([], () => r(require('../views/merchant/1_2_2.vue')), 'perfectInfo')
  },
  /**
   * 百联会员注册协议
   */
  {
    path: '/agreement',
    meta: {
      title: '百联会员注册协议',
    },
    name: '1.2.3',
    component: r => require.ensure([], () => r(require('../views/merchant/1_agreement.vue')), '2.1')
  },
  /**
   * 2.1 商户设置
   */
  {
    path: '/merchantSettings',
    meta: {
      title: '商户设置',
      requiresAuth: true,
      // class: 'merSetting'
    },
    name: '2.1',
    component: r => require.ensure([], () => r(require('../views/merchant/2_1.vue')), '2.1')
  },
  /**
   * 2.1.1 品牌目录
   */
  {
    path: '/merchantSettings/brandList',
    meta: {
      title: '品牌目录',
      requiresAuth: true,
    },
    name: '2.1.1',
    component: r => require.ensure([], () => r(require('../views/merchant/2_1_1.vue')), '2.1')
  },
  /**
   * 2.1.2 app使用说明
   */
  {
    path: '/merchantSettings/userHelp',
    meta: {
      title: '使用说明',
      requiresAuth: true,
    },
    name: '2.1.2',
    component: r => require.ensure([], () => r(require('../views/merchant/2_1_2userHelpPage.vue')), '2.1')
  },
  /**
   * 2.1.2.1 app使用页面详情
   */
  {
    path: '/merchantSettings/HelpDetail',
    meta: {
      title: '使用页面详情',
      requiresAuth: true,
    },
    name: '2.1.2.1',
    component: r => require.ensure([], () => r(require('../views/merchant/2_1_2_1_helpPageDetail.vue')), '2.1')
  },
  /**
  * 2.1.7 个人简介设置页
  */
  {
    path: '/merchantSettings/individualResume',
    meta: {
      title: '个人简介',
      requiresAuth: true,
    },
    name: '2.1.7',
    component: r => require.ensure([], () => r(require('../views/merchant/2_1_7.vue')), '2.1')
  },
  /**
   * 2.1.10 商品购买提示
   */
  {
    path: '/merchantSettings/tips',
    meta: {
      title: '商品购买提示',
      requiresAuth: true,
    },
    name: '2.1.10',
    component: r => require.ensure([], () => r(require('../views/merchant/2_1_10.vue')), '2.1')
  },

  /**
   * 3.5 扫一扫界面
   */
  {
    path: '/scan',
    meta: {
      title: '扫一扫',
    },
    name: '3.5.2',
    component: r => require.ensure([], () => r(require('../views/merchant/3_5_scan.vue')), '3.5')
  },
  /**
   * 3.5.3 核销页面
   */
  {
    path: '/verifyMenu',
    meta: {
      title: '核销页面',
    },
    name: '3.5.3',
    component: r => require.ensure([], () => r(require('../views/merchant/3_5_3.vue')), '3.5.3')
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
