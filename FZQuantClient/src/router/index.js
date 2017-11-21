/**
 * 前端和后端
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [
  {
    path: '/',
    redirect: '/admin/products'
  },
  /* 商品上线index */
  {
    path: '/index',
    meta: {
      title: '商品上线index',
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
    path: '/admin/users/:id',
    meta: {
      title: '编辑用户',
    },
    name: '1.2',
    component: r => require.ensure([], () => r(require('../views/users/1_2.vue')), '1')
  },
  {
    path: '/admin/products',
    meta: {
      title: '商品列表',
    },
    name: '2.1',
    component: r => require.ensure([], () => r(require('../views/products/2_1.vue')), '2')
  },
  {
    path: '/admin/products/:id',
    meta: {
      title: '商品详情',
    },
    name: '2.2',
    component: r => require.ensure([], () => r(require('../views/products/2_2.vue')), '2')
  },
  {
    path: '/admin/productgroups',
    meta: {
      title: '商品组列表',
    },
    name: '3.1',
    component: r => require.ensure([], () => r(require('../views/productgroups/3_1.vue')), '3')
  },
  {
    path: '/admin/productgroups/create',
    meta: {
      title: '新建商品组',
    },
    name: '3.2',
    component: r => require.ensure([], () => r(require('../views/productgroups/3_2.vue')), '3')
  },
  {
    path: '/admin/productgroups/:id',
    meta: {
      title: '商品组详情',
    },
    name: '3.3',
    component: r => require.ensure([], () => r(require('../views/productgroups/3_2.vue')), '3')
  },
  {
    path: '/admin/orders',
    meta: {
      title: '订单列表',
    },
    name: '4.1',
    component: r => require.ensure([], () => r(require('../views/orders/4_1.vue')), '4.1')
  },
  {
    path: '/admin/orders/:id',
    meta: {
      title: '订单',
    },
    name: '4.2',
    component: r => require.ensure([], () => r(require('../views/orders/4_2.vue')), '4.2')
  },

];


// let router = new Router({
//   // mode: 'history',
//   routes,
// })
//
// export default {
//   router
// }


export default new Router({
  // mode: 'history',
  routes,
})
