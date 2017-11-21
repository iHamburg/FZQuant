export const uiRouter = [
  {
    path: '/ui/',
    redirect: '/ui/catelog'
  },
  {
    path: '/ui/catelog',
    component: r => require.ensure([], () => r(require('../views/UI/catelog.vue')), 'uiindex')
  },
  {
    path: '/ui/mint-css',
    meta: {

    },
    component: r => require.ensure([], () => r(require('../views/ui/mint-css.vue')), 'mint-css')
  },
  {
    path: '/ui/mint-js',
    meta: {

    },
    component: r => require.ensure([], () => r(require('../views/ui/mint-js.vue')), 'mint-js')
  },
  {
    path: '/ui/mint-form',
    meta: {

    },
    component: r => require.ensure([], () => r(require('../views/ui/mint-form.vue')), 'mint-form')
  },
]
