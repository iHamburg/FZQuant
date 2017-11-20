/* creat by chenpeng */

/**
 * 请求集中在这个文件中

 * dev 1.1

 */
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true

// 如果是build就生产, dev是development, build是 production
// console.log('---------- NODE_ENV', process.env.NODE_ENV);

let baseUrl = 'api'; // 发版后的host是相对路径

//本地运行 npm run build
if (process.env.NODE_ENV == 'development') {
  // baseUrl = 'http://localhost:3000/api';  // 本地服务器
  // baseUrl = 'http://10.202.169.19:8080/api';  // SIT 服务器
  // baseUrl = 'http://cloudom.ut.bl.com/api'  // PRE 服务器
  // baseUrl = 'http://cloudom.bl.com/api'  // PRD 服务器
  // baseUrl = 'http://120.136.161.163:3000/api';  //DEV 服务器, 废弃
  baseUrl = 'http://120.136.161.189:8080/api'
}

console.log('---------- HOST', baseUrl);

// mock
// const baseUrl = '/mockapi'

const networkPaths = {

  CM1001: '/coupons/assignCoupon',          // CM1001 - 分配券
  CM1002: '/coupons/queryCouponList',       // CM1002 - 查询券模板列表
  CM1003: '/coupons/couponDetail',          // CM1003 - 查询券模板详情
  CM1005: '/coupons/createCoupon',          // CM1005 - 创建券模板接口
  CM1006: '/coupons/undoCouponRecord',      // CM1006 - 券码销核列表
  CM1007: '/coupons/cm1007',                // CM1006 - 核销券
  CM1008: '/coupons/undoCouponList',        // CM1008 - 已销券模板列表
  CM1011: '/coupons/hideCoupon',            // CM1011 - 隐藏券
  CM1104: '/coupons/detail',                // CM1104 - 网红促销员详情
  CM1105: '/coupons/findCouponsByMemberId', // CM1105 - 查询网红下的券模板列表(TA的券)
  CM1106: '/coupons/authorizeList',         // CM1106 - 商户已授权的网红列表
  CM1010: '/coupons/getMemberDetail',       // CM1010 - 查询券模板分配的网红列表（已分配券列表）
  CM1027: '/coupons/1027',                  // CM1027 - 查询可发放优惠券列表
  CM1028: '/coupons/1028',                  // CM1028 - 发布优惠券

  1001: '/merchant/1001', // 1001-商品图片上传接口
  1002: '/goods/1002',    // 1002-商品审核接口
  1003: '/goods/1003',    // 1003-插入商品信息
  1004: '/goods/1004',    // 1004-更新商品信息接口
  1005: '/goods/1005',    // 1005-查询sku属性接口列表
  1006: '/goods/1006',    // 1006-查询分类列表
  1007: '/goods/1007',    // 1007-查询品牌列表
  1008: '/goods/1008',    // 1008-查询商品详情
  1009: '/goods/1009',    // 1009-查询大类码列表接口
  1010: '/goods/1010',    // 1010-根据商品状态查询商品列表
  1011: '/goods/1011',    // 1011-根据商品状态查询商品列表,
  1012: '/goods/1012',    // 1012-根据字典KEY查询字典表
  1013: '/goods/1013',    // 1013-添加属性子节点接口
  1014: '/goods/1014',    // 1014-统计商品状态数量
  1015: '/goods/1015',    // 1015-查询二维码是否绑定接口
  1016: '/goods/1016',    // 1016-查询二维码接口
  1017: '/goods/1017',    // 1017-绑定二维码接口
  1018: '/goods/1018',    // 1018-查询商品排列组合列表
  1019: '/goods/1019',    // 1019-更新sku库存状态
  1020: '/goods/1020',    // 1020-重新生成排列组合接口
  1039: '/goods/1039',    // 1039-批量删除商品
  1040: '/goods/1040',    // 1040-隐藏商品sku属性

  1021: '/merchant/1021',   // 商户登录注册
  1022: '/merchant/1022',   // 1022-修改商户设置
  1023: '/merchant/1023',   // 1023-查询商户设置
  1024: '/merchant/1024',   // 1024-查询品牌目录列表
  1025: '/marketing/1025', // 1025-查询可上新商品列表
  1026: '/marketing/1026', // 1026-发布商品上新
  1027: '/coupons/1027',    // 1027-查询可发放优惠券列表
  1028: '/coupons/1028',    // 1028-发布优惠券
  1029: '/marketing/1029', // 1029-查询已发布内容列表
  1030: '/marketing/1030', // 1030-删除发布内容
  1031: '/marketing/1031', // 1031-查询已发布内容详情
  1032: '/merchant/1032',   // 1032-上传LOGO或上传头像
  1033: '/goods/1033',      // 1033-商户首页新增入口提示
  cloud1034: '/merchant/1034', //1034-查询用户权限表
  cloud1035: '/merchant/1035', // 1035-查询商户停车券权限

  1034: '/schedual/1034',   // 1034-查询用户权限表
  1035: '/schedual/1035',   // 1035-查询排班表
  1036: '/schedual/1036',   // 1036-设置排班表
  1037: '/schedual/1037',   // 1037-查询商户所有店员
  1038: '/schedual/1038',      // 1038-查询当前登录用户是否当班

  1041: '/merchant/1041', // 1041-更新商户个人信息接口
  1042: '/merchant/1042', // 1042-注销店员接口
  1043: '/merchant/1043', // 1043-查询员工基础信息
  1045: '/merchant/1045', // 1045-查询审核店员列表接口
  1044: '/merchant/1044', // 1044-查询商户店员详情接口
  1046: '/merchant/1046', // 1046-查询审核店员详情接口
  1047: '/merchant/1047', // 1047-审核店员接口
  1048: '/merchant/1048', // 1048-验证码-商户忘记密码
  1049: '/merchant/1049', // 1049-商户重置密码
  1050: '/merchant/1050', // 1050-查询商户店员列表接口
  1051: '/merchant/1051', // 1051-查询商户角色接口
  1052: '/merchant/1052', // 1052-商户完善注册信息接口
  1053: '/merchant/1053', // 1053-查询门店商户信息接口
  1054: '/merchant/1054', // 1054-商户初次注册接口
  1055: '/merchant/1055', // 1055-商户快速登录注册
  1056: '/merchant/1056', // 1056-验证码-商户快速登录注册
  1057: '/merchant/1057', // 1057-发送注册验证码
  1058: '/merchant/1058', // 1058-校验用户数据是否存在

  2001: '/order/2001', // 2001-查询订单不同状态数量
  2002: '/order/2002', // 2002-查询订单列表
  2003: '/order/2003', // 2003-查询订单详情
  2004: '/order/2004', // 2004-更改订单状态
  2005: '/order/2005', // 2005-商户（接单）开单
  2006: '/order/2006', // 2006-根据提货码查询订单
  2007: '/order/2007', // 2007-查询商户消息列表
  2008: '/order/2008', // 2008-查询未读消息数量
  2010: '/order/2010', // 2010-标识消息已读
  2011: '/order/2011', // 2011-插入用户历史查询商品
  2012: '/order/2012', // 2012-查询用户历史咨询商品
  2013: '/order/2013', // 2013-核销提货码
  2014: '/order/2014', // 2014-添加（修改）备注
  2015: '/order/2015', // 2015-查询消息中心消息列表
  2016: '/order/2016', // 2016-物流下单（发货）
  2017: '/order/2017', // 2017-生成订单
  2018: '/order/2018', // 2018-物流流水信息
  2019: '/order/2019', // 2019-查询订单自提码核销记录列表
  2020: '/goods/2020', // 2020-批量修改商品sku无货
  2021: '/order/2021', // 2021-查询无货订单商品sku列表

  2200: '/order/2200', // 2200-商户购停车券订单列表
  2201: '/order/2201', // 2201-商户购停车券订单详情
  2202: '/order/2202', // 2202-查询商户可购券模版列表
  2203: '/order/2203', // 2203-创建购买停车券订单
  2204: '/order/2204', // 2204-发券列表
  2205: '/order/2205', // 2205-发券详情
  2206: '/coupons/2206', // 2206-核销券列表
  2207: '/coupons/2207', // 2207-核销停车券详情

  2299: '/order/2299', // 2299-  h5 支付

  3001: '/activity/3001', // 3001-发布活动广播
  3002: '/activity/3002', // 3002-新增活动
  3003: '/activity/3003', // 3003-更新活动状态
  3004: '/activity/3004', // 3004-查询活动列表
  3005: '/activity/3005', // 3005-查询活动详情
  3006: '/activity/3006', // 3006-编辑活动

  4001: '/aftersales/4001', // 4001-创建售后单接口
  4002: '/aftersales/4002', // 4002-发布推荐商品
  4003: '/aftersales/4003', // 4003-新增售后单备注
  4004: '/aftersales/4004', // 4004-更改售后单状态
  4005: '/aftersales/4005', // 4005-查询可推荐商品列表
  4006: '/aftersales/4006', // 4006-查询售后单不同状态的数量
  4007: '/aftersales/4007', // 4007-查询售后单列表
  4008: '/aftersales/4008', // 4008-查询售后单详情
  4009: '/aftersales/4009', // 4009-查询已结束7天后的订单列表
  4010: '/aftersales/4010', // 4010-确认退货
  4011: '/aftersales/4011', // 4011-查询单件售后单是否能申请售后

  5001: '/promotions/5001', // 5001-创建商品促销活动
  5002: '/promotions/5002', // 5002-增减商户促销活动黑名单
  5003: '/promotions/5003', // 5003-按分类查询可添加黑名单商品列表
  5004: '/promotions/5004', // 5004-更新促销活动状态
  5005: '/promotions/5005', // 5005-更新商品促销活动
  5006: '/promotions/5006', // 5006-查询促销活动商品列表
  5007: '/promotions/5007', // 5007-查询商品促销模板详情
  5008: '/promotions/5008', // 5008-查询商品分类列表（json树）
  5009: '/promotions/5009', // 5009-查询商户特殊有效促销方式活动列表
  5010: '/promotions/5010', // 5010-查询商户促销活动列表
  5011: '/promotions/5011', // 5011-查询商户促销活动黑名单列表
  5012: '/promotions/5012', // 5012-查询所有活动可绑定商品列表
  5013: '/promotions/5013', // 5013-根据上传的商品列表，返回带促销信息的商品列表
  5014: '/promotions/5014', // 5014-添加已绑定参活商品
  5015: '/promotions/5015', // 5015-移除商户促销活动已绑定商品

  6001: '/coupons/6001', // 6001-创建优惠券接口
  6002: '/coupons/6002', // 6002-查询优惠券可绑定商品列表
  6003: '/coupons/6003', // 6003-更新优惠券接口
  6004: '/coupons/6004', // 6004-更新优惠券状态
  6005: '/coupons/6005', // 6005-查询优惠券详情
  6006: '/coupons/6006', // 6006-查询优惠券列表
  6007: '/coupons/6007',
  6008: '/coupons/6008', // 6008-查询优惠券核销记录列表
  6009: '/coupons/6009', // 6009-查询优惠券核销记录明细
  6010: '/coupons/6010', // 6010-查询优惠券核销记录详情
  6011: '/coupons/6011', // 6011-查询优惠券已绑定商品列表

  7001: '/merchant/7001',  //7001-查询用户信息

  9999: '/tests/test', // 测试用接口

  shareUrl: '/service/shareUrl', //
  getInfo: '/service/getInfo', // 获取server信息

};

export default {

  test() {
    return 'test';
  },
  /**
   * 调用接口
   *
   * @param apiId  1011
   * @param params
   * @return Promise {obj}
   */
  post: (apiId, params) => {
    let path = networkPaths[apiId];
    let url = baseUrl + path;
    // console.log('post url ', url);
    return new Promise(function (resolve, reject) {
      Vue.http.post(url, params).then(obj => {
        // console.log('Vue.http.post obj:\n', JSON.stringify(obj))
        var data = obj.body || {};
        // console.log('url:\n', url, '\n params:\n', JSON.stringify(params), '\n data:\n', JSON.stringify(data));
        if (data.resCode === '00100000') {
          resolve(data.obj);
          // resolve('abc');
        } else {
          let msg = '';
          if (!data.resCode) { // 中台发版
            msg = '哎呦服务器去火星了。。。';
          } else {
            //msg = '接口错误 ' + data.resCode + ' ' + data.msg;
            msg = data.msg;
          }
          console.log('哎呦。。服务器去火星了', apiId + ' resCode ' + data.resCode + ' ' + msg);
          reject(msg);
        }
      }, () => {
        console.log(url, ' 404网络错误');
        reject(url + ' 404网络错误');
      }
      );
    });
  },

  getServerInfo(callback) {
    this.post('getInfo').then(obj => {
      if (callback) callback(null, obj)
    }).catch(err => {
      if (callback) callback(err)
    })
  }
}
