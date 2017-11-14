export const uiRouter = [
  { path: '/ui',
    component: resolve => require(['../views/UI/home'], resolve),
    children: [
      {
        path: '/ui/homepageEntrance',
        meta: {
          title: '首页入口',
          class: 'homepageEntrance'
        },
        name: 'ui/homepageEntrance',
        component: r => require.ensure([], () => r(require('../views/UI/homepageEntrance')), 'homepageEntrance')
      },
      {
        path: '/ui/message',
        meta: {
          title: '消息',
        },
        component: r => require.ensure([], () => r(require('../views/UI/message')), 'message')
      }
    ]},
  /* test FED UI */
  {
    path: '/ui/test',
    meta: {
      title: 'test'
    },
    component: r => require.ensure([], () => r(require('../views/UI/catelog')), 'uitest')
  },
  {
    path: '/ui/components',
    meta: {
      title: 'test'
    },
    component: r => require.ensure([], () => r(require('../components/components.vue')), 'uitest')
  },
  // Mint-ui
  // {
  //   path: '/ui/mint',
  //   meta: {
  //     title: 'mint-ui'
  //   },
  //   component: r => require.ensure([], () => r(require('../views/UI/mint-ui.vue')), 'uitest')
  // },
  /* 5.2  樊丘名 商品属性*/
  {
    path: '/ui/goodsSKU',
    meta: {
      title: '属性管理',
      class: 'attributeEdit'
    },
    name: 'ui/5.2',
    component: r => require.ensure([], () => r(require('../views/ui/5_2')), 'attributeEdit')
  },
  /* 5.10  LLM 商品上新*/
  {
    path: '/ui/createGoods',
    meta: {
      title: '商品上新',
      class: 'goodinset'
    },
    name: 'ui/5.10',
    component: r => require.ensure([], () => r(require('../views/UI/5_10')), 'goodinset')
  },
  /* 5.7 Ming */
  {
    path: '/ui/goodsSales',
    meta: {
      title: '商品库',
      class: 'batchauditgoods'
    },
    name: 'ui/5.7',
    component: r => require.ensure([], () => r(require('../views/ui/5_7')), 'goodsSales')
  },
  /* 5.8 Ming */
  {
    path: '/ui/goodsManage',
    meta: {
      title: '商品管理',
      class: 'batchauditgoods'
    },
    name: 'ui/5.8',
    component: r => require.ensure([], () => r(require('../views/ui/5_8')), 'goodsManage')
  },
  /* 5.15 Ming */
  {
    path: '/ui/batchAuditGoods',
    meta: {
      title: '批量审批',
      class: 'batchauditgoods'
    },
    name: 'ui/5.15',
    component: r => require.ensure([], () => r(require('../views/ui/5_15.vue')), 'batchAuditGoods')
  },
  /* 姚文定 商品属性  */
  {
    path: '/ui/goodinset',
    meta: {
      title: '商品属性',
      class: 'commodityAttribute'
    },
    name: 'commodityAttribute',
    component: r => require.ensure([], () => r(require('../views/ui/commodityAttribute.vue')))
  },

  /* 商户设置 */
  {
    path: '/ui/MerSetting',
    meta: {
      title: '商户设置',
      class: 'merSetting'
    },
    name: 'ui/2.1',
    component: r => require.ensure([], () => r(require('../views/ui/merSetting')), 'merSetting')
  },
  {
    path: '/ui/listBrand',
    meta: {
      title: '经营品牌',
      class: 'listBrand'
    },
    name: 'ui/2.1.1',
    component: r => require.ensure([], () => r(require('../views/ui/listBrand')), 'listBrand')
  },

  {
    path: '/ui/validate',
    meta: {
      title: '校验',
    },
    component: r => require.ensure([], () => r(require('../views/ui/1')), 'validate')
  },
  /* 营销工具 */
  {
    path: '/ui/marketingTool',
    meta: {
      title: '营销工具',
      class: 'marketingTool'
    },
    name: 'ui/marketingTool',
    component: r => require.ensure([], () => r(require('../views/ui/marketingTool')), 'marketingTool')
  },
  /* 营销工具 已发布内容 */
  {
    path: '/ui/marketing',
    meta: {
      title: '已发布内容',
      class: 'marketing'
    },
    name: 'ui/6.3',
    component: r => require.ensure([], () => r(require('../views/ui/6-3')), '6-3')
  },

  /* 营销工具 上新广播 */
  {
    path: '/ui/newcast',
    meta: {
      title: '上新广播',
      class: 'newcast'
    },
    name: 'ui/6.3.1',
    component: r => require.ensure([], () => r(require('../views/ui/6-3-1')), '6-3-1')
  },

  /* 发放优惠券 Issue coupons*/
  {
    path: '/ui/issueCoupons',
    meta: {
      title: '发放优惠券',
      class: 'issueCoupons'
    },
    name: 'ui/6.2',
    component: r => require.ensure([], () => r(require('../views/ui/6-2')), '6-2')
  },

  /* 发布上新 New release*/
  {
    path: '/ui/newRelease',
    meta: {
      title: '发布上新',
      class: 'issueCoupons'
    },
    name: 'ui/6.1',
    component: r => require.ensure([], () => r(require('../views/ui/6-1')), '6-1')
  },
  {
    path: '/components-address',
    meta: {
      title: '地址组件'
    },
    component: r => require.ensure([], () => r(require('../components/components-address')), 'components-address')
  },
  /* 二维码 */
  {
    path: '/ui/goodsQR',
    meta: {
      title: '商品二维码',
      class: 'goodsQR'
    },
    name: 'ui/5.12',
    component: r => require.ensure([], () => r(require('../views/ui/5-12')), 'goodsQR')
  },
  /* 消息 */
  {
    path: '/ui/sms',
    meta: {
      title: '系统消息',
      class: 'sms'
    },
    name: 'ui/7.1.3',
    component: r => require.ensure([], () => r(require('../views/ui/7-1-3')), 'sms')
  },
  /* 我的消息 */
  {
    path: '/ui/mysms',
    meta: {
      title: '系统消息',
      class: 'mysms'
    },
    name: 'ui/7.1',
    component: r => require.ensure([], () => r(require('../views/ui/7-1')), 'mysms')
  },
  {
    path: '/ui/order',
    meta: {
      title: '代客下单',
      class: 'order',
    },
    name: 'ui/7.3',
    component: r => require.ensure([], () => r(require('../views/ui/7-3')), 'order')
  },
  /* 订单管理 */
  {
    path: '/ui/orderment',
    meta: {
      title: '订单管理',
      class: 'orderment',
    },
    name: 'ui/9.1',
    component: r => require.ensure([], () => r(require('../views/ui/9-1')), 'orderment')
  },
  {
    path: '/ui/orderStatus',
    meta: {
      title: '订单详情',
      class: 'orderStatus',
    },
    name: 'ui/9.1.2',
    component: r => require.ensure([], () => r(require('../views/ui/9-1-2')), 'orderStatus')
  },
  {
    path: '/ui/express',
    meta: {
      title: '物流追踪',
      class: 'orderStatus',
    },
    name: 'ui/9.1.6',
    component: r => require.ensure([], () => r(require('../views/ui/9-1-6')), 'orderStatus')
  },
  {
    path: '/ui/writeOff',
    meta: {
      title: '核销',
      class: 'orderStatus',
    },
    name: 'ui/9.1.52',
    component: r => require.ensure([], () => r(require('../views/ui/9-1-52')), 'writeOff')
  },
  {
    path: '/ui/pinCode',
    meta: {
      title: '销码',
      class: 'pinCode',
    },
    name: 'ui/9.1.51',
    component: r => require.ensure([], () => r(require('../views/ui/9-1-51')), 'pinCode')
  },
  {
    path: '/ui/billing',
    meta: {
      title: '开单',
      class: 'billing',
    },
    name: 'ui/9.1.3',
    component: r => require.ensure([], () => r(require('../views/ui/9-1-3')), 'billing')
  },
  {
    path: '/ui/allorders',
    meta: {
      title: '全部订单',
      class: 'allorders',
    },
    name: 'ui/9.1.1',
    component: r => require.ensure([], () => r(require('../views/ui/9-1-1')), 'allorders')
  },
  {
    path: '/ui/management',
    meta: {
      title: '审核授权',
      class: 'management',
    },
    name: 'ui/4.1',
    component: r => require.ensure([], () => r(require('../views/ui/4-1')), 'management')
  },
  {
    path: '/ui/queryAuth',
    meta: {
      title: '查询申请授权',
      class: 'queryAuth',
    },
    name: 'ui/4.2',
    component: r => require.ensure([], () => r(require('../views/ui/4-2')), 'queryAuth')
  },
  {
    path: '/ui/audDetail',
    meta: {
      title: '待审核商户详情',
      class: 'audDetail',
    },
    name: 'ui/4.4.1',
    component: r => require.ensure([], () => r(require('../views/ui/4-4-1')), 'audDetail')
  },
  /* 发货页面 */
  {
    path: '/ui/sendgoods',
    meta: {
      title: '发货'
    },
    name: 'ui/9.1.4',
    component: r => require.ensure([], () => r(require('../views/ui/9-1-4')), 'sendgoods')
  },
  {
    path: '/ui/createActivity',
    meta: {
      title: '创建活动'
    },
    name: 'ui/6.4',
    component: r => require.ensure([], () => r(require('../views/ui/6-4')), 'createActivity')
  },
  /* 创建活动内容 规则 */
  {
    path: '/ui/actContent',
    meta: {
      title: '活动内容'
    },
    name: 'ui/6.4.1',
    component: r => require.ensure([], () => r(require('../views/ui/6-4-1')), 'actContent')
  },
  {
    path: '/ui/actDetail',
    meta: {
      title: '活动详情'
    },
    name: 'ui/6.5',
    component: r => require.ensure([], () => r(require('../views/ui/6-5')), 'actDetail')
  },
  {
    path: '/ui/returnGoods',
    meta: {
      title: '退货单回录',
      class: 'returnGoods'
    },
    name: 'ui/10.2.4.1',
    component: r => require.ensure([], () => r(require('../views/ui/10_2_4_1_returnGoods')), 'returnGoods')
  },
  {
    path: '/ui/serviceOrder',
    meta: {
      title: '填写售后单'
    },
    name: 'ui/10.1',
    component: r => require.ensure([], () => r(require('../views/ui/10-1')), 'serviceOrder')
  },
  {
    path: '/ui/commonAttributes',
    meta: {
      title: '设置常用属性'
    },
    name: 'ui/2.1.5',
    component: r => require.ensure([], () => r(require('../views/ui/2-1-5')), 'commonAttributes')
  },
  {
    path: '/ui/upload',
    meta: {
      title: '图片裁切'
    },
    name: 'ui/5.1',
    component: r => require.ensure([], () => r(require('../views/ui/5_1')), 'upload')
  },
  {
    path: '/ui/dutyRoster',
    meta: {
      title: '排班表'
    },
    name: 'ui/1',
    component: r => require.ensure([], () => r(require('../views/ui/1')), 'dutyRoster')
  },
  {
    path: '/ui/dragSlide',
    meta: {
      title: '设置广告轮播图'
    },
    name: 'ui/6.8',
    component: r => require.ensure([], () => r(require('../views/ui/5_3')), 'setupSlide')
  },
  {
    path: '/ui/setupSlide',
    meta: {
      title: '设置广告轮播图'
    },
    name: 'ui/6.9',
    component: r => require.ensure([], () => r(require('../views/ui/5_4')), 'setupSlide')
  },
  {
    path: '/ui/tplPromotion',
    meta: {
      title: '促销活动模板'
    },
    name: 'ui/12.1',
    component: r => require.ensure([], () => r(require('../views/ui/12-1')), 'tplPromotion')
  },
  {
    path: '/ui/salesPromotion',
    meta: {
      title: '促销活动详情'
    },
    name: 'ui/12.2',
    component: r => require.ensure([], () => r(require('../views/ui/5_11')), 'salesPromotion')
  },
  {
    path: '/ui/editPromotion',
    meta: {
      title: '创建促销活动'
    },
    name: 'ui/12.3',
    component: r => require.ensure([], () => r(require('../views/ui/5_12')), 'editPromotion')
  },
  {
    path: '/ui/listPromotion',
    meta: {
      title: '促销活动列表'
    },
    name: 'ui/12.4',
    component: r => require.ensure([], () => r(require('../views/ui/5_13')), 'listPromotion')
  },
  {
    path: '/ui/boundGoods',
    meta: {
      title: '已绑定活动商品'
    },
    name: 'ui/12.5',
    component: r => require.ensure([], () => r(require('../views/ui/5_5')), 'boundGoods')
  },
  {
    path: '/ui/testui',
    meta: {
      title: 'testui'
    },
    name: 'ui/2',
    component: r => require.ensure([], () => r(require('../views/ui/2')), 'testui')
  },
  /*核销明细*/
  {
    path: '/ui/check',
    meta: {
      title: '核销明细',
      class: 'check'
    },
    name: 'ui/46.5',
    component: r => require.ensure([], () => r(require('../views/ui/46_5')), 'check')
  },
  /*发券二维码*/
  {
    path: '/ui/check_QRcode',
    meta: {
      title: '发券二维码',
      class: 'check'
    },
    name: 'ui/46.8',
    component: r => require.ensure([], () => r(require('../views/ui/46_8')), 'check_QRcode')
  },
  /*购买停车券*/
  {
    path: '/ui/parking',
    meta: {
      title: '购买停车券',
      class: 'check'
    },
    name: 'ui/46.13',
    component: r => require.ensure([], () => r(require('../views/ui/46_13')), 'parking')
  },
  {
    path: '/ui/parking1',
    meta: {
      title: '购买停车券',
      class: 'check'
    },
    name: 'ui/46.14',
    component: r => require.ensure([], () => r(require('../views/ui/46_14')), 'parking1')
  },
  {
    path: '/ui/offflow',
    meta: {
      title: '核销流水'
    },
    name: 'ui/46.1',
    component: r => require.ensure([], () => r(require('../views/ui/46_1')), 'offflow')
  },
  {
    path: '/ui/parkingDetail',
    meta: {
      title: '核销明细'
    },
    name: 'ui/46.4',
    component: r => require.ensure([], () => r(require('../views/ui/46_4')), 'parkingDetail')
  },
  {
    path: '/ui/parkingRecord',
    meta: {
      title: '核销记录'
    },
    name: 'ui/46.2',
    component: r => require.ensure([], () => r(require('../views/ui/46_2')), 'parkingRecord')
  },
  {
    path: '/ui/parkingList',
    meta: {
      title: '发券列表'
    },
    name: 'ui/46.3',
    component: r => require.ensure([], () => r(require('../views/ui/46_3')), 'parkingList')
  },
  {
    path: '/ui/parkingOrder',
    meta: {
      title: '订单详情'
    },
    name: 'ui/46.6',
    component: r => require.ensure([], () => r(require('../views/ui/46_6')), 'parkingOrder')
  },
  {
    path: '/ui/parkingCouponorder',
    meta: {
      title: '券订单'
    },
    name: 'ui/46.7',
    component: r => require.ensure([], () => r(require('../views/ui/46_7')), 'parkingCouponorder')
  },
  {
    path: '/ui/parkingBuy',
    meta: {
      title: '购买停车券'
    },
    name: 'ui/46.9',
    component: r => require.ensure([], () => r(require('../views/ui/46_9')), 'parkingBuy')
  },
  {
    path: '/ui/couponList',
    meta: {
      title: '券列表'
    },
    name: 'ui/46.10',
    component: r => require.ensure([], () => r(require('../views/ui/46_10')), 'couponList')
  },
  {
    path: '/ui/createCoupon',
    meta: {
      title: '创建优惠券'
    },
    name: 'ui/46.11',
    component: r => require.ensure([], () => r(require('../views/ui/46_11')), 'createCoupon')
  },
  {
    path: '/ui/searchPage',
    meta: {
      title: '搜索'
    },
    name: 'ui/3',
    component: r => require.ensure([], () => r(require('../views/ui/3')), 'searchPage')
  },
  {
    path: '/ui/rules',
    meta: {
      title: '章程'
    },
    name: 'ui/6',
    component: r => require.ensure([], () => r(require('../views/ui/6')), 'rules')
  },
  {
    path: '/ui/addorder',
    meta: {
      title: '代客下单订单'
    },
    name: 'ui/7.3.1',
    component: r => require.ensure([], () => r(require('../views/ui/7-3-1')), 'addorder')
  },
  {
    path: '/ui/userLogin',
    meta: {
      title: '登录'
    },
    name: 'ui/0',
    component: r => require.ensure([], () => r(require('../views/ui/0')), 'userLogin')
  },
  {
    path: '/ui/sendsms',
    meta: {
      title: '快速登录'
    },
    name: 'ui/0.1',
    component: r => require.ensure([], () => r(require('../views/ui/0-1')), 'userLogin')
  },
  {
    path: '/ui/forgetPass',
    meta: {
      title: '忘记密码'
    },
    name: 'ui/0.2',
    component: r => require.ensure([], () => r(require('../views/ui/0-2')), 'userLogin')
  },
  {
    path: '/ui/register',
    meta: {
      title: '快速注册'
    },
    name: 'ui/0.3',
    component: r => require.ensure([], () => r(require('../views/ui/0-3')), 'userLogin')
  },
  {
    path: '/ui/shopinfo',
    meta: {
      title: '完善商户信息'
    },
    name: 'ui/0.4',
    component: r => require.ensure([], () => r(require('../views/ui/0-4')), 'userLogin')
  },
  {
    path: '/ui/toExamine',
    meta: {
      title: '信息正在审核中'
    },
    name: 'ui/0.5',
    component: r => require.ensure([], () => r(require('../views/ui/0-5')), 'userLogin')
  },
  {
    path: '/ui/contacts',
    meta: {
      title: '我的联系人'
    },
    name: 'ui/8',
    component: r => require.ensure([], () => r(require('../views/ui/8')), 'contacts')
  },
  {
    path: '/ui/contactsPeople',
    meta: {
      title: '详细资料'
    },
    name: 'ui/8.1',
    component: r => require.ensure([], () => r(require('../views/ui/8.1')), 'contacts')
  },
  {
    path: '/ui/groupFriend',
    meta: {
      title: '分组好友'
    },
    name: 'ui/8.2',
    component: r => require.ensure([], () => r(require('../views/ui/8.2')), 'contacts')
  },
  {
    path: '/ui/groupSort',
    meta: {
      title: '分组排序'
    },
    name: 'ui/8.3',
    component: r => require.ensure([], () => r(require('../views/ui/8.3')), 'contacts')
  },
  {
    path: '/ui/signupEvent',
    meta: {
      title: '报名参加专题活动'
    },
    name: 'ui/11.1',
    component: r => require.ensure([], () => r(require('../views/ui/11.1')), 'events')
  },
  {
    path: '/ui/eventDetails',
    meta: {
      title: '专题详情'
    },
    name: 'ui/11.2',
    component: r => require.ensure([], () => r(require('../views/ui/11.2')), 'events')
  },
  {
    path: '/ui/eventGoods',
    meta: {
      title: '选择提报商品'
    },
    name: 'ui/11.3',
    component: r => require.ensure([], () => r(require('../views/ui/11.3')), 'events')
  },
  {
    path: '/ui/eventTags',
    meta: {
      title: '提报商品'
    },
    name: 'ui/11.4',
    component: r => require.ensure([], () => r(require('../views/ui/11.4')), 'events')
  },
  {
    path: '/ui/eventTab',
    meta: {
      title: '已报名的专题'
    },
    name: 'ui/11.5',
    component: r => require.ensure([], () => r(require('../views/ui/11.5')), 'events')
  },
  {
    path: '/ui/eventAlready',
    meta: {
      title: '已入选的专题'
    },
    name: 'ui/11.6',
    component: r => require.ensure([], () => r(require('../views/ui/11.6')), 'events')
  },
  {
    path: '/ui/eventState',
    meta: {
      title: '专题状态'
    },
    name: 'ui/11.7',
    component: r => require.ensure([], () => r(require('../views/ui/11.7')), 'events')
  },
  {
    path: '/ui/tagCommon',
    meta: {
      title: '标签组件'
    },
    name: 'ui/12.1',
    component: r => require.ensure([], () => r(require('../views/ui/12.1')), 'tag')
  },
  {
    path: '/ui/tagManage',
    meta: {
      title: '标签管理'
    },
    name: 'ui/12.2',
    component: r => require.ensure([], () => r(require('../views/ui/12.2')), 'tag')
  },
  {
    path: '/ui/newTag',
    meta: {
      title: '添加新标签'
    },
    name: 'ui/12.3',
    component: r => require.ensure([], () => r(require('../views/ui/12.3')), 'tag')
  },
  {
    path: '/ui/Agreement',
    meta: {
      title: '协议'
    },
    name: 'ui/13',
    component: r => require.ensure([], () => r(require('../views/ui/13')))
  }
]
