export const tutorialRouter = [
  {
    path: '/tutorial/mint-js',
    meta: {
      title: '过渡效果'
    },
    component: r => require.ensure([], () => r(require('../views/tutorial/mint-js')), 'transition')
  },
  {
    path: '/tutorial/transition',
    meta: {
      title: '过渡效果'
    },
    component: r => require.ensure([], () => r(require('../views/tutorial/transition')), 'transition')
  },
  {
    path: '/tutorial/transition2',
    meta: {
      title: '过渡效果2'
    },
    component: r => require.ensure([], () => r(require('../views/tutorial/transition2')), 'transition2')
  },

]
