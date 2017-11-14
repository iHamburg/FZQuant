/* created by 张怡清 */

/**
 * 优惠相关的功能
 */

import networklib from './networklib';
import merchantlib from './merchantlib';

export default {

  /**
   * CM1007 核销优惠券
   * @param couponCode
   * @param callback
   */
  verifyCoupon(couponCode, callback) {
    let param = {
      businessId: merchantlib.getCommercialCode(),
      shopId: merchantlib.getStoreCode(),
      merchantId: merchantlib.getMerchantId(),
      couponCode,
    };

    console.log('verifycoupon ', param);
    networklib.post('CM1007', param).then(() => {
      if (callback) {
        callback(null);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * CM1002 查询券模板列表
   * @param type
   * @param pageNo
   * @param pageSize
   * @param callback
   */
  queryCouponList (type, pageNo, pageSize, callback) {
    let param = {
      merchantId: merchantlib.getMerchantId(),
      type: type,
      pageNo: pageNo,
      pageSize: pageSize,
    }

    networklib.post('CM1002', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * CM1003 查询券模板详情
   */
  queryCouponDetail(couponTemplateId, callback) {
    let param = {couponTemplateId}
    networklib.post('CM1003', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * CM1010 查询券模板分配的网红列表（已分配券列表）
   */
  getMemberDetailByCoupon(param, callback) {
    networklib.post('CM1010', this.queryParam).then((obj) => {
      // console.log('成功的回调', obj);
      if (callback) callback(null, obj)
    }, (err) => {
      // this.stopLoading();
      console.log('失败的回调', 'CM1010', err);
      if (callback) callback(err)
    })
  },

  /**
   * CM1011 隐藏券
   * @param  {[type]}   couponTemplateId [description]
   * @param  {[type]}   userToken        [description]
   * @param  {Function} callback         [description]
   * @return {[type]}                    [description]
   */
  hideCoupon (couponTemplateId, callback) {
    let param = {
      couponTemplateId: couponTemplateId,
      userToken: merchantlib.getMemberToken(),
    }

    networklib.post('CM1011', param).then(() => {
      // resCode 返回00100000
      if (callback) {
        callback(null, true);
      }
    }).catch(err => {
      if (callback) { callback(err, false); }
    });
  },

  /**
   * 1027-查询可发放优惠券列表
   */
  selectCouponList(callback) {
    let queryParam = {merchantId: merchantlib.getMerchantId()}
    // console.log('queryParam', queryParam)
    networklib.post('1027', queryParam).then((obj) => {
      // console.log('成功的回调', obj);
      if (callback) {
        callback(null, obj)
      }
    }, (err) => {
      console.log('失败的回调', '1027' + err);
      if (callback) {
        callback(err)
      }
    });
  },

  // 6001-创建优惠券接口
  createFullCutCoupon(param, callback) {
    param.merchantName = merchantlib.getMerchantName(); //商户名称
    param.merchantId = merchantlib.getMerchantId(); //商户id
    param.commercialCode = merchantlib.getCommercialCode(); //获取业态编码
    param.commercialName = merchantlib.getCommercialName(); //业态名称
    param.storeName = merchantlib.getStoreName(); //门店名称
    param.storeCode = merchantlib.getStoreCode(); //门店编码
    param.memberId = merchantlib.getMemberId(); //会员id
    console.log('6001 param:' + param)
    networklib.post('6001', param).then(obj => {
      if (callback) {
        callback(null, obj);
        console.log('成功的回调', '6001 创建优惠券接口', obj, param);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', '6001 创建优惠券接口', err, param);
    });
  },

  // 6003-更新优惠券接口
  updateFullCutCoupon(param, callback) {
    param.memberId = merchantlib.getMemberId(); //会员id
    param.merchantId = merchantlib.getMerchantId(); //商户id

    console.log('6003-更新优惠券接口 param:' + param)
    networklib.post('6003', param).then(obj => {
      if (callback) {
        callback(null, obj);
        console.log('成功的回调', '6003-更新优惠券接口', obj, param);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', '6003-更新优惠券接口', err, param);
    });
  },
  // 6004-更新优惠券状态
  updateFullCutCouponStatus(param, callback) {
    param.merchantId = merchantlib.getMerchantId(); //商户id
    param.memberId = merchantlib.getMemberId(); //操作人
    console.log('6004 param:' + JSON.stringify(param))
    networklib.post('6004', param).then(obj => {
      if (callback) {
        callback(null, obj);
        console.log('成功的回调', '6004 更新优惠券状态接口', obj, param);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', '6004 更新优惠券状态接口', err, param);
    });
  },

  // 6005-查询优惠券详情
  queryFullCutCouponDetail(param, callback) {
    param.merchantId = merchantlib.getMerchantId(); //商户id
    param.memberId = merchantlib.getMemberId(); //操作人
    console.log('6005 param:' + JSON.stringify(param))
    networklib.post('6005', param).then(obj => {
      if (callback) {
        callback(null, obj);
        console.log('成功的回调', '6005 查询优惠券详情接口', obj, param);
      }
    }).catch(err => {
      if (callback) { callback(err); }
      console.log('失败的回调', '6005 查询优惠券详情接口', err, param);
    });
  },

  /**
   * 6006-查询优惠券列表
   *
   * @卢聪
   *
   * @param status: 全部：‘’ 、1:待审核、3：审核不通过、4：发放中、5：已失效
   */
  queryCouponListNew(param, callback) {
    param.merchantId = merchantlib.getMerchantId(); //商户id
    param.memberId = merchantlib.getMemberId(); //操作人
    console.log('6006- param:\n', JSON.stringify(param))
    networklib.post('6006', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 6007 查询优惠券不同状态数量
   */
  queryCouponCount(callback) {
    let param = {}
    param.merchantId = merchantlib.getMerchantId(); //商户id
    param.memberId = merchantlib.getMemberId(); //操作人
    console.log('6007- param:\n', JSON.stringify(param))
    networklib.post('6007', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },
  /**
   * 6008-查询优惠券核销记录列表
   */
  findCouponHistory(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('6008-查询优惠券核销记录列表 param:\n', JSON.stringify(param))
    networklib.post('6008', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 6010-查询优惠券核销记录详情
   * @return {[type]} [description]
   */
  queryVerifiedCouponDetail(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('6010-查询优惠券核销记录详情 param:\n', JSON.stringify(param))
    networklib.post('6010', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },
   /**
   * 6002-查询优惠券可绑定商品列表
   * @return {[type]} [description]
   */
  queryCanBindGoodsList(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('6002-查询优惠券可绑定商品列表 param:\n', JSON.stringify(param))
    networklib.post('6002', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 6011-查询优惠券已绑定商品列表
   * @return {[type]} [description]
   */
  queryBindGoodsList(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('6011-查询优惠券已绑定商品列表 param:\n', JSON.stringify(param))
    networklib.post('6011', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 2206-停车券 核销券列表
   */
  queryParkingCouponVerified(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('2206 Params:', JSON.stringify(param))
    networklib.post('2206', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },

  /**
   * 2207 核销停车券详情
   */
  queryParkingCouponVerifiedDetails(param, callback) {
    param.memberId = merchantlib.getMemberId();
    param.merchantId = merchantlib.getMerchantId();
    console.log('2207 Params:', JSON.stringify(param))
    networklib.post('2207', param).then(obj => {
      if (callback) {
        callback(null, obj);
      }
    }).catch(err => {
      if (callback) { callback(err); }
    });
  },
}
