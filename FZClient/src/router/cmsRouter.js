export const cmsRouter = [
  {
    path: '/cms/api',
    meta: {
      title: '接口测试'
    },
    component: r => require.ensure([], () => r(require('../views/api')), 'api')
  },

]
