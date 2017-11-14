/* created by Forest */

/**
 * 售后服务
 */

import networklib from './networklib';
import merchantlib from './merchantlib';
import utillib from './utillib';

export default {
  /**
   * 4003-新增售后单备注
   */
  addRemark(param, callback) {
    param.merchantId = merchantlib.getMerchantId();
    param.memberId = merchantlib.getMemberId();
    param.memberName = merchantlib.getName();

    console.log('新增售后单备注 param:', JSON.stringify(param))
    networklib.post('4003', param).then(obj => {
      console.log('4003 obj', obj)
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },
  /**
   * 4007 - 查询售后单列表
   */
  queryList(param, callback) {
    param.memberId = merchantlib.getMemberId()
    param.merchantId = merchantlib.getMerchantId()
    console.log('4007 - 查询售后单列表', JSON.stringify(param))
    networklib.post('4007', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },
  /**
   * 4001-创建售后单接口
   */
  createAftersales(param, callback) {
    param.merchantId = merchantlib.getMerchantId();
    param.memberId = merchantlib.getMemberId();

    console.log('4001 param:', JSON.stringify(param))
    networklib.post('4001', param).then(obj => {
      console.log('4001 obj', JSON.stringify(obj))
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      console.log('4001 err', JSON.stringify(err))
      if (callback) { callback(err); }
    });
  },

  /**
   * 4004-更改售后单状态
   */
  updateAftersalesState(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.memberName = merchantlib.getName();
    param.merchantId = merchantlib.getMerchantId();

    // console.log('4004-更改售后单状态 param:', JSON.stringify(param))
    networklib.post('4004', param).then(obj => {
      // console.log('4004-更改售后单状态 333 obj:', JSON.stringify(obj))
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      // console.log('4004-更改售后单状态 222 err:', JSON.stringify(err))
      if (callback) { callback(err); }
    });
  },

  /**
   * 4006-查询售后单不同状态的数量
   */
  queryOrderStatsNum(callback) {
    let param = {
      memberId: merchantlib.getMemberId(),
      merchantId: merchantlib.getMerchantId()
    }
    console.log('4006-查询售后单不同状态的数量 param:', JSON.stringify(param))
    networklib.post('4006', param).then(obj => {
      console.log('4006-查询售后单不同状态的数量 obj:', JSON.stringify(obj))
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 4008-查询售后单详情
   */
  queryAfterselesInfo(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('4008-查询售后单详情 param:', JSON.stringify(param))
    networklib.post('4008', param).then(obj => {
      console.log('4008-查询售后单详情 obj:', JSON.stringify(obj))
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 4009-查询已结束7天后的订单列表
   * mebmerId:  会员id  string
   * merchantId:  商户id  string
   * pageNo:  当前页 string
   * pageSize:  每页记录数 string
   */
  getCanAfterSale(memberId, pageNo, pageSize, callback) {
    let merchantId = merchantlib.getMerchantId();

    let param = {
      memberId,
      merchantId,
      pageNo,
      pageSize,
    }
    console.log('4009-param', param);
    networklib.post('4009', param).then(obj => {
      console.log('obj', obj)
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

   /**
   * 4010-确认退货
   * Isfreight: 是否补贴订单运费 （0/1）
   * afterSalesId；售后单ID
   * amount: 应退金额
   * imgUrl：退货照片
   * returnGoodsNo: 退货单号
   */
  confirmAfterSale(param, callback) {
    param.memberName = merchantlib.getName();
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('确认退货入参：', JSON.stringify(param))
    networklib.post('4010', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },
  /**
   * 4011-查询单件售后单是否能申请售后
   * goodsId: 商品ID
   * memberId；操作人
   * merchantId: 商户id
   * orderNo：订单号
   * skuId：skuid,维一的一组sku，比如：红色，M。 0201，01
   */
  afterSaleCanOrNot(goodsId, orderNo, skuId, callback) {
    let param = {
      goodsId,
      orderNo,
      skuId,
    }
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();

    console.log('afterSaleCanOrNot param:', JSON.stringify(param))
    networklib.post('4011', param).then(obj => {
      // console.log('obj', obj)
      if (callback) {
        callback(null, obj)
      }
    }).catch(err => {
      // console.log('err', err)
      if (callback) { callback(err) }
    })
  },

  /**
   * 生成发给聊天室的信息包
   * 如果添加新的申请类型或退货方式需要配置
   * @param  {[type]} aftersale [description]
   * @return {[type]}           [description]
   */
  generateAftersaleForIMRemote(aftersale) {
    console.log('generateAftersaleForIMRemote333', JSON.stringify(aftersale))
    // var type = ''
    // var returnType = ''
    // // 申请类型 id=>text
    // if (aftersale.type == '0') {
    //   type = '退货退款'
    // } else {
    //   type = ''
    // }
    // // 退货方式 id => text
    // if (aftersale.returnType == '0') {
    //   returnType = '物流退回'
    // } else if (aftersale.returnType == '1') {
    //   returnType = '到店退回'
    // } else {
    //   returnType = ''
    // }

    let param = {
      receiver: 'BL' + aftersale.memberId,
      aftersale: {
        goodsImgUrl: aftersale.goodsList[0].imgUrl,
        afterSalesOrderId: aftersale.saleAfterId,
        goodsStandaName: aftersale.goodsList[0].goodsName,
        goodsCount: aftersale.goodsList[0].goodsNum,
        afterSalesType: aftersale.type,
        goodsReturnType: aftersale.returnType
      }
    }
    // console.log('generateAftersaleForIMRemote param', JSON.stringify(param))
    return param
  },

  /**
   * 生成倒计时文案
   * @return {[type]} [description]
   */
  generateTitleString(aftersale) {
    let aftersaleStatus = aftersale.status; // 售后单状态
    let orderStatus = aftersale.orderStatus; // 原订单状态
    let isAll = aftersale.isAll // 是否整单
    let returnType = aftersale.returnType; // 退货方式
    let expiredAt = aftersale.expiredAt; // 过期时间
    let distributionMode = aftersale.distributionMode // 原订单配送方式

    let titleString = '';

    // 是否有过期时间 没有返回空字符串
    if (expiredAt === '') {
      return titleString
    }
    // 获取倒计时 时间
    let time = utillib.countdowm(new Date(expiredAt.replace(/-/g, "/")).getTime())
    // console.log('倒计时：', time)

    // 订单状态
    // 01-待支付 02-待接单 03-待发货 04-待收货 05-待自提 06-交易完成 07-交易关闭

    if (time.indexOf('已超时') < 0) { // 倒计时进行中
      if (aftersaleStatus == '0') { // 申请中
        if (isAll == 0) { // 部分退
          titleString = '您还有' + time + '来处理客户的申请'
        } else { // 整单退
          // 判断原订单状态
          if (orderStatus == '03' || orderStatus == '05') {
            titleString = '客户申请了退整单：您还有' + time + '来处理客户的申请'
          }
          if (orderStatus == '07' && distributionMode == '0') { // 待发货 交易关闭
            titleString = '因订单超时未发货，系统自动退单：您还有' + time + '来处理客户的申请'
          }
          if (orderStatus == '07' && distributionMode == '1') { // 待自提 交易关闭
            titleString = '因客户超时未自提，系统自动退单：您还有' + time + '来处理客户的申请'
          }
        }
      } else if (aftersaleStatus == '1') { // 待退回
        if (returnType == '0') { // 物流退回
          titleString = '客户还有' + time + '联系快递寄回商品'
        }
        if (returnType == '1') { // 到店退回
          titleString = '客户还有' + time + '到店退回商品'
        }
      } else if (aftersaleStatus == '3') { // 退货中
        titleString = '您还有' + time + '确认退货或中止受理'
      }
    } else { // 倒计时结束
      if (aftersaleStatus == '0') { // 申请中
        if (isAll == 0) { // 部分退
          titleString = '您' + time + '未处理客户的申请，请及时处理！'
        } else { // 整单退
          // 判断原订单状态
          if (orderStatus == '03' || orderStatus == '05') {
            titleString = '客户申请了退整单：您' + time + '未处理客户的申请，请及时处理！'
          }
          if (orderStatus == '07' && distributionMode == '0') { // 待发货 交易关闭
            titleString = '因订单超时未发货，系统自动退单：您' + time + '未处理客户的申请，请及时处理！'
          }
          if (orderStatus == '07' && distributionMode == '1') { // 待自提 交易关闭
            titleString = '因客户超时未自提，系统自动退单：您' + time + '未处理客户的申请，请及时处理！'
          }
        }
      } else if (aftersaleStatus == '1') { // 待退回
        if (returnType == '0') { // 物流退回
          titleString = '客户' + time + '未快递退回商品，请联系用户及时处理！'
        }
        if (returnType == '1') { // 到店退回
          titleString = '客户' + time + '未到店退回商品，请联系用户及时处理！'
        }
      } else if (aftersaleStatus == '3') { // 退货中
        titleString = '您' + time + '未处理客户的退货，请及时处理！'
      }
    }
    // console.log('titleString:', titleString)
    return titleString
  },
}
