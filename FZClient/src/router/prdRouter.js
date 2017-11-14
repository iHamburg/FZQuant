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

  /* 0 test */
  {
    path: '/webPage',
    meta: {
      title: 'webPage',
    },
    name: 'webPage',
    component: r => require.ensure([], () => r(require('../views/coupon/webPage.vue')), 'login')
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
   * Coupon 模块
   */
  /* 3.2 分配券列表 */
  {
    path: '/coupons/assignList',
    meta: {
      title: '分配券模版列表',
      requiresAuth: true,
    },
    name: '3.2',
    component: r => require.ensure([], () => r(require('../views/coupon/3_2_giftCoupon')), '3.2')
  },
  /* 3.6.2 马丽华 选择发券人 */
  {
    path: '/allocationbond',
    meta: {
      title: '选择发券人',
      requiresAuth: true,
      //class: 'allocationbond'
    },
    name: '3.6.2',
    component: r => require.ensure([], () => r(require('../views/coupon/3_6_2_allocationbond')), 'allocationbond')
  },
  /* 3.7.1 张姣姣 券码核销列表 核销详情*/
  {
    path: '/giftvoucher/:couponTemplateId',
    meta: {
      title: '券码核销记录'
    },
    name: '3.7.1',
    component: r => require.ensure([], () => r(require('../views/coupon/3_7_1_giftVoucher')), 'giftVoucher')
  },
  /* 3.3 刘路明 券模板分配网红列表 */
  {
    path: '/ticketlist',
    meta: {
      title: '已分配券列表',
      //class: 'ticketlist'
    },
    name: '3.3',
    component: r => require.ensure([], () => r(require('../views/coupon/3_3_ticketlist')), 'ticketlist')
  },
  /* 4.4 刘路明 促销员详情 */
  {
    path: '/promotersDetail',
    meta: {
      title: '促销员详情',
      //class: 'promotersDetail'
    },
    name: '4.4',
    component: r => require.ensure([], () => r(require('../views/promoters/4_4_promotersDetail')), 'promotersDetail')
  },
  /* 3.6 樊丘名 分配券 */
  {
    path: '/assignedTickets',
    meta: {
      title: '分配券',
      //class: 'assignedTickets'
    },
    name: '3.6',
    component: r => require.ensure([], () => r(require('../views/coupon/3_6_assignedTickets')), 'assignedTickets')
  },
  /* 4.5 姚文定 Ta的劵 */
  {
    path: '/TaCoupon',
    meta: {
      title: 'Ta的劵',
      class: 'TaCoupon'
    },
    name: '4.5',
    component: r => require.ensure([], () => r(require('../views/coupon/4_5_TaCoupon.vue')), 'TaCoupon')
  },
  /*
   3.1 何明明 创建券 */
  {
    path: '/couponManager/create',
    meta: {
      title: '创建礼品券',
     // class: 'createCoupon'
    },
    name: '3.1',
    component: r => require.ensure([], () => r(require('../views/coupon/3_1_createCoupon.vue')), '3')
  },
  /* 3.4  何明明 优惠券详情 */
  {
    path: '/couponManager/couponTemplates/:couponTemplateId',
    meta: {
      title: '优惠券详情',
      //class: 'couponDetail'
    },
    name: '3.4',
    component: r => require.ensure([], () => r(require('../views/coupon/3_4_couponDetail')), '3')
  },
  {
    path: '/verifyManagement',
    meta: {
      title: '核销流水',
      //class: 'management',
    },
    name: '3.5',
    component: r => require.ensure([], () => r(require('../views/coupon/3_5.vue')), 'management')
  },
  /* 3.5.1 自提码核销记录列表 */
  {
    path: '/verifyDeliveryCode',
    meta: {
      title: '自提码核销记录'
    },
    name: '3.5.1',
    component: r => require.ensure([], () => r(require('../views/coupon/3_5_1.vue')), 'verifyDeliveryCode')
  },
  /* 3.7 何明明 已销券模板列表 */
  {
    path: '/couponManager/verifiedCoupons',
    meta: {
      title: '已销券模板列表'
    },
    name: '3.7',
    component: r => require.ensure([], () => r(require('../views/coupon/3_7_salesCoupon')), '3')
  },

  // 6.9.1 选择创建优惠券类型
  {
    path: '/coupon/create',
    meta: {
      title: '选择创建优惠券类型'
    },
    name: '6.9.1',
    component: r => require.ensure([], () => r(require('../views/coupon/6_9_1')), '3')
  },
  // 6.9.4 优惠券列表
  {
    path: '/coupon/list',
    meta: {
      title: '优惠券列表'
    },
    name: '6.9.4',
    component: r => require.ensure([], () => r(require('../views/coupon/6_9_4_couponlist.vue')), '3')
  },
  // 6.9.5 券核销流水列表
  {
    path: '/coupon/verifiedCoupons',
    meta: {
      title: '券核销流水列表'
    },
    name: '6.9.5',
    component: r => require.ensure([], () => r(require('../views/coupon/6_9_5')), '3')
  },
  // 6.9.6 券核销流水明细
  {
    path: '/coupon/hexiaomingxi',
    meta: {
      title: '核销明细'
    },
    name: '6.9.6',
    component: r => require.ensure([], () => r(require('../views/coupon/6_9_6')), '3')
  },
  // 6.9.9 券核销流水明细详情
  {
    path: '/coupon/:couponTemplateId/verifiedCouponDetail',
    meta: {
      title: '核销详情'
    },
    name: '6.9.9',
    component: r => require.ensure([], () => r(require('../views/coupon/6_9_9.vue')), '3')
  },
  {
    path: '/coupon/:couponTemplateId/verifiedParkingCouponDetail',
    meta: {
      title: '核销详情'
    },
    name: '6.9.11',
    component: r => require.ensure([], () => r(require('../views/coupon/6_9_11.vue')), '3')
  },
  // 6.9.7 商户优惠券可绑定商品列表
  {
    path: '/coupon/canBindedGoods/goods',
    meta: {
      title: '商户优惠券可绑定商品列表'
    },
    name: '6.9.7',
    component: r => require.ensure([], () => r(require('../views/coupon/6_9_7.vue')), '6.9.7')
  },
  // 6.9.8 商户优惠券已绑定商品列表
  {
    path: '/coupon/:id/bindedGoods',
    meta: {
      title: '商户优惠券已绑定商品列表'
    },
    name: '6.9.8',
    component: r => require.ensure([], () => r(require('../views/coupon/6_9_8.vue')), '3')
  },
  // 6.9.10 商户优惠券已绑定商品列表(可以编辑)
  {
    path: '/coupon/bindedGoods/update',
    meta: {
      title: '商户优惠券已绑定商品列表'
    },
    name: '6.9.10',
    component: r => require.ensure([], () => r(require('../views/coupon/6_9_10.vue')), '3')
  },

  /**
   * 6.9.2 创建编辑优惠券
   * @param flag=4
   */
  {
    path: '/coupon/create/:typeId',
    meta: {
      title: '创建优惠券'
    },
    name: '6.9.2',
    component: r => require.ensure([], () => r(require('../views/coupon/6_9_2_createDiscount.vue')), '3')
  },
  /**
   * 6.9.3 优惠券详情页面
   * @param 详情 flag=5 审核按钮  flag=3
   */
  {
    path: '/coupon/:couponTemplateId/detail',
    meta: {
      title: '优惠券详情'
    },
    name: '6.9.3',
    component: r => require.ensure([], () => r(require('../views/coupon/6_9_2_createDiscount.vue')), '3')
  },
  /**
   * 6.9.2.1 编辑优惠券页面
   * @param 审核不通过状态下的编辑按钮 flag=1  发放中状态下的编辑按钮 flag=2
   */
  {
    path: '/coupon/enditCoupon',
    meta: {
      title: '编辑优惠券'
    },
    name: '6.9.2.1',
    component: r => require.ensure([], () => r(require('../views/coupon/6_9_2_createDiscount.vue')), '4')
  },

  /**
   * 6.10.3 停车券订单页面
   */
  {
    path: '/coupon/parkingList',
    meta: {
      title: '券订单'
    },
    name: '6.10.3',
    component: r => require.ensure([], () => r(require('../views/coupon/6_10_3_parkingOrderList.vue')), '3')
  },

  /**
   * 6.10.4 停车券订单详情页面
   */
  {
    path: '/coupon/:id/orderDetail',
    meta: {
      title: '停车券订单详情'
    },
    name: '6.10.4',
    component: r => require.ensure([], () => r(require('../views/coupon/6_10_4_parkingOrderDetail.vue')), '3')
  },
  /**
   * 6.10.5 可发停车券列表
   */
  {
    path: '/coupon/assignParkingList',
    meta: {
      title: '可发停车券列表'
    },
    name: '6.10.5',
    component: r => require.ensure([], () => r(require('../views/coupon/6_10_5.vue')), '6_10_5')
  },
  /**
   * 6.10.6 发券详情
   */
  {
    path: '/coupon/dispense',
    meta: {
      title: '发券详情'
    },
    name: '6.10.6',
    component: r => require.ensure([], () => r(require('../views/coupon/6_10_6.vue')), '3')
  },

  /**
   * 6.10.1 购买停车券列表
   *
   */
  {
    path: '/coupon/buyParkingList',
    meta: {
      title: '购买停车券'
    },
    name: '6.10.1',
    component: r => require.ensure([], () => r(require('../views/coupon/6_10_1_buyParkingTickets.vue')), '4')
  },

  /**
   * 6.10.1.1 购买停车券结果
   *
   */
  {
    path: '/coupon/buyParking/result',
    meta: {
      title: '购买停车券'
    },
    name: '6.10.1.1',
    component: r => require.ensure([], () => r(require('../views/coupon/6_10_1_1_buyParkingResult.vue')), '4')
  },

  /**
   * ============= 5 商品 ============
   */
  /* 商品上新：5.1 创建商品 插入商品信息 1003*/
  {
    path: '/goods',
    meta: {
      title: '商品',
    },
    name: '5',
    component: r => require.ensure([], () => r(require('../views/goods/5_Goods.vue')), '5.1')
  },
  /* 商品上新：5.1 创建商品 插入商品信息 1003*/
  {
    path: '/createGoods',
    meta: {
      title: '商品上新',
      requiresAuth: true,
      //class: 'goodinset'
    },
    name: '5.1',
    component: r => require.ensure([], () => r(require('../views/goods/5_1_createGoodsNew')), '5.1')
  },
  /* 5.2  商品属性*/
  {
    path: '/goodsSKU',
    meta: {
      title: '商品属性',
      requiresAuth: true,
    },
    name: '5.2',
    component: r => require.ensure([], () => r(require('../views/goods/5_2_goodsSKU')), '5.1')
  },
  /* 5.4  选择分类*/
  {
    path: '/goodsType',
    meta: {
      title: '分类',
      requiresAuth: true,
     // class: 'goodsType'
    },
    name: '5.4',
    component: r => require.ensure([], () => r(require('../views/goods/5_4_goodsType')), 'goodsType')
  },
  /* 5.4.1 选择分类*/
  {
    path: '/goodsTypeSecond',
    meta: {
      title: '分类',
      requiresAuth: true,
      //class: 'goodsType'
    },
    name: '5.4.1',
    component: r => require.ensure([], () => r(require('../views/goods/5_4_1goodsType')), 'goodsType')
  },
  /* 5.5 编辑商品 */
  {
    path: '/editGoods/:goodsId',
    meta: {
      title: '编辑商品',
      //class: 'goodinset'
    },
    name: '5.5',
    component: r => require.ensure([], () => r(require('../views/goods/5_5_editGoods')), 'editGoods')
  },
  /* 5.6 商品详情页*/
  {
    path: '/goods/:goodsId',
    meta: {
      title: '商品详情',
    },
    name: '5.6',
    component: r => require.ensure([], () => r(require('../views/goods/5_6_goods')), 'goods')
  },
  /* 5.8  */
  {
    path: '/goodsManage',
    meta: {
      title: '商品管理',
    },
    name: '5.8',
    component: r => require.ensure([], () => r(require('../views/goods/5_8_goodsManage')), '5.8')
  },
  /**
   * 5.9 batchOperationGoods
   */
  {
    path: '/goodsManage/batchOperationGoods',
    meta: {
      title: '批量操作商品',
    },
    name: '5.9',
    component: r => require.ensure([], () => r(require('../views/goods/5_9_batchOperationGoods')), '5.8')
  },
  /* 5.10  */
  {
    path: '/goodsSKUManage',
    meta: {
      title: '商品属性',
      //class: 'commodityAttribute'
    },
    name: '5.10',
    component: r => require.ensure([], () => r(require('../views/goods/5_10_goodsSKUManage')), 'goodsSKUManage')
  },
  /* 5.12  */
  {
    path: '/goodsQR',
    meta: {
      title: '商品二维码',
    },
    name: '5.12',
    component: r => require.ensure([], () => r(require('../views/goods/5_12_goodsQR.vue')), 'goodsQR')
  },
  /* 5.13 */
  {
    path: '/batchSubmitGoods',
    meta: {
      title: '批量提审',
     // class: 'batchauditgoods',
      requiresAuth: true,
    },
    name: '5.13',
    component: r => require.ensure([], () => r(require('../views/goods/5_13_batchSubmitGoods.vue')))
  },
  /* 5.15  */
  {
    path: '/batchAuditGoods',
    meta: {
      title: '批量审核',
      requiresAuth: true,
    },
    name: '5.15',
    component: r => require.ensure([], () => r(require('../views/goods/5_15_batchAuditGoods.vue')))
  },
  /**
   * 5.16
   */
  {
    path: '/brands',
    meta: {
      title: '品牌',
      // class: 'goodsType'
    },
    name: '5.16',
    component: r => require.ensure([], () => r(require('../views/goods/5_16_brands.vue')), '5.16')
  },
  /**
   * ============= 6 营销广播 ============
   */
  /**
   * 6 营销工具
   */
  {
    path: '/marketingManager',
    meta: {
      title: '营销工具',
    },
    name: '6',
    component: r => require.ensure([], () => r(require('../views/marketing/6.vue')), '6')
  },
  /**
   * 6.1 发布新品上新
   */
  {
    path: '/marketing/newgoods',
    meta: {
      title: '发布新品上新',
      //class: 'issueCoupons'
    },
    name: '6.1',
    component: r => require.ensure([], () => r(require('../views/marketing/6_1.vue')), '6.1')
  },
  /**
   * 6.2 发布优惠券上新
   */
  {
    path: '/marketing/coupons',
    meta: {
      title: '发布优惠券上新',
      //class: 'issueCoupons'
    },
    name: '6.2',
    component: r => require.ensure([], () => r(require('../views/marketing/6_2.vue')), '6.2')
  },
  /**
   * 6.3 已发布列表
   */
  {
    path: '/marketing/dynamics',
    meta: {
      title: '已发布内容',
      //class: 'marketing'
    },
    name: '6.3',
    component: r => require.ensure([], () => r(require('../views/marketing/6_3.vue')), '6.3')
  },
  /**
   * 6.3.1 上新广播详情
   */
  {
    path: '/marketing/dynamics/:id',
    meta: {
      title: '上新广播',
     // class: 'newcast'
    },
    name: '6.3.1',
    component: r => require.ensure([], () => r(require('../views/marketing/6_3_1.vue')), '6.3.1')
  },
   /**
   * 6.3.3 推荐商品广播详情
   */
  {
    path: '/marketing/recommGoods/:id',
    meta: {
      title: '推荐商品',
     // class: 'newcast'
    },
    name: '6.3.3',
    component: r => require.ensure([], () => r(require('../views/marketing/6_3_3.vue')), '6.3.3')
  },
  /**
   * 6.6 发布活动
   */
  {
    path: '/marketing/activities',
    meta: {
      title: '发布活动',
    },
    name: '6.6',
    component: r => require.ensure([], () => r(require('../views/marketing/6_6.vue')), '6.4')
  },
  /**
   * 6.8 发布推荐商品
   */
  {
    path: '/marketing/recommmendedGoods',
    meta: {
      title: '发布商品推荐',
    },
    name: '6.8',
    component: r => require.ensure([], () => r(require('../views/marketing/6_8_promoteRecommandedGoods.vue')), '6.4')
  },
  /**
   * ============= 6 营销活动 ============
   */
  /**
   * 6.4 创建活动
   */
  {
    path: '/activities/create',
    meta: {
      title: '创建活动',
    },
    name: '6.4',
    component: r => require.ensure([], () => r(require('../views/marketing/6_4.vue')), '6.4')
  },
  /**
   * 6.4.1 活动规则/活动内容
   */
  {
    path: '/activities/create/:title',
    meta: {
      title: '创建活动规则',
    },
    name: '6.4.1',
    component: r => require.ensure([], () => r(require('../views/marketing/6_4_1.vue')), '6.4.1')
  },
  /**
   * 6.5 活动详情
   */
  {
    path: '/activities/:id',
    meta: {
      title: '活动详情',
    },
    name: '6.5',
    component: r => require.ensure([], () => r(require('../views/marketing/6_5.vue')), '6.4')
  },
  /**
   * 6.5.1 编辑活动
   */
  {
    path: '/activities/edit/:id',
    meta: {
      title: '编辑活动',
    },
    name: '6.5.1',
    component: r => require.ensure([], () => r(require('../views/marketing/6_4.vue')), '6.5.1')
  },
  /**
   * 6.7 活动列表
   */
  {
    path: '/activities/',
    meta: {
      title: '活动列表',
    },
    name: '6.7',
    component: r => require.ensure([], () => r(require('../views/marketing/6_7.vue')), '6.4')
  },

  /**
   * ============= 7 消息 ============
   */
  /**
   * 7.1.1 系统消息，交易消息，商品消息
   */
  {
    path: '/myNews/:msgGroupId',
    meta: {
      title: '消息',
    },
    name: '7.1.1',
    component: r => require.ensure([], () => r(require('../views/message/7_1_1')), 'message')
  },
  /**
   * 7.1.4.1联系人详情
   */
  {
    path: '/contactDetail/:customerId',
    meta: {
      title: '联系人详情',
    },
    name: '7.1.4.1',
    component: r => require.ensure([], () => r(require('../views/message/7_1_4_1')), 'contactDetail')
  },
  /**
   * ============= 8  IM 聊天室 ============
   */
  /**
   *
   * 8.1 聊天室
   */
  {
    path: '/chatRoom',
    meta: {
      title: '聊天室',
      class: 'room'
    },
    name: '8.1',
    component: r => require.ensure([], () => r(require('../views/IM/8_1.vue')), '8.1')
  },

  /**
   *
   * 8.1.1 历史咨询商品
   * @孙传奇
   */
  {
    path: '/im/:customerId/consultGoods',
    meta: {
      title: '历史咨询商品',
    },
    name: '8.1.1',
    component: r => require.ensure([], () => r(require('../views/IM/8_1_1.vue')), '8.1')
  },
  /**
   *
   *
   *8.1.4 IM 查询可发送商品页
   */
  {
    path: '/im/:customerId/sendGoods',
    meta: {
      title: '发送商品',
    },
    name: '8.1.4',
    component: r => require.ensure([], () => r(require('../views/IM/8_1_4.vue')), '8.1')
  },
  /**
   * 9.3 代客下单
   */
  {
    path: '/im/:customerId/sendOrder',
    meta: {
      title: '代客下单',
      // class: 'order',
    },
    name: '9.3',
    component: r => require.ensure([], () => r(require('../views/order/9_3')), '9.3')
  },

  /**
   * 9.3.1 代客下单-添加商品
   */
  {
    path: '/im/:customerId/sendOrder/addGoods',
    meta: {
      title: '添加商品',
      // class: 'issueCoupons'
    },
    name: '9.3.1',
    component: r => require.ensure([], () => r(require('../views/order/9_3_1.vue')), '9.3.1')
  },
  /**
   *
   * 8.1.6 IM 查询用户可售后订单列表页
   */
  {
    path: '/im/:customerId/orderListForAftersale',
    meta: {
      title: '选择用户订单',
      // class: 'issueCoupons'
    },
    name: '8.1.6',
    component: r => require.ensure([], () => r(require('../views/IM/8_1_6_aftersalesorders.vue')), '8.1')
  },
  /**
   *
   * 8.1.7 IM 显示商品详情
   */
  {
    path: '/im/:customerId/goods/:goodsId',
    meta: {
      title: '选择用户订单',
      class: 'createGoods',
    },
    name: '8.1.7',
    component: r => require.ensure([], () => r(require('../views/goods/5_6_goods.vue')), '5.6')
  },
  /**
   * ============= 9 订单 ============
   */
  /**
   * P9.1 订单管理 郭秋思
   */
  {
    path: '/orderManage',
    meta: {
      title: '订单管理',

    },
    name: '9.1',
    component: r => require.ensure([], () => r(require('../views/order/9_1.vue')), '9.1')
  },

  /**
   * P9.1.1 订单列表  黄凤秀
   */
  {
    path: '/orders',
    meta: {
      title: '全部订单',
    },
    name: '9.1.1',
    component: r => require.ensure([], () => r(require('../views/order/9_1_1.vue')), '9.1')},

  /**
   * P9.1.2 订单详情
   */
  {
    path: '/orders/:orderNo',
    meta: {
      title: '订单详情',
    },
    name: '9.1.2',
    component: r => require.ensure([], () => r(require('../views/order/9_1_2.vue')), '9.1')
  },
  /**
   * P9.1.5.2 订单销核确认页  黄凤秀
   */
  {
    path: '/orders/:orderNo/deliveryConfirm/:deliveryCode',
    meta: {
      title: '订单销核确认页',
      // class: 'orderStatus',
    },
    name: '9.1.5.2',
    component: r => require.ensure([], () => r(require('../views/order/9_1_5_2.vue')), '9.1')
  },
  /**
   * P9.1.3.1 开单
   */
  {
    path: '/orders/:orderNo/billing',
    meta: {
      title: '开单',
    },
    name: '9.1.3.1',
    component: r => require.ensure([], () => r(require('../views/order/9_1_3_1.vue')), '9.1')
  },
  /**
   * P9.1.3.2 设置无货订单Sku库存
   */
  {
    path: '/orders/:orderNo/goodsSkuStock',
    meta: {
      title: '设置无货订单Sku库存',
    },
    name: '9.1.3.2',
    component: r => require.ensure([], () => r(require('../views/order/9_1_3_2.vue')), '9.1')
  },

  /**
   * P9.1.6 物流追踪
   */
  {
    path: '/orders/:orderNo/expressInfo',
    meta: {
      title: '物流追踪',
      //class: 'orderStatus',
    },
    name: '9.1.6',
    component: r => require.ensure([], () => r(require('../views/order/9_1_6.vue')), '9.1')
  },

  /**
   * 9.1.4 发货
   */
  {
    path: '/orders/:orderNo/send',
    meta: {
      title: '发货',
      // class: 'billing',

    },
    name: '9.1.4',
    component: r => require.ensure([], () => r(require('../views/order/9_1_4.vue')), '9.1')
  },

  /**
   * P9.1.5.1 订单核销扫一扫  黄凤秀
   */
  {
    path: '/verifyScan',
    meta: {
      title: '销核',
      //class: 'pinCode',
    },
    name: '9.1.5.1',
    component: r => require.ensure([], () => r(require('../views/order/9_1_5_1.vue')), '9.1.5.1')
  },
  /**
   * P9.3.3 代客下单选择特殊优惠列表
   */
  {
    path: '/selectSpecialOfferList',
    meta: {
      title: '选择特殊优惠列表',
    },
    name: '9.3.3',
    component: r => require.ensure([], () => r(require('../views/order/9_3_3.vue')), 'selectSpecialOfferList')
  },
  /**
   * ============= 10 售后单 ============
   */
  /**
   * P10.1 售后单首页
   */
  {
    path: '/aftersales/index',
    meta: {
      title: '售后管理',
    },
    name: '10.1',
    component: r => require.ensure([], () => r(require('../views/aftersales/10_1_aftersales.vue')), '10')
  },
  /**
   * P10.1.1 填写售后单
   */
  {
    path: '/aftersales/create',
    meta: {
      title: '创建售后单',
    },
    name: '10.1.1',
    component: r => require.ensure([], () => r(require('../views/aftersales/10_1_1_createAfterSales.vue')), '10')
  },
  /**
   * P10.2 售后单列表
   */
  {
    path: '/aftersales/list',
    meta: {
      title: '售后单列表',
    },
    name: '10.2',
    component: r => require.ensure([], () => r(require('../views/aftersales/10_2_aftersalesList.vue')), '10')
  },
  /**
   * P10.2.1 售后单详情
   */
  {
    path: '/aftersales/:id',
    meta: {
      title: '售后单详情',
    },
    name: '10.2.1',
    component: r => require.ensure([], () => r(require('../views/aftersales/10_2_1_aftersalesDetails.vue')), '10')
  },

  /**
   * 中止受理
   */
  {
    path: '/aftersales/:id/reject',
    meta: {
      title: '中止受理',
    },
    name: '10.2.1.1',
    component: r => require.ensure([], () => r(require('../views/aftersales/10_2_1_1_rejectAfterSales.vue')), '10')
  },
  /**
   * P10.2.4.1 退货单回录页
   */
  {
    path: '/aftersales/:id/confirm',
    meta: {
      title: '退货单回录页',
    },
    name: '10.2.4.1',
    component: r => require.ensure([], () => r(require('../views/aftersales/10_2_4_1_confirmAfterSales.vue')), '10')
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
  /**
   * =============  店员管理 ============
   */
  {
    path: '/clerkManage',
    meta: {
      title: '店员管理',
    },
    name: '11',
    component: r => require.ensure([], () => r(require('../views/schedual/11_arrangeSchedual.vue')), '11')
  },
  /**
   * =============  排班表 ============
   */
  {
    path: '/schedual',
    meta: {
      title: '排班表',
    },
    name: '11.1',
    component: r => require.ensure([], () => r(require('../views/schedual/11_1_schedual.vue')), '11')
  },
  /**
   * =============  店铺管理 ============
   */
  {
    path: '/clerkRegisterVerifyList',
    meta: {
      title: '店员注册审核',
    },
    name: '11.2',
    component: r => require.ensure([], () => r(require('../views/shopmanage/11_2_clerkRegisterVerifyList.vue')), '11')
  },
  {
    path: '/clerkRegisterMessageDetail',
    meta: {
      title: '店员注册信息详情',
    },
    name: '11.2.1',
    component: r => require.ensure([], () => r(require('../views/shopmanage/11_2_1_clerkRegisterMessageDetail.vue')), '11')
  },
  {
    path: '/clerkAccountList',
    meta: {
      title: '店员注册信息详情',
    },
    name: '11.3',
    component: r => require.ensure([], () => r(require('../views/shopmanage/11_3_clerkAccountMessageList.vue')), '11')
  },

  /**
   * =============  促销活动 ============
   */
  /* 12 促销管理 */
  {
    path: '/promotion/management',
    meta: {
      title: '促销管理',
    },
    name: '12',
    component: r => require.ensure([], () => r(require('../views/promotions/12.vue')), 'promotions')
  },
  /* 12.1 促销活动列表 */
  {
    path: '/promotion/list',
    meta: {
      title: '促销管理',
    },
    name: '12.1',
    component: r => require.ensure([], () => r(require('../views/promotions/12_1.vue')), 'promotions')
  },
  /* 12.2 创建促销分类 */
  {
    path: '/promotion/create',
    meta: {
      title: '创建促销分类',
    },
    name: '12.2',
    component: r => require.ensure([], () => r(require('../views/promotions/12_2.vue')), 'promotions')
  },
  /**
   * 12.2.1 创建促销活动
   */
  {
    path: '/promotion/create/:type',
    meta: {
      title: '创建促销活动',
    },
    name: '12.2.1',
    component: r => require.ensure([], () => r(require('../views/promotions/12_2_1.vue')), 'promotions')
  },
  /**
   * 12.2.2 编辑促销活动
   */
  {
    path: '/promotion/:id/edit',
    meta: {
      title: '编辑促销活动',
    },
    name: '12.2.2',
    component: r => require.ensure([], () => r(require('../views/promotions/12_2_1.vue')), 'promotions')
  },
  /* 12.2.5.3 促销活动已绑定商品列表 */
  {
    path: '/promotion/:id/bindedGoods',
    meta: {
      title: '促销活动已绑定商品列表',
    },
    name: '12.2.5.3',
    component: r => require.ensure([], () => r(require('../views/promotions/12_2_5_3.vue')), 'promotions')
  },
  /* 12.2.5.4 促销活动能绑定商品列表 */
  {
    path: '/promotion/:id/canBindedGoods',
    meta: {
      title: '促销活动能绑定商品列表',
    },
    name: '12.2.5.4',
    component: r => require.ensure([], () => r(require('../views/promotions/12_2_5_4.vue')), 'promotions')
  },
  /**
   * 12.3 活动商品黑名单
   */
  {
    path: '/promotion/activityGoodsBlackList',
    meta: {
      title: '活动商品黑名单',
    },
    name: '12.3',
    component: r => require.ensure([], () => r(require('../views/promotions/12_3.vue')), 'promotions')
  },
  /**
   * 12.3.1 加入黑名单
   */
  {
    path: '/promotion/joinActivityGoodsBlackList',
    meta: {
      title: '加入活动商品黑名单',
    },
    name: '12.3.1',
    component: r => require.ensure([], () => r(require('../views/promotions/12_3_1.vue')), 'promotions')
  },
  /**
   * 12.6 促销活动详情
   */
  {
    path: '/promotion/:id',
    meta: {
      title: '促销活动详情',
    },
    name: '12.2.1.2',
    component: r => require.ensure([], () => r(require('../views/promotions/12_2_1_2.vue')), 'promotions')
  },
]
