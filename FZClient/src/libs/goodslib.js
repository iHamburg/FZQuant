/* creat by 张怡清 */

/**
 * 商品相关的功能
 */

import networklib from './networklib';
import merchantlib from './merchantlib';

export default {

  /**

   1017 绑定商品纸制二维码
   */
  bindGoodsQRCode(goodsId, qrcode, callback) {
    let merchantId = merchantlib.getMerchantId();
    let memberId = merchantlib.getMemberId();
    let param = {
      "goodsId": goodsId,
      "merchantId": merchantId,
      "qrcode": qrcode,
      "bindId": memberId,
    }

    console.log('start bind qr code ', param);
    networklib.post('1017', param).then(obj => {
      // console.log('1017 ',obj);
      if (callback) {
        callback();
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },

  /**
   * 1002-商品审核接口
   *
   * auditNote 审核理由
   * auditState  审核状态    1:提审，2：是审核通过上架，3：下架，4：审核不通过
   * goodsIdList 商品IdList
   * memberId  会员Id
   * merchantId  商户ID
   */
  goodsAudit(params, callback) {
    params.merchantId = merchantlib.getMerchantId();
    params.memberId = merchantlib.getMemberId();

    console.log('1002-商品审核接口 params :\n', JSON.stringify(params))
    networklib.post('1002', params).then((obj) => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },

  /**
   * 1039-批量删除商品
   * [deleteGoods description]
   * @return {[type]} [description]
   */
  deleteGoods(params, callback) {
    params.merchantId = merchantlib.getMerchantId();
    params.memberId = merchantlib.getMemberId();

    console.log('1039-批量删除商品 params:\n', JSON.stringify(params))
    networklib.post('1039', params).then((obj) => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },

  /**
   * 查询商品详情
   * 1008
   * @param goodsId
   * @param callback
   */
  queryGoodsDetails(goodsId, callback) {
    // 货号 商品Id 商户Id
    let queryParam = {goodsId: goodsId, merchantId: merchantlib.getMerchantId()};
    // console.log('入参：', queryParam);
    networklib.post('1008', queryParam).then((obj) => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },

  /**
   * 1011 查询商品列表
   *
   * @param param
   *
   *        goodsState 商品状态 否 string 0：草稿箱 1：待审核，2：已上架，3：已下架，4：审核不通过'
   *        sortState 排序状态 否 string 默认排序方式： 上架最新，1：上架时间，2：价格升，3：价格降
   *        pageNo 页码 否 string
   *        pageSize 页数 否 string
   *
   * @param callback
   */
  queryGoodsList(param, callback) {
    param.merchantId = merchantlib.getMerchantId();
    console.log('1011 查询商品列表', param)
    networklib.post('1011', param).then((obj) => {
      if (callback) {
        // obj = obj?obj:{};
        callback(null, obj.list);
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },

  /**
   * 1006-查询商品分类
   */
  queryGoodsType(param, callback) {
    // let apiId = '1006'
    param.merchantId = merchantlib.getMerchantId();
    //1006-查询分类列表
    console.log('1006param', param)
    networklib.post('1006', param).then((obj) => {
      if (callback) {
        callback(null, obj.classifyList)
      }
    }).catch(err => {
      console.log('失败的回调', err);
      if (callback) callback(err);
    })
  },

  /**
   *4005-查询可推荐商品列表
   */
  findRecommendedGoodsList(param, callback) {
    param.merchantId = merchantlib.getMerchantId();
    param.memberId = merchantlib.getMemberId();
    networklib.post('4005', param).then((obj) => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      console.log('失败的回调', err);
      if (callback) callback(err);
    })
  },

  /**
   *4002-发布推荐商品
   */
  releaseRecommendedGoods(param, callback) {
    param.merchantId = merchantlib.getMerchantId();
    param.memberId = merchantlib.getMemberId();
    networklib.post('4002', param).then((obj) => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      console.log('失败的回调', err);
      if (callback) callback(err);
    })
  },

  /**
   * 将3层的propertyList 转成两层，去除第二层的中间property, 直接保存在subsubList中
   *
   * @param propertyList
   */
  transformPropertyList(propertyList) {
    propertyList.map(property => {
      // console.log('property ', property);
      let newList = [];
      property.list.map(subproperty => {
        // console.log('subproperty ', subproperty);
        subproperty.list.map(subsubproperty => {
          // console.log('subsubproperty ', subsubproperty);
          subsubproperty.select = 0;
          newList.push(subsubproperty)
        })
        property.subsubList = newList
      })
    })
  },

  /**
   * 传入没有属性字段的goods， 添加商品
   * @param goods
   */
  addPropertyList(goods, callback) {
    this.queryGoodsDetails(goods.goodsId, (err, obj) => {
      // console.log('queryGoodsDetails', obj)
      if (err) {
        if (callback) callback(err)
        return
      }
      if (obj.propertyList) {
        // console.log('obj.propertyList', obj.propertyList);
        this.transformPropertyList(obj.propertyList)
      }
      goods.propertyList = obj.propertyList
      if (callback) callback()
    })
  },

  /**
   * 隐藏商品sku属性
   * 1040
   * @param skuId
   * @param callback
   */
  queryHiddeGoodsSKUProperty(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('1040入参：', param);
    networklib.post('1040', param).then((obj) => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) callback(err);
    });
  },
}
