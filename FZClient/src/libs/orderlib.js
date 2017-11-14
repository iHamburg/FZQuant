/* created by 张怡清 */

/**
 * 订单相关的功能
 */

import networklib from './networklib';
import merchantlib from './merchantlib';
import goodslib from './goodslib';
import utillib from './utillib';
import Vue from 'vue'

//本地订单
let order = {
  name: '本地订单',
  goodsList: [],
  discountAmount: 0, // 优惠金额
  goodsGroupList: [
    {
      title: '',
      goodsList: [],
    }
  ],
};

export default {

/**
   *
   * 2001-查询订单不同状态数量 @author 方胜军
   *
   * @param memberId
   * @param merchantId
   * @param callback
   *
   */
  queryOrderCount(callback) {
    let memberId = merchantlib.getMemberId(); // merchantlib.getMemberId();
    let merchantId = merchantlib.getMerchantId();
    let param = { memberId, merchantId };
    console.log('2001-查询订单不同状态数量', JSON.stringify(param))
    networklib.post('2001', param).then(obj => {
      if (callback) {
        callback(null, obj);
        // console.log('成功的回调', '2001-查询订单不同状态数量', obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      // console.log('失败的回调', '2001-查询订单不同状态数量', err, param);
    });
  },

  /**
   *
   * 2002-查询订单列表 @author 黄凤秀
   * @param memberId
   * @param merchantId
   * @param orderState  订单状态id
   * @param pageNo  当前页
   * @param pageSize 每页记录数
   * @param callback
   */
  queryOrderList (orderState, pageNo, pageSize, callback) {
    let memberId = merchantlib.getMemberId();
    let merchantId = merchantlib.getMerchantId();
    let param = { memberId, merchantId, orderState, pageNo, pageSize };
    // console.log('2002-查询订单列表param', JSON.stringify(param));
    //返回mock数据
    networklib.post('2002', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err) }
      console.log('失败的回调1', '2002-查询订单列表', err, JSON.stringify(param));
    });
  },

  /**
   *
   * 2003-查询订单详情 @author 方胜军
   *
   * @param memberId
   * @param merchantId
   * @param orderNo
   * @param callback
   */
  queryOrder(orderNo, callback) {
    let memberId = merchantlib.getMemberId(); // "100000002715151";
    let merchantId = merchantlib.getMerchantId();
    let param = { memberId, merchantId, orderNo };
    networklib.post('2003', param).then(obj => {
      if (callback) {
        callback(null, obj);
        // console.log('成功的回调', '2003-查询订单详情', obj, param);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', '2003-查询订单详情', err, param);
    });
  },

  /**
   *
   * 2004-更改订单状态 @author 方胜军
   *
   * @param memberId
   * @param merchantId
   * @param orderNo 订单id
   * @param orderState 状态id
   * @param reason 关闭理由 string  当状态为交易关闭时，关闭理由必填
   *
   */
  updateOrderState(orderNo, orderState, reason, callback) {
    let memberId = merchantlib.getMemberId();
    let merchantId = merchantlib.getMerchantId();
    let memberName = merchantlib.getName();
    let param = { memberId, merchantId, memberName, orderNo, orderState, reason };

    networklib.post('2004', param).then(obj => {
      if (callback) {
        callback(null, obj);
        // console.log('成功的回调', '2004-更改订单状态', obj, param);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      // console.log('失败的回调', '2004-更改订单状态', err, param);
    });
  },
  // 生成倒计时文案
  getCountDownStatus(outTime, flag) {
    // flag:1 订单列表 2： 订单详情
    // 倒计时文案
    let titleString = '';
    if (outTime == "") {
      return titleString
    }
    // 获取倒计时时间戳
    let countdown = ''
    if (flag == 1) {
      countdown = utillib.countdowm(outTime)
    }
    // console.log('倒计时：', countdown)
    if (flag == 2) {
      countdown = utillib.countdowm(new Date(outTime.replace(/-/g, "/")).getTime())
    }
    // console.log('倒计时：', countdown)
    if (countdown.indexOf('已超时') < 0) {
      titleString = '剩余时间' + countdown
    } else {
      titleString = countdown
    }
    return titleString
  },

  /**
   * 2006-根据提货码查询订单 @author 黄凤秀
   * @param memberId
   * @param merchantId
   * @param deliveryCode 提货码
   * @param callback
   */
  queryOrderByDeliveryCode(deliveryCode, callback) {
    let memberId = merchantlib.getMemberId();
    let merchantId = merchantlib.getMerchantId();
    let param = { memberId, merchantId, deliveryCode };
    networklib.post('2006', param).then((obj) => {
      if (callback) {
        callback(null, obj.orderNo);
      }
    }).catch(err => {
      if (callback) { callback(err) };
    });
  },

  /**
   * 2013-核销订单提货码 @author 黄凤秀
   * @param memberId
   * @param merchantId
   * @param orderNo 订单id
   * @param deliveryCode 提货码
   * @param callback
   */
  verifyOrderDeliveryCode(orderNo, deliveryCode, callback) {
    let memberId = merchantlib.getMemberId();
    let merchantId = merchantlib.getMerchantId();
    let param = { memberId, merchantId, orderNo, deliveryCode };
    networklib.post('2013', param).then((obj) => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err) };
    });
  },

  /**
   *
   * 2014-添加（修改）备注 @author 方胜军
   *
   * @param memberId
   * @param orderNo 订单号
   * @param remark 备注
   *
   */
  updateOrderInfo(orderNo, remark, callback) {
    let memberId = merchantlib.getMemberId();
    let memberName = merchantlib.getName();
    let param = { memberId, orderNo, memberName, remark };

    networklib.post('2014', param).then(obj => {
      if (callback) {
        callback(null, obj);
        // console.log('成功的回调', '2014-添加（修改）备注', obj, param);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      // console.log('失败的回调', '2014-添加（修改）备注', err, param);
    });
  },
  /**
   * 2005 开单接口
   * [receiveOrder description]
   * @param  {[type]}   param    [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  receiveOrder(param, callback) {
    param.memberName = merchantlib.getName();
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('memberName:' + param.memberName + 'memberId:' + param.memberId + ',merchantId:' + param.merchantId)
    networklib.post('2005', param).then(obj => {
      if (callback) {
        callback(null, obj);
        console.log('成功的回调', '2005 开单接口', obj, param);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', '2005 开单接口', err, param);
    });
  },

  /**
   * 2017-生成订单
   */
  temporarilyActing(param, callback) {
    param.operatoroId = merchantlib.getMemberId();
    console.log('2017-生成订单====== param：', JSON.stringify(param))
    networklib.post('2017', param).then(obj => {
      if (callback) {
        // console.log('成功的回调', '2017-生成订单', obj, param);
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', '2017-生成订单', err, param);
    });
  },
  /**
   * 2018-物流流水信息
   */
  queryLogisticsDetail(param, callback) {
    // param.memberId = merchantlib.getMemberId();
    // param.merchantId = merchantlib.getMerchantId();
    param.memberId = '1'
    param.merchantId = '2'
    networklib.post('2018', param).then(obj => {
      if (callback) {
        // console.log('成功的回调', '2017-生成订单', obj, param);
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', '2018-物流流水信息', err, param);
    });
  },

  /**
   *
   * Local功能
   *
   */

  /**
   * 清空本地order
   */
  clearLocalOrder() {
    order = {
      name: '本地订单',
      goodsList: [],
      discountAmount: 0, // 优惠金额
      goodsGroupList: [
        {
          title: '',
          goodsList: [],
        }
      ],
    };
  },
  /**
   * 更新本地order
   *
   * 金额
   * 配送方式
   * @param param {}
   */
  updateLocalOrder(param) {

  },

  /**
   * 删除本地订单中的商品
   * @return {[type]} [description]
   */
  deleteLocalOrderGoods(tempId) {
    let delIndex = Vue.$_.findIndex(order.goodsList, {tempId: tempId})
    console.log('删除本地订单中的商品 tempId：', tempId, 'index:', delIndex)
    order.goodsList.splice(delIndex, 1)
    // console.log(order.goodsList)
  },

  /**
   * 删除本地订单中的商品 goodsGroupList
   * @return {[type]} [description]
   */
  deleteLocalOrderGoodsNew(tempId) {
    console.log('删除商品：', tempId)
    let goodsList = [];
    for (let i = 0, len = order.goodsGroupList.length; i < len; i++) {
      let delIndex = Vue.$_.findIndex(order.goodsGroupList[i].goodsList, {tempId: tempId})
      if (delIndex >= 0) {
        order.goodsGroupList[i].goodsList.splice(delIndex, 1)
      }
    }
  },

  /**
   * 更新本地order 优惠金额
   * @param  {[type]} discountAmount [description]
   * @return {[type]}                [description]
   */
  updateLocalOrderDiscountAmount(discountAmount) {
    order.discountAmount = discountAmount
  },

  /**
   * 更新本地order的goodsList
   * @param  {[type]} goodsList [description]
   * @return {[type]}           [description]
   */
  updateGoodsListLocalOrder(goodsList) {
    // console.log('更新本地order的goodsList', goodsList)
    order.goodsList = goodsList
  },

  /**
   * 更新本地order的goodsGroupList
   * @param  {[type]} goodsList [description]
   * @return {[type]}           [description]
   */
  updateGoodsGroupListLocalOrder(goodsGroupList) {
    // console.log('更新本地order的goodsList', goodsList)
    order.goodsGroupList = goodsGroupList
  },

  /**
   * 添加goodsGroupList到本地订单
   */
  addGoodsGroupListToLocalOrder(goodsList, callback) {
    // 遍历传入的goodsList,
    for (let i = 0, len = goodsList.length; i < len; i++) {
      let goods = goodsList[i];
      goodslib.queryGoodsDetails(goods.goodsId, (err, obj) => {
        console.log('queryGoodsDetails:', JSON.stringify(obj))
        if (err) {
          if (callback) callback(err)
          return
        }
        if (obj.propertyList) {
          // console.log('obj.propertyList', obj.propertyList);
          // 将3层sku属性拍成2层
          goodslib.transformPropertyList(obj.propertyList)
        }
        goods.weight = obj.weight
        goods.propertyList = obj.propertyList
      })
      goods.count = 1
      goods.tempId = Vue.$_.uniqueId('tempId_')
      console.log('add goods :', JSON.stringify(goods), 'order:', order);
      order.goodsGroupList[0].title = ''
      order.goodsGroupList[0].goodsList.push(goods)
      // console.log('222', order.goodsList)
    }
    if (callback) callback();
  },

  /**
   * 添加商品到本地订单
   *
   * @param param
   * @author 郭秋思
   */
  addGoodsListToLocalOrder(goodsList, callback) {
    for (let i = 0, len = goodsList.length; i < len; i++) {
      let goods = goodsList[i];
      goodslib.queryGoodsDetails(goods.goodsId, (err, obj) => {
        console.log('queryGoodsDetails:', JSON.stringify(obj))
        if (err) {
          if (callback) callback(err)
          return
        }
        if (obj.propertyList) {
          // console.log('obj.propertyList', obj.propertyList);
          // 将3层sku属性拍成2层
          goodslib.transformPropertyList(obj.propertyList)
          // 格式化属性
          console.log('formatProperties 之前', goods);
          this.formatProperties(obj.propertyList, function(obj) {
            if (obj) {
              Vue.$_.extend(goods, obj)
              console.log('formatProperties 之后', goods);
            }
          })
        }
        goods.weight = obj.weight
        goods.propertyList = obj.propertyList
      })
      goods.count = 1
      goods.tempId = Vue.$_.uniqueId('tempId_')
      console.log('add goods ', goods);
      order.goodsList.push(goods)
      // console.log('222', order.goodsList)
    }
    if (callback) callback();
  },

  /**
   * 处理propertyList for order
   * @author 郭秋思
   */
  formatProperties(propertyList, callback) {
    // console.log('propertyList', propertyList)
    let prop = {'color': [], 'size': []}
    propertyList.map(item => {
      // if (item.skuID == '1000') { // 颜色
      if (item.skuName == '颜色') { // 颜色
        item.list.map(item => {
          item.list.map(item => {
            item.select = 0
          })
          prop.color = item.list
        })
      } else if (item.skuName == '尺码') { // 尺码
        item.list.map(item => {
          item.list.map(item => {
            item.select = 0
          })
          prop.size = item.list
        })
      }
    })
    if (callback) {
      callback(prop)
    }
  },

  /**
   * 更新本地订单商品信息
   *
   * @param goods
   */
  updateGoodsToLocalOrder(goods) {

  },

  /**
   * 返回local order
   * @return
   */
  getLocalOrder() {
    return order;
  },

  // 通过goodsGroupList计算goodsList
  generateGoodsList() {
    let goodsList = [];
    for (let i = 0, len = order.goodsGroupList.length; i < len; i++) {
      goodsList = goodsList.concat(order.goodsGroupList[i].goodsList)
    }
    order.goodsList = goodsList
  },

  /**
   * [generateConfirmOrderMessage description]
   * @return {[type]} [description]
   */
  generateConfirmOrderMessage(orderNo) {
    let result = {}
    // console.log(this.getLocalOrder())
    result.type = 5 // 5-代表确认订单消息类型
    result.orderId = orderNo
    let goodsImgUrl = '' // 订单中第一种商品的图片Url，仅用于UI展示
    let goodsStandaName = '' // 订单中第一种商品的goodsStandaName，仅用于UI展示
    let goodsCount = 0 // 订单中商品总数，仅用于UI展示
    // let payAmount = 0 // 订单实付金额，仅用于UI展示
    let goodsList = this.getLocalOrder().goodsList
    for (var i = 0; i < goodsList.length; i++) {
      let goods = goodsList[i]
      // console.log('goods:', goodsList[i])
      if (i === 0) {
        goodsStandaName = goods.goodsName
        goodsImgUrl = goods.goodsImg
      }
      goodsCount += goods.count
    }
    result.goodsImgUrl = goodsImgUrl
    result.goodsStandaName = goodsStandaName
    result.goodsCount = goodsCount

    return result;
  },

  /**
   * 生成本地订单信息包
   *
   * @return {}
   */
  generateLocalOrderInfo() {
    let result = {}
    // =====discountAmount
    result.discountAmount = order.discountAmount
    // =====goodsList
    this.generateGoodsList()
    // console.log('本地订单中的goodslist:', JSON.stringify(this.getLocalOrder().goodsList))
    // console.log('本地订单中的goodsGrouplist:', JSON.stringify(this.getLocalOrder().goodsGroupList))
    if (this.getLocalOrder().goodsList.length > 0) {
      console.log('=====goodsList')
      result.goodsList = []
      this.getLocalOrder().goodsList.map(goods => {
        // console.log(goods)
        let item = {}
        item.count = goods.count
        // 添加属性dynamicAttributes
        item.dynamicAttributes = []
        goods.propertyList.map(property => {
          property.subsubList.map(subsubProperty => {
            if (subsubProperty.select == '1') {
              console.log('================dynamicAttributes===================')
              item.dynamicAttributes.push({"attributeId": subsubProperty.skuID, "attributeName": subsubProperty.skuName})
            }
          })
        })
        // 添加goods
        item.goods = {
          goodsPrice: goods.price,
          goodsSalesName: '',
          goodsStandaName: goods.goodsName,
          imageUrl: goods.goodsImg,
          // marketPrice: goods.tagPrice,
          productId: goods.goodsId,
          weight: goods.weight
        }
        if (goods.tagPrice) {
          item.goods.marketPrice = goods.tagPrice
        } else {
          item.goods.marketPrice = goods.marketPrice
        }
        result.goodsList.push(item)
      })
    }
    // =====shop
    result.shop = {
      address: merchantlib.getMerchantPickupAddress(),
      // commodityCount: '',
      // hotCount: '',
      logoImgUrl: merchantlib.getMerchantLOGO(),
      shopCode: merchantlib.getMerchantId(),
      shopName: merchantlib.getMerchantName(),
      storeCode: merchantlib.getStoreCode(),
      storeName: merchantlib.getStoreName(),
      storeType: merchantlib.getCommercialCode()
    }
    return result;
  },

  /**
   * 订单详情页把订单转换成订单自定义消息给IM使用
   * @param order
   */
  generateOrderFromDetailsForIMRemote(order) {
    let params = {
      receiver: "BL" + order.memberId,
      order: {
        orderId: order.orderNo,
        goodsImgUrl: order.goodsGroupList[0].goodsList[0].imgUrl,
        goodsStandaName: order.goodsGroupList[0].goodsList[0].goodsName,
        goodsCount: order.totalGoodsNum,
        payAmount: order.shouldMoney,
        type: '6'
      }
    }

    return params;
  },

  /**
   * 订单列表页把订单转换成订单自定义消息给IM使用
   * @param order
   */
  generateOrderFromListForIMRemote(order) {
    let params = {
      receiver: "BL" + order.memberId,
      order: {
        orderId: order.orderNo,
        goodsImgUrl: order.goodslist[0].goodsImg,
        goodsStandaName: order.goodslist[0].goodsName,
        goodsCount: order.totalGoodsNum,
        payAmount: order.shouldMoney,
        type: '6'
      }
    }
    return params;
  },

  /**
   * 插入用户历史商品
   */
  addConsultGoods(customerId, goodsId, callback) {
    let param = {
      customerId,
      goodsId,
      memberId: '11',
      merchantId: '11896'
    }
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    networklib.post('2011', param).then(() => {
      if (callback) {
        callback();
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },
  /**
   * 查询历史咨询商品    孙传奇
   * @param  {[type]}   customerId [description]
   * @param  {Function} callback   [description]
   * @return {[type]}              [description]
   */
  findConsultGoods(customerId, callback) {
    let memberId = merchantlib.getMemberId();
    let merchantId = merchantlib.getMerchantId();
    let param = { memberId, merchantId, customerId };
    console.log('查询历史咨询商品 param:' + JSON.stringify(param))
    networklib.post('2012', param).then(obj => {
      if (callback) {
        callback(null, obj.goodsList);
        // console.log('成功的回调', '2012-查询订单详情', obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      // console.log('失败的回调', '2012-查询订单详情', err);
    });
  },
  /**
   * 2016-物流下单（发货） 黄凤秀
   * @return {[type]} [description]
   */
  orderDelivery(queryParam, callback) {
    console.log('2016-物流下单（发货）接口入参：', JSON.stringify(queryParam));
    let memberId = merchantlib.getMemberId()//会员id
    let memberName = merchantlib.getName()// 会员名字
    let merchantId = merchantlib.getMerchantId()//商户id
    let merchantName = merchantlib.getMerchantName()//商户名
    let commonParam = { memberId, memberName, merchantId, merchantName }
    let param = Vue.$_.extend(queryParam, commonParam);
    // let param = queryParam
    console.log('2016-物流下单（发货）接口入参：', param);
    networklib.post('2016', param).then(obj => {
      if (callback) {
        callback(null, obj)
        console.log('成功的回调', '2016-物流下单（发货）成功', obj);
      }
    }).catch(err => {
      if (callback) {
        callback(err)
        console.log('失败的回调', '2016-物流下单（发货）失败', err);
      }
    })
  },
  /**
   * 2019-查询订单自提码核销记录列表
   * @return
   */
  findVerifyDeliveryCode(queryParam, callback) {
    queryParam.memberId = merchantlib.getMemberId()//会员id
    queryParam.merchantId = merchantlib.getMerchantId()//商户id
    console.log('2019-查询订单自提码核销记录列表,接口入参：', JSON.stringify(queryParam));
    networklib.post('2019', queryParam).then(obj => {
      if (callback) {
        callback(null, obj)
        console.log('成功的回调', '2019-查询订单自提码核销记录列表成功', obj);
      }
    }).catch(err => {
      if (callback) {
        callback(err)
        console.log('失败的回调', '2019-查询订单自提码核销记录列表失败', err);
      }
    })
  },
  /**
   * 2020-批量修改商品sku无货
   * @return
   */
  updateGoodsSkuStock(queryParam, callback) {
    queryParam.memberId = merchantlib.getMemberId()//会员id
    queryParam.merchantId = merchantlib.getMerchantId()//商户id
    console.log('2020-批量修改商品sku无货,接口入参：', JSON.stringify(queryParam));
    networklib.post('2020', queryParam).then(obj => {
      if (callback) {
        callback(null, obj)
        console.log('成功的回调', '2020-批量修改商品sku无货', obj);
      }
    }).catch(err => {
      if (callback) {
        callback(err)
        console.log('失败的回调', '2020-批量修改商品sku无货', err);
      }
    })
  },
  /**
   * 2021-查询无货订单商品sku列表
   * @return
   */
  findOrderGoodsSku(queryParam, callback) {
    queryParam.merchantId = merchantlib.getMerchantId()//商户id
    console.log('2021-查询无货订单商品sku列表,接口入参：', JSON.stringify(queryParam));
    networklib.post('2021', queryParam).then(obj => {
      if (callback) {
        callback(null, obj)
        console.log('成功的回调', '2021-查询无货订单商品sku列表', obj);
      }
    }).catch(err => {
      if (callback) {
        callback(err)
        console.log('失败的回调', '2021-查询无货订单商品sku列表', err);
      }
    })
  },

  /**
   * 生成促销商品格式
   */
  generatePromotionGoods(goods) {
    let result = {};
    // console.log('生成促销商品格式:\n', JSON.stringify(goods))
    result.count = goods.count;
    result.goodsId = goods.goodsId;
    result.goodsName = goods.goodsName;
    result.price = goods.price;
    result.goodsImg = goods.goodsImg;
    result.dynamicAttributes = [];
    result.propertyList = goods.propertyList;
    result.tempId = goods.tempId;
    result.weight = goods.weight;
    if (goods.tagPrice) {
      result.marketPrice = goods.tagPrice;
    } else {
      result.marketPrice = goods.marketPrice;
    }
    goods.propertyList.map(property => {
      property.subsubList.map(subsubProperty => {
        if (subsubProperty.select == 1) {
          result.dynamicAttributes.push({"skuId": subsubProperty.skuID, "skuName": subsubProperty.skuName})
        }
      })
    })
    // console.log('生成促销商品格式 result:\n', JSON.stringify(result))
    return result;
  },

  //  ====================== 停车券 接口 ==========================

  /**
   * 2200-停车券订单列表
   */
  queryParkingOrderList(param, callback) {
    param.merchantId = merchantlib.getMerchantId();
    console.log('-查询券订单列表 param:\n', JSON.stringify(param))
    networklib.post('2200', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },
  /**
   * 2201-券订单详情
   */
  queryParkingOrderDetail(param, callback) {
    param.merchantId = merchantlib.getMerchantId();
    console.log('-券订单详情 param:\n', JSON.stringify(param))
    networklib.post('2201', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },
  /**
   * 2202-查询商户可购券模版列表
   * @return
   */
  shopCanBuyParkingTemplateList(queryParam, callback) {
    queryParam.merchantId = merchantlib.getMerchantId() //商户id
    queryParam.shopId = merchantlib.getCommercialCode() //业态id
    queryParam.shopId = merchantlib.getStoreCode() //门店id

    console.log('2202-查询商户可购券模版列表,接口入参：', JSON.stringify(queryParam));
    networklib.post('2202', queryParam).then(obj => {
      if (callback) {
        callback(null, obj)
        console.log('2202-查询商户可购券模版列表', obj);
      }
    }).catch(err => {
      if (callback) {
        callback(err)
        console.log('2202-查询商户可购券模版列表 失败', err);
      }
    })
  },

  /**
   * 2203-创建购买停车券订单
   * @return
   */
  queryCreatParkingOrder(queryParam, callback) {
    queryParam.merchantId = merchantlib.getParkingMerchantId() //商户id
    queryParam.busId = merchantlib.getParkingCommercialCode() //业态id
    queryParam.storeCode = merchantlib.getParkingStoreCode() //门店id
    queryParam.storeName = merchantlib.getStoreName();
    queryParam.merchantName = merchantlib.getMerchantName();
    console.log('2203-创建购买停车券订单,接口入参：', JSON.stringify(queryParam));
    networklib.post('2203', queryParam).then(obj => {
      if (callback) {
        callback(null, obj)
        //console.log('2202-查询商户可购券模版列表', obj);
      }
    }).catch(err => {
      if (callback) {
        callback(err)
        console.log('创建购买停车券订单 失败', err);
      }
    })
  },
  /**
   * 2204-发券列表
   * @return
   */
  canReleaseParkingTemplateList(queryParam, callback) {
    queryParam.merchantId = merchantlib.getParkingMerchantId() //商户id
    console.log('2204-发券列表,接口入参：', JSON.stringify(queryParam));
    networklib.post('2204', queryParam).then(obj => {
      if (callback) {
        callback(null, obj)
        console.log('2204-发券列表', obj);
      }
    }).catch(err => {
      if (callback) {
        callback(err)
        console.log('2204-发券列表 失败', err);
      }
    })
  },
  /**
   * 2205-发券详情
   * @return
   */
  releaseParkingTemplateDetail(queryParam, callback) {
    queryParam.merchantId = merchantlib.getParkingMerchantId() //商户id
    queryParam.businessId = merchantlib.getCommercialCode() // 业态Id
    queryParam.shopId = merchantlib.getStoreCode() // 门店Id（code）
    console.log('2205-发券详情,接口入参：', JSON.stringify(queryParam));
    networklib.post('2205', queryParam).then(obj => {
      if (callback) {
        callback(null, obj)
        // console.log('2205-发券详情', obj);
      }
    }).catch(err => {
      if (callback) {
        callback(err)
        // console.log('2205-发券详情 失败', err);
      }
    })
  },
}
